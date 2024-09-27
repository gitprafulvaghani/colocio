<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import {
    trends_selected_ad,
    trends_selected_post,
  } from "$lib/stores/insightStore";
  import {
    getInsights,
    getPostReachvsSpendInsightsData,
  } from "../../services/NewFacebook/Insights_service";

  let idChart = "reachspendchart";
  let chart: Chart | null = null;

  async function fetchData(): Promise<void> {
    try {
      const response = await getInsights($trends_selected_ad);
      const data = response.map((item: any) => ({
        reach: item.reach,
        spend: item.spend,
      }));

      updateChart(data);
    } catch (error: any) {
      console.error("Error fetching ad data:", error);
    }
  }

  async function fetchDataPost(): Promise<void> {
    try {
      const response = await getPostReachvsSpendInsightsData();
      const data = response.map((item: any) => ({
        reach: item.reach,
        spend: item.spend,
      }));

      updateChart(data);
    } catch (error: any) {
      console.error("Error fetching post data:", error);
    }
  }

  function generateChartConfig(data: any) {
    const labels = data.map((_: any, index: number) => `$${index + 1}`);
    const reachData = data.map((item: { reach: any }) => item.reach);
    const spendData = data.map((item: { spend: any }) => item.spend);

    return {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data: reachData,
            label: "Reach",
            backgroundColor: "#589AFF",
            borderRadius: 4,
            fill: true,
            yAxisID: "y",
          },
          {
            data: spendData,
            label: "Spend",
            backgroundColor: "#0024a4",
            borderRadius: 4,
            fill: true,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        scales: {
          x: { grid: { display: true } },
          y: {
            grid: { display: true },
            ticks: {
              stepSize: 200,
              callback: function (value: any) {
                return Math.round(value / 200) + "k";
              },
            },
          },
          y1: {
            position: "right",
            grid: { display: false },
            ticks: {
              stepSize: 50,
              callback: function (value: any) {
                return "$" + value;
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            align: "start",
            labels: {
              boxWidth: 16,
              boxHeight: 16,
              useBorderRadius: true,
              borderRadius: 8,
              font: {
                family: "Inter var",
              },
            },
          },
          title: {
            display: false,
          },
        },
      },
    };
  }

  function updateChart(data: any) {
    const config = generateChartConfig(data);

    const canvas = document.getElementById(idChart) as HTMLCanvasElement;
    if (!canvas) return;

    if (chart) chart.destroy();
    chart = new Chart(canvas, config);
  }

  onMount(() => {
    if ($trends_selected_ad === "ad_insights") {
      fetchData();
    } else if ($trends_selected_post === "post_insights") {
      fetchDataPost();
    }
  });
</script>

<div class="h-full">
  {#if $trends_selected_ad === "ad_insights"}
    <canvas id={idChart} />
  {:else if $trends_selected_post === "post_insights"}
    <canvas id={idChart} />
  {:else}
    <div class="my-auto flex h-full items-center justify-center">
      No Data Found For Graph
    </div>
  {/if}
</div>

<style>
  .h-full {
    height: 100%;
  }
</style>
