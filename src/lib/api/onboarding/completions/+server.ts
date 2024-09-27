import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import OpenAI from 'openai';
import { PRIVATE_OPENAI_KEY } from '$env/static/private';
import * as userAccount from '$lib/services/userAccount';

function uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] &
                (15 >> (c / 4)))
        ).toString(16)
    );
}

export const GET: RequestHandler = async ({ request, locals }) => {
    console.log('GET /api/onboarding/completions');
    const session = await locals.getSession();
    if (!session) {
        redirect(301, '/login');
    }
    const user = session.user.id;

    let userAssets;

    try {
        const openai = new OpenAI({ apiKey: PRIVATE_OPENAI_KEY });
        try {
            const { data, error, status } = await locals.supabase
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

        const systemMessage: OpenAI.Chat.ChatCompletionSystemMessageParam =
            {
                role: 'system',
                content: `Given the data in json format below, which includes different Facebook assets like pages and Instagram accounts. Determine the entities. Entities in the context are typically businesses, places, people and other similar. Link all the different assets under the entities that match. Some names could be punctuated or spelled slightly differently. Some assets can be connected through the ASSET_ID and information available in the DATA. If you cannot determine the entity, mark it as unknown. Always respond with an json object for each entity and put all the entities in an array. Always return a JSON object that follows this structure: {name:ENTITY_NAME,assets:[{id:ASSET_ID,type:ASSET_TYPE}]} 
                    Data: ${JSON.stringify(userAssets)}`,
            };

        const prompt: OpenAI.Chat.ChatCompletionUserMessageParam = {
            role: 'user',
            content: 'Provide your analysis of the data in JSON format',
        };

        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            systemMessage,
            prompt,
        ];

        const reqOptions: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming =
            {
                model: 'gpt-4-turbo-preview',
                response_format: { type: 'json_object' },
                messages,
            };

        const { choices } =
            await openai.chat.completions.create(reqOptions);

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
                            locals.supabase
                        );
                        responseParsed.entities[i].assets[
                            c
                        ].profile_picture_url = res;
                    } catch (error) {
                        console.log(error);
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
                headers: { 'X-Colocio-Version': 'This is only a test' },
            }
        );
    } catch (error) {
        console.error('Could not initialize OpenAI', error);
        throw error;
    }
};

async function createEntity(requestData, locals) {
    if (
        requestData === null ||
        requestData.entity.name === '' ||
        requestData.entity.elevatorPitch === '' ||
        requestData.entity.detailedOffering === ''
    ) {
        throw new Error('Entity Data Missing');
    }

    let { data, error } = await locals.supabase
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

    console.log('Entity Created Successfully:', data);
    return data;
}

async function linkEntityUser(euid, user, permission, locals) {
    let { data, error } = await locals.supabase
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
    console.log('Data inserted successfully:', data);
    return data;
}

async function setActiveEntityTouser(
    uuid: string,
    active_entity_uuid: string,
    locals
) {
    let { data, error } = await locals.supabase
        .from('user_profile')
        .update({
            active_entity: active_entity_uuid,
        })
        .eq('uuid', uuid)
        .select();

    if (error) {
        console.error(
            'Error setting active entity to user',
            error.message
        );
        throw new Error('Could not update active entity');
    }
    console.log('Active entity has been updated successfully:', data);
}

async function createAudience(euid, requestData, locals) {
    let aud = requestData.audience;
    if (
        aud.name === null ||
        aud.age.min === null ||
        aud.age.max === null ||
        aud.gender === null
    ) {
        throw new Error('Could not create Audience, missing data');
    }

    let { data, error } = await locals.supabase
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
    console.log('Audience created successfully:', data);
    return data;
}

async function getUserAsset(user, id, locals) {
    let { data, error } = await locals.supabase
        .from('user_assets')
        .select('*')
        .eq('uuid', user)
        .eq('asset_id', id);

    if (error) {
        console.error('Error getting data:', error.message);
        throw new Error('Could not get user asset');
    }
    console.log('Got User Asset:', data[0].auid);
    return data[0].auid;
}

async function createEntityAssets(euid, assets, locals) {
    for (const asset of assets) {
        let { data, error } = await locals.supabase
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
        console.log('Entity Asset Linked successfully:', data);
    }
    return true;
}

// NOTE: Moved to supabase service
async function uploadOfferingsImage(base64String, locals) {
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

        const { data, error } = await locals.supabase.storage
            .from('offerings')
            .upload(name, buffer, {
                contentType: contentType,
            });

        if (error) {
            console.error(
                'uploadOfferingsImage() -> Error Uploading Image:',
                error.message
            );
            throw new Error(
                'uploadOfferingsImage() -> Could not upload image'
            );
        }
        const publicURL = data.path;
        console.log('uploaded image: ', publicURL);

        return data;
    } catch (error) {
        console.error(
            'uploadOfferingsImage() -> Error processing image:',
            error.message
        );
        return null;
    }
}

async function createOfferings(euid, requestData, locals) {
    let offerings = requestData.offerings;
    if (offerings === null) {
        throw new Error('No offerings to process');
    }

    if (offerings.products.length > 0) {
        for (const product of offerings.products) {
            let productMedia = [];
            for (const media of product.medias) {
                const publicURL = await uploadOfferingsImage(
                    media,
                    locals
                );
                if (!publicURL) {
                    throw new Error('Could not upload image');
                }
                productMedia.push(publicURL);
            }

            let { data, error } = await locals.supabase
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
                throw new Error('Could create offering product', data);
            }
        }
    }

    if (offerings.services.length > 0) {
        for (const service of offerings.services) {
            let serviceMedia = [];
            for (const media of service.medias) {
                const publicURL = await uploadOfferingsImage(
                    media,
                    locals
                );
                if (!publicURL) {
                    throw new Error('Could not upload image');
                }
                serviceMedia.push(publicURL);
            }

            let { data, error } = await locals.supabase
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
                throw new Error('Could create offering service', data);
            }
        }
    }
}

async function updateUserProfile(user, locals) {
    if (user === null) {
        throw new Error('No User given');
    }

    let { data, error } = await locals.supabase
        .from('user_profile')
        .update({
            onboarding_status: 'completed',
        })
        .eq('uuid', user)
        .select('*');
    if (error) {
        console.error('Error getting data:', error.message);
        throw new Error('Could not update user profile', data);
    }
}

async function pullData(user, entity, assets, locals) {
    console.log('Pull Data');
    for await (let asset of assets) {
        if (asset.user_assets.type == 'facebook_page') {
            let token = asset.user_assets.data.access_token;
            let pageID = asset.user_assets.asset_id;
            let fields =
                'name,cover,new_like_count,engagement,talking_about_count,link,connected_instagram_account,fan_count,followers_count';
            const res = await fetch(
                `https://graph.facebook.com/v19.0/${pageID}?fields=${fields}&access_token=${token}`
            );
            const result = await res.json();

            if (result) {
                console.log('got data');
                try {
                    console.log('try');
                    let { data, error } = await locals.supabase
                        .from('insights')
                        .insert({
                            euid: entity,
                            platform: 'facebook',
                            type: 'page',
                            data: result,
                            auid: asset.auid,
                        })
                        .select('*');

                    if (error) {
                        console.error(
                            'Error inserting data:',
                            error.message
                        );
                        throw new Error('Could not add insights');
                    }
                    console.log(data);
                    if (data) {
                        console.log('Insights added Successfully:', data);
                    }
                } catch (error: any) {
                    console.log(error);
                }
            }
        }
    }
}

async function getEntityAssets(entity, user, locals) {
    let { data, error } = await locals.supabase
        .from('entities_assets')
        .select('*, user_assets(*)')
        .eq('euid', entity);

    if (error) {
        console.log(error);
        throw new Error('Could not get entity assets');
    }
    if (data) {
        return data;
    }
}

export const POST: RequestHandler = async ({ request, locals }) => {
    console.log('POST /api/onboarding/completions');
    const session = await locals.getSession();
    if (!session) {
        redirect(301, '/login');
    }

    try {
        const user = session.user.id;
        const requestData = await request.json();

        // Create the entity
        let euid;
        try {
            const entityData = await createEntity(requestData, locals);
            euid = entityData[0].euid;
        } catch (error) {
            console.error('Could not create Entity User link', error);
            throw error;
        }

        // Link Entity to User
        try {
            const link = await linkEntityUser(
                euid,
                user,
                'owner',
                locals
            );
        } catch (error) {
            console.error('Could not create Entity User link', error);
            throw error;
        }

        // Set active entity to User
        try {
            const userData = await setActiveEntityTouser(
                user,
                euid,
                locals
            );
        } catch (error) {
            console.error('Could not update active entity', error);
            throw error;
        }

        // Create Audience
        try {
            const audience = await createAudience(
                euid,
                requestData,
                locals
            );
        } catch (error) {
            console.error('Could not create audience', error);
            throw error;
        }

        // Create Entity Assets
        try {
            let assets = requestData.assets;
            let assetIds = [];
            for (const asset of assets) {
                let userAsset = await getUserAsset(
                    user,
                    asset.id,
                    locals
                );
                assetIds.push(userAsset);
            }
            const entityAssets = await createEntityAssets(
                euid,
                assetIds,
                locals
            );
        } catch (error) {
            console.error('Could not create entity assets', error);
            throw error;
        }

        // Create Offerings
        try {
            const entityOfferings = await createOfferings(
                euid,
                requestData,
                locals
            );
        } catch (error) {
            console.error('Could not create offerings', error);
            throw error;
        }

        try {
            const userprofile = await updateUserProfile(user, locals);
        } catch (error) {
            console.error('Could not update user profile', error);
            throw error;
        }

        let assets = await getEntityAssets(euid, session.user.id, locals);
        await pullData(session.user.id, euid, assets, locals);

        return json(
            { success: true },
            {
                status: 200,
            }
        );
    } catch (error) {
        return json(
            { success: false },
            {
                status: 500,
            }
        );
    }
};
