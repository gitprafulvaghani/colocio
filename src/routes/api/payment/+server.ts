import type { PayPalWebhookEvent } from '$types/paypal';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

async function verifyPayPalWebhook(
  event: PayPalWebhookEvent,
  headers: Headers
): Promise<boolean> {
  const PAYPAL_CLIENT_ID = '';
  const PAYPAL_SECRET = '';
  const PAYPAL_API = '';
  const PAYPAL_WEBHOOOK_ID = '';

  const response = await fetch(
    'https://api-m.paypal.com/v1/notifications/verify-webhook-signature',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
      },
      body: JSON.stringify({
        auth_algo: headers.get('paypal-auth-algo'),
        cert_url: headers.get('paypal-cert-url'),
        transmission_id: headers.get('paypal-transmission-id'),
        transmission_sig: headers.get('paypal-transmission-sig'),
        transmission_time: headers.get('paypal-transmission-time'),
        webhook_id: PAYPAL_WEBHOOOK_ID,
        webhook_event: event,
      }),
    }
  );

  const verification = await response.json();
  return verification.verification_status === 'SUCCESS';
}

// POST Endpoint
export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const event: PayPalWebhookEvent = await request.json();
    console.log('<API:Payment> Received event: ', event);

    // Only listen for the subscription activated event
    if (event.event_type === 'BILLING.SUBSCRIPTION.ACTIVATED') {
      const { given_name, surname } = event.resource.subscriber.name;
      const userEmail = event.resource.subscriber.email_address;
      const subscriptionId = event.resource.id;
      const data = {
        paypalSubscriptionID: subscriptionId,
        first_name: given_name,
        last_name: surname,
      };

      // TODO: Check that the webhook came from PayPal

      try {
        const signUpSuccess = await locals.colocio.signUpOTP(userEmail, data);
        if (signUpSuccess) {
          console.log(
            '<API:Payment> Sign-up successful, email sent with magic link'
          );
          return json({ status: 'success', data: data }, { status: 200 });
        } else {
          console.error('<API:Payment> Sign-up failed');
          return json(
            {
              status: 'fail',
              message: 'Failed to sign up user with the provided data.',
            },
            { status: 400 }
          );
        }
      } catch (error) {
        console.error('<API:Payment> Error during sign-up process: ', error);
        return json(
          {
            status: 'fail',
            message: 'An error occurred while creating a new user.',
            error,
          },
          { status: 500 }
        );
      }
    }

    console.warn(
      '<API:Payment> Received an unsupported event type: ',
      event.event_type
    );
    return json(
      { status: 'fail', message: 'Unsupported event type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('<API:Payment> Failed to parse request: ', error);
    return json(
      {
        status: 'fail',
        message: 'Failed to parse the request body.',
        error,
      },
      { status: 400 }
    );
  }
};
