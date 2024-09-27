<script lang="ts">
  import CostIndicator from "./CostIndicator.svelte";

  let conversions = 100;
  let clicks = 1000;
  export let metricsDifference: any;
  export let Details: any;
</script>

<div>
  <h3 class="text-font_dark text-lg font-bold mb-2 mt-4">Conversion</h3>
  <p class="text-[#6B7280] text-[14px] font-normal mb-[16px]">
    Refers to a specific action taken by a viewer in response to your ads. These
    actions vary based on the ad goals you selected, and could include
    engagement click-to-page, website visits, or online purchases.
  </p>

  <div
    class="md:flex bg-white justify-between rounded-lg shadow-[0px_4px_9px_0px_#00000014] py-[21px]"
  >
    <div
      class="flex flex-1 flex-col gap-2 lg:px-8 px-4 md:border-r-[#D1D5DB] md:border-b-[0] border-b-[1px] border-b-[#D1D5DB] sm:border-r-[1px] md:pb-0 pb-3 md:mb-0 mb-3"
    >
      <h4
        class="text-font_dark text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
      >
        Total conversions
      </h4>
      <div class="flex items-end gap-2 justify-between">
        <div class="flex gap-2 items-end">
          <span class="text-blue-primary text-3xl leading-7 font-bold mb-1"
            >{Details.current.totalConversions}</span
          >
          <span class="text-[#6B7280] text-sm mb-1"
            >from {Details.current.totalClicks}</span
          >
        </div>

        <CostIndicator value={metricsDifference.totalConversions} />
      </div>
    </div>

    <div
      class="flex flex-1 flex-col gap-2 lg:px-8 px-4 md:border-r-[#D1D5DB] md:border-b-[0] border-b-[1px] border-b-[#D1D5DB] sm:border-r-[1px] md:pb-0 pb-3 md:mb-0 mb-3"
    >
      <h4
        class="text-font_dark text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
      >
        Conversion rate
      </h4>
      <div class="flex items-end gap-2 justify-between">
        <div class="flex gap-2 items-end">
          <span class="text-blue-primary text-3xl leading-7 font-bold mb-1"
            >{Details.current.conversionRate.toFixed(2)}%</span
          >
          <span class="text-[#6B7280] text-sm mb-1"
            >from {Details.current.totalClicks}</span
          >
        </div>
        <CostIndicator value={metricsDifference.conversionRate} />
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-2 lg:px-8 px-4">
      <h4
        class="text-font_dark text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
      >
        Cost per conversion
      </h4>
      <div class="flex items-end gap-2 justify-between">
        <div class="flex gap-2 items-end">
          <span class="text-blue-primary text-3xl leading-7 font-bold mb-1"
            >${Details.current.costPerConversion.toFixed(2)}</span
          >
          <span class="text-[#6B7280] text-sm mb-1"
            >from {Details.current.totalClicks}</span
          >
        </div>
        <CostIndicator value={metricsDifference.costPerConversion} />
      </div>
    </div>
  </div>
</div>
