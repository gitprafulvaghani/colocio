<script lang="ts">
  import {} from "$lib/stores/stores";
  import { createEventDispatcher } from "svelte";
  import PaymentOverview from "./paymentOverview.svelte";
  const dispatch = createEventDispatcher();
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
        class="relative flex flex-col sm:flex-row gap-4 w-full px-2 sm:px-10 lg:px-32 xl:px-60 "
      >
        <div
          class="bg-white  px-4 pb-4 pt-5 text-left rounded-lg drop-shadow transform overflow-hidden relative transition-all sm:my-8 sm:w-full flex-1 sm:max-w-3xl sm:p-6 flex flex-col justify-between "
        >
          <button
            class="absolute right-2.5 top-3 flex justify-center items-center w-4 h-4"
          >
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.575738 0.749955C0.810052 0.51564 1.18995 0.51564 1.42427 0.749955L4.6 3.92569L7.77574 0.749955C8.01005 0.51564 8.38995 0.51564 8.62427 0.749955C8.85858 0.984269 8.85858 1.36417 8.62427 1.59848L5.44853 4.77422L8.62427 7.94996C8.85858 8.18427 8.85858 8.56417 8.62427 8.79848C8.38995 9.0328 8.01005 9.0328 7.77574 8.79848L4.6 5.62275L1.42427 8.79848C1.18995 9.0328 0.810052 9.0328 0.575737 8.79848C0.341423 8.56417 0.341423 8.18427 0.575737 7.94996L3.75147 4.77422L0.575738 1.59848C0.341423 1.36417 0.341423 0.984269 0.575738 0.749955Z"
                fill="#1B1D1F"
              />
            </svg>
          </button>
          <div class="flex flex-col gap-4 py-8">
            <h2 class="font-bold text-font_dark text-lg text-center">
              Payment information
            </h2>
            <h4 class="text-gray-500 font-normal text-sm text-center">
              Enter your details below to sign up and make payment
            </h4>

            <form class="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 grid-rows-4">
              <div class="col-span-3 flex flex-col relative">
                <label
                  for="card-numbers"
                  class="text-sm font-medium text-gray-600">Card numbers</label
                >
                <input
                  type="text"
                  name="card-numbers"
                  placeholder="****-****-****-****"
                  id="card-numbers"
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                <div class="flex gap-0 items-center absolute right-4 top-8">
                  <img src="/visa.svg" alt="visa" class="w-10" />
                  <img src="/mastercard.svg" alt="visa" class="w-10" />
                  <img src="/american_express.svg" alt="visa" class="w-10" />
                </div>
              </div>
              <div class="col-span-3 flex flex-col">
                <label for="full-name" class="text-sm font-medium text-gray-600"
                  >Full name (On card)</label
                >
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-2 flex flex-col relative">
                <label
                  for="expiration-date"
                  class="text-sm font-medium text-gray-600"
                  >Expiration date</label
                >
                <input
                  type="text"
                  name="expiration-date"
                  id="expiration-date"
                  placeholder="YY / MM"
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                <img
                  src="/icons/calendar_black.svg"
                  class="w-4 h-4 absolute right-4 top-9"
                  alt="calendar icon"
                />
              </div>
              <div class="col-span-1 flex flex-col">
                <label for="cvv" class="text-sm font-medium text-gray-600"
                  >CVV</label
                >
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-3 flex flex-col">
                <label for="password" class="text-sm font-medium text-gray-600"
                  >Password *</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </form>
          </div>
          <div class="flex justify-end items-center gap-3">
            <button
              type="button"
              class="justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >Cancel</button
            >
            <button
              type="button"
              class="text-white flex items-center justify-center gap-2 w-24 bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5"
            >
              Next
            </button>
          </div>
        </div>
        <PaymentOverview />
      </div>
    </div>
  </div>
</div>
