import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from '$env/static/public';
import type { PayPalDataObject } from '$types/paypal';
import type { Database } from '$types/supabase';
import {
  createBrowserClient,
  createServerClient,
  isBrowser,
  parse,
} from '@supabase/ssr';
import type {
  AuthResponse,
  EmailOtpType,
  Provider,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';
import { AccountError, AuthenticationError } from './ColocioErrors';
import { SupabaseAuthImplementation } from './auth/ColocioAuthentication';
import { SupabaseStorageImplementation } from './database/ColocioDB';

// Identifier used to mark hooks and load function dependencies
export const INVALIDATION_IDENTIFIER = 'colocio:supabase_services';

export class ColocioImplementation {
  // private storage: SupabaseStorageImplementation;
  private _authReference: SupabaseAuthImplementation;

  // public methods
  public _supaInstance: SupabaseClient<Database>;
  public storage: SupabaseStorageImplementation;

  constructor(_event: RequestEvent) {
    this._supaInstance = createServerClient<Database>(
      PUBLIC_SUPABASE_URL,
      PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get: key => _event.cookies.get(key),
          /**
           * Note: You have to add the `path` variable to the
           * set and remove method due to sveltekit's cookie API
           * requiring this to be set, setting the path to an empty string
           * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
           */
          set: (key, value, options) => {
            _event.cookies.set(key, value, { ...options, path: '/' });
          },
          remove: (key, options) => {
            _event.cookies.delete(key, { ...options, path: '/' });
          },
        },
      }
    );

    // initialize auth and storage components
    this._authReference = new SupabaseAuthImplementation(this._supaInstance);
    this.storage = new SupabaseStorageImplementation(this._supaInstance);
    console.log('<ColocioService> Initialization completed.');
  }

  /*  PUBLIC METHODS  */

  public getBrowserClient(currentSession: Session): SupabaseClient {
    return createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      global: {
        fetch,
      },
      cookies: {
        get(key) {
          if (!isBrowser()) {
            return JSON.stringify(currentSession);
          }

          const cookie = parse(document.cookie);
          return cookie[key];
        },
      },
    });
  }

  /**
   * Function that tries to retrieve currently logged-in user.
   *
   * @returns Currently active `User` object or `null` otherwise
   */
  public async getCurrentUser(): Promise<User | null> {
    // getting user object this way creates "code insecure warnings"
    const {
      data: { user },
      error,
    } = await this._supaInstance.auth.getUser();

    if (error) {
      console.log('<ColocioService> Getting user object errored: ', error.code);
      // NOTE: To avoid any throws or promise rejections
      // return null instead and inspect errors
      return null;
    }

    // return currently active user
    return user;
  }

  public async getCurrentSession(): Promise<Session | null> {
    const { data, error } = await this._supaInstance.auth.getSession();
    if (error) return Promise.resolve(null);

    const { session } = data;
    return Promise.resolve(session);
  }

  /*  AUTH METHODS  */

  /**
   * Performs sign up process for new users.
   * Sign up method tries to create new profile automatically.
   *
   * @param email User's email address
   * @param password User's password
   *
   * @throws `AuthenticationError` describing the error
   *
   * @returns `boolean` flag indicating success or failure of the sign up process
   *
   * @remarks
   * User password should be hashed before sending to this method
   */
  public async signUp(email: string, password: string): Promise<boolean> {
    try {
      // perform sign up through auth reference
      const user = await this._authReference.performEmailPasswordSignUp(
        email,
        password
      );

      // check if this user already exists
      const userExists = await this.storage.checkIfUserExists(user);

      // check if we need to create new profile
      if (!userExists) {
        const success = await this.storage.createUserProfile(user);
        return Promise.resolve(true);
      } else {
        return Promise.reject(new AccountError('Account already exist'));
      }
    } catch (signupError) {
      console.log('<Colocio:SingupEP> Errored. Reason: ', signupError);
      return Promise.reject(signupError);
    }
  }

  /**
   * Signs up a user using a magic link sent to their email by calling
   * `performMagicLinkSignUp`.
   *
   * This function tries to sign up a user by invoking the
   * `performMagicLinkSignUp` method on the `_authReference` object. It utilizes
   * Supabase's authentication method `signInWithOtp` to send a magic link to
   * the provided email address. If the user does not already exist, it will
   * create a new user. The function returns a boolean indicating the success of
   * the operation. Any errors encountered during the process are logged to the
   * console.
   *
   * @param {string} email - The email address to send the magic link to.
   * @param {Object} paypalData - The PayPal data object associated with the user.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the
   * magic link sign-up was successful, or `false` if there was an error.
   */
  public async signUpOTP(
    email: string,
    paypalData: PayPalDataObject
  ): Promise<boolean> {
    try {
      const data = await this._authReference.performMagicLinkSignUp(
        email,
        paypalData
      );
      console.log('<Colocio:SignUpOTP> Sign-up successful. Data: ', data);
      return true;
    } catch (error) {
      console.error('<Colocio:SignUpOTP> Errored. Reason: ', error);
      return false;
    }
  }

  /**
   * Verifies a user using an OTP (one-time password) token.
   *
   * This function verifies a user by invoking the `verifyOTP` method on the
   * `_authReference` object. It uses the provided token hash and type to
   * perform the verification. The function returns a boolean indicating the
   * success of the verification process. Any errors encountered during the
   * process are handled and the function resolves to `false`.
   *
   * @param {string} token_hash - The hash of the OTP token to verify.
   * @param {EmailOtpType} type - The type of the OTP, indicating the purpose
   * of the verification.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the OTP
   * verification was successful, or `false` if there was an error.
   */
  public async verifyOTP(
    token_hash: string,
    type: EmailOtpType
  ): Promise<boolean> {
    try {
      await this._authReference.verifyOTP(token_hash, type);
      console.log('<Colocio:VerifyOTP> OTP verification successful.');
      return true;
    } catch (error) {
      console.error(
        '<Colocio:VerifyOTP> OTP verification failed. Reason: ',
        error
      );
      return false;
    }
  }

  /**
   * Performs general sign in process via email and password.
   *
   * @param email User's email
   * @param password User's password
   *
   * @returns `boolean` flag indicating success or failure
   * @throws `AuthenticationError` in case something got wrong
   *
   * @remarks
   * User password should be hashed before pasing in to this method.
   */
  public async signIn(email: string, password: string): Promise<boolean> {
    // TODO: hash password once more just in case ??
    // perform supabase sign in process
    try {
      const user = await this._authReference.performEmailPasswordSignIn(
        email,
        password
      );
      //
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Performs general `OAuth` sign in process via given provider.
   *
   * @param provider Supabase `OAuth` provider
   *
   * @returns `string` containing the URL code to redirect to
   * @throws `AuthenticationError` in case something was wrong
   *
   * @remarks
   * Other part of the OAuth sign up process is handled via callback pages.
   * See other parts of code for complete OAuth process.
   */
  public async oAuthSignin(provider: Provider): Promise<string> {
    try {
      // perform OAuth sign in through auth reference
      const urlRedirect =
        await this._authReference.performOAuthSignin(provider);
      return Promise.resolve(urlRedirect);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Process OAuth challenge returned by the provider callback
   *
   * @param code OAuth challenge code retreived by proveder(s)
   * @returns `AuthResponse` object containing active user and session data
   */
  public async processOAuthCode(code: string): Promise<AuthResponse> {
    try {
      const response =
        await this._supaInstance.auth.exchangeCodeForSession(code);
      return Promise.resolve(response);
    } catch (_authError) {
      return Promise.reject(new AuthenticationError(_authError.message));
    }
  }

  public async resetPassword(email: string) {
    // reset password through auth instance
    const success = await this._authReference.resetPasswordFor(email);
    return Promise.resolve(success);
  }

  public async logout() {
    const success = await this._authReference.performLogout();
  }
}
