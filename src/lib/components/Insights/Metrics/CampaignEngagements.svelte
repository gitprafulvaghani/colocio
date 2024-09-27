<script lang="ts">
  import Doughnut from '$lib/components/charts/Doughnut.svelte';
  import { onMount } from 'svelte';
  import type {
    LikesSummary,
    CommentsSummary,
    ReelViewsSummary,
    SharesSummary,
  } from '../../../services/interface/matric';
  import {
    fetchFacebookData,
    fetchInstagramData,
    fetch_Priview_FacebookData,
  } from '../../../services/NewFacebook/Insights_service';
  import { timePeriod } from '$lib/stores/insightStore';
  import {
    dataChartComments,
    dataChartFacebook,
    dataChartLikes,
    dataChartReelViews,
    dataChartShares,
    valuesArray,
  } from '../../../stores/charts_store';
  import Loader from '$lib/components/Loader.svelte';
  import { writable } from 'svelte/store';

  let totalLikes = 120;
  let facebookReactions = {
    likes: 50,
    heart: 0,
    angry: 0,
  };
  let totalComments = 30;
  let totalShares = 30;
  let totalReelViews = 200;
  let isLoading = false;
  const labelsPlatforms = ['Facebook', 'Instagram', 'X', 'Tiktok'];

  let Reaction_average = 0;
  let Comments_average = 0;
  let Like_average = 0;
  let Share_average = 0;
  let ReelViews_average = 0;
  let averageShares = 0;

  let likesSummary: LikesSummary;
  let commentsSummary: CommentsSummary;
  let sharesSummary: SharesSummary;
  let reelViewsSummary: ReelViewsSummary;

  const fbAccessToken: string =
    'EAATyloueTgYBO7HZAEjrUB0ubzhYpcX61XZCuj5PTEucmGocOq5NV96ZCVZCyASSPDr5WjwwJDByFl0eWc8USm0sLwcxSSBRbFYrWutlxi173ZBVMRcR38YQ8u5la3ZB1wWmwalClnEqErFcrgBY9tJXlUPGDsQpHQY0gCyarsi8SNrAPlddYFYH6rRPXZBLdVYQPAeEBjqBdAdU0MZD';
  const fbPageId: string = '125759393944715';

  const igAccessToken: string = 'YOUR_IG_ACCESS_TOKEN';
  const igPageId: string = 'YOUR_IG_PAGE_ID';
  let percentageDifferenceLikes = 0;
  let percentageDifferenceComments = 0;
  let percentageDifferenceShares = 0;
  let percentageDifferenceReactions = 0;
  let percentageDifferenceReels = 0;

  export const previewAverages = writable({
    likes: 0,
    comments: 0,
    shares: 0,
    reactions: 0,
    reels: 0,
  });

  async function fetchDetails() {
    const fbData = await fetchFacebookData(
      fbAccessToken,
      fbPageId,
      $timePeriod
    );

    isLoading = false;
    likesSummary = {
      facebook: fbData.likesSummary.facebook,
      instagram: 0,
      //  instagram: fbData.likesSummary.instagram + igData.likesSummary.instagram
    };

    commentsSummary = {
      facebook: fbData.commentsSummary.facebook,
      instagram: 0,
      //  instagram: fbData.commentsSummary.instagram + igData.commentsSummary.instagram
    };

    sharesSummary = {
      facebook: fbData.sharesSummary.facebook,
      instagram: 0,
      //  instagram: fbData.sharesSummary.instagram + igData.sharesSummary.instagram
    };

    reelViewsSummary = {
      facebook: 0,
      instagram: 0,
      //  instagram: igData.reelViewsSummary.instagram
    };

    // comment
    dataChartComments.update(data => {
      data.datasets[0].data = [
        commentsSummary.facebook,
        commentsSummary.instagram,
        0,
        0,
      ];
      return data;
    });
    Comments_average = Number(
      calculate_Avarage($dataChartComments.datasets[0].data)
    );

    dataChartLikes.update(data => {
      data.datasets[0].data = [
        likesSummary.facebook,
        likesSummary.instagram,
        0,
        0,
      ];
      return data;
    });

    Like_average = Number(
      calculate_Avarage($dataChartComments.datasets[0].data)
    );
    // share chart
    dataChartShares.update(data => {
      data.datasets[0].data = [
        sharesSummary.facebook,
        sharesSummary.instagram,
        0,
        0,
      ];
      return data;
    });
    Share_average = Number(
      calculate_Avarage($dataChartShares.datasets[0].data)
    );
    //real views
    dataChartReelViews.update(data => {
      data.datasets[0].data = [
        reelViewsSummary.facebook,
        reelViewsSummary.instagram,
      ];
      return data;
    });

    ReelViews_average = Number(
      calculate_Avarage([reelViewsSummary.facebook, reelViewsSummary.instagram])
    );
    // reaction
    const values = Object.values(fbData.reactionsSummary);
    console.log();

    valuesArray.set(values);
    dataChartFacebook.update(data => {
      data.datasets[0].data = values;
      return data;
    });
    Reaction_average = Number(calculate_Avarage(values));
    isLoading = true;
  }

  function calculate_Avarage(Arry: any) {
    const sum = Arry.reduce((acc: any, value: any) => acc + value, 0);
    const average = sum / Arry.length;
    return parseFloat(average.toFixed(2));
  }

  function calculatePercentageDifference(oldValue, newValue) {
    if (oldValue === 0) return 100;
    return ((oldValue - newValue) / oldValue) * 100;
  }

  async function fetch_perView_Data() {
    const response = await fetch_Priview_FacebookData(
      fbAccessToken,
      fbPageId,
      $timePeriod
    );
    const like = [response.likesSummary.facebook, 0, 0, 0];
    const comment = [response.commentsSummary.facebook, 0, 0, 0];
    const share = [response.sharesSummary.facebook, 0, 0, 0];
    const reaction = [
      response.reactionsSummary.angry,
      response.reactionsSummary.care,
      response.reactionsSummary.haha,
      response.reactionsSummary.love,
      response.reactionsSummary.like,
      response.reactionsSummary.sad,
      response.reactionsSummary.wow,
    ];
    const reel = [response.reelViewsSummary.facebook, 0, 0, 0];

    const averageLikes = calculate_Avarage(like);
    const averageComments = calculate_Avarage(comment);
    const averageShares = calculate_Avarage(share);
    const averageReactions = calculate_Avarage(reaction);
    const averageReels = calculate_Avarage(reel);

    let previousAverages;
    previewAverages.subscribe(value => (previousAverages = value));

    // Calculate percentage differences
    percentageDifferenceLikes = calculatePercentageDifference(
      averageLikes,
      Like_average
    );
    percentageDifferenceComments = calculatePercentageDifference(
      averageComments,
      Comments_average
    );
    percentageDifferenceShares = calculatePercentageDifference(
      averageShares,
      Share_average
    );
    percentageDifferenceReactions = calculatePercentageDifference(
      averageReactions,
      Reaction_average
    );
    percentageDifferenceReels = calculatePercentageDifference(
      averageReels,
      ReelViews_average
    );
  }

  $: $timePeriod, fetchDetails();
  $: $timePeriod, fetch_perView_Data();
  onMount(() => {
    fetchDetails();
    fetch_perView_Data();
  });
</script>

<div>
  <div>
    <h3 class="mt-4 text-lg font-semibold text-font_dark">
      Campaign Engagements
    </h3>
    <p class="mb-[16px] text-[14px] font-normal text-[#6B7280]">
      Refers to the interactions that your audience has with your posts and ads.
      It encompasses a range of actions that includ likes, shares, comments,
      clicks, follows, and more, depending on the platform.
    </p>
  </div>
  {#if isLoading}
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        class="col-span-1 flex min-h-[200px] flex-grow flex-col justify-between gap-4 rounded-lg bg-white p-8 shadow"
      >
        <div class="flex flex-1 flex-col gap-2 sm:grid-cols-2">
          <h4
            class="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-font_dark"
          >
            Likes
          </h4>
          <div class="flex items-end justify-between gap-2">
            <div class="flex items-end gap-[6px]">
              <span class="mb-1 text-3xl font-bold leading-7 text-[#0D64E8]"
                >{Like_average}</span
              >
              <span class="tfacebookReactionsext-sm mb-1 text-gray-500"
                >Avg. 140</span
              >
            </div>
            <span
              class="flex items-center gap-1 rounded-full bg-[#E4FDEA] px-2 py-[2px] text-sm font-normal text-[#02AB46]"
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
              {percentageDifferenceLikes.toFixed(2)}%
            </span>
          </div>
        </div>
        <hr class="h-[1px] bg-[#E5E7EB]" />
        {#if likesSummary != undefined}
          <div class="">
            <Doughnut
              idChart="likesChart"
              dataChart={$dataChartLikes}
              useHtmlLegend={true}
            />
          </div>
        {/if}
      </div>
      <div
        class="col-span-1 flex min-h-[200px] flex-grow flex-col justify-between gap-4 rounded-lg bg-white p-8 shadow"
      >
        <div class="flex flex-1 flex-col gap-2">
          <h4
            class="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-font_dark"
          >
            Facebook reactions
          </h4>
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-end gap-[6px]">
              <span class="mb-1 text-3xl font-bold leading-7 text-[#0D64E8]"
                >{Reaction_average}</span
              >
              <span class="mb-1 text-sm text-gray-500">Avg. 45</span>
            </div>
            <span
              class="ml-10 flex items-center gap-1 rounded-full bg-[#E4FDEA] px-2 py-[2px] text-sm font-normal text-[#02AB46]"
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
              {percentageDifferenceReactions.toFixed(2)}%
            </span>
          </div>
        </div>
        <hr class="h-[1px] bg-gray-200" />
        {#if likesSummary != undefined}
          <div class="">
            <Doughnut
              idChart="fbChart"
              dataChart={$dataChartFacebook}
              useHtmlLegend={true}
            />
          </div>
        {/if}
      </div>
      <div
        class="col-span-1 flex min-h-[200px] flex-grow flex-col justify-between gap-4 rounded-lg bg-white p-8 shadow"
      >
        <div class="flex flex-1 flex-col gap-2">
          <h4
            class="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-font_dark"
          >
            Comments/Replies
          </h4>
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-end gap-[6px]">
              <span class="mb-1 text-3xl font-bold leading-7 text-[#0D64E8]"
                >{Comments_average}</span
              >
              <span class="mb-1 text-sm text-gray-500">Avg. 27</span>
            </div>
            <span
              class="ml-10 flex items-center gap-1 rounded-full bg-[#E4FDEA] px-2 py-[2px] text-sm font-normal text-[#02AB46]"
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
              {percentageDifferenceComments.toFixed(2)}%
            </span>
          </div>
        </div>
        <hr class="h-[1px] bg-gray-200" />
        {#if commentsSummary != undefined}
          <div class="">
            <Doughnut
              idChart="commentsChart"
              dataChart={$dataChartComments}
              useHtmlLegend={true}
            />
          </div>
        {/if}
      </div>
      <div
        class="col-span-1 flex min-h-[200px] flex-grow flex-col justify-between gap-4 rounded-lg bg-white px-8 py-4 shadow"
      >
        <div class="flex flex-1 flex-col gap-2">
          <h4
            class="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-font_dark"
          >
            Shares/Reposts
          </h4>
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-end gap-[6px]">
              <span class="mb-1 text-3xl font-bold leading-7 text-[#0D64E8]"
                >{Share_average}</span
              >
              <span class="mb-1 text-sm text-gray-500">Avg. 27</span>
            </div>
            <span
              class="ml-10 flex items-center gap-1 rounded-full bg-[#E4FDEA] px-2 py-[2px] text-sm font-normal text-[#02AB46]"
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
              {percentageDifferenceShares.toFixed(2)}%
            </span>
          </div>
        </div>
        <hr class="h-[1px] bg-gray-200" />
        {#if sharesSummary != undefined}
          <div class="">
            <Doughnut
              idChart="sharesChart"
              dataChart={$dataChartShares}
              useHtmlLegend={true}
            />
          </div>
        {/if}
      </div>
      <div
        class="col-span-1 flex min-h-[200px] flex-grow flex-col justify-between gap-4 rounded-lg bg-white px-8 py-4 shadow"
      >
        <div class="flex flex-1 flex-col gap-2">
          <h4
            class="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-font_dark"
          >
            Reel views
          </h4>
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-end gap-[6px]">
              <span class="mb-1 text-3xl font-bold leading-7 text-[#0D64E8]"
                >{ReelViews_average}</span
              >
              <span class="mb-1 text-sm text-gray-500">Avg. 180</span>
            </div>
            <span
              class="ml-10 flex items-center gap-1 rounded-full bg-[#E4FDEA] px-2 py-[2px] text-sm font-normal text-[#02AB46]"
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
              {percentageDifferenceReels.toFixed(2)}%
            </span>
          </div>
        </div>
        <hr class="h-[1px] bg-gray-200" />
        {#if reelViewsSummary != undefined}
          <div class="">
            <Doughnut
              idChart="reelViewsChart"
              dataChart={$dataChartReelViews}
              useHtmlLegend={true}
            />
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <Loader />
  {/if}
</div>
