<!-- TODO:RTR: Google Location autocomplete not working -->
<script lang="ts">
  import { audience } from '$lib/stores/onboarding';
  import { currency } from '$lib/stores/stores';
  import GooglePlacesAutocomplete from '@silintl/svelte-google-places-autocomplete';

  let interest = '';
  let painPoint = '';
  let method = '';

  function addMethod() {
    if (method == '') return;
    $audience.methods = [...$audience.methods, method];
    method = '';
  }

  function removeMethod(value) {
    $audience.methods = $audience.methods.filter(item => item != value);
  }

  function addInterest() {
    if (interest == '') return;
    $audience.interests = [...$audience.interests, interest];
    interest = '';
  }

  function removeInterest(value) {
    $audience.interests = $audience.interests.filter(item => item != value);
  }

  function addPainPoint() {
    if (painPoint == '') return;
    $audience.painPoints = [...$audience.painPoints, painPoint];
    painPoint = '';
  }

  function removePainPoint(value) {
    $audience.painPoints = $audience.painPoints.filter(item => item != value);
  }

  function addLocation(location) {
    if (location == '') return;
    $audience.locations = [...$audience.locations, location];
  }

  function removeLocation(value) {
    $audience.locations = $audience.locations.filter(item => item != value);
  }

  function handlePlaceSelect(place) {
    addLocation(place.detail.text);
    place.detail.text = '';
  }
</script>

<div class="flex flex-col gap-4">
  <h1 class="text-center text-2xl font-medium text-blue-primary">Audience</h1>
  <p class="text-center text-sm font-medium text-gray-900">
    Create one or more audience profiles that describe your consumers
  </p>

  <section
    class="relative flex gap-8 rounded-md bg-blue-bglight p-4 text-blue-primary"
  >
    <div class="flex flex-1 gap-1">
      <div>
        <svg
          class="mt-0.5 h-4 w-4"
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 2C5.18486 2 2.5 4.68486 2.5 8C2.5 11.3151 5.18486 14 8.5
            14C11.8151 14 14.5 11.3151 14.5 8C14.5 4.68486 11.8151 2 8.5
            2ZM12.2171 10.9677C11.835 11.335 11.3189 11.4739 10.7382
            10.7345L8.99627 8.61538C8.7134 8.27295 8.18735 8.28288 7.91439
            8.63027L6.29653 10.7146C5.67618 11.5087 5.1402 11.3201 4.74814
            10.9132C4.11786 10.1042 3.74069 9.09677 3.74069 7.99504C3.74069
            5.36973 5.87469 3.23573 8.5 3.23573C11.1253 3.23573 13.2593 5.36973
            13.2593 7.99504C13.2593 9.11663 12.8672 10.1489 12.2171
            10.9628V10.9677Z"
            fill="#0D64E8"
          />
        </svg>
      </div>
      <div>
        <div class="text-sm font-semibold sm:text-base">Audience tips</div>
        <div class="text-xs text-gray-600 sm:text-sm">
          Colocio will use these profiles to target your customers while
          offering insights into future ‘hotspots’ within the market.
        </div>
        <br />
        <div class="text-sm font-semibold sm:text-base">Profile example:</div>
        <div class="flex">
          <div class="text-xs text-gray-600 sm:text-sm">
            Name<br />
            Age<br />
            Gender<br />
            Location<br />
            Contact/Purchase method<br />
            Pain points<br />
            Interests/Behaviours<br />
          </div>
          <div class="ml-5 text-xs text-gray-600 sm:text-sm">
            Cocktail Candice<br />
            21-32<br />
            Female<br />
            London, UK<br />
            On site purchases<br />
            Frustrated with low stock/options during peak times<br />
            Social event, music festivals, dancing, drink pairing, mixology<br
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <br />
  <div class="bg-gray-100 p-6">
    <div class="text-sm font-semibold sm:text-base">Profile 1</div>
    <br />

    <label class="font-medium text-gray-600">Name</label>
    <br />
    <input
      type="text"
      bind:value={$audience.name}
      class="form-control block w-3/4 rounded-lg border border-gray-300 bg-white
      p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
    />
    <br />
    <label class="font-medium text-gray-600">Age</label>
    <br />
    <div class="flex items-center">
      <input
        type="number"
        bind:value={$audience.age.min}
        class="form-control block w-20 rounded-lg border border-gray-300
        bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500
        focus:ring-blue-500"
      />
      <label class="mx-5">to</label>
      <input
        type="number"
        bind:value={$audience.age.max}
        class="form-control block w-20 rounded-lg border border-gray-300
        bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500
        focus:ring-blue-500"
      />
    </div>
    <br />
    <label class="font-medium text-gray-600">Gender</label>
    <select
      bind:value={$audience.gender}
      id="age"
      class="block w-3/4 rounded-lg border border-gray-300 bg-white p-2.5
      text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
    >
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="All">All</option>
      <option value="Other">Other</option>
    </select>
    <br />
    <label class="font-medium text-gray-600">Location</label>
    <br />
    <p class="text-xs text-gray-500">
      Search for a location and select available options from the Google
      suggestions
    </p>
    <br />
    <div class="relative w-3/4">
      <GooglePlacesAutocomplete
        id="googlePlaces"
        class="form-control block w-full rounded-lg border border-gray-300
        bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500
        focus:ring-blue-500"
        apiKey={'AIzaSyBBRPpOYbFqr-A5t9dfSVFp9ZExuXFhO6I'}
        on:place_changed={handlePlaceSelect}
      />
    </div>

    <div class="col-span-2 mt-2 flex flex-wrap gap-2">
      {#each $audience.locations as location}
        <button
          on:click={() => {
            removeLocation(location);
          }}
          type="button"
          class="flex items-center justify-between gap-2 rounded-md border
          border-gray-300 bg-blue-bglight px-3 py-2 text-blue-primary"
        >
          {location}
          <img
            src="/icons/close_blue.svg"
            alt="plus"
            class="h-5 w-5"
          />
        </button>
      {/each}
    </div>
    <br />
    <br />
    <label class="font-medium text-gray-600">Contact/Purchase method</label>
    <br />
    <p class="text-xs text-gray-500">e.g. Online Payment, Credit Card</p>
    <br />

    <div class="col-span-1 flex flex-col gap-1">
      <div class="relative w-3/4">
        <input
          type="text"
          bind:value={method}
          class="block w-full rounded-lg border border-gray-300 bg-white p-2.5
          text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          on:keyup={e => {
            if (e.key == 'Enter') addMethod();
          }}
        />
        <button
          type="button"
          class="absolute right-3 top-3 bg-transparent"
          on:click={addMethod}
        >
          <img
            src="/icons/plus.svg"
            alt="plus"
            class="h-5 w-5"
          />
        </button>
      </div>
      <br />
    </div>
    <div class="col-span-2 flex flex-wrap gap-2">
      {#each $audience.methods as base_method}
        {@const selected = $audience.methods.includes(base_method)}
        <button
          on:click={() => {
            removeMethod(base_method);
          }}
          class:bg-white={!selected}
          class:bg-blue-bglight={selected}
          class:text-blue-primary={selected}
          class:text-gray-600={!selected}
          type="button"
          class="flex items-center justify-between gap-2 rounded-md border
          border-gray-300 px-3 py-2 hover:bg-blue-bglight"
        >
          {base_method}
          {#if selected}
            <img
              src="/icons/close_blue.svg"
              alt="plus"
              class="h-5 w-5"
            />
          {:else}
            <img
              src="/icons/plus.svg"
              alt="plus"
              class="h-5 w-5"
            />
          {/if}
        </button>
      {/each}
    </div>
    <br />
    <label class="font-medium text-gray-600">Pain points</label>
    <br />
    <p class="text-xs text-gray-500">e.g. Slow service, High prices</p>
    <br />
    <div class="col-span-1 flex flex-col gap-1">
      <div class="relative w-3/4">
        <input
          type="text"
          bind:value={painPoint}
          class="block w-full rounded-lg border border-gray-300 bg-white p-2.5
          text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          on:keyup={e => {
            if (e.key == 'Enter') addPainPoint();
          }}
        />
        <button
          type="button"
          class="absolute right-3 top-3 bg-transparent"
          on:click={addPainPoint}
        >
          <img
            src="/icons/plus.svg"
            alt="plus"
            class="h-5 w-5"
          />
        </button>
      </div>
      <br />
    </div>
    <div class="col-span-2 flex flex-wrap gap-2">
      {#each $audience.painPoints as base_pain}
        {@const selected = $audience.painPoints.includes(base_pain)}
        <button
          on:click={() => {
            removePainPoint(base_pain);
          }}
          class:bg-white={!selected}
          class:bg-blue-bglight={selected}
          class:text-blue-primary={selected}
          class:text-gray-600={!selected}
          type="button"
          class="flex items-center justify-between gap-2 rounded-md border
          border-gray-300 px-3 py-2 hover:bg-blue-bglight"
        >
          {base_pain}
          {#if selected}
            <img
              src="/icons/close_blue.svg"
              alt="plus"
              class="h-5 w-5"
            />
          {:else}
            <img
              src="/icons/plus.svg"
              alt="plus"
              class="h-5 w-5"
            />
          {/if}
        </button>
      {/each}
    </div>
    <br />
    <label class="font-medium text-gray-600"> Interests/behaviours </label>
    <br />
    <p class="text-xs text-gray-500">e.g. shops online, music festivals</p>
    <br />
    <div class="col-span-1 flex flex-col gap-1">
      <div class="relative w-3/4">
        <input
          type="text"
          bind:value={interest}
          class="block w-full rounded-lg border border-gray-300 bg-white p-2.5
          text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          on:keyup={e => {
            if (e.key == 'Enter') addInterest();
          }}
        />
        <button
          type="button"
          class="absolute right-3 top-3 bg-transparent"
          on:click={addInterest}
        >
          <img
            src="/icons/plus.svg"
            alt="plus"
            class="h-5 w-5"
          />
        </button>
      </div>
      <br />
    </div>
    <div class="col-span-2 flex flex-wrap gap-2">
      {#each $audience.interests as base_interest}
        {@const selected = $audience.interests.includes(base_interest)}
        <button
          on:click={() => {
            removeInterest(base_interest);
          }}
          class:bg-white={!selected}
          class:bg-blue-bglight={selected}
          class:text-blue-primary={selected}
          class:text-gray-600={!selected}
          type="button"
          class="flex items-center justify-between gap-2 rounded-md border
          border-gray-300 px-3 py-2 hover:bg-blue-bglight"
        >
          {base_interest}
          {#if selected}
            <img
              src="/icons/close_blue.svg"
              alt="plus"
              class="h-5 w-5"
            />
          {:else}
            <img
              src="/icons/plus.svg"
              alt="plus"
              class="h-5 w-5"
            />
          {/if}
        </button>
      {/each}
    </div>
    <br />
    <label class="font-medium text-gray-600">
      Customer Lifetime Value ({$currency.code})
    </label>
    <div class="col-span-1 flex flex-col gap-1">
      <div class="relative w-1/4">
        <input
          type="number"
          bind:value={$audience.lifetime_value}
          class="block w-full rounded-lg border border-gray-300 bg-white p-2.5
          text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <br />
    </div>
    <br />
    <h3 class="text-sm font-medium text-gray-600 sm:text-base">
      Additional description (Optional)
    </h3>
    <textarea
      bind:value={$audience.description}
      class="w-3/4 rounded-md border border-gray-300 px-4 py-3 text-left"
    />
  </div>
</div>
