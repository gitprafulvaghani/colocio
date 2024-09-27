import { PRIVATE_OPENAI_KEY } from '$env/static/private';
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from '$env/static/public';
import * as userAccount from '$lib/services/userAccount';
import type { Database } from '$types/supabase';
import { createClient } from '@supabase/supabase-js';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import OpenAI from 'openai';

const supabase = createClient<Database>(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);

function uuidv4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
    ).toString(16)
  );
}

export const GET: RequestHandler = async ({ request, locals }) => {
  const session = await locals.colocio.getCurrentSession();
  if (!session) {
    redirect(301, '/login');
  }
  const user = session.user.id;

  let userAssets;

  try {
    const openai = new OpenAI({ apiKey: PRIVATE_OPENAI_KEY });
    try {
      const { data, error, status } = await supabase
        .rpc('filter_user_assets_gpt')
        .eq('uuid', user);

      if (status === 200) {
        userAssets = data;
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Could not fetch user assets', error);
    }

    const systemMessage: OpenAI.Chat.ChatCompletionSystemMessageParam = {
      role: 'system',
      content: `Given the data in json format below, which includes different
Facebook assets like pages and Instagram accounts. Determine the entities.
Entities in the context are typically businesses, places, people and other
similar. Link all the different assets under the entities that match. Some names
could be punctuated or spelled slightly differently. Some assets can be
connected through the ASSET_ID and information available in the DATA. If you
cannot determine the entity, mark it as unknown. Always respond with an json
object for each entity and put all the entities in an array. Always return a
JSON object that follows this structure:
{name:ENTITY_NAME,assets:[{id:ASSET_ID,type:ASSET_TYPE}]} Data:
${JSON.stringify(userAssets)}`,
    };

    const prompt: OpenAI.Chat.ChatCompletionUserMessageParam = {
      role: 'user',
      content: 'Provide your analysis of the data in JSON format',
    };

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      systemMessage,
      prompt,
    ];

    const reqOptions: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming = {
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages,
    };

    const { choices } = await openai.chat.completions.create(reqOptions);

    const response = choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    let responseParsed = JSON.parse(response);

    if (responseParsed.entities == null) {
      console.error('No entities returned');
      throw new Error('No entities returned');
    }

    let i = 0;
    for (const entity of responseParsed.entities) {
      let c = 0;
      for (const asset of entity.assets) {
        if (asset.type == 'facebook_page') {
          try {
            const res = await userAccount.getProfilePicture(
              user,
              asset.id,
              supabase
            );
            responseParsed.entities[i].assets[c].profile_picture_url = res;
          } catch (error) {
            throw error;
          }
        }
        c++;
      }
      i++;
    }

    return json(
      { success: true, data: responseParsed },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Could not initialize OpenAI', error);
    throw error;
  }
};

async function createEntity(requestData: any) {
  if (
    requestData === null ||
    requestData.entity.name === '' ||
    requestData.entity.elevatorPitch === '' ||
    requestData.entity.detailedOffering === ''
  ) {
    throw new Error('Entity Data Missing');
  }

  let { data, error } = await supabase
    .from('entities')
    .insert({
      name: requestData.entity.name,
      elevator_pitch: requestData.entity.elevator_pitch,
      detailed_offering: requestData.entity.detailed_offering,
      currency: requestData.entity.currency,
    })
    .select('*');

  if (error) {
    console.error('Error inserting data:', error.message);
    throw new Error('Could not create entities');
  }

  return data;
}

async function linkEntityUser(euid: any, user: any, permission: any) {
  let { data, error } = await supabase
    .from('entities_profile')
    .insert({
      euid: euid,
      uuid: user,
      permission_level: permission,
    })
    .select('*');

  if (error) {
    console.error('Error inserting data:', error.message);
    throw new Error('Could not link user to entity');
  }
  return data;
}

async function createAudience(euid: any, requestData: any) {
  let aud = requestData.audience;
  if (
    aud.name === null ||
    aud.age.min === null ||
    aud.age.max === null ||
    aud.gender === null
  ) {
    throw new Error('Could not create Audience, missing data');
  }

  let { data, error } = await supabase
    .from('audiences')
    .insert({
      euid: euid,
      name: aud.name,
      gender: aud.gender,
      age: { min: aud.age.min, max: aud.age.max },
      location: { locations: aud.locations },
      method: { methods: aud.methods },
      pain_points: { painPoints: aud.painPoints },
      interests: { interests: aud.interests },
      text: aud.description,
      lifetime_value: aud.lifetime_value,
    })
    .select('*');

  if (error) {
    console.error('Error inserting data:', error.message);
    throw new Error('Could not create audience');
  }
  return data;
}

async function getAudience() {
  try {
    let { data, error } = await supabase.from('audiences').select('*');

    if (error) {
      console.error('Error fetching data:', error.message);
      throw new Error('Could not fetch audience data');
    }

    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('An error occurred while fetching audience data');
  }
}

async function getUserAsset(user: any, id: any) {
  let { data, error } = await supabase
    .from('user_assets')
    .select('*')
    .eq('uuid', user)
    .eq('asset_id', id);

  if (error) {
    console.error('Error getting data:', error.message);
    throw new Error('Could not get user asset');
  }
  if (data) {
    return data[0].auid;
  }
}

async function createEntityAssets(euid: any, assets: any) {
  for (const asset of assets) {
    let { data, error } = await supabase
      .from('entities_assets')
      .insert([
        {
          auid: asset,
          euid: euid,
        },
      ])
      .select('*');

    if (error) {
      console.error('Error inserting data:', error.message);
      throw new Error('Could not create entity assets');
    }
  }
  return true;
}

async function uploadOfferingsImage(base64String: any) {
  try {
    const contentType = base64String.substring(
      base64String.indexOf(':') + 1,
      base64String.indexOf(';')
    );
    const fileExtension = contentType.split('/')[1];
    const base64Data = base64String.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    let name = '';
    name = uuidv4();
    name = name + '.' + fileExtension;

    const { data, error } = await supabase.storage
      .from('offerings')
      .upload(name, buffer, {
        contentType: contentType,
      });

    if (error) {
      console.error(
        'uploadOfferingsImage() -> Error Uploading Image:',
        error.message
      );
      throw new Error('uploadOfferingsImage() -> Could not upload image');
    }
    const publicURL = data.path;

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        'uploadOfferingsImage() -> Error processing image:',
        error.message
      );
    } else {
      console.error('uploadOfferingsImage() -> Unknown error:', error);
    }
    return null;
  }
}

async function createOfferings(euid: any, requestData: any) {
  let offerings = requestData.offerings;
  if (offerings === null) {
    throw new Error('No offerings to process');
  }

  if (offerings.products.length > 0) {
    for (const product of offerings.products) {
      let productMedia = [];
      for (const media of product.medias) {
        const publicURL = await uploadOfferingsImage(media);
        if (!publicURL) {
          throw new Error('Could not upload image');
        }
        productMedia.push(publicURL);
      }

      let { data, error } = await supabase
        .from('entities_offerings')
        .insert({
          euid: euid,
          name: product.title,
          description: product.description,
          url: product.url,
          type: 'product',
          images: {
            images: productMedia,
          },
        })
        .select('*');
      if (error) {
        console.error('Error getting data:', error.message);
        if (data) {
          throw new Error(
            `Could create offering product: ${JSON.stringify(data)}`
          );
        }
      }
    }
  }

  if (offerings.services.length > 0) {
    for (const service of offerings.services) {
      let serviceMedia = [];
      for (const media of service.medias) {
        const publicURL = await uploadOfferingsImage(media);
        if (!publicURL) {
          throw new Error('Could not upload image');
        }
        serviceMedia.push(publicURL);
      }

      let { data, error } = await supabase
        .from('entities_offerings')
        .insert({
          euid: euid,
          name: service.title,
          description: service.description,
          url: service.url,
          type: 'service',
          images: {
            images: serviceMedia,
          },
        })
        .select('*');
      if (error) {
        console.error('Error getting data:', error.message);
        throw new Error(
          `Could create offering service: ${JSON.stringify(data)}`
        );
      }
    }
  }
}

async function updateUserProfile(user: any) {
  if (user === null) {
    throw new Error('No User given');
  }

  let { data, error } = await supabase
    .from('user_profile')
    .update({
      onboarding_status: 'completed',
    })
    .eq('uuid', user)
    .select('*');
  if (error) {
    console.error('Error getting data:', error.message);
    throw new Error(`Could not update user profile: ${JSON.stringify(data)}`);
  }
}

export const POST: RequestHandler = async ({ request, locals }) => {
  const session = await locals.colocio.getCurrentSession();
  if (!session) {
    redirect(301, '/login');
  }

  try {
    const user = session.user.id;
    const requestData = await request.json();

    // Create the entity
    let euid;
    try {
      const entityData = await createEntity(requestData);
      if (entityData) {
        euid = entityData[0].euid;
      }
    } catch (error) {
      console.error('Could not create Entity User link', error);
      throw error;
    }

    // Link Entity to User
    try {
      const link = await linkEntityUser(euid, user, 'owner');
    } catch (error) {
      console.error('Could not create Entity User link', error);
      throw error;
    }

    // Create Audience
    try {
      const audience = await createAudience(euid, requestData);
    } catch (error) {
      console.error('Could not create audience', error);
      throw error;
    }

    // Create Entity Assets
    try {
      let assets = requestData.assets;
      let assetIds = [];
      for (const asset of assets) {
        let userAsset = await getUserAsset(user, asset.id);
        assetIds.push(userAsset);
      }
      const entityAssets = await createEntityAssets(euid, assetIds);
    } catch (error) {
      console.error('Could not create entity assets', error);
      throw error;
    }

    // Create Offerings
    try {
      const entityOfferings = await createOfferings(euid, requestData);
    } catch (error) {
      console.error('Could not create offerings', error);
      throw error;
    }

    try {
      const userprofile = await updateUserProfile(user);
    } catch (error) {
      console.error('Could not update user profile', error);
      throw error;
    }
    return json(
      { success: true },
      {
        status: 200,
        headers: { 'X-Colocio-Version': 'This is only a test' },
      }
    );
  } catch (error) {
    return json(
      { success: false },
      {
        status: 500,
        headers: { 'X-Colocio-Version': 'This is only a test' },
      }
    );
  }
};
