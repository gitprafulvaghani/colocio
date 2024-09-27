// NOTE: Step 1: Create a campaign for the Facebook Ad Account.
export const createPromotion = async (
  accessToken: string,
  adAccountId: string
) => {
  const special_ad_categories: string[] = [];
  try {
    const formData = new FormData();
    formData.append('name', 'My campaign');
    formData.append('objective', 'OUTCOME_LEADS');
    formData.append('status', 'PAUSED');
    formData.append(
      'special_ad_categories',
      JSON.stringify(special_ad_categories)
    );

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${adAccountId}/campaigns`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    //NOTE: On success would return the ID of the newly crated campaign.
    const data = await response.json();
    console.log('Promotion.ts:', data);
    return data.id;
  } catch (error) {
    console.log('Error from createPromotion() (Promotion.ts):', error);
    return error;
  }
};

// NOTE: Step 2: Create a targeting attributes.
export const targeting = async (
  accessToken: string,
  adAccountId: string
) => {
  try {
    return { accessToken, adAccountId };
  } catch (error) {
    console.log('Error from targeting() (Promotion.ts):', error);
    return error;
  }
};
