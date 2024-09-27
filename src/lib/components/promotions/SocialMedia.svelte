<script lang="ts">
  import { library } from "$lib/stores/stores";
  import { createEventDispatcher } from "svelte";
  import { Tabs, TabItem } from "flowbite-svelte";

  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

  const dispatch = createEventDispatcher();
  export let PreviewData;
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
    // Hide all divs
    const divs = document.querySelectorAll(".content");
    divs.forEach((div) => div.classList.add("hidden"));

    // Show the current div
    const currentDiv = document.getElementById(index);
    if (currentDiv) {
      currentDiv.classList.remove("hidden");
    }
  }

  // Function to handle tab click
  function handleTabClick(index: any) {
    currentIndex = index;
    showDiv(currentIndex);
  }

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
  let title = "Title";
  let description = "Add description next";
  let headline_1 = "";
  let headline_2 = "";
  let bool_show_button = true;
  let action_button_text = "";
  let selected_library: any[] = [];

  $: {
    selected_library = $library.filter((media: any) => media.selected);
  }
</script>

<div
  class="bg-white rounded-xl drop-shadow-md lg:w-[350px] w-full font-roboto sm:p-4 p-2 border border-gray-200"
>
  <div>
    {#if PreviewData == true}
      <div class="flex gap-[12px] items-center mb-[16px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="44"
          viewBox="0 0 45 44"
          fill="none"
        >
          <path
            d="M11.0743 22.4196L11.0581 22.4583L11.0743 22.497C12.0498 24.8217 13.5707 26.6779 15.6358 28.0632C17.701 29.4487 19.9904 30.1416 22.5013 30.1416C25.0122 30.1416 27.301 29.4487 29.3653 28.0632C31.4294 26.6778 32.9498 24.8217 33.9253 22.497L33.9415 22.4583L33.9253 22.4196C32.9498 20.0949 31.4289 18.2388 29.3638 16.8534C27.2986 15.4679 25.0092 14.775 22.4983 14.775C19.9874 14.775 17.6986 15.4679 15.6343 16.8534C13.5702 18.2388 12.0498 20.0949 11.0743 22.4196ZM22.5023 26.9749C23.756 26.9749 24.8241 26.535 25.7008 25.6567C26.5773 24.7784 27.0164 23.7095 27.0164 22.4558C27.0164 21.2021 26.5765 20.134 25.6982 19.2573C24.8199 18.3808 23.751 17.9417 22.4973 17.9417C21.2436 17.9417 20.1755 18.3816 19.2988 19.2599C18.4223 20.1382 17.9832 21.2071 17.9832 22.4608C17.9832 23.7145 18.4231 24.7826 19.3014 25.6593C20.1797 26.5359 21.2486 26.9749 22.5023 26.9749ZM22.4998 25.2833C21.7135 25.2833 21.0484 25.0093 20.4986 24.4595C19.9488 23.9097 19.6748 23.2446 19.6748 22.4583C19.6748 21.672 19.9488 21.0069 20.4986 20.4571C21.0484 19.9074 21.7135 19.6333 22.4998 19.6333C23.2861 19.6333 23.9512 19.9074 24.501 20.4571C25.0507 21.0069 25.3248 21.672 25.3248 22.4583C25.3248 23.2446 25.0507 23.9097 24.501 24.4595C23.9512 25.0093 23.2861 25.2833 22.4998 25.2833ZM28.0663 26.7206C26.3762 27.7847 24.5215 28.3166 22.4998 28.3166C20.4781 28.3166 18.6234 27.7847 16.9333 26.7206C15.2566 25.6649 13.972 24.2447 13.0782 22.4583C13.972 20.6719 15.2566 19.2517 16.9333 18.1961C18.6234 17.1319 20.4781 16.6 22.4998 16.6C24.5215 16.6 26.3762 17.1319 28.0663 18.1961C29.743 19.2517 31.0276 20.6719 31.9214 22.4583C31.0276 24.2447 29.743 25.6649 28.0663 26.7206Z"
            fill="#0D64E8"
            stroke="#0D64E8"
            stroke-width="0.2"
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
        <h2 class="text-[#111827] text-[18px] font-semibold">Preview</h2>
      </div>
    {/if}
    <div class="carousel-container">
      <Tabs class="tab-main">
        {#each tabs as tab, index (tab.title)}
          <div
            class="flex flex-col tab-data tab-data2 justify-center items-center {currentIndex ===
            index
              ? 'active'
              : ''}"
            on:click={() => handleTabClick(index)}
          >
            {#if index == 3}
              <!-- SVG icon specifically for index 3 -->
              <svg
                width="20"
                height="16"
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 0H12.75V10H0.75V0ZM5.44999 1.15383V4.42309H11.6667V1.15383H5.44999ZM11.6667 5.57691H9.10554V8.84617H11.6667V5.57691ZM5.44999 5.57691V8.84617H8.02224V5.57691H5.44999ZM1.83332 8.84617H4.36667V1.15383H1.83332V8.84617Z"
                  fill="currentColor"
                />
              </svg>
            {:else if tab.icon}
              <FontAwesomeIcon icon={tab.icon} />
            {/if}
            <TabItem open={currentIndex === index} title={tab.title}>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                <b>{tab.title}</b>
                <!--{tab.content}-->
              </p>
            </TabItem>
          </div>
        {/each}
      </Tabs>
    </div>

    <div id="0" class="facebook-post content">
      <div class="flex flex-col pt-4 border border-gray-300 rounded-xl">
        <div class="flex px-4 items-center justify-around">
          <div class="flex items-center gap-3 flex-1">
            <button
              class="w-[42px] h-[42px] rounded-[10px] flex justify-center items-center bg-[#0024A4]"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.9993 0.829498C5.83018 0.829498 0.829102 5.83057 0.829102 11.9997C0.829102 14.959 1.97987 17.6495 3.85832 19.6481L2.27076 23.1699H7.05792L7.48847 22.2217C8.86798 22.8313 10.3941 23.1699 11.9993 23.1699C13.8361 23.1699 15.5694 22.7266 17.0979 21.9411L17.6481 23.1699H22.4492L20.615 19.1096C22.2108 17.178 23.1695 14.7008 23.1695 11.9997C23.1695 5.94741 18.3561 1.01935 12.3485 0.834854L12.3461 0.829498L12.3437 0.834706C12.2293 0.831242 12.1145 0.829498 11.9993 0.829498ZM12.3437 0.834706L11.8729 1.86891L3.85832 19.6481C4.87689 20.7319 6.10943 21.6122 7.48847 22.2217L8.5052 19.9824L8.57478 19.8161H16.1452L16.2148 19.9685L17.0979 21.9411C18.4554 21.2435 19.6513 20.276 20.615 19.1096L12.8331 1.88277L12.3485 0.834854C12.3469 0.834804 12.3453 0.834755 12.3437 0.834706ZM14.1134 15.3535H10.5926L12.36 11.4454L14.1134 15.3535Z"
                  fill="white"
                />
              </svg>
            </button>
            <div class="flex flex-col">
              <h4 class="font-bold text-gray-900">Amazing Company</h4>
              <div class="text-xs text-gray-500 flex items-center gap-1">
                Sponsored .
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.98583 2.87644L9.08011 3.15905C9.0875 3.18122 9.09455 3.20317 9.10129 3.22489C9.20465 3.55843 9.23239 3.84302 9.20783 4.07818C9.18511 4.29576 9.11127 4.51876 8.95932 4.67071C8.76406 4.86598 8.69526 4.86598 8.5 4.67071C8.32138 4.4921 8.15307 4.32804 8.20653 4.01604C8.20875 4.00655 8.21131 3.99276 8.21324 3.9743C8.22111 3.899 8.21756 3.75329 8.14754 3.52555C8.10326 3.39239 8.04978 3.23147 8.03155 3.17638L8.02612 3.15994L8.02396 3.15329L8.02257 3.14891L8.02074 3.14291L8.01866 3.13572C8.0177 3.13226 8.01505 3.12222 8.01344 3.11562C8.00967 3.09841 8.003 2.94432 8.03669 2.81173C8.45358 2.50215 8.93826 2.75953 8.95398 2.79071C8.95805 2.79978 8.96371 2.81328 8.96545 2.81765L8.96868 2.82611C8.97052 2.83106 8.9721 2.83563 8.9721 2.83563C8.97415 2.84152 8.9794 2.85719 8.98583 2.87644Z"
                    fill="#65676B"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.58449 5.22209C8.32699 5.37468 8.04107 5.57849 7.81802 5.77676C7.4227 6.12815 6.88426 6.18083 6.51708 6.18083C6.31993 6.18083 6.1362 6.16495 5.99389 6.1505C5.95043 6.14608 5.92019 6.14282 5.89293 6.13989C5.86651 6.13704 5.84288 6.1345 5.8127 6.13149C5.7886 6.12909 5.76997 6.12743 5.75542 6.12638C5.74284 6.12548 5.73695 6.12532 5.73587 6.12528C5.60799 6.12528 5.49759 6.08631 5.43259 6.05994C5.35868 6.02994 5.28635 5.99193 5.22214 5.95523C5.09766 5.8841 4.96069 5.79278 4.84184 5.71354L4.83348 5.70797C4.77537 5.66923 4.72125 5.6332 4.67097 5.60054C4.64956 5.66594 4.62426 5.7389 4.59581 5.80717C4.54761 5.92284 4.46551 6.0901 4.31802 6.2212C4.21742 6.31062 4.05797 6.45333 3.92389 6.61835C3.7736 6.80333 3.73583 6.91982 3.73583 6.95861V7.01855L3.22167 9.13234C3.1564 9.40066 2.88598 9.56527 2.61766 9.5C2.34934 9.43473 2.18473 9.16431 2.25 8.89599L2.73813 6.88925C2.76289 6.51316 2.98311 6.19043 3.14778 5.98776C3.33231 5.76064 3.53986 5.57495 3.6433 5.483C3.64693 5.47703 3.65745 5.45924 3.67273 5.42255C3.69623 5.36617 3.71562 5.3053 3.74167 5.2235C3.74737 5.20563 3.75338 5.18676 3.75982 5.16672C3.78871 5.07684 3.83506 4.93327 3.90716 4.8115C3.97757 4.69258 4.15587 4.45861 4.48583 4.45861C4.61371 4.45861 4.72408 4.49757 4.78908 4.52395C4.86299 4.55394 4.93531 4.59196 4.99953 4.62866C5.12401 4.69979 5.26097 4.7911 5.37982 4.87034L5.38818 4.87592C5.51743 4.96208 5.62694 5.03479 5.71828 5.08699C5.75229 5.10642 5.77727 5.1192 5.79434 5.12709C5.86486 5.13092 5.95058 5.14017 6.02542 5.14825C6.0501 5.15091 6.07359 5.15344 6.09496 5.15562C6.22609 5.16894 6.37049 5.18083 6.51708 5.18083C6.83741 5.18083 7.04897 5.1224 7.15365 5.02935C7.4306 4.78318 7.88724 4.48542 8.19225 4.30468C8.34501 4.21415 8.38013 4.19072 8.51913 4.13107C8.63795 4.08009 8.81318 4.01417 8.98583 4.01417C9.21899 4.01417 9.48536 4.10568 9.6889 4.19615C9.90497 4.29218 10.1419 4.42832 10.318 4.58491C10.5244 4.76837 10.543 5.0844 10.3595 5.29079C10.1761 5.49718 9.86004 5.51577 9.65365 5.33232C9.57981 5.26668 9.4417 5.1806 9.28276 5.10996C9.20666 5.07614 9.13545 5.05021 9.07632 5.03349C9.04144 5.02362 9.01712 5.01878 9.00252 5.01641C8.98875 5.02065 8.96002 5.03006 8.91348 5.05004C8.82592 5.08761 8.71297 5.14595 8.58449 5.22209Z"
                    fill="#65676B"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.99402 6.67564C8.20965 6.58794 8.48457 6.5 8.75011 6.5C8.9878 6.5 9.18801 6.59734 9.333 6.69603C9.48124 6.79692 9.61038 6.92535 9.7167 7.04898C9.92912 7.29597 10.1006 7.58289 10.1973 7.77639C10.3208 8.02338 10.2207 8.32372 9.97372 8.44721C9.72673 8.57071 9.42639 8.4706 9.3029 8.22361C9.23298 8.08377 9.10444 7.87069 8.95852 7.70102C8.88567 7.61632 8.82106 7.55724 8.77034 7.52272C8.7524 7.51051 8.73999 7.50391 8.7328 7.50053C8.65987 7.50478 8.53597 7.53477 8.37074 7.60197C8.20255 7.67036 8.03338 7.75985 7.90234 7.83779C7.76699 7.91829 7.62867 7.97671 7.49903 8.02193C7.39786 8.05722 7.30344 8.1019 7.23793 8.14712C7.22843 8.15368 7.22042 8.15964 7.21374 8.16494L7.21399 8.16638C7.21752 8.1868 7.22113 8.2044 7.22609 8.22863C7.22856 8.24068 7.23136 8.25436 7.23465 8.27085C7.24313 8.31326 7.25404 8.37068 7.26061 8.43313C7.27121 8.53382 7.28996 8.64268 7.31827 8.74451C7.32734 8.74679 7.3389 8.7493 7.35338 8.75179C7.41376 8.76217 7.49069 8.76689 7.59933 8.76989C7.61868 8.77042 7.63957 8.7709 7.66159 8.77141C7.74953 8.77344 7.85565 8.77588 7.95514 8.78381C8.22107 8.80499 8.49984 8.89889 8.77747 9.08397C9.00723 9.23715 9.06932 9.54759 8.91614 9.77735C8.76297 10.0071 8.45253 10.0692 8.22277 9.91603C8.07542 9.81779 7.95848 9.78724 7.87574 9.78065C7.8071 9.77518 7.73851 9.77356 7.65501 9.77159C7.62886 9.77097 7.60125 9.77032 7.57172 9.76951C7.45989 9.76642 7.3207 9.76084 7.18395 9.73733C7.04723 9.71383 6.87868 9.66717 6.72332 9.55914C6.55689 9.44343 6.43472 9.27742 6.37137 9.06924C6.31494 8.88379 6.28287 8.69713 6.2661 8.53777C6.2628 8.50642 6.25947 8.49137 6.25382 8.46581C6.24832 8.44098 6.24064 8.40622 6.22864 8.33696C6.21165 8.23877 6.18995 8.07575 6.23665 7.89554C6.31 7.61249 6.51792 7.42904 6.6698 7.32418C6.8334 7.21124 7.01717 7.13092 7.16968 7.07772C7.2565 7.04744 7.32947 7.015 7.39115 6.97832C7.55254 6.88233 7.76743 6.76779 7.99402 6.67564Z"
                    fill="#65676B"
                  />
                  <path
                    d="M11 6.5C11 9.26142 8.76142 11.5 6 11.5C3.23858 11.5 1 9.26142 1 6.5C1 3.73858 3.23858 1.5 6 1.5C8.76142 1.5 11 3.73858 11 6.5ZM1.99653 6.5C1.99653 8.71106 3.78894 10.5035 6 10.5035C8.21106 10.5035 10.0035 8.71106 10.0035 6.5C10.0035 4.28894 8.21106 2.49653 6 2.49653C3.78894 2.49653 1.99653 4.28894 1.99653 6.5Z"
                    fill="#65676B"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <svg
              width="11"
              height="2"
              viewBox="0 0 11 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1.5" cy="1" r="1" fill="black" />
              <circle cx="5.5" cy="1" r="1" fill="black" />
              <circle cx="9.5" cy="1" r="1" fill="black" />
            </svg>
          </div>
        </div>
        <div class="p-3 text-sm">
          {#if description == ""}
            Add description next
          {:else}
            {description}
          {/if}
        </div>
        {#if selected_library.length > 0}
          <div
            class="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-2 relative px-4"
          >
            {#each selected_library as selected_img, index}
              <div class="rounded-lg flex-shrink-0 border border-gray-200">
                <div>
                  <img
                    src={selected_img.src.startsWith("data:")
                      ? selected_img.src
                      : "/images/" + selected_img.src}
                    alt="media"
                    class="w-full rounded-[8px] max-w-[248px] max-h-[248px] object-cover"
                  />
                  <div
                    class="py-5 px-3 text-black font-bold flex justify-between flex-col"
                  >
                    <div class="flex-1 max-w-[150px] overflow-y-hidden text-sm">
                      {#if index == 0 && headline_1 != ""}
                        {headline_1}
                      {:else if index > 0 && headline_2 != ""}
                        {headline_2}
                      {:else}
                        Add heading next
                      {/if}
                    </div>
                    {#if bool_show_button && action_button_text != ""}
                      <button
                        type="button"
                        class="text-white flex justify-center items-center gap-2 bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5"
                      >
                        {action_button_text}
                      </button>
                    {/if}
                    <div class="p-[10px_0] flex justify-between">
                      <div class="flex items-center gap-[6px]">
                        <div class="flex items-center">
                          <img
                            src="/images/facebook/like-b.png"
                            alt="like"
                            class="relative z-[3]"
                          />
                          <img
                            src="/images/facebook/heart-b.png"
                            alt="heart"
                            class="ml-[-6px] relative z-[2]"
                          />
                          <img
                            src="/images/facebook/care-b.png"
                            alt="care"
                            class="ml-[-6px] relative z-[1]"
                          />
                        </div>
                        <p class="text-[#65676B] text-[13px]">129</p>
                      </div>
                      <div class="flex gap-2">
                        <p class="text-[#65676B] text-[13px]">12 Comments</p>
                        <p class="text-[#65676B] text-[13px]">8 Shares</p>
                      </div>
                    </div>
                    <div
                      class="p-[17px_0] flex justify-between items-center border-t-[1px] border-t-[#CED0D4]"
                    >
                      <div class="flex gap-2 items-center">
                        <img
                          src="/icons/like.svg"
                          alt="like"
                          class="relative z-[3]"
                        />
                        <p class="text-[13px]">Like</p>
                      </div>
                      <div class="flex gap-2 items-center">
                        <img
                          src="/icons/comment.svg"
                          alt="like"
                          class="relative z-[3]"
                        />
                        <p class="text-[13px]">Comment</p>
                      </div>
                      <div class="flex gap-2 items-center">
                        <img
                          src="/icons/share.svg"
                          alt="like"
                          class="relative z-[3]"
                        />
                        <p class="text-[13px]">Share</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div
            style="background:linear-gradient(#0024A4, #0D64E8)"
            class="flex flex-col justify-center items-center h-[270px]"
          >
            <svg
              width="43"
              height="42"
              viewBox="0 0 43 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.7231 36.7415H12.7834C11.7416 36.7415 11.2206 36.7415 10.9794 36.5355C10.7701 36.3567 10.6591 36.0886 10.6807 35.8142C10.7055 35.4979 11.0739 35.1296 11.8106 34.3929L26.4335 19.77C27.1145 19.0889 27.4551 18.7484 27.8477 18.6208C28.1931 18.5086 28.5652 18.5086 28.9106 18.6208C29.3033 18.7484 29.6438 19.0889 30.3248 19.77L36.9779 26.423V28.4867M28.7231 36.7415C31.6126 36.7415 33.0573 36.7415 34.1609 36.1792C35.1317 35.6846 35.9209 34.8953 36.4156 33.9245C36.9779 32.8209 36.9779 31.3762 36.9779 28.4867M28.7231 36.7415H14.2772C11.3878 36.7415 9.94308 36.7415 8.83946 36.1792C7.86868 35.6846 7.07942 34.8953 6.58478 33.9245C6.02246 32.8209 6.02246 31.3762 6.02246 28.4867V14.0409C6.02246 11.1514 6.02246 9.70669 6.58478 8.60307C7.07942 7.63229 7.86868 6.84303 8.83946 6.3484C9.94308 5.78607 11.3878 5.78607 14.2772 5.78607H28.7231C31.6126 5.78607 33.0573 5.78607 34.1609 6.3484C35.1317 6.84303 35.9209 7.63229 36.4156 8.60307C36.9779 9.70669 36.9779 11.1514 36.9779 14.0409V28.4867M18.9206 15.2447C18.9206 17.1443 17.3806 18.6842 15.4811 18.6842C13.5815 18.6842 12.0416 17.1443 12.0416 15.2447C12.0416 13.3451 13.5815 11.8052 15.4811 11.8052C17.3806 11.8052 18.9206 13.3451 18.9206 15.2447Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="text-lg text-white">Ad media next</div>
          </div>
          <div
            class="bg-facebook-light-light-grey p-4 text-black font-bold text-sm"
          >
            Add heading next
          </div>
          <div class="sm:p-[10px_14px] p-[10px_4px] flex justify-between">
            <div class="flex items-center gap-[6px]">
              <div class="flex items-center">
                <img
                  src="/images/facebook/like-b.png"
                  alt="like"
                  class="relative z-[3]"
                />
                <img
                  src="/images/facebook/heart-b.png"
                  alt="heart"
                  class="ml-[-6px] relative z-[2]"
                />
                <img
                  src="/images/facebook/care-b.png"
                  alt="care"
                  class="ml-[-6px] relative z-[1]"
                />
              </div>
              <p class="text-[#65676B] text-[13px]">129</p>
            </div>
            <div class="flex gap-2">
              <p class="text-[#65676B] text-[13px]">12 Comments</p>
              <p class="text-[#65676B] text-[13px]">8 Shares</p>
            </div>
          </div>
          <div
            class="sm:p-[17px_24px] p-[8px_10px] flex justify-between items-center border-t-[1px] border-t-[#CED0D4]"
          >
            <div class="flex gap-2 items-center">
              <img src="/icons/like.svg" alt="like" class="relative z-[3]" />
              <p class="text-[13px]">Like</p>
            </div>
            <div class="flex gap-2 items-center">
              <img src="/icons/comment.svg" alt="like" class="relative z-[3]" />
              <p class="text-[13px]">Comment</p>
            </div>
            <div class="flex gap-2 items-center">
              <img src="/icons/share.svg" alt="like" class="relative z-[3]" />
              <p class="text-[13px]">Share</p>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <div id="1" class="content hidden">
      <div class="flex flex-col pt-4 border border-gray-300 rounded-xl">
        <div class="flex px-4 items-center justify-around">
          <div class="flex items-center gap-3 flex-1">
            <button
              class="w-[42px] h-[42px] rounded-[10px] flex justify-center items-center bg-[#0024A4]"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.9993 0.829498C5.83018 0.829498 0.829102 5.83057 0.829102 11.9997C0.829102 14.959 1.97987 17.6495 3.85832 19.6481L2.27076 23.1699H7.05792L7.48847 22.2217C8.86798 22.8313 10.3941 23.1699 11.9993 23.1699C13.8361 23.1699 15.5694 22.7266 17.0979 21.9411L17.6481 23.1699H22.4492L20.615 19.1096C22.2108 17.178 23.1695 14.7008 23.1695 11.9997C23.1695 5.94741 18.3561 1.01935 12.3485 0.834854L12.3461 0.829498L12.3437 0.834706C12.2293 0.831242 12.1145 0.829498 11.9993 0.829498ZM12.3437 0.834706L11.8729 1.86891L3.85832 19.6481C4.87689 20.7319 6.10943 21.6122 7.48847 22.2217L8.5052 19.9824L8.57478 19.8161H16.1452L16.2148 19.9685L17.0979 21.9411C18.4554 21.2435 19.6513 20.276 20.615 19.1096L12.8331 1.88277L12.3485 0.834854C12.3469 0.834804 12.3453 0.834755 12.3437 0.834706ZM14.1134 15.3535H10.5926L12.36 11.4454L14.1134 15.3535Z"
                  fill="white"
                />
              </svg>
            </button>
            <div class="flex flex-col">
              <h4 class="font-bold text-gray-900">Amazing Company</h4>
              <div class="text-xs text-gray-500 flex items-center gap-1">
                Sponsored .
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.98583 2.87644L9.08011 3.15905C9.0875 3.18122 9.09455 3.20317 9.10129 3.22489C9.20465 3.55843 9.23239 3.84302 9.20783 4.07818C9.18511 4.29576 9.11127 4.51876 8.95932 4.67071C8.76406 4.86598 8.69526 4.86598 8.5 4.67071C8.32138 4.4921 8.15307 4.32804 8.20653 4.01604C8.20875 4.00655 8.21131 3.99276 8.21324 3.9743C8.22111 3.899 8.21756 3.75329 8.14754 3.52555C8.10326 3.39239 8.04978 3.23147 8.03155 3.17638L8.02612 3.15994L8.02396 3.15329L8.02257 3.14891L8.02074 3.14291L8.01866 3.13572C8.0177 3.13226 8.01505 3.12222 8.01344 3.11562C8.00967 3.09841 8.003 2.94432 8.03669 2.81173C8.45358 2.50215 8.93826 2.75953 8.95398 2.79071C8.95805 2.79978 8.96371 2.81328 8.96545 2.81765L8.96868 2.82611C8.97052 2.83106 8.9721 2.83563 8.9721 2.83563C8.97415 2.84152 8.9794 2.85719 8.98583 2.87644Z"
                    fill="#65676B"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.58449 5.22209C8.32699 5.37468 8.04107 5.57849 7.81802 5.77676C7.4227 6.12815 6.88426 6.18083 6.51708 6.18083C6.31993 6.18083 6.1362 6.16495 5.99389 6.1505C5.95043 6.14608 5.92019 6.14282 5.89293 6.13989C5.86651 6.13704 5.84288 6.1345 5.8127 6.13149C5.7886 6.12909 5.76997 6.12743 5.75542 6.12638C5.74284 6.12548 5.73695 6.12532 5.73587 6.12528C5.60799 6.12528 5.49759 6.08631 5.43259 6.05994C5.35868 6.02994 5.28635 5.99193 5.22214 5.95523C5.09766 5.8841 4.96069 5.79278 4.84184 5.71354L4.83348 5.70797C4.77537 5.66923 4.72125 5.6332 4.67097 5.60054C4.64956 5.66594 4.62426 5.7389 4.59581 5.80717C4.54761 5.92284 4.46551 6.0901 4.31802 6.2212C4.21742 6.31062 4.05797 6.45333 3.92389 6.61835C3.7736 6.80333 3.73583 6.91982 3.73583 6.95861V7.01855L3.22167 9.13234C3.1564 9.40066 2.88598 9.56527 2.61766 9.5C2.34934 9.43473 2.18473 9.16431 2.25 8.89599L2.73813 6.88925C2.76289 6.51316 2.98311 6.19043 3.14778 5.98776C3.33231 5.76064 3.53986 5.57495 3.6433 5.483C3.64693 5.47703 3.65745 5.45924 3.67273 5.42255C3.69623 5.36617 3.71562 5.3053 3.74167 5.2235C3.74737 5.20563 3.75338 5.18676 3.75982 5.16672C3.78871 5.07684 3.83506 4.93327 3.90716 4.8115C3.97757 4.69258 4.15587 4.45861 4.48583 4.45861C4.61371 4.45861 4.72408 4.49757 4.78908 4.52395C4.86299 4.55394 4.93531 4.59196 4.99953 4.62866C5.12401 4.69979 5.26097 4.7911 5.37982 4.87034L5.38818 4.87592C5.51743 4.96208 5.62694 5.03479 5.71828 5.08699C5.75229 5.10642 5.77727 5.1192 5.79434 5.12709C5.86486 5.13092 5.95058 5.14017 6.02542 5.14825C6.0501 5.15091 6.07359 5.15344 6.09496 5.15562C6.22609 5.16894 6.37049 5.18083 6.51708 5.18083C6.83741 5.18083 7.04897 5.1224 7.15365 5.02935C7.4306 4.78318 7.88724 4.48542 8.19225 4.30468C8.34501 4.21415 8.38013 4.19072 8.51913 4.13107C8.63795 4.08009 8.81318 4.01417 8.98583 4.01417C9.21899 4.01417 9.48536 4.10568 9.6889 4.19615C9.90497 4.29218 10.1419 4.42832 10.318 4.58491C10.5244 4.76837 10.543 5.0844 10.3595 5.29079C10.1761 5.49718 9.86004 5.51577 9.65365 5.33232C9.57981 5.26668 9.4417 5.1806 9.28276 5.10996C9.20666 5.07614 9.13545 5.05021 9.07632 5.03349C9.04144 5.02362 9.01712 5.01878 9.00252 5.01641C8.98875 5.02065 8.96002 5.03006 8.91348 5.05004C8.82592 5.08761 8.71297 5.14595 8.58449 5.22209Z"
                    fill="#65676B"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.99402 6.67564C8.20965 6.58794 8.48457 6.5 8.75011 6.5C8.9878 6.5 9.18801 6.59734 9.333 6.69603C9.48124 6.79692 9.61038 6.92535 9.7167 7.04898C9.92912 7.29597 10.1006 7.58289 10.1973 7.77639C10.3208 8.02338 10.2207 8.32372 9.97372 8.44721C9.72673 8.57071 9.42639 8.4706 9.3029 8.22361C9.23298 8.08377 9.10444 7.87069 8.95852 7.70102C8.88567 7.61632 8.82106 7.55724 8.77034 7.52272C8.7524 7.51051 8.73999 7.50391 8.7328 7.50053C8.65987 7.50478 8.53597 7.53477 8.37074 7.60197C8.20255 7.67036 8.03338 7.75985 7.90234 7.83779C7.76699 7.91829 7.62867 7.97671 7.49903 8.02193C7.39786 8.05722 7.30344 8.1019 7.23793 8.14712C7.22843 8.15368 7.22042 8.15964 7.21374 8.16494L7.21399 8.16638C7.21752 8.1868 7.22113 8.2044 7.22609 8.22863C7.22856 8.24068 7.23136 8.25436 7.23465 8.27085C7.24313 8.31326 7.25404 8.37068 7.26061 8.43313C7.27121 8.53382 7.28996 8.64268 7.31827 8.74451C7.32734 8.74679 7.3389 8.7493 7.35338 8.75179C7.41376 8.76217 7.49069 8.76689 7.59933 8.76989C7.61868 8.77042 7.63957 8.7709 7.66159 8.77141C7.74953 8.77344 7.85565 8.77588 7.95514 8.78381C8.22107 8.80499 8.49984 8.89889 8.77747 9.08397C9.00723 9.23715 9.06932 9.54759 8.91614 9.77735C8.76297 10.0071 8.45253 10.0692 8.22277 9.91603C8.07542 9.81779 7.95848 9.78724 7.87574 9.78065C7.8071 9.77518 7.73851 9.77356 7.65501 9.77159C7.62886 9.77097 7.60125 9.77032 7.57172 9.76951C7.45989 9.76642 7.3207 9.76084 7.18395 9.73733C7.04723 9.71383 6.87868 9.66717 6.72332 9.55914C6.55689 9.44343 6.43472 9.27742 6.37137 9.06924C6.31494 8.88379 6.28287 8.69713 6.2661 8.53777C6.2628 8.50642 6.25947 8.49137 6.25382 8.46581C6.24832 8.44098 6.24064 8.40622 6.22864 8.33696C6.21165 8.23877 6.18995 8.07575 6.23665 7.89554C6.31 7.61249 6.51792 7.42904 6.6698 7.32418C6.8334 7.21124 7.01717 7.13092 7.16968 7.07772C7.2565 7.04744 7.32947 7.015 7.39115 6.97832C7.55254 6.88233 7.76743 6.76779 7.99402 6.67564Z"
                    fill="#65676B"
                  />
                  <path
                    d="M11 6.5C11 9.26142 8.76142 11.5 6 11.5C3.23858 11.5 1 9.26142 1 6.5C1 3.73858 3.23858 1.5 6 1.5C8.76142 1.5 11 3.73858 11 6.5ZM1.99653 6.5C1.99653 8.71106 3.78894 10.5035 6 10.5035C8.21106 10.5035 10.0035 8.71106 10.0035 6.5C10.0035 4.28894 8.21106 2.49653 6 2.49653C3.78894 2.49653 1.99653 4.28894 1.99653 6.5Z"
                    fill="#65676B"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <svg
              width="11"
              height="2"
              viewBox="0 0 11 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1.5" cy="1" r="1" fill="black" />
              <circle cx="5.5" cy="1" r="1" fill="black" />
              <circle cx="9.5" cy="1" r="1" fill="black" />
            </svg>
          </div>
        </div>
        <div class="p-3 text-sm">
          {#if description == ""}
            Add description next
          {:else}
            {description}
          {/if}
        </div>
        {#if selected_library.length > 0}
          <div
            class="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-2 relative px-4"
          >
            {#each selected_library as selected_img, index}
              <div class="rounded-lg flex-shrink-0 border border-gray-200">
                <div>
                  <img
                    src={selected_img.src.startsWith("data:")
                      ? selected_img.src
                      : "/images/" + selected_img.src}
                    alt="media"
                    class="w-full rounded-[8px] max-w-[248px] max-h-[248px] object-cover"
                  />
                  <div
                    class="py-5 px-3 text-black font-bold flex justify-between flex-col"
                  >
                    <div class="flex-1 max-w-[150px] overflow-y-hidden text-sm">
                      {#if index == 0 && headline_1 != ""}
                        {headline_1}
                      {:else if index > 0 && headline_2 != ""}
                        {headline_2}
                      {:else}
                        Add heading next
                      {/if}
                    </div>
                    {#if bool_show_button && action_button_text != ""}
                      <button
                        type="button"
                        class="text-white flex justify-center items-center gap-2 bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5"
                      >
                        {action_button_text}
                      </button>
                    {/if}
                    <div class="p-[10px_0] flex justify-between">
                      <div class="flex items-center gap-[6px]">
                        <div class="flex items-center">
                          <img
                            src="/images/facebook/like-b.png"
                            alt="like"
                            class="relative z-[3]"
                          />
                          <img
                            src="/images/facebook/heart-b.png"
                            alt="heart"
                            class="ml-[-6px] relative z-[2]"
                          />
                          <img
                            src="/images/facebook/care-b.png"
                            alt="care"
                            class="ml-[-6px] relative z-[1]"
                          />
                        </div>
                        <p class="text-[#65676B] text-[13px]">129</p>
                      </div>
                      <div class="flex gap-2">
                        <p class="text-[#65676B] text-[13px]">12 Comments</p>
                        <p class="text-[#65676B] text-[13px]">8 Shares</p>
                      </div>
                    </div>
                    <div
                      class="p-[17px_0] flex justify-between items-center border-t-[1px] border-t-[#CED0D4]"
                    >
                      <div class="flex gap-2 items-center">
                        <img
                          src="/icons/like.svg"
                          alt="like"
                          class="relative z-[3]"
                        />
                        <p class="text-[13px]">Like</p>
                      </div>
                      <div class="flex gap-2 items-center">
                        <img
                          src="/icons/comment.svg"
                          alt="like"
                          class="relative z-[3]"
                        />
                        <p class="text-[13px]">Comment</p>
                      </div>
                      <div class="flex gap-2 items-center">
                        <img
                          src="/icons/share.svg"
                          alt="like"
                          class="relative z-[3]"
                        />
                        <p class="text-[13px]">Share</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div
            style="background:linear-gradient(#0024A4, #0D64E8)"
            class="flex flex-col justify-center items-center h-[270px]"
          >
            <svg
              width="43"
              height="42"
              viewBox="0 0 43 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.7231 36.7415H12.7834C11.7416 36.7415 11.2206 36.7415 10.9794 36.5355C10.7701 36.3567 10.6591 36.0886 10.6807 35.8142C10.7055 35.4979 11.0739 35.1296 11.8106 34.3929L26.4335 19.77C27.1145 19.0889 27.4551 18.7484 27.8477 18.6208C28.1931 18.5086 28.5652 18.5086 28.9106 18.6208C29.3033 18.7484 29.6438 19.0889 30.3248 19.77L36.9779 26.423V28.4867M28.7231 36.7415C31.6126 36.7415 33.0573 36.7415 34.1609 36.1792C35.1317 35.6846 35.9209 34.8953 36.4156 33.9245C36.9779 32.8209 36.9779 31.3762 36.9779 28.4867M28.7231 36.7415H14.2772C11.3878 36.7415 9.94308 36.7415 8.83946 36.1792C7.86868 35.6846 7.07942 34.8953 6.58478 33.9245C6.02246 32.8209 6.02246 31.3762 6.02246 28.4867V14.0409C6.02246 11.1514 6.02246 9.70669 6.58478 8.60307C7.07942 7.63229 7.86868 6.84303 8.83946 6.3484C9.94308 5.78607 11.3878 5.78607 14.2772 5.78607H28.7231C31.6126 5.78607 33.0573 5.78607 34.1609 6.3484C35.1317 6.84303 35.9209 7.63229 36.4156 8.60307C36.9779 9.70669 36.9779 11.1514 36.9779 14.0409V28.4867M18.9206 15.2447C18.9206 17.1443 17.3806 18.6842 15.4811 18.6842C13.5815 18.6842 12.0416 17.1443 12.0416 15.2447C12.0416 13.3451 13.5815 11.8052 15.4811 11.8052C17.3806 11.8052 18.9206 13.3451 18.9206 15.2447Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="text-lg text-white">Ad media next</div>
          </div>
          <div
            class="bg-facebook-light-light-grey p-4 text-black font-bold text-sm"
          >
            Add heading next
          </div>
          <div class="sm:p-[10px_14px] p-[10px_4px] flex justify-between">
            <div class="flex items-center gap-[6px]">
              <div class="flex items-center">
                <img
                  src="/images/facebook/like-b.png"
                  alt="like"
                  class="relative z-[3]"
                />
                <img
                  src="/images/facebook/heart-b.png"
                  alt="heart"
                  class="ml-[-6px] relative z-[2]"
                />
                <img
                  src="/images/facebook/care-b.png"
                  alt="care"
                  class="ml-[-6px] relative z-[1]"
                />
              </div>
              <p class="text-[#65676B] text-[13px]">129</p>
            </div>
            <div class="flex gap-2">
              <p class="text-[#65676B] text-[13px]">12 Comments</p>
              <p class="text-[#65676B] text-[13px]">8 Shares</p>
            </div>
          </div>
          <div
            class="sm:p-[17px_24px] p-[8px_10px] flex justify-between items-center border-t-[1px] border-t-[#CED0D4]"
          >
            <div class="flex gap-2 items-center">
              <img src="/icons/like.svg" alt="like" class="relative z-[3]" />
              <p class="text-[13px]">Like</p>
            </div>
            <div class="flex gap-2 items-center">
              <img src="/icons/comment.svg" alt="like" class="relative z-[3]" />
              <p class="text-[13px]">Comment</p>
            </div>
            <div class="flex gap-2 items-center">
              <img src="/icons/share.svg" alt="like" class="relative z-[3]" />
              <p class="text-[13px]">Share</p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
