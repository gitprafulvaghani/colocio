<script lang="ts">
  // @ts-nocheck
  import { onMount } from 'svelte';
  import SectionTitle from '$lib/components/SectionTitle.svelte';
  import AgeCard from '../AgeCard.svelte';
  import CityCard from '../CityCard.svelte';
  import CommonInterestsCard from '../CommonInterestsCard.svelte';
  import FormatsCard from '../FormatsCard.svelte';
  import GenderCard from '../GenderCard.svelte';
  import PlatformsCard from '../PlatformsCard.svelte';
  import PopularDayTimesCard from '../PopularDayTimesCard.svelte';
  import ReachSpendCard from '../ReachSpendCard.svelte';
  import TopPerformers from '../TopPerformers.svelte';
  import { trends_selected_post } from '$lib/stores/insightStore';
  import { getPostReachvsSpendInsightsData } from '$lib/services/NewFacebook/Insights_service';

  // export let type: string = 'ad';
  export let topGenderPost;
  let highestLocation: string | null = null;

  let topPerformingAgeGroup: any = {};
  export let topplatform = '';
  const handlePlatformCalculated = event => {
    console.log(
      'checheckehckehcek++++++++++++++++++++++++++++++++++++',
      event.detail
    );

    topplatform = event.detail.topplatform;
  };
  function handleLocationUpdate(event: CustomEvent<string | null>) {
    highestLocation = event.detail;
  }

  function calculatePerformance(data) {
    const performance = {};

    data.forEach(entry => {
      const { age, impressions, reach, spend } = entry;

      if (!performance[age]) {
        performance[age] = { impressions: 0, reach: 0, spend: 0 };
      }

      performance[age].impressions += parseInt(impressions, 10);
      performance[age].reach += parseInt(reach, 10);
      performance[age].spend += parseFloat(spend);
    });

    const performanceArray = Object.keys(performance).map(age => {
      const { impressions, reach, spend } = performance[age];
      const score = impressions * 0.5 + reach * 0.3 - spend * 0.2;
      return { age, score, impressions, reach, spend };
    });

    performanceArray.sort((a, b) => b.score - a.score);

    return performanceArray[0];
  }

  async function fetchDataPost() {
    try {
      const response = await getPostReachvsSpendInsightsData(
        $trends_selected_post
      );
      topPerformingAgeGroup = calculatePerformance(response);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  }

  let hashtags = ['AmazingCompany', 'AmCoEvents'];
  let title = 'post';
  export let trends_selected;
  let type = 'post';
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

  function testing(value: any): void {
    topGenderPost = value;
  }

  onMount(() => {
    fetchDataPost();
  });
</script>

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
        >Top performing attributes</span
      >
    </div>
    <div class="flex flex-col gap-4 border-t border-gray-200 p-4 md:p-8">
      <div class="flex">
        <p class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]">
          Platforms
        </p>
        <div class="flex flex-col">
          {#if topplatform === 'Facebook'}
            <div class="flex items-center gap-2">
              <img
                src="/icons/facebook.svg"
                class="h-5 w-5"
                alt="facebook icon"
              />
              <span class="text-[14px] font-normal text-[#111827]"
                >Facebook</span
              >
            </div>
          {/if}
          {#if topplatform === 'Instagram'}
            <div class="mt-[6px] flex items-center gap-2">
              <img
                src="/icons/instagram.svg"
                class="h-5 w-5"
                alt="instagram icon"
              />
              <span class="text-[14px] font-normal text-[#111827]"
                >Instagram</span
              >
            </div>
          {/if}
        </div>
      </div>
      <div class="flex items-center">
        <p class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]">
          Text length
        </p>
        <div class="flex flex-col text-[14px] font-normal text-[#111827]">
          30 words
        </div>
      </div>
      <div class="flex items-center">
        <p
          class="min-w-[90px] text-[14px] font-normal text-[#6B7280] sm:min-w-[120px]"
        >
          Hashtags
        </p>
        <div class="flex flex-wrap items-center gap-1">
          {#each hashtags as hashtag}
            <button
              type="button"
              disabled
              class="w-fit rounded-md p-1.5 py-[2px] text-[14px] text-[#111827]"
              style="box-shadow: 0px 1px 3px 0px #00000029;">#{hashtag}</button
            >
          {/each}
        </div>
      </div>
      <div class="flex items-center">
        <p class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]">
          Format
        </p>
        <div class="flex flex-col text-[14px] text-[#111827]">Video</div>
      </div>
      <div class="flex">
        <p class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]">
          Schedule
        </p>
        <div class="flex flex-col gap-[6px] text-[14px] text-[#111827]">
          {#each schedule_tasks as task}
            <div class="flex items-center gap-2">
              <img
                src="/icons/calendar.svg"
                class="h-5 w-5"
                alt="calendar icon"
              />
              <span>{task}</span>
            </div>
          {/each}
        </div>
      </div>
      <div class="flex items-center">
        <p class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]">
          Budget
        </p>
        <div class="flex flex-col text-[14px] text-[#111827]">
          $1 500.00 per day
        </div>
      </div>
      <div class="flex items-center">
        <p class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]">
          Reach
        </p>
        <div class="flex flex-col text-[14px] text-[#111827]">1 500</div>
      </div>
    </div>
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
        >Top performing audience</span
      >
    </div>
    <div class="flex flex-col gap-4 border-t border-gray-200 p-4 md:p-8">
      <div class="flex items-center">
        <p class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]">
          Age
        </p>
        <div class="flex flex-col text-[14px] text-[#111827]">
          {#if topPerformingAgeGroup.age}
            {topPerformingAgeGroup.age}
          {:else}
            Loading...
          {/if}
        </div>
      </div>
      <div class="flex items-center">
        <p class="w-[90px] text-[14px] font-normal text-[#6B7280] sm:w-[120px]">
          Gender
        </p>
        <div class="flex flex-col text-[14px] text-[#111827]">
          {#if topGenderPost}
            {topGenderPost}
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
          {#each interests as interests}
            <button
              type="button"
              disabled
              class="w-fit rounded-md p-1.5 py-[2px] text-[14px] text-[#111827]"
              style="box-shadow: 0px 1px 3px 0px #00000029;">{interests}</button
            >
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
<div
  class="flex flex-1 flex-grow flex-col gap-4 rounded-lg bg-white p-4 shadow-[0px_4px_9px_0px_#00000014] md:p-8"
>
  <h4 class="font-bold text-font_dark">Top performers</h4>
  <!-- {#if topplatform} -->
  <TopPerformers
    {title}
    on:platformCalculated={handlePlatformCalculated}
  />
  <!-- {/if} -->
</div>
<h2 class="text-lg font-semibold text-[#111827]">Attribute breakdown</h2>
<div class="flex flex-col items-stretch gap-5 md:flex-row">
  <div
    class="flex flex-1 flex-grow flex-col justify-between rounded-lg bg-white px-4 py-4 shadow-[0px_4px_9px_0px_#00000014] md:min-h-[400px] md:px-8 md:py-7"
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
    class="flex flex-1 flex-grow flex-col justify-between rounded-lg bg-white px-4 py-4 shadow-[0px_4px_9px_0px_#00000014] md:min-h-[400px] md:px-8 md:py-7"
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
    <PopularDayTimesCard />
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
      <!-- {calculatePerformanceAge} -->
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
        {testing}
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
      <CityCard on:highestLocationUpdate={handleLocationUpdate} />
    </div>
  </div>
</div>
