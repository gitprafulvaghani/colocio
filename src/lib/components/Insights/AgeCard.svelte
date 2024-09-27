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

  let trends_selected: any = 'ad_insights';
  export let type: String;

  async function GetAgeDetails(): Promise<void> {
    try {
      const response = await getInsights($trends_selected_ad);

      const ageData = processData(response);
      console.log('ad age data++++++++', ageData);

      updateChart(ageData);
    } catch (error) {
      console.error('Error fetching age data:', error);
    }
  }

  function processData(data): Record<string, number> {
    let age1 = 0;
    let age2 = 0;
    let age3 = 0;
    let age4 = 0;
    let age5 = 0;
    let age6 = 0;
    let age7 = 0;
    data.forEach((entry: any) => {
      if (entry.age === '0-18') {
        age1++;
      } else if (entry.age === '18-25') {
        age2++;
      } else if (entry.age === '25-34') {
        age3++;
      } else if (entry.age === '35-44') {
        age4++;
      } else if (entry.age === '45-54') {
        age5++;
      } else if (entry.age === '55-64') {
        age6++;
      } else if (entry.age === '65+') {
        age7++;
      }
    });
    return {
      '0-18': age1,
      '18-25': age2,
      '25-34': age3,
      '35-44': age4,
      '45-54': age5,
      '55-64': age6,
      '65+': age7,
    };
  }

  async function fetchDataPost(): Promise<void> {
    try {
      const response = await getPostReachvsSpendInsightsData(
        $trends_selected_post
      );
      const postData = processData(response);
      updatePostChart(postData);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  }

  function updateChart(ageData: Record<string, number>): void {
    if (!ageData) return;

    // Update dataChart with fetched data
    dataChart.datasets[0].data = Object.values(ageData);

    const canvas = document.getElementById(idChart) as HTMLCanvasElement;
    if (!canvas) return;
    new Chart(canvas, config);
  }

  function updatePostChart(postData: Record<string, number>): void {
    if (!postData) return;

    // Update datapostChart with fetched data
    datapostChart.datasets[0].data = Object.values(postData);

    const canvas = document.getElementById(idChartpost) as HTMLCanvasElement;
    if (!canvas) return;
    new Chart(canvas, postconfig);
  }

  let idChart = 'ageChart';
  let idChartpost = 'ageChartPost'; // Changed ID to avoid conflicts

  const dataChart = {
    labels: ['0-18', '18-25', '25-34', '35-44', '45-54', '55-64', '65+'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0], // Initial placeholder values
        label: 'Age Groups',
        backgroundColor: '#589AFF',
        borderRadius: 4,
        fill: true,
      },
    ],
  };

  const datapostChart = {
    labels: ['0-18', '18-25', '25-34', '35-44', '45-54', '55-64', '65+'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0], // Initial placeholder values
        label: 'Age Groups',
        backgroundColor: '#589AFF',
        borderRadius: 4,
        fill: true,
      },
    ],
  };

  const config = {
    type: 'bar',
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
      scales: {
        x: { grid: { display: true } },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: true,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    },
  };

  const postconfig = {
    type: 'bar',
    data: datapostChart,
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
      scales: {
        x: { grid: { display: true } },
        y: {
          ticks: { display: false },
          grid: { display: true },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false },
      },
    },
  };

  onMount(() => {
    GetAgeDetails();
    fetchDataPost();
  });
</script>

<div class="h-full">
  {#if $trends_selected_ad === 'ad_insights'}
    <canvas id={idChart} />
  {:else if $trends_selected_post === 'post_insights'}
    <canvas id={idChartpost} />
  {:else}
    <div class="my-auto flex h-full items-center justify-center">
      No Data Found For Graph
    </div>
  {/if}
</div>
