export type PayPalDataObject = {
  paypalSubscriptionID: string;
  first_name: string;
  last_name: string;
};
export interface PayPalWebhookEvent {
  id: string;
  create_time: string;
  event_type: string;
  event_version: string;
  resource_type: string;
  resource_version: string;
  summary: string;
  resource: {
    id: string;
    status: string;
    status_update_time: string;
    plan_id: string;
    start_time: string;
    quantity: string;
    shipping_amount: {
      currency_code: string;
      value: string;
    };
    subscriber: {
      name: {
        given_name: string;
        surname: string;
      };
      email_address: string;
      shipping_address: {
        name: {
          full_name: string;
        };
        address: {
          address_line_1: string;
          address_line_2: string;
          admin_area_2: string;
          admin_area_1: string;
          postal_code: string;
          country_code: string;
        };
      };
    };
    auto_renewal: boolean;
    billing_info: {
      outstanding_balance: {
        currency_code: string;
        value: string;
      };
      cycle_executions: {
        tenure_type: string;
        sequence: number;
        cycles_completed: number;
        cycles_remaining: number;
        current_pricing_scheme_version: number;
      }[];
      last_payment: {
        amount: {
          currency_code: string;
          value: string;
        };
        time: string;
      };
      next_billing_time: string;
      final_payment_time: string;
      failed_payments_count: number;
    };
    create_time: string;
    update_time: string;
    links: {
      href: string;
      rel: string;
      method: string;
    }[];
  };
  links: {
    href: string;
    rel: string;
    method: string;
  }[];
}
