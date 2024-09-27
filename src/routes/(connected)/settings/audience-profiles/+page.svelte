<script>
    import GooglePlacesAutocomplete from '@silintl/svelte-google-places-autocomplete';
    import SectionTitle from '$lib/components/SectionTitle.svelte';
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    export let data;

    let audience = data?.audience[0];
    let newAudience = audience;
    let entity = data?.entity;
    let showMenu = false;
    let interest = '';
    let painPoint = '';
    let method = '';

    function addMethod() {
        if (method == '') return;
        newAudience.method.methods = [
            ...newAudience.method.methods,
            method,
        ];
        method = '';
    }

    function removeMethod(value) {
        newAudience.method.methods = newAudience.method.methods.filter(
            item => item != value
        );
    }

    function addInterest() {
        if (interest == '') return;
        newAudience.interests.interests = [
            ...newAudience.interests.interests,
            interest,
        ];
        interest = '';
    }

    function removeInterest(value) {
        newAudience.interests.interests =
            newAudience.interests.interests.filter(item => item != value);
    }

    function addPainPoint() {
        if (painPoint == '') return;
        newAudience.pain_points.painPoints = [
            ...newAudience.pain_points.painPoints,
            painPoint,
        ];
        painPoint = '';
    }

    function removePainPoint(value) {
        newAudience.pain_points.painPoints =
            newAudience.pain_points.painPoints.filter(
                item => item != value
            );
    }

    function addLocation(location) {
        if (location == '') return;
        newAudience.location.locations = [
            ...newAudience.location.locations,
            location,
        ];
    }

    function removeLocation(value) {
        newAudience.location.locations =
            newAudience.location.locations.filter(item => item != value);
    }

    function handlePlaceSelect(place) {
        addLocation(place.detail.text);
        place.detail.text = '';
    }
</script>

<SectionTitle><p slot="title">Audience profles</p></SectionTitle>
{#if audience}
    <!-- {#each audiences as audience} -->
    <div class="border rounded-md p-6 my-4">
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2"
                >
                    <path
                        d="M8.739 11.621C8.15817 11.621 7.67415 11.411 7.28693 10.991C6.8997 10.571 6.74681 10.0784 6.82825 9.51315L7.229 6.5313C7.37397 5.51132 7.85532 4.66777 8.67306 4.00066C9.49079 3.33355 10.4429 3 11.5294 3C12.6159 3 13.568 3.33355 14.3858 4.00066C15.2035 4.66777 15.6849 5.51132 15.8298 6.5313L16.2306 9.51315C16.312 10.0784 16.1591 10.571 15.7719 10.991C15.3847 11.411 14.9007 11.621 14.3198 11.621H8.739ZM8.70234 9.77369H14.3565L13.9435 6.81789C13.8588 6.24315 13.5888 5.77104 13.1335 5.40156C12.6782 5.03209 12.1435 4.84735 11.5294 4.84735C10.9153 4.84735 10.3806 5.03209 9.92529 5.40156C9.46999 5.77104 9.19999 6.24315 9.11529 6.81789L8.70234 9.77369ZM2 21V18.2621C2 17.659 2.16901 17.1004 2.50703 16.5865C2.84503 16.0725 3.29665 15.6774 3.86189 15.4011C5.11783 14.8042 6.38476 14.3566 7.66268 14.0582C8.9406 13.7598 10.2295 13.6106 11.5294 13.6106C12.8293 13.6106 14.1182 13.7598 15.3961 14.0582C16.6741 14.3566 17.941 14.8042 19.1969 15.4011C19.7622 15.6774 20.2138 16.0725 20.5518 16.5865C20.8898 17.1004 21.0588 17.659 21.0588 18.2621V21H2ZM3.90586 19.1527H19.153V18.2621C19.153 18.0126 19.0784 17.7817 18.9294 17.5694C18.7803 17.357 18.5779 17.1837 18.3222 17.0495C17.2275 16.5268 16.1113 16.1309 14.9736 15.8617C13.8359 15.5925 12.6878 15.4579 11.5294 15.4579C10.371 15.4579 9.22295 15.5925 8.08522 15.8617C6.94748 16.1309 5.83129 16.5268 4.73663 17.0495C4.48088 17.1837 4.27849 17.357 4.12945 17.5694C3.98039 17.7817 3.90586 18.0126 3.90586 18.2621V19.1527Z"
                        fill="#0D64E8"
                    />
                </svg>
                <SectionTitle
                    ><p slot="title">{audience.name}</p></SectionTitle
                >
            </div>
            <button
                type="button"
                class="flex justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                on:click={() => {
                    showMenu = !showMenu;
                }}
            >
                <svg
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.3426 4.51968C14.1237 3.73863 15.39 3.73863 16.171 4.51968L16.8148 5.16348C17.5959 5.94453 17.5959 7.21086 16.8148 7.9919L8.24058 16.5662C7.96138 16.8454 7.60578 17.0357 7.2186 17.1131L3.76629 17.8036C3.62634 17.8316 3.50296 17.7082 3.53095 17.5682L4.22141 14.1159C4.29885 13.7287 4.48916 13.3731 4.76836 13.0939L13.3426 4.51968Z"
                        stroke="#1B1D1F"
                        stroke-width="1.5"
                    />
                    <path
                        d="M12.1528 5.70703L15.6251 9.17925"
                        stroke="#1B1D1F"
                        stroke-width="2"
                    />
                </svg>
                Edit</button
            >
        </div>
        <hr />

        <div class="flex flex-start mt-2">
            <div class="w-52">
                <p class="font-light text-gray-500 text-sm py-1">Age</p>
                <p class="font-light text-gray-500 text-sm py-1">
                    Gender
                </p>
                <p class="font-light text-gray-500 text-sm py-1">
                    Location
                </p>
                <br />
                <p class="font-light text-gray-500 text-sm py-1">
                    Contact/Purchase method
                </p>
                <br />
                <p class="font-light text-gray-500 text-sm py-1">
                    Pain points
                </p>
                <br />
                <p class="font-light text-gray-500 text-sm py-1">
                    Interests/Behaviours
                </p>
                <br />
                <p class="font-light text-gray-500 text-sm py-1">
                    Lifetime value (LTV)
                </p>
                <br />
            </div>
            <div class="">
                <!-- TODO: Empty States -->
                <p class="text-sm py-1">
                    {#if audience.age.min || audience.age.max}
                        {audience.age.min} - {audience.age.max}
                    {:else}
                        -
                    {/if}
                </p>
                <p class="text-sm py-1">
                    {audience.gender ? audience.gender : '-'}
                </p>
                <p class="text-sm py-1">
                    {#if audience.location.locations.length > 0}
                        {#each audience.location.locations as location}
                            <span
                                class="shadow-md bg-gray-200 text-gray-800 text-xs font-normal me-2 px-1 py-1 rounded"
                                >{location}</span
                            >
                        {/each}
                    {:else}
                        -
                    {/if}
                </p>
                <br />
                <p class="text-sm py-1">
                    {#if audience.method.methods.length > 0}
                        {#each audience.method.methods as method}
                            <span
                                class="shadow-md bg-gray-200 text-gray-800 text-xs font-normal me-2 px-1 py-1 rounded"
                                >{method}</span
                            >
                        {/each}
                    {:else}
                        -
                    {/if}
                </p>
                <br />
                <p class="text-sm py-1">
                    {#if audience.pain_points.painPoints.length > 0}
                        {#each audience.pain_points.painPoints as painPoint}
                            <span
                                class="shadow-md bg-gray-200 text-gray-800 text-xs font-normal me-2 px-1 py-1 rounded"
                                >{painPoint}</span
                            >
                        {/each}
                    {:else}
                        -
                    {/if}
                </p>
                <br />
                <p class="text-sm py-1">
                    {#if audience.interests.interests.length > 0}
                        {#each audience.interests.interests as interest}
                            <span
                                class="shadow-md bg-gray-200 text-gray-800 text-xs font-normal me-2 px-1 py-1 rounded"
                                >{interest}</span
                            >
                        {/each}
                    {:else}
                        -
                    {/if}
                </p>
                <br />
                {#if audience.lifetime_value}
                    <p class="text-sm py-1">
                        {entity.currencies.code}
                        {audience.lifetime_value}
                    </p>
                {:else}
                    <p class="text-sm py-1">-</p>
                {/if}
                <br />
            </div>
        </div>
    </div>
    <!-- TODO: Add back in once applicable -->
    <!-- <div class="flex justify-end mt-4">
            <button
            type="button"
            class="flex justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V9.25H15C15.4142 9.25 15.75 9.58579 15.75 10C15.75 10.4142 15.4142 10.75 15 10.75H10.75V15C10.75 15.4142 10.4142 15.75 10 15.75C9.58579 15.75 9.25 15.4142 9.25 15V10.75L5 10.75C4.58579 10.75 4.25 10.4142 4.25 10C4.25 9.58579 4.58579 9.25 5 9.25L9.25 9.25V5C9.25 4.58579 9.58579 4.25 10 4.25Z" fill="#545F71"/>
            </svg>
            Add profile</button>
        </div> -->
    <!-- {/each} -->
{:else}
    <p class="text-lg py-4">No Audiences yet</p>
{/if}

<!-- Edit Modal -->
{#if showMenu}
    <div
        class="z-50 fixed inset-0 overflow-auto bg-opacity-20 bg-black flex items-center justify-center"
        in:fade={{ duration: 200 }}
        out:fade={{ duration: 200 }}
    ></div>
    <!-- Main modal -->
    <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        class="p-6 flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
        in:fly={{ y: 200, duration: 200 }}
        out:fly={{ y: 200, duration: 200 }}
    >
        <div class="relative w-8/12 max-h-full">
            <!-- Modal content -->
            <form action="?/save" method="post">
                <div class="relative bg-white rounded-lg shadow p-6">
                    <div class="flex justify-between">
                        <p class="text-xl">Edit {newAudience.name}</p>
                        <br />
                        <br />
                        <button
                            type="button"
                            on:click={() => {
                                showMenu = !showMenu;
                            }}
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            data-modal-toggle="crud-modal"
                        >
                            <svg
                                class="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>

                    <div class="w-6/12 mb-4">
                        <label
                            for="name"
                            class="block mb-2 text-sm text-gray-900"
                            >Name</label
                        >
                        <input
                            type="text"
                            name="name"
                            id="name"
                            bind:value={newAudience.name}
                            class="border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                    </div>

                    <label
                        class="block mb-2 text-sm text-gray-900"
                        for="age">Age</label
                    >
                    <div class="flex items-center mb-4">
                        <!-- bind:value={$audience.age.min} -->
                        <input
                            type="number"
                            bind:value={newAudience.age.min}
                            class="form-control bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5"
                        />
                        <label class="mx-5" for="to">to</label>
                        <!-- bind:value={$audience.age.max} -->
                        <input
                            type="number"
                            bind:value={newAudience.age.max}
                            class="form-control bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5"
                        />
                    </div>

                    <label
                        class="block mb-2 text-sm text-gray-900"
                        for="gender">Gender</label
                    >
                    <!-- bind:value={$audience.gender} -->
                    <select
                        id="age"
                        bind:value={newAudience.gender}
                        class="bg-white border w-6/12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-4"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="All">All</option>
                        <option value="Other">Other</option>
                    </select>

                    <label
                        class="block mb-2 text-sm text-gray-900"
                        for="location">Location</label
                    >
                    <p class="text-gray-500 text-xs">
                        Search for a location and select available options
                        from the Google suggestions
                    </p>
                    <div class="relative w-3/4">
                        <GooglePlacesAutocomplete
                            id="googlePlaces"
                            class="form-control bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            apiKey={'AIzaSyBBRPpOYbFqr-A5t9dfSVFp9ZExuXFhO6I'}
                            on:place_changed={handlePlaceSelect}
                        />
                    </div>

                    <div class="flex flex-wrap col-span-2 gap-2 mt-2">
                        {#each newAudience.location.locations as location}
                            <button
                                on:click={() => {
                                    removeLocation(location);
                                }}
                                type="button"
                                class="px-3 py-2 bg-blue-bglight text-blue-primary border rounded-md border-gray-300 gap-2 flex items-center justify-between"
                            >
                                {location}
                                <img
                                    src="/icons/close_blue.svg"
                                    alt="plus"
                                    class="w-5 h-5"
                                />
                            </button>
                        {/each}
                    </div>
                    <br />

                    <label
                        for="pain_points"
                        class="block mb-2 text-sm text-gray-900"
                        >Methods</label
                    >
                    <p class="text-gray-500 text-xs">
                        e.g. Online Payment, Credit Card
                    </p>
                    <div class="col-span-1 flex flex-col gap-1 mb-4">
                        <div class="relative w-3/4">
                            <input
                                bind:value={method}
                                on:keyup={e => {
                                    if (e.key == 'Enter') addMethod();
                                }}
                                type="text"
                                name="methods"
                                id="methods"
                                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                            <button
                                on:click={addMethod}
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
                        {#each newAudience.method.methods as base_method}
                            {@const selected =
                                newAudience.method.methods.includes(
                                    base_method
                                )}
                            <button
                                on:click={() => {
                                    removeMethod(base_method);
                                }}
                                class:bg-white={!selected}
                                class:bg-blue-bglight={selected}
                                class:text-blue-primary={selected}
                                class:text-gray-600={!selected}
                                type="button"
                                class="px-3 py-2 hover:bg-blue-bglight border rounded-md border-gray-300 gap-2 flex items-center justify-between"
                            >
                                {base_method}
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
                    <br />
                    <label
                        for="pain_points"
                        class="block mb-2 text-sm text-gray-900"
                        >Pain points</label
                    >
                    <p class="text-gray-500 text-xs">
                        e.g. Slow service, High prices
                    </p>
                    <div class="col-span-1 flex flex-col gap-1 mb-4">
                        <div class="relative w-3/4">
                            <input
                                bind:value={painPoint}
                                on:keyup={e => {
                                    if (e.key == 'Enter') addPainPoint();
                                }}
                                type="text"
                                name="pain_points"
                                id="pain_points"
                                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                            <button
                                on:click={addPainPoint}
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
                        {#each newAudience.pain_points.painPoints as base_pain}
                            {@const selected =
                                newAudience.pain_points.painPoints.includes(
                                    base_pain
                                )}
                            <button
                                on:click={() => {
                                    removePainPoint(base_pain);
                                }}
                                class:bg-white={!selected}
                                class:bg-blue-bglight={selected}
                                class:text-blue-primary={selected}
                                class:text-gray-600={!selected}
                                type="button"
                                class="px-3 py-2 hover:bg-blue-bglight border rounded-md border-gray-300 gap-2 flex items-center justify-between"
                            >
                                {base_pain}
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
                    <br />
                    <label
                        class="block mb-2 text-sm text-gray-900"
                        for="interest">Interests/behaviours</label
                    >
                    <p class="text-gray-500 text-xs">
                        e.g. shops online, music festivals
                    </p>
                    <div class="col-span-1 flex flex-col gap-1 mb-4">
                        <div class="relative w-3/4">
                            <input
                                bind:value={interest}
                                on:keyup={e => {
                                    if (e.key == 'Enter') addInterest();
                                }}
                                type="text"
                                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />

                            <button
                                on:click={addInterest}
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
                        {#each newAudience.interests.interests as base_interest}
                            {@const selected =
                                newAudience.interests.interests.includes(
                                    base_interest
                                )}
                            <button
                                on:click={() => {
                                    removeInterest(base_interest);
                                }}
                                class:bg-white={!selected}
                                class:bg-blue-bglight={selected}
                                class:text-blue-primary={selected}
                                class:text-gray-600={!selected}
                                type="button"
                                class="px-3 py-2 hover:bg-blue-bglight border rounded-md border-gray-300 gap-2 flex items-center justify-between"
                            >
                                {base_interest}
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
                    <br />

                    <div class="w-6/12 mb-4">
                        <label
                            for="clv"
                            class="block mb-2 text-sm text-gray-900"
                            >Customer lifetime value</label
                        >
                        <input
                            type="text"
                            name="clv"
                            bind:value={newAudience.lifetime_value}
                            id="clv"
                            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            for="clv"
                            class="block mb-2 text-sm text-gray-900"
                            >Additional description (Optional)</label
                        >
                        <input
                            bind:value={newAudience.text}
                            type="text"
                            name="clv"
                            id="clv"
                            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                    </div>

                    <div class="flex justify-end">
                        <button
                            type="button"
                            on:click={() => {
                                showMenu = !showMenu;
                            }}
                            class="mr-4 flex justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        >
                            Cancel</button
                        >
                        <button
                            type="button"
                            class="flex justify-center items-center rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600 sm:col-start-1 sm:mt-0"
                        >
                            Save</button
                        >
                    </div>
                </div>
            </form>
        </div>
    </div>
{/if}
