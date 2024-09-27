<script lang="ts">
  import {
    AudienceStore,
    GoalsStore,
    ScheduleStore,
    textStore,
    library,
  } from "$lib/stores/stores";
  import { createEventDispatcher } from "svelte";
  import MediaShow from "./MediaShow.svelte";
  import { onMount } from "svelte";
  import {
    createAdSet,
    createCampaign,
  } from "$lib/services/NewFacebook/NewFacebookService";
  const dispatch = createEventDispatcher();
  import { isEmpty } from "$lib/services/promotionservice";
  import Toast from "$lib/components/notification/Toast.svelte";
  import { notification } from "../notification/notification";
  import {
    IsPreviewShow,
    defaultAudienceInfos,
  } from "$lib/services/interface/promotionstore";
  import type { AudienceInfos } from "$lib/services/interface/promotions";

  let Text_Detials = {};
  let GoalsDetails = {
    goalselected: "",
    keywords: [],
  };
  let selected_library: any[] = [];

  $: {
    selected_library = $library.filter((media: any) => media.selected);
  }

  export let audience_infos: AudienceInfos = defaultAudienceInfos;
  export let schedule_infos = {
    start: "",
    end: "",
    days: 0,
    daily_spend: 1000,
    daily_reach: 1500,
  };

  let PreviewDataInfo: any = true;

  let percent_optimization = 70;

  function handleEdit(step: number) {
    dispatch("edit", step);
  }

  function GetPreview() {
    const unsubscribeGoals = GoalsStore.subscribe((value: any) => {
      if (!isEmpty(value)) {
        GoalsDetails = value;
      }
    });
    const unsubscribeAudience = AudienceStore.subscribe((value: any) => {
      if (!isEmpty(value)) {
        audience_infos = value;
      }
    });

    const unsubscribeText = textStore.subscribe((value: any) => {
      if (!isEmpty(value)) {
        Text_Detials = value;
      }
    });
    const unsubscribeSchedule = ScheduleStore.subscribe((value: any) => {
      if (!isEmpty(value)) {
        schedule_infos = value;
      }
    });

    return () => {
      unsubscribeGoals();
      unsubscribeAudience();
      unsubscribeText();
      unsubscribeSchedule();
    };
  }

  onMount(() => {
    GetPreview();
  });
  // create
  async function HandaleSchedule() {
    const CampaignID = await createCampaign(GoalsDetails);
    await createAdSet(
      GoalsDetails,
      audience_infos,
      selected_library,
      Text_Detials,
      schedule_infos,
      "save"
    );
  }
  console.log(
    "GoalsDetails",
    GoalsDetails,
    audience_infos,
    selected_library,
    Text_Detials,
    schedule_infos
  );
</script>

<Toast />

<div class="flex lg:flex-row flex-col sm:gap-[16px] gap-3 mt-5 items-start">
  <div class="bg-white lg:p-8 p-4 rounded-xl drop-shadow-md flex-1 w-full">
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-col gap-[20px] pb-8">
        <h1 class="flex items-center gap-2.5 font-bold text-lg text-font_dark">
          Online Sales Campaign 2023
        </h1>
        <div
          class="sm:flex hidden items-center bg-blue-bglight text-blue-primary text-sm p-4 rounded-md relative"
        >
          <div
            class="flex xl:gap-4 gap-2 items-center border-r-[#589AFF] border-r-[1px] xl:pr-[32px] pr-[16px] py-[6.5px]"
          >
            <svg
              width="66"
              height="65"
              viewBox="0 0 66 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33 1.38382e-05C50.9492 1.30536e-05 65.5 14.5508 65.5 32.5C65.5 50.4492 50.9492 65 33 65C15.0507 65 0.499999 50.4493 0.499999 32.5C0.499998 14.5508 15.0507 1.46228e-05 33 1.38382e-05ZM33 47.8205C41.4613 47.8205 48.3205 40.9613 48.3205 32.5C48.3205 24.0387 41.4613 17.1795 33 17.1795C24.5387 17.1795 17.6795 24.0387 17.6795 32.5C17.6795 40.9613 24.5387 47.8205 33 47.8205Z"
                fill="#589AFF"
              />
              <path
                d="M33 1.38382e-05C38.1207 1.36143e-05 43.169 1.21002 47.7333 3.53141C52.2976 5.8528 56.2488 9.21987 59.2648 13.3582C62.2808 17.4965 64.2762 22.2889 65.0885 27.3448C65.9008 32.4007 65.5068 37.5769 63.9388 42.4517C62.3709 47.3264 59.6732 51.7617 56.0657 55.3959C52.4582 59.0302 48.043 61.7606 43.1799 63.3645C38.3169 64.9685 33.1437 65.4006 28.0819 64.6257C23.0201 63.8508 18.2131 61.8908 14.0527 58.9055L24.0682 44.9476C26.0295 46.3549 28.2955 47.2788 30.6816 47.6441C33.0677 48.0094 35.5064 47.8057 37.7988 47.0496C40.0913 46.2935 42.1726 45.0064 43.8732 43.2932C45.5737 41.58 46.8454 39.4892 47.5846 37.1912C48.3237 34.8933 48.5094 32.4532 48.1265 30.0698C47.7436 27.6865 46.803 25.4273 45.3812 23.4765C43.9595 21.5257 42.0969 19.9385 39.9453 18.8442C37.7937 17.7499 35.4139 17.1795 33 17.1795L33 1.38382e-05Z"
                fill="#0D64E8"
              />
            </svg>

            <div class="flex items-center gap-1">
              <img src="/icons/colocio.svg" alt="Instagram" class="w-4 h-4" />
              <p class="text-blue-primary">
                Optimised {percent_optimization}%
              </p>
            </div>
          </div>
          <hr class="bg-blue-primary w-[1px] h-full" />
          <div
            class="flex flex-col text-blue-primary text-sm xl:pl-[32px] pl-[16px]"
          >
            <div class="flex items-center">
              <p class="w-24">Text</p>
              <p class="">100%</p>
            </div>
            <div class="flex items-center">
              <p class="w-24">Audience</p>
              <p class="">50%</p>
            </div>
            <div class="flex items-center">
              <p class="w-24">Schedule</p>
              <p class="">65%</p>
            </div>
          </div>
        </div>
        <hr class="bg-gray-200 h-[1px]" />
        <div>
          <div class="flex gap-4">
            <img src="/icons/target.svg" alt="Instagram" class="w-6 h-6" />
            <div class="flex flex-col flex-1">
              <h3 class="text-font_dark font-bold text-lg">Goal</h3>
            </div>
            <div>
              <button
                on:click={() => {
                  handleEdit(2);
                }}
                type="button"
                class="bg-transparent border border-gray-200 hover:bg-gray-50 rounded-md flex justify-center gap-2 items-center px-3 py-1 h-[32px] text-[14px]"
              >
                <img src="/icons/edit.svg" alt="Instagram" class="w-5 h-5" />
                Edit
              </button>
            </div>
          </div>
          <p class="text-font_dark text-[14px] flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M9.69887 17.0839C8.41148 17.0839 7.32041 16.6285 6.42564 15.7178C5.53088 14.807 5.0835 13.7052 5.0835 12.4125V8.00548L8.64916 11.6032L7.779 12.4862L6.33347 11.0086V12.4125C6.33347 13.3505 6.6612 14.1553 7.31664 14.8268C7.9721 15.4982 8.76618 15.834 9.69887 15.834C10.6316 15.834 11.4256 15.4982 12.0811 14.8268C12.7365 14.1553 13.0642 13.3505 13.0642 12.4125V9.68651C12.591 9.54014 12.2055 9.27386 11.908 8.88765C11.6105 8.50143 11.4617 8.06046 11.4617 7.56474C11.4617 7.06901 11.6091 6.62671 11.904 6.23782C12.1989 5.84893 12.5856 5.5813 13.0642 5.43494V2.08398H14.3142V5.43494C14.7928 5.5813 15.1796 5.84893 15.4745 6.23782C15.7694 6.62671 15.9168 7.06901 15.9168 7.56474C15.9168 8.06046 15.7694 8.50356 15.4745 8.89405C15.1796 9.28455 14.7928 9.5487 14.3142 9.68651V12.4125C14.3142 13.7052 13.8668 14.807 12.9721 15.7178C12.0773 16.6285 10.9862 17.0839 9.69887 17.0839ZM13.6892 8.54232C13.9627 8.54232 14.194 8.44776 14.3831 8.25865C14.5723 8.06955 14.6668 7.83825 14.6668 7.56474C14.6668 7.29124 14.5723 7.05993 14.3831 6.87082C14.194 6.68172 13.9627 6.58717 13.6892 6.58717C13.4157 6.58717 13.1844 6.68172 12.9953 6.87082C12.8062 7.05993 12.7117 7.29124 12.7117 7.56474C12.7117 7.83825 12.8062 8.06955 12.9953 8.25865C13.1844 8.44776 13.4157 8.54232 13.6892 8.54232Z"
                fill="#111827"
              />
            </svg>
            <!--leads-->
            {#if GoalsDetails.goalselected != undefined}
              {GoalsDetails.goalselected}
            {:else}
              No Goalselected selected
            {/if}
          </p>
          <p class="text-[#6B7280] text-[14px] mt-[20px]">Keywords</p>
          <div class="mt-[7px] flex gap-2 flex-wrap">
            {#each GoalsDetails.keywords as location}
              <button
                type="button"
                disabled
                class="text-font_dark shadow-[0px_1px_3px_0px_#00000029] w-fit p-1.5 py-[2px] rounded-md text-[14px] h-[25px]"
              >
                <span>{location}</span>
              </button>
            {:else}
              <span>No AdKeywords selected</span>
            {/each}
          </div>
          <!--{/each}-->
        </div>
        <hr class="bg-gray-200 h-[1px]" />
        <div class="flex gap-4">
          <img src="/icons/media.svg" alt="Instagram" class="w-6 h-6" />
          <div class="flex flex-col flex-1">
            <h3 class="text-font_dark font-bold text-lg leading-[21px]">
              Media
            </h3>
            <p
              class="text-gray-400 flex items-center gap-2 leading-[16px] text-[14px]"
            >
              See preview right
            </p>
          </div>
          <div>
            <button
              on:click={() => {
                handleEdit(3);
              }}
              type="button"
              class="bg-transparent text-[14px] border border-gray-200 hover:bg-gray-50 rounded-md flex justify-center gap-2 items-center px-3 py- h-[32px]"
            >
              <img src="/icons/edit.svg" alt="Instagram" class="w-5 h-5" />
              Edit
            </button>
          </div>
        </div>
        <hr class="bg-gray-200 h-[1px]" />
        <div class="flex gap-4">
          <img src="/icons/text.svg" alt="Instagram" class="w-6 h-6" />
          <div class="flex flex-col flex-1">
            <h3 class="text-font_dark font-bold text-lg leading-[21px]">
              Text
            </h3>
            <p
              class="text-gray-400 flex items-center gap-2 leading-[16px] text-[14px]"
            >
              See preview right
            </p>
          </div>
          <div>
            <button
              on:click={() => {
                handleEdit(4);
              }}
              type="button"
              class="bg-transparent text-[14px] border border-gray-200 hover:bg-gray-50 rounded-md flex justify-center gap-2 items-center px-3 py-1 h-[32px]"
            >
              <img src="/icons/edit.svg" alt="Instagram" class="w-5 h-5" />
              Edit
            </button>
          </div>
        </div>
        <hr class="bg-gray-200 h-[1px]" />
        <div class="flex gap-4">
          <img src="/icons/user_group.svg" alt="Instagram" class="w-6 h-6" />
          <div class="flex flex-col flex-1">
            <h3 class="text-font_dark font-bold text-lg">Audience</h3>
          </div>
          <div>
            <button
              on:click={() => {
                handleEdit(5);
              }}
              type="button"
              class="bg-transparent text-[14px] border border-gray-200 hover:bg-gray-50 rounded-md flex justify-center gap-2 items-center px-3 py-1 h-[32px]"
            >
              <img src="/icons/edit.svg" alt="Instagram" class="w-5 h-5" />
              Edit
            </button>
          </div>
        </div>
        <div class="inline-grid grid-cols-[120px_auto] w-fit gap-2 mt-[-20px]">
          <p class="text-[#6B7280] text-[14px]">Age</p>
          <p class="text-font_dark text-[14px]">{audience_infos.age}</p>
          <p class="text-[#6B7280] text-[14px]">Gender</p>
          <p class="text-font_dark text-[14px]">
            {audience_infos.gender}
          </p>
          <p class="text-[#6B7280] text-[14px]">Location</p>
          <p class="text-font_dark flex flex-col text-[14px]">
            {#each audience_infos.locations as location}
              <span>{location}</span>
            {:else}
              <span>No location selected</span>
            {/each}
          </p>

          <p class="col-span-2 text-[#6B7280] text-[14px] mt-[4px]">
            Interests & behaviours
          </p>
          <p
            class="col-span-2 text-font_dark flex gap-2 items-center flex-wrap"
          >
            {#each audience_infos.interests as interest}
              <button
                type="button"
                disabled
                class="text-font_dark shadow-[0px_1px_3px_0px_#00000029] w-fit p-1.5 py-[2px] rounded-md text-[14px] h-[25px]"
                >{interest}</button
              >
            {:else}
              <span>No interest selected</span>
            {/each}
          </p>
          <p class="col-span-2 text-[#6B7280] text-[14px] mt-[4px]">Sources</p>
          <div class="flex gap-2 items-center flex-wrap col-span-2">
            <button
              type="button"
              disabled
              class="text-font_dark shadow-[0px_1px_3px_0px_#00000029] w-fit p-1.5 py-[2px] rounded-md text-[14px] h-[25px]"
              >Regularly engages</button
            >
            <button
              type="button"
              disabled
              class="text-font_dark shadow-[0px_1px_3px_0px_#00000029] w-fit p-1.5 py-[2px] rounded-md text-[14px] h-[25px]"
              >Regular website visitors</button
            >
            <button
              type="button"
              disabled
              class="text-font_dark shadow-[0px_1px_3px_0px_#00000029] w-fit p-1.5 py-[2px] rounded-md text-[14px] h-[25px]"
              >Regularly purchases</button
            >
          </div>
        </div>
        <hr class="bg-gray-200 h-[1px]" />
        <div class="flex gap-4">
          <img src="/icons/calendar_plus.svg" alt="Instagram" class="w-6 h-6" />
          <div class="flex flex-col flex-1">
            <h3 class="text-font_dark font-bold text-lg">Schedule</h3>
          </div>
          <div>
            <button
              on:click={() => {
                handleEdit(6);
              }}
              type="button"
              class="bg-transparent text-[14px] border border-gray-200 hover:bg-gray-50 rounded-md flex justify-center gap-2 items-center px-3 py-1 h-[32px]"
            >
              <img src="/icons/edit.svg" alt="Instagram" class="w-5 h-5" />
              Edit
            </button>
          </div>
        </div>

        <div class="inline-grid w-fit gap-2 grid-cols-[120px_auto]">
          <p class="text-[#6B7280] text-[14px]">Date/Time</p>
          <p class="text-font_dark text-[14px]">
            {schedule_infos.start} - {schedule_infos.end}
          </p>
          <p class="text-[#6B7280] text-[14px]">Days</p>
          <p class="text-font_dark text-[14px]">{schedule_infos.days}</p>
          <p class="text-[#6B7280] text-[14px]">Daily spend</p>
          <p class="text-font_dark text-[14px]">
            ${schedule_infos.daily_spend}
          </p>
          <p class="text-[#6B7280] text-[14px]">Total spend</p>
          <p class="text-font_dark text-[14px]">
            ${schedule_infos.daily_spend * schedule_infos.days}
          </p>
        </div>
      </div>
      <div class="flex items-center justify-between gap-4">
        <button
          on:click={() => {
            dispatch("prevStep");
          }}
          type="button"
          class="py-3 sm:max-w-[100px] max-w-[50%] w-full px-[14px] flex items-center justify-center gap-2 text-sm font-medium text-gray-600 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 h-[40px]"
        >
          Previous
        </button>
        <button
          id="schedule-btn"
          on:click={HandaleSchedule}
          type="button"
          class="text-white flex items-center justify-center gap-2 bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-[14px] py-3 sm:max-w-[118px] max-w-[50%] w-full h-[40px]"
        >
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.66599 7.33977H16.3327V5.25641C16.3327 5.1923 16.306 5.13353 16.2525 5.0801C16.1991 5.02668 16.1403 4.99997 16.0762 4.99997H4.92243C4.85832 4.99997 4.79955 5.02668 4.74612 5.0801C4.6927 5.13353 4.66599 5.1923 4.66599 5.25641V7.33977ZM4.92243 17.9166C4.50149 17.9166 4.14518 17.7708 3.85352 17.4791C3.56185 17.1875 3.41602 16.8311 3.41602 16.4102V5.25641C3.41602 4.83547 3.56185 4.47916 3.85352 4.18749C4.14518 3.89583 4.50149 3.74999 4.92243 3.74999H6.07629V1.98718H7.35831V3.74999H13.6724V1.98718H14.9224V3.74999H16.0762C16.4972 3.74999 16.8535 3.89583 17.1451 4.18749C17.4368 4.47916 17.5826 4.83547 17.5826 5.25641V9.80927C17.3829 9.72167 17.1788 9.65089 16.9705 9.59693C16.7621 9.54299 16.5495 9.50052 16.3327 9.46954V8.58975H4.66599V16.4102C4.66599 16.4743 4.6927 16.5331 4.74612 16.5865C4.79955 16.6399 4.85832 16.6666 4.92243 16.6666H10.3407C10.4112 16.8974 10.4964 17.1156 10.5963 17.3213C10.6962 17.5269 10.8097 17.7254 10.9369 17.9166H4.92243ZM15.6596 18.75C14.619 18.75 13.7339 18.3851 13.0042 17.6554C12.2745 16.9257 11.9096 16.0406 11.9096 15C11.9096 13.9594 12.2745 13.0742 13.0042 12.3445C13.7339 11.6148 14.619 11.25 15.6596 11.25C16.7002 11.25 17.5853 11.6148 18.315 12.3445C19.0447 13.0742 19.4096 13.9594 19.4096 15C19.4096 16.0406 19.0447 16.9257 18.315 17.6554C17.5853 18.3851 16.7002 18.75 15.6596 18.75ZM17.0474 16.907L17.5666 16.3878L16.0282 14.8493V12.5481H15.291V15.1506L17.0474 16.907Z"
              fill="white"
            />
          </svg>
          Schedule
        </button>
      </div>
    </div>
  </div>
  <button
    on:click={() => ($IsPreviewShow = !$IsPreviewShow)}
    class={`${
      $IsPreviewShow ? "bg-[#F4F9FF] border-[#E4EFFF] !text-[#0D64E8]" : ""
    } border-[#D1D5DB] border-[1px] text-[#4B5563] h-[32px] text-[14px] font-semibold rounded-md lg:hidden flex gap-[10px] justify-center items-center w-full`}
    >Preview
    <span class={`${$IsPreviewShow ? "rotate-180" : ""}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M4.89967 5.83398L9.99967 10.9847L15.0997 5.83398L16.6663 7.41968L9.99967 14.1673L3.33301 7.41968L4.89967 5.83398Z"
          fill={`${$IsPreviewShow ? "#0D64E8" : "#111827"}`}
        />
      </svg>
    </span>
  </button>
  <div
    class={` ${$IsPreviewShow ? "block lg:w-auto w-full" : "lg:block hidden"}`}
  >
    <MediaShow PreviewData={PreviewDataInfo} />
  </div>
</div>
