<script lang="ts">
  import { page } from '$app/stores';
  import { company_infos } from '$lib/stores/stores';
  import OnboardingSteps from '../onboardingSteps.svelte';

  let bool_edit_company = false;
  function editCompanyName() {
    bool_edit_company = !bool_edit_company;
  }

  $: {
    const data = $page.data;
  }
</script>

<img
  class="rounded-t-lg"
  src="/images/unsplash.png"
  alt="Colocio cover"
/>
<div class="flex flex-col gap-6 p-4 sm:p-6">
  <h1 class="text-center text-2xl font-medium text-blue-primary">
    Let's get started
  </h1>
  <div class="flex flex-col gap-1">
    <h2 class="text-center text-sm text-gray-600 sm:text-base">
      Your business name*
    </h2>
    <input
      type="text"
      placeholder="Enter company name"
      bind:value={$company_infos.name}
      on:click={editCompanyName}
      class="group relative mx-20 flex items-center justify-center
      rounded-md border border-gray-300 px-4 py-3 text-center hover:bg-gray-50
      sm:mx-40"
    />
  </div>
  <hr class="my-4 h-px border-0 bg-gray-200" />

  <OnboardingSteps />

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
        <div class="text-sm font-semibold sm:text-base">
          Your details power Colocio’s insights and suggestions
        </div>
        <div class="text-xs text-gray-600 sm:text-sm">
          Remember, the more details you provide, the better Colocio can assist
          in various marketing functions.
        </div>
      </div>
    </div>
  </section>
</div>
