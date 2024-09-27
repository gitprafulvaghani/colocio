<script lang="ts">
  export let total_budget = 0;
  export let total_budget_description = '';
  export let estimated_vat = 0;
</script>

<div class="bg-white p-8 rounded-xl mt-5 drop-shadow-md lg:w-[333px]">
  <div class="flex flex-col">
    <h2
      class="flex items-center gap-2.5 text-lg text-font_dark mb-[16px]"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5 14H16.51M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V9C21 7.89543 20.1046 7 19 7L5 7C3.89543 7 3 6.10457 3 5ZM3 5C3 3.89543 3.89543 3 5 3H17M17 14C17 14.2761 16.7761 14.5 16.5 14.5C16.2239 14.5 16 14.2761 16 14C16 13.7239 16.2239 13.5 16.5 13.5C16.7761 13.5 17 13.7239 17 14Z"
          stroke="#0D64E8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="font-semibold text-[#111827]">Payment Overview</div>
    </h2>
    <hr class="bg-gray-200 h-[1px]" />
    <div class="flex justify-between text-[14px] py-[16px]">
      <div class="text-gray-500 flex-col">
        <div>Total budget</div>
        {#if total_budget_description}
          <div class="text-[14px] text-gray-400">
            {total_budget_description}
          </div>
        {/if}
      </div>
      <div class="text-font_dark font-medium">${total_budget}</div>
    </div>
    <!--<hr class="bg-gray-200 h-[1px]" />-->
    <div class="flex justify-between text-[14px] pb-[16px]">
      <div class="text-gray-500">Estimated VAT</div>
      <div class="text-font_dark font-medium">${estimated_vat}</div>
    </div>
    <hr class="bg-gray-200 h-[1px]" />
    <div class="flex justify-between text-[14px] pt-[16px]">
      <div class="text-gray-500">Total</div>
      <div class="text-[#0D64E8] font-medium">
        ${total_budget + estimated_vat}
      </div>
    </div>
  </div>
</div>
