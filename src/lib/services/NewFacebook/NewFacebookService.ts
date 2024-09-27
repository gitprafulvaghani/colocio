import { notification } from '$lib/components/notification/notification';
import {
  ADCREATIVE_ID,
  AD_ACCOUNT_ID,
  AD_ID,
  FB_API_VERSION,
  PAGE_ID,
  T_TOKEN,
  Token,
  creativeId,
  adSetId,
  FB_token,
  P_PAGE_TOKEN,
  AD_ACCOUNT_ID_1,
  AD_ACCOUNT_ID_2,
} from '$lib/services/NewFacebook/envVariables';

export async function createCampaign(GoalDetails: any): Promise<any> {
  const formData: FormData = new FormData();
  formData.append('name', GoalDetails.goalselected);
  //  formData.append('name', 'REACH');
  formData.append('objective', 'OUTCOME_TRAFFIC');
  formData.append('status', 'PAUSED');
  formData.append('special_ad_categories', '[]');
  formData.append('description', GoalDetails.discription);

  try {
    const response: Response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/campaigns`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${T_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorData: any = await response.json();
      throw new Error(errorData.error.message);
    }

    const responseData: any = await response.json();
    const CampaignId: string = responseData.id;
    notification.success('Campaign created successfully !', 3000);
    return CampaignId;
  } catch (error) {
    // notification.danger(error,5000)
    console.error('Error creating campaign:', error);
  }
}

export async function createAdSet(
  GoalsDetails: any,
  audience_infos: any,
  meadia_details: any,
  Text_Detials: any,
  schedule_infos: any,
  value: string
) {
  const interest_ids = await getInterestIds(audience_infos.interests);
  const locationIDs = await getLocationIDs(
    audience_infos.locations.map(location => location.name)
  );

  const convertToISOFormat = (dateStr: string | number | Date) => {
    return new Date(dateStr).toISOString();
  };

  const optimization_goal = 'LINK_CLICKS';
  const bid_strategy = 'LOWEST_COST_WITHOUT_CAP';

  const formData = {
    name: 'New Campaign Duplicate',
    campaign_id: '120200530069850577',
    billing_event: 'IMPRESSIONS',
    optimization_goal: optimization_goal,
    start_time: convertToISOFormat(schedule_infos.start),
    end_time: convertToISOFormat(schedule_infos.end),
    bid_strategy: bid_strategy,
    status: 'PAUSED',
    targeting: {
      age_min: parseInt(audience_infos.age.split('-')[0]),
      age_max: parseInt(audience_infos.age.split('-')[1]),
      genders: audience_infos.gender === 'Female' ? [1] : [2],
      geo_locations: {
        cities: locationIDs.map((location: any) => ({
          key: parseInt(location.id),
        })),
      },
      interests: interest_ids.data.map((interest: { id: any; name: any }) => ({
        id: interest.id,
        name: interest.name,
      })),
    },
  };
  try {
    const response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/adsets`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }
    const creative_ID: any[] = [];
    if (value === 'draft') {
      meadia_details.map(async (data: any) => {
        const imagesUrl = await uploadImage('/images/' + data.src);
        if (imagesUrl) {
          const creativeAdId = await createAdCreative(imagesUrl.hash);
          creative_ID.push(creativeAdId);
          const setDelivery = await ScheduleDelivery(creative_ID);
        }
      });
    }
    const responseData = await response.json();
    if (responseData) {
      notification.success('Ad set created successfully !', 3000);
    }
  } catch (error: any) {
    notification.danger(error, 3000);
    console.error('Error creating ad set:', error);
  }
}

export async function createAdSetForShared(
  platformData: any,
  libraryData: any,
  facebookDesc: any,
  instagramDesc: any,
  selectedStartDate: any,
  selectedEndDate: any,
  $audienceData: any,
  $library: any
) {
  const convertToISOFormat = (dateStr: string | number | Date) => {
    return new Date(dateStr).toISOString();
  };
  const locationIDs = await getLocationIDsForShared(
    $audienceData.location[0].name
  );

  const creative_ID: any[] = [];
  libraryData.map(async (data: any) => {
    const imagesUrl = await uploadImage('/images/' + data.src);
    if (imagesUrl) {
      const creativeAdId = await createAdCreative(imagesUrl.hash);
      const setDelivery = await ScheduleDelivery(creative_ID);
      creative_ID.push(creativeAdId);
    }
  });

  const formData = {
    name: $audienceData.name,
    campaign_id: $audienceData.campaign_id,
    billing_event: 'IMPRESSIONS',
    optimization_goal: 'REACH',
    start_time: convertToISOFormat(selectedStartDate),
    end_time: convertToISOFormat(selectedEndDate),
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    status: 'PAUSED',
    targeting: {
      age_min: parseInt($audienceData.age_min),
      age_max: parseInt($audienceData.age_max),
      geo_locations: {
        cities: locationIDs.map((location: any) => ({
          key: parseInt(location.id),
        })),
      },
    },
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/adsets`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.error.message);
    }
    const responseData = await response.json();
  } catch (error: any) {
    console.error('Error creating ad set:', error);
    console.log(error);
  }
}

export async function createAdCreative(imageHash: any) {
  const formData = new FormData();
  formData.append('name', 'Sample Creative');
  formData.append(
    'object_story_spec',
    JSON.stringify({
      page_id: PAGE_ID,
      link_data: {
        image_hash: imageHash,
        link: `https://facebook.com/${PAGE_ID}`,
        message: 'try it out',
      },
    })
  );
  formData.append(
    'degrees_of_freedom_spec',
    JSON.stringify({
      creative_features_spec: {
        standard_enhancements: {
          enroll_status: 'OPT_IN',
        },
      },
    })
  );

  try {
    const response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/adcreatives`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${T_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    const adCreativeData = await response.json();
    notification.success('Ad creative created successfully !', 3000);
    return adCreativeData.id;
  } catch (error) {
    notification.danger(error, 3000);
    console.error('Error creating ad creative:', error);
  }
}
//--------- get id of interest ------------
async function getInterestIds(interests: any) {
  for (const interest of interests) {
    const response = await fetch(
      `https://graph.facebook.com/v11.0/search?type=adinterest&q=[${interest}]&access_token=${T_TOKEN}`
    );
    const data = await response.json();
    return data;
  }
}

async function getLocationIDs(locationNames: any) {
  try {
    const locationIDs = [];
    for (const locationName of locationNames) {
      const cityName = locationName.split(',')[0].trim();

      const response = await fetch(
        `https://graph.facebook.com/v12.0/search?type=adgeolocation&location_types=['city']&q=${encodeURIComponent(cityName)}&access_token=${T_TOKEN}`
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      if (data.data.length > 0) {
        locationIDs.push({ name: cityName, id: data.data[0].key });
      } else {
      }
    }
    return locationIDs;
  } catch (error: any) {
    console.error('Error fetching location IDs:', error.message);
    throw new Error('Error fetching location IDs');
  }
}

async function getLocationIDsForShared(locationNames: any) {
  try {
    const locationIDs = [];

    const response = await fetch(
      `https://graph.facebook.com/v12.0/search?type=adgeolocation&location_types=['city']&q=${encodeURIComponent(locationNames)}&access_token=${T_TOKEN}`
    );
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    if (data.data.length > 0) {
      locationIDs.push({ name: locationNames, id: data.data[0].key });
    } else {
    }
    return locationIDs;
  } catch (error: any) {
    console.error('Error fetching location IDs:', error.message);
    throw new Error('Error fetching location IDs');
  }
}

// Upload the Image

export async function uploadImage(imageUrl: any) {
  if (!imageUrl) {
    console.error('No image URL provided');
    return;
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const blob = await response.blob();
    const file = new File([blob], imageUrl, { type: blob.type });

    const formData = new FormData();
    formData.append('file', file);

    const uploadResponse = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/adimages?access_token=${T_TOKEN}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      console.error('Upload failed with response:', errorData);
      throw new Error(errorData.error.message);
    }

    const imageData = await uploadResponse.json();
    return imageData.images['test-image.png'];
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

export async function verifyAdCreative(adCreativeId: any) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}}/${ADCREATIVE_ID}?fields=object_story_spec&access_token=${T_TOKEN}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    const adCreativeDetails = await response.json();
  } catch (error) {
    console.error('Error verifying ad creative:', error);
  }
}

export async function ScheduleDelivery(creativeAdId: any) {
  const payload = {
    name: 'My Ad',
    adset_id: '120200530069980577',
    creative: {
      creative_id: creativeAdId,
    },
    status: 'PAUSED',
    campaign_id: '120213408679270679',
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/ads`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    const responseData = await response.json();
    notification.success('ScheduleDelivery successfully !', 3000);
  } catch (error: any) {
    notification.danger(error, 3000);
    console.error('Error creating ad set:', error);
  }
}

export async function searchCountries(): Promise<void> {
  const query: string = 'united';

  try {
    const response: Response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/search?location_types=["country"]&type=adgeolocation&q=${query}&access_token=${T_TOKEN}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      const errorData: any = await response.json();
      throw new Error(errorData.error.message);
    }

    const countries: any = await response.json();
  } catch (error) {
    console.error('Error searching for countries:', error);
  }
}

export async function searchInterests(): Promise<void> {
  const query: string = 'movie';

  try {
    const response: Response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/search?type=adinterest&q=${query}&access_token=${T_TOKEN}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      const errorData: any = await response.json();
      throw new Error(errorData.error.message);
    }

    const interests: any = await response.json();
    return interests;
  } catch (error) {
    console.error('Error searching for interests:', error);
  }
}

export async function getAllCampaigns(): Promise<void> {
  const neededFields =
    'name, objective, daily_budget, status, start_time, stop_time';
  const fbURL = `https://graph.facebook.com/${FB_API_VERSION}/act_1338359276753508/campaigns?fields=${neededFields}`;
  try {
    const response = await fetch(fbURL, {
      headers: {
        Authorization: `Bearer ${T_TOKEN}`,
      },
    });
    const fbGraphResponse = await response.json();
    return fbGraphResponse;
  } catch (error) {
    console.log('GetAllCampaigns error:', error);
  }
}

export async function GetAdsPreviews() {
  const fields = `
        account_id,
        campaign_id,
        adset_id,
        name,
        status,
        created_time,
        updated_time,
        effective_status,
        bid_amount,
        budget_rebalance_flag,
        configured_status,
        insights,
        creative{
            id,
            name,
            object_story_spec{
                link_data{
                    image_hash,
                    description
                }
            }
        },
        optimization_goal,
        scheduled_publish_time
      `;
  const url = `https://graph.facebook.com/v18.0/act_1338359276753508/ads?fields=${fields}&access_token=${Token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('Error response from API:', data);
      return data;
    }
    return data.data;
  } catch (err: any) {
    console.error('Fetch error:', err);
    return err.message;
  }
}

export async function GetpostPreviews() {
  //  const fields = `
  //      message,
  //      created_time,
  //      full_picture,
  //      scheduled_publish_time
  //    `;
  const fields = `message,created_time,full_picture,scheduled_publish_time,is_published,status_type,permalink_url`;
  const token =
    'EAATyloueTgYBOxgKWtGx1wAebfH1OPYsQjmd3QC3vMLQB4WGMnswIesVtFvwAt6mDVceiKqKiaNwV7WgwqZBFZCvfuS9r7Eji9f50kUZAtSVL6vZAXQtCllsO0sxP6ckcZCZBvQYrw6sIFxbiG9JC3xinBHFgg1FNx1K67KLMgjkjfcYP8nEaC2bO0cdQ1K4wK8Ux6E7jVZBThib0cZD';

  const url = `https://graph.facebook.com/110690242132648/posts?fields=${fields}&access_token=${token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    //const data = [];

    return data.data;
    //return data;
  } catch (err: any) {
    return err.message;
  }
}

export async function getAdsPreviewData() {
  const fields =
    'campaign,name,status,full_picture,creative,adset,effective_status';
  const url = `https://graph.facebook.com/v13.0/${AD_ACCOUNT_ID_1}/ads?fields=${fields}&access_token=${T_TOKEN}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (err: any) {
    return err.message;
  }
}

//export async function getAdsPreviewData() {
//  const fields = 'campaign,name,status,full_picture,adset_id';
//  const token =
//    'EAATyloueTgYBOzt4Vidq4BnSfjLZB39Bmy3VmuZBTAjBh3jPcPbLpqIUlfNTUs0QSG158vJMpg5WM6A1nXzTP88PqrbFrZCt0ejmpPBmsEsGrdgX5iPDO0GWP450GIH4NGEwCQwNTNZA9oNZCC83O0oFq6uSQHpchqE4Bv7tAZACOuo4s52ZBoHVxEjwcZAWb0TjAgj4o5a66ataVG0ZD';
//
//  const adsUrl = `https://graph.facebook.com/v20.0/${AD_ACCOUNT_ID_2}/ads?fields=${fields}&access_token=${token}`;
//
//  try {
//    const adsResponse = await fetch(adsUrl);
//
//    const adsData = await adsResponse.json();
//    if (!adsData || !adsData.data) {
//      //  throw new Error('Invalid response structure');
//    }
//    console.log('adData+++++++', adsData);
//    const adsetPromises = adsData?.data?.map(async (ad: any) => {
//      if (!ad.adset_id) {
//        throw new Error('Ad does not have an adset_id');
//      }
//      const adsetUrl = `https://graph.facebook.com/v20.0/${ad.adset_id}?fields=name,status,optimization_goal,billing_event,daily_budget&access_token=${token}`;
//      const adsetResponse = await fetch(adsetUrl);
//      if (!adsetResponse.ok) {
//        throw new Error(`Error fetching adset+++++++: ${adsetResponse.json()}`);
//      }
//
//      const adsetData = await adsetResponse.json();
//      return {
//        ...ad,
//        adset: adsetData,
//      };
//    });
//
//    const adsWithAdsets = await Promise.all(adsetPromises);
//    return adsWithAdsets;
//  } catch (err: any) {
//    return { error: err.message };
//  }
//}

export async function Previews() {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${AD_ID}/previews`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${T_TOKEN}`,
        },
      }
    );
    const data = await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function PreviewsADCREATIVEID() {
  const addFormate = '<AD_FORMAT>';
  const formData = new FormData();
  formData.append('name', addFormate);
  try {
    const response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${ADCREATIVE_ID}/previews
          `,
      {
        method: 'GET',
        body: formData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${T_TOKEN}`,
        },
      }
    );
    const data = await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function Get_Ad_Archive() {
  const searchTerms = 'california';
  const adType = 'POLITICAL_AND_ISSUE_ADS';
  const adReachedCountries = ['US'];

  const url = `https://graph.facebook.com/${FB_API_VERSION}/ads_archive?search_terms=${encodeURIComponent(searchTerms)}&ad_type=${encodeURIComponent(adType)}&ad_reached_countries=${encodeURIComponent(JSON.stringify(adReachedCountries))}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${FB_token}`,
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function Get_All_Ad_Archive() {
  const fields = `
      ad_creation_time,
      ad_delivery_start_time,
      ad_delivery_stop_time,
      ad_snapshot_url,
      currency,
      demographic_distribution,
      impressions,
      page_id,
      page_name,
      spend
    `;
  const search_terms = 'california';
  const ad_type = 'POLITICAL_AND_ISSUE_ADS';
  const ad_reached_countries = 'US';
  const url = `https://graph.facebook.com/v18.0/ads_archive?search_terms=${search_terms}&ad_type=${ad_type}&ad_reached_countries=${ad_reached_countries}&fields=${fields}&access_token=${FB_token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (err: any) {
    return err.message;
  }
}

export async function getCreativeById() {
  const fields = `
    name,status,thumbnail_url,effective_object_story_id,object_story_spec,account_id,adlabels,asset_feed_spec,body,call_to_action_type,effective_instagram_story_id,image_url,link_url,title
    `;
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${creativeId}?fields=${fields}&access_token=${FB_token}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err: any) {
    return err.message;
  }
}

export async function getAdSetById() {
  const fields = `
    name,status,effective_status,campaign_id,configured_status,created_time,updated_time,budget_remaining,campaign,targeting,insights,bid_amount
      `;
  const access_token =
    'EAATyloueTgYBO47AEMOskgkWcEKWuWYWEpx7ccZASzlr0G9xZB6P4F9O8kHKg0vvjgKF9l86SrLcJFTkzmTOiMiQxBapyFKTM9fqDJAxZB31rz1iPcCSKwjASSWGYYRcNZBwjJZBFs8SzqzuR8d43vZBZAdKH09HlzZAbpFclZAK7yNcyRe9b7PzZAlTU2rIrOROugMZCO5uQVc';

  const url = `https://graph.facebook.com/${FB_API_VERSION}/${adSetId}?fields=${fields}&access_token=${access_token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err: any) {
    return err.message;
  }
}
export async function getLocation() {
  const API_Version = 'v19.0';
  const locationType = ['country'];
  const type = 'adgeolocation';
  const access_token =
    'EAATyloueTgYBO47AEMOskgkWcEKWuWYWEpx7ccZASzlr0G9xZB6P4F9O8kHKg0vvjgKF9l86SrLcJFTkzmTOiMiQxBapyFKTM9fqDJAxZB31rz1iPcCSKwjASSWGYYRcNZBwjJZBFs8SzqzuR8d43vZBZAdKH09HlzZAbpFclZAK7yNcyRe9b7PzZAlTU2rIrOROugMZCO5uQVc';
  const url = `https://graph.facebook.com/${API_Version}/search?location_types=${locationType}&type=${type}&q=united&access_token=${access_token}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (err: any) {
    return err.message;
  }
}

export async function Get_Ad_Draft() {
  const fields =
    'name,status,creative,adset_id,effective_status,campaign_id,configured_status,created_time,updated_time,tracking_specs';
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/ads?status=DRAFT&access_token=${FB_token}&fields=${fields}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (err: any) {
    return err.message;
  }
}

export async function deletePost(page_post_id: any) {
  const accessToken =
    'EAATyloueTgYBOyP4NcxRoscmDio8iFFY8lZA1Cow0VoHj1uQVI0wj3RygtnicHXXUjpSkkwW8IXd4kBdiIIi9BLyaBDvXpdzQQvIPOQBZAKErY3CD43oTdVhybxSqEXQm1ZCsXfgZBXh55FrUnpdzMc04z7HM8vTpsIQdNZAX5ctCRStfPo0XmsoYbeuZCty4XXZAdL6KDCbtNp0ocZD';
  const FB_API_VERSION = 'v18.0';
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${page_post_id}?access_token=${accessToken}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (response.ok) {
    } else {
      const error = await response.json();
      console.error('Failed to delete post:', error);
      throw new Error(error.error.message);
    }
  } catch (error: any) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

export async function GetInterestsData() {
  const FB_API_VERSION = 'v11.0';
  const url = `https://graph.facebook.com/${FB_API_VERSION}/search?type=adinterest&q=baseball&access_token=${FB_token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (err) {
    return err.message;
  }
}

export async function GetBehaviorsData() {
  const FB_API_VERSION = 'v11.0';
  const url = `https://graph.facebook.com/${FB_API_VERSION}/search?type=adTargetingCategory&class=behaviors&access_token=${FB_token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (err) {
    return err.message;
  }
}

export async function getCreativeDetails(creativeId: string) {
  const fields = 'thumbnail_url';
  const token =
    'EAATyloueTgYBOzt4Vidq4BnSfjLZB39Bmy3VmuZBTAjBh3jPcPbLpqIUlfNTUs0QSG158vJMpg5WM6A1nXzTP88PqrbFrZCt0ejmpPBmsEsGrdgX5iPDO0GWP450GIH4NGEwCQwNTNZA9oNZCC83O0oFq6uSQHpchqE4Bv7tAZACOuo4s52ZBoHVxEjwcZAWb0TjAgj4o5a66ataVG0ZD';

  const url = `https://graph.facebook.com/v13.0/${creativeId}?fields=${fields}&access_token=${token}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (err: any) {
    return err.message;
  }
}

// for create new post APIs

export async function schedulePost(Details: any) {
  try {
    const imageUploadPromises = Details.media.map(async (res: any) => {
      return await uploadPhoto('/images/' + res.src);
    });
    const imageIds = await Promise.all(imageUploadPromises);
    if (imageIds.some(id => !id)) {
      throw new Error(
        'One or more image uploads failed, received invalid image ID.'
      );
    }
    const attachedMedia = imageIds.map((id: any) => ({ media_fbid: id.id }));

    const url = `https://graph.facebook.com/${FB_API_VERSION}/${PAGE_ID}/feed`;
    const payload = {
      message: Details.fb_message,
      link: Details.link,
      published: 'false',
      scheduled_publish_time: Math.floor(Details.dateTime / 1000) + 3600,
      targeting: {
        geo_locations: {
          countries: ['US'],
          cities: [{ key: '296875' }],
        },
      },
      attached_media: attachedMedia,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${P_PAGE_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.error('API Error Response:', responseData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    notification.success('Post ScheduleDelivery successfully !', 3000);
    return responseData;
  } catch (error) {
    console.error('Error scheduling post:', error);
    notification.danger('Error scheduling post', 3000);
    throw error;
  }
}

export async function uploadPhoto(imageUrl: any) {
  if (!imageUrl) {
    console.error('No image URL provided');
    return;
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();
    const file = new File([blob], imageUrl, { type: blob.type });

    const formData = new FormData();
    formData.append('source', file);
    formData.append('published', 'false');

    const uploadResponse = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${PAGE_ID}/photos?access_token=${P_PAGE_TOKEN}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      console.error('Upload failed with response:', errorData);
      throw new Error(errorData.error.message);
    }
    const imageData = await uploadResponse.json();
    return imageData;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

export async function getAdEngagementData(adId: string) {
  const fields = 'impressions,reach,clicks,actions';
  const url = `https://graph.facebook.com/v20.0/${adId}/insights?fields=${fields}&access_token=${T_TOKEN}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error fetching ad engagement data: ${await response.json()}`
      );
    }

    const data = await response.json();
    return data.data; // Typically, insights data is within the 'data' array
  } catch (err: any) {
    return { error: err.message };
  }
}
