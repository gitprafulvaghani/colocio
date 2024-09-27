<script>
    import { fade, fly } from 'svelte/transition';

    export let data;


    let categories = '';
    let service_areas = '';
    let addresses = '';
    let social_medias = '';

    let entity = data?.entity;
    let newEntity = entity;

    // let social_medias = data?.entity?.social_medias?.social_medias;


    let showMenu = true;
    let isAddingSocialMedia = false;

    let newSocialMediaUrl = '';
    let newSocialMediaPlatform = '';

    function addServiceAreas() {
        if (service_areas == '') return;
        newEntity.service_areas.service_areas = [
            ...newEntity.service_areas.service_areas,
            service_areas,
        ];
        service_areas = '';
    }

    function removeServiceAreas(value) {
        newEntity.service_areas.service_areas =
        newEntity.service_areas.service_areas.filter(item => item != value);
    }

    function addCategories() {
        if (categories == '') return;
        newEntity.categories.categories = [
            ...newEntity.categories.categories,
            categories,
        ];
        categories = '';
    }

    function removeCategories(value) {
        newEntity.categories.categories =
        newEntity.categories.categories.filter(item => item != value);
    }

    function addAddresses() {
        if (addresses == '') return;
        newEntity.addresses.addresses = [
            ...newEntity.addresses.addresses,
            addresses,
        ];
        addresses = '';
    }

    function removeAddresses(value) {
        newEntity.addresses.addresses =
        newEntity.addresses.addresses.filter(item => item != value);
    }

    function addSocialMedia(socialMediaUrl, socialMediaPlatform) {
        if (socialMediaUrl == '' || socialMediaPlatform == '' ) return;
        newEntity.social_medias.social_medias = [
            ...newEntity.social_medias.social_medias,
            {"url": socialMediaUrl, "social_media": socialMediaPlatform},
        ];
        social_medias = '';
        isAddingSocialMedia = false;
        newSocialMediaUrl = '';
        newSocialMediaPlatform = '';
    }

    function removeSocialMedia(value) {
        newEntity.social_medias.social_medias =
        newEntity.social_medias.social_medias.filter(item => item != value);
    }
</script>

<div class="border rounded-md p-6">
    <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
            <svg class="w-9 h-9 border rounded-full border-gray-400"
            viewBox="-5 -2 17 17"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4.20002H3.9905V3.00003C3.9905 2.38083 4.03838 1.99083 4.88152 1.99083H5.94641V0.0828372C5.42822 0.0264374 4.90717 -0.0011625 4.38556 3.74999e-05C2.83895 3.74999e-05 1.71021 0.994234 1.71021 2.81943V4.20002H0V6.60002L1.71021 6.59942V12H3.9905V6.59822L5.73834 6.59762L6 4.20002Z" fill="#111827"/>
            </svg>
            <div class="ml-2">
                <p class="font-semibold text-lg">Awesome Company Inc.</p>
                <p class="font-light text-sm mt-[-0.2rem]">Meta Business account</p>
            </div>
        </div>

        <button
        type="button"
        on:click={()=> {showMenu = !showMenu}}
        class="flex justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
        >
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3426 4.51968C14.1237 3.73863 15.39 3.73863 16.171 4.51968L16.8148 5.16348C17.5959 5.94453 17.5959 7.21086 16.8148 7.9919L8.24058 16.5662C7.96138 16.8454 7.60578 17.0357 7.2186 17.1131L3.76629 17.8036C3.62634 17.8316 3.50296 17.7082 3.53095 17.5682L4.22141 14.1159C4.29885 13.7287 4.48916 13.3731 4.76836 13.0939L13.3426 4.51968Z" stroke="#1B1D1F" stroke-width="1.5"/>
            <path d="M12.1528 5.70703L15.6251 9.17925" stroke="#1B1D1F" stroke-width="2"/>
        </svg>
        Edit</button>
    </div>
    <hr/>
    <div class="mt-4">
        <p class="font-semibold">Categories</p>
        <div class="flex flex-start mt-2">
            <div class="flex items-center w-52">
                <p class="font-light text-gray-500 text-sm">Categories</p>
            </div>
            <div>
                <span class="shadow-md text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">Events</span>
            </div>
        </div>

        <p class="font-semibold mt-2">Contact Info</p>
        <div class="flex flex-start mt-2">
            <div class="w-52">
                <p class="font-light text-gray-500 text-sm">Service area</p>
                <p class="font-light text-gray-500 text-sm">Phone</p>
                <p class="font-light text-gray-500 text-sm">Email</p>
                <p class="font-light text-gray-500 text-sm">Address</p>
            </div>
            <div class="">
                <p class="text-sm">London, UK</p>
                <p class="text-sm">-</p>
                <p class="text-sm">-</p>
                <p class="text-sm">-</p>
            </div>
        </div>

        <p class="font-semibold mt-2">Website and social links</p>
        <div class="flex flex-start mt-2">
            <div class="w-52">
                <p class="font-light text-gray-500 text-sm">Website</p>
                <p class="font-light text-gray-500 text-sm">Social link</p>
            </div>
            <div>
                <p class="text-sm">-</p>
                <p class="text-sm">-</p>
                <p class="text-sm">-</p>
            </div>
        </div>

        <p class="font-semibold mt-2">Basic info</p>
        <div class="flex flex-start mt-2">
            <div class="w-52">
                <p class="font-light text-gray-500 text-sm">Wifi network name</p>
                <p class="font-light text-gray-500 text-sm">Working hours</p>
                <p class="font-light text-gray-500 text-sm">Price range</p>
                <p class="font-light text-gray-500 text-sm">Services</p>
                <p class="font-light text-gray-500 text-sm">Languages</p>
            </div>
            <div>
                <p class="text-sm">-</p>
                <p class="text-sm">Weekday, 8:00 AM - 17:00 PM</p>
                <p class="text-sm">-</p>
                <p class="text-sm">-</p>
                <p class="text-sm">-</p>
            </div>
        </div>
    </div>
</div>


<!-- Edit Modal -->
{#if showMenu}
<div class="z-50 fixed inset-0 overflow-auto bg-opacity-20 bg-black flex items-center justify-center" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}></div>
<!-- Main modal -->
<div id="crud-modal" tabindex="-1" aria-hidden="true" class="p-6 flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full" in:fly={{ y: 200, duration: 200 }} out:fly={{ y: 200, duration: 200 }}>
    <div class="relative w-7/12	max-h-full">
        <!-- Modal content -->
        <form action="?/save" method="post">
        <div class="relative bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">
                    Edit account information
                </h3>
                <button type="button" on:click={()=> {showMenu = !showMenu}} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
            <div class="text-center p-4">
                <p class="text-sm font-light ">Review these 4 categories from from your Meta Business Account.</p>
                <p class="text-sm font-light ">Any updates you make here will not change details on your Meta Business Account.</p>
            </div>
            <!-- ################### -->
            <!-- Categories Section -->
            <!-- ################### -->
            <div class="flex justify-between items-center py-1">
                <p class="text-xl font-semibold">Categories</p>
            </div>
            <div class="w-6/12 mb-4">
                <label for="category" class="block mb-2 text-sm text-gray-900 ">Category</label>
                <div class="col-span-1 flex flex-col gap-1 mb-4">
                    <div class="relative w-3/4">
                        <input
                            bind:value={categories}
                            on:keyup={e => {
                                if (e.key == 'Enter') addCategories();
                            }}
                            type="text"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />

                        <button
                            on:click={addCategories}
                            type="button"
                            class="bg-transparent absolute right-3 top-3"
                        >
                            <img
                                src="/icons/plus.svg"
                                alt="plus"
                                class="w-5 h-5"
                            />
                        </button>
                    </div>
                </div>
                <div class="flex flex-wrap col-span-2 gap-2">
                    {#each newEntity.categories.categories as base_categories}
                        {@const selected =
                            newEntity.categories.categories.includes(
                                base_categories
                            )}
                        <button
                            on:click={() => {
                                removeCategories(base_categories);
                            }}
                            class:bg-white={!selected}
                            class:bg-blue-bglight={selected}
                            class:text-blue-primary={selected}
                            class:text-gray-600={!selected}
                            type="button"
                            class="px-3 py-2 hover:bg-blue-bglight border rounded-md border-gray-300 gap-2 flex items-center justify-between"
                        >
                            {base_categories}
                            {#if selected}
                                <img
                                    src="/icons/close_blue.svg"
                                    alt="plus"
                                    class="w-5 h-5"
                                />
                            {:else}
                                <img
                                    src="/icons/plus.svg"
                                    alt="plus"
                                    class="w-5 h-5"
                                />
                            {/if}
                        </button>
                    {/each}
                </div>
            </div>
            <hr/>
            <!-- ################### -->
            <!-- Contact Info Section -->
            <!-- ################### -->
            <div class="flex justify-between items-center py-1">
                <p class="text-xl font-semibold pt-2">Contact info</p>
            </div>
            <div class="w-6/12 mb-4">
                <label for="category" class="block mb-2 text-sm text-gray-900 ">Service Area</label>
                <div class="col-span-1 flex flex-col gap-1 mb-4">
                    <div class="relative w-3/4">
                        <input
                            bind:value={service_areas}
                            on:keyup={e => {
                                if (e.key == 'Enter') addServiceAreas();
                            }}
                            type="text"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />

                        <button
                            on:click={addServiceAreas}
                            type="button"
                            class="bg-transparent absolute right-3 top-3"
                        >
                            <img
                                src="/icons/plus.svg"
                                alt="plus"
                                class="w-5 h-5"
                            />
                        </button>
                    </div>
                </div>
                <div class="flex flex-wrap col-span-2 gap-2">
                    {#each newEntity.service_areas.service_areas as base}
                        {@const selected =
                            newEntity.service_areas.service_areas.includes(
                                base
                            )}
                        <button
                            on:click={() => {
                                removeServiceAreas(base);
                            }}
                            class:bg-white={!selected}
                            class:bg-blue-bglight={selected}
                            class:text-blue-primary={selected}
                            class:text-gray-600={!selected}
                            type="button"
                            class="px-3 py-2 hover:bg-blue-bglight border rounded-md border-gray-300 gap-2 flex items-center justify-between"
                        >
                            {base}
                            {#if selected}
                                <img
                                    src="/icons/close_blue.svg"
                                    alt="plus"
                                    class="w-5 h-5"
                                />
                            {:else}
                                <img
                                    src="/icons/plus.svg"
                                    alt="plus"
                                    class="w-5 h-5"
                                />
                            {/if}
                        </button>
                    {/each}
                </div>
            </div>
            <div class="flex justify-between">
                <div class="w-6/12 mb-4 mr-2">
                    <label for="phone" class="block mb-2 text-sm text-gray-900 ">Phone</label>
                    <input value={entity.phone} type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                </div>
                <div class="w-6/12 mb-4 ml-2">
                    <label for="email" class="block mb-2 text-sm text-gray-900 ">Email</label>
                    <input value={entity.email} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                </div>
            </div>
            <div class="mb-4">
                <label for="address" class="block mb-2 text-sm text-gray-900 ">Address</label>
                <div class="col-span-1 flex flex-col gap-1 mb-4">
                    <div class="relative w-3/4">
                        <input
                            bind:value={addresses}
                            on:keyup={e => {
                                if (e.key == 'Enter') addAddresses();
                            }}
                            type="text"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />

                        <button
                            on:click={addAddresses}
                            type="button"
                            class="bg-transparent absolute right-3 top-3"
                        >
                            <img
                                src="/icons/plus.svg"
                                alt="plus"
                                class="w-5 h-5"
                            />
                        </button>
                    </div>
                </div>
                <div class="flex flex-wrap col-span-2 gap-2">
                    {#each newEntity.addresses.addresses as base}
                        {@const selected =
                            newEntity.addresses.addresses.includes(
                                base
                            )}
                        <button
                            on:click={() => {
                                removeAddresses(base);
                            }}
                            class:bg-white={!selected}
                            class:bg-blue-bglight={selected}
                            class:text-blue-primary={selected}
                            class:text-gray-600={!selected}
                            type="button"
                            class="px-3 py-2 hover:bg-blue-bglight border rounded-md border-gray-300 gap-2 flex items-center justify-between"
                        >
                            {base}
                            {#if selected}
                                <img
                                    src="/icons/close_blue.svg"
                                    alt="plus"
                                    class="w-5 h-5"
                                />
                            {:else}
                                <img
                                    src="/icons/plus.svg"
                                    alt="plus"
                                    class="w-5 h-5"
                                />
                            {/if}
                        </button>
                    {/each}
                </div>
                <!-- <input value={entity.address} type="text" name="address" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"> -->
            </div>
            <hr/>
            <!-- ################### -->
            <!-- Websites Section -->
            <!-- ################### -->
            <div class="flex justify-between items-center py-1">
                <p class="text-xl font-semibold py-4">Websites and social links</p>
            </div>
            <div class="mb-4">
                <label for="website" class="block mb-2 text-sm text-gray-900 ">Website</label>
                <input type="text" name="website" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
            </div>
            <!-- Put label outside of this div for better alignment -->
            <label for="name" class="block mb-2 text-sm text-gray-900 ">Social link</label>
            {#each newEntity.social_medias.social_medias as social_media}
                <div class="flex justify-between items-center mb-4">
                    <div class="w-8/12">
                        <input type="text" name="name" id="name" value={social_media.url ? social_media.url : ''} placeholder="Enter a URL" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                    </div>
                    <div class="w-4/12 pl-4">
                        <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                            <option selected value="">Select a Platform</option>
                            <option value="">Instagram</option>
                            <option value="">Facebook</option>
                            <option value="">Threads</option>
                            <option value="">X (Twitter)</option>
                        </select>
                    </div>
                    <div class="pl-2">
                        <button on:click={() => {removeSocialMedia(social_media)}} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>

                </div>
            {/each}

            {#if isAddingSocialMedia}
                <div class="flex justify-between items-center mb-4">
                    <div class="w-8/12">
                        <input bind:value={newSocialMediaUrl} type="text" name="name" id="name" placeholder="Enter a URL" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                    </div>
                    <div class="w-4/12 pl-4">
                        <select bind:value={newSocialMediaPlatform} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                            <option selected value="">Select a Platform</option>
                            <option value="i">Instagram</option>
                            <option value="">Facebook</option>
                            <option value="">Threads</option>
                            <option value="">X (Twitter)</option>
                        </select>
                    </div>
                    <div class="pl-2">
                        <button type="button" class="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <button
                type="button"
                disabled={newSocialMediaUrl == '' || newSocialMediaPlatform == ''}
                on:click={() => {addSocialMedia(newSocialMediaUrl, newSocialMediaPlatform)}}
                class="mb-3 disabled:opacity-70 disabled:hover:bg-blue-500 w-[10rem] flex justify-center items-center rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm ring-gray-300 hover:bg-blue-600 sm:col-start-1 sm:mt-0"
                >
                Save</button>

                {#if newSocialMediaUrl == '' || newSocialMediaPlatform == ''}
                    <span class="mb-2 text-sm text-blue-500">Please enter a URL and Select a Social Media Platform</span>
                {/if}
            {/if}

            {#if !isAddingSocialMedia}
                <div class="pb-4">
                    <button
                    type="button"
                    class="flex justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    on:click={() => {isAddingSocialMedia = !isAddingSocialMedia}}
                    >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V9.25H15C15.4142 9.25 15.75 9.58579 15.75 10C15.75 10.4142 15.4142 10.75 15 10.75H10.75V15C10.75 15.4142 10.4142 15.75 10 15.75C9.58579 15.75 9.25 15.4142 9.25 15V10.75L5 10.75C4.58579 10.75 4.25 10.4142 4.25 10C4.25 9.58579 4.58579 9.25 5 9.25L9.25 9.25V5C9.25 4.58579 9.58579 4.25 10 4.25Z" fill="#545F71"/>
                    </svg>
                    Add social link</button>
                </div>
            {/if}
            <hr />
            <!-- ################### -->
            <!-- Basic info Section -->
            <!-- ################### -->
            <div class="flex justify-between items-center py-1">
                <p class="text-xl font-semibold py-4">Basic info</p>
            </div>

            <p class="mb-2 text-sm text-gray-900 font-normal">Working hours</p>
            <div class="flex justify-between items-center pb-4">
                <div class="w-4/12 pr-1">
                    <select id="weekdays" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                        <option selected>Facebook</option>
                        <option value="TV">TV/Monitors</option>
                    </select>
                </div>
                <div class="w-4/12 px-1">
                    <select id="start_time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                        <option selected>Facebook</option>
                        <option value="TV">TV/Monitors</option>
                    </select>
                </div>
                <div class="w-4/12 pl-1">
                    <select id="end_time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                        <option selected>Facebook</option>
                        <option value="TV">TV/Monitors</option>
                    </select>
                </div>
                <div class="pl-2">
                    <!-- TODO: BUTTON FUNCTIONALITY -->
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="pb-4">
                <!-- TODO: BUTTON FUNCTIONALITY -->
                <button
                type="button"
                class="flex justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V9.25H15C15.4142 9.25 15.75 9.58579 15.75 10C15.75 10.4142 15.4142 10.75 15 10.75H10.75V15C10.75 15.4142 10.4142 15.75 10 15.75C9.58579 15.75 9.25 15.4142 9.25 15V10.75L5 10.75C4.58579 10.75 4.25 10.4142 4.25 10C4.25 9.58579 4.58579 9.25 5 9.25L9.25 9.25V5C9.25 4.58579 9.58579 4.25 10 4.25Z" fill="#545F71"/>
                </svg>
                Add working hours</button>
            </div>
            <div class="w-6/12">
                <label for="price_range" class="block mb-2 text-sm text-gray-900">Price range</label>
                <select id="price_range" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                    <option selected>Price range</option>
                    <option value="">Other</option>
                </select>
            </div>
            <div class="w-6/12 pt-4">
                <label for="language" class="block mb-2 text-sm text-gray-900">Services</label>
                <select id="language" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                    <option selected>Services</option>
                    <option value="">Other</option>
                </select>
            </div>
            <div class="w-6/12 pt-4">
                <label for="language" class="block mb-2 text-sm text-gray-900">Language</label>
                <select id="language" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                    <option selected>Language</option>
                    <option value="">Other</option>
                </select>
            </div>

            <div class="flex justify-end mt-4">
                <button
                type="button"
                on:click={()=> {showMenu = !showMenu}}
                class="mr-4 flex justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                >
                Cancel</button>
                <button
                type="button"
                class="flex justify-center items-center rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600 sm:col-start-1 sm:mt-0"
                >
                Save</button>
            </div>
        </div>
        </form>
    </div>
</div>
{/if}
