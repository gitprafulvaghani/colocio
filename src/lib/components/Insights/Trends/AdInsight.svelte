<script>
  //import { PUBLIC_SUPABASE_URL } from './../../../../../.svelte-kit/ambient.d.ts';
  // @ts-nocheck

  import SectionTitle from '$lib/components/SectionTitle.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import {
    getAdsetInsightsData,
    getInsights,
    getTargetingAudienceForAd,
  } from '../../../services/NewFacebook/Insights_service';
  import { trends_selected_ad } from '$lib/stores/insightStore';
  import AgeCard from '../AgeCard.svelte';
  import CityCard from '../CityCard.svelte';
  import CommonInterestsCard from '../CommonInterestsCard.svelte';
  import FormatsCard from '../FormatsCard.svelte';
  import GenderCard from '../GenderCard.svelte';
  import PlatformsCard from '../PlatformsCard.svelte';
  import PopularDayTimesCard from '../PopularDayTimesCard.svelte';
  import ReachSpendCard from '../ReachSpendCard.svelte';
  import TopPerformers from '../TopPerformers.svelte';
  import { walk } from 'svelte/compiler';
  import { AdInsights_TopPerfoming } from '../../../services/NewFacebook/Insights_service';
  //  import { createClient } from "@supabase/supabase-js";
  import {
    PUBLIC_SUPABASE_ANON_KEY,
    PUBLIC_SUPABASE_URL,
  } from '$env/static/public';
  import { library } from '../../../stores/stores';
  import Logo from '$lib/components/Logo.svelte';
  //  import { defineConfig } from "vite";

  //  import { svelte } from "@sveltejs/vite-plugin-svelte";

  let topPerformingAgeGroupAd = {};
  let isLoadingAd = true;
  let errorAd = null;
  let highestLocation = null;
  let hashtags = ['AmazingCompany', 'AmCoEvents'];
  export let trends_selected;
  export let topGenderAd;
  let type = 'ad';
  let title = 'ad';
  let schedule_tasks = [
    'Monday, 11:00 AM',
    'Wednesday, 7:00 AM',
    'Friday, 11:00 AM',
  ];
  let interests = [
    'Online shopping',
    'Food and drink pairing',
    'Social Events',
    'Outdoor events',
    'Friends & family',
    'At home dining',
    'Mixology',
  ];
  let week = false;
  export let topGenderPost;

  const targetingAudience = writable({});

  const fetchInsightData = async () => {
    try {
      const data = await getAdsetInsightsData();
      const targetingData = await getTargetingAudienceForAd(data[0].adset_id);
      targetingAudience.set(targetingData);
    } catch (error) {
      console.log(error);
    }
  };
  let topData = writable({});

  const fetchTop_Performdata = async () => {
    try {
      const data = await AdInsights_TopPerfoming();
      topData.update(() => data[0] || {});
      //  console.log("topdata++++++++++++++", data[0] || {});
    } catch (error) {
      console.log(error);
    }
  };
  function formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return `${date.toLocaleDateString(undefined, {
      weekday: 'long',
    })}, ${date.toLocaleTimeString(undefined, options)}`;
  }

  function extractHashtags(message) {
    if (!message) return [];
    return message.match(/#\w+/g) || [];
  }

  function getTextLength(message) {
    if (!message) return 0;

    return message.trim().split(/\s+/).length;
  }
  //
  //  let audiences = [];
  //  console.log("check++++++++++++++1146445496444");
  //  const supabaseUrl = PUBLIC_SUPABASE_URL || "http://127.0.0.1:54323";
  //  const supabaseKey =
  //    PUBLIC_SUPABASE_ANON_KEY ||
  //    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
  //
  //
  //  async function handler(req, res) {
  //    const supabase = createClient(supabaseUrl, supabaseKey);
  //
  //    try {
  //      const { data, error } = await supabase.from("audiences").select("*");
  //      console.log("dtadttdadttadtatdtadtd", data);
  //      if (error) {
  //        throw error;
  //      }
  //      res.status(200).json(data);
  //    } catch (error) {
  //      res.status(500).json({ error: error.message });
  //    }
  //  }
  async function getAgeDetails() {
    try {
      const response = await getInsights($trends_selected_ad);
      console.log('Check console for age data', response);
      topPerformingAgeGroupAd = calculateAdPerformance(response);
    } catch (err) {
      console.error('Error fetching age data:', err);
      errorAd = err;
    } finally {
      isLoadingAd = false;
    }
  }

  function calculateAdPerformance(data) {
    const performance = {};

    data.forEach(entry => {
      const { age, clicks, impressions, spend } = entry;

      if (!performance[age]) {
        performance[age] = { clicks: 0, impressions: 0, spend: 0 };
      }

      performance[age].clicks += parseInt(clicks, 10);
      performance[age].impressions += parseInt(impressions, 10);
      performance[age].spend += parseFloat(spend);
    });

    const performanceArray = Object.keys(performance).map(age => {
      const { clicks, impressions, spend } = performance[age];
      const score = clicks * 0.4 + impressions * 0.4 - spend * 0.2;
      return { age, score, clicks, impressions, spend };
    });

    performanceArray.sort((a, b) => b.score - a.score);

    return performanceArray[0];
  }

  function AdGender(value) {
    topGenderAd = value;
  }

  function handleAdLocationUpdate(event) {
    highestLocation = event.detail;
  }

  onMount(() => {
    //fetchData();
    //fetchAudiences();
    fetchInsightData();
    fetchTop_Performdata();
    getAgeDetails();

    // handler();
  });
  //
  //  onMount(async () => {
  //    try {
  //      const response = await fetch("/api/fetchAudiences"); // Ensure your API route matches
  //      if (!response.ok) {
  //        throw new Error("Failed to fetch data");
  //      }
  //      const data = await response.json();
  //      audiences = data;
  //      console.log("Audience Data:", audiences);
  //    } catch (error) {
  //      console.error("Error fetching audiences:", error);
  //    }
  //  });
</script>

<!--<div>
  <h2>Audiences+++++++++++  </h2>
  <ul>
    {#each audiences as audience}
      <li>{audience.name} - {audience.description}</li>
    {/each}
  </ul>
</div>-->

<div class="flex flex-col items-stretch gap-5 md:flex-row">
  <div
    class="flex flex-1 flex-grow flex-col rounded-lg bg-white shadow-[0px_4px_9px_0px_#00000014] md:w-1/2"
  >
    <div
      class="flex flex-col items-center justify-center gap-2.5 px-4 py-4 md:px-8"
    >
      <img
        src="/icons/tag.svg"
        class="h-8 w-8"
        alt="tag icon"
      />
      <span class="text-lg font-semibold text-[#111827]"
        >Top performing attributes
      </span>
    </div>
    {#if $topData}
      <div class="flex flex-col gap-4 border-t border-gray-200 p-4 md:p-8">
        <div class="flex">
          <p
            class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]"
          >
            Platforms
          </p>
          <div class="flex flex-col">
            {#if $topData.adset && $topData.adset.targeting && $topData.adset.targeting.publisher_platforms && $topData.adset.targeting.publisher_platforms.length > 0}
              {#each $topData.adset.targeting.publisher_platforms as platform}
                <div class="flex items-center gap-2">
                  {#if platform === 'facebook'}
                    <img
                      src="/icons/facebook.svg"
                      class="h-5 w-5"
                      alt="facebook icon"
                    />
                    <span class="text-[14px] font-normal text-[#111827]"
                      >Facebook</span
                    >
                  {:else if platform === 'instagram'}
                    <img
                      src="/icons/instagram.svg"
                      class="h-5 w-5"
                      alt="instagram icon"
                    />
                    <span class="text-[14px] font-normal text-[#111827]"
                      >Instagram</span
                    >
                  {/if}
                </div>
              {/each}
            {:else}
              <p class="text-[14px] font-normal text-[#6B7280]">
                No publisher platforms specified.
              </p>
            {/if}
          </div>
        </div>
        <div class="flex items-center">
          <p
            class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]"
          >
            Text length
          </p>
          <div class="flex flex-col text-[14px] font-normal text-[#111827]">
            {$topData.creative?.object_story_spec?.video_data?.message
              ? getTextLength(
                  $topData.creative.object_story_spec.video_data.message
                ) + ' words'
              : 'N/A'}
          </div>
        </div>
        <div class="flex items-center">
          <p
            class="min-w-[90px] text-[14px] font-normal text-[#6B7280] sm:min-w-[120px]"
          >
            Hashtags
          </p>
          <div class="flex flex-wrap items-center gap-1">
            {#each extractHashtags($topData.creative?.object_story_spec?.video_data?.message) as hashtag}
              <button
                type="button"
                disabled
                class="w-fit rounded-md p-1.5 py-[2px] text-[14px] text-[#111827]"
                style="box-shadow: 0px 1px 3px 0px #00000029;">{hashtag}</button
              >
            {:else}
              <p class="text-[#111827] text-[14px]">No hashtags found</p>
            {/each}
          </div>
        </div>
        <div class="flex items-center">
          <p
            class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]"
          >
            Format
          </p>
          <div class="flex flex-col text-[14px] text-[#111827]">Video</div>
        </div>
        <div class="flex">
          <p
            class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]"
          >
            Schedule
          </p>
          <div class="flex flex-col gap-[6px] text-[14px] text-[#111827]">
            <div class="flex items-center gap-2">
              <img
                src="/icons/calendar.svg"
                class="h-5 w-5"
                alt="calendar icon"
              />
              <span
                >{formatDateTime($topData.adset && $topData.adset.start_time)}
                {formatDateTime(
                  $topData.adset && $topData.adset.end_time
                )}</span
              >
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <p
            class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]"
          >
            Budget
          </p>
          <div class="flex flex-col text-[14px] text-[#111827]">
            ${($topData.adset && $topData.adset.daily_budget) || 'N/A'} per day
          </div>
        </div>

        <div class="flex items-center">
          <p
            class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]"
          >
            Reach
          </p>
          <div class="flex flex-col text-[14px] text-[#111827]">
            {($topData.adset &&
              $topData.adset.targeting &&
              $topData.adset.targeting.geo_locations &&
              $topData.adset.targeting.geo_locations.countries &&
              $topData.adset.targeting.geo_locations.countries.length) ||
              'N/A'}
          </div>
        </div>
      </div>
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
  <div
    class="flex flex-1 flex-grow flex-col rounded-lg bg-white shadow-[0px_4px_9px_0px_#00000014] md:w-1/2"
  >
    <div
      class="flex flex-col items-center justify-center gap-2.5 px-4 py-4 md:px-8"
    >
      <img
        src="/icons/user_group.svg"
        class="h-8 w-8"
        alt="tag icon"
      />
      <span class="text-[14px] text-lg font-bold text-[#111827]"
        >Top performing audience
      </span>
    </div>
    <div class="flex flex-col gap-4 border-t border-gray-200 p-4 md:p-8">
      <div class="flex items-center">
        <p class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]">
          Age
        </p>
        <div class="flex flex-col text-[14px] text-[#111827]">
          {#if errorAd}
            {errorAd.message}
          {:else if isLoadingAd}
            Loading...
          {:else if topPerformingAgeGroupAd.age}
            {topPerformingAgeGroupAd.age}
          {/if}
        </div>
      </div>
      <div class="flex items-center">
        <p class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]">
          Gender
        </p>
        <div class="flex flex-col text-[14px] text-[#111827]">
          {#if topGenderAd}
            {topGenderAd}
          {:else}
            <span>Loading...</span>
          {/if}
        </div>
      </div>
      <div class="flex items-center">
        <p class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]">
          Location
        </p>
        <div class="flex flex-col text-[14px] text-[#111827]">
          {#if highestLocation}
            {highestLocation}
          {:else}
            <span>Loading...</span>
          {/if}
        </div>
      </div>
      <div>
        <p class="mt-[16px] text-[14px] font-normal text-[#6B7280]">
          Interests & behaviour
        </p>
        <div class="mt-2 flex flex-wrap items-center gap-1 gap-y-2">
          {#if $targetingAudience?.flexible_spec && $targetingAudience.flexible_spec.length > 0}
            {#each $targetingAudience.flexible_spec as spec}
              {#each spec.interests as interest}
                <button
                  type="button"
                  disabled
                  class="w-fit rounded-md p-1.5 py-[2px] text-[14px] text-[#111827]"
                  style="box-shadow: 0px 1px 3px 0px #00000029;"
                >
                  {interest.name}
                </button>
              {/each}
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
<div
  class="flex flex-1 flex-grow flex-col gap-4 rounded-lg bg-white p-4 shadow-[0px_4px_9px_0px_#00000014] md:p-8"
>
  <h4 class="font-bold text-font_dark">Top performers</h4>
  <TopPerformers {title} />
</div>
<h2 class="text-lg font-semibold text-[#111827]">Attribute breakdown</h2>
<div class="flex flex-col items-stretch gap-5 md:flex-row">
  <div
    class="flex flex-1 flex-grow flex-col justify-between rounded-lg bg-white px-4 py-4 shadow-[0px_4px_9px_0px_#00000014] md:min-h-[300px] md:px-8 md:py-7"
  >
    <SectionTitle
      tippyContent={'Informations'}
      tippyId={'platforms-tooltip'}
    >
      <p
        slot="title"
        class="text-[18px] font-semibold text-[#111827]"
      >
        Platforms
      </p>
    </SectionTitle>
    <PlatformsCard />
  </div>
  <div
    class="flex flex-1 flex-grow flex-col justify-between rounded-lg bg-white px-4 py-4 shadow-[0px_4px_9px_0px_#00000014] md:min-h-[300px] md:px-8 md:py-7"
  >
    <SectionTitle
      tippyContent={'Informations'}
      tippyId={'formats-tooltip'}
    >
      <p
        slot="title"
        class="text-[18px] font-semibold text-[#111827]"
      >
        Formats
      </p>
    </SectionTitle>
    <FormatsCard />
  </div>
</div>
<div class="flex flex-col items-stretch gap-5 md:flex-row">
  <div
    class="flex flex-1 flex-grow flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_4px_9px_0px_#00000014] md:min-h-[400px] md:p-8"
  >
    <SectionTitle
      tippyContent={'Informations'}
      tippyId={'platforms-tooltip'}
    >
      <p
        slot="title"
        class="text-[18px] font-semibold text-[#111827]"
      >
        Reach vs Spend
      </p>
    </SectionTitle>
    <ReachSpendCard />
  </div>
  <div
    class="flex flex-1 flex-grow flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_4px_9px_0px_#00000014] md:p-8"
  >
    <div class="flex items-start justify-between">
      <SectionTitle
        tippyContent={'Informations'}
        tippyId={'formats-tooltip'}
      >
        <p
          slot="title"
          class="text-[18px] font-semibold text-[#111827]"
        >
          Popular days/times
        </p>
      </SectionTitle>
      <div>
        <button on:click={() => (week = false)}>Day</button>
        <button on:click={() => (week = true)}>Time</button>
      </div>
    </div>
    <PopularDayTimesCard {week} />
  </div>
</div>
<h2 class="text-lg font-semibold text-[#111827]">Audience breakdown</h2>
<div class="flex flex-col items-stretch gap-4 md:flex-row">
  <div class="flex flex-[7] flex-col gap-4">
    <div
      class="flex flex-1 flex-grow flex-col justify-between rounded-lg bg-white p-[16px] shadow-[0px_4px_9px_0px_#00000014] md:min-h-[300px] md:p-[28px_30px]"
    >
      <SectionTitle>
        <p
          slot="title"
          class="text-[18px] font-semibold text-[#111827]"
        >
          Age
        </p>
      </SectionTitle>
      <AgeCard {type} />
    </div>
    <div
      class="flex flex-1 flex-grow flex-col justify-between rounded-lg bg-white p-[16px] shadow-[0px_4px_9px_0px_#00000014] md:min-h-[300px] md:p-[28px_30px]"
    >
      <SectionTitle>
        <p
          slot="title"
          class="text-[18px] font-semibold text-[#111827]"
        >
          Common interests
        </p>
      </SectionTitle>
      <CommonInterestsCard />
    </div>
  </div>

  <div class="flex flex-[3] flex-col gap-3">
    <!--<div
          class="flex-1 justify-between flex flex-col bg-white rounded-lg shadow flex-grow p-8 py-10 min-h-[200px] max-h-[270px]"
        >
          <SectionTitle>
            <p slot="title" class="text-[#111827] text-[18px] font-semibold">
              Race
            </p>
          </SectionTitle>
          <RaceCard />
        </div>-->
    <div
      class="flex flex-1 flex-grow flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_4px_9px_0px_#00000014] md:min-h-[300px] md:p-[20px]"
    >
      <SectionTitle>
        <p
          slot="title"
          class="text-[18px] font-semibold text-[#111827]"
        >
          Gender
        </p>
      </SectionTitle>
      <GenderCard
        {type}
        {AdGender}
      />
    </div>
    <div
      class="flex flex-1 flex-grow flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_4px_9px_0px_#00000014] md:min-h-[300px] md:p-[20px]"
    >
      <SectionTitle>
        <p
          slot="title"
          class="text-[18px] font-semibold text-[#111827]"
        >
          Location
        </p>
      </SectionTitle>
      <CityCard on:highestLocationUpdate={handleAdLocationUpdate} />
    </div>
  </div>
</div>
