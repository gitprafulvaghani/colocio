<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { GrowthRateInsightsData } from "$lib/services/NewFacebook/Insights_service";

  let chart: Chart | null = null;
  let growthDataThisWeek: number[] = [];
  let growthDataLastWeek: number[] = [];

  async function fetchdataGrowth(): Promise<void> {
    try {
      const response = await GrowthRateInsightsData();
      console.log("growth data check +++++++++++", response);

      // Check the structure of the response
      if (Array.isArray(response) && response.length > 0) {
        const data = response[0]; // Assuming we're interested in the first object in the array

        // Example of how you might extract and parse data (adjust based on actual needs)
        const impressions = parseInt(data.impressions, 10) || 0; // Convert to number
        const spend = parseInt(data.spend, 10) || 0; // Convert to number

        // Dummy data for illustration; adjust according to real data structure
        growthDataThisWeek = [impressions]; // Replace with actual data extraction
        growthDataLastWeek = [spend]; // Replace with actual data extraction

        // Update chart with new data
        if (chart) {
          chart.data.datasets[0].data = growthDataThisWeek;
          chart.data.datasets[1].data = growthDataLastWeek;
          chart.update();
        }
      } else {
        console.error("Unexpected data format:", response);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  }

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "This week",
        data: growthDataThisWeek,
        borderColor: "#0D64E8",
        backgroundColor: "#0D64E8",
        fill: false,
        tension: 0.1,
        pointRadius: 6,
      },
      {
        label: "Previous week",
        data: growthDataLastWeek,
        fill: false,
        borderColor: "#9FB8DE",
        backgroundColor: "#9FB8DE",
        tension: 0.1,
        pointRadius: 6,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    plugins: [
      {
        beforeInit(chart) {
          // Get a reference to the original fit function
          const originalFit = chart.legend.fit;
          // Override the fit function
          chart.legend.fit = function fit() {
            // Call the original function and bind scope in order to use `this` correctly inside it
            originalFit.bind(chart.legend)();
            // Change the height as suggested in other answers
            this.height += 16;
          };
        },
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          display: true,
          align: "start",
          labels: {
            boxWidth: 20,
            boxHeight: 20,
            usePointStyle: true,
            pointStyle: "circle",
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

  function updateChart(thisWeekData: number[], previousWeekData: number[]) {
    const config = generateChartConfig(thisWeekData, previousWeekData);

    const canvas = document.getElementById(
      "followersGrowthChart"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    if (chart) chart.destroy();
    chart = new Chart(canvas, config);
  }

  onMount(() => {
    const canvas = document.getElementById(
      "followersGrowthChart"
    ) as HTMLCanvasElement;
    if (!canvas) return;
    chart = new Chart(canvas, config);

    // Fetch the data after the chart is initialized
    fetchdataGrowth();
  });

  onMount(() => {
    fetchdataGrowth();
  });
</script>

<div
  class="my-4 grid max-h-[270px] min-h-[200px] grid-cols-1 justify-between gap-[30px] rounded-lg bg-white p-4 shadow md:grid-cols-2 lg:grid-cols-3"
>
  <div class="col-span-1 flex flex-col gap-2">
    <h4
      class="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-font_dark"
    >
      Follower growth rate
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
    <div class="flex items-end gap-2">
      <span class="mb-1 text-3xl font-bold leading-7 text-blue-primary"
        >120</span
      >
      <span class="mb-1 text-sm text-gray-500">Weekly avg. 140</span>
      <span
        class="ml-10 flex items-center gap-[2px] rounded-full bg-[#FFEEED] px-2.5 py-[2px] text-sm font-medium text-[#FF4040]"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.6668 7.00016L12.4918 5.82516L7.8335 10.4752V0.333496H6.16683V10.4752L1.51683 5.81683L0.333496 7.00016L7.00016 13.6668L13.6668 7.00016Z"
            fill="#FF4040"
          />
        </svg>
        10%
      </span>
    </div>
  </div>
  <div class="col-span-2 h-full">
    <canvas id="followersGrowthChart" />
  </div>
</div>

<style>
  .h-full {
    height: 100%;
  }
</style>
