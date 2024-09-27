<script lang="ts">
  import {
    library,
    bool_modal_metrics,
    isEditModelOpen,
    ViewSummerStore,
  } from "$lib/stores/stores";
  import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
  import { onMount } from "svelte";
  import ConversonCard from "$lib/components/Insights/ConversonCard.svelte";
  import EditAd from "$lib/components/EditAd.svelte";
  import chartjs from "chart.js/auto";
  import {
    deletePost,
    getAdEngagementData,
  } from "$lib/services/NewFacebook/NewFacebookService";

  let chartData = [20, 100, 50, 12, 20, 130, 45];
  let postToEdit = {};
  let isEditModelOpenValue = false;

  let Labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const page_post_id = "114576288310799_273686889080257";
  async function handleDeletePost() {
    try {
      await deletePost(page_post_id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  let ctx;
  let chartCanvas;
  export let isOpen;
  console.log("isOpen--------", isOpen);

  function openEditModel(details: {}) {
    postToEdit = isOpen.details;
    isEditModelOpen.set(true);
  }
  function closeEditModel() {
    isEditModelOpen.set(false);
    postToEdit = {};
  }

  function openAdEditModel(details: {}) {
    postToEdit = isOpen.details;
    isEditModelOpen.set(true);
  }
  function closeAdEditModel() {
    isEditModelOpen.set(false);
    postToEdit = {};
  }

  let matrixDetails: any;
  function Getmatrix() {
    const unsubscribematrix = ViewSummerStore.subscribe((value) => {
      matrixDetails = value;
    });

    return () => {
      unsubscribematrix();
    };
  }
  onMount(async (promise) => {
    Getmatrix();
    if (chartCanvas) {
      ctx = chartCanvas.getContext("2d");
      var chart = new chartjs(ctx, {
        type: "bar",
        data: {
          labels: Labels,
          datasets: [
            {
              label: "Unit Sales",
              data: chartData,
            },
          ],
        },
      });
    }
  });

  $: showModal = $bool_modal_metrics;
  // export let PreviewData;
  let currentIndex = 0;
  const tabs = [
    {
      icon: faFacebookF,
      title: "Facebook",
      content: `aaaa`,
    },
    {
      icon: faInstagram,
      title: "Instagram",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  function showDiv(index: any) {
    const divs = document.querySelectorAll(".content");
    divs.forEach((div) => div.classList.add("hidden"));

    const currentDiv = document.getElementById(index);
    if (currentDiv) {
      currentDiv.classList.remove("hidden");
    }
  }

  function handaleModal() {
    if (!isEditModelOpenValue) {
      openAdEditModel(isOpen.details);
    } else {
      closeAdEditModel();
    }
  }

  function handleTabClick(index: any) {
    currentIndex = index;
    showDiv(currentIndex);
  }

  const handleEditButtonClick = () => {
    if (!isEditModelOpenValue) {
      openEditModel(isOpen.details);
    } else {
      closeEditModel();
    }
  };

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

  let impressions = 0;
  let reach = 0;
  let clicks = 0;
  let likes = 0;
  let comments = 0;
  let shares = 0;

  async function getAdData() {
    if (isOpen.details.type === "Ad") {
      const adData = await getAdEngagementData(isOpen.details.id);
      console.log("adData---------", adData);
      impressions = adData[0].impressions;
      reach = adData[0].reach;
      clicks = adData[0].clicks;
      likes = 0;
      comments = 0;
      shares = 0;

      adData[0].actions.forEach((action) => {
        if (action.action_type === "post_reaction") {
          likes = action.value;
        }
        if (action.action_type === "post_engagement") {
          comments = action.value;
        }
        if (action.action_type === "post_share") {
          shares = action.value;
        }
      });
    }
  }

  let selected_library: any[] = [];

  $: {
    selected_library = $library.filter((media: any) => media.selected);
  }
  let tab_selected = "engagement";
  function HandleGenrateText() {
    tab_selected = "instagram";
    const useFacebookContent = true;
    const IsAskColocio = true;
  }

  function modelClose() {
    const isModelOpen = false;
    const SendPostDetails = {
      Modalopen: isModelOpen,
      details: "value",
    };
    isOpen = SendPostDetails;
    ViewSummerStore.set(SendPostDetails);
  }

  onMount(() => {
    getAdData();
  });
</script>

{#if isOpen.Modalopen}
  <div class="modal-background">
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="bg-[rgba(0, 0, 0, 0.12)] fixed inset-0 bg-[#0000001F] backdrop-blur-sm transition-opacity"
      />

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-3 text-center"
        >
          <div
            class="relative flex w-full max-w-[1128px] transform flex-col justify-between overflow-hidden rounded-lg bg-white p-[14px] text-left drop-shadow transition-all sm:my-8 sm:!mt-16 lg:p-[32px]"
          >
            <button
              on:click={modelClose}
              class="absolute right-[13px] top-[17px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.57613 4.37575C3.81044 4.14143 4.19034 4.14143 4.42465 4.37575L7.60039 7.55148L10.7761 4.37575C11.0104 4.14143 11.3903 4.14143 11.6247 4.37575C11.859 4.61006 11.859 4.98996 11.6247 5.22428L8.44892 8.40001L11.6247 11.5757C11.859 11.8101 11.859 12.19 11.6247 12.4243C11.3903 12.6586 11.0104 12.6586 10.7761 12.4243L7.60039 9.24854L4.42465 12.4243C4.19034 12.6586 3.81044 12.6586 3.57613 12.4243C3.34181 12.19 3.34181 11.8101 3.57613 11.5757L6.75186 8.40001L3.57613 5.22428C3.34181 4.98996 3.34181 4.61006 3.57613 4.37575Z"
                  fill="#1B1D1F"
                />
              </svg>
            </button>
            {#if isOpen.details.type === "Post"}
              <div class="mt-5 lg:mt-0">
                <div class="flex flex-col items-start gap-8 md:flex-row">
                  <div class="w-full">
                    <div class="flex items-center justify-between">
                      <div class="flex gap-2">
                        <div
                          class="flex h-[21px] w-[36px] items-center justify-center rounded-md bg-[#0D64E8] text-[12px] text-white"
                        >
                          <!--Post-->
                          {isOpen.details.type}
                        </div>
                        <p class="text-[14px] font-medium text-[#0D64E8]">
                          {isOpen.details.scheduled}
                        </p>
                        <div
                          class="flex h-[24px] w-[63px] items-center justify-center rounded-[100px] bg-[#E4FDEA] text-[14px] text-[#02AB46]"
                        >
                          Posted
                        </div>
                      </div>
                      <div>
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                          >
                            <path
                              d="M11 6.70002H8.9905V5.50003C8.9905 4.88083 9.03838 4.49083 9.88152 4.49083H10.9464V2.58284C10.4282 2.52644 9.90717 2.49884 9.38556 2.50004C7.83895 2.50004 6.71021 3.49423 6.71021 5.31943V6.70002H5V9.10002L6.71021 9.09942V14.5H8.9905V9.09822L10.7383 9.09762L11 6.70002Z"
                              fill="#0D64E8"
                            />
                          </svg>
                        </button>
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                          >
                            <path
                              d="M5.33333 2.5C3.49533 2.5 2 3.99533 2 5.83333V11.1667C2 13.0047 3.49533 14.5 5.33333 14.5H10.6667C12.5047 14.5 14 13.0047 14 11.1667V5.83333C14 3.99533 12.5047 2.5 10.6667 2.5H5.33333ZM5.33333 3.83333H10.6667C11.7693 3.83333 12.6667 4.73067 12.6667 5.83333V11.1667C12.6667 12.2693 11.7693 13.1667 10.6667 13.1667H5.33333C4.23067 13.1667 3.33333 12.2693 3.33333 11.1667V5.83333C3.33333 4.73067 4.23067 3.83333 5.33333 3.83333ZM11.3333 4.5C11.1565 4.5 10.987 4.57024 10.8619 4.69526C10.7369 4.82029 10.6667 4.98986 10.6667 5.16667C10.6667 5.34348 10.7369 5.51305 10.8619 5.63807C10.987 5.7631 11.1565 5.83333 11.3333 5.83333C11.5101 5.83333 11.6797 5.7631 11.8047 5.63807C11.9298 5.51305 12 5.34348 12 5.16667C12 4.98986 11.9298 4.82029 11.8047 4.69526C11.6797 4.57024 11.5101 4.5 11.3333 4.5ZM8 5.16667C6.162 5.16667 4.66667 6.662 4.66667 8.5C4.66667 10.338 6.162 11.8333 8 11.8333C9.838 11.8333 11.3333 10.338 11.3333 8.5C11.3333 6.662 9.838 5.16667 8 5.16667ZM8 6.5C9.10267 6.5 10 7.39733 10 8.5C10 9.60267 9.10267 10.5 8 10.5C6.89733 10.5 6 9.60267 6 8.5C6 7.39733 6.89733 6.5 8 6.5Z"
                              fill="#0D64E8"
                            />
                          </svg>
                        </button>
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                          >
                            <path
                              d="M9.88196 3.5H8.30354V10.3116C8.30354 11.1232 7.69646 11.7899 6.94098 11.7899C6.1855 11.7899 5.57842 11.1232 5.57842 10.3116C5.57842 9.5145 6.17201 8.86231 6.90052 8.83333V7.12319C5.29511 7.15217 4 8.55797 4 10.3116C4 12.0797 5.32209 13.5 6.95448 13.5C8.58684 13.5 9.90893 12.0652 9.90893 10.3116V6.81883C10.5025 7.28261 11.231 7.55797 12 7.57247V5.86232C10.8128 5.81884 9.88196 4.77536 9.88196 3.5Z"
                              fill="#0D64E8"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div
                      class="relative mt-2 flex justify-between gap-8 rounded-md bg-blue-bglight p-[12px] text-sm text-blue-primary"
                    >
                      <div class="flex items-start">
                        <div>
                          <svg
                            class="mt-0.5 h-4 w-4"
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
                          <div class="font-semibold">Turn post into ad</div>
                          <div class="turn-para text-xs">
                            {isOpen.details.message || ""}
                          </div>
                        </div>
                      </div>
                      <button
                        class="h-[32px] w-full max-w-[93px] rounded-md bg-[#0D64E8] text-[14px] text-white"
                        >Create ad</button
                      >
                    </div>
                    <div
                      class="mt-3 flex items-start gap-2 rounded-[6px] border-[1px] border-[#D1D5DB] p-2"
                    >
                      <img
                        src={isOpen.details.full_picture || "/images/food.png"}
                        alt="food"
                        class="w-[60px] h-[60px] rounded-[4px] object-cover"
                      />
                      <div>
                        <h2 class="text-[14px] font-medium text-font_dark">
                          {isOpen.details.message || ""}
                        </h2>
                        <p class="text-[14px] text-[#4B5563]">
                          {isOpen.details.description || ""}
                        </p>
                        <hr class="my-[5px] h-[1px] bg-[#E5E7EB]" />
                        <div class="flex flex-wrap gap-4">
                          <div class="flex gap-1">
                            <p class="text-[14px] font-normal text-font_dark">
                              Likes
                            </p>
                            <p class="text-[14px] font-medium text-font_dark">
                              {likes}
                            </p>
                          </div>
                          <div class="flex gap-1">
                            <p class="text-[14px] font-normal text-font_dark">
                              Comments
                            </p>
                            <p class="text-[14px] font-medium text-font_dark">
                              {comments || 0}
                            </p>
                          </div>
                          <div class="flex gap-1">
                            <p class="text-[14px] font-normal text-font_dark">
                              Shares
                            </p>
                            <p class="text-[14px] font-medium text-font_dark">
                              {shares}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-[12px] flex gap-3">
                      <button
                        on:click={handleEditButtonClick}
                        class="flex h-[32px] w-full max-w-[82px] items-center justify-center gap-2 rounded-md border-[1px] border-[#D1D5DB] text-[14px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.3426 4.01838C14.1237 3.23733 15.39 3.23733 16.171 4.01838L16.8148 4.66218C17.5959 5.44322 17.5959 6.70955 16.8148 7.4906L8.24058 16.0649C7.96138 16.3441 7.60578 16.5344 7.2186 16.6118L3.76629 17.3023C3.62634 17.3303 3.50296 17.2069 3.53095 17.0669L4.22141 13.6146C4.29885 13.2274 4.48916 12.8718 4.76836 12.5926L13.3426 4.01838Z"
                            stroke="#4B5563"
                            stroke-width="1.5"
                          />
                          <path
                            d="M12.1523 5.20833L15.6246 8.68056"
                            stroke="#4B5563"
                            stroke-width="2"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        class="flex h-[32px] w-full max-w-[95px] items-center justify-center gap-2 rounded-md border-[1px] border-[#D1D5DB] text-[14px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M15 18.3333C14.3056 18.3333 13.7153 18.0903 13.2292 17.6042C12.7431 17.1181 12.5 16.5278 12.5 15.8333C12.5 15.7361 12.5069 15.6354 12.5208 15.5312C12.5347 15.4271 12.5556 15.3333 12.5833 15.25L6.70833 11.8333C6.47222 12.0417 6.20833 12.2049 5.91667 12.3229C5.625 12.441 5.31944 12.5 5 12.5C4.30556 12.5 3.71528 12.2569 3.22917 11.7708C2.74306 11.2847 2.5 10.6944 2.5 10C2.5 9.30555 2.74306 8.71528 3.22917 8.22917C3.71528 7.74305 4.30556 7.5 5 7.5C5.31944 7.5 5.625 7.55903 5.91667 7.67708C6.20833 7.79514 6.47222 7.95833 6.70833 8.16667L12.5833 4.75C12.5556 4.66666 12.5347 4.57291 12.5208 4.46875C12.5069 4.36458 12.5 4.26389 12.5 4.16666C12.5 3.47222 12.7431 2.88194 13.2292 2.39583C13.7153 1.90972 14.3056 1.66666 15 1.66666C15.6944 1.66666 16.2847 1.90972 16.7708 2.39583C17.2569 2.88194 17.5 3.47222 17.5 4.16666C17.5 4.86111 17.2569 5.45139 16.7708 5.9375C16.2847 6.42361 15.6944 6.66666 15 6.66666C14.6806 6.66666 14.375 6.60764 14.0833 6.48958C13.7917 6.37153 13.5278 6.20833 13.2917 6L7.41667 9.41667C7.44444 9.5 7.46528 9.59375 7.47917 9.69792C7.49306 9.80208 7.5 9.90278 7.5 10C7.5 10.0972 7.49306 10.1979 7.47917 10.3021C7.46528 10.4062 7.44444 10.5 7.41667 10.5833L13.2917 14C13.5278 13.7917 13.7917 13.6285 14.0833 13.5104C14.375 13.3924 14.6806 13.3333 15 13.3333C15.6944 13.3333 16.2847 13.5764 16.7708 14.0625C17.2569 14.5486 17.5 15.1389 17.5 15.8333C17.5 16.5278 17.2569 17.1181 16.7708 17.6042C16.2847 18.0903 15.6944 18.3333 15 18.3333ZM15 5C15.2361 5 15.434 4.92014 15.5938 4.76041C15.7535 4.60069 15.8333 4.40278 15.8333 4.16666C15.8333 3.93055 15.7535 3.73264 15.5938 3.57291C15.434 3.41319 15.2361 3.33333 15 3.33333C14.7639 3.33333 14.566 3.41319 14.4062 3.57291C14.2465 3.73264 14.1667 3.93055 14.1667 4.16666C14.1667 4.40278 14.2465 4.60069 14.4062 4.76041C14.566 4.92014 14.7639 5 15 5ZM5 10.8333C5.23611 10.8333 5.43403 10.7535 5.59375 10.5937C5.75347 10.434 5.83333 10.2361 5.83333 10C5.83333 9.76389 5.75347 9.56597 5.59375 9.40625C5.43403 9.24653 5.23611 9.16667 5 9.16667C4.76389 9.16667 4.56597 9.24653 4.40625 9.40625C4.24653 9.56597 4.16667 9.76389 4.16667 10C4.16667 10.2361 4.24653 10.434 4.40625 10.5937C4.56597 10.7535 4.76389 10.8333 5 10.8333ZM15 16.6667C15.2361 16.6667 15.434 16.5868 15.5938 16.4271C15.7535 16.2674 15.8333 16.0694 15.8333 15.8333C15.8333 15.5972 15.7535 15.3993 15.5938 15.2396C15.434 15.0799 15.2361 15 15 15C14.7639 15 14.566 15.0799 14.4062 15.2396C14.2465 15.3993 14.1667 15.5972 14.1667 15.8333C14.1667 16.0694 14.2465 16.2674 14.4062 16.4271C14.566 16.5868 14.7639 16.6667 15 16.6667Z"
                            fill="#4B5563"
                          />
                        </svg>
                        Share
                      </button>
                      <button
                        on:click={handleDeletePost}
                        class="flex h-[32px] w-full max-w-[99px] items-center justify-center gap-2 rounded-md border-[1px] border-[#D1D5DB] text-[14px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M6.08975 17.0833C5.67415 17.0833 5.31919 16.9361 5.02485 16.6418C4.73051 16.3475 4.58333 15.9925 4.58333 15.5769V5H3.75V3.75002H7.49998V3.01285H12.5V3.75002H16.25V5H15.4166V15.5769C15.4166 15.9978 15.2708 16.3541 14.9791 16.6458C14.6875 16.9375 14.3312 17.0833 13.9102 17.0833H6.08975ZM14.1666 5H5.83331V15.5769C5.83331 15.6517 5.85735 15.7131 5.90544 15.7612C5.95352 15.8093 6.01496 15.8333 6.08975 15.8333H13.9102C13.9743 15.8333 14.0331 15.8066 14.0865 15.7532C14.1399 15.6998 14.1666 15.641 14.1666 15.5769V5ZM7.83654 14.1667H9.08652V6.66667H7.83654V14.1667ZM10.9134 14.1667H12.1634V6.66667H10.9134V14.1667Z"
                            fill="#4B5563"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div
                    class="relative flex w-full max-w-[328px] items-center rounded-md bg-blue-bglight py-[18px] pl-[32px] text-sm text-blue-primary"
                  >
                    <div class="flex items-center gap-4 py-[6.5px] pr-[16px]">
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
                    </div>
                    <div class="flex flex-col text-sm text-blue-primary">
                      <div class="mb-1 flex items-center gap-1">
                        <img
                          src="/icons/colocio.svg"
                          alt="Instagram"
                          class="h-4 w-4"
                        />
                        <p class="text-[14px] text-blue-primary">
                          Optimised 60%
                        </p>
                      </div>
                      <div class="flex items-center">
                        <p class="w-24 text-[12px]">Text</p>
                        <p class=" text-[12px]">100%</p>
                      </div>
                      <div class="flex items-center">
                        <p class="w-24 text-[12px]">Audience</p>
                        <p class=" text-[12px]">50%</p>
                      </div>
                      <div class="flex items-center">
                        <p class="w-24 text-[12px]">Schedule</p>
                        <p class=" text-[12px]">65%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mb-[16px] mt-5 flex items-center border-b border-gray-200 text-center text-sm"
                >
                  <button
                    type="button"
                    on:click={() => {
                      tab_selected = "engagement";
                    }}
                    class={tab_selected === "engagement"
                      ? "flex w-[115px] items-center justify-center gap-1 border-b-[1px] border-b-[#0d64e8] pb-2"
                      : "flex w-[115px] items-center justify-center gap-1 pb-2"}
                  >
                    <span
                      class="text-gray-600"
                      class:text-gray-600={tab_selected != "engagement"}
                      class:text-blue-primary={tab_selected == "engagement"}
                      >Engagement</span
                    >
                  </button>
                  <button
                    type="button"
                    on:click={() => {
                      tab_selected = "audience";
                    }}
                    class={tab_selected === "audience"
                      ? "flex w-[115px] items-center justify-center gap-1 border-b-[1px] border-b-[#0d64e8] pb-2"
                      : "flex w-[115px] items-center justify-center gap-1 pb-2"}
                  >
                    <span
                      class="text-gray-600"
                      class:text-gray-600={tab_selected != "audience"}
                      class:text-blue-primary={tab_selected == "audience"}
                      >Audience</span
                    >
                  </button>
                  <button
                    type="button"
                    on:click={() => {
                      tab_selected = "ROI";
                    }}
                    class={tab_selected === "ROI"
                      ? "flex w-[115px] items-center justify-center gap-1 border-b-[1px] border-b-[#0d64e8] pb-2"
                      : "flex w-[115px] items-center justify-center gap-1 pb-2"}
                  >
                    <span
                      class="text-gray-600"
                      class:text-gray-600={tab_selected != "ROI"}
                      class:text-blue-primary={tab_selected == "ROI"}>ROI</span
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 2.5C4.68629 2.5 2 5.18629 2 8.5C2 11.8137 4.68629 14.5 8 14.5C11.3137 14.5 14 11.8137 14 8.5C14 5.18629 11.3137 2.5 8 2.5ZM2.91455 8.5C2.91455 5.69138 5.19138 3.41455 8 3.41455C10.8086 3.41455 13.0855 5.69138 13.0855 8.5C13.0855 11.3086 10.8086 13.5855 8 13.5855C5.19138 13.5855 2.91455 11.3086 2.91455 8.5ZM8.45727 8.5C8.45727 8.24745 8.25255 8.04273 8 8.04273C7.74745 8.04273 7.54273 8.24745 7.54273 8.5V10.7171C7.54273 10.9696 7.74745 11.1744 8 11.1744C8.25255 11.1744 8.45727 10.9696 8.45727 10.7171V8.5ZM7.44573 6.83718C7.44573 6.53107 7.69388 6.28291 8 6.28291C8.30612 6.28291 8.55427 6.53107 8.55427 6.83718C8.55427 7.1433 8.30612 7.39146 8 7.39146C7.69388 7.39146 7.44573 7.1433 7.44573 6.83718Z"
                        fill={tab_selected == "ROI" ? "#0D64E8" : "#1B1D1F"}
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    on:click={() => {
                      tab_selected = "sales";
                    }}
                    class={tab_selected === "sales"
                      ? "flex w-[115px] items-center justify-center gap-1 border-b-[1px] border-b-[#0d64e8] pb-2"
                      : "flex w-[115px] items-center justify-center gap-1 pb-2"}
                  >
                    <span
                      class="text-gray-600"
                      class:text-gray-600={tab_selected != "sales"}
                      class:text-blue-primary={tab_selected == "sales"}
                      >Sales</span
                    >
                  </button>
                </div>
                {#if tab_selected === "engagement"}
                  <div
                    class="flex flex-col items-center justify-center py-[116px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="45"
                      viewBox="0 0 44 45"
                      fill="none"
                    >
                      <path
                        d="M26 30V24.0962H29.5V30H26ZM20.25 30V15H23.75V30H20.25ZM14.5 30V19.9039H18V30H14.5Z"
                        fill="#D1D5DB"
                      />
                      <rect
                        x="1"
                        y="1.5"
                        width="42"
                        height="42"
                        rx="9"
                        stroke="#D1D5DB"
                        stroke-width="2"
                      />
                    </svg>
                    <p class="mt-3 text-[18px] font-semibold text-[#D1D5DB]">
                      Metrics available on launch
                    </p>
                  </div>
                {/if}
                {#if tab_selected === "sales"}
                  <div class="mt-[16px]">
                    <div class="flex flex-col gap-4 md:flex-row">
                      <div
                        class="rounded-[12px] border-[1px] border-[#E5E7EB] md:w-[40%]"
                      >
                        <div
                          class="border-b-[1px] border-b-[#E5E7EB] p-[20px_16px] lg:p-[20px_32px]"
                        >
                          <div class="flex items-center gap-1">
                            <p class="text-[14px] font-medium text-font_dark">
                              Reach
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 2.66699C4.68629 2.66699 2 5.35328 2 8.66699C2 11.9807 4.68629 14.667 8 14.667C11.3137 14.667 14 11.9807 14 8.66699C14 5.35328 11.3137 2.66699 8 2.66699ZM2.91455 8.66699C2.91455 5.85838 5.19138 3.58154 8 3.58154C10.8086 3.58154 13.0855 5.85838 13.0855 8.66699C13.0855 11.4756 10.8086 13.7524 8 13.7524C5.19138 13.7524 2.91455 11.4756 2.91455 8.66699ZM8.45727 8.66699C8.45727 8.41445 8.25255 8.20972 8 8.20972C7.74745 8.20972 7.54273 8.41445 7.54273 8.66699V10.8841C7.54273 11.1366 7.74745 11.3414 8 11.3414C8.25255 11.3414 8.45727 11.1366 8.45727 10.8841V8.66699ZM7.44573 7.00417C7.44573 6.69806 7.69388 6.4499 8 6.4499C8.30612 6.4499 8.55427 6.69806 8.55427 7.00417C8.55427 7.31029 8.30612 7.55845 8 7.55845C7.69388 7.55845 7.44573 7.31029 7.44573 7.00417Z"
                                fill="#1B1D1F"
                              />
                            </svg>
                          </div>
                          <div class="flex items-center justify-between">
                            <div class="mt-1 flex items-end gap-[6px]">
                              <h2
                                class="text-[28px] font-semibold leading-[30px] text-[#0D64E8]"
                              >
                                1 200
                              </h2>
                              <p class="text-[12px] text-[#6B7280]">
                                Ad avg. 1 000
                              </p>
                            </div>
                            <div
                              class="flex h-[24px] items-center justify-center rounded-[100px] bg-[#E4FDEA] px-2 text-[14px] text-[#02AB46]"
                            >
                              Good
                            </div>
                          </div>
                        </div>
                        <div
                          class="border-b-[1px] border-b-[#E5E7EB] p-[20px_16px] lg:p-[20px_32px]"
                        >
                          <div class="flex items-center gap-1">
                            <p class="text-[14px] font-medium text-font_dark">
                              Impressions
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 2.66699C4.68629 2.66699 2 5.35328 2 8.66699C2 11.9807 4.68629 14.667 8 14.667C11.3137 14.667 14 11.9807 14 8.66699C14 5.35328 11.3137 2.66699 8 2.66699ZM2.91455 8.66699C2.91455 5.85838 5.19138 3.58154 8 3.58154C10.8086 3.58154 13.0855 5.85838 13.0855 8.66699C13.0855 11.4756 10.8086 13.7524 8 13.7524C5.19138 13.7524 2.91455 11.4756 2.91455 8.66699ZM8.45727 8.66699C8.45727 8.41445 8.25255 8.20972 8 8.20972C7.74745 8.20972 7.54273 8.41445 7.54273 8.66699V10.8841C7.54273 11.1366 7.74745 11.3414 8 11.3414C8.25255 11.3414 8.45727 11.1366 8.45727 10.8841V8.66699ZM7.44573 7.00417C7.44573 6.69806 7.69388 6.4499 8 6.4499C8.30612 6.4499 8.55427 6.69806 8.55427 7.00417C8.55427 7.31029 8.30612 7.55845 8 7.55845C7.69388 7.55845 7.44573 7.31029 7.44573 7.00417Z"
                                fill="#1B1D1F"
                              />
                            </svg>
                          </div>
                          <div class="flex items-center justify-between">
                            <div class="mt-1 flex items-end gap-[6px]">
                              <h2
                                class="text-[28px] font-semibold leading-[30px] text-[#0D64E8]"
                              >
                                3 000
                              </h2>
                              <p class="text-[12px] text-[#6B7280]">
                                Ad avg. 1 000
                              </p>
                            </div>
                            <div
                              class="flex h-[24px] items-center justify-center rounded-[100px] bg-[#E4FDEA] px-2 text-[14px] text-[#02AB46]"
                            >
                              Great!
                            </div>
                          </div>
                        </div>
                        <div class="p-[20px_16px] lg:p-[20px_32px]">
                          <div class="flex items-center gap-1">
                            <p class="text-[14px] font-medium text-font_dark">
                              Conversions (Clicks)
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 2.66699C4.68629 2.66699 2 5.35328 2 8.66699C2 11.9807 4.68629 14.667 8 14.667C11.3137 14.667 14 11.9807 14 8.66699C14 5.35328 11.3137 2.66699 8 2.66699ZM2.91455 8.66699C2.91455 5.85838 5.19138 3.58154 8 3.58154C10.8086 3.58154 13.0855 5.85838 13.0855 8.66699C13.0855 11.4756 10.8086 13.7524 8 13.7524C5.19138 13.7524 2.91455 11.4756 2.91455 8.66699ZM8.45727 8.66699C8.45727 8.41445 8.25255 8.20972 8 8.20972C7.74745 8.20972 7.54273 8.41445 7.54273 8.66699V10.8841C7.54273 11.1366 7.74745 11.3414 8 11.3414C8.25255 11.3414 8.45727 11.1366 8.45727 10.8841V8.66699ZM7.44573 7.00417C7.44573 6.69806 7.69388 6.4499 8 6.4499C8.30612 6.4499 8.55427 6.69806 8.55427 7.00417C8.55427 7.31029 8.30612 7.55845 8 7.55845C7.69388 7.55845 7.44573 7.31029 7.44573 7.00417Z"
                                fill="#1B1D1F"
                              />
                            </svg>
                          </div>
                          <div class="flex items-center justify-between">
                            <div class="mt-1 flex items-end gap-[6px]">
                              <h2
                                class="text-[28px] font-semibold leading-[30px] text-[#0D64E8]"
                              >
                                320
                              </h2>
                              <p class="text-[12px] text-[#6B7280]">
                                Ad avg. 280
                              </p>
                            </div>
                            <div
                              class="flex h-[24px] items-center justify-center rounded-[100px] bg-[#E4FDEA] px-2 text-[14px] text-[#02AB46]"
                            >
                              Good
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="rounded-[12px] border-[1px] border-[#E5E7EB] p-4 md:w-[60%]"
                      >
                        <!--<canvas bind:this={chartCanvas} id="myChart"></canvas>-->
                        <p class="text-[14px] text-font_dark">
                          Conversion growth
                        </p>
                        <div class="my-[16px] flex items-center gap-4">
                          <div class="flex items-center gap-1">
                            <div class="h-4 w-4 rounded-full bg-[#0D64E8]" />
                            <p class="text-[12px] text-[#474747]">To date</p>
                          </div>
                          <div class="flex items-center gap-1">
                            <div class="h-4 w-4 rounded-full bg-[#9FB8DE]" />
                            <p class="text-[12px] text-[#474747]">Predicted</p>
                          </div>
                        </div>
                        <ConversonCard />
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
            {:else}
              <div class="mt-5 lg:mt-0">
                <div class="flex flex-col items-start gap-8 md:flex-row">
                  <div class="w-full">
                    <div>
                      <div class="flex items-center gap-2">
                        <p class="text-[18px] text-font_dark">
                          {isOpen.details.message}
                        </p>
                        {#if isOpen.details.status === "ACTIVE"}
                          <div
                            class="flex h-[24px] items-center justify-center rounded-[100px] bg-[#E4FDEA] px-2 text-[14px] text-[#02AB46]"
                          >
                            Live
                          </div>
                        {/if}
                      </div>
                      {#if isOpen.details.status === "ACTIVE"}
                        <div
                          class="relative mt-2 flex items-end justify-between gap-8 rounded-md bg-blue-bglight p-[12px] text-sm text-blue-primary"
                        >
                          <div class="flex items-start gap-1">
                            <div>
                              <div class="font-semibold">Improve ad</div>
                              <div class="text-xs">
                                This ad’s is not performing to standard. I have
                                a few suggestion how to improve it. Click edit
                                and follow my prompts.
                              </div>
                            </div>
                          </div>
                          <button
                            on:click={handaleModal}
                            class="flex h-[32px] w-full max-w-[102px] items-center justify-center gap-2 rounded-md bg-[#0D64E8] text-[14px] text-white"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M13.3426 4.0184C14.1237 3.23735 15.39 3.23735 16.171 4.0184L16.8148 4.6622C17.5959 5.44324 17.5959 6.70957 16.8148 7.49062L8.24058 16.0649C7.96138 16.3441 7.60578 16.5344 7.2186 16.6118L3.76629 17.3023C3.62634 17.3303 3.50296 17.2069 3.53095 17.067L4.22141 13.6146C4.29885 13.2275 4.48916 12.8719 4.76836 12.5927L13.3426 4.0184Z"
                                stroke="white"
                                stroke-width="1.5"
                              />
                              <path
                                d="M12.1523 5.20831L15.6246 8.68054"
                                stroke="white"
                                stroke-width="2"
                              />
                            </svg> Edit ad</button
                          >
                        </div>
                      {/if}
                      <hr class="my-2 h-[1px] bg-[#D1D5DB]" />
                    </div>
                    <div
                      class="flex items-start justify-between sm:items-center"
                    >
                      <div class="flex gap-2">
                        <div
                          class="flex h-[21px] w-[26px] items-center justify-center rounded-md bg-[#0024A4] text-[12px] text-white"
                        >
                          Ad
                        </div>
                        <p
                          class="text-[12px] font-normal text-[#0024A4] sm:text-[14px]"
                        >
                          {isOpen.details.scheduled}
                        </p>
                      </div>

                      <div class="flex items-center gap-1">
                        {#if isOpen.details.platforms_ad.includes("Facebook")}
                          <button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                d="M11 6.70002H8.9905V5.50003C8.9905 4.88083 9.03838 4.49083 9.88152 4.49083H10.9464V2.58284C10.4282 2.52644 9.90717 2.49884 9.38556 2.50004C7.83895 2.50004 6.71021 3.49423 6.71021 5.31943V6.70002H5V9.10002L6.71021 9.09942V14.5H8.9905V9.09822L10.7383 9.09762L11 6.70002Z"
                                fill="#0024A4"
                              />
                            </svg>
                          </button>
                        {/if}
                        {#if isOpen.details.platforms_ad.includes("Instagram")}
                          <button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                d="M5.33333 2.5C3.49533 2.5 2 3.99533 2 5.83333V11.1667C2 13.0047 3.49533 14.5 5.33333 14.5H10.6667C12.5047 14.5 14 13.0047 14 11.1667V5.83333C14 3.99533 12.5047 2.5 10.6667 2.5H5.33333ZM5.33333 3.83333H10.6667C11.7693 3.83333 12.6667 4.73067 12.6667 5.83333V11.1667C12.6667 12.2693 11.7693 13.1667 10.6667 13.1667H5.33333C4.23067 13.1667 3.33333 12.2693 3.33333 11.1667V5.83333C3.33333 4.73067 4.23067 3.83333 5.33333 3.83333ZM11.3333 4.5C11.1565 4.5 10.987 4.57024 10.8619 4.69526C10.7369 4.82029 10.6667 4.98986 10.6667 5.16667C10.6667 5.34348 10.7369 5.51305 10.8619 5.63807C10.987 5.7631 11.1565 5.83333 11.3333 5.83333C11.5101 5.83333 11.6797 5.7631 11.8047 5.63807C11.9298 5.51305 12 5.34348 12 5.16667C12 4.98986 11.9298 4.82029 11.8047 4.69526C11.6797 4.57024 11.5101 4.5 11.3333 4.5ZM8 5.16667C6.162 5.16667 4.66667 6.662 4.66667 8.5C4.66667 10.338 6.162 11.8333 8 11.8333C9.838 11.8333 11.3333 10.338 11.3333 8.5C11.3333 6.662 9.838 5.16667 8 5.16667ZM8 6.5C9.10267 6.5 10 7.39733 10 8.5C10 9.60267 9.10267 10.5 8 10.5C6.89733 10.5 6 9.60267 6 8.5C6 7.39733 6.89733 6.5 8 6.5Z"
                                fill="#0024A4"
                              />
                            </svg>
                          </button>
                        {/if}
                      </div>
                    </div>
                    <div class="mt-2 flex gap-2">
                      <!--<div
                          class="flex h-[21px] items-center justify-center rounded-md bg-[#6717CC] px-[5px] text-[12px] text-white"
                        >
                          Camp
                        </div>
                        <p class="text-[14px] font-normal text-[#6717CC]">
                          Summer Campaign ‘23
                        </p>-->
                    </div>
                    <div
                      class="mt-3 flex items-start gap-2 rounded-[6px] border-[1px] border-[#D1D5DB] p-2"
                    >
                      <img
                        src={isOpen.details.full_picture || "/images/food.png"}
                        alt="food"
                        class="w-[60px] h-[60px] rounded-[4px] object-cover"
                      />
                      <div>
                        <h2 class="text-[14px] font-medium text-font_dark">
                          {isOpen.details.message || ""}
                        </h2>
                        <p class="text-[14px] text-[#4B5563]">
                          {isOpen.details.description || ""}
                        </p>
                        <hr class="my-[5px] h-[1px] bg-[#E5E7EB]" />
                        <div class="flex flex-wrap gap-4">
                          <div class="flex gap-1">
                            <p class="text-[14px] font-normal text-font_dark">
                              Likes
                            </p>
                            <p class="text-[14px] font-medium text-font_dark">
                              {likes}
                            </p>
                          </div>
                          <div class="flex gap-1">
                            <p class="text-[14px] font-normal text-font_dark">
                              Comments
                            </p>
                            <p class="text-[14px] font-medium text-font_dark">
                              {comments || 0}
                            </p>
                          </div>
                          <div class="flex gap-1">
                            <p class="text-[14px] font-normal text-font_dark">
                              Shares
                            </p>
                            <p class="text-[14px] font-medium text-font_dark">
                              {shares}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-[12px] flex gap-3">
                      <button
                        class="flex h-[32px] w-full max-w-[82px] items-center justify-center gap-2 rounded-md border-[1px] border-[#D1D5DB] text-[14px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.3426 4.01838C14.1237 3.23733 15.39 3.23733 16.171 4.01838L16.8148 4.66218C17.5959 5.44322 17.5959 6.70955 16.8148 7.4906L8.24058 16.0649C7.96138 16.3441 7.60578 16.5344 7.2186 16.6118L3.76629 17.3023C3.62634 17.3303 3.50296 17.2069 3.53095 17.0669L4.22141 13.6146C4.29885 13.2274 4.48916 12.8718 4.76836 12.5926L13.3426 4.01838Z"
                            stroke="#4B5563"
                            stroke-width="1.5"
                          />
                          <path
                            d="M12.1523 5.20833L15.6246 8.68056"
                            stroke="#4B5563"
                            stroke-width="2"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        class="flex h-[32px] w-full max-w-[95px] items-center justify-center gap-2 rounded-md border-[1px] border-[#D1D5DB] text-[14px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M11.0413 15.4167V4.58337H15.4163V15.4167H11.0413ZM4.58301 15.4167V4.58337H8.95797V15.4167H4.58301ZM12.2913 14.1667H14.1663V5.83335H12.2913V14.1667ZM5.83299 14.1667H7.70801V5.83335H5.83299V14.1667Z"
                            fill="#4B5563"
                          />
                        </svg>
                        Pause
                      </button>
                      <button
                        on:click={handleDeletePost}
                        class="flex h-[32px] w-full max-w-[99px] items-center justify-center gap-2 rounded-md border-[1px] border-[#D1D5DB] text-[14px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M6.08975 17.0833C5.67415 17.0833 5.31919 16.9361 5.02485 16.6418C4.73051 16.3475 4.58333 15.9925 4.58333 15.5769V5H3.75V3.75002H7.49998V3.01285H12.5V3.75002H16.25V5H15.4166V15.5769C15.4166 15.9978 15.2708 16.3541 14.9791 16.6458C14.6875 16.9375 14.3312 17.0833 13.9102 17.0833H6.08975ZM14.1666 5H5.83331V15.5769C5.83331 15.6517 5.85735 15.7131 5.90544 15.7612C5.95352 15.8093 6.01496 15.8333 6.08975 15.8333H13.9102C13.9743 15.8333 14.0331 15.8066 14.0865 15.7532C14.1399 15.6998 14.1666 15.641 14.1666 15.5769V5ZM7.83654 14.1667H9.08652V6.66667H7.83654V14.1667ZM10.9134 14.1667H12.1634V6.66667H10.9134V14.1667Z"
                            fill="#4B5563"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div
                    class="relative flex w-full items-center rounded-md bg-blue-bglight py-[18px] pl-[22px] text-sm text-blue-primary sm:pl-[32px] md:max-w-[280px] lg:max-w-[328px]"
                  >
                    <div class="flex items-center gap-4 py-[6.5px] pr-[16px]">
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
                    </div>
                    <div class="flex flex-col text-sm text-blue-primary">
                      <div class="mb-1 flex items-center gap-1">
                        <img
                          src="/icons/colocio.svg"
                          alt="Instagram"
                          class="h-4 w-4"
                        />
                        <p class="text-[14px] text-blue-primary">
                          Optimised 60%
                        </p>
                      </div>
                      <div class="flex items-center">
                        <p class="w-24 text-[12px]">Text</p>
                        <p class=" text-[12px]">100%</p>
                      </div>
                      <div class="flex items-center">
                        <p class="w-24 text-[12px]">Audience</p>
                        <p class=" text-[12px]">50%</p>
                      </div>
                      <div class="flex items-center">
                        <p class="w-24 text-[12px]">Schedule</p>
                        <p class=" text-[12px]">65%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mb-[16px] mt-5 flex items-center border-b border-gray-200 text-center text-sm"
                >
                  <button
                    type="button"
                    on:click={() => {
                      tab_selected = "ROI";
                    }}
                    class={tab_selected === "ROI"
                      ? "flex w-[115px] items-center justify-center gap-1 border-b-[1px] border-b-[#0d64e8] pb-2"
                      : "flex w-[115px] items-center justify-center gap-1 pb-2"}
                  >
                    <span
                      class="text-gray-600"
                      class:text-gray-600={tab_selected != "ROI"}
                      class:text-blue-primary={tab_selected == "ROI"}>ROI</span
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 2.5C4.68629 2.5 2 5.18629 2 8.5C2 11.8137 4.68629 14.5 8 14.5C11.3137 14.5 14 11.8137 14 8.5C14 5.18629 11.3137 2.5 8 2.5ZM2.91455 8.5C2.91455 5.69138 5.19138 3.41455 8 3.41455C10.8086 3.41455 13.0855 5.69138 13.0855 8.5C13.0855 11.3086 10.8086 13.5855 8 13.5855C5.19138 13.5855 2.91455 11.3086 2.91455 8.5ZM8.45727 8.5C8.45727 8.24745 8.25255 8.04273 8 8.04273C7.74745 8.04273 7.54273 8.24745 7.54273 8.5V10.7171C7.54273 10.9696 7.74745 11.1744 8 11.1744C8.25255 11.1744 8.45727 10.9696 8.45727 10.7171V8.5ZM7.44573 6.83718C7.44573 6.53107 7.69388 6.28291 8 6.28291C8.30612 6.28291 8.55427 6.53107 8.55427 6.83718C8.55427 7.1433 8.30612 7.39146 8 7.39146C7.69388 7.39146 7.44573 7.1433 7.44573 6.83718Z"
                        fill={tab_selected == "ROI" ? "#0D64E8" : "#1B1D1F"}
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    on:click={() => {
                      tab_selected = "sales";
                    }}
                    class={tab_selected === "sales"
                      ? "flex w-[115px] items-center justify-center gap-1 border-b-[1px] border-b-[#0d64e8] pb-2"
                      : "flex w-[115px] items-center justify-center gap-1 pb-2"}
                  >
                    <span
                      class="text-gray-600"
                      class:text-gray-600={tab_selected != "sales"}
                      class:text-blue-primary={tab_selected == "sales"}
                      >Sales</span
                    >
                  </button>
                  <button
                    type="button"
                    on:click={() => {
                      tab_selected = "audience";
                    }}
                    class={tab_selected === "audience"
                      ? "flex w-[115px] items-center justify-center gap-1 border-b-[1px] border-b-[#0d64e8] pb-2"
                      : "flex w-[115px] items-center justify-center gap-1 pb-2"}
                  >
                    <span
                      class="text-gray-600"
                      class:text-gray-600={tab_selected != "audience"}
                      class:text-blue-primary={tab_selected == "audience"}
                      >Audience</span
                    >
                  </button>
                </div>
                {#if tab_selected === "engagement"}
                  <div
                    class="flex flex-col items-center justify-center py-[116px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="45"
                      viewBox="0 0 44 45"
                      fill="none"
                    >
                      <path
                        d="M26 30V24.0962H29.5V30H26ZM20.25 30V15H23.75V30H20.25ZM14.5 30V19.9039H18V30H14.5Z"
                        fill="#D1D5DB"
                      />
                      <rect
                        x="1"
                        y="1.5"
                        width="42"
                        height="42"
                        rx="9"
                        stroke="#D1D5DB"
                        stroke-width="2"
                      />
                    </svg>
                    <p class="mt-3 text-[18px] font-semibold text-[#D1D5DB]">
                      Metrics available on launch
                    </p>
                  </div>
                {/if}
                {#if tab_selected === "sales"}
                  <div class="mt-[16px]">
                    <div class="flex flex-col gap-4 md:flex-row">
                      <div
                        class="rounded-[12px] border-[1px] border-[#E5E7EB] md:w-[40%]"
                      >
                        <div
                          class="border-b-[1px] border-b-[#E5E7EB] p-[20px_16px] lg:p-[20px_32px]"
                        >
                          <div class="flex items-center gap-1">
                            <p class="text-[14px] font-medium text-font_dark">
                              Reach
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 2.66699C4.68629 2.66699 2 5.35328 2 8.66699C2 11.9807 4.68629 14.667 8 14.667C11.3137 14.667 14 11.9807 14 8.66699C14 5.35328 11.3137 2.66699 8 2.66699ZM2.91455 8.66699C2.91455 5.85838 5.19138 3.58154 8 3.58154C10.8086 3.58154 13.0855 5.85838 13.0855 8.66699C13.0855 11.4756 10.8086 13.7524 8 13.7524C5.19138 13.7524 2.91455 11.4756 2.91455 8.66699ZM8.45727 8.66699C8.45727 8.41445 8.25255 8.20972 8 8.20972C7.74745 8.20972 7.54273 8.41445 7.54273 8.66699V10.8841C7.54273 11.1366 7.74745 11.3414 8 11.3414C8.25255 11.3414 8.45727 11.1366 8.45727 10.8841V8.66699ZM7.44573 7.00417C7.44573 6.69806 7.69388 6.4499 8 6.4499C8.30612 6.4499 8.55427 6.69806 8.55427 7.00417C8.55427 7.31029 8.30612 7.55845 8 7.55845C7.69388 7.55845 7.44573 7.31029 7.44573 7.00417Z"
                                fill="#1B1D1F"
                              />
                            </svg>
                          </div>
                          <div class="flex items-center justify-between">
                            <div class="mt-1 flex items-end gap-[6px]">
                              <h2
                                class="text-[28px] font-semibold leading-[30px] text-[#0D64E8]"
                              >
                                {reach}
                              </h2>
                              <p class="text-[12px] text-[#6B7280]">
                                Ad avg. 1 000
                              </p>
                            </div>
                            <div
                              class="flex h-[24px] items-center justify-center rounded-[100px] bg-[#E4FDEA] px-2 text-[14px] text-[#02AB46]"
                            >
                              Good
                            </div>
                          </div>
                        </div>
                        <div
                          class="border-b-[1px] border-b-[#E5E7EB] p-[20px_16px] lg:p-[20px_32px]"
                        >
                          <div class="flex items-center gap-1">
                            <p class="text-[14px] font-medium text-font_dark">
                              Impressions
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 2.66699C4.68629 2.66699 2 5.35328 2 8.66699C2 11.9807 4.68629 14.667 8 14.667C11.3137 14.667 14 11.9807 14 8.66699C14 5.35328 11.3137 2.66699 8 2.66699ZM2.91455 8.66699C2.91455 5.85838 5.19138 3.58154 8 3.58154C10.8086 3.58154 13.0855 5.85838 13.0855 8.66699C13.0855 11.4756 10.8086 13.7524 8 13.7524C5.19138 13.7524 2.91455 11.4756 2.91455 8.66699ZM8.45727 8.66699C8.45727 8.41445 8.25255 8.20972 8 8.20972C7.74745 8.20972 7.54273 8.41445 7.54273 8.66699V10.8841C7.54273 11.1366 7.74745 11.3414 8 11.3414C8.25255 11.3414 8.45727 11.1366 8.45727 10.8841V8.66699ZM7.44573 7.00417C7.44573 6.69806 7.69388 6.4499 8 6.4499C8.30612 6.4499 8.55427 6.69806 8.55427 7.00417C8.55427 7.31029 8.30612 7.55845 8 7.55845C7.69388 7.55845 7.44573 7.31029 7.44573 7.00417Z"
                                fill="#1B1D1F"
                              />
                            </svg>
                          </div>
                          <div class="flex items-center justify-between">
                            <div class="mt-1 flex items-end gap-[6px]">
                              <h2
                                class="text-[28px] font-semibold leading-[30px] text-[#0D64E8]"
                              >
                                {impressions}
                              </h2>
                              <p class="text-[12px] text-[#6B7280]">
                                Ad avg. 1 000
                              </p>
                            </div>
                            <div
                              class="flex h-[24px] items-center justify-center rounded-[100px] bg-[#E4FDEA] px-2 text-[14px] text-[#02AB46]"
                            >
                              Great!
                            </div>
                          </div>
                        </div>
                        <div class="p-[20px_16px] lg:p-[20px_32px]">
                          <div class="flex items-center gap-1">
                            <p class="text-[14px] font-medium text-font_dark">
                              Conversions (Clicks)
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 2.66699C4.68629 2.66699 2 5.35328 2 8.66699C2 11.9807 4.68629 14.667 8 14.667C11.3137 14.667 14 11.9807 14 8.66699C14 5.35328 11.3137 2.66699 8 2.66699ZM2.91455 8.66699C2.91455 5.85838 5.19138 3.58154 8 3.58154C10.8086 3.58154 13.0855 5.85838 13.0855 8.66699C13.0855 11.4756 10.8086 13.7524 8 13.7524C5.19138 13.7524 2.91455 11.4756 2.91455 8.66699ZM8.45727 8.66699C8.45727 8.41445 8.25255 8.20972 8 8.20972C7.74745 8.20972 7.54273 8.41445 7.54273 8.66699V10.8841C7.54273 11.1366 7.74745 11.3414 8 11.3414C8.25255 11.3414 8.45727 11.1366 8.45727 10.8841V8.66699ZM7.44573 7.00417C7.44573 6.69806 7.69388 6.4499 8 6.4499C8.30612 6.4499 8.55427 6.69806 8.55427 7.00417C8.55427 7.31029 8.30612 7.55845 8 7.55845C7.69388 7.55845 7.44573 7.31029 7.44573 7.00417Z"
                                fill="#1B1D1F"
                              />
                            </svg>
                          </div>
                          <div class="flex items-center justify-between">
                            <div class="mt-1 flex items-end gap-[6px]">
                              <h2
                                class="text-[28px] font-semibold leading-[30px] text-[#0D64E8]"
                              >
                                {clicks}
                              </h2>
                              <p class="text-[12px] text-[#6B7280]">
                                Ad avg. 280
                              </p>
                            </div>
                            <div
                              class="flex h-[24px] items-center justify-center rounded-[100px] bg-[#E4FDEA] px-2 text-[14px] text-[#02AB46]"
                            >
                              Good
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="rounded-[12px] border-[1px] border-[#E5E7EB] p-4 md:w-[60%]"
                      >
                        <p class="text-[14px] text-font_dark">
                          Conversion growth
                        </p>
                        <div class="my-[16px] flex items-center gap-4">
                          <div class="flex items-center gap-1">
                            <div class="h-4 w-4 rounded-full bg-[#0D64E8]" />
                            <p class="text-[12px] text-[#474747]">To date</p>
                          </div>
                          <div class="flex items-center gap-1">
                            <div class="h-4 w-4 rounded-full bg-[#9FB8DE]" />
                            <p class="text-[12px] text-[#474747]">Predicted</p>
                          </div>
                        </div>
                        <ConversonCard />
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
<EditAd post={postToEdit} />
