<script lang="ts">
  import { timePeriod } from "./../../../stores/insightStore.ts";
  import { onMount, afterUpdate } from "svelte";
  import Chart from "chart.js/auto";
  import CostIndicator from "./CostIndicator.svelte";

  export let averageCTR = 0;
  export let impressionData: any;
  export let reachData: any;
  export let currentaverageReach = 0;
  export let currentaverageImpression = 0;
  export let differenceReach = 0;
  export let differenceImpression = 0;
  export let totalImpression = 0;
  export let totalReach = 0;

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let idChart = "reachChart";
  let chartInstance: any;

  $: data.datasets[0].data = impressionData || [];
  $: data.datasets[1].data = reachData || [];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Impressions",
        data: [],
        borderColor: "#0024A4",
        backgroundColor: "#0024A4",
        fill: false,
        tension: 0.1,
        pointRadius: 6,
      },
      {
        label: "Reach",
        data: [],
        fill: false,
        borderColor: "#0D64E8",
        backgroundColor: "#0D64E8",
        tension: 0.1,
        pointRadius: 6,
      },
    ],
  };

  const config: any = {
    type: "line",
    data: data,
    options: {
      scales: {
        y: {
          ticks: {
            stepSize: 200,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: false,
        },
      },
    },
  };

  onMount(() => {
    const canvas = document.getElementById(idChart) as HTMLCanvasElement;
    if (!canvas) return;
    chartInstance = new Chart(canvas, config);
  });

  afterUpdate(() => {
    chartInstance.data.datasets[0].data = impressionData;
    chartInstance.data.datasets[1].data = reachData;
    chartInstance.update();
  });
</script>

<div class="pt-4">
  <div class="flex gap-[1px] items-center justify-end mb-4">
    <button
      class={`p-[11.5px_14px] ${
        $timePeriod === "7days" ? "text-[#0D64E8]" : "text-[#111827]"
      } text-[#0D64E8] text-[14px] font-semibold`}
      on:click={() => timePeriod.set("7days")}
      >7 days
    </button>
    <button
      class={`p-[11.5px_14px] ${
        $timePeriod === "30days" ? "text-[#0D64E8]" : "text-[#111827]"
      } text-[14px] font-medium`}
      on:click={() => timePeriod.set("30days")}
      >30 days
    </button>
    <button
      class={`p-[11.5px_14px] ${
        $timePeriod === "6months" ? "text-[#0D64E8]" : "text-[#111827]"
      } text-[14px] font-medium`}
      on:click={() => timePeriod.set("6months")}
      >6 months
    </button>
    <button
      class={`p-[11.5px_14px] ${
        $timePeriod === "1year" ? "text-[#0D64E8]" : "text-[#111827]"
      } text-[14px] font-medium`}
      on:click={() => timePeriod.set("1year")}
    >
      1 year
    </button>
  </div>

  <div class="mb-4">
    <h2 class="text-[#111827] text-[14px] font-semibold">Reach</h2>
    <p class="text-[#6B7280] text-[14px] font-normal">
      “Reach” is the total number of unique viewers exposed to your content,
      while "impressions" count how many time each viewer has seen the content.
      The effectiveness of your targeting is also measured in the amount of
      clicks relative to Impressions and your audience’s Satisfaction Score.
    </p>
  </div>
  <div class="grid lg:grid-cols-3 gap-4">
    <div
      class="col-span-2 flex flex-col gap-6 bg-white rounded-lg shadow-[0px_4px_9px_0px_#00000014] p-[18px]"
    >
      <div class="flex md:flex-row flex-col gap-[20px] justify-around">
        <div class="flex flex-col gap-2">
          <h4
            class="text-font_dark text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
          >
            Reach
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.5 2C5.35786 2 2 5.35786 2 9.5C2 13.6421 5.35786 17 9.5 17C13.6421 17 17 13.6421 17 9.5C17 5.35786 13.6421 2 9.5 2ZM3.14319 9.5C3.14319 5.98923 5.98923 3.14319 9.5 3.14319C13.0108 3.14319 15.8568 5.98923 15.8568 9.5C15.8568 13.0108 13.0108 15.8568 9.5 15.8568C5.98923 15.8568 3.14319 13.0108 3.14319 9.5ZM10.0716 9.5C10.0716 9.18432 9.81568 8.92841 9.5 8.92841C9.18432 8.92841 8.92841 9.18432 8.92841 9.5V12.2714C8.92841 12.587 9.18432 12.843 9.5 12.843C9.81568 12.843 10.0716 12.587 10.0716 12.2714V9.5ZM8.80716 7.42148C8.80716 7.03883 9.11735 6.72864 9.5 6.72864C9.88265 6.72864 10.1928 7.03883 10.1928 7.42148C10.1928 7.80412 9.88265 8.11432 9.5 8.11432C9.11735 8.11432 8.80716 7.80412 8.80716 7.42148Z"
                fill="#4B5563"
              />
            </svg>
          </h4>
          <div class="flex sm:items-end items-start gap-2 sm:flex-row flex-col">
            <span class="text-[#0D64E8] text-3xl leading-7 font-bold mb-1"
              >{totalReach}</span
            >
            <span class="text-gray-500 text-sm font-normal mb-1"
              >Weekly avg. {currentaverageReach.toFixed(2)}</span
            >
            <CostIndicator value={differenceReach} />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h4
            class="text-font_dark text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
          >
            Impressions
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.5 2C5.35786 2 2 5.35786 2 9.5C2 13.6421 5.35786 17 9.5 17C13.6421 17 17 13.6421 17 9.5C17 5.35786 13.6421 2 9.5 2ZM3.14319 9.5C3.14319 5.98923 5.98923 3.14319 9.5 3.14319C13.0108 3.14319 15.8568 5.98923 15.8568 9.5C15.8568 13.0108 13.0108 15.8568 9.5 15.8568C5.98923 15.8568 3.14319 13.0108 3.14319 9.5ZM10.0716 9.5C10.0716 9.18432 9.81568 8.92841 9.5 8.92841C9.18432 8.92841 8.92841 9.18432 8.92841 9.5V12.2714C8.92841 12.587 9.18432 12.843 9.5 12.843C9.81568 12.843 10.0716 12.587 10.0716 12.2714V9.5ZM8.80716 7.42148C8.80716 7.03883 9.11735 6.72864 9.5 6.72864C9.88265 6.72864 10.1928 7.03883 10.1928 7.42148C10.1928 7.80412 9.88265 8.11432 9.5 8.11432C9.11735 8.11432 8.80716 7.80412 8.80716 7.42148Z"
                fill="#4B5563"
              />
            </svg>
          </h4>
          <div class="flex sm:items-end items-start gap-2 sm:flex-row flex-col">
            <span class="text-[#0024A4] text-3xl leading-7 font-bold mb-1"
              >{totalImpression}</span
            >
            <span class="text-gray-500 text-sm mb-1"
              >Weekly avg. {currentaverageImpression.toFixed(2)}</span
            >
            <CostIndicator value={differenceImpression} />
          </div>
        </div>
      </div>
      <div>
        <canvas id={idChart} />
      </div>
    </div>
    <div class="lg:col-span-1 col-span-2 flex flex-col bg-white rounded-lg">
      <div class="px-8 py-[36px]">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-1">
            <span class="text-font_dark text-sm font-medium"
              >Click through rate (CTR)</span
            >
            <img src="icons/info.svg" alt="icon info" class="w-4 h-4" />
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-3xl font-semibold text-[#0D64E8]">
            ${averageCTR.toFixed(2)}
          </div>
          <span
            class="bg-green-100 text-green-600 text-sm font-normal me-2 px-2.5 py-1 rounded-full "
            >Good</span
          >
        </div>
      </div>
      <div class="py-[36px] px-8 border-t border-gray-200">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-1">
            <span class="text-font_dark text-sm">Satisfaction score</span>
            <img src="icons/info.svg" alt="icon info" class="w-4 h-4" />
          </div>
        </div>
        <div class="flex flex-1 justify-between items-center">
          <div class="text-3xl font-semibold text-[#0D64E8]">75</div>
          <span
            class="bg-[#F9FAFB] text-[#6B7280] text-sm font-normal me-2 px-2.5 py-1 rounded-full "
            >OK</span
          >
        </div>
      </div>
    </div>
  </div>
</div>
