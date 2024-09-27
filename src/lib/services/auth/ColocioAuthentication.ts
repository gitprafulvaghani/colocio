import {
  PUBLIC_SUPABASE_MAGIC_REDIRECT,
  PUBLIC_SUPABASE_REDIRECT_URL,
  PUBLIC_SUPABASE_RESET_PASSWORD_REDIRECT_URL,
} from '$env/static/public';
import type { PayPalDataObject } from '$types/paypal';
import type {
  EmailOtpType,
  Provider,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { AuthenticationError } from '../ColocioErrors';

export class SupabaseAuthImplementation {
  private supabaseAuth;

  constructor(activeSupabaseInstance: SupabaseClient) {
    this.supabaseAuth = activeSupabaseInstance.auth;
    console.log('<Colocio:Auth> Initialized.');
  }

  /**
   * Performs `OAuth` signin process over `supabase` instance
   *
   * @param provider OAuth provider enum
   *
   * @returns `URL` that user should be redirected towards
   * @throws `AuthenticationError` describing the issue
   *
   * @remarks
   * Other part of the OAuth signup process is handled via callback pages.
   * See other parts of code for complete OAuth process.
   */
  public async performOAuthSignin(provider: Provider): Promise<string> {
    const { data, error: _error } = await this.supabaseAuth.signInWithOAuth({
      provider,
      options: {
        redirectTo: PUBLIC_SUPABASE_REDIRECT_URL,
      },
    });

    // check for any errors and reject if any
    if (_error) {
      //TODO: Inspect errors and throw different types instead
      console.log('<Colocio:Auth> Oauth signin errored', _error.cause);
      console.log('\tReason: ', _error.cause);
      console.log('\tCode: ', _error.code);
      console.log('\tMessage: ', _error.message);
      return Promise.reject(new AuthenticationError(_error.message));
    }

    console.log(
      '<Colocio:Auth> OAuth singin success, redirect link: ',
      data.url
    );
    return Promise.resolve(data.url);
  }

  public async processOAuthCode(code: string): Promise<boolean> {
    const { data, error } =
      await this.supabaseAuth.exchangeCodeForSession(code);

    // check for any errors:
    if (error) {
      console.log('<Colocio:Auth> Code exchange errored: ', error);
      return Promise.reject(new AuthenticationError(error.message));
    }

    // return the actual data (object containing user and sesion data)
    console.log('<Colocio:Auth> OAuth code processing returned: ', data);
    return Promise.resolve(true);
  }

  /**
   * Performs email and password signup via `supabase` instance.
   *
   * @param email User's email
   * @param passwordHash User's password
   *
   * @throws `ColocioAuthError` containing error data
   * @returns A `Promise<User>` object containing signed up user data
   *
   * @remarks
   * User passwords should be hashed and then passed to this function.
   */
  public async performEmailPasswordSignUp(
    email: string,
    passwordHash: string
  ): Promise<User> {
    console.log('<Colocio:Auth> Performing EP signup...');
    try {
      const { data, error } = await this.supabaseAuth.signUp({
        email: email,
        password: passwordHash,
      });
      if (error) {
        console.log('<Colocio:Auth> EP signup errored');
        return Promise.reject(new AuthenticationError(error.message));
      }

      // get the user from the response
      const { user } = data;
      console.log('<Colocio:Auth> New user ID: ', user?.id);
      console.log('<Colocio:Auth> EP signup completed.');

      return Promise.resolve(user!);
    } catch (error) {
      console.log('<Colocio:Auth> EP Signup errored', error);
      return Promise.reject(error);
    }
  }

  /**
   * Performs email and password sign in via `supabase` instance.
   *
   * @param email User's email
   * @param passwordHash User's password
   *
   * @returns A `Promise<User>` object containing signed-in data
   * @throws `ColocioAuthError` containing error data
   *
   * @remarks
   * User passwords should be hashed and then passed to this function.
   */
  public async performEmailPasswordSignIn(email: string, password: string) {
    try {
      console.log('<Colocio:Auth> Performing email signin ...');
      const { data, error } = await this.supabaseAuth.signInWithPassword({
        email: email,
        password: password,
      });

      // check for errors
      if (error) {
        console.log('<Colocio:Auth> Signin errored, reason: ', error);
        return Promise.reject(new AuthenticationError(error.message));
      }

      const { user } = data;
      console.log('<Colocio:Auth> EP signin completed. User ID: ', user?.id);
      return Promise.resolve(user);
    } catch (error) {
      console.log('<Colocio:Auth> EP signin errored: ', error);
      return Promise.reject(error);
    }
  }

  /**
   * Signs up a user using a magic link sent to their email.
   *
   * This function utilizes the Supabase authentication method `signInWithOtp` to
   * send a magic link to the provided email address. If the user does not already
   * exist, it will create a new user. The function returns the data from the
   * Supabase response if successful, or throws an error if there was an issue.
   *
   * @param {string} email - The email address to send the magic link to.
   * @returns {Promise<any>} - A promise that resolves to the data from the
   * Supabase response if the magic link was sent successfully, or throws an error
   * if there was an issue.
   * @throws {Error} - Throws an error if the magic link sign-up fails.
   */
  public async performMagicLinkSignUp(
    email: string,
    paypalData: PayPalDataObject
  ) {
    try {
      const { data, error } = await this.supabaseAuth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: PUBLIC_SUPABASE_MAGIC_REDIRECT,
          data: paypalData,
        },
      });

      if (error) {
        console.log(
          '<Colocio:Auth> Error using OTP method to sign in, reason: ',
          error
        );
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.log('<Colocio:Auth> Magic link sign-up errored: ', error);
      throw error;
    }
  }

  // TODO: Add docs
  public async verifyOTP(token_hash: string, type: EmailOtpType) {
    try {
      const { data, error } = await this.supabaseAuth.verifyOtp({
        token_hash,
        type,
      });
      if (data) {
        return true;
      }
      if (error) {
        throw new Error(error.message);
      }
      return false;
    } catch (err) {
      console.log('\t <Colocio:Auth> Error in verifying OTP, reason: ', err);
      return false;
    }
  }

  // Resets a password for given email
  public async resetPasswordFor(email: string): Promise<boolean> {
    const redirectTo =
      PUBLIC_SUPABASE_RESET_PASSWORD_REDIRECT_URL + '&email=' + email;

    const { data, error } = await this.supabaseAuth.resetPasswordForEmail(
      email,
      { redirectTo }
    );
    if (error) {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }

  /**
   * Logs out current user
   *
   * @returns A `boolean` flag indicating success or failure of the logout process
   *
   * @description
   * Result of this method will be "visible" on client side authentication listener as new LOGOUT event will be fired.
   */
  public async performLogout() {
    const { error } = await this.supabaseAuth.signOut();
    if (error) {
      console.log('<Colocio:Auth> Logout errored, description: ', error);
      return Promise.reject(new AuthenticationError(error.message));
    }

    return Promise.resolve(true);
  }
}
