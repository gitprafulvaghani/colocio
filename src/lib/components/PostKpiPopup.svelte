<script lang="ts">
  import chartjs from "chart.js/auto";
  import { onMount } from "svelte";

  let chartData = [
    0, 60, 20, 90, 100, 180, 170, 200, 180, 170, 160, 190, 250, 220, 290,
  ];
  let labels = [
    "2/2/23",
    "4/2/23",
    "6/2/23",
    "8/2/23",
    "10/2/23",
    "12/2/23",
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

<div
  class="shadow-[0px_4px_9px_0px_#00000014] p-4 bg-white rounded-xl w-[430px] relative z-10 overflow-auto"
>
  <div>
    <div class="flex gap-3 items-center">
      <p class="text-[#111827] text-[14px] font-medium">Engagement growth</p>
    </div>
    <!--<hr class="h-[1px] bg-[#E5E7EB] my-3" />-->
    <!--<p class="text-[#111827] text-[14px] font-medium">Follower growth</p>-->
    <div>
      <div class="flex gap-4 items-center my-[16px]">
        <div class="flex items-center gap-1">
          <div class="bg-[#0D64E8] w-4 h-4 rounded-full" />
          <p class="text-[#474747] text-[12px]">To date</p>
        </div>
        <div class="flex items-center gap-1">
          <div class="bg-[#9FB8DE] w-4 h-4 rounded-full" />
          <p class="text-[#474747] text-[12px]">Predicted</p>
        </div>
      </div>
      <div class="h-[200px] w-full">
        <canvas bind:this={chartCanvas} id="myChart" />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 mt-3">
      <div
        class="border-[#D1D5DB] border-[1px] bg-white p-[13.5px_12px] rounded-[4px] flex flex-col justify-between"
      >
        <p class="text-[#111827] text-[14px] font-medium">Impressions</p>
        <div class="flex justify-between items-center mt-[6px]">
          <p class="text-[#0D64E8] text-[18px] font-semibold">12</p>
          <div
            class="bg-[#E4FDEA] rounded-[100px] h-[24px] px-2 text-[#02AB46]"
          >
            Good
          </div>
        </div>
      </div>
      <div
        class="border-[#D1D5DB] border-[1px] bg-white p-3 rounded-[4px] flex flex-col justify-between"
      >
        <p class="text-[#111827] text-[14px] font-medium">Likes/Reactions</p>
        <div class="flex justify-between items-center mt-[6px]">
          <p class="text-[#0D64E8] text-[18px] font-semibold">300</p>
          <div
            class="bg-[#E4FDEA] rounded-[100px] h-[24px] px-2 text-[#02AB46]"
          >
            Good
          </div>
        </div>
      </div>
      <div
        class="border-[#D1D5DB] border-[1px] bg-white p-3 rounded-[4px] flex flex-col justify-between"
      >
        <p class="text-[#111827] text-[14px] font-medium">Comments/Replies</p>
        <div class="flex justify-between items-center mt-[6px]">
          <p class="text-[#0D64E8] text-[18px] font-semibold">120</p>
          <div
            class="bg-[#E4FDEA] rounded-[100px] h-[24px] px-2 text-[#02AB46]"
          >
            Good
          </div>
        </div>
      </div>
      <div
        class="border-[#D1D5DB] border-[1px] bg-white p-3 rounded-[4px] flex flex-col justify-between"
      >
        <p class="text-[#111827] text-[14px] font-medium">Shares/Reposts</p>
        <div class="flex justify-between items-center mt-[6px]">
          <p class="text-[#0D64E8] text-[18px] font-semibold">12</p>
          <div
            class="bg-[#E4FDEA] rounded-[100px] h-[24px] px-2 text-[#02AB46]"
          >
            Good
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
