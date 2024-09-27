<script lang="ts">
  import {
    GetAudianceTab,
    GetAudianceTab2,
    Optimalaudience,
  } from '$lib/services/NewFacebook/Insights_service';
  import { onMount } from 'svelte';
  import LookalikeAudiences from './LookalikeAudiences.svelte';

  let ageGenderData: any[] = [];
  async function GetAgeandGenderDetails(): Promise<void> {
    // isLoading = true;
    try {
      const response = await Optimalaudience();
      ageGenderData = response.map((res: any) => res.targeting);
    } catch (error) {
      console.error('Error fetching age data:', error);
    } finally {
      // isLoading = false;
    }
  }

  async function GetTopeAudianceDetails(): Promise<void> {
    try {
      const data = await GetAudianceTab();
      console.log('datata top Audiance+++', data);
    } catch (error) {
      console.error('Error fetching age data:', error);
    }
  }

  async function getTopAudience2Details(): Promise<void> {
    try {
      const data = await GetAudianceTab2();
      console.log('Top Audience Data:', data);
    } catch (error) {
      console.error('Error fetching top audience data:', error);
    }
  }

  onMount(() => {
    GetAgeandGenderDetails();
    GetTopeAudianceDetails();
    getTopAudience2Details();
  });
</script>

<div
  class="flex flex-1 flex-grow flex-col rounded-lg bg-white p-4 shadow md:p-8"
>
  <h4 class="mb-[20px] text-[18px] font-semibold text-font_dark">
    Lookalike audiences
  </h4>
  <div
    class="relative mb-4 flex gap-8 rounded-md bg-blue-bglight p-4 text-sm text-blue-primary"
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
            d="M8.5 2C5.18486 2 2.5 4.68486 2.5 8C2.5 11.3151 5.18486 14 8.5 14C11.8151 14 14.5 11.3151 14.5 8C14.5 4.68486 11.8151 2 8.5 2ZM12.2171 10.9677C11.835 11.335 11.3189 11.4739 10.7382 10.7345L8.99627 8.61538C8.7134 8.27295 8.18735 8.28288 7.91439 8.63027L6.29653 10.7146C5.67618 11.5087 5.1402 11.3201 4.74814 10.9132C4.11786 10.1042 3.74069 9.09677 3.74069 7.99504C3.74069 5.36973 5.87469 3.23573 8.5 3.23573C11.1253 3.23573 13.2593 5.36973 13.2593 7.99504C13.2593 9.11663 12.8672 10.1489 12.2171 10.9628V10.9677Z"
            fill="#0D64E8"
          />
        </svg>
      </div>
      <div>
        <div class="font-medium">Pareto generated lookalike audiences:</div>
        <div class="text-xs">
          Pareto generated audiences whose demographics and interests are
          similar to those of your existing followers
        </div>
      </div>
    </div>
    <button
      type="button"
      class="absolute right-2 top-2 flex items-center rounded-md bg-transparent"
    >
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.2712 11.7712L4.72876 4.22876M12.2712 4.22876L4.72876 11.7712"
          stroke="#0D64E8"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
  {#if ageGenderData.length != 0}
    <LookalikeAudiences {ageGenderData} />
  {/if}
</div>
