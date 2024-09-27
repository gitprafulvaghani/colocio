<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import ScheduleCard from "./promotions/ScheduleCard.svelte";
  import { get } from "svelte/store";
  import {
    automatedAudience,
    automatedSchedule,
    schedule_Eidit_Model,
  } from "$lib/stores/stores";
  const dispatch = createEventDispatcher();

  let percent_optimization = 0;
  let schedule_infos = {
    start: "",
    end: "",
    days: 0,
    daily_spend: 1000,
    daily_reach: 1500,
  };
  export let shareDetails;

  let budget_range = 100;
  let reach_range = 50;

  function applyRecommendation() {
    percent_optimization = 100;
    schedule_infos.start = "1/04/2024, 7:00AM";
    schedule_infos.end = "23/04/2024, 7:00AM";
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

  const handleSubmitSchedule = () => {
    const scheduleData = {
      startDate: shareDetails.start || "",
      endDate: shareDetails.end || "",
      days: shareDetails.days || "",
      Total_spend: "",
    };
    automatedAudience.update((current: {}) => {
      return { ...current, scheduleData };
    });
    automatedSchedule.set(schedule_infos);
    schedule_Eidit_Model.set(false);
  };
</script>

<div
  class="relative z-50"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
    class="fixed inset-0 transition-opacity backdrop-blur-sm"
    style="background:rgba(0, 0, 0, 0.12)"
  />

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div
      class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left drop-shadow transition-all sm:my-8 sm:w-full sm:max-w-3xl flex flex-col justify-between"
      >
        <!-- <ScheduleCard showButton={false} /> -->
        <button
          on:click={() => schedule_Eidit_Model.set(false)}
          class="absolute right-[13px] top-[17px] z-10"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            ><path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.57613 4.37575C3.81044 4.14143 4.19034 4.14143 4.42465 4.37575L7.60039 7.55148L10.7761 4.37575C11.0104 4.14143 11.3903 4.14143 11.6247 4.37575C11.859 4.61006 11.859 4.98996 11.6247 5.22428L8.44892 8.40001L11.6247 11.5757C11.859 11.8101 11.859 12.19 11.6247 12.4243C11.3903 12.6586 11.0104 12.6586 10.7761 12.4243L7.60039 9.24854L4.42465 12.4243C4.19034 12.6586 3.81044 12.6586 3.57613 12.4243C3.34181 12.19 3.34181 11.8101 3.57613 11.5757L6.75186 8.40001L3.57613 5.22428C3.34181 4.98996 3.34181 4.61006 3.57613 4.37575Z"
              fill="#1B1D1F"
            /></svg
          ></button
        >
        <div
          class="bg-white lg:p-8 p-4 rounded-xl sm:mt-5 drop-shadow-md flex-1"
        >
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
                  <span class="font-bold">{percent_optimization}%</span> of text
                  optimized
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
                    Daily spend of $500.00 from 1 December 2023 to 23 December
                    2023 to ensure the optimal reach of up to 1 500k new viewers
                    and an 80% increase in engagement.
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
              <h3 class="text-font_dark font-bold mb-4 text-[14px]">
                Duration
              </h3>
              <div
                class="sm:grid flex sm:flex-none flex-col grid-cols-2 gap-[20px]"
              >
                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="start"
                    class="font-medium text-gray-600 text-[14px]"
                  />
                  <div class="relative">
                    <input
                      type="text"
                      bind:value={shareDetails.start}
                      id="start"
                      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                  <label
                    for="start"
                    class="font-medium text-gray-600 text-[14px]"
                    >End date/time</label
                  >
                  <div class="relative">
                    <input
                      type="text"
                      bind:value={shareDetails.end}
                      id="start"
                      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                <div class="col-span-1 flex flex-col gap-1">
                  <label for="age" class="font-medium text-gray-600 text-[14px]"
                    >Days</label
                  >
                  <select
                    bind:value={shareDetails.days}
                    id="age"
                    class="bg-white border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    {#each Array(30) as day, index}
                      <option value={index}>{index}</option>
                    {/each}
                  </select>
                </div>
                <hr class="bg-gray-200 h-[1px] col-span-2" />
                <h3 class="text-font_dark font-bold col-span-2 text-[14px]">
                  Budget
                </h3>
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
                    bind:value={budget_range}
                    class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointe range-slider"
                  />
                  <p class="text-gray-600 text-xs flex">R 2000.00</p>
                </div>

                <!--<hr class="bg-gray-200 h-[1px] col-span-2" />
                <h3 class="text-font_dark font-bold col-span-2">Reach</h3>-->

                <div
                  class="col-span-2 flex flex-col justify-center items-center gap-2"
                >
                  <span class="text-gray-600 font-medium"
                    >Total daily spend</span
                  >
                  <span
                    class="p-[12px] border border-gray-300 text-[28px] h-[61px] font-bold text-gray-600 rounded-md sm:w-[303px] w-full text-center"
                    >$ {shareDetails.Total_spend}</span
                  >
                </div>
                <div class="col-span-2 items-center flex gap-2">
                  <p class="text-gray-600 text-xs flex">$ 0</p>

                  <input
                    id="range-reach"
                    type="range"
                    bind:value={shareDetails.reach_range}
                    class="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointe range-slider"
                  />
                  <p class="text-gray-600 text-xs flex">$ 2000</p>
                </div>
                <!--<hr class="bg-gray-200 h-[1px] col-span-2" />-->
                <div class="col-span-2">
                  <p class="text-[#4B5563] text-[14px] mb-[20px]">
                    Per platform:
                  </p>
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
                        <span
                          class="absolute left-[15px] top-[50%] translate-y-[-50%]"
                          >$</span
                        >
                      </div>
                      <div class="items-center flex gap-2 w-full">
                        <p class="text-gray-600 text-xs flex whitespace-nowrap">
                          $ 25
                        </p>

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
                        <span
                          class="absolute left-[15px] top-[50%] translate-y-[-50%]"
                          >$</span
                        >
                      </div>
                      <div class="items-center flex gap-2 w-full">
                        <p class="text-gray-600 text-xs flex whitespace-nowrap">
                          $ 25
                        </p>

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
                            d="M9.99531 3.75H10.0103C10.5714 3.75 11.0918 3.92161 11.509 4.20921H11.5113C11.7996 4.40735 12.0387 4.66157 12.2094 4.95087L15 9.38459L15.0169 9.42011L17.1531 12.804C17.3805 13.1537 17.5 13.5551 17.5 13.9651C17.5 14.2865 17.4269 14.5938 17.2951 14.8724L17.2975 14.8814C17.1976 15.0885 17.0654 15.2781 16.9018 15.4497C16.7162 15.6461 16.4968 15.8148 16.2474 15.9444C15.8785 16.1409 15.4585 16.2453 15.0319 16.2496H14.9902C14.4482 16.2496 13.9232 16.0891 13.4915 15.7904H13.4891C13.2008 15.5922 12.9617 15.338 12.7911 15.0487L10.0005 10.615L9.98359 10.5795L7.83705 7.18014C7.61532 6.8322 7.5 6.43762 7.5 6.03448C7.5 5.79353 7.54125 5.55986 7.61766 5.34117L7.62188 5.32748L7.62938 5.30993C7.66126 5.22092 7.70251 5.1182 7.70251 5.1182C7.80002 4.91321 7.93456 4.72405 8.09301 4.55671L8.13238 4.51435L8.14176 4.50536V4.50322H8.1441L8.14926 4.49637L8.15442 4.49466C8.32271 4.32518 8.52335 4.17583 8.75258 4.05514C9.12151 3.8587 9.54153 3.75428 9.96812 3.75H9.99531ZM5.00516 16.25H4.96812C4.54106 16.2453 4.12104 16.1409 3.75258 15.9449C3.50319 15.8152 3.2838 15.6466 3.09816 15.4501C2.93456 15.2785 2.80236 15.0889 2.70251 14.8818L2.70486 14.8728C2.56797 14.5874 2.5 14.2775 2.5 13.9655C2.5 13.5397 2.62704 13.1434 2.8469 12.8045L4.98312 9.42054L5 9.38501L6.89949 6.36915C6.9459 6.73677 7.07013 7.09797 7.27077 7.4275L7.30686 7.48357L9.41637 10.8247V10.8183L9.45809 10.9004L9.63857 11.1902L7.20889 15.0487C7.03825 15.338 6.79871 15.5926 6.51088 15.7904H6.50853C6.07679 16.0895 5.55175 16.2496 5.00984 16.2496L5.00516 16.25Z"
                            fill="black"
                          />
                        </svg>
                        <p
                          class="text-[#111827] text-[14px] whitespace-nowrap min-w-[77px]"
                        >
                          Google Ads
                        </p>
                      </div>
                      <div class="relative">
                        <input
                          type="number"
                          value="1000"
                          class="border-[#D1D5DB] border-[1px] h-[32px] max-w-[115px] min-w-[115px] w-full text-[#4B5563] text-[14px] rounded-md pl-[30px]"
                        />
                        <span
                          class="absolute left-[15px] top-[50%] translate-y-[-50%]"
                          >$</span
                        >
                      </div>
                      <div class="items-center flex gap-2 w-full">
                        <p class="text-gray-600 text-xs flex whitespace-nowrap">
                          $ 25
                        </p>

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
          <div class="flex gap-2 justify-end">
            <button
              on:click={() => schedule_Eidit_Model.set(false)}
              class="border-[#D1D5DB] border-[1px] rounded-[6px] text-[#4B5563] text-[14px] h-[40px] px-[13px]"
              >Cancel</button
            >
            <button
              on:click={handleSubmitSchedule}
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
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
