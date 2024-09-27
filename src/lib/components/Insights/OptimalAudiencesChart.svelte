<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let idChart = "platformsChart";
  const dataChart = {
    labels: [
      "Facebook, Instagram",
      "Instagram",
      "Facebook",
      "Instagram, Tiktok",
      "Tiktok",
    ],
    datasets: [
      {
        data: [
          Math.random() * 500,
          Math.random() * 500,
          Math.random() * 500,
          Math.random() * 200,
          Math.random() * 200,
        ],
        label: "Platforms",
        backgroundColor: [
          "#589AFF",
          "#0D64E8",
          "#0024A4",
          "#273668",
          "#5E7BB3",
        ],
      },
    ],
  };

  const config = {
    type: "doughnut",
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
      borderWidth: 0,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          display: true,
          align: "middle",
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
          align: "start",
          font: {
            family: "Inter var",
            size: 22,
          },
          text: "Platforms",
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

<div class="h-full sm:w-[350px] w-[250px]">
  <canvas id={idChart} class="max-h-[160px]" />
</div>
