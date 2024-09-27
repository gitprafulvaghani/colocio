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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M10.002 12.9807C10.9463 12.9807 11.7483 12.6502 12.408 11.9893C13.0677 11.3283 13.3976 10.5257 13.3976 9.58142C13.3976 8.63718 13.0671 7.8352 12.4061 7.17548C11.7451 6.51576 10.9425 6.1859 9.99825 6.1859C9.05401 6.1859 8.25203 6.51638 7.59231 7.17735C6.93259 7.83834 6.60273 8.64096 6.60273 9.58521C6.60273 10.5294 6.93321 11.3314 7.59418 11.9911C8.25517 12.6509 9.05779 12.9807 10.002 12.9807ZM10.0001 11.8333C9.37514 11.8333 8.84389 11.6146 8.40639 11.1771C7.96889 10.7396 7.75014 10.2083 7.75014 9.58331C7.75014 8.95831 7.96889 8.42706 8.40639 7.98956C8.84389 7.55206 9.37514 7.33331 10.0001 7.33331C10.6251 7.33331 11.1564 7.55206 11.5939 7.98956C12.0314 8.42706 12.2501 8.95831 12.2501 9.58331C12.2501 10.2083 12.0314 10.7396 11.5939 11.1771C11.1564 11.6146 10.6251 11.8333 10.0001 11.8333ZM10.0013 15.4166C8.08494 15.4166 6.33884 14.888 4.76298 13.8309C3.18713 12.7737 2.02688 11.3579 1.28223 9.58331C2.02688 7.80874 3.18675 6.39288 4.76185 5.33573C6.33694 4.27858 8.08265 3.75 9.999 3.75C11.9153 3.75 13.6614 4.27858 15.2373 5.33573C16.8132 6.39288 17.9734 7.80874 18.7181 9.58331C17.9734 11.3579 16.8135 12.7737 15.2384 13.8309C13.6634 14.888 11.9176 15.4166 10.0013 15.4166ZM10.0001 14.1666C11.5696 14.1666 13.0106 13.7535 14.3231 12.9271C15.6356 12.1007 16.639 10.9861 17.3335 9.58331C16.639 8.18054 15.6356 7.06595 14.3231 6.23956C13.0106 5.41317 11.5696 4.99998 10.0001 4.99998C8.4307 4.99998 6.98973 5.41317 5.67723 6.23956C4.36473 7.06595 3.36125 8.18054 2.66681 9.58331C3.36125 10.9861 4.36473 12.1007 5.67723 12.9271C6.98973 13.7535 8.4307 14.1666 10.0001 14.1666Z"
          fill="#4B5563"
        />
      </svg>
      <p class="text-[#111827] text-[18px] font-semibold">Awareness overview</p>
    </div>
    <hr class="h-[1px] bg-[#E5E7EB] my-3" />
    <p class="text-[#111827] text-[14px] font-medium">Follower growth</p>
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
      <div class="h-full">
        <canvas bind:this={chartCanvas} id="myChart" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2 mt-3">
      <div
        class="border-[#D1D5DB] border-[1px] bg-white p-[13.5px_12px] rounded-[4px] flex flex-col justify-between"
      >
        <p class="text-[#111827] text-[14px] font-medium">
          Page/Profile visits
        </p>
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
        class="border-[#D1D5DB] border-[1px] bg-white p-[13.5px_12px] rounded-[4px] flex flex-col justify-between"
      >
        <p class="text-[#111827] text-[14px] font-medium">New followers</p>
        <div class="flex justify-between items-center mt-[6px]">
          <p class="text-[#0D64E8] text-[18px] font-semibold">80</p>
          <div
            class="bg-[#E4FDEA] rounded-[100px] h-[24px] px-2 text-[#02AB46]"
          >
            Good
          </div>
        </div>
      </div>
      <div
        class="border-[#D1D5DB] border-[1px] bg-white p-[13.5px_12px] rounded-[4px] flex flex-col justify-between"
      >
        <p class="text-[#111827] text-[14px] font-medium">
          Page unlikes/ unfollows
        </p>
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
