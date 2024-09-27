<!--<script>
  import Chart from "chart.js/auto";
  import { onMount } from "svelte";

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "This week",
        data: [415, 400, 225, 190, 980, 750, 40],
        backgroundColor: "#0D64E8",
        borderRadius: 6,
      },
      {
        label: "Previous week",
        data: [450, 810, 170, 480, 260, 350, 150],
        backgroundColor: "#9FB8DE",
        borderRadius: 6,
      },
    ],
  };

  let chartRef;

  onMount(() => {
    const myChart = new Chart(chartRef, {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  });
</script>

<div
  class="chart-container w-full shadow-[0px_4px_9px_0px_#00000014] bg-white sm:p-[28px_30px] p-[20px_16px] rounded-[10px]"
>
  <h2 class="chart-title">Engagement overview</h2>
  <canvas bind:this={chartRef} />
</div>

<style>
  .chart-title {
    color: #111827;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 7px;
  }
</style>-->
<script>
  import Chart from "chart.js/auto";
  import { onMount } from "svelte";
  import { getAllCampaigns } from "$lib/services/NewFacebook/NewFacebookService";
  import { parseISO, startOfISOWeek, getDay } from "date-fns";

  let chartRef;
  let myChart;

  async function fetchDataAndUpdateChart() {
    try {
      const postData = await getAllCampaigns();

      if (postData.data.length === 0) return;

      const referenceDate = parseISO(postData.data[0].start_time);

      const now = new Date();
      const startOfCurrentWeek = startOfISOWeek(now);
      const startOfPreviousWeek = startOfISOWeek(now);
      startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7);

      const thisWeekData = Array(7).fill(0);
      const previousWeekData = Array(7).fill(0);

      postData.data.forEach((item) => {
        const currentDate = parseISO(item.start_time);
        const dayOfWeek = getDay(currentDate);

        if (currentDate >= startOfCurrentWeek) {
          thisWeekData[dayOfWeek]++;
        } else if (
          currentDate >= startOfPreviousWeek &&
          currentDate < startOfCurrentWeek
        ) {
          previousWeekData[dayOfWeek]++;
        }
      });

      myChart.data.labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      myChart.data.datasets[0].data = thisWeekData;
      myChart.data.datasets[1].data = previousWeekData;
      myChart.update();
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  }

  onMount(() => {
    const data = {
      labels: [],
      datasets: [
        {
          label: "This Week",
          data: [],
          backgroundColor: "#0D64E8",
          borderRadius: 6,
          barPercentage: 0.4,
        },
        {
          label: "Previous Week",
          data: [],
          backgroundColor: "#9FB8DE",
          borderRadius: 6,
          barPercentage: 0.4,
        },
      ],
    };

    myChart = new Chart(chartRef, {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            title: {
              display: true,
              text: "Days of the Week",
            },
          },
        },
      },
    });

    fetchDataAndUpdateChart();

    return () => {
      myChart.destroy();
    };
  });
</script>

<div
  class="chart-container w-full shadow-[0px_4px_9px_0px_#00000014] bg-white sm:p-[28px_30px] p-[20px_16px] rounded-[10px]"
>
  <h2 class="chart-title">Engagement overview</h2>
  <canvas bind:this={chartRef} />
</div>

<style>
  .chart-title {
    color: #111827;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 7px;
  }
</style>
