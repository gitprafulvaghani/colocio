<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  function generateRandomData() {
    let data = [];
    for (let i = 0; i < 7; i++) {
      data.push(Math.random() * 1000);
    }
    return data;
  }

  let idChart = "growthRateChart";
  const dataChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: generateRandomData(),
        label: "This week",
        borderColor: "#0D64E8",
        fill: false,
        pointBackgroundColor: "#0D64E8",
        backgroundColor: "#0D64E8",
        pointRadius: 10, // Set the size of the dots
        pointHoverRadius: 10, // Set the size of the dots on hover
        pointHitRadius: 10,
        pointBorderWidth: 3,
        pointBorderColor: "#fff",
      },
      {
        data: generateRandomData(),
        label: "Previous week",
        borderColor: "#9FB8DE",
        pointBackgroundColor: "#9FB8DE",
        backgroundColor: "#9FB8DE",
        fill: false,
        pointRadius: 10, // Set the size of the dots
        pointHoverRadius: 10, // Set the size of the dots on hover
        pointHitRadius: 10,
        pointBorderWidth: 3,
        pointBorderColor: "#fff",
      },
    ],
  };

  const config = {
    type: "line",
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
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
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
          display: true,
          align: "start",
          font: {
            family: "Inter var",
            size: 22,
          },
          text: "Growth Rate",
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

<canvas id={idChart} />
