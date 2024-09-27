<script lang="ts">
  import {
    platforms_ad,
    Open_text_Model,
    Selected_Library_Store,
    automateded_Text_Details,
    textStore,
    library,
    autoSetTextDetails,
    InstaTextDetails,
  } from "$lib/stores/stores";
  import { Accordion, AccordionItem } from "flowbite-svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { writable } from "svelte/store";
  const dispatch = createEventDispatcher();
  const SetFbTextStore = writable("");
  let instagram = $library.filter((media: any) => media.selected);
  let facebook = $library.filter((media: any) => media.selected);
  let useFacebookContent = false;
  let IsAskColocio = false;
  let tab_selected = "facebook";
  let percent_optimization = 0;
  let selected_library: any[] = [];
  import type { ButtonOption } from "$lib/services/interface/promotions";
  import { Button_text_options_Store } from "../services/interface/promotionstore";
  import Dropdown from "./Dropdown.svelte";
  let options: ButtonOption[];

  Button_text_options_Store.subscribe((value) => {
    options = value;
  });

  $: {
    selected_library = $library.filter((media: any) => media.selected);
  }
  export let description =
    "Don’t miss our Champaign Pool Party kits this summer.";
  export let headline_1 = "Champaign Pool Party kits available now!";
  export let headline_2 = "Party kits available online!";
  export let action_button_text = "Shop now";
  export let bool_show_button = true;
  export let bool_colocio_description = false;
  export let colocio_description = "";
  export let colocio_prompt = "";
  export let url_action = "https://www.theamazingcompany.com/products";
  let Selected_Library: any = [];
  function handleChange() {}
  function validateDescription() {
    if (colocio_description == "") {
      return;
    }
    description = colocio_description;
    bool_colocio_description = false;
  }

  function generateDescriptionDemo() {
    colocio_prompt =
      "Promoted our Champaign Pool Party kits that includes champaign and snacks available on the online shop.";
    colocio_description =
      "Don’t miss out on our Champaign Pool Party kits filled with your favorite bubbly and snacks. Buy online today!";
  }
  function GetTabsDetails() {
    const unsubscribe = Selected_Library_Store.subscribe((value) => {
      Selected_Library = value;
    });

    return () => {
      unsubscribe();
    };
  }

  let FacebookDetails = {
    description: "",
    Selected_Library: facebook,
    bool_show_button: false,
    url_action: "",
    action_button_text: "",
  };
  let instagramDetails = {
    description: "",
    Selected_Library: instagram,
    action_button_text: "",
    bool_show_button: true,
    bool_colocio_description: false,
    colocio_description: "",
    colocio_prompt: "",
    url_action: "",
  };
  function generateHeadlines() {
    headline_1 = "Champaign Pool Party kits available now!";
    headline_2 = "Bubbly and Snacks! Check it out online";
    action_button_text = "Shop now";
    url_action = "https://amazingcompany.com/shop";
  }

  // adding functionlity
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    FacebookDetails.description = target.value;
    autoSetTextDetails.set(FacebookDetails);
    SetFbTextStore.set(FacebookDetails);
  }

  function OnSubmit() {
    automateded_Text_Details.set(FacebookDetails);
    Open_text_Model.set(false);
  }
  function handlefbHeadline(event, index) {
    if (FacebookDetails.Selected_Library[index]) {
      FacebookDetails.Selected_Library[index].headline = event.target.value;
      textStore.set({
        FacebookDetails: FacebookDetails,
      });
      SetFbTextStore.set(FacebookDetails);
      autoSetTextDetails.set(FacebookDetails);
    } else {
      console.error(`Index ${index} is out of bounds for Selected_Library`);
    }
    autoSetTextDetails.set(FacebookDetails);
  }
  function handleInstaInput(event: Event, value: string, index) {
    if (value === "disc") {
      const target = event.target as HTMLInputElement;
      // InstaDiscInput.set(target.value);
      instagramDetails.description = target.value;
    } else if (value === "headline") {
      if (instagramDetails.Selected_Library[index]) {
        instagramDetails.Selected_Library[index].headline = event.target.value;

        // SetFbTextStore.set(FacebookDetails);
        // autoSetTextDetails.set(FacebookDetails);
      } else {
        console.error(`Index ${index} is out of bounds for Selected_Library`);
      }
      // autoSetTextDetails.set(FacebookDetails);
    }
    InstaTextDetails.set(instagramDetails);
  }
  let IsSetTrue = false;
  function Use_Facebook_content() {
    IsSetTrue = !IsSetTrue;
    if (FacebookDetails && IsSetTrue) {
      instagramDetails.description = FacebookDetails.description;
      instagramDetails.bool_show_button = FacebookDetails.bool_show_button;
      instagramDetails.action_button_text = FacebookDetails.action_button_text;
      instagramDetails.url_action = FacebookDetails.url_action;
      for (let i = 0; i < FacebookDetails.Selected_Library.length; i++) {
        const fbItem = FacebookDetails.Selected_Library[i];
        const instaItem = instagramDetails.Selected_Library.find(
          (item) => item.src === fbItem.src
        );
        if (instaItem) {
          instaItem.instaheadline = fbItem.fbheadline;
        }
      }
    } else {
      instagramDetails.description = "";
      instagramDetails.bool_show_button = !FacebookDetails.bool_show_button;
      instagramDetails.action_button_text = "";
      instagramDetails.url_action = "";
      for (let instaItem of instagramDetails.Selected_Library) {
        instaItem.instaheading = "";
      }
    }
  }
  onMount(() => {
    GetTabsDetails();
  });
  function HandleGenrateText() {
    tab_selected = "instagram";
    useFacebookContent = true;
    IsAskColocio = true;
    isAccordionOpen = false;
  }
  let isAccordionOpen = true;
  function handleButtonClick() {
    if (isAccordionOpen) {
      isAccordionOpen = false;
    }
    bool_colocio_description = true;
  }
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
    <div class="flex min-h-full justify-center p-3 text-center items-center">
      <div
        class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left drop-shadow transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 flex flex-col justify-between"
      >
        <button
          on:click={() => Open_text_Model.set(false)}
          class="absolute right-[13px] top-[17px]"
          ><svg
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
          </svg></button
        >
        <div class="flex flex-col justify-between h-full gap-8">
          <div class="flex flex-col gap-5">
            <h1 class="flex items-center gap-2.5 text-lg text-font_dark">
              <svg
                width="45"
                height="44"
                viewBox="0 0 45 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5416 17.2917H15.4166C14.2499 17.2917 13.6665 17.2917 13.2208 17.5187C12.8288 17.7185 12.5101 18.0372 12.3104 18.4292C12.0833 18.8748 12.0833 19.4582 12.0833 20.625V24.375C12.0833 25.5418 12.0833 26.1252 12.3104 26.5708C12.5101 26.9628 12.8288 27.2815 13.2208 27.4813C13.6665 27.7083 14.2499 27.7083 15.4166 27.7083H23.5416M27.7083 17.2917H29.5833C30.7501 17.2917 31.3335 17.2917 31.7791 17.5187C32.1711 17.7185 32.4898 18.0372 32.6896 18.4292C32.9166 18.8748 32.9166 19.4582 32.9166 20.625V24.375C32.9166 25.5418 32.9166 26.1252 32.6896 26.5708C32.4898 26.9628 32.1711 27.2815 31.7791 27.4813C31.3335 27.7083 30.7501 27.7083 29.5833 27.7083H27.7083M27.7083 31.875L27.7083 13.125M30.3125 13.125L25.1041 13.125M30.3125 31.875L25.1041 31.875"
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
                <div class="text-blue-primary text-xs">
                  <span class="font-bold">{percent_optimization}%</span> of text
                  optimized
                </div>
              </div>
            </h1>
            <hr class="bg-gray-200 h-[1px]" />
            <Accordion class="accordion-main !rounded-[6px]">
              <AccordionItem
                open={isAccordionOpen}
                class="accordion-item !bg-[#E4EFFF] hover:!bg-[#E4EFFF] !border-0 !text-[#0D64E8] !ring-0"
              >
                <div slot="header" class="flex-1 flex gap-1">
                  <div class="flex gap-1">
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
                    <h2 class="text-[#0D64E8] text-[14px] font-medium">
                      Generate all with Colocio
                    </h2>
                  </div>
                </div>
                <div
                  class="bg-[#E4EFFF] accordion-data pt-[4px] p-[12px] rounded-[0_0_6px_6px]"
                >
                  <h2 class="text-[#0D64E8] text-[14px] font-medium">
                    Headlines
                  </h2>
                  <p class="text-[#0D64E8] text-[12px]">
                    e.g. “Promote my product called Party Pack on by online
                    store.”
                  </p>
                  <input
                    type="text"
                    class="border-[#D1D5DB] border-[1px] bg-[#fff] h-[40px] w-full rounded-md mt-1"
                  />
                  <div class="mt-[16px]">
                    <h2 class="text-[#0D64E8] text-[14px] font-medium">
                      Descriptions/Captions
                    </h2>
                    <p class="text-[#0D64E8] text-[12px]">
                      e.g. “Party Pack includes snacks and beverages. It’s
                      perfect for Summers at the pool or any outdoor event”
                      store.”
                    </p>
                    <input
                      type="text"
                      class="border-[#D1D5DB] border-[1px] bg-[#fff] h-[40px] w-full rounded-md mt-1"
                    />
                  </div>
                  <button
                    on:click={HandleGenrateText}
                    class="bg-[#0D64E8] text-white rounded-md h-[32px] gap-2 flex items-center mt-[16px]"
                  >
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      ><path
                        d="M10.5 2C6.07981 2 2.5 5.57982 2.5 10C2.5 14.4202 6.07981 18 10.5 18C14.9202 18 18.5 14.4202 18.5 10C18.5 5.57982 14.9202 2 10.5 2ZM15.4562 13.957C14.9466 14.4467 14.2585 14.6319 13.4843 13.646L11.1617 10.8205C10.7845 10.3639 10.0831 10.3772 9.71919 10.8404L7.56204 13.6195C6.73491 14.6782 6.02026 14.4268 5.49752 13.8842C4.65715 12.8056 4.15426 11.4624 4.15426 9.99338C4.15426 6.49297 6.99958 3.64764 10.5 3.64764C14.0004 3.64764 16.8457 6.49297 16.8457 9.99338C16.8457 11.4888 16.323 12.8652 15.4562 13.9504V13.957Z"
                        fill="#fff"
                      /></svg
                    >
                    Generate all text</button
                  >
                </div>
              </AccordionItem>
            </Accordion>

            <div
              class="flex items-center text-sm text-center border-b border-gray-200 mb-3 overflow-auto"
            >
              <button
                type="button"
                on:click={() => {
                  tab_selected = "facebook";
                }}
                class={tab_selected === "facebook"
                  ? "w-[115px] flex items-center gap-1 justify-center pb-2 px-2 border-b-[#0d64e8] border-b-[1px]"
                  : "w-[115px] flex items-center gap-1 justify-center pb-2 px-2"}
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.9785 9.3L11.334 6.9835H9.11127V5.48025C9.11127 4.8465 9.42177 4.22875 10.4173 4.22875H11.4278V2.2565C11.4278 2.2565 10.5108 2.1 9.63402 2.1C7.80352 2.1 6.60702 3.2095 6.60702 5.218V6.9835H4.57227V9.3H6.60702V14.9H9.11127V9.3H10.9785Z"
                    fill={tab_selected == "facebook" ? "#0D64E8" : "#111827"}
                  />
                </svg>
                <span
                  class="text-gray-600 whitespace-nowrap"
                  class:text-gray-600={tab_selected != "facebook"}
                  class:text-blue-primary={tab_selected == "facebook"}
                  >Facebook</span
                >
              </button>
              <button
                type="button"
                on:click={() => {
                  tab_selected = "instagram";
                }}
                class={tab_selected === "instagram"
                  ? "w-[115px] flex items-center gap-1 justify-center pb-2 px-2 border-b-[#0d64e8] border-b-[1px]"
                  : "w-[115px] flex items-center gap-1 justify-center pb-2 px-2"}
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.33333 2.5C3.49533 2.5 2 3.99533 2 5.83333V11.1667C2 13.0047 3.49533 14.5 5.33333 14.5H10.6667C12.5047 14.5 14 13.0047 14 11.1667V5.83333C14 3.99533 12.5047 2.5 10.6667 2.5H5.33333ZM5.33333 3.83333H10.6667C11.7693 3.83333 12.6667 4.73067 12.6667 5.83333V11.1667C12.6667 12.2693 11.7693 13.1667 10.6667 13.1667H5.33333C4.23067 13.1667 3.33333 12.2693 3.33333 11.1667V5.83333C3.33333 4.73067 4.23067 3.83333 5.33333 3.83333ZM11.3333 4.5C11.1565 4.5 10.987 4.57024 10.8619 4.69526C10.7369 4.82029 10.6667 4.98986 10.6667 5.16667C10.6667 5.34348 10.7369 5.51305 10.8619 5.63807C10.987 5.7631 11.1565 5.83333 11.3333 5.83333C11.5101 5.83333 11.6797 5.7631 11.8047 5.63807C11.9298 5.51305 12 5.34348 12 5.16667C12 4.98986 11.9298 4.82029 11.8047 4.69526C11.6797 4.57024 11.5101 4.5 11.3333 4.5ZM8 5.16667C6.162 5.16667 4.66667 6.662 4.66667 8.5C4.66667 10.338 6.162 11.8333 8 11.8333C9.838 11.8333 11.3333 10.338 11.3333 8.5C11.3333 6.662 9.838 5.16667 8 5.16667ZM8 6.5C9.10267 6.5 10 7.39733 10 8.5C10 9.60267 9.10267 10.5 8 10.5C6.89733 10.5 6 9.60267 6 8.5C6 7.39733 6.89733 6.5 8 6.5Z"
                    fill={tab_selected == "instagram" ? "#0D64E8" : "#111827"}
                  />
                </svg>
                <span
                  class="text-gray-600 whitespace-nowrap"
                  class:text-gray-600={tab_selected != "instagram"}
                  class:text-blue-primary={tab_selected == "instagram"}
                  >Instagram</span
                >
              </button>
            </div>
            <div class="flex flex-col gap-5">
              {#if tab_selected === "facebook"}
                {#if !bool_colocio_description}
                  <div class="flex flex-col gap-1">
                    <label
                      for="description font-medium text-gray-600"
                      class="text-[14px] font-medium">Description</label
                    >
                    <div class="flex sm:flex-row flex-col items-center gap-3">
                      <div class="flex-1 w-full">
                        <input
                          type="text"
                          bind:value={FacebookDetails.description}
                          id="description"
                          on:input={handleInput}
                          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                      </div>
                      <button
                        on:click={handleButtonClick}
                        type="button"
                        class="sm:w-auto w-full px-3.5 py-2 rounded-md bg-blue-bglight text-blue-primary flex items-center justify-center gap-1 text-[14px]"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5 2C6.07981 2 2.5 5.57982 2.5 10C2.5 14.4202 6.07981 18 10.5 18C14.9202 18 18.5 14.4202 18.5 10C18.5 5.57982 14.9202 2 10.5 2ZM15.4562 13.957C14.9466 14.4467 14.2585 14.6319 13.4843 13.646L11.1617 10.8205C10.7845 10.3639 10.0831 10.3772 9.71919 10.8404L7.56204 13.6195C6.73491 14.6782 6.02026 14.4268 5.49752 13.8842C4.65715 12.8056 4.15426 11.4624 4.15426 9.99338C4.15426 6.49297 6.99958 3.64764 10.5 3.64764C14.0004 3.64764 16.8457 6.49297 16.8457 9.99338C16.8457 11.4888 16.323 12.8652 15.4562 13.9504V13.957Z"
                            fill="#0D64E8"
                          />
                        </svg>
                        Ask Pareto
                      </button>
                    </div>
                  </div>
                {:else}
                  <div
                    class="flex flex-col bg-blue-bglight p-3 rounded-md gap-2"
                  >
                    <div class="flex flex-col gap-2">
                      <label
                        for="colocio-prompt"
                        class="text-blue-primary flex items-center gap-1 text-[14px] font-medium"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5 2C6.07981 2 2.5 5.57982 2.5 10C2.5 14.4202 6.07981 18 10.5 18C14.9202 18 18.5 14.4202 18.5 10C18.5 5.57982 14.9202 2 10.5 2ZM15.4562 13.957C14.9466 14.4467 14.2585 14.6319 13.4843 13.646L11.1617 10.8205C10.7845 10.3639 10.0831 10.3772 9.71919 10.8404L7.56204 13.6195C6.73491 14.6782 6.02026 14.4268 5.49752 13.8842C4.65715 12.8056 4.15426 11.4624 4.15426 9.99338C4.15426 6.49297 6.99958 3.64764 10.5 3.64764C14.0004 3.64764 16.8457 6.49297 16.8457 9.99338C16.8457 11.4888 16.323 12.8652 15.4562 13.9504V13.957Z"
                            fill="#0D64E8"
                          />
                        </svg>
                        Ask Colocio
                      </label>
                      <div class="flex gap-3 items-end">
                        <textarea
                          id="colocio-prompt"
                          rows="2"
                          class="resize-none block p-2.5 flex-1 text-sm text-gray-600 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Write me a description that..."
                          >{colocio_prompt}</textarea
                        >
                        <button
                          on:click={generateDescriptionDemo}
                          type="button"
                          class="w-[110px] bg-transparent px-3.5 py-2 rounded-md border border-blue-primary text-blue-primary flex justify-center items-center h-[40px] text-[14px]"
                          >Generate</button
                        >
                      </div>
                    </div>
                    <div class="flex flex-col gap-2">
                      <label
                        for="description"
                        class="text-gray-600 flex items-center gap-1"
                      >
                        Description
                      </label>
                      <div class="flex gap-3 items-end">
                        <textarea
                          bind:value={colocio_description}
                          id="description"
                          rows="2"
                          class="resize-none block p-2.5 flex-1 text-sm text-gray-600 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder=""
                        />
                        <button
                          on:click={validateDescription}
                          class:opacity-30={colocio_description == ""}
                          disabled={colocio_description == ""}
                          type="button"
                          class="w-[110px] px-3.5 py-2 rounded-md border text-white bg-blue-primary flex justify-center items-center"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                {/if}
                {#each selected_library as _, index (index)}
                  <div class="flex flex-col gap-1">
                    <label
                      for={`headline_${index + 1}`}
                      class="text-[14px] font-medium"
                      >Headline {index + 1}</label
                    >
                    <div class="flex sm:flex-row flex-col items-center gap-3">
                      <div class="flex-1 w-full relative">
                        <input
                          maxlength="40"
                          type="text"
                          id={`headline_${index + 1}`}
                          bind:value={FacebookDetails.Selected_Library[index]
                            .fbheadline}
                          on:input={(event) => handlefbHeadline(event, index)}
                          class="bg-white border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {#if FacebookDetails.Selected_Library[index].fbheadline}
                          <span class="absolute right-4 top-2 text-gray-400">
                            {FacebookDetails.Selected_Library[index].fbheadline
                              .length}/40
                          </span>
                        {:else}
                          <span class="absolute right-4 top-2 text-gray-400">
                            0/40
                          </span>
                        {/if}
                      </div>
                      <button
                        on:click={handleButtonClick}
                        type="button"
                        class="sm:w-auto w-full px-3.5 py-2 rounded-md bg-blue-bglight text-blue-primary flex items-center justify-center gap-1 text-[14px]"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5 2C6.07981 2 2.5 5.57982 2.5 10C2.5 14.4202 6.07981 18 10.5 18C14.9202 18 18.5 14.4202 18.5 10C18.5 5.57982 14.9202 2 10.5 2ZM15.4562 13.957C14.9466 14.4467 14.2585 14.6319 13.4843 13.646L11.1617 10.8205C10.7845 10.3639 10.0831 10.3772 9.71919 10.8404L7.56204 13.6195C6.73491 14.6782 6.02026 14.4268 5.49752 13.8842C4.65715 12.8056 4.15426 11.4624 4.15426 9.99338C4.15426 6.49297 6.99958 3.64764 10.5 3.64764C14.0004 3.64764 16.8457 6.49297 16.8457 9.99338C16.8457 11.4888 16.323 12.8652 15.4562 13.9504V13.957Z"
                            fill="#0D64E8"
                          />
                        </svg>
                        Ask Colocio
                      </button>
                    </div>
                  </div>
                {/each}
                <div class="flex items-center w-full gap-2.5">
                  <input
                    bind:checked={FacebookDetails.bool_show_button}
                    id="green-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <div
                    class="text-gray-600 text-sm flex flex-1 items-center gap-1"
                  >
                    <div>Show button</div>
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label
                    for="action"
                    class="font-medium text-gray-600 text-[14px]"
                    >Button text</label
                  >
                  <div
                    class="flex sm:flex-row flex-col items-center w-full gap-3"
                  >
                    <select
                      bind:value={facebook.action_button_text}
                      id="action"
                      class="bg-white border sm:w-72 w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      {#each options as option}
                        <option value={option.value}>{option.label}</option>
                      {/each}
                    </select>
                    <button
                      type="button"
                      class="sm:w-auto w-full px-3.5 py-2 rounded-md bg-blue-bglight text-blue-primary flex items-center justify-center gap-1 text-[14px]"
                    >
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5 2C6.07981 2 2.5 5.57982 2.5 10C2.5 14.4202 6.07981 18 10.5 18C14.9202 18 18.5 14.4202 18.5 10C18.5 5.57982 14.9202 2 10.5 2ZM15.4562 13.957C14.9466 14.4467 14.2585 14.6319 13.4843 13.646L11.1617 10.8205C10.7845 10.3639 10.0831 10.3772 9.71919 10.8404L7.56204 13.6195C6.73491 14.6782 6.02026 14.4268 5.49752 13.8842C4.65715 12.8056 4.15426 11.4624 4.15426 9.99338C4.15426 6.49297 6.99958 3.64764 10.5 3.64764C14.0004 3.64764 16.8457 6.49297 16.8457 9.99338C16.8457 11.4888 16.323 12.8652 15.4562 13.9504V13.957Z"
                          fill="#0D64E8"
                        />
                      </svg>
                      Recommend
                    </button>
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label
                    for="url_action"
                    class="font-medium text-gray-600 text-[14px]">URL</label
                  >
                  <div class="flex items-center gap-3">
                    <div class="flex-1">
                      <input
                        type="text"
                        bind:value={FacebookDetails.url_action}
                        id="url_action"
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                  </div>
                </div>
              {/if}

              {#if tab_selected === "instagram"}
                <div class="flex items-center w-full gap-2.5">
                  <input
                    id="green-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                    bind:checked={useFacebookContent}
                    on:click={Use_Facebook_content}
                  />
                  <div
                    class="text-gray-600 text-sm flex flex-1 items-center gap-1"
                  >
                    <div>Use Facebook content</div>
                  </div>
                </div>
                {#if !bool_colocio_description}
                  <div class="flex flex-col gap-1">
                    <label
                      for="description font-medium text-gray-600"
                      class="text-[14px] font-medium">Description</label
                    >
                    <div class="flex sm:flex-row flex-col items-center gap-3">
                      <div class="flex-1 w-full">
                        <input
                          type="text"
                          bind:value={instagramDetails.description}
                          on:input={(event) => handleInstaInput(event, "disc")}
                          id="description"
                          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                      </div>
                      <button
                        disabled={IsAskColocio}
                        class:opacity-50={IsAskColocio}
                        on:click={() => {
                          bool_colocio_description = true;
                        }}
                        type="button"
                        class="sm:w-auto w-full px-3.5 py-2 rounded-md bg-blue-bglight text-blue-primary flex items-center justify-center gap-1 text-[14px]"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5 2C6.07981 2 2.5 5.57982 2.5 10C2.5 14.4202 6.07981 18 10.5 18C14.9202 18 18.5 14.4202 18.5 10C18.5 5.57982 14.9202 2 10.5 2ZM15.4562 13.957C14.9466 14.4467 14.2585 14.6319 13.4843 13.646L11.1617 10.8205C10.7845 10.3639 10.0831 10.3772 9.71919 10.8404L7.56204 13.6195C6.73491 14.6782 6.02026 14.4268 5.49752 13.8842C4.65715 12.8056 4.15426 11.4624 4.15426 9.99338C4.15426 6.49297 6.99958 3.64764 10.5 3.64764C14.0004 3.64764 16.8457 6.49297 16.8457 9.99338C16.8457 11.4888 16.323 12.8652 15.4562 13.9504V13.957Z"
                            fill="#0D64E8"
                          />
                        </svg>
                        Ask Pareto
                      </button>
                    </div>
                  </div>
                {:else}
                  <div
                    class="flex flex-col bg-blue-bglight p-3 rounded-md gap-2"
                  >
                    <div class="flex flex-col gap-2">
                      <label
                        for="colocio-prompt"
                        class="text-blue-primary flex items-center gap-1 text-[14px] font-medium"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5 2C6.07981 2 2.5 5.57982 2.5 10C2.5 14.4202 6.07981 18 10.5 18C14.9202 18 18.5 14.4202 18.5 10C18.5 5.57982 14.9202 2 10.5 2ZM15.4562 13.957C14.9466 14.4467 14.2585 14.6319 13.4843 13.646L11.1617 10.8205C10.7845 10.3639 10.0831 10.3772 9.71919 10.8404L7.56204 13.6195C6.73491 14.6782 6.02026 14.4268 5.49752 13.8842C4.65715 12.8056 4.15426 11.4624 4.15426 9.99338C4.15426 6.49297 6.99958 3.64764 10.5 3.64764C14.0004 3.64764 16.8457 6.49297 16.8457 9.99338C16.8457 11.4888 16.323 12.8652 15.4562 13.9504V13.957Z"
                            fill="#0D64E8"
                          />
                        </svg>
                        Ask Colocio
                      </label>
                      <div class="flex gap-3 items-end">
                        <textarea
                          id="colocio-prompt"
                          rows="2"
                          class="resize-none block p-2.5 flex-1 text-sm text-gray-600 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Write me a description that..."
                          >{colocio_prompt}</textarea
                        >
                        <button
                          on:click={generateDescriptionDemo}
                          type="button"
                          class="w-[110px] bg-transparent px-3.5 py-2 rounded-md border border-blue-primary text-blue-primary flex justify-center items-center h-[40px] text-[14px]"
                          >Generate</button
                        >
                      </div>
                    </div>
                    <div class="flex flex-col gap-2">
                      <label
                        for="description"
                        class="text-gray-600 flex items-center gap-1"
                      >
                        Description
                      </label>
                      <div class="flex gap-3 items-end">
                        <textarea
                          bind:value={colocio_description}
                          id="description"
                          rows="2"
                          class="resize-none block p-2.5 flex-1 text-sm text-gray-600 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder=""
                        />
                        <button
                          on:click={validateDescriptionInsta}
                          class:opacity-30={colocio_description == ""}
                          disabled={colocio_description == ""}
                          type="button"
                          class="w-[110px] px-3.5 py-2 rounded-md border text-white bg-blue-primary flex justify-center items-center"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                {/if}

                {#each instagramDetails.Selected_Library as _, index (index)}
                  <div class="flex flex-col gap-1">
                    <label
                      for={`headline_${index + 1}`}
                      class="text-[14px] font-medium"
                      >Headline {index + 1}</label
                    >
                    <div class="flex sm:flex-row flex-col items-center gap-3">
                      <div class="flex-1 relative w-full">
                        <input
                          maxlength="40"
                          type="text"
                          id={`headline_${index + 1}`}
                          bind:value={instagramDetails.Selected_Library[index]
                            .instaheadline}
                          on:input={(event) =>
                            handleInstaInput(event, "headline", index)}
                          class="bg-white border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {#if instagramDetails.Selected_Library[index].instaheadline}
                          <span class="absolute right-4 top-2 text-gray-400">
                            {instagramDetails.Selected_Library[index]
                              .instaheadline.length}/40
                          </span>
                        {:else}
                          <span class="absolute right-4 top-2 text-gray-400">
                            0/40
                          </span>
                        {/if}
                      </div>
                      <button
                        on:click={() => generateHeadlines(index)}
                        type="button"
                        class="px-3.5 py-2 sm:w-auto w-full rounded-md bg-blue-bglight text-blue-primary flex items-center justify-center gap-1 text-[14px]"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5 2C6.07981 2 2.5 5.57982 2.5 10C2.5 14.4202 6.07981 18 10.5 18C14.9202 18 18.5 14.4202 18.5 10C18.5 5.57982 14.9202 2 10.5 2ZM15.4562 13.957C14.9466 14.4467 14.2585 14.6319 13.4843 13.646L11.1617 10.8205C10.7845 10.3639 10.0831 10.3772 9.71919 10.8404L7.56204 13.6195C6.73491 14.6782 6.02026 14.4268 5.49752 13.8842C4.65715 12.8056 4.15426 11.4624 4.15426 9.99338C4.15426 6.49297 6.99958 3.64764 10.5 3.64764C14.0004 3.64764 16.8457 6.49297 16.8457 9.99338C16.8457 11.4888 16.323 12.8652 15.4562 13.9504V13.957Z"
                            fill="#0D64E8"
                          />
                        </svg>
                        Ask Pareto
                      </button>
                    </div>
                  </div>
                {/each}

                <div class="flex items-center w-full gap-2.5">
                  <input
                    bind:checked={instagramDetails.bool_show_button}
                    id="green-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <div
                    class="text-gray-600 text-sm flex flex-1 items-center gap-1"
                  >
                    <div>Show button</div>
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label
                    for="action"
                    class="font-medium text-gray-600 text-[14px]"
                    >Button text</label
                  >
                  <div
                    class="flex sm:flex-row flex-col items-center w-full gap-3"
                  >
                    <select
                      bind:value={instagramDetails.action_button_text}
                      id="action"
                      class="bg-white border sm:w-72 w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      {#each options as option}
                        <option value={option.value}>{option.label}</option>
                      {/each}
                    </select>
                    <button
                      disabled={IsAskColocio}
                      class:opacity-50={IsAskColocio}
                      type="button"
                      class="px-3.5 py-2 sm:w-auto w-full rounded-md bg-blue-bglight text-blue-primary flex items-center justify-center gap-1 text-[14px]"
                    >
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5 2C6.07981 2 2.5 5.57982 2.5 10C2.5 14.4202 6.07981 18 10.5 18C14.9202 18 18.5 14.4202 18.5 10C18.5 5.57982 14.9202 2 10.5 2ZM15.4562 13.957C14.9466 14.4467 14.2585 14.6319 13.4843 13.646L11.1617 10.8205C10.7845 10.3639 10.0831 10.3772 9.71919 10.8404L7.56204 13.6195C6.73491 14.6782 6.02026 14.4268 5.49752 13.8842C4.65715 12.8056 4.15426 11.4624 4.15426 9.99338C4.15426 6.49297 6.99958 3.64764 10.5 3.64764C14.0004 3.64764 16.8457 6.49297 16.8457 9.99338C16.8457 11.4888 16.323 12.8652 15.4562 13.9504V13.957Z"
                          fill="#0D64E8"
                        />
                      </svg>
                      Recommend
                    </button>
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label
                    for="url_action"
                    class="font-medium text-gray-600 text-[14px]">URL</label
                  >
                  <div class="flex items-center gap-3">
                    <div class="flex-1">
                      <input
                        type="text"
                        bind:value={instagramDetails.url_action}
                        id="url_action"
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          </div>

          <div class="flex gap-2 justify-end">
            <button
              on:click={() => Open_text_Model.set(false)}
              class="border-[#D1D5DB] border-[1px] rounded-[6px] text-[#4B5563] text-[14px] h-[40px] px-[13px]"
              >Cancel</button
            >
            <button
              on:click={OnSubmit}
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
