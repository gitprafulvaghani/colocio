<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let idChart = "commoninterestschart";

  function generateRandomData() {
    let data = [];
    for (let i = 0; i < 7; i++) {
      data.push(Math.random() * 1000);
    }
    return data;
  }

  const dataChart = {
    labels: [
      "Online shopping",
      "Mealprep",
      "Home cook",
      "Social events",
      "Home entertainment",
      "GMO free",
      "Support local",
      "Shop local",
      "Free range",
      "Meal kits",
    ],
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
    options: {
      indexAxis: "y",
      scales: {
        x: {
          grid: { display: true },
          ticks: {
            stepSize: 200,
          },
        },
        y: {
          grid: {
            display: true,
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
            font: {
              family: "Inter var",
            },
            boxWidth: 16,
            boxHeight: 16,
            useBorderRadius: true,
            borderRadius: 8,
          },
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

<div class="h-full">
  <canvas id={idChart} />
</div>
