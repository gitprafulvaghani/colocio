<script lang="ts">
    import Logo from '$lib/components/Logo.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import Simple from '$lib/components/payments/Simple.svelte';
    import Basic from '$lib/components/payments/Basic.svelte';
    import Pro from '$lib/components/payments/Pro.svelte';

    import { toastStore } from '$lib/stores/stores';
    import { paymentPackage } from '$lib/stores/onboarding';
    import { paymentSimpleID, paymentProID, paymentBasicID } from '$lib/stores/onboarding';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    // export let data;

    onMount(() => {
        $paymentSimpleID = data?.paymentSimple?.id;
        $paymentProID = data?.paymentPro?.id;
        $paymentBasicID = data?.paymentBasic?.id;
    });

    function removeToast(id: number) {
        toastStore.update(toasts =>
            toasts.filter(toast => toast.id !== id)
        );
    }
</script>

{#each $toastStore as toast (toast.id)}
    <Toast
        bind:message={toast.message}
        bind:duration={toast.duration}
        on:close={() => removeToast(toast.id)}
    />
{/each}

<svelte:head>
    <title>Payment | Colocio</title>
    <meta
        name="description"
        content="Process payment for your account."
    />
    <meta
        name="keywords"
        content="colocio, ai, ads, facebook, meta, facebook ads, campaign"
    />
</svelte:head>

{#if $paymentPackage == 'simple'}
    <Simple />
{:else if $paymentPackage == 'basic'}
    <Basic />
{:else if $paymentPackage == 'pro'}
    <Pro />
{/if}

<main class="bg-blue-600">
    <div class="flex flex-col h-screen justify-between">
        <header class="p-6">
            <Logo className="fill-white filter-none w-[170px]"></Logo>
        </header>

        <div
            class="relative"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div class="fixed inset-0 w-screen overflow-y-auto">
                <div
                    class="flex flex-col min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                >
                    <div
                        class="relative flex flex-col sm:flex-row gap-4 w-full px-2 sm:px-10 lg:px-32 xl:px-60"
                    >
                        <div
                            class="bg-white px-4 pb-4 pt-5 text-left rounded-lg drop-shadow transform overflow-hidden relative transition-all sm:my-8 sm:w-full flex-1 sm:p-6 flex flex-col justify-between"
                        >
                            <h1
                                class="font-medium text-blue-primary text-2xl text-center"
                            >
                                Select a package
                            </h1>
                            <br />
                            <h2
                                class="text-center font-bold text-gray-600 text-base sm:text-lg"
                            >
                                Choose a package that best suits your
                                needs
                            </h2>
                            <hr class="h-px bg-gray-200 border-0 my-4" />
                            <div class="flex px-10 gap-10 justify-center">
                                <div
                                    class="p-5 h-fit cursor-pointer rounded-xl w-full bg-gray-200 hover:shadow-xl hover:bg-gray-100 border-4 border-gray shadow-md"
                                >
                                    <p
                                        class="text-3xl text-blue-500 text-center"
                                    >
                                        Simple
                                    </p>
                                    <div class="justify-center p-5 h-40">
                                        This is a package with these
                                        options, it gives you these features.
                                    </div>
                                    <div class="text-center">
                                        <button
                                            on:click={() => {
                                                $paymentPackage =
                                                    'simple';
                                            }}
                                            type="button"
                                            class="text-white w-40 bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5"
                                        >
                                            $49/month
                                        </button>
                                    </div>
                                </div>
                                <div
                                    class="p-5 h-fit cursor-pointer rounded-xl w-full bg-gray-200 hover:shadow-xl hover:bg-gray-100 border-4 border-gray shadow-md"
                                >
                                    <p
                                        class="text-3xl text-blue-500 text-center"
                                    >
                                        Basic
                                    </p>
                                    <div class="justify-center p-5 h-40">
                                        This is a package with these
                                        options, it gives you these features.
                                    </div>
                                    <div class="text-center">
                                        <button
                                            on:click={() => {
                                                $paymentPackage = 'basic';
                                            }}
                                            type="button"
                                            class="text-white w-40 bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5"
                                        >
                                            $99/month
                                        </button>
                                    </div>
                                </div>
                                <div
                                    class="p-5 h-fit cursor-pointer rounded-xl w-full bg-gray-200 hover:shadow-xl hover:bg-gray-100 border-4 border-gray shadow-md"
                                >
                                    <p
                                        class="text-3xl text-blue-500 text-center"
                                    >
                                        Pro
                                    </p>
                                    <div class="justify-center p-5 h-40">
                                        This is a package with these
                                        options, it gives you these features.
                                    </div>
                                    <div class="text-center">
                                        <button
                                            on:click={() => {
                                                $paymentPackage = 'pro';
                                            }}
                                            type="button"
                                            class="text-white w-40 bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5"
                                        >
                                            $199/month
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div
                                class="flex justify-end items-center gap-3 mt-4"
                            >
                                <button
                                    on:click={() => {
                                        goto('/');
                                    }}
                                    type="button"
                                    class="justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
