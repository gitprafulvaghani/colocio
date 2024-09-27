<script lang="ts">
  import { FacebookService } from "$lib/services/FacebookService";
  import { bool_modal_media, library } from "$lib/stores/stores";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let title = "Title";
  export let description = "Description";
  export let headline_1 = "";
  export let headline_2 = "";
  export let bool_show_button = true;
  export let action_button_text = "";

  let selected_library: any[] = [];

  $: {
    selected_library = $library.filter((media: any) => media.selected);
  }

  async function performSchedule() {
    //TODO: Call FB create campaign service here
    dispatch("close");
  }

  function clickOutside(element, callbackFunction) {
    function onClick(event) {
      const scheduleBtn = document.getElementById("schedule-btn");

      if (
        !element.contains(event.target) &&
        !scheduleBtn.contains(event.target)
      ) {
        callbackFunction();
      }
    }

    document.body.addEventListener("click", onClick);

    return {
      update(newCallbackFunction) {
        callbackFunction = newCallbackFunction;
      },
      destroy() {
        document.body.removeEventListener("click", onClick);
      },
    };
  }
</script>

<div
  class="relative z-[999]"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
    class="fixed inset-0 bg-[rgba(0, 0, 0, 0.12)] transition-opacity backdrop-blur-sm bg-[#0000001F]"
  />

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div
      class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div
        use:clickOutside={() => {
          dispatch("close");
        }}
        class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-8 text-left drop-shadow transition-all sm:my-8 sm:w-full sm:max-w-3xl h-[600px] sm:h-[700px] sm:p-6 flex flex-col justify-between"
      >
        <div class="flex flex-col items-center gap-8">
          <div class="flex flex-col gap-4 items-center">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="42"
                height="42"
                rx="9"
                stroke="#0D64E8"
                stroke-width="2"
              />
              <path
                d="M14 23L18.6464 27.6464C18.8417 27.8417 19.1583 27.8417 19.3536 27.6464L30 17"
                stroke="#0D64E8"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>

            <h2 class="font-medium text-blue-primary text-2xl">
              {title} scheduled!
            </h2>
          </div>
          <div
            class="bg-white rounded-xl drop-shadow-md w-[350px] font-roboto p-4  border border-gray-200"
          >
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
                    <div
                      class="rounded-lg flex-shrink-0  border border-gray-200"
                    >
                      <div>
                        <img
                          src="/images/{selected_img.src}"
                          alt="media"
                          class="w-64 h-64 rounded-lg"
                        />
                        <div
                          class="py-5 px-3 text-black font-bold flex justify-between items-center"
                        >
                          <div
                            class="flex-1 max-w-[150px] overflow-y-hidden text-sm"
                          >
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
              {/if}
            </div>
          </div>

          <div class="flex gap-2 items-center">
            <button
              on:click={() => {
                dispatch("viewSchedule");
              }}
              type="button"
              class="py-3 px-5 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
              <img src="/icons/calendar.svg" alt="calendar" class="w-4 h-4" />
              View Schedule
            </button>

            <button
              on:click={performSchedule}
              type="button"
              class="text-white flex items-center justify-center gap-2 bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-3 h-[40px]"
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
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
