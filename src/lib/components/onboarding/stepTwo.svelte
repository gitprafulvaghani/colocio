<script lang="ts">
    // import { flip } from 'svelte/animate';
    // import { dndzone } from 'svelte-dnd-action';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { socialSignedIn } from '$lib/stores/onboarding';
    import VerticalList from '$lib/components/VerticalList.svelte';
    import Loader from '$lib/components/Loader.svelte';
    import { company_infos } from '$lib/stores/stores';
    import { accounts, duplicate } from '$lib/stores/onboarding';

    $: data = $page.data;
    $: $accounts, checkDuplicates();

    let isLoading = true;
    let duplicateItems = null;

    let company_infos_temp = {
        name: '',
        logo: '',
    };

    interface Account {
        id: number;
        name: string;
        type: string;
    }

    let items = [];
    let entities = [];

    function checkDuplicates() {
        let types = [];
        for (let i in $accounts) {
            types.push($accounts[i].type);
        }
        duplicateItems = types.filter(
            (item, index) => types.indexOf(item) != index
        );
        if (duplicateItems.length > 0) {
            $duplicate = true;
        } else {
            $duplicate = false;
        }
    }

    async function handleCompletion() {
        try {
            const data = await fetch('/api/onboarding/completions');
            const response = await data.json();
            $socialSignedIn.facebook.data = response.data;
            if (response.success) {
                if ($socialSignedIn.facebook.data !== null) {
                    $socialSignedIn.facebook.data.forEach(
                        (item, index) => {
                            item.assets.forEach((asset, i) => {
                                asset.name = item.name;
                                asset.type = asset.type.replace(
                                    /_/g,
                                    ' '
                                );
                                // asset.type[0] = asset.type[0].toUpperCase();
                                items.push(asset);
                            });
                        }
                    );
                }
                isLoading = false;
                return true;
            } else {
                return false;
            }
        } catch (error: any) {}
    }
    onMount(async () => {
        // TODO: Create a service for the GPT completion. Then run it here
        // on the client side.
        await handleCompletion();
        company_infos_temp.name = $company_infos.name;
        company_infos_temp.logo = $company_infos.logo;
        $accounts = [];
    });
</script>

<h1 class="text-xl font-semibold mb-4 m-auto text-center">Accounts</h1>
<br />

{#if isLoading}
    <Loader />
{:else if entities !== null}
    <p class="text-sm font-medium text-gray-900">
        Drag-and-drop the assets and accounts you want to include in your
        Amazing Company profile.
    </p>
    <br /><br />
    <section
        class="flex gap-8 bg-blue-bglight text-blue-primary p-4 rounded-md relative"
    >
        <div class="flex-1 flex gap-1">
            <div>
                <svg
                    class="w-4 h-4 mt-0.5"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.5 2C5.18486 2 2.5 4.68486 2.5 8C2.5 11.3151 5.18486 14 8.5 14C11.8151 14 14.5 11.3151 14.5 8C14.5 4.68486 11.8151 2 8.5 2ZM12.2171 10.9677C11.835 11.335 11.3189 11.4739 10.7382 10.7345L8.99627 8.61538C8.7134 8.27295 8.18735 8.28288 7.91439 8.63027L6.29653 10.7146C5.67618 11.5087 5.1402 11.3201 4.74814 10.9132C4.11786 10.1042 3.74069 9.09677 3.74069 7.99504C3.74069 5.36973 5.87469 3.23573 8.5 3.23573C11.1253 3.23573 13.2593 5.36973 13.2593 7.99504C13.2593 9.11663 12.8672 10.1489 12.2171 10.9628V10.9677Z"
                        fill="#0D64E8"
                    />
                </svg>
            </div>
            <div>
                <div class="font-semibold text-sm sm:text-base">
                    One Account per platform
                </div>
                <div class="text-xs sm:text-sm text-gray-600">
                    Your profile can only include one asset/account per
                    platform, e.g. 1x Facebook page, 1x Google Account. To
                    add more profiles, please upgrade or contact us
                </div>
            </div>
        </div>
    </section>
    <br />

    <strong><h2>{company_infos_temp.name}</h2></strong>
    {#if duplicateItems.length > 0}
        <section class="flex gap-8 p-4 rounded-md relative">
            <div class="flex-1 flex gap-1">
                <div>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.4704 13.7386C10.3438 13.8652 10.1872 13.9285 9.99965 13.9285C9.81209 13.9285 9.65547 13.8652 9.52893 13.7386C9.40239 13.6121 9.33909 13.4555 9.33909 13.2679C9.33909 13.0803 9.40239 12.9237 9.52893 12.7972C9.65547 12.6706 9.81209 12.6073 9.99965 12.6073C10.1872 12.6073 10.3438 12.6706 10.4704 12.7972C10.5969 12.9237 10.6602 13.0803 10.6602 13.2679C10.6602 13.4555 10.5969 13.6121 10.4704 13.7386ZM10.6121 10.8836H9.38718V5.90862H10.6121V10.8836ZM10.001 17.9028C8.90773 17.9028 7.88023 17.6954 6.91842 17.2805C5.95635 16.8656 5.11961 16.3025 4.40809 15.5913C3.69656 14.8801 3.13322 14.0437 2.71809 13.0821C2.30306 12.1207 2.09551 11.0934 2.09551 10.0001C2.09551 8.90676 2.30297 7.87925 2.71782 6.91744C3.13278 5.95537 3.69586 5.11864 4.40706 4.40712C5.11827 3.69559 5.95464 3.13225 6.91628 2.71711C7.87766 2.30208 8.90494 2.09453 9.99826 2.09453C11.0916 2.09453 12.1191 2.30199 13.0809 2.71684C14.043 3.1318 14.8797 3.69488 15.5912 4.40608C16.3027 5.11729 16.8661 5.95366 17.2812 6.9153C17.6963 7.87668 17.9038 8.90397 17.9038 9.99728C17.9038 11.0906 17.6963 12.1181 17.2815 13.0799C16.8665 14.042 16.3035 14.8787 15.5923 15.5902C14.881 16.3018 14.0447 16.8651 13.083 17.2802C12.1217 17.6953 11.0944 17.9028 10.001 17.9028ZM9.99965 16.6778C11.864 16.6778 13.4436 16.0307 14.7377 14.7367C16.0317 13.4426 16.6788 11.863 16.6788 9.99868C16.6788 8.13432 16.0317 6.55473 14.7377 5.26067C13.4436 3.96661 11.864 3.31951 9.99965 3.31951C8.1353 3.31951 6.55571 3.96661 5.26165 5.26067C3.96759 6.55473 3.32049 8.13432 3.32049 9.99868C3.32049 11.863 3.96759 13.4426 5.26165 14.7367C6.55571 16.0307 8.1353 16.6778 9.99965 16.6778Z"
                            fill="#FF4040"
                            stroke="#FF4040"
                            stroke-width="0.025"
                        />
                    </svg>
                </div>
                <div>
                    <div class="text-s sm:text text-red-500">
                        A {duplicateItems} account already exists in this profile
                    </div>
                </div>
            </div>
        </section>
    {/if}

    <VerticalList
        items={[{ id: '123', type: 'facebook page', name: 'Test' }]}
        main={true}
    />
    <br />
    <strong><h2>Other Accounts</h2></strong>
    <VerticalList {items} main={false} />
    <br />
{/if}
