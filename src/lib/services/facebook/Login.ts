import type { StatusResponse } from '$types/facebookAccounts';
import { PUBLIC_FACEBOOK_CONFIG_ID } from '$env/static/public';
import { json } from '@sveltejs/kit';

/**
 * Initiates a login process using Facebook's JavaScript SDK.
 *
 * This function attempts to log the user in via Facebook. On successful login,
 * it exchanges the short-lived token for a long-lived token. It resolves with
 * success status upon successful token exchange, and rejects with an error if
 * the login fails or token exchange is unsuccessful.
 *
 * @async
 * @function facebookLogin
 * @returns {Promise<{ success: boolean; error?: any }>} Promise object
 * representing the success status of the login and token exchange, and an error
 * object in case of failure.
 */
export const facebookLogin = async (): Promise<{
  success: boolean;
  error?: any;
}> => {
  return new Promise((resolve, reject) => {
    FB.login(
      function (response: StatusResponse) {
        if (response.status === 'connected') {
          exchangeLongLivedToken(response.authResponse.accessToken as string)
            .then(({ status }) => {
              if (status === 200) {
                resolve({ success: true });
              } else {
                reject({
                  success: false,
                  error: 'Could not exchange token',
                });
              }
            })
            .catch(error => {
              console.error('Error exchanging token');
              reject(error);
            });
        }
      },
      {
        config_id: PUBLIC_FACEBOOK_CONFIG_ID,
      }
    );
  });
};

/**
 * Exchanges a short-lived Facebook access token for a long-lived one.
 *
 * This function sends the short-lived token to a server endpoint, which is
 * responsible for exchanging it with a long-lived token. It handles both
 * successful exchanges and errors. For a successful exchange, it returns a
 * response with a status of 200. In case of an error, it logs the error and
 * returns a response with a status of 500 and an error message.
 *
 * @async
 * @param {string} shortLivedToken - The short-lived access token to be
 * exchanged.
 * @returns {Promise<any>} A promise that resolves with a success status and the
 * long-lived token, or rejects with an error message.
 */
async function exchangeLongLivedToken(shortLivedToken: string) {
  try {
    // console.log('Exchanging token (Login.ts)');
    const response = await fetch('/api/facebook/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shortLivedToken,
      }),
    });

    if (!response.ok) {
      console.error('Failed to exchange access token', response.statusText);
      throw new Error('Failed to exchange access token');
    }

    // TODO: Why is the API endpoint not returning a JSON object?
    // response.json() fails.
    // const longLivedToken: AccessTokenResponse = await response.json();

    return json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error exchanging token', error.message);
      return json({ success: false, error: error.message }, { status: 500 });
    } else {
      console.error('Error exchanging token', error);
      return json({ success: false, error: 'Unknown error' }, { status: 500 });
    }
  }
}
