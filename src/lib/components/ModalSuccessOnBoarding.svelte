<script lang="ts">
  import {
    bool_modal_media,
    library,
    company_infos,
  } from '$lib/stores/stores';
  import { onboardingComplete } from '$lib/stores/onboarding';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function closeModal() {
    $onboardingComplete = false;
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
        <div class="flex flex-col items-center gap-4">
          <svg
            width="62"
            height="62"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="60"
              height="60"
              rx="9"
              stroke="#0D64E8"
              stroke-width="2"
            />
            <mask
              id="mask0_3497_41108"
              style="mask-type:alpha"
              maskUnits="userSpaceOnUse"
              x="11"
              y="11"
              width="40"
              height="40"
            >
              <rect x="11" y="11" width="40" height="40" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_3497_41108)">
              <path
                d="M23.8212 45.1653V42.6653H29.7507V36.9537C28.3361 36.6695 27.0861 36.0745 26.0007 35.1685C24.9152 34.2625 24.1438 33.1332 23.6865 31.7807C21.7635 31.552 20.1406 30.7358 18.818 29.332C17.4953 27.9281 16.834 26.2615 16.834 24.332V22.6653C16.834 21.9837 17.0802 21.3967 17.5728 20.9042C18.0653 20.4116 18.6523 20.1654 19.3339 20.1654H23.2122V16.832H38.789V20.1654H42.6673C43.3489 20.1654 43.9359 20.4116 44.4284 20.9042C44.921 21.3967 45.1672 21.9837 45.1672 22.6653V24.332C45.1672 26.2615 44.5059 27.9281 43.1832 29.332C41.8606 30.7358 40.2378 31.552 38.3147 31.7807C37.8574 33.1332 37.086 34.2625 36.0006 35.1685C34.9151 36.0745 33.6651 36.6695 32.2506 36.9537V42.6653H38.18V45.1653H23.8212ZM23.2122 29.0948V22.6653H19.3339V24.332C19.3339 25.4944 19.6983 26.5152 20.4269 27.3945C21.1555 28.2738 22.084 28.8405 23.2122 29.0948ZM31.0006 34.5564C32.4643 34.5564 33.7063 34.0462 34.7266 33.0259C35.7469 32.0056 36.257 30.7636 36.257 29.2999V19.332H25.7442V29.2999C25.7442 30.7636 26.2543 32.0056 27.2747 33.0259C28.2949 34.0462 29.5369 34.5564 31.0006 34.5564ZM38.789 29.0948C39.9173 28.8405 40.8457 28.2738 41.5743 27.3945C42.303 26.5152 42.6673 25.4944 42.6673 24.332V22.6653H38.789V29.0948Z"
                fill="#0D64E8"
              />
            </g>
          </svg>

          <h2 class="font-medium text-blue-primary text-xl sm:text-2xl">
            Well done!
          </h2>

          <hr class="bg-gray-200 h-[1px] w-full" />

          <div class="text-center text-gray-600">
            You have successfully created your Colocio profile for the <b
              >{$company_infos.name}</b
            >.<br />
            Let’s get started.
          </div>
          <br />
          <button
            on:click={closeModal}
            type="button"
            class="justify-center items-center rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600 sm:col-start-1 sm:mt-0"
            >Awesome, thanks!</button
          >
        </div>
      </div>
    </div>
  </div>
</div>
