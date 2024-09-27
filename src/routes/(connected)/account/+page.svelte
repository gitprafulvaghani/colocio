<script lang="ts">
    import type { PageData } from './$types';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';

    import {
        PUBLIC_FACEBOOK_APP_ID,
        PUBLIC_FACEBOOK_CONFIG_ID,
    } from '$env/static/public';
    // import LoginSignUp from '$lib/components/LoginSignUp.svelte';

    interface StatusResponse {
        status: LoginStatus;
        authResponse: AuthResponse;
    }

    type LoginStatus =
        | 'authorization_expired'
        | 'connected'
        | 'not_authorized'
        | 'unknown';

    interface AuthResponse {
        accessToken?: string | undefined;
        data_access_expiration_time?: number | undefined;
        expiresIn: number;
        signedRequest?: string | undefined;
        userID: string;
        grantedScopes?: string | undefined;
        reauthorize_required_in?: number | undefined;
        code?: string | undefined;
    }

    interface AccessTokenResponse {
        access_token: string;
        token_type: string;
        expires_in: number;
    }

    export let data: PageData;
    const fbResponse = writable<StatusResponse | null>(null);
    const longLivedStore = writable<AccessTokenResponse | null>(null);
    const test = writable<string>('');

    /**
     * A function that signs the user out of the application.
     * @param {Object} options - An object containing options for the
     * function.
     * @param {Function} options.cancel - A function to cancel the sign-out
     * process.
     */
    // const submitLogout: SubmitFunction = async ({ cancel }) => {
    //     const { error } = await data.supabase.auth.signOut();
    //     if (error) {
    //         console.log(error);
    //     }
    //     cancel();
    // };

    /**
     * Exchanges a short-lived Facebook access token for a long-lived token.
     * @param {string} shortLivedToken - The short-lived access token to
     * exchange.
     * @returns {Promise<string>} A promise that resolves with the long-lived
     * access token.
     */
    async function exchangeLongLivedToken(shortLivedToken: string) {
        const response = await fetch('/api/fb/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                shortLivedToken,
            }),
        });
        if (!response.ok) {
            console.error(
                'Failed to exchange access token',
                response.statusText
            );
            return;
        }

        const longLivedToken: AccessTokenResponse = await response.json();
        // console.log("Long lived token", longLivedToken);
        longLivedStore.set(longLivedToken);
    }

    /**
     * Logs the user in using Facebook's JavaScript SDK.
     * @function
     * @returns {void}
     */
    function FBLogin(): void {
        FB.login(
            /**
             * Callback function that is called when the user logs in using
             * Facebook's JavaScript SDK.
             * @callback loginCallback
             * @param {StatusResponse} response - The response from Facebook.
             * @returns {void}
             */
            function (response: StatusResponse) {
                // console.log("customFBLogin()", response);
                fbResponse.set(response);

                if (response.status === 'connected') {
                    exchangeLongLivedToken(
                        response.authResponse.accessToken as string
                    ).catch(error =>
                        console.error('Error exchanging token')
                    );
                }
            },
            {
                config_id: PUBLIC_FACEBOOK_CONFIG_ID,
            }
        );
    }

    function getFBdata(): void {
        FB.api(
            '/me',
            {
                fields: 'adaccounts{account_id,business,balance,amount_spent,business_name,currency,business_city,insights{social_spend}}',
                access_token: $longLivedStore?.access_token,
            },
            function (response) {
                console.log(response);
                if (response) {
                    test.set(response as string);
                }
            }
        );
    }

    // fbResponse.subscribe((value) => {
    // 	console.log("Store value:", value);
    // });

    onMount(() => {
        // TODO: Move this to a file that is loaded only when needed.
        window.fbAsyncInit = function () {
            FB.init({
                appId: PUBLIC_FACEBOOK_APP_ID,
                cookie: true,
                xfbml: false,
                version: 'v18.0',
            });
        };
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            if (fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs);
            }
        })(document, 'script', 'facebook-jssdk');
    });
</script>

<svelte:head>
    <title>Account | Colocio</title>
    <meta name="description" content="Account page of the Colocio app" />
    <meta
        name="keywords"
        content="colocio, ai, ads, facebook, meta, facebook ads, campaign"
    />
</svelte:head>

{#if data.session}
    <main
        class="flex flex-col items-center space-y-6 mx-auto max-w-7xl bg-white"
    >
        <div class="mx-auto min-w-full py-12 px-14">
            <div class="px-4 sm:px-0">
                <h3
                    class="text-base font-semibold leading-7 text-gray-900"
                >
                    Information
                </h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Login details.
                </p>
            </div>
            <div class="mt-6 border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                    <div
                        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    >
                        <dt
                            class="text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </dt>
                        <dd
                            class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        >
                            <span class="flex-grow"
                                >{data.session.user.email}</span
                            >
                            <span class="ml-4 flex-shrink-0">
                                <form action="/logout" method="post">
                                    <button
                                        class="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500"
                                        type="submit"
                                    >
                                        Sign Out
                                    </button>
                                </form>
                            </span>
                        </dd>
                    </div>
                    <div
                        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    >
                        <dt
                            class="text-sm font-medium leading-6 text-gray-900"
                        >
                            Connect Facebook
                        </dt>
                        <dd
                            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        >
                            <button
                                class="button secondary"
                                on:click={FBLogin}
                            >
                                Facebook
                            </button>
                        </dd>
                    </div>

                    {#if $fbResponse}
                        <div
                            class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                        >
                            <dt
                                class="text-sm font-medium leading-6 text-gray-900"
                            >
                                Facebook User ID
                            </dt>
                            <dd
                                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                            >
                                {$fbResponse.authResponse.userID}
                            </dd>
                        </div>
                        <div
                            class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                        >
                            <dt
                                class="text-sm font-medium leading-6 text-gray-900"
                            >
                                Facebook User Token
                            </dt>
                            <dd
                                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 whitespace-pre-wrap break-words"
                            >
                                {$fbResponse.authResponse.accessToken}
                            </dd>
                        </div>
                        <div
                            class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                        >
                            <dt
                                class="text-sm font-medium leading-6 text-gray-900"
                            >
                                Expires in
                            </dt>
                            <dd
                                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                            >
                                {$fbResponse.authResponse.expiresIn}
                            </dd>
                        </div>
                    {/if}

                    {#if $longLivedStore}
                        <div
                            class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                        >
                            <dt
                                class="text-sm font-medium leading-6 text-gray-900"
                            >
                                Long lived token
                            </dt>
                            <dd
                                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 break-words"
                            >
                                {$longLivedStore.access_token}
                            </dd>
                        </div>
                        <div
                            class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                        >
                            <dt
                                class="text-sm font-medium leading-6 text-gray-900"
                            >
                                Long lived token expires in
                            </dt>
                            <dd
                                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                            >
                                {$longLivedStore.expires_in}
                            </dd>
                        </div>
                    {/if}
                    <div
                        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    >
                        <dt
                            class="text-sm font-medium leading-6 text-gray-900"
                        >
                            Get some data
                        </dt>
                        <dd
                            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        >
                            <button
                                class="button secondary"
                                on:click={getFBdata}
                            >
                                Get Data
                            </button>
                        </dd>
                    </div>
                    {#if $test}
                        <div
                            class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                        >
                            <dt
                                class="text-sm font-medium leading-6 text-gray-900"
                            >
                                Some data
                            </dt>
                            <dd
                                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 break-words"
                            >
                                {JSON.stringify($test)}
                            </dd>
                        </div>
                    {/if}
                </dl>
            </div>
        </div>
    </main>
{/if}
