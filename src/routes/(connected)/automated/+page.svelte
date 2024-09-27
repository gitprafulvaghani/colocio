<script lang="ts">
  // @ts-nocheck

  import Campaign from "$lib/components/promotions/Campaign.svelte";
  import SubHeader from "$lib/components/promotions/SubHeader.svelte";
  import { platforms_ad, bool_modal_media, library } from "$lib/stores/stores";
  import ModalMedia from "$lib/components/promotions/ModalMedia.svelte";
  //import MediaShow from './MediaShow.svelte';
  import Flatpickr from "svelte-flatpickr";
  import "flatpickr/dist/flatpickr.css";

  let selectedStartDate = new Date();
  let selectedEndDate = new Date();
  let isVisible = false;
  let platformarray: any[] = ["Facebook"];
  let AutomatedAd = {
    description: "description",
    startDateTime: "1/06/2024, 7:00AM",
    adValidation: "continuous",
    endDateTime: "23/06/2024, 7:00AM",
    days: 5,
    Dailyspend: "3000",
  };
  $: isButtonDisabled =
    AutomatedAd.description === "" ||
    AutomatedAd.startDateTime === "" ||
    AutomatedAd.adValidation === "" ||
    AutomatedAd.endDateTime === "" ||
    AutomatedAd.days === "";

  if (AutomatedAd.startDateTime && AutomatedAd.endDateTime) {
    let start = new Date(AutomatedAd.startDateTime);
    let end = new Date(AutomatedAd.endDateTime);
    let diffTime = Math.abs(end - start);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    AutomatedAd.days = diffDays;
  }

  let selected_library: any[] = [];
  $: {
    selected_library = $library.filter((media: any) => media.selected);
    //  selected_library = $library.filter((media: any) => media.selected).map((media: any) => media.src);
  }
  function GenerateAD() {
    isVisible = true;
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
  function handleRadioChange(event) {
    AutomatedAd.adValidation = event.target.value;
  }
  function checkStatus(name: string) {
    if (name === "Tiktok" || name === "X" || name === "Youtube") {
      return true;
    } else {
      return false;
    }
  }
</script>

<div class="p-[16px_17.5px] pb-[80px]">
  <SubHeader />
  {#if !isVisible}
    <div
      class="shadow-[0px_4px_9px_0px_#00000014] max-w-[745px] mx-auto my-[20px] md:p-8 p-4"
    >
      <div>
        <h1 class="text-[18px] text-[#0D64E8] font-semibold">
          <span>1.</span> Platforms
        </h1>
        <div class="text-sm text-gray-900 w-full h-full mt-[16px]">
          <div class="flex flex-col gap-2">
            {#each $platforms_ad as platform}
              <div class="flex gap-[10px]">
                <div class="text-center">
                  <input
                    id="green-checkbox"
                    type="checkbox"
                    disabled={checkStatus(platform.name)}
                    bind:checked={platform.selected}
                    on:change={() =>
                      updateSelection(platform.name, platform.selected)}
                    class="text-[#6FAA79] bg-gray-100 border-[#D5DAE1] border-[1px] rounded"
                  />
                </div>
                <div class="w-[20px] h-[20px] text-left">
                  <img
                    src="/icons/{platform.name.toLowerCase()}.svg"
                    alt={platform.name}
                    class="w-[20px] h-[20px]"
                  />
                </div>
                <div>
                  <div>{platform.name}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        <div class="bg-[#E5E7EB] h-[1px] w-full mt-[16px]" />
        <div>
          <h1 class="text-[18px] text-[#0D64E8] font-semibold mt-[16px]">
            <span>2.</span> Description
          </h1>
          <div class="mt-[16px]">
            <p class="text-[#6B7280] text-[12px]">
              Help Colocio understand what content to generate by referring to
              the following:
            </p>
            <ul class="text-[#6B7280] text-[12px] list-disc pl-[22px]">
              <li>Specific products/services you would like to promote</li>
              <li>Target audience you want to reach</li>
              <li>Specific information you want your ad campaign to include</li>
            </ul>
            <textarea
              bind:value={AutomatedAd.description}
              placeholder="Example: Promote our Monday Madness special that gives customers a 50% discount on all beverages on Mondays when shopping on our online store. It is targeted towards our usual audience of 18-35 year olds in the New York area."
              class="border-[#D1D5DB] border-[1px] rounded-[6px] p-[8px_15px] mt-2 w-full h-[155px] text-[#6B7280] text-[14px] leading-[17px]"
            />
          </div>
        </div>
        <div class="bg-[#E5E7EB] h-[1px] w-full mt-[16px]" />
        <div>
          <h1 class="text-[18px] text-[#0D64E8] font-semibold mt-[16px]">
            <span>3.</span> Media
          </h1>
          <button
            on:click={() => {
              bool_modal_media.set(true);
            }}
            class="w-[120px] h-[120px] bg-transparent relative text-custom-gray-600 border border-dashed border-custom-gray-200 rounded-[10px] p-2.5 flex flex-col items-center justify-center mt-[16px] gap-1"
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0625 3.375H8.775C6.88482 3.375 5.93973 3.375 5.21778 3.74285C4.58274 4.06643 4.06643 4.58274 3.74285 5.21778C3.375 5.93973 3.375 6.88482 3.375 8.775V18.225C3.375 20.1152 3.375 21.0603 3.74285 21.7822C4.06643 22.4173 4.58274 22.9336 5.21778 23.2571C5.93973 23.625 6.88482 23.625 8.775 23.625H19.125C20.1712 23.625 20.6943 23.625 21.1235 23.51C22.2882 23.1979 23.1979 22.2882 23.51 21.1235C23.625 20.6943 23.625 20.1712 23.625 19.125M21.375 9V2.25M18 5.625H24.75M11.8125 9.5625C11.8125 10.8051 10.8051 11.8125 9.5625 11.8125C8.31986 11.8125 7.3125 10.8051 7.3125 9.5625C7.3125 8.31986 8.31986 7.3125 9.5625 7.3125C10.8051 7.3125 11.8125 8.31986 11.8125 9.5625ZM16.8638 13.4079L7.34754 22.0591C6.81228 22.5457 6.54465 22.789 6.52098 22.9997C6.50046 23.1824 6.57051 23.3636 6.70858 23.485C6.86788 23.625 7.22957 23.625 7.95295 23.625H18.513C20.132 23.625 20.9416 23.625 21.5774 23.353C22.3756 23.0115 23.0115 22.3756 23.353 21.5774C23.625 20.9416 23.625 20.132 23.625 18.513C23.625 17.9682 23.625 17.6958 23.5654 17.4422C23.4906 17.1234 23.3471 16.8248 23.1449 16.5672C22.984 16.3622 22.7713 16.1921 22.346 15.8518L19.1991 13.3342C18.7733 12.9936 18.5604 12.8234 18.326 12.7632C18.1194 12.7103 17.902 12.7171 17.6991 12.783C17.4689 12.8578 17.2672 13.0412 16.8638 13.4079Z"
                stroke="#9CA3AF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="text-[12px]">Add media</span>
          </button>
        </div>
        <div class="bg-[#E5E7EB] h-[1px] w-full mt-[16px]" />
        <div>
          <h1 class="text-[18px] text-[#0D64E8] font-semibold my-[16px]">
            <span>4.</span> Schedule
          </h1>
          <div
            class="sm:grid flex sm:flex-none flex-col sm:grid-cols-2 gap-[20px]"
          >
            <div class="sm:col-span-1 flex flex-col gap-1">
              <label for="start" class="font-medium text-gray-600 text-[14px]"
                >Start date/time</label
              >
              <div class="relative datepicker-main">
                <Flatpickr
                  bind:value={selectedStartDate}
                  options={{ enableTime: true }}
                />
                <span class="bg-transparent absolute right-3 top-3">
                  <img
                    src="/icons/calendar_black.svg"
                    alt="calendar"
                    class="w-4 h-4"
                  />
                </span>
              </div>
            </div>
            <div class="flex items-center sm:col-span-2">
              <input
                id="green-radio"
                type="radio"
                value="continuous"
                name="colored-radio"
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                on:change={handleRadioChange}
              />
              <label for="green-radio" class="ml-2 text-sm text-gray-600"
                >Run ad continuously</label
              >
            </div>
            <div class="flex items-center sm:col-span-2">
              <input
                id="green-radio"
                type="radio"
                value="endDateTime"
                name="colored-radio"
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                on:change={handleRadioChange}
              />
              <label for="green-radio" class="ml-2 text-sm text-gray-600"
                >Choose end date/time</label
              >
            </div>
            <div class="sm:col-span-1 flex flex-col gap-1">
              <label for="start" class="font-medium text-gray-600 text-[14px]"
                >End date/time</label
              >
              <div class="relative datepicker-main">
                <!-- <input
                      bind:value={AutomatedAd.endDateTime}
                      type="text"
                      id="start"
                      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    /> -->
                <Flatpickr
                  bind:value={selectedEndDate}
                  options={{ enableTime: true }}
                />
                <span class="bg-transparent absolute right-3 top-3">
                  <img
                    src="/icons/calendar_black.svg"
                    alt="calendar"
                    class="w-4 h-4"
                  />
                </span>
              </div>
            </div>
            <div class="sm:col-span-1 flex flex-col gap-1">
              {#if AutomatedAd.startDateTime && AutomatedAd.endDateTime}
                <label for="age" class="font-medium text-gray-600 text-[14px]"
                  >Days</label
                >
              {/if}
              <select
                bind:value={AutomatedAd.days}
                id="age"
                class="bg-white border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                {#each Array(30) as day, index}
                  <option value={index}>{index}</option>
                {/each}
              </select>
            </div>
            <hr class="bg-gray-200 h-[1px] col-span-2" />
          </div>
        </div>
        <div>
          <h1 class="text-[18px] text-[#0D64E8] font-semibold my-[16px]">
            <span>5.</span> Daily spend
          </h1>

          <div class="flex gap-[24px] items-center overflow-auto">
            <div class="relative">
              <input
                bind:value={AutomatedAd.Dailyspend}
                type="number"
                class="border-[#D1D5DB] border-[1px] h-[32px] max-w-[115px] min-w-[115px] w-full text-[#4B5563] text-[14px] rounded-md pl-[30px]"
              />
              <span class="absolute left-[15px] top-[50%] translate-y-[-50%]"
                >$</span
              >
            </div>
            <div class="items-center flex gap-2 w-full">
              <p class="text-gray-600 text-[14px] flex whitespace-nowrap">
                $ 25
              </p>

              <input
                type="range"
                class="flex-1 bg-gray-200 rounded-lg cursor-pointe range-slider h-1"
              />
              <p class="text-gray-600 text-[14px] flex whitespace-nowrap">
                $ 10 000
              </p>
            </div>
          </div>
        </div>
        <div class="mt-[32px] flex justify-end">
          <button
            disabled={isButtonDisabled}
            class:opacity-50={isButtonDisabled}
            on:click={GenerateAD}
            class="bg-[#0D64E8] text-[#fff] rounded-[6px] px-[14px] py-[8px] flex gap-2 items-center text-[14px] h-[40px]"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                d="M8.92871 0C4.50853 0 0.928711 3.57982 0.928711 8C0.928711 12.4202 4.50853 16 8.92871 16C13.3489 16 16.9287 12.4202 16.9287 8C16.9287 3.57982 13.3489 0 8.92871 0ZM13.8849 11.957C13.3754 12.4467 12.6872 12.6319 11.913 11.646L9.59041 8.82051C9.21324 8.36394 8.51184 8.37717 8.1479 8.84036L5.99075 11.6195C5.16362 12.6782 4.44897 12.4268 3.92623 11.8842C3.08586 10.8056 2.58297 9.46237 2.58297 7.99338C2.58297 4.49297 5.42829 1.64764 8.92871 1.64764C12.4291 1.64764 15.2745 4.49297 15.2745 7.99338C15.2745 9.48883 14.7517 10.8652 13.8849 11.9504V11.957Z"
                fill="#fff"
              /></svg
            >
            Generate Ad</button
          >
        </div>
      </div>
    </div>
  {/if}
  {#if isVisible}
    <Campaign post={AutomatedAd} />
  {/if}
  <ModalMedia />
</div>
