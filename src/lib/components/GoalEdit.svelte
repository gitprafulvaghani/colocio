<script lang="ts">
    import { onboardingComplete } from '$lib/stores/onboarding';
    import { createEventDispatcher } from 'svelte';
    import Goals from './promotions/Goals.svelte';
    import {
      Goal_Edit_Modal,
      platformDetailsStore,
      Store_Selected_goal,
      automated_Goals_Store
    } from '$lib/stores/stores';

    const dispatch = createEventDispatcher();
    export let ad_desc: string;
    export let shareDetails;
    let seleted_Selected_goal: "leads";

    $: {
    seleted_Selected_goal = $Store_Selected_goal;
  }

    let interest = '';
    let Goal_info = {
      keywords: $automated_Goals_Store,
    };
    let Sources_keywords = [
      'Special Discount',
      'Limited-Time Offer',
      '50% Off Today',
    ];
    let keywords = '';
    let platformDetails: any;

    export let audience_infos = {
      age: '',
      gender: '',
      locations: [],
      interests: ['Recently followed'],
    };
    // let Sources_propositon = [
    //   'Special Discount',
    //   'Limited-Time Offer',
    //   '50% Off Today',
    // ];
    function addkeywords() {
      if (keywords == '') return;
      Sources_keywords = [...Sources_keywords, keywords];
      keywords = '';
    }
    function removeKeywords(value: string) {
      Goal_info.keywords = Goal_info.keywords.filter(item => item != value);
    }
    function OnSave() {
        automated_Goals_Store.set(Goal_info.keywords)
        Goal_Edit_Modal.set(false);
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
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full justify-center p-3 text-center items-center"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left drop-shadow transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 flex flex-col justify-between"
        >
        <button
                on:click={()=>Goal_Edit_Modal.set(false)}
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
          <div class="flex flex-col gap-4 pb-4">
            <h1
              class="flex items-center gap-2.5 font-bold text-lg text-font_dark"
            >
              <svg
                width="45"
                height="44"
                viewBox="0 0 45 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.5 18V15L29.5 12L30.5 14L32.5 15L29.5 18H26.5ZM26.5 18L22.5 21.9999M32.5 22C32.5 27.5228 28.0228 32 22.5 32C16.9772 32 12.5 27.5228 12.5 22C12.5 16.4772 16.9772 12 22.5 12M27.5 22C27.5 24.7614 25.2614 27 22.5 27C19.7386 27 17.5 24.7614 17.5 22C17.5 19.2386 19.7386 17 22.5 17"
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
              Goal
            </h1>

            <hr class="bg-gray-200 h-[1px]" />
            <h2 class="text-gray-600 text-sm">
              Select the goal of this ad campaign:
            </h2>
            <Goals on:goalSelected {$Store_Selected_goal} />
            <div>
              <div class="mt-[16px]">
                <div class="flex gap-1">
                  <p class="text-[#4B5563] text-[14px]">Keywords</p>
                  <!--<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3.2194 10C3.2194 6.25518 6.25518 3.2194 10 3.2194C13.7448 3.2194 16.7806 6.25518 16.7806 10C16.7806 13.7448 13.7448 16.7806 10 16.7806C6.25518 16.7806 3.2194 13.7448 3.2194 10ZM10.6097 10C10.6097 9.66327 10.3367 9.3903 10 9.3903C9.66327 9.3903 9.3903 9.66327 9.3903 10V12.9561C9.3903 13.2928 9.66327 13.5658 10 13.5658C10.3367 13.5658 10.6097 13.2928 10.6097 12.9561V10ZM9.26097 7.78291C9.26097 7.37475 9.59185 7.04388 10 7.04388C10.4082 7.04388 10.739 7.37475 10.739 7.78291C10.739 8.19106 10.4082 8.52194 10 8.52194C9.59185 8.52194 9.26097 8.19106 9.26097 7.78291Z"
                      fill="#4B5563"
                    />
                  </svg>-->

                  <div class="group relative transition-all">
                    <button class='transition-all'>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3.2194 10C3.2194 6.25518 6.25518 3.2194 10 3.2194C13.7448 3.2194 16.7806 6.25518 16.7806 10C16.7806 13.7448 13.7448 16.7806 10 16.7806C6.25518 16.7806 3.2194 13.7448 3.2194 10ZM10.6097 10C10.6097 9.66327 10.3367 9.3903 10 9.3903C9.66327 9.3903 9.3903 9.66327 9.3903 10V12.9561C9.3903 13.2928 9.66327 13.5658 10 13.5658C10.3367 13.5658 10.6097 13.2928 10.6097 12.9561V10ZM9.26097 7.78291C9.26097 7.37475 9.59185 7.04388 10 7.04388C10.4082 7.04388 10.739 7.37475 10.739 7.78291C10.739 8.19106 10.4082 8.52194 10 8.52194C9.59185 8.52194 9.26097 8.19106 9.26097 7.78291Z"
                            fill="#4B5563"
                          />
                        </svg>
                    </button>
                      <p class='absolute hidden group-hover:block transition-all bg-[#E4EFFF] text-[#0D64E8] rounded-[4px] text-[12px] p-2 left-[25px] z-[1] top-[-18px] w-[330px]'>Keywords are words or phrases that are used to match your ads with the terms people are searching for.</p>
                  </div>
                </div>

                <div class="relative w-fit mt-1">
                  <input
                    bind:value={keywords}
                    on:keyup={e => {
                      if (e.key == 'Enter') addkeywords();
                    }}
                    type="text"
                    id="headline_2"
                    class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[40px] max-w-[332px] pr-[40px]"
                  />
                  <button
                    on:click={addkeywords}
                    type="button"
                    class="bg-transparent absolute top-[50%] translate-y-[-50%] right-3"
                  >
                    <img src="/icons/plus.svg" alt="plus" class="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-[16px] mb-[32px]">
                {#each Sources_keywords as base_sources}
                  {@const selected =
                    Goal_info.keywords.includes(base_sources)}

                  <button
                    on:click={() => {
                      if (selected) {
                        Goal_info.keywords = Goal_info.keywords.filter(
                          item => item != base_sources
                        );
                      } else {
                        Goal_info.keywords = [
                          ...Goal_info.keywords,
                          base_sources,
                        ];
                      }
                    }}
                    class:bg-white={!selected}
                    class:text-blue-primary={selected}
                    class:text-gray-600={!selected}
                    type="button"
                    class={`px-3 py-[4.5px] hover:bg-blue-bglight border rounded-md border-[#D1D5DB] gap-2 flex items-center justify-between text-[14px] ${selected ? 'bg-[#F4F9FF] border-[#E4EFFF]':''}`}
                  >
                    {base_sources}
                    {#if selected}
                      <button
                        on:click={() => {
                          removeKeywords(base_sources);
                        }}
                      >
                        <img
                          src="/icons/close_blue.svg"
                          alt="plus"
                          class="w-5 h-5"
                        />
                      </button>
                    {:else}
                      <img
                        src="/icons/plus.svg"
                        alt="plus"
                        class="w-5 h-5"
                      />
                    {/if}
                  </button>
                {/each}
              </div>
            </div>
            <div class="flex gap-2 justify-end">
              <button
                on:click={() => Goal_Edit_Modal.set(false)}
                class="border-[#D1D5DB] border-[1px] rounded-[6px] text-[#4B5563] text-[14px] h-[40px] px-[13px]"
                >Cancel</button
              >
              <button
                on:click={OnSave}
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
