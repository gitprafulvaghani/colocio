<script lang="ts">
  import type { Platform } from "$lib/services/interface/promotions";
  import { platforms_ad, platformDetailsStore } from "$lib/stores/stores";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let platformarray: any[] = ["Facebook", "Instagram"];

  let platforms: Platform[] = $platforms_ad;
  function handleSubmit() {
    platformDetailsStore.set(platformarray);
  }
  function nextStep() {
    dispatch("nextStep");
    handleSubmit();
  }
  let bool_one_platform_selected = true;
  $: {
    bool_one_platform_selected = isOnePlatformSelected($platforms_ad);
  }

  function isOnePlatformSelected(values: any) {
    return values.filter((platform: any) => platform.selected).length >= 1;
  }
  function updateSelection(platformName: any, isSelected: any) {
    if (isSelected) {
      if (!platformarray.includes(platformName)) {
        platformarray.push(platformName);
      }
    } else {
      platformarray = platformarray.filter((item) => item !== platformName);
    }
  }
  function checkStatus(name: string) {
    if (name === "Tiktok" || name === "X" || name === "Youtube") {
      return true;
    } else {
      return false;
    }
  }
</script>

<div
  class="bg-white md:p-8 p-4 rounded-xl sm:mt-5 drop-shadow-md flex-1 z-0 relative"
>
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-4">
      <h1 class="flex items-center gap-2.5 font-bold text-lg text-font_dark">
        <svg
          width="45"
          height="44"
          viewBox="0 0 45 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.5 32.8333C26.5972 32.8333 25.8299 32.5174 25.1979 31.8854C24.566 31.2535 24.25 30.4861 24.25 29.5833C24.25 29.4569 24.259 29.326 24.2771 29.1906C24.2951 29.0552 24.3222 28.9333 24.3583 28.825L16.7208 24.3833C16.4139 24.6542 16.0708 24.8663 15.6917 25.0198C15.3125 25.1733 14.9153 25.25 14.5 25.25C13.5972 25.25 12.8299 24.934 12.1979 24.3021C11.566 23.6701 11.25 22.9028 11.25 22C11.25 21.0972 11.566 20.3299 12.1979 19.6979C12.8299 19.066 13.5972 18.75 14.5 18.75C14.9153 18.75 15.3125 18.8267 15.6917 18.9802C16.0708 19.1337 16.4139 19.3458 16.7208 19.6167L24.3583 15.175C24.3222 15.0667 24.2951 14.9448 24.2771 14.8094C24.259 14.674 24.25 14.5431 24.25 14.4167C24.25 13.5139 24.566 12.7465 25.1979 12.1146C25.8299 11.4826 26.5972 11.1667 27.5 11.1667C28.4028 11.1667 29.1701 11.4826 29.8021 12.1146C30.434 12.7465 30.75 13.5139 30.75 14.4167C30.75 15.3194 30.434 16.0868 29.8021 16.7187C29.1701 17.3507 28.4028 17.6667 27.5 17.6667C27.0847 17.6667 26.6875 17.5899 26.3083 17.4365C25.9292 17.283 25.5861 17.0708 25.2792 16.8L17.6417 21.2417C17.6778 21.35 17.7049 21.4719 17.7229 21.6073C17.741 21.7427 17.75 21.8736 17.75 22C17.75 22.1264 17.741 22.2573 17.7229 22.3927C17.7049 22.5281 17.6778 22.65 17.6417 22.7583L25.2792 27.2C25.5861 26.9292 25.9292 26.717 26.3083 26.5635C26.6875 26.4101 27.0847 26.3333 27.5 26.3333C28.4028 26.3333 29.1701 26.6493 29.8021 27.2812C30.434 27.9132 30.75 28.6806 30.75 29.5833C30.75 30.4861 30.434 31.2535 29.8021 31.8854C29.1701 32.5174 28.4028 32.8333 27.5 32.8333ZM27.5 15.5C27.8069 15.5 28.0642 15.3962 28.2719 15.1885C28.4795 14.9809 28.5833 14.7236 28.5833 14.4167C28.5833 14.1097 28.4795 13.8524 28.2719 13.6448C28.0642 13.4372 27.8069 13.3333 27.5 13.3333C27.1931 13.3333 26.9358 13.4372 26.7281 13.6448C26.5205 13.8524 26.4167 14.1097 26.4167 14.4167C26.4167 14.7236 26.5205 14.9809 26.7281 15.1885C26.9358 15.3962 27.1931 15.5 27.5 15.5ZM14.5 23.0833C14.8069 23.0833 15.0642 22.9795 15.2719 22.7719C15.4795 22.5642 15.5833 22.3069 15.5833 22C15.5833 21.6931 15.4795 21.4358 15.2719 21.2281C15.0642 21.0205 14.8069 20.9167 14.5 20.9167C14.1931 20.9167 13.9358 21.0205 13.7281 21.2281C13.5205 21.4358 13.4167 21.6931 13.4167 22C13.4167 22.3069 13.5205 22.5642 13.7281 22.7719C13.9358 22.9795 14.1931 23.0833 14.5 23.0833ZM27.5 30.6667C27.8069 30.6667 28.0642 30.5628 28.2719 30.3552C28.4795 30.1476 28.5833 29.8903 28.5833 29.5833C28.5833 29.2764 28.4795 29.0191 28.2719 28.8115C28.0642 28.6038 27.8069 28.5 27.5 28.5C27.1931 28.5 26.9358 28.6038 26.7281 28.8115C26.5205 29.0191 26.4167 29.2764 26.4167 29.5833C26.4167 29.8903 26.5205 30.1476 26.7281 30.3552C26.9358 30.5628 27.1931 30.6667 27.5 30.6667Z"
            fill="#0D64E8"
          />
          <rect
            x="1.5"
            y="1"
            width="42"
            height="42"
            rx="9"
            stroke="#0D64E8"
            stroke-width="2"
          />
        </svg>
        Platform
      </h1>
      <hr class="bg-gray-200 h-[1px]" />
      <h2 class="text-gray-600 text-sm">Platform</h2>
      <div class="flex flex-col">
        <div class="text-sm text-gray-900 w-full h-full">
          <div class="flex flex-col gap-2">
            {#each platforms as platform}
              <div class="flex gap-[10px]">
                <div class="text-center">
                  <input
                    disabled={checkStatus(platform.name)}
                    id="green-checkbox"
                    type="checkbox"
                    bind:checked={platform.selected}
                    on:change={() =>
                      updateSelection(platform.name, platform.selected)}
                    class="text-[#6FAA79] bg-gray-100 border-[#D5DAE1] border-[1px] rounded checkbox-main"
                  />
                </div>
                <div class="min-w-[20px] min-h-[20px] text-left">
                  <img
                    src="/icons/{platform.name.toLowerCase()}.svg"
                    alt={platform.name}
                    class="w-[20px] h-[20px]"
                  />
                </div>
                <div>
                  <div>{platform.name}</div>
                  {#if platform.description}<p class="text-gray-500 text-xs">
                      {platform.description}
                    </p>{/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mt-[32px] gap-4">
      <button
        on:click={() => {
          dispatch("prevStep");
        }}
        type="button"
        class="py-2.5 sm:max-w-[100px] max-w-[50%] w-full h-[40px] px-5 flex items-center justify-center gap-2 text-sm font-medium text-[#4B5563] focus:outline-none bg-white rounded-md border border-[#D1D5DB] hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200"
      >
        Previous
      </button>
      <button
        on:click={nextStep}
        class:opacity-30={!bool_one_platform_selected}
        disabled={!bool_one_platform_selected}
        type="button"
        class="text-white flex items-center justify-center gap-2 sm:max-w-[100px] max-w-[50%] w-full bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 resize-none"
      >
        Next
      </button>
    </div>
  </div>
</div>
