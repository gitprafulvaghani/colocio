<script lang="ts">
  import {
    bool_modal_media,
    library,
    AudienceStore,
    Selected_Library_Store,
  } from "$lib/stores/stores";
  import { createEventDispatcher, onMount } from "svelte";
  import ModalMedia from "./ModalMedia.svelte";
  import MediaShow from "./MediaShow.svelte";
  import { IsPreviewShow } from "$lib/services/interface/promotionstore";

  const dispatch = createEventDispatcher();
  let PreviewDataInfo: any = false;
  let AudienceDetais: any = [];
  //  let IsShow = false;

  function deselectImg(img_src: string) {
    library.update((library: any[]) => {
      return library.map((media: any) => {
        if (media.src == img_src) {
          media.selected = false;
        }
        return media;
      });
    });
  }

  let selected_library: any[] = [];

  $: {
    selected_library = $library.filter((media: any) => media.selected);
    //  selected_library = $library.filter((media: any) => media.selected).map((media: any) => media.src);
  }

  function GetTabsDetails() {
    const unsubscribe = AudienceStore.subscribe((value) => {
      AudienceDetais = value;
    });

    return () => {
      unsubscribe();
    };
  }
  function NextStep() {
    Selected_Library_Store.set(selected_library);
    dispatch("nextStep");
  }

  onMount(() => {
    GetTabsDetails();
  });
</script>

<div class="flex lg:flex-row flex-col sm:gap-[16px] gap-3 mt-5">
  <div class="bg-white lg:p-8 p-4 rounded-xl drop-shadow-md flex-1">
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-col gap-[20px]">
        <h1 class="flex items-center gap-2.5 font-bold text-lg text-font_dark">
          <svg
            width="45"
            height="44"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.875 30.875H17.2202C16.5891 30.875 16.2736 30.875 16.1275 30.7502C16.0007 30.6419 15.9334 30.4795 15.9465 30.3133C15.9616 30.1217 16.1847 29.8986 16.6309 29.4524L25.4882 20.5952C25.9007 20.1827 26.1069 19.9764 26.3448 19.8991C26.554 19.8311 26.7793 19.8311 26.9886 19.8991C27.2264 19.9764 27.4327 20.1827 27.8452 20.5952L31.875 24.625V25.875M26.875 30.875C28.6252 30.875 29.5002 30.875 30.1687 30.5344C30.7567 30.2348 31.2348 29.7567 31.5344 29.1687C31.875 28.5002 31.875 27.6252 31.875 25.875M26.875 30.875H18.125C16.3748 30.875 15.4998 30.875 14.8313 30.5344C14.2433 30.2348 13.7652 29.7567 13.4656 29.1687C13.125 28.5002 13.125 27.6252 13.125 25.875V17.125C13.125 15.3748 13.125 14.4998 13.4656 13.8313C13.7652 13.2433 14.2433 12.7652 14.8313 12.4656C15.4998 12.125 16.3748 12.125 18.125 12.125H26.875C28.6252 12.125 29.5002 12.125 30.1687 12.4656C30.7567 12.7652 31.2348 13.2433 31.5344 13.8313C31.875 14.4998 31.875 15.3748 31.875 17.125V25.875M20.9375 17.8542C20.9375 19.0048 20.0048 19.9375 18.8542 19.9375C17.7036 19.9375 16.7708 19.0048 16.7708 17.8542C16.7708 16.7036 17.7036 15.7708 18.8542 15.7708C20.0048 15.7708 20.9375 16.7036 20.9375 17.8542Z"
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
        <hr class="bg-gray-200 h-[1px]" />
        <div
          class="flex sm:gap-8 gap-4 sm:flex-row flex-col bg-blue-bglight text-blue-primary text-sm p-4 rounded-md sm:items-end"
        >
          <div class="flex-1">
            <div class="font-semibold">Design tool coming soon</div>
            <div class="text-xs">
              Keep your eyes open for our dynamic design studio launching soon.
            </div>
          </div>
          <button
            disabled
            type="button"
            style="opacity: 0.5;"
            class="bg-blue-primary text-white py-2 px-3 flex justify-center items-center rounded-md h-[32px]"
          >
            <svg
              width="22"
              height="21"
              viewBox="0 0 22 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.8426 4.01838C14.6237 3.23733 15.89 3.23733 16.671 4.01838L17.3148 4.66218C18.0959 5.44322 18.0959 6.70955 17.3148 7.4906L8.74058 16.0649C8.46138 16.3441 8.10578 16.5344 7.7186 16.6118L4.26629 17.3023C4.12634 17.3303 4.00296 17.2069 4.03095 17.0669L4.72141 13.6146C4.79885 13.2274 4.98916 12.8718 5.26836 12.5926L13.8426 4.01838Z"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M12.6528 5.20833L16.1251 8.68056"
                stroke="white"
                stroke-width="2"
              />
            </svg>
            <span>Create design</span>
          </button>
        </div>
        <div class="flex gap-4 flex-wrap">
          {#each $library as media, index}
            {#if media.selected}
              <div class="flex flex-col gap-1.5 relative">
                <button
                  on:click={() => {
                    deselectImg(media.src);
                  }}
                  type="button"
                  class="absolute rounded-full w-4 h-4 bg-gray-700 bg-opacity-40 top-2 right-2 flex items-center justify-center"
                >
                  <svg
                    width="7"
                    height="7"
                    viewBox="0 0 7 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.8938 0.731445C1.57251 0.410156 1.05298 0.410156 0.735107 0.731445C0.417236 1.05273 0.413818 1.57227 0.735107 1.89014L2.34155 3.49658L0.735107 5.10303C0.413818 5.42432 0.413818 5.94385 0.735107 6.26172C1.0564 6.57959 1.57593 6.58301 1.8938 6.26172L3.50024 4.65527L5.10669 6.26172C5.42798 6.58301 5.94751 6.58301 6.26538 6.26172C6.58325 5.94043 6.58667 5.4209 6.26538 5.10303L4.65894 3.49658L6.26538 1.89014C6.58667 1.56885 6.58667 1.04932 6.26538 0.731445C5.94409 0.413574 5.42456 0.410156 5.10669 0.731445L3.50024 2.33789L1.8938 0.731445Z"
                      fill="#E4E8EE"
                    />
                  </svg>
                </button>
                <img
                  src={media.src.startsWith("data:")
                    ? media.src
                    : "/images/" + media.src}
                  class="sm:h-[120px] h-[110px] sm:w-[120px] w-[110px] object-cover rounded-[10px]"
                  alt="demo"
                />
                <p
                  class="text-center text-gray-600 truncate w-[120px] text-[12px]"
                >
                  {index + 1}. {media.name ? media.name : media.src}
                </p>
              </div>
            {/if}
          {/each}

          <button
            on:click={() => {
              bool_modal_media.set(true);
            }}
            class="w-[120px] h-[120px] bg-transparent relative text-custom-gray-600 border border-dashed border-custom-gray-200 rounded-[10px] p-2.5 flex flex-col gap-1 items-center justify-center"
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
      </div>
      <div
        class="flex items-center justify-between gap-3 lg:mt-[168px] mt-[32px]"
      >
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
          class:opacity-30={selected_library.length === 0}
          disabled={selected_library.length === 0}
          on:click={NextStep}
          type="button"
          class="text-white flex items-center justify-center gap-2 sm:max-w-[100px] max-w-[50%] w-full bg-[#0D64E8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 h-[40px]"
        >
          Next
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
  <ModalMedia />
</div>

<style>
  .carousel-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .carousel-slide {
    display: flex;
    width: 100%;
    transition: transform 0.5s ease;
  }

  .image {
    width: 100%;
    display: block;
  }
</style>
