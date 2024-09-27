<script lang="ts">
    import Goals from '$lib/components/promotions/Goals.svelte';
    import { createEventDispatcher } from 'svelte';
    import { platformDetailsStore, GoalsStore } from '$lib/stores/stores';
    import { onMount } from 'svelte';
    import { isEmpty } from '$lib/services/promotionservice';

    export let ad_desc: string;
    export let goal_selected: string;
    let isVisible = false;
    let platformDetails: any;
    let Goal_info = {
      keywords: ['Special Discount'],
    };
    let Sources_keywords = [
      'Special Discount',
      'Limited-Time Offer',
      '50% Off Today',
    ];
    let keywords = '';

    function GetPlatform() {
      const unsubscribe = platformDetailsStore.subscribe(value => {
        platformDetails = value;
      });

      return () => {
        unsubscribe();
      };
    }

    if (!isEmpty($GoalsStore)) {
      ad_desc = $GoalsStore.discription;
    }

    const dispatch = createEventDispatcher();
    function addkeywords() {
      if (keywords == '') {
      return;
    } else {
      if (!Sources_keywords.includes(keywords)) {
        Sources_keywords = [...Sources_keywords, keywords];
        Goal_info.keywords.push(keywords);
        keywords = '';
      } else {
        //notification.success(`${keywords} is already added `, 5000);
      }
    }
    }
    function NestStep() {
      const GoalsDetails = {
        goalselected: goal_selected,
        discription: ad_desc,
        keywords: Goal_info.keywords,
      };

      GoalsStore.set(GoalsDetails);
      dispatch('nextStep');
    }
    function removeKeywords(value: string) {
      Goal_info.keywords = Goal_info.keywords.filter(item => item != value);
    }
    onMount(() => {
      GetPlatform();
    });
  </script>

  <div class="bg-white md:p-8 p-4 rounded-xl sm:mt-5 drop-shadow-md">
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
      <Goals on:goalSelected {goal_selected} />
      <div>
        <h3 class="text-gray-600 font-medium text-[14px]">
          Ad description
        </h3>
        <p class="text-gray-500 text-[12px] my-1">
          Help Pareto to make informed suggestions to optimize your ad, e.g.
          “Promotes our Monday Madness special the gives customers 50% off
          on all item for this Monday only.”
        </p>
        <textarea
          bind:value={ad_desc}
          id="first_name"
          class="bg-white border border-gray-300 text-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2 h-[82px]"
        />
      </div>
    </div>

    {#if !isVisible}
      <div class="mt-[16px]">
        <div class="flex gap-1">
          <p class="text-[#4B5563] text-[14px]">Keywords</p>
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
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[40px] max-w-[332px]"
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
          {@const selected = Goal_info.keywords.includes(base_sources)}

          <button
            on:click={() => {
              if (selected) {
                Goal_info.keywords = Goal_info.keywords.filter(
                  item => item != base_sources
                );
              } else {
                Goal_info.keywords = [...Goal_info.keywords, base_sources];
              }
            }}
            class:bg-white={!selected}
            class:text-blue-primary={selected}
            class:text-gray-600={!selected}
            type="button"
            class={`px-3 py-[4.5px] hover:bg-blue-bglight border rounded-md border-gray-300 gap-2 flex items-center justify-between text-[14px]  ${selected ? 'bg-[#F4F9FF] border-[#E4EFFF]':''}`}
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
              <img src="/icons/plus.svg" alt="plus" class="w-5 h-5" />
            {/if}
          </button>
        {/each}
      </div>
    {/if}
    <div class="flex items-center justify-between gap-4">
      <button
        on:click={() => {
          dispatch('prevStep');
        }}
        type="button"
        class="py-2.5 sm:max-w-[100px] max-w-[50%] w-full px-5 flex items-center justify-center gap-2 text-sm font-medium text-[#4B5563] focus:outline-none bg-white rounded-md border border-[#D1D5DB] hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 h-[40px]"
      >
        Previous
      </button>
      <button
        on:click={NestStep}
        class:opacity-30={goal_selected === ''}
        disabled={goal_selected === ''}
        type="button"
        class="text-white flex items-center justify-center gap-2 sm:max-w-[100px] max-w-[50%] w-full bg-[#0D64E8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 h-[40px]"
      >
        Next
      </button>
    </div>
  </div>
