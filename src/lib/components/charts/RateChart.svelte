<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let chartCanvas;

  onMount(() => {
    const ctx = chartCanvas.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "This week",
            data: [0, 95, 148, 138, 18, 44, 40],
            borderColor: "royalblue",
            borderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            fill: false,
          },
          {
            label: "Previous week",
            data: [25, 45, 128, 111, 152, 65, 40],
            borderColor: "lightsteelblue",
            borderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
</script>

<div class="w-full">
  <canvas bind:this={chartCanvas} class="!w-full" />
</div>
