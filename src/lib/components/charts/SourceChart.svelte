<script>
  import ChartJS from "chart.js/auto";
  import { onMount, onDestroy } from "svelte";

  let chart;

  const data = {
    labels: ["Organic", "Campaign"],
    datasets: [
      {
        data: [25, 75],
        backgroundColor: ["#589AFF", "#0D64E8"],
        hoverBorderColor: "#fff",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 10,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  onMount(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    chart = new ChartJS(ctx, {
      type: "doughnut",
      data,
      options,
    });
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>

<div class="w-full">
  <canvas id="myChart" />
</div>
