<script>
  import { notification } from '$lib/components/notification/notification';
  import Toast from '$lib/components/notification/Toast.svelte';
  import ModalMedia from '$lib/components/promotions/ModalMedia.svelte';
  import SocialMedia from '$lib/components/promotions/SocialMedia.svelte';
  import SubHeader from '$lib/components/promotions/SubHeader.svelte';
  import { createAdSetForShared } from '$lib/services/NewFacebook/NewFacebookService';
  import { get_AdSet_ById } from '$lib/services/NewFacebook/preview_Service';
  import {
    bool_modal_media,
    library,
    platforms_ad,
    StoreSharePost,
  } from '$lib/stores/stores';
  import 'flatpickr/dist/flatpickr.css';
  import { onMount } from 'svelte';
  import Flatpickr from 'svelte-flatpickr';
  import { writable } from 'svelte/store';

  let selectedStartDate = new Date();
  let selectedEndDate = new Date();

  let tab_selected = 'facebook';
  let userInput = '';
  let sharePost;
  let adSetData = writable({});
  let audienceData = writable({
    age: '',
    gender: '',
    locations: [],
    interests: [],
  });

  function HandleGenrateText() {
    tab_selected = 'instagram';
    useFacebookContent = true;
    IsAskColocio = true;
  }
  function GetSharePost() {
    const unsubscribe = StoreSharePost.subscribe(value => {
      sharePost = value;
    });
    return () => {
      unsubscribe();
    };
  }
  let colocio_prompt = '';
  let description = '';
  let instagramDesc = '';

  function generateDescriptionDemo() {
    colocio_prompt =
      'Promoted our Champaign Pool Party kits that includes champaign and snacks available on the online shop.';
  }
  async function GetPreview() {
    const AdSet = await get_AdSet_ById('23858751790020576');
    adSetData.set(AdSet);
    audienceData.set({
      age_max: AdSet.targeting.age_max,
      age_min: AdSet.targeting.age_min,
      location: AdSet.targeting.geo_locations.places,
      name: AdSet.name,
      campaign_id: AdSet.campaign_id,
    });
  }
  async function handleSchedule() {
    let platformData = $platforms_ad.filter(item => item.selected);
    let libraryData = $library.filter(item => item.selected);
    await createAdSetForShared(
      platformData,
      libraryData,
      description,
      instagramDesc,
      selectedStartDate,
      selectedEndDate,
      $audienceData
    );
    notification.success('Sharepost data saved succesfully !', 5000);
  }
  function checkStatus(name) {
    if (name === 'Tiktok' || name === 'X' || name === 'Youtube') {
      return true;
    } else {
      return false;
    }
  }
  onMount(() => {
    const unsubscribe = GetSharePost();
    return () => {
      unsubscribe();
    };
  });

  GetPreview();
</script>

<div class="p-[20px_12.5px]">
  <SubHeader />
  <Toast />
  <div class="mt-5 flex flex-col gap-3 sm:gap-[16px] lg:flex-row">
    <div class="w-full lg:w-[77%]">
      <div class="flex items-start gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
        >
          <path
            d="M10.5 2C6.07981 2 2.5 5.57982 2.5 10C2.5 14.4202 6.07981 18 10.5
            18C14.9202 18 18.5 14.4202 18.5 10C18.5 5.57982 14.9202 2 10.5
            2ZM15.4562 13.957C14.9466 14.4467 14.2585 14.6319 13.4843
            13.646L11.1617 10.8205C10.7845 10.3639 10.0831 10.3772 9.71919
            10.8404L7.56204 13.6195C6.73491 14.6782 6.02026 14.4268 5.49752
            13.8842C4.65715 12.8056 4.15426 11.4624 4.15426 9.99338C4.15426
            6.49297 6.99958 3.64764 10.5 3.64764C14.0004 3.64764 16.8457 6.49297
            16.8457 9.99338C16.8457 11.4888 16.323 12.8652 15.4562
            13.9504V13.957Z"
            fill="#0D64E8"
          />
        </svg>
        <div>
          <h2 class="text-[18px] font-semibold leading-[21px] text-[#0D64E8]">
            Improve with Colocio:
          </h2>
          <p class="mt-[2px] text-[12px] text-[#0D64E8]">
            Before sharing, consider these improvements based on previous
            engagement
          </p>
        </div>
      </div>
      <div
        class="my-[16px] flex items-center justify-between rounded-[12px]
        bg-[#E4EFFF] p-4"
      >
        <div class="flex items-start gap-[12px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M13.9959 17.4972H6.27423C5.76953 17.4972 5.51718 17.4972
              5.40032 17.3973C5.29893 17.3107 5.24513 17.1808 5.25559
              17.0479C5.26764 16.8946 5.44608 16.7162 5.80296 16.3592L12.8867
              9.27445C13.2166 8.94449 13.3816 8.7795 13.5718 8.71769C13.7392
              8.66331 13.9194 8.66331 14.0867 8.71769C14.2769 8.7795 14.4419
              8.94449 14.7718 9.27445L17.9947 12.4979V13.4977M13.9959
              17.4972C15.3956 17.4972 16.0955 17.4972 16.6301 17.2247C17.1004
              16.9851 17.4827 16.6027 17.7223 16.1323C17.9947 15.5976 17.9947
              14.8976 17.9947 13.4977M13.9959 17.4972H6.99788C5.59815 17.4972
              4.89829 17.4972 4.36366 17.2247C3.89339 16.9851 3.51104 16.6027
              3.27143 16.1323C2.99902 15.5976 2.99902 14.8976 2.99902
              13.4977V6.4987C2.99902 5.09877 2.99902 4.3988 3.27143
              3.8641C3.51104 3.39376 3.89339 3.01136 4.36366 2.77171C4.89829
              2.49927 5.59815 2.49927 6.99788 2.49927H13.9959C15.3956 2.49927
              16.0955 2.49927 16.6301 2.77171C17.1004 3.01136 17.4827 3.39376
              17.7223 3.8641C17.9947 4.3988 17.9947 5.09877 17.9947
              6.4987V13.4977M9.24724 7.08195C9.24724 8.0023 8.50126 8.74839
              7.58105 8.74839C6.66084 8.74839 5.91486 8.0023 5.91486
              7.08195C5.91486 6.16161 6.66084 5.41552 7.58105 5.41552C8.50126
              5.41552 9.24724 6.16161 9.24724 7.08195Z"
              stroke="#0D64E8"
              stroke-width="1.15352"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div>
            <p class="text-[14px] font-medium text-[#0D64E8]">Media</p>
            <p class="text-[12px] text-[#0D64E8]">
              Add more images or a video for more engagement
            </p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            d="M6.33301 15.5985L11.4837 10.4985L6.33301 5.39845L7.9187
            3.83179L14.6663 10.4985L7.9187 17.1651L6.33301 15.5985Z"
            fill="#0D64E8"
          />
        </svg>
      </div>
      <div
        class="mb-[16px] rounded-xl bg-white p-4 shadow-[0px_4px_9px_0px_#00000014] md:p-8"
      >
        <h1
          class="flex items-center gap-2.5 pb-[16px] text-lg font-bold text-font_dark"
        >
          <svg
            width="45"
            height="44"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.5 32.8333C26.5972 32.8333 25.8299 32.5174 25.1979
              31.8854C24.566 31.2535 24.25 30.4861 24.25 29.5833C24.25 29.4569
              24.259 29.326 24.2771 29.1906C24.2951 29.0552 24.3222 28.9333
              24.3583 28.825L16.7208 24.3833C16.4139 24.6542 16.0708 24.8663
              15.6917 25.0198C15.3125 25.1733 14.9153 25.25 14.5 25.25C13.5972
              25.25 12.8299 24.934 12.1979 24.3021C11.566 23.6701 11.25 22.9028
              11.25 22C11.25 21.0972 11.566 20.3299 12.1979 19.6979C12.8299
              19.066 13.5972 18.75 14.5 18.75C14.9153 18.75 15.3125 18.8267
              15.6917 18.9802C16.0708 19.1337 16.4139 19.3458 16.7208
              19.6167L24.3583 15.175C24.3222 15.0667 24.2951 14.9448 24.2771
              14.8094C24.259 14.674 24.25 14.5431 24.25 14.4167C24.25 13.5139
              24.566 12.7465 25.1979 12.1146C25.8299 11.4826 26.5972 11.1667
              27.5 11.1667C28.4028 11.1667 29.1701 11.4826 29.8021
              12.1146C30.434 12.7465 30.75 13.5139 30.75 14.4167C30.75 15.3194
              30.434 16.0868 29.8021 16.7187C29.1701 17.3507 28.4028 17.6667
              27.5 17.6667C27.0847 17.6667 26.6875 17.5899 26.3083
              17.4365C25.9292 17.283 25.5861 17.0708 25.2792 16.8L17.6417
              21.2417C17.6778 21.35 17.7049 21.4719 17.7229 21.6073C17.741
              21.7427 17.75 21.8736 17.75 22C17.75 22.1264 17.741 22.2573
              17.7229 22.3927C17.7049 22.5281 17.6778 22.65 17.6417
              22.7583L25.2792 27.2C25.5861 26.9292 25.9292 26.717 26.3083
              26.5635C26.6875 26.4101 27.0847 26.3333 27.5 26.3333C28.4028
              26.3333 29.1701 26.6493 29.8021 27.2812C30.434 27.9132 30.75
              28.6806 30.75 29.5833C30.75 30.4861 30.434 31.2535 29.8021
              31.8854C29.1701 32.5174 28.4028 32.8333 27.5 32.8333ZM27.5
              15.5C27.8069 15.5 28.0642 15.3962 28.2719 15.1885C28.4795 14.9809
              28.5833 14.7236 28.5833 14.4167C28.5833 14.1097 28.4795 13.8524
              28.2719 13.6448C28.0642 13.4372 27.8069 13.3333 27.5
              13.3333C27.1931 13.3333 26.9358 13.4372 26.7281 13.6448C26.5205
              13.8524 26.4167 14.1097 26.4167 14.4167C26.4167 14.7236 26.5205
              14.9809 26.7281 15.1885C26.9358 15.3962 27.1931 15.5 27.5
              15.5ZM14.5 23.0833C14.8069 23.0833 15.0642 22.9795 15.2719
              22.7719C15.4795 22.5642 15.5833 22.3069 15.5833 22C15.5833 21.6931
              15.4795 21.4358 15.2719 21.2281C15.0642 21.0205 14.8069 20.9167
              14.5 20.9167C14.1931 20.9167 13.9358 21.0205 13.7281
              21.2281C13.5205 21.4358 13.4167 21.6931 13.4167 22C13.4167 22.3069
              13.5205 22.5642 13.7281 22.7719C13.9358 22.9795 14.1931 23.0833
              14.5 23.0833ZM27.5 30.6667C27.8069 30.6667 28.0642 30.5628 28.2719
              30.3552C28.4795 30.1476 28.5833 29.8903 28.5833 29.5833C28.5833
              29.2764 28.4795 29.0191 28.2719 28.8115C28.0642 28.6038 27.8069
              28.5 27.5 28.5C27.1931 28.5 26.9358 28.6038 26.7281
              28.8115C26.5205 29.0191 26.4167 29.2764 26.4167 29.5833C26.4167
              29.8903 26.5205 30.1476 26.7281 30.3552C26.9358 30.5628 27.1931
              30.6667 27.5 30.6667Z"
              fill="#0D64E8"
            /><rect
              x="1.5"
              y="1"
              width="42"
              height="42"
              rx="9"
              stroke="#0D64E8"
              stroke-width="2"
            /></svg
          >
          Platform
        </h1>
        <hr class="mb-[16px] h-[1px] bg-gray-200" />
        <h1 class="mb-2 text-[14px] font-semibold text-[#4B5563]">Platforms</h1>
        <div class="mt-[16px] h-full w-full text-sm text-gray-900">
          <div class="flex flex-col gap-2">
            {#each $platforms_ad as platform}
              <div class="flex gap-[10px]">
                <div class="text-center">
                  <input
                    disabled={checkStatus(platform.name)}
                    id="green-checkbox"
                    type="checkbox"
                    bind:checked={platform.selected}
                    class="rounded border-[1px] border-[#D5DAE1] bg-gray-100
                    text-[#6FAA79]"
                  />
                </div>
                <div class="h-[20px] w-[20px] text-left">
                  <img
                    src="/icons/{platform.name.toLowerCase()}.svg"
                    alt={platform.name}
                    class="h-[20px] w-[20px]"
                  />
                </div>
                <div>
                  <div>{platform.name}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      <div
        class="mb-[16px] mt-[20px] rounded-xl bg-white p-4
        shadow-[0px_4px_9px_0px_#00000014] md:p-8"
      >
        <h1
          class="flex items-center gap-2.5 pb-[20px] text-lg font-bold
          text-font_dark"
        >
          <svg
            width="45"
            height="44"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.875 30.875H17.2202C16.5891 30.875 16.2736 30.875 16.1275
              30.7502C16.0007 30.6419 15.9334 30.4795 15.9465 30.3133C15.9616
              30.1217 16.1847 29.8986 16.6309 29.4524L25.4882 20.5952C25.9007
              20.1827 26.1069 19.9764 26.3448 19.8991C26.554 19.8311 26.7793
              19.8311 26.9886 19.8991C27.2264 19.9764 27.4327 20.1827 27.8452
              20.5952L31.875 24.625V25.875M26.875 30.875C28.6252 30.875 29.5002
              30.875 30.1687 30.5344C30.7567 30.2348 31.2348 29.7567 31.5344
              29.1687C31.875 28.5002 31.875 27.6252 31.875 25.875M26.875
              30.875H18.125C16.3748 30.875 15.4998 30.875 14.8313
              30.5344C14.2433 30.2348 13.7652 29.7567 13.4656 29.1687C13.125
              28.5002 13.125 27.6252 13.125 25.875V17.125C13.125 15.3748 13.125
              14.4998 13.4656 13.8313C13.7652 13.2433 14.2433 12.7652 14.8313
              12.4656C15.4998 12.125 16.3748 12.125 18.125 12.125H26.875C28.6252
              12.125 29.5002 12.125 30.1687 12.4656C30.7567 12.7652 31.2348
              13.2433 31.5344 13.8313C31.875 14.4998 31.875 15.3748 31.875
              17.125V25.875M20.9375 17.8542C20.9375 19.0048 20.0048 19.9375
              18.8542 19.9375C17.7036 19.9375 16.7708 19.0048 16.7708
              17.8542C16.7708 16.7036 17.7036 15.7708 18.8542 15.7708C20.0048
              15.7708 20.9375 16.7036 20.9375 17.8542Z"
              stroke="#0D64E8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
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
          Media
        </h1>
        <hr class="mb-[20px] h-[1px] bg-gray-200" />
        <div
          class="flex flex-wrap items-center gap-[18px] rounded-md
          bg-blue-bglight p-4 text-sm text-blue-primary sm:flex-nowrap
          sm:gap-[32px]"
        >
          <div class="flex-1">
            <div class="font-semibold">Create your own design</div>
            <div class="text-xs">
              Use our Design Studio tool to create custom graphics for your
              posts and campaigns.
            </div>
          </div>
          <button
            type="button"
            class="flex w-full items-center justify-center rounded-md
            bg-blue-primary px-3 py-2 text-center text-white sm:w-auto"
          >
            <span>Create design</span>
          </button>
        </div>
        <button
          on:click={() => {
            bool_modal_media.set(true);
          }}
          class="relative mt-[20px] flex h-[120px] w-[120px] flex-col
          items-center justify-center rounded-[10px] border border-dashed
          border-custom-gray-200 bg-transparent p-2.5 text-custom-gray-600"
        >
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0625 3.375H8.775C6.88482 3.375 5.93973 3.375 5.21778
              3.74285C4.58274 4.06643 4.06643 4.58274 3.74285 5.21778C3.375
              5.93973 3.375 6.88482 3.375 8.775V18.225C3.375 20.1152 3.375
              21.0603 3.74285 21.7822C4.06643 22.4173 4.58274 22.9336 5.21778
              23.2571C5.93973 23.625 6.88482 23.625 8.775 23.625H19.125C20.1712
              23.625 20.6943 23.625 21.1235 23.51C22.2882 23.1979 23.1979
              22.2882 23.51 21.1235C23.625 20.6943 23.625 20.1712 23.625
              19.125M21.375 9V2.25M18 5.625H24.75M11.8125 9.5625C11.8125 10.8051
              10.8051 11.8125 9.5625 11.8125C8.31986 11.8125 7.3125 10.8051
              7.3125 9.5625C7.3125 8.31986 8.31986 7.3125 9.5625 7.3125C10.8051
              7.3125 11.8125 8.31986 11.8125 9.5625ZM16.8638 13.4079L7.34754
              22.0591C6.81228 22.5457 6.54465 22.789 6.52098 22.9997C6.50046
              23.1824 6.57051 23.3636 6.70858 23.485C6.86788 23.625 7.22957
              23.625 7.95295 23.625H18.513C20.132 23.625 20.9416 23.625 21.5774
              23.353C22.3756 23.0115 23.0115 22.3756 23.353 21.5774C23.625
              20.9416 23.625 20.132 23.625 18.513C23.625 17.9682 23.625 17.6958
              23.5654 17.4422C23.4906 17.1234 23.3471 16.8248 23.1449
              16.5672C22.984 16.3622 22.7713 16.1921 22.346 15.8518L19.1991
              13.3342C18.7733 12.9936 18.5604 12.8234 18.326 12.7632C18.1194
              12.7103 17.902 12.7171 17.6991 12.783C17.4689 12.8578 17.2672
              13.0412 16.8638 13.4079Z"
              stroke="#9CA3AF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Add media</span>
        </button>
      </div>
      <div
        class="mb-[16px] mt-[20px] rounded-xl bg-white p-4
        shadow-[0px_4px_9px_0px_#00000014] md:p-8"
      >
        <h1 class="flex items-center gap-2.5 pb-[20px] text-lg text-font_dark">
          <svg
            width="45"
            height="44"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.5416 17.2917H15.4166C14.2499 17.2917 13.6665 17.2917
              13.2208 17.5187C12.8288 17.7185 12.5101 18.0372 12.3104
              18.4292C12.0833 18.8748 12.0833 19.4582 12.0833
              20.625V24.375C12.0833 25.5418 12.0833 26.1252 12.3104
              26.5708C12.5101 26.9628 12.8288 27.2815 13.2208 27.4813C13.6665
              27.7083 14.2499 27.7083 15.4166 27.7083H23.5416M27.7083
              17.2917H29.5833C30.7501 17.2917 31.3335 17.2917 31.7791
              17.5187C32.1711 17.7185 32.4898 18.0372 32.6896 18.4292C32.9166
              18.8748 32.9166 19.4582 32.9166 20.625V24.375C32.9166 25.5418
              32.9166 26.1252 32.6896 26.5708C32.4898 26.9628 32.1711 27.2815
              31.7791 27.4813C31.3335 27.7083 30.7501 27.7083 29.5833
              27.7083H27.7083M27.7083 31.875L27.7083 13.125M30.3125
              13.125L25.1041 13.125M30.3125 31.875L25.1041 31.875"
              stroke="#0D64E8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
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

          <div>
            <div class="font-bold">Text</div>
          </div>
        </h1>
        <hr class="mb-[20px] h-[1px] bg-gray-200" />
        <div class="rounded-md bg-[#E4EFFF] p-[12px]">
          <div class="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                d="M8.5 2C5.18486 2 2.5 4.68486 2.5 8C2.5 11.3151 5.18486 14 8.5
                14C11.8151 14 14.5 11.3151 14.5 8C14.5 4.68486 11.8151 2 8.5
                2ZM12.2171 10.9677C11.835 11.335 11.3189 11.4739 10.7382
                10.7345L8.99627 8.61538C8.7134 8.27295 8.18735 8.28288 7.91439
                8.63027L6.29653 10.7146C5.67618 11.5087 5.1402 11.3201 4.74814
                10.9132C4.11786 10.1042 3.74069 9.09677 3.74069 7.99504C3.74069
                5.36973 5.87469 3.23573 8.5 3.23573C11.1253 3.23573 13.2593
                5.36973 13.2593 7.99504C13.2593 9.11663 12.8672 10.1489 12.2171
                10.9628V10.9677Z"
                fill="#0D64E8"
              />
            </svg>
            <div>
              <h2 class="text-[14px] font-medium text-[#0D64E8]">
                Generate all with Colocio
              </h2>
              <p class="text-[12px] font-medium text-[#0D64E8]">
                Give a brief description of what information your text should
                include, e.g. “Promote our weekly special, 50% off on Mondays”
              </p>
            </div>
          </div>
          <textarea
            id="colocio-prompt"
            rows="2"
            class="mt-1 block w-full flex-1 resize-none rounded-lg border
            border-gray-300 bg-white p-2.5 text-sm text-gray-600
            focus:border-blue-500 focus:ring-blue-500"
            placeholder="Write me a
            description that...">{colocio_prompt}</textarea
          >
          <button
            on:click={generateDescriptionDemo}
            class="border1 mt-4 flex h-[40px] w-full max-w-[166px] items-center
            justify-center gap-2 rounded-md bg-[#0D64E8] text-[14px]
            text-[#fff]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M10.5 2C6.07981 2 2.5 5.57982 2.5 10C2.5 14.4202 6.07981 18
                10.5 18C14.9202 18 18.5 14.4202 18.5 10C18.5 5.57982 14.9202 2
                10.5 2ZM15.4562 13.957C14.9466 14.4467 14.2585 14.6319 13.4843
                13.646L11.1617 10.8205C10.7845 10.3639 10.0831 10.3772 9.71919
                10.8404L7.56204 13.6195C6.73491 14.6782 6.02026 14.4268 5.49752
                13.8842C4.65715 12.8056 4.15426 11.4624 4.15426 9.99338C4.15426
                6.49297 6.99958 3.64764 10.5 3.64764C14.0004 3.64764 16.8457
                6.49297 16.8457 9.99338C16.8457 11.4888 16.323 12.8652 15.4562
                13.9504V13.957Z"
                fill="white"
              />
            </svg>
            Generate all text
          </button>
        </div>
        <hr class="mb-[20px] h-[1px] bg-gray-200" />
        <div
          class="mb-3 mt-5 flex items-center border-b border-gray-200
          text-center text-sm"
        >
          <button
            type="button"
            on:click={() => {
              tab_selected = 'facebook';
            }}
            class={tab_selected === 'facebook'
              ? 'flex w-[115px] items-center justify-center gap-1 border-b-[1px] border-b-[#0d64e8] pb-2'
              : 'flex w-[115px] items-center justify-center gap-1 pb-2'}
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9785 9.3L11.334 6.9835H9.11127V5.48025C9.11127 4.8465
                9.42177 4.22875 10.4173 4.22875H11.4278V2.2565C11.4278 2.2565
                10.5108 2.1 9.63402 2.1C7.80352 2.1 6.60702 3.2095 6.60702
                5.218V6.9835H4.57227V9.3H6.60702V14.9H9.11127V9.3H10.9785Z"
                fill={tab_selected == 'facebook' ? '#0D64E8' : '#111827'}
              />
            </svg>
            <span
              class="text-gray-600"
              class:text-gray-600={tab_selected != 'facebook'}
              class:text-blue-primary={tab_selected == 'facebook'}
              >Facebook</span
            >
          </button>
          <button
            type="button"
            on:click={() => {
              tab_selected = 'instagram';
            }}
            class={tab_selected === 'instagram'
              ? 'flex w-[115px] items-center justify-center gap-1 border-b-[1px] border-b-[#0d64e8] pb-2'
              : 'flex w-[115px] items-center justify-center gap-1 pb-2'}
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33333 2.5C3.49533 2.5 2 3.99533 2 5.83333V11.1667C2
                13.0047 3.49533 14.5 5.33333 14.5H10.6667C12.5047 14.5 14
                13.0047 14 11.1667V5.83333C14 3.99533 12.5047 2.5 10.6667
                2.5H5.33333ZM5.33333 3.83333H10.6667C11.7693 3.83333 12.6667
                4.73067 12.6667 5.83333V11.1667C12.6667 12.2693 11.7693 13.1667
                10.6667 13.1667H5.33333C4.23067 13.1667 3.33333 12.2693 3.33333
                11.1667V5.83333C3.33333 4.73067 4.23067 3.83333 5.33333
                3.83333ZM11.3333 4.5C11.1565 4.5 10.987 4.57024 10.8619
                4.69526C10.7369 4.82029 10.6667 4.98986 10.6667 5.16667C10.6667
                5.34348 10.7369 5.51305 10.8619 5.63807C10.987 5.7631 11.1565
                5.83333 11.3333 5.83333C11.5101 5.83333 11.6797 5.7631 11.8047
                5.63807C11.9298 5.51305 12 5.34348 12 5.16667C12 4.98986 11.9298
                4.82029 11.8047 4.69526C11.6797 4.57024 11.5101 4.5 11.3333
                4.5ZM8 5.16667C6.162 5.16667 4.66667 6.662 4.66667 8.5C4.66667
                10.338 6.162 11.8333 8 11.8333C9.838 11.8333 11.3333 10.338
                11.3333 8.5C11.3333 6.662 9.838 5.16667 8 5.16667ZM8 6.5C9.10267
                6.5 10 7.39733 10 8.5C10 9.60267 9.10267 10.5 8 10.5C6.89733
                10.5 6 9.60267 6 8.5C6 7.39733 6.89733 6.5 8 6.5Z"
                fill={tab_selected == 'instagram' ? '#0D64E8' : '#111827'}
              />
            </svg>
            <span
              class="text-gray-600"
              class:text-gray-600={tab_selected != 'instagram'}
              class:text-blue-primary={tab_selected == 'instagram'}
              >Instagram</span
            >
          </button>
        </div>

        <div>
          {#if tab_selected === 'facebook'}
            <div>
              <div class="mt-[20px]">
                <label
                  for=""
                  class="block w-full text-[14px] font-medium text-[#4B5563]"
                  >Post
                </label>

                <input
                  bind:value={colocio_prompt}
                  type="text"
                  class="mt-1 h-[40px] w-full rounded-md border-[1px] border-[#D1D5DB]"
                />
              </div>
            </div>
          {/if}
          {#if tab_selected === 'instagram'}
            <div>
              <label
                for=""
                class="block w-full text-[14px] text-[#4B5563]">Post</label
              >
              <input
                type="text"
                bind:value={instagramDesc}
                class="mt-1 h-[40px] w-full rounded-md border-[1px] border-[#D1D5DB]"
              />
            </div>
          {/if}
        </div>
      </div>
      <div
        class="mb-[16px] mt-[20px] rounded-xl bg-white p-4
        shadow-[0px_4px_9px_0px_#00000014] md:p-8"
      >
        <h1 class="flex items-center gap-2.5 pb-[20px] text-lg text-font_dark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
          >
            <path
              d="M31 21.5V18.8C31 17.1198 31 16.2798 30.673 15.638C30.3854
              15.0735 29.9265 14.6146 29.362 14.327C28.7202 14 27.8802 14 26.2
              14H17.8C16.1198 14 15.2798 14 14.638 14.327C14.0735 14.6146
              13.6146 15.0735 13.327 15.638C13 16.2798 13 17.1198 13
              18.8V27.2C13 28.8802 13 29.7202 13.327 30.362C13.6146 30.9265
              14.0735 31.3854 14.638 31.673C15.2798 32 16.1198 32 17.8
              32H22.5M31 20H13M26 12V16M18 12V16M28 31V25M25 28H31"
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
          </div>
        </h1>

        <hr class="mb-[16px] h-[1px] bg-gray-200" />
        <div class="mb-[20px] flex items-center gap-[10px]">
          <input
            id="green-checkbox"
            type="checkbox"
            class="rounded border-[1px] border-[#D5DAE1] bg-gray-100
            text-[#6FAA79]"
          />
          <label for="green-checkbox">Post now</label>
        </div>
        <div class="grid grid-cols-2">
          <div>
            <label
              for="start"
              class="text-[14px] font-medium text-[#4B5563]"
              >Start date/time</label
            >
            <div class="datepicker-main relative mt-1">
              <!-- <input
                          type="text"
                          id="start"
                          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        /> -->
              <Flatpickr
                bind:value={selectedStartDate}
                options={{ enableTime: true }}
              />
              <span class="absolute right-3 top-3 bg-transparent">
                <img
                  src="/icons/calendar_black.svg"
                  alt="calendar"
                  class="h-4 w-4"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mb-[16px] mt-[20px] rounded-xl bg-white p-4
        shadow-[0px_4px_9px_0px_#00000014]"
      >
        <div class="flex items-center justify-end gap-4">
          <button
            class="flex h-[40px] w-full max-w-[50%] items-center justify-center
            gap-2 rounded-md border border-[#D1D5DB] bg-white px-5 py-2.5
            text-sm font-medium text-[#4B5563] hover:bg-gray-100 focus:z-10
            focus:outline-none focus:ring-4 focus:ring-gray-200
            sm:max-w-[100px]">Cancel</button
          >
          <button
            on:click={handleSchedule}
            id="schedule-btn"
            type="button"
            class="flex h-[40px] items-center justify-center gap-2 rounded-md
            bg-blue-primary px-5 py-3 text-sm font-medium text-white
            hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66599 7.33977H16.3327V5.25641C16.3327 5.1923 16.306
                5.13353 16.2525 5.0801C16.1991 5.02668 16.1403 4.99997 16.0762
                4.99997H4.92243C4.85832 4.99997 4.79955 5.02668 4.74612
                5.0801C4.6927 5.13353 4.66599 5.1923 4.66599
                5.25641V7.33977ZM4.92243 17.9166C4.50149 17.9166 4.14518 17.7708
                3.85352 17.4791C3.56185 17.1875 3.41602 16.8311 3.41602
                16.4102V5.25641C3.41602 4.83547 3.56185 4.47916 3.85352
                4.18749C4.14518 3.89583 4.50149 3.74999 4.92243
                3.74999H6.07629V1.98718H7.35831V3.74999H13.6724V1.98718H14.9224V3.74999H16.0762C16.4972
                3.74999 16.8535 3.89583 17.1451 4.18749C17.4368 4.47916 17.5826
                4.83547 17.5826 5.25641V9.80927C17.3829 9.72167 17.1788 9.65089
                16.9705 9.59693C16.7621 9.54299 16.5495 9.50052 16.3327
                9.46954V8.58975H4.66599V16.4102C4.66599 16.4743 4.6927 16.5331
                4.74612 16.5865C4.79955 16.6399 4.85832 16.6666 4.92243
                16.6666H10.3407C10.4112 16.8974 10.4964 17.1156 10.5963
                17.3213C10.6962 17.5269 10.8097 17.7254 10.9369
                17.9166H4.92243ZM15.6596 18.75C14.619 18.75 13.7339 18.3851
                13.0042 17.6554C12.2745 16.9257 11.9096 16.0406 11.9096
                15C11.9096 13.9594 12.2745 13.0742 13.0042 12.3445C13.7339
                11.6148 14.619 11.25 15.6596 11.25C16.7002 11.25 17.5853 11.6148
                18.315 12.3445C19.0447 13.0742 19.4096 13.9594 19.4096
                15C19.4096 16.0406 19.0447 16.9257 18.315 17.6554C17.5853
                18.3851 16.7002 18.75 15.6596 18.75ZM17.0474 16.907L17.5666
                16.3878L16.0282 14.8493V12.5481H15.291V15.1506L17.0474 16.907Z"
                fill="white"
              />
            </svg>
            Schedule
          </button>
        </div>
      </div>
    </div>
    <SocialMedia />
    <ModalMedia />
  </div>
</div>
