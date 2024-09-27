<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { getHourlyBreakDown } from "../../services/NewFacebook/Insights_service";

  let idChart = "popularDayTimesChart";
  export let week: any;

  function generateRandomData() {
    let data = [];
    for (let i = 0; i < 7; i++) {
      data.push(Math.random() * 5000);
    }
    return data;
  }

  async function getTimeData(): Promise<void> {
    try {
      const response = await getHourlyBreakDown(week);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  }

  const dataChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: generateRandomData(),
        label: "This week",
        borderColor: "#589AFF",
        backgroundColor: "#589AFF",
        borderRadius: 4,
        fill: true,
      },
    ],
  };

  const config = {
    type: "bar",
    data: dataChart,
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
      scales: {
        x: { grid: { display: true } },
        y: {
          grid: {
            display: true,
          },
          ticks: {
            stepSize: 1000,
            callback: function (value, index, ticks) {
              return Math.round(value / 1000) + "k";
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

  $: if (week !== undefined) {
    getTimeData();
  }

  onMount(() => {
    const canvas = document.getElementById(idChart) as HTMLCanvasElement;
    if (!canvas) return;
    const chart = new Chart(canvas, config);
  });
</script>

<div class="h-full">
  <canvas id={idChart} />
</div>
