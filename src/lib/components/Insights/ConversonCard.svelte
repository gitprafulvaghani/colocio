<!--<script lang="ts">
  import chartjs from "chart.js/auto";
  import { onMount } from "svelte";

  let chartData = [
    0, 60, 20, 90, 100, 180, 170, 200, 180, 170, 160, 190, 250, 220, 290,
  ];
  let labels = [
    "1/2/23",
    "2/2/23",
    "3/2/23",
    "4/2/23",
    "5/2/23",
    "6/2/23",
    "7/2/23",
    "8/2/23",
    "9/2/23",
    "10/2/23",
    "11/2/23",
    "12/2/23",
    "13/2/23",
    "14/2/23",
  ];
  let ctx;
  let chartCanvas;

  onMount(async () => {
    ctx = chartCanvas.getContext("2d");
    var chart = new chartjs(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "",
            data: chartData,
            fill: false,
            borderColor: "#0D64E8",
            borderWidth: 3,
          },
        ],
      },
    });
  });
</script>

<div class="h-full">
  <canvas bind:this={chartCanvas} id="myChart" />
</div>-->
<script lang="ts">
  import chartjs from "chart.js/auto";
  import { onMount } from "svelte";

  let spend = [100, 120, 130, 115, 140, 150, 160];
  let results = [200, 240, 260, 230, 280, 300, 320];
  let next_7_days_spend = [170, 180, 190, 200, 210, 220, 230];
  let predictedResults = [];

  // Linear regression calculation
  function linearRegression(x, y) {
    const n = x.length;
    const sum_x = x.reduce((a, b) => a + b, 0);
    const sum_y = y.reduce((a, b) => a + b, 0);
    const sum_xy = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
    const sum_xx = x.map((xi) => xi * xi).reduce((a, b) => a + b, 0);

    const slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    const intercept = (sum_y - slope * sum_x) / n;

    return { slope, intercept };
  }

  function predict(spend, slope, intercept) {
    return spend.map((x) => slope * x + intercept);
  }

  // Calculate the regression and make predictions
  const { slope, intercept } = linearRegression(spend, results);
  predictedResults = predict(next_7_days_spend, slope, intercept);

  let chartData = [...results, ...predictedResults]; // Combining existing and predicted results
  let labels = [
    "1/2/23",
    "2/2/23",
    "3/2/23",
    "4/2/23",
    "5/2/23",
    "6/2/23",
    "7/2/23",
    "8/2/23",
    "9/2/23",
    "10/2/23",
    "11/2/23",
    "12/2/23",
    "13/2/23",
    "14/2/23",
  ];
  //  labels = labels.concat(
  //    Array(next_7_days_spend.length)
  //      .fill("")
  //      .map((_, i) => `Pred ${i + 1}`)
  //  ); // Extend labels for predictions

  let ctx;
  let chartCanvas;

  onMount(async () => {
    ctx = chartCanvas.getContext("2d");
    var chart = new chartjs(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Results",
            data: chartData,
            fill: false,
            borderColor: "#0D64E8",
            borderWidth: 3,
          },
        ],
      },
    });
  });
</script>

<div class="h-full">
  <canvas bind:this={chartCanvas} id="myChart" />
</div>
