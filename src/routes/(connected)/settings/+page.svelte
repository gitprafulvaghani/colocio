<svelte:head>
    <title>Settings | Colocio</title>
    <meta name="description" content="Settings page of the Colocio app" />
    <meta
    name="keywords"
    content="colocio, ai, ads, facebook, meta, facebook ads, campaign"
    />
</svelte:head>

<script lang="ts">
    import SectionTitle from '$lib/components/SectionTitle.svelte';
    import { page } from '$app/stores';
</script>

<div class="p-3">
    <div class="flex gap-3">
        <div class="w-1/4 bg-white rounded-lg shadow flex-grow p-8 py-10">
            <SectionTitle><p slot="title">Your settings</p></SectionTitle>
            <hr />
            <ul role="list" class="">
                <li>
                    <a href="/settings/accounts">Accounts</a>
                </li>
                <li>
                    <a href="/settings/business-info/from-account">Business Info</a>
                </li>
                <li>
                    <a href="/settings/audience-profiles">Audience</a>
                </li>
                <!-- <li>
                    <a
                        href="/settings/users"
                        class="hover:bg-blue-50 hover:text-blue-600 text-gray-700 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold {$page.url.pathname.includes(
                            'users'
                        )
                            ? 'bg-blue-50 !text-blue-600'
                            : ''}"
                    >
                        Users
                    </a>
                </li> -->
                <!-- <li>
                    <a
                        href="/settings/business-info/from-account"
                        class="hover:bg-blue-50 hover:text-blue-600 text-gray-700 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold {$page.url.pathname.includes(
                            'business-info'
                        )
                            ? 'bg-blue-50 !text-blue-600'
                            : ''}"
                    >
                        Business Info
                    </a>
                </li> -->
                <!-- <li>
                    <a
                        href="/settings/audience-profiles"
                        class="hover:bg-blue-50 hover:text-blue-600 text-gray-700 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold {$page.url.pathname.includes(
                            'audience-profiles'
                        )
                            ? 'bg-blue-50 !text-blue-600'
                            : ''}"
                    >
                        Audience
                    </a>
                </li> -->
                <li>
                    <a
                        href="/settings/billing"
                        class="hover:bg-blue-50 hover:text-blue-600 text-gray-700 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold {$page.url.pathname.includes(
                            'billing'
                        )
                            ? 'bg-blue-50 !text-blue-600'
                            : ''}"
                    >
                        Billing
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
