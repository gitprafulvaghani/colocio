<script>
  import RateChart from "./charts/RateChart.svelte";
  import SourceChart from "./charts/SourceChart.svelte";
</script>

<div class="mt-[21px]">
  <div class="flex justify-between items-center gap-3 flex-wrap">
    <div class="flex items-center gap-2">
      <h2 class="text-[#4B5563] sm:text-[24px] text-[22px] font-medium">
        Global growth overview
      </h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.5 2C5.35786 2 2 5.35786 2 9.5C2 13.6421 5.35786 17 9.5 17C13.6421 17 17 13.6421 17 9.5C17 5.35786 13.6421 2 9.5 2ZM3.14319 9.5C3.14319 5.98923 5.98923 3.14319 9.5 3.14319C13.0108 3.14319 15.8568 5.98923 15.8568 9.5C15.8568 13.0108 13.0108 15.8568 9.5 15.8568C5.98923 15.8568 3.14319 13.0108 3.14319 9.5ZM10.0716 9.5C10.0716 9.18432 9.81568 8.92841 9.5 8.92841C9.18432 8.92841 8.92841 9.18432 8.92841 9.5V12.2714C8.92841 12.587 9.18432 12.843 9.5 12.843C9.81568 12.843 10.0716 12.587 10.0716 12.2714V9.5ZM8.80716 7.42148C8.80716 7.03883 9.11735 6.72864 9.5 6.72864C9.88265 6.72864 10.1928 7.03883 10.1928 7.42148C10.1928 7.80412 9.88265 8.11432 9.5 8.11432C9.11735 8.11432 8.80716 7.80412 8.80716 7.42148Z"
          fill="#4B5563"
        />
      </svg>
    </div>
    <button
      class="border-[#D1D5DB] border-[1px] h-[32px] rounded-md text-[#4B5563] text-[14px] px-[14px]"
      >View Growth metrics</button
    >
  </div>

  <div
    class="shadow-[0px_4px_9px_0px_#00000014] bg-[#fff] rounded-xl sm:p-[23px_32px] p-[20px_16px] mt-[20px] flex sm:flex-row flex-col"
  >
    <div
      class="sm:border-r-[#D1D5DB] sm:border-b-[0] border-b-[1px] border-b-[#D1D5DB] sm:border-r-[1px] sm:pb-0 pb-4 sm:mb-0 mb-4 sm:pr-[32px] sm:w-[33.33%]"
    >
      <p class="text-[#111827] text-[14px] font-medium">Profile visits</p>
      <div class="flex justify-between items-center">
        <div class="flex items-end gap-[6px] mt-1">
          <h2 class="text-[#0D64E8] text-[28px] font-semibold leading-[30px]">
            400
          </h2>
          <p class="text-[#6B7280] text-[12px]">from 412</p>
        </div>
        <div
          class="text-[#02AB46] text-[14px] bg-[#E4FDEA] rounded-[100px] px-2 gap-[2px] h-[24px] flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M3.33398 10.5007L4.50898 11.6757L9.16732 7.02565V17.1673H10.834V7.02565L15.484 11.684L16.6673 10.5007L10.0007 3.83398L3.33398 10.5007Z"
              fill="#02AB46"
            />
          </svg>
          10%
        </div>
      </div>
    </div>
    <div
      class="sm:border-r-[#D1D5DB] sm:border-b-[0] border-b-[1px] border-b-[#D1D5DB] sm:border-r-[1px] sm:pb-0 pb-4 sm:mb-0 mb-4 sm:px-[32px] sm:w-[33.33%]"
    >
      <p class="text-[#111827] text-[14px] font-medium">
        New page likes/follows
      </p>
      <div class="flex justify-between items-center">
        <div class="flex items-end gap-[6px] mt-1">
          <h2 class="text-[#0D64E8] text-[28px] font-semibold leading-[30px]">
            80
          </h2>
          <p class="text-[#6B7280] text-[12px]">from 75</p>
        </div>
        <div
          class="text-[#02AB46] text-[14px] bg-[#E4FDEA] rounded-[100px] px-2 gap-[2px] h-[24px] flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M3.33398 10.5007L4.50898 11.6757L9.16732 7.02565V17.1673H10.834V7.02565L15.484 11.684L16.6673 10.5007L10.0007 3.83398L3.33398 10.5007Z"
              fill="#02AB46"
            />
          </svg>
          10%
        </div>
      </div>
    </div>
    <div class="sm:w-[33.33%] sm:pl-[32px]">
      <p class="text-[#111827] text-[14px] font-medium">
        Page unlikes/unfollows
      </p>
      <div class="flex justify-between items-center">
        <div class="flex items-end gap-[6px] mt-1">
          <h2 class="text-[#0D64E8] text-[28px] font-semibold leading-[30px]">
            11
          </h2>
          <p class="text-[#6B7280] text-[12px]">from 14</p>
        </div>
        <div
          class="text-[#02AB46] text-[14px] bg-[#E4FDEA] rounded-[100px] px-2 gap-[2px] h-[24px] flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M16.6673 10.0007L15.4923 8.82565L10.834 13.4757V3.33398H9.16732V13.4757L4.51732 8.81732L3.33398 10.0007L10.0007 16.6673L16.6673 10.0007Z"
              fill="#39713D"
            />
          </svg>
          10%
        </div>
      </div>
    </div>
  </div>
  <div class="flex gap-[20px] xl:flex-row flex-col mt-[20px]">
    <div
      class="shadow-[0px_4px_9px_0px_#00000014] bg-[#fff] sm:p-[18px_30px] p-[18px_20px] 2xl:min-w-[367px] lg:min-w-[300px] lg:w-1/2"
    >
      <h2 class="text-[#111827] text-[18px] font-semibold">Growth sources</h2>
      <SourceChart />
    </div>
    <div
      class="shadow-[0px_4px_9px_0px_#00000014] bg-[#fff] sm:p-[18px_30px] p-[18px_20px] w-full"
    >
      <h2 class="text-[#111827] text-[18px] font-semibold">Growth rate</h2>
      <RateChart />
    </div>
  </div>
</div>
