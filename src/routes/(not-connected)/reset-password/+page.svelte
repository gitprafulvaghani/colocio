<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import Logo from '$lib/components/Logo.svelte';
    import { enhance } from '$app/forms';
    import { PUBLIC_SUPABASE_REDIRECT_URL } from '$env/static/public';

    // export let data: PageData;
    let email= '';
    onMount(()=>{
        // if(data?.email) email = data.email;
    })
</script>
<svelte:head>
    <title>Login | Colocio</title>
    <meta name="description" content="Page for login into Colocio app">
    <meta name="keywords" content="colocio, ai, ads, facebook, meta, facebook ads, campaign">
</svelte:head>
<main class="h-screen bg-white">
    <div class="flex min-h-full">
        <div
            class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
        >
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <Logo
                        className="h-10 w-auto fill-blue-primary filter-none "
                    />
                    <h2
                        class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900"
                    >
                        Reset your password
                    </h2>
                </div>
                <div class="mt-10">
                    <div>
                        <form method="POST" class="space-y-6">
                            <div>
                                <label
                                    for="email"
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div class="mt-2">
                                    <input
                                        bind:value={email}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autocomplete="email"
                                        required
                                        class="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 focus:shadow-[0_0_0_4px] focus:shadow-blue-dark-soft transition-shadow"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    for="password"
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    New Password
                                </label>
                                <div class="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autocomplete="current-password"
                                        required
                                        class="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 focus:shadow-[0_0_0_4px] focus:shadow-blue-dark-soft transition-shadow"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    class="flex w-full justify-center rounded-md bg-blue-primary px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                                >
                                    Update password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative hidden w-0 flex-1 lg:block bg-custom-gradient" />
    </div>
</main>
