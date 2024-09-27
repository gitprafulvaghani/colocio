<script lang="ts">
  import Doughnut from "$lib/components/charts/Doughnut.svelte";
  import { onMount } from "svelte";
  import {
    GetNewfollowers,
    GetPageProfilevisit,
    GetPageunlikesandunfollows,
    GrowthPageandProfile,
  } from "../../../services/NewFacebook/Insights_service";
  import { timePeriod } from "../../../stores/insightStore";
  import {
    dataChartNewFollowers,
    dataChartUnlikes,
    dataChartVisits,
  } from "$lib/stores/charts_store";
  import Loader from "$lib/components/Loader.svelte";

  // import type {
  //   TotalVisitsSummary
  // } from "../../../services/interface/matric";

  let totalVisitsSummary: { facebook: 0; instagram: 0 };

  const labelsPlatforms = ["Facebook", "Instagram", "X", "Tiktok"];
  let isLoading = false;

  async function GetPageProfileDetails() {
    try {
      const response = await GrowthPageandProfile($timePeriod);
      //  if (response && response.length > 0) {
      //  const visits = response.data[0].values;
      //  totalVisits = visits.reduce(
      //    (sum: any, visit: any) => sum + visit.value,
      //    0
      //  );
      //  }
    } catch (error) {
      console.error("Error fetching age data:", error);
    }
  }
  let visit_Average = 0;
  let Follow_Average = 0;
  let Unlike_Averqage = 0;

  async function fetchProfileVisits(): Promise<void> {
    try {
      isLoading = false;
      const fbProfileVisits = await GetPageProfilevisit($timePeriod);
      const fbNewFollowers = await GetNewfollowers($timePeriod);
      const fbUnlikes = await GetPageunlikesandunfollows($timePeriod);
      const total_vist = calculateProfileVisits1(fbProfileVisits);
      const total_follow = calculateTotalNewFollowers(fbNewFollowers);
      const total_Unlike = calculateTotalUnlikes(fbUnlikes);

      dataChartVisits.update((data) => {
        data.datasets[0].data = [total_vist, 0, 0, 0];
        return data;
      });
      visit_Average = Number(
        calculate_Avarage($dataChartVisits.datasets[0].data)
      );

      dataChartNewFollowers.update((data) => {
        data.datasets[0].data = [total_follow, 0, 0, 0];
        return data;
      });
      Follow_Average = Number(
        calculate_Avarage($dataChartNewFollowers.datasets[0].data)
      );

      dataChartUnlikes.update((data) => {
        data.datasets[0].data = [total_Unlike, 0, 0, 0];
        return data;
      });
      Unlike_Averqage = Number(
        calculate_Avarage($dataChartUnlikes.datasets[0].data)
      );
      isLoading = true;
    } catch (error) {
      console.error("Error fetching fetchProfileVisits data:", error);
    }
  }

  function calculateProfileVisits1(data: any) {
    let sum = 0;
    data.forEach((metric: any) => {
      if (metric.name === "page_views_total") {
        metric.values.forEach((value: any) => {
          sum += value.value; // Assuming 'value' corresponds to profile visits
        });
      }
    });
    return sum;
  }

  function calculate_Avarage(Arry: any) {
    const sum = Arry.reduce((acc: any, value: any) => acc + value, 0);
    const average = sum / Arry.length;
    return average.toFixed(2);
  }

  function calculateTotalNewFollowers(data: any) {
    let sum = 0;
    data.forEach((metric: any) => {
      if (metric.name === "page_fan_adds") {
        metric.values.forEach((value: any) => {
          sum += value.value; // Assuming 'value' corresponds to profile visits
        });
      }
    });
    return sum;
  }

  function calculateTotalUnlikes(data: any) {
    let sum = 0;
    data.forEach((metric: any) => {
      if (metric.name === "page_fan_removes") {
        metric.values.forEach((value: any) => {
          sum += value.value; // Assuming 'value' corresponds to profile visits
        });
      }
    });
    return sum;
  }

  $: $timePeriod, fetchProfileVisits();

  onMount(() => {
    GetPageProfileDetails();
    fetchProfileVisits();
  });
</script>

<h3 class="text-font_dark text-lg font-bold">Growth</h3>
{#if isLoading}
  <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-4">
    <div
      class="col-span-1 justify-between flex flex-col bg-white rounded-lg shadow flex-grow px-8 py-4 min-h-[200px] gap-4"
    >
      <div class="flex flex-1 flex-col gap-2">
        <h4
          class="text-font_dark text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
        >
          Page/Profile visits
        </h4>
        <div class="flex items-center justify-between gap-2">
          <div class="flex gap-[6px] items-end">
            <span class="text-[#0D64E8] text-3xl leading-7 font-bold mb-1"
              >{visit_Average}</span
            >
            <span class="text-gray-500 text-sm mb-1">Avg. 10</span>
          </div>
          <span
            class="bg-[#E4FDEA] text-[#02AB46] text-sm font-normal px-2 py-[2px] rounded-full flex items-center gap-[2px]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.3335 10.0002L4.5085 11.1752L9.16683 6.52516V16.6668H10.8335V6.52516L15.4835 11.1835L16.6668 10.0002L10.0002 3.3335L3.3335 10.0002Z"
                fill="#02AB46"
              />
            </svg>
            10%
          </span>
        </div>
      </div>
      <hr class="h-[1px] bg-gray-200" />
      <div class="">
        <Doughnut
          idChart="visitsChart"
          dataChart={$dataChartVisits}
          useHtmlLegend={true}
        />
      </div>
    </div>
    <div
      class="col-span-1 justify-between flex flex-col bg-white rounded-lg shadow flex-grow px-8 py-4 min-h-[200px] gap-4"
    >
      <div class="flex flex-1 flex-col gap-2">
        <h4
          class="text-font_dark text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
        >
          New followers
        </h4>
        <div class="flex items-center justify-between gap-2">
          <div class="flex gap-[6px] items-end">
            <span class="text-[#0D64E8] text-3xl leading-7 font-bold mb-1"
              >{Follow_Average}</span
            >
            <span class="text-gray-500 text-sm mb-1">Avg. 10</span>
          </div>
          <span
            class="bg-[#E4FDEA] text-[#02AB46] text-sm font-normal px-2 py-[2px] rounded-full flex items-center gap-[2px]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.3335 10.0002L4.5085 11.1752L9.16683 6.52516V16.6668H10.8335V6.52516L15.4835 11.1835L16.6668 10.0002L10.0002 3.3335L3.3335 10.0002Z"
                fill="#02AB46"
              />
            </svg>
            10%
          </span>
        </div>
      </div>
      <hr class="h-[1px] bg-gray-200" />
      <div class="">
        <Doughnut
          idChart="newFollowersChart"
          dataChart={$dataChartNewFollowers}
          useHtmlLegend={true}
        />
      </div>
    </div>
    <div
      class="col-span-1 justify-between flex flex-col bg-white rounded-lg shadow flex-grow px-8 py-4 min-h-[200px] gap-4"
    >
      <div class="flex flex-1 flex-col gap-2">
        <h4
          class="text-font_dark text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
        >
          Page unlikes/unfollows
        </h4>
        <div class="flex items-center justify-between gap-2">
          <div class="flex gap-[6px] items-end">
            <span class="text-[#0D64E8] text-3xl leading-7 font-bold mb-1"
              >{Unlike_Averqage}</span
            >
            <span class="text-gray-500 text-sm mb-1">Avg. 10</span>
          </div>
          <span
            class="bg-[#E4FDEA] text-[#02AB46] text-sm font-normal px-2 py-[2px] rounded-full flex items-center gap-[2px]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.3335 10.0002L4.5085 11.1752L9.16683 6.52516V16.6668H10.8335V6.52516L15.4835 11.1835L16.6668 10.0002L10.0002 3.3335L3.3335 10.0002Z"
                fill="#02AB46"
              />
            </svg>
            10%
          </span>
        </div>
      </div>
      <hr class="h-[1px] bg-gray-200" />
      <div class="">
        <Doughnut
          idChart="unlikesChart"
          dataChart={$dataChartUnlikes}
          useHtmlLegend={true}
        />
      </div>
    </div>
  </div>
{:else}
  <Loader />
{/if}
