<script lang="ts">
  import { decodeAsyncGenerator } from "gpt-tokenizer";
  import { createEventDispatcher, onMount } from "svelte";
  import {
    AudienceStore,
    GoalsStore,
    ScheduleStore,
    Selected_Library_Store,
    textStore,
  } from "$lib/stores/stores";
  import Flatpickr from "svelte-flatpickr";
  import "flatpickr/dist/flatpickr.css";
  import {
    calculateDaysDifference,
    isEmpty,
  } from "$lib/services/promotionservice";

  let scheduleStart = new Date();
  let scheduleEnd = new Date();
  const dispatch = createEventDispatcher();

  let percent_optimization = 0;
  let schedule_infos: any = {
    start: "2024-06-01 07:00:00",
    end: "2024-06-01 07:00:00",
    days: 23,
    daily_spend: 1000,
    daily_reach: 1500,
  };
  let Detials: any[][] = [];

  let budget_range = 100;
  let reach_range = 50;

  function applyRecommendation() {
    percent_optimization = 100;
    schedule_infos.start = formatDate(new Date());
    schedule_infos.end = formatDate(new Date());
    schedule_infos.days = 23;
    schedule_infos.daily_spend = 1500;
    schedule_infos.daily_reach = 1500;

    budget_range = 1500; //1500 / 2000 * 100;
    reach_range = (1500 / 2000) * 100;

    setTimeout(function () {
      majRanges();
    }, 100);
    dispatch("applyRecommendation", {});
  }

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  export let showButton;

  function majRanges() {
    const rangeBudget = document.getElementById("range-budget");
    const rangeReach = document.getElementById("range-reach");
    const budgetValue = rangeBudget.value / 100;
    rangeBudget.style.background = `linear-gradient(to right, #0D64E8 ${budgetValue}%, #E2E8F0 ${budgetValue}%)`;

    const reachValue = rangeReach.value;
    rangeReach.style.background = `linear-gradient(to right, #0D64E8 ${reachValue}%, #E2E8F0 ${reachValue}%)`;
  }

  onMount(() => {
    const rangeBudget = document.getElementById("range-budget");
    const rangeReach = document.getElementById("range-reach");

    if (rangeBudget == null || rangeReach == null) return;

    rangeBudget.addEventListener("input", (e) => {
      const value = e.target.value;
      rangeBudget.style.background = `linear-gradient(to right, #0D64E8 ${value}%, #E2E8F0 ${value}%)`;
    });

    rangeReach.addEventListener("input", (e) => {
      const value = e.target.value;
      rangeReach.style.background = `linear-gradient(to right, #0D64E8 ${value}%, #E2E8F0 ${value}%)`;
    });

    majRanges();
  });

  async function NestStep() {
    const Send_Info = {
      daily_reach: schedule_infos.daily_reach,
      daily_spend: 1500,
      days: schedule_infos.days,
      end: formatDate(scheduleEnd),
      start: formatDate(scheduleStart),
      reach_range: reach_range,
    };

    ScheduleStore.set(Send_Info);
    dispatch("nextStep");
  }
  function handleDateChange() {
    const date1 = new Date(scheduleStart);
    const date2 = new Date(scheduleEnd);
    const differenceInDays = calculateDaysDifference(date1, date2);
  }
  function GetPreview() {
    const unsubscribeGoals = GoalsStore.subscribe((value) => {
      Detials.push(value);
    });

    const unsubscribeAudience = AudienceStore.subscribe((value) => {
      Detials.push(value);
    });

    const unsubscribeMedia = Selected_Library_Store.subscribe((value) => {
      Detials.push(value);
    });

    const unsubscribeText = textStore.subscribe((value) => {
      Detials.push(value);
    });
    const unsubscribeSchedule = ScheduleStore.subscribe((value) => {
      schedule_infos = value;
    });

    return () => {
      unsubscribeGoals();
      unsubscribeAudience();
      unsubscribeMedia();
      unsubscribeText();
      unsubscribeSchedule();
    };
  }
  function AutoFillformDetails() {
    if ($ScheduleStore.length != 0) {
      scheduleStart = new Date($ScheduleStore.start);
      scheduleEnd = new Date($ScheduleStore.end);
      schedule_infos.days = $ScheduleStore.days;
      schedule_infos.daily_spend = $ScheduleStore.daily_spend;
      reach_range = $ScheduleStore.reach_range;
    }
  }

  onMount(() => {
    GetPreview();
    AutoFillformDetails();
  });
</script>

<div class="bg-white lg:p-8 p-4 rounded-xl sm:mt-5 drop-shadow-md flex-1">
  <div class="flex flex-col gap-[20px] pb-6">
    <h1 class="flex items-center gap-2.5 text-lg text-font_dark">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <path
          d="M31 21.5V18.8C31 17.1198 31 16.2798 30.673 15.638C30.3854 15.0735 29.9265 14.6146 29.362 14.327C28.7202 14 27.8802 14 26.2 14H17.8C16.1198 14 15.2798 14 14.638 14.327C14.0735 14.6146 13.6146 15.0735 13.327 15.638C13 16.2798 13 17.1198 13 18.8V27.2C13 28.8802 13 29.7202 13.327 30.362C13.6146 30.9265 14.0735 31.3854 14.638 31.673C15.2798 32 16.1198 32 17.8 32H22.5M31 20H13M26 12V16M18 12V16M28 31V25M25 28H31"
          stroke="#0D64E8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="1"
          y="1"
          width="42"
          height="42"
          rx="9"
          stroke="#0D64E8"
          stroke-width="2"
        />
      </svg>
      <div>
        <div class="font-bold">Schedule</div>
        <div class="text-blue-primary text-xs">
          <span class="font-bold">{percent_optimization}%</span> of text optimized
        </div>
      </div>
    </h1>

    <hr class="bg-gray-200 h-[1px]" />

    <div
      class="flex sm:flex-row flex-col bg-blue-bglight text-blue-primary text-sm p-3 rounded-md relative sm:gap-8 gap-4 sm:items-end"
    >
      <div class="flex-1 flex gap-1">
        <div>
          <svg
            class="w-4 h-4 mt-0.5"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 2C5.18486 2 2.5 4.68486 2.5 8C2.5 11.3151 5.18486 14 8.5 14C11.8151 14 14.5 11.3151 14.5 8C14.5 4.68486 11.8151 2 8.5 2ZM12.2171 10.9677C11.835 11.335 11.3189 11.4739 10.7382 10.7345L8.99627 8.61538C8.7134 8.27295 8.18735 8.28288 7.91439 8.63027L6.29653 10.7146C5.67618 11.5087 5.1402 11.3201 4.74814 10.9132C4.11786 10.1042 3.74069 9.09677 3.74069 7.99504C3.74069 5.36973 5.87469 3.23573 8.5 3.23573C11.1253 3.23573 13.2593 5.36973 13.2593 7.99504C13.2593 9.11663 12.8672 10.1489 12.2171 10.9628V10.9677Z"
              fill="#0D64E8"
            />
          </svg>
        </div>
        <div>
          <div class="font-semibold">Colocio recommends:</div>
          <div class="text-xs">
            Daily spend of $500.00 from 1 December 2023 to 23 December 2023 to
            ensure the optimal reach of up to 1 500k new viewers and an 80%
            increase in engagement.
          </div>
        </div>
      </div>
      <button
        on:click={applyRecommendation}
        type="button"
        class="text-white flex items-center justify-center gap-2 bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm py-2.5 h-[32px] text-[14px] sm:max-w-[66px] w-full px-[14px]"
      >
        Apply
      </button>
    </div>
    <div>
      <h3 class="text-font_dark font-bold mb-4 text-[14px]">Duration</h3>
      <div class="sm:grid flex sm:flex-none flex-col grid-cols-2 gap-[20px]">
        <div class="col-span-1 flex flex-col gap-1">
          <label for="start" class="font-medium text-gray-600 text-[14px]"
            >Start date/time</label
          >
          <div class="relative datepicker-main">
            <Flatpickr
              bind:value={scheduleStart}
              options={{ enableTime: true }}
              on:change={handleDateChange}
            />
            <span
              class="bg-transparent absolute right-3 top-3 pointer-events-none"
            >
              <img
                src="/icons/calendar_black.svg"
                alt="calendar"
                class="w-4 h-4"
              />
            </span>
          </div>
        </div>
        <div class="flex items-center col-span-2">
          <input
            id="green-radio"
            type="radio"
            value=""
            name="colored-radio"
            class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
          />
          <label for="green-radio" class="ml-2 text-sm text-gray-600"
            >Run ad continuously</label
          >
        </div>
        <div class="flex items-center col-span-2">
          <input
            id="green-radio"
            type="radio"
            value=""
            name="colored-radio"
            class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
          />
          <label for="green-radio" class="ml-2 text-sm text-gray-600"
            >Choose end date/time</label
          >
        </div>
        <div class="col-span-1 flex flex-col gap-1">
          <label for="start" class="font-medium text-gray-600 text-[14px]"
            >End date/time</label
          >
          <div class="relative datepicker-main">
            <Flatpickr
              bind:value={scheduleEnd}
              options={{ enableTime: true }}
              on:change={handleDateChange}
            />
            <span
              class="bg-transparent absolute right-3 top-3 pointer-events-none"
            >
              <img
                src="/icons/calendar_black.svg"
                alt="calendar"
                class="w-4 h-4"
              />
            </span>
          </div>
        </div>
        <div class="col-span-1 flex flex-col gap-1">
          <label for="age" class="font-medium text-gray-600 text-[14px]"
            >Days</label
          >
          <select
            bind:value={schedule_infos.days}
            id="age"
            class="bg-white border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            {#each Array(30) as day, index}
              <option value={index}>{index}</option>
            {/each}
          </select>
        </div>
        <hr class="bg-gray-200 h-[1px] col-span-2" />
        <h3 class="text-font_dark font-bold col-span-2 text-[14px]">Budget</h3>
        <div class="flex items-center col-span-2">
          <input
            checked
            id="green-checkbox"
            type="checkbox"
            value=""
            class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
          />
          <label for="green-radio" class="ml-2 text-sm text-gray-600"
            >Allow me to boost campaign at any stage</label
          >
        </div>
        <div
          class="col-span-2 flex flex-col justify-center items-center gap-2"
          style="display: none;"
        >
          <span class="text-gray-600 font-medium">Daily spend</span>
          <span
            class="p-4 border border-gray-300 text-3xl font-bold text-gray-600 rounded-md w-[300px] text-center"
            >$ {schedule_infos.daily_spend}</span
          >
        </div>
        <div class="col-span-2 flex gap-2" style="display: none;">
          <p class="text-gray-600 text-xs flex">R 25.00</p>

          <input
            id="range-budget"
            type="range"
            bind:value={schedule_infos.daily_spend}
            class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointe range-slider"
          />
          <p class="text-gray-600 text-xs flex">R 2000.00</p>
        </div>

        <!--<hr class="bg-gray-200 h-[1px] col-span-2" />
                    <h3 class="text-font_dark font-bold col-span-2">Reach</h3>-->

        <div class="col-span-2 flex flex-col justify-center items-center gap-2">
          <span class="text-gray-600 font-medium">Total daily spend</span>
          <span
            class="p-[12px] border border-gray-300 text-[28px] h-[61px] font-bold text-gray-600 rounded-md sm:w-[303px] w-full text-center"
            >$ {reach_range}</span
          >
        </div>
        <div class="col-span-2 items-center flex gap-2">
          <p class="text-gray-600 text-xs flex">$ 0</p>

          <input
            id="range-reach"
            type="range"
            bind:value={reach_range}
            class="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointe range-slider"
          />
          <p class="text-gray-600 text-xs flex">$ 2000</p>
        </div>
        <!--<hr class="bg-gray-200 h-[1px] col-span-2" />-->
        <div class="col-span-2">
          <p class="text-[#4B5563] text-[14px] mb-[20px]">Per platform:</p>
          <div class="flex flex-col gap-[20px] mb-[8px] overflow-auto">
            <div class="flex gap-[24px] items-center">
              <div class="flex gap-[7px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex justify-center items-center"
                  ><path
                    d="M10.9785 9.3L11.334 6.9835H9.11127V5.48025C9.11127 4.8465 9.42177 4.22875 10.4173 4.22875H11.4278V2.2565C11.4278 2.2565 10.5108 2.1 9.63402 2.1C7.80352 2.1 6.60702 3.2095 6.60702 5.218V6.9835H4.57227V9.3H6.60702V14.9H9.11127V9.3H10.9785Z"
                    fill="#111827"
                  /></svg
                >
                <p
                  class="text-[#111827] text-[14px] whitespace-nowrap min-w-[77px]"
                >
                  Facebook
                </p>
              </div>
              <div class="relative">
                <input
                  type="number"
                  value="1000"
                  class="border-[#D1D5DB] border-[1px] h-[32px] max-w-[115px] min-w-[115px] w-full text-[#4B5563] text-[14px] rounded-md pl-[30px]"
                />
                <span class="absolute left-[15px] top-[50%] translate-y-[-50%]"
                  >$</span
                >
              </div>
              <div class="items-center flex gap-2 w-full">
                <p class="text-gray-600 text-xs flex whitespace-nowrap">$ 25</p>

                <input
                  type="range"
                  class="flex-1 bg-gray-200 rounded-lg cursor-pointe range-slider h-1"
                />
                <p class="text-gray-600 text-xs flex whitespace-nowrap">
                  $ 2000
                </p>
              </div>
            </div>
            <div class="flex gap-[24px] items-center">
              <div class="flex gap-[7px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6.66667 2.5C4.36917 2.5 2.5 4.36917 2.5 6.66667V13.3333C2.5 15.6308 4.36917 17.5 6.66667 17.5H13.3333C15.6308 17.5 17.5 15.6308 17.5 13.3333V6.66667C17.5 4.36917 15.6308 2.5 13.3333 2.5H6.66667ZM6.66667 4.16667H13.3333C14.7117 4.16667 15.8333 5.28833 15.8333 6.66667V13.3333C15.8333 14.7117 14.7117 15.8333 13.3333 15.8333H6.66667C5.28833 15.8333 4.16667 14.7117 4.16667 13.3333V6.66667C4.16667 5.28833 5.28833 4.16667 6.66667 4.16667ZM14.1667 5C13.9457 5 13.7337 5.0878 13.5774 5.24408C13.4211 5.40036 13.3333 5.61232 13.3333 5.83333C13.3333 6.05435 13.4211 6.26631 13.5774 6.42259C13.7337 6.57887 13.9457 6.66667 14.1667 6.66667C14.3877 6.66667 14.5996 6.57887 14.7559 6.42259C14.9122 6.26631 15 6.05435 15 5.83333C15 5.61232 14.9122 5.40036 14.7559 5.24408C14.5996 5.0878 14.3877 5 14.1667 5ZM10 5.83333C7.7025 5.83333 5.83333 7.7025 5.83333 10C5.83333 12.2975 7.7025 14.1667 10 14.1667C12.2975 14.1667 14.1667 12.2975 14.1667 10C14.1667 7.7025 12.2975 5.83333 10 5.83333ZM10 7.5C11.3783 7.5 12.5 8.62167 12.5 10C12.5 11.3783 11.3783 12.5 10 12.5C8.62167 12.5 7.5 11.3783 7.5 10C7.5 8.62167 8.62167 7.5 10 7.5Z"
                    fill="black"
                  />
                </svg>
                <p
                  class="text-[#111827] text-[14px] whitespace-nowrap min-w-[77px]"
                >
                  Instagram
                </p>
              </div>
              <div class="relative">
                <input
                  type="number"
                  value="1000"
                  class="border-[#D1D5DB] border-[1px] h-[32px] max-w-[115px] min-w-[115px] w-full text-[#4B5563] text-[14px] rounded-md pl-[30px]"
                />
                <span class="absolute left-[15px] top-[50%] translate-y-[-50%]"
                  >$</span
                >
              </div>
              <div class="items-center flex gap-2 w-full">
                <p class="text-gray-600 text-xs flex whitespace-nowrap">$ 25</p>

                <input
                  type="range"
                  class="flex-1 bg-gray-200 rounded-lg cursor-pointe range-slider h-1"
                />
                <p class="text-gray-600 text-xs flex whitespace-nowrap">
                  $ 2000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--{#if showButton}-->
  <div class="flex items-center justify-between gap-4">
    <button
      on:click={() => {
        dispatch("prevStep");
      }}
      type="button"
      class="py-2.5 sm:max-w-[100px] max-w-[50%] w-full px-5 flex items-center justify-center gap-2 text-sm font-medium text-[#4B5563] focus:outline-none bg-white rounded-md border border-[#D1D5DB] hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 h-[40px]"
    >
      Previous
    </button>
    <button
      on:click={NestStep}
      type="button"
      class="text-white flex items-center justify-center gap-2 sm:max-w-[100px] max-w-[50%] w-full bg-[#0D64E8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 h-[40px]"
    >
      Next
    </button>
  </div>
  <!--{:else}-->
  <!--<div class="flex gap-2 justify-end">
                  <button
                    class="border-[#D1D5DB] border-[1px] rounded-[6px] text-[#4B5563] text-[14px] h-[40px] px-[13px]"
                    >Cancel</button
                  >
                  <button
                    class="bg-[#0D64E8] rounded-[6px] text-white text-[14px] h-[40px] px-[13px] flex gap-2 items-center"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.6612 3.125C13.7625 3.125 13.8597 3.16524 13.9313 3.23687L16.7631 6.06869C16.8348 6.14032 16.875 6.23746 16.875 6.33876V16.4931C16.875 16.704 16.704 16.875 16.4931 16.875H3.50694C3.296 16.875 3.125 16.704 3.125 16.4931V3.50694C3.125 3.296 3.296 3.125 3.50694 3.125H13.6612Z"
                        stroke="#F9FAFB"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.18056 11.1458C6.18056 10.9349 6.35156 10.7639 6.5625 10.7639H13.4375C13.6484 10.7639 13.8194 10.9349 13.8194 11.1458V16.4931C13.8194 16.704 13.6484 16.875 13.4375 16.875H6.5625C6.35156 16.875 6.18056 16.704 6.18056 16.4931V11.1458Z"
                        stroke="#F9FAFB"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.94444 3.50694C6.94444 3.296 7.11545 3.125 7.32639 3.125H12.6736C12.8846 3.125 13.0556 3.296 13.0556 3.50694V6.5625C13.0556 6.77344 12.8846 6.94444 12.6736 6.94444H7.32639C7.11545 6.94444 6.94444 6.77344 6.94444 6.5625V3.50694Z"
                        stroke="#F9FAFB"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg> Save</button
                  >
                </div>-->
  <!--{/if}-->
</div>

<style>
  .range-slider {
    --min: 0;
    --max: 100;
    --value: 50;
  }
</style>
