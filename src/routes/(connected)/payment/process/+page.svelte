<script lang="ts">
    import Logo from '$lib/components/Logo.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import Simple from '$lib/components/payments/Simple.svelte';
    import Basic from '$lib/components/payments/Basic.svelte';
    import Pro from '$lib/components/payments/Pro.svelte';
    import Loader from '$lib/components/Loader.svelte';

    import { toastStore } from '$lib/stores/stores';
    import { paymentPackage } from '$lib/stores/onboarding';
    import { paymentSimpleID, paymentProID, paymentBasicID } from '$lib/stores/onboarding';
    import { goto } from '$app/navigation';
    import { onDestroy, onMount } from 'svelte';

    import { page } from '$app/stores';

    let id;
    let success;

    const unsubscribe = page.subscribe($page => {
        const searchParams = $page.url.searchParams;
        id = searchParams.get('id');
    });

    onDestroy(unsubscribe);
    onMount(async () => {
        let paymentID;

        switch($paymentPackage) {
            case "simple":
                paymentID = $paymentSimpleID;
            case "basic":
                paymentID = $paymentBasicID;
            case "pro":
                paymentID = $paymentProID;
        }

        if (!id) {
            toastStore.update(toasts => [
                ...toasts,
                {
                    id: Math.random(),
                    message: 'Transaction is not valid',
                    duration: 5000,
                },
            ]);
        }

        const payment = await processPayment(id);
        if (payment.status == 200) {
            success = true;
        } else {
            success = false;
        }
    });

    function removeToast(id: number) {
        toastStore.update(toasts =>
            toasts.filter(toast => toast.id !== id)
        );
    }

    async function processPayment(id: string) {
        let response;
        try {
            const data = await fetch('/api/payments?id=' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(r => r.json())
                .then(r => {
                    response = r;
                })
                .catch(error => {
                    console.error('Error', error);
                    throw new Error('Failed to fetch data');
                });
            return response;
        } catch (error: any) {
            console.log(error);
        }
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
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
    />
</svelte:head>

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
                                Package Subscription
                            </h1>
                            <br />
                            <div
                                class="text-center p-5 border-2 border-gray-200 rounded-lg bg-gray-200"
                            >
                                {#if success == true}<span
                                        class="material-symbols-outlined text-blue-500"
                                    >
                                        trophy
                                    </span>
                                    <h1
                                        class="font-medium text-blue-primary text-2xl text-center"
                                    >
                                        Congrats!
                                    </h1>
                                    <br />
                                    <p>Your subscription was successful</p>
                                    <div
                                class="flex justify-center items-center gap-3 mt-4"
                            >
                                <button
                                    on:click={() => {
                                        goto('/onboarding');
                                    }}
                                    type="button"
                                    class="justify-center items-center rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400 sm:col-start-1 sm:mt-0"
                                >
                                    Continue
                                </button>
                            </div>
                                {:else if success == false}
                                    <span
                                        class="material-symbols-outlined text-red-500"
                                    >
                                        cancel
                                    </span>
                                    <h1
                                        class="font-medium text-red-500 text-2xl text-center"
                                    >
                                        Oops!
                                    </h1>
                                    <br />
                                    <p>Something went wrong!</p>
                                    {:else}
                                    <Loader/>
                                {/if}
                            </div>

                            <div
                                class="flex justify-end items-center gap-3 mt-4"
                            >
                                <button
                                    on:click={() => {
                                        goto('/payment/payment');
                                    }}
                                    type="button"
                                    class="justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
