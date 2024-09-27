<script lang="ts">
  import AgeCard from "$lib/components/Insights/AgeCard.svelte";
  import CityCard from "$lib/components/Insights/CityCard.svelte";
  import CommonInterestsCard from "$lib/components/Insights/CommonInterestsCard.svelte";
  import FormatsCard from "$lib/components/Insights/FormatsCard.svelte";
  import GenderCard from "$lib/components/Insights/GenderCard.svelte";
  import LookalikeCard from "$lib/components/Insights/LookalikeCard.svelte";
  import OptimalAudiencesCard from "$lib/components/Insights/OptimalAudiencesCard.svelte";
  import PlatformsCard from "$lib/components/Insights/PlatformsCard.svelte";
  import PopularDayTimesCard from "$lib/components/Insights/PopularDayTimesCard.svelte";
  import RaceCard from "$lib/components/Insights/RaceCard.svelte";
  import ReachSpendCard from "$lib/components/Insights/ReachSpendCard.svelte";
  import SectionTitle from "$lib/components/SectionTitle.svelte";
  import { insights_selected } from "$lib/stores/stores";
  import TopPerformers from "$lib/components/Insights/TopPerformers.svelte";
  import FollowersGrowthCard from "$lib/components/Insights/Metrics/FollowersGrowthCard.svelte";
  import CampaignEngagements from "$lib/components/Insights/Metrics/CampaignEngagements.svelte";
  import Growth from "$lib/components/Insights/Metrics/Growth.svelte";
  import SpendCosts from "$lib/components/Insights/Metrics/SpendCosts.svelte";
  import Conversion from "$lib/components/Insights/Metrics/Conversion.svelte";
  import Reach from "$lib/components/Insights/Metrics/Reach.svelte";
  import { onMount } from "svelte";
  import { fetchInsights } from "$lib/services/NewFacebook/Insights_service";
  import AdInsight from "$lib/components/Insights/Trends/AdInsight.svelte";
  import PostInsight from "$lib/components/Insights/Trends/PostInsight.svelte";
  import { trends_selected_ad } from "$lib/stores/insightStore";
  import InsightMetrics from "$lib/components/Insights/Metrics/InsightMetrics.svelte";
  import { GrowthPageandProfile } from "../../../lib/services/NewFacebook/Insights_service";

  let trends_selected: any = "ad_insights";

  let hashtags = ["AmazingCompany", "AmCoEvents"];
  let schedule_tasks = [
    "Monday, 11:00 AM",
    "Wednesday, 7:00 AM",
    "Friday, 11:00 AM",
  ];
  let interests = [
    "Online shopping",
    "Food and drink pairing",
    "Social Events",
    "Outdoor events",
    "Friends & family",
    "At home dining",
    "Mixology",
  ];

  function handleClick(selection: string) {
    trends_selected = selection;
    trends_selected_ad.set(trends_selected);
    console.log("Ad Insights selected");
  }
  onMount(async () => {
    try {
      await fetchInsights("23858751790020576");
    } catch (error) {
      console.error("Error fetching insights:+++++++", error);
    }
  });
</script>

<svelte:head>
  <title>Insights | Colocio</title>
  <meta name="description" content="Insights page of the Colocio app" />
  <meta
    name="keywords"
    content="colocio, ai, ads, facebook, meta, facebook ads, campaign"
  />
</svelte:head>

<main class="flex flex-col gap-4 p-4 bg-[#f9fafb] lg:pb-4 pb-[80px]">
  {#if $insights_selected == "trends"}
    <h2 class="text-[#4B5563] text-[24px] font-medium">Trends</h2>
    <ul
      class="flex flex-wrap text-sm w-fit text-center text-gray-500 border border-[#D1D5DB] rounded-md"
    >
      <li>
        <button
          class={`${
            trends_selected == "ad_insights"
              ? "bg-[#F4F9FF] text-[#0D64E8]"
              : "bg-[#fff] text-[#4B5563]"
          } rounded-[6px_0px_0px_6px] px-[23px] py-[11.5px] text-[14px]`}
          on:click={() => handleClick("ad_insights")}
          type="button"
          >Ad insights
        </button>
      </li>
      <li>
        <button
          class={`${
            trends_selected == "posts_insights"
              ? "bg-[#F4F9FF] text-[#0D64E8]"
              : "bg-[#fff] text-[#4B5563]"
          } rounded-[0_6px_6px_0] px-[23px] py-[11.5px] text-[14px] border-l-[#D1D5DB] border-l-[1px]`}
          on:click={() => handleClick("posts_insights")}
          type="button"
          >Post insights
        </button>
      </li>
    </ul>

    {#if trends_selected === "ad_insights"}
      <AdInsight {trends_selected} />
    {:else if trends_selected === "posts_insights"}
      <PostInsight {trends_selected} />
    {/if}
  {:else if $insights_selected == "audiences"}
    <h2 class="text-[#4B5563] text-[24px] font-medium">Audiences</h2>
    <OptimalAudiencesCard />
    <LookalikeCard />
  {:else if $insights_selected == "metrics"}
    <h2 class="text-[#4B5563] text-[24px] font-medium">Metrics</h2>
    <InsightMetrics />
  {/if}
</main>
