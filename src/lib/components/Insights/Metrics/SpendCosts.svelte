<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let idChart = "spendChart";
  export let averageSpend = 0;
  export let dailySpend = 0;
  export let averageCPC = 0;
  export let averageCPM = 0;
  export let weeklySpend;

  function generateRandomData() {
    let data = [];
    for (let i = 0; i < 1; i++) {
      data.push(Math.random() * 1000);
    }
    return data;
  }

  const dataChart = {
    labels: ["Amount"],
    datasets: [
      {
        data: [weeklySpend],
        label: "Spent this week",
        borderColor: "#0D64E8",
        backgroundColor: "#0D64E8",
        borderRadius: 4,
        fill: true,
      },
      {
        data: [1500],
        label: "Expected this month",
        borderColor: "#E9EFF8",
        backgroundColor: "#E9EFF8",
        borderRadius: 4,
        fill: true,
      },
    ],
  };
  const config = {
    type: "bar",
    data: dataChart,
    options: {
      indexAxis: "y",
      scales: {
        x: {
          grid: { display: true },
          ticks: {
            stepSize: 500,
            callback: function (value, index, ticks) {
              return "$" + value;
            },
          },
        },
        y: {
          grid: {
            display: true,
          },
          stacked: true,
          ticks: {
            display: false,
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

  onMount(() => {
    const canvas = document.getElementById(idChart) as HTMLCanvasElement;
    if (!canvas) return;
    const chart = new Chart(canvas, config);
  });
</script>

<div class="grid lg:grid-cols-3 gap-4">
  <div
    class="col-span-2 flex flex-col gap-6 bg-white rounded-[10px] shadow-[0px_4px_9px_0px_#00000014] sm:p-[28px_30px] p-[20px_16px]"
  >
    <h4
      class="text-font_dark text-[18px] font-semibold flex items-center gap-2 whitespace-nowrap border-b-[#E5E7EB] border-b-[1px] pb-[24px]"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 12H14.51M1 3V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5L3 5C1.89543 5 1 4.10457 1 3ZM1 3C1 1.89543 1.89543 1 3 1H15M15 12C15 12.2761 14.7761 12.5 14.5 12.5C14.2239 12.5 14 12.2761 14 12C14 11.7239 14.2239 11.5 14.5 11.5C14.7761 11.5 15 11.7239 15 12Z"
          stroke="#0D64E8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Spend
    </h4>
    <div class="flex sm:flex-row flex-col gap-4 justify-around">
      <div class="flex flex-col gap-1">
        <span class="text-font_dark text-sm font-medium">Spent this month</span>
        <span
          class="text-[#0D64E8] sm:text-[28px] text-[20px] leading-7 font-bold"
        >
          ${averageSpend.toFixed(2)}</span
        >
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-font_dark text-sm font-medium"
          >Expected spend this month</span
        >
        <span class="text-[#9FB8DE] text-3xl leading-7 font-bold"
          >$1 500.00</span
        >
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-font_dark text-sm font-medium">Daily spend</span>
        <span
          class="text-[#0D64E8] sm:text-[28px] text-[20px] leading-7 font-bold"
          >${dailySpend.toFixed(2)}</span
        >
      </div>
    </div>
    <div>
      <canvas id={idChart} class="h-[71px]" />
    </div>
  </div>
  <div class="lg:col-span-1 col-span-2 flex flex-col bg-white rounded-[10px]">
    <div class="flex py-5 sm:px-8 px-4">
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <span class="text-font_dark text-sm font-medium"
            >Cost per click (CPC)</span
          >
          <img src="icons/info.svg" alt="icon info" class="w-4 h-4" />
        </div>
        <div class="xl:text-3xl text-[24px] font-bold text-[#0D64E8]">
          {averageCPC.toFixed(4)}
        </div>
      </div>
      <div class="flex flex-1 justify-end items-end">
        <span
          class="bg-[#F9FAFB] text-[#6B7280] text-sm me-2 px-2.5 py-1 rounded-full "
          >OK</span
        >
      </div>
    </div>
    <div class="flex py-5 sm:px-8 px-4 border-t border-gray-200">
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <span class="text-font_dark text-sm">Cost per mille (CPM)</span>
          <img src="icons/info.svg" alt="icon info" class="w-4 h-4" />
        </div>
        <div class="xl:text-3xl text-[24px] font-bold text-[#0D64E8]">
          ${averageCPM.toFixed(2)}
        </div>
      </div>
      <div class="flex flex-1 justify-end items-end">
        <span
          class="bg-[#F9FAFB] text-[#6B7280] text-sm me-2 px-2.5 py-1 rounded-full "
          >OK</span
        >
      </div>
    </div>
    <div class="flex py-5 sm:px-8 px-4 border-t border-gray-200">
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <span class="text-font_dark text-sm">Return on ad spend (ROAS)</span>
          <img src="icons/info.svg" alt="icon info" class="w-4 h-4" />
        </div>
        <div class="xl:text-3xl text-[24px] font-bold text-[#0D64E8]">100%</div>
      </div>
      <div class="flex flex-1 justify-end items-end">
        <span
          class="bg-[#F9FAFB] text-[#6B7280] text-sm me-2 px-2.5 py-1 rounded-full "
          >OK</span
        >
      </div>
    </div>
  </div>
</div>
