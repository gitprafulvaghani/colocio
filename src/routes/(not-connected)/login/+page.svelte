<script lang="ts">
    import Logo from '$lib/components/Logo.svelte';
    import { onMount } from 'svelte';
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';

    // link with forms action
    export let form: ActionData

    let bool_forgot_password = false;
    let bool_reset_password = false;
    let bool_reset_sent = false;

    // Function to handle URL parameter changes
    function handleURLParameterChanges() {
        const urlParam = new URLSearchParams(window.location.search);
        const forgotValue = urlParam.get('forgot');
        if (forgotValue === '1') {
            bool_forgot_password = true;
        } else {
            bool_forgot_password = false;
        }
    }

    function forgotPassword() {
        const urlParam = new URLSearchParams(window.location.search);
        urlParam.set('forgot', '1');
        const newURL = `${window.location.pathname}?${urlParam.toString()}`;
        window.history.pushState({ path: newURL }, '', newURL);
        bool_forgot_password = true;
    }

    onMount(() => {
        window.addEventListener('popstate', handleURLParameterChanges);
        const forgotValue = new URLSearchParams(
            window.location.search
        ).get('forgot');
        const reset = new URLSearchParams(window.location.search).get(
            'reset'
        );
        const resetsent = new URLSearchParams(window.location.search).get(
            'resetsent'
        );

        if (forgotValue === '1') bool_forgot_password = true;
        if (reset == '1') bool_reset_password = true;
        if (resetsent == '1') bool_reset_sent = true;
    });
</script>

<svelte:head>
    <title>Login | Colocio</title>
    <meta name="description" content="Page for login into Colocio app" />
    <meta
        name="keywords"
        content="colocio, ai, ads, facebook, meta, facebook ads, campaign"
    />
</svelte:head>

<div class="flex min-h-full">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 2xl:px-80">
        <div class="mx-auto w-full max-w-lg lg:w-[600px]">
            <Logo className="h-10 w-auto fill-blue-primary filter-none "/>
            <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
                Don't have an account?
                <a href="/signup" class="font-semibold text-blue-600 hover:text-blue-500">
                    Sign up
                </a>
            </p>


            <div class="mt-10">
                <div>
                    <form action="?/login" method="POST" class="space-y-6" use:enhance>
                        <label 
                            for="email"
                            class="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div class="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                class="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 focus:shadow-[0_0_0_4px] focus:shadow-blue-dark-soft transition-shadow"/>
                        </div>
                        <label
                            for="password"
                            class="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div class="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                required
                                class="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 focus:shadow-[0_0_0_4px] focus:shadow-blue-dark-soft transition-shadow"/>
                        </div>
                        
<!--                ADD REMEMBER ME AND FORGOT PASSWORD HERE     -->
                        
                        <div>
                            <button
                                type="submit"
                                class="flex w-full justify-center rounded-md bg-blue-primary px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
                                Sign in
                            </button>
                        </div>
                    </form>
            
                    {#if form}
                        <div class="flex justify-center">
                            <p class="mt-2 bg-white text-red-700">
                                {form?.message}
                            </p>
                        </div>
                    {/if}
                </div>

<!--                SOCIAL LOGINS                -->

                <div class="mt-10">
                    <div class="relative">
                        <div
                            class="absolute inset-0 flex items-center"
                            aria-hidden="true"
                        >
                            <div
                                class="w-full border-t border-gray-200"
                            />
                        </div>
                        <div
                            class="relative flex justify-center text-sm font-medium leading-6"
                        >
                            <span
                                class="bg-white px-6 text-gray-900"
                            >
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div class="mt-6 grid grid-cols-2 gap-4">
                        <form
                            action="?/login&provider=facebook"
                            method="post"
                            use:enhance
                        >
                            <button
                                class="flex w-full items-center justify-center gap-3 rounded-md bg-[#0866FF] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0866FF]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5"
                                    fill="currentcolor"
                                    viewBox="0 0 667 667"
                                >
                                    <g clip-path="url(#a)">
                                        <mask
                                            id="b"
                                            width="934"
                                            height="934"
                                            x="-134"
                                            y="-134"
                                            maskUnits="userSpaceOnUse"
                                            style="mask-type:luminance"
                                        >
                                            <path
                                                fill="#fff"
                                                d="M-133.333-133.333H800V800h-933.333v-933.333Z"
                                            />
                                        </mask>
                                        <g mask="url(#b)">
                                            <path
                                                fill="#fff"
                                                d="M666.667 333.333C666.667 149.239 517.428 0 333.333 0 149.239 0 0 149.239 0 333.333 0 489.66 107.62 620.829 252.808 656.851V435.195h-68.736V333.333h68.736v-43.892c0-113.456 51.344-166.042 162.731-166.042 21.117 0 57.556 4.14 72.462 8.281v92.339c-7.868-.828-21.532-1.243-38.509-1.243-54.657 0-75.776 20.704-75.776 74.533v36.024h108.879l-18.704 101.862h-90.175v229.03c165.048-19.934 292.951-160.468 292.951-330.892Z"
                                            />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <path
                                                fill="#fff"
                                                d="M0 0h666.667v666.667H0z"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span
                                    class="text-sm font-semibold leading-6"
                                >
                                    Facebook
                                </span>
                            </button>
                        </form>
                        <form
                            action="?/login&provider=google"
                            method="post"
                            use:enhance
                        >
                            <button
                                class="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                            >
                                <svg
                                    class="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                >
                                    <path
                                        fill="#4285F4"
                                        fill-rule="evenodd"
                                        d="M17.64 9.204c0-.638-.057-1.252-.164-1.84H9v3.48h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615Z"
                                        clip-rule="evenodd"
                                    />
                                    <path
                                        fill="#34A853"
                                        fill-rule="evenodd"
                                        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.805.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
                                        clip-rule="evenodd"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        fill-rule="evenodd"
                                        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
                                        clip-rule="evenodd"
                                    />
                                    <path
                                        fill="#EA4335"
                                        fill-rule="evenodd"
                                        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.462.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <span
                                    class="text-sm font-semibold leading-6"
                                >
                                    Google
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block bg-custom-gradient"/>
</div>
