<script lang="ts">
  import { createAdSet } from "$lib/services/NewFacebook/NewFacebookService";
  import {
    GoalsStore,
    AudienceStore,
    textStore,
    Selected_Library_Store,
    ScheduleStore,
  } from "$lib/stores/stores";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  let step = "";

  // Function to parse URL parameters
  function getUrlParameter(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  // Update the URL parameter value when the component is mounted
  onMount(() => {
    setInterval(() => {
      step = getUrlParameter("step");
    }, 1000);
  });

  // Watch for changes in the URL parameter
  $: {
    if (step === "7") {
      bool_schedule_disabled = true;
    } else {
      bool_schedule_disabled = false;
    }
  }

  // Cleanup function
  onDestroy(() => {
    // Clean up any subscriptions or resources here if necessary
  });
  //import { GoalsStore } from '$lib/stores/stores';
  export let ad_name: string;
  let bool_schedule_disabled = false;

  async function handleSaveDraft() {
    const data = await createAdSet(
      $AudienceStore,
      $Selected_Library_Store,
      $textStore,
      $ScheduleStore,
      "draft"
    );
  }
</script>

<div
  class="flex justify-between mt-4 lg:mt-0 border-b-[#E5E7EB] border-b-[1px] pb-[20px] gap-3"
>
  <div class="flex gap-2 sm:gap-4 xl:gap-8">
    <input
      value="Ad name"
      type="text"
      id="first_name"
      class="bg-white border font-semibold border-gray-300 text-[#4B5563] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2 h-[40px]"
      placeholder="Ad name"
    />
  </div>
  <div class="flex lg:items-center text-sm font-semibold gap-2">
    <a
      href="/"
      class="py-2.5 md:px-5 px-[10px] text-sm font-medium text-gray-600 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 h-[40px]"
    >
      <span class="md:block hidden"> Cancel </span>
      <span class="md:hidden">
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
            d="M4.46967 5.46967C4.76256 5.17678 5.23744 5.17678 5.53033 5.46967L9.5 9.43934L13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967C14.8232 5.76256 14.8232 6.23744 14.5303 6.53033L10.5607 10.5L14.5303 14.4697C14.8232 14.7626 14.8232 15.2374 14.5303 15.5303C14.2374 15.8232 13.7626 15.8232 13.4697 15.5303L9.5 11.5607L5.53033 15.5303C5.23744 15.8232 4.76256 15.8232 4.46967 15.5303C4.17678 15.2374 4.17678 14.7626 4.46967 14.4697L8.43934 10.5L4.46967 6.53033C4.17678 6.23744 4.17678 5.76256 4.46967 5.46967Z"
            fill="#1B1D1F"
          />
        </svg>
      </span>
    </a>
    <button
      type="button"
      on:click={handleSaveDraft}
      class="py-2.5 xl:w-40 md:px-5 px-[10px] flex items-center justify-center gap-2 text-sm font-medium text-gray-600 focus:outline-none h-[40px] bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200"
    >
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
          d="M13.6612 3.125C13.7625 3.125 13.8597 3.16524 13.9313 3.23687L16.7631 6.06869C16.8348 6.14032 16.875 6.23746 16.875 6.33876V16.4931C16.875 16.704 16.704 16.875 16.4931 16.875H3.50694C3.296 16.875 3.125 16.704 3.125 16.4931V3.50694C3.125 3.296 3.296 3.125 3.50694 3.125H13.6612Z"
          fill="white"
        />
        <path
          d="M6.18056 11.1458C6.18056 10.9349 6.35156 10.7639 6.5625 10.7639H13.4375C13.6484 10.7639 13.8194 10.9349 13.8194 11.1458V16.4931C13.8194 16.704 13.6484 16.875 13.4375 16.875H6.5625C6.35156 16.875 6.18056 16.704 6.18056 16.4931V11.1458Z"
          fill="white"
        />
        <path
          d="M6.94444 3.50694C6.94444 3.296 7.11545 3.125 7.32639 3.125H12.6736C12.8846 3.125 13.0556 3.296 13.0556 3.50694V6.5625C13.0556 6.77344 12.8846 6.94444 12.6736 6.94444H7.32639C7.11545 6.94444 6.94444 6.77344 6.94444 6.5625V3.50694Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.6612 3.125C13.7625 3.125 13.8597 3.16524 13.9313 3.23687L16.7631 6.06869C16.8348 6.14032 16.875 6.23746 16.875 6.33876V16.4931C16.875 16.704 16.704 16.875 16.4931 16.875H3.50694C3.296 16.875 3.125 16.704 3.125 16.4931V3.50694C3.125 3.296 3.296 3.125 3.50694 3.125H13.6612Z"
          stroke="#111827"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <path
          d="M6.18056 11.1458C6.18056 10.9349 6.35156 10.7639 6.5625 10.7639H13.4375C13.6484 10.7639 13.8194 10.9349 13.8194 11.1458V16.4931C13.8194 16.704 13.6484 16.875 13.4375 16.875H6.5625C6.35156 16.875 6.18056 16.704 6.18056 16.4931V11.1458Z"
          stroke="#111827"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <path
          d="M6.94444 3.50694C6.94444 3.296 7.11545 3.125 7.32639 3.125H12.6736C12.8846 3.125 13.0556 3.296 13.0556 3.50694V6.5625C13.0556 6.77344 12.8846 6.94444 12.6736 6.94444H7.32639C7.11545 6.94444 6.94444 6.77344 6.94444 6.5625V3.50694Z"
          stroke="#111827"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>
      <span class="md:block hidden"> Save as draft </span>
    </button>
    <button
      class:opacity-30={!bool_schedule_disabled}
      type="button"
      class="text-white hidden md:flex items-center justify-center gap-2 xl:w-40 bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 h-[40px]"
      disabled={!bool_schedule_disabled}
    >
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.66697 6.3398H13.3336V4.25644C13.3336 4.19233 13.3069 4.13356 13.2535 4.08013C13.2001 4.02671 13.1413 4.00001 13.0772 4.00001H1.92341C1.8593 4.00001 1.80053 4.02671 1.7471 4.08013C1.69368 4.13356 1.66697 4.19233 1.66697 4.25644V6.3398ZM1.92341 16.9167C1.50246 16.9167 1.14616 16.7708 0.854492 16.4792C0.562826 16.1875 0.416992 15.8312 0.416992 15.4102V4.25644C0.416992 3.8355 0.562826 3.47919 0.854492 3.18753C1.14616 2.89586 1.50246 2.75003 1.92341 2.75003H3.07726V0.987213H4.35928V2.75003H10.6734V0.987213H11.9233V2.75003H13.0772C13.4981 2.75003 13.8545 2.89586 14.1461 3.18753C14.4378 3.47919 14.5836 3.8355 14.5836 4.25644V8.8093C14.3838 8.7217 14.1798 8.65092 13.9715 8.59696C13.7631 8.54302 13.5505 8.50055 13.3336 8.46957V7.58978H1.66697V15.4102C1.66697 15.4743 1.69368 15.5331 1.7471 15.5865C1.80053 15.64 1.8593 15.6667 1.92341 15.6667H7.34168C7.41219 15.8974 7.4974 16.1156 7.59728 16.3213C7.69717 16.527 7.81069 16.7254 7.93783 16.9167H1.92341ZM12.6606 17.75C11.62 17.75 10.7348 17.3851 10.0051 16.6554C9.27544 15.9257 8.9106 15.0406 8.9106 14C8.9106 12.9594 9.27544 12.0743 10.0051 11.3446C10.7348 10.6149 11.62 10.25 12.6606 10.25C13.7012 10.25 14.5863 10.6149 15.316 11.3446C16.0457 12.0743 16.4105 12.9594 16.4105 14C16.4105 15.0406 16.0457 15.9257 15.316 16.6554C14.5863 17.3851 13.7012 17.75 12.6606 17.75ZM14.0484 15.907L14.5676 15.3878L13.0292 13.8494V11.5481H12.292V14.1507L14.0484 15.907Z"
          fill="white"
        />
      </svg>

      Schedule
    </button>
  </div>
</div>
