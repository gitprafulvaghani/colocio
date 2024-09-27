<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import {
    getInsights,
    getPostReachvsSpendInsightsData,
  } from '$lib/services/NewFacebook/Insights_service';
  import {
    trends_selected_ad,
    trends_selected_post,
  } from '$lib/stores/insightStore';

  export let type: string = 'ad';
  export let testing: (value: any) => void;
  export let AdGender: (value: any) => void;
  function ddddddddd(va: any): void {
    // Call the testing function passed from the parent
    testing(va);
  }

  function AdAgetop(va: any): void {
    AdGender(va);
  }
  let idChartAd = 'genderChartAd';
  let idChartPost = 'genderChartPost';
  let topGenderAd: string = '';
  let topGenderPost: string = '';

  // Function to get the date 30 days ago
  function getLast30DaysRange() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    return {
      startDate: startDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      endDate: endDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
    };
  }

  // Function to get gender details for ad insights
  async function GetGenderDetails(): Promise<void> {
    try {
      const { startDate, endDate } = getLast30DaysRange();
      const response = await getInsights(
        $trends_selected_ad,
        startDate,
        endDate
      );
      const { genderCounts, topGender } = processData(response);
      updateChart(genderCounts, idChartAd);
      topGenderAd = topGender;
      AdAgetop(topGenderAd);
    } catch (error) {
      console.error('Error fetching ad gender data:', error);
    }
  }

  // Function to get gender details for post insights
  async function GetGenderPostDetails(): Promise<void> {
    try {
      const { startDate, endDate } = getLast30DaysRange();
      const response = await getPostReachvsSpendInsightsData(
        $trends_selected_post,
        startDate,
        endDate
      );
      const { genderCounts, topGender } = processData(response);
      updateChart(genderCounts, idChartPost);
      topGenderPost = topGender;
      ddddddddd(topGenderPost);
    } catch (error) {
      console.error('Error fetching post gender data:', error);
    }
  }

  // Process gender data to return counts and top performing gender
  function processData(data: any[]): {
    genderCounts: number[];
    topGender: string;
  } {
    let maleReach = 0;
    let femaleReach = 0;
    let otherReach = 0;

    data.forEach((entry: any) => {
      if (entry.gender === 'male') {
        maleReach++;
      } else if (entry.gender === 'female') {
        femaleReach++;
      } else if (entry.gender === 'unknown') {
        otherReach++;
      }
    });

    const genderCounts = [maleReach, femaleReach, otherReach];
    const maxReach = Math.max(...genderCounts);
    let topGender = '';
    if (maxReach === maleReach) {
      topGender = 'Male';
    } else if (maxReach === femaleReach) {
      topGender = 'Female';
    } else if (maxReach === otherReach) {
      topGender = 'Other';
    }

    return { genderCounts, topGender };
  }

  // Function to update chart with gender data
  function updateChart(genderData: number[], chartId: string): void {
    const dataChart = {
      labels: ['Male', 'Female', 'Other'],
      datasets: [
        {
          data: genderData,
          label: 'Genders',
          backgroundColor: ['#589AFF', '#0D64E8', '#0024A4'],
        },
      ],
    };

    const config = {
      type: 'doughnut',
      data: dataChart,
      plugins: [
        {
          beforeInit(chart) {
            const originalFit = chart.legend.fit;
            chart.legend.fit = function fit() {
              originalFit.bind(chart.legend)();
              this.height += 16;
            };
          },
        },
      ],
      options: {
        borderWidth: 0,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            display: true,
            align: 'middle',
            maxWidth: 100,
            labels: {
              boxWidth: 20,
              boxHeight: 20,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                family: 'Inter var',
              },
            },
          },
          title: {
            display: false,
            align: 'start',
            font: {
              family: 'Inter var',
              size: 22,
            },
            text: 'Gender',
          },
        },
      },
    };

    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    if (canvas) {
      new Chart(canvas, config);
    } else {
      console.error(`Canvas element with id ${chartId} not found.`);
    }
  }

  onMount(() => {
    if ($trends_selected_ad === 'ad_insights') {
      GetGenderDetails();
    } else if ($trends_selected_post === 'post_insights') {
      GetGenderPostDetails();
    }
  });
</script>

<div class="h-full">
  {#if $trends_selected_ad === 'ad_insights'}
    <canvas
      class="max-h-[180px]"
      id={idChartAd}
    />
    {#if topGenderAd}
      <div>Top Performing Gender: {topGenderAd}</div>
    {/if}
  {:else if $trends_selected_post === 'post_insights'}
    <canvas
      class="max-h-[180px]"
      id={idChartPost}
    />
  {:else}
    <div class="my-auto flex h-full items-center justify-center">
      No Data Found For Graph
    </div>
  {/if}
</div>
