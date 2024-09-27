type AdAccount = {
    id: string;
    account_id: string;
    name: string;
    age: number;
    account_status: number;
    currency: string;
    is_prepay_account: boolean;
    owner: string;
    timezone_id: number;
    user_tasks: string[];
    created_time: string;
    funding_source_details: {
        id: string;
        display_string: string;
        type: number;
        coupon?: {
            amount: number;
            currency: string;
            display_amount: string;
            expiration: string;
        };
    };
    business?: {
        id: string;
        name: string;
    };
    end_advertiser_name?: string;
    end_advertiser?: string;
};

type InstagramAccount = {
    /** Instagram business account ID */
    id: string;
    username: string;
    profile_pic: string;
    name?: string;
    biography?: string;
    profile_picture_url?: string;
    followers_count?: number;
    follows_count?: number;
};

type BusinessAccount = {
    id: string;
    name: string;
    timezone_id: number;
    /** The vertical industry that this business associates with, or
     * belongs to. */
    vertical: string;
    profile_picture_uri: string;
    verification_status: string;
    /** The primary page name and ID. Use this to connect a business account with its page account */
    primary_page?: { name: string; id: string };
    two_factor_type?: string;
    /** @deprecated Instagram accounts here does not always represent an account with permissions. */
    instagram_accounts?: { data: InstagramAccount[] };
};

type PageAccountCategory = {
    id: string;
    name: string;
};

type PageAccount = {
    /** The page ID. */
    id: string;
    /** Page access token. This token does not expire. */
    access_token: string;
    /** The category of the page. */
    category: string;
    category_list: PageAccountCategory[];
    name: string;
    /** The tasks that the user token can perform on the page. */
    tasks: string[];
    /** The about info for the page. Not all pages have about field completed. */
    about?: string;
    profile_picture_url?: string;
};

type PixelAccount = {
    id: string;
    name: string;
    code: string;
    owner_ad_account: { account_id: string; id: string };
};

export type StatusResponse = {
    status:
        | 'authorization_expired'
        | 'connected'
        | 'not_authorized'
        | 'unknown';
    authResponse: {
        userID: string;
        expiresIn: number;
        accessToken?: string | undefined;
        data_access_expiration_time?: number | undefined;
        signedRequest?: string | undefined;
        grantedScopes?: string | undefined;
        reauthorize_required_in?: number | undefined;
        code?: string | undefined;
    };
};

/**
 * Type definition for the response received when exchanging a short-lived
 * Facebook access token for a long-lived one.
 *
 * @typedef {Object} AccessTokenResponse
 * @property {string} access_token - The long-lived access token.
 * @property {string} token_type - The type of the access token, typically
 * "bearer".
 * @property {number} expires_in - The time in seconds when the access
 * token will expire.
 */
export type AccessTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
};

export type AdAccounts = AdAccount[];
export type BusinessAccounts = BusinessAccount[];
export type Pages = PageAccount[];
export type InstagramAccounts = InstagramAccount[];
export type Pixels = PixelAccount[];
