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
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-center">
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
                <path
                  d="M20.9616 43.7499C20.2039 43.7499 19.5625 43.4874 19.0375 42.9624C18.5125 42.4374 18.25 41.7961 18.25 41.0384V20.9616C18.25 20.2039 18.5125 19.5625 19.0375 19.0375C19.5625 18.5125 20.2039 18.25 20.9616 18.25H27.6366C27.7558 17.4077 28.1279 16.6971 28.7529 16.1183C29.3779 15.5394 30.1269 15.25 31 15.25C31.8731 15.25 32.6221 15.5394 33.2471 16.1183C33.8721 16.6971 34.2442 17.4077 34.3634 18.25H41.0384C41.7961 18.25 42.4375 18.5125 42.9625 19.0375C43.4875 19.5625 43.75 20.2039 43.75 20.9616V41.0384C43.75 41.7961 43.4875 42.4374 42.9625 42.9624C42.4375 43.4874 41.7961 43.7499 41.0384 43.7499H20.9616ZM31 19.5192C31.325 19.5192 31.5937 19.4129 31.8062 19.2004C32.0187 18.9879 32.125 18.7192 32.125 18.3942C32.125 18.0692 32.0187 17.8004 31.8062 17.5879C31.5937 17.3754 31.325 17.2692 31 17.2692C30.675 17.2692 30.4062 17.3754 30.1937 17.5879C29.9812 17.8004 29.875 18.0692 29.875 18.3942C29.875 18.7192 29.9812 18.9879 30.1937 19.2004C30.4062 19.4129 30.675 19.5192 31 19.5192ZM20.5 40.0635C21.85 38.7385 23.4187 37.6947 25.2062 36.9322C26.9937 36.1697 28.925 35.7885 31 35.7885C33.075 35.7885 35.0062 36.1697 36.7937 36.9322C38.5812 37.6947 40.15 38.7385 41.5 40.0635V20.9616C41.5 20.8462 41.4519 20.7404 41.3558 20.6442C41.2596 20.548 41.1538 20.5 41.0384 20.5H20.9616C20.8462 20.5 20.7404 20.548 20.6442 20.6442C20.5481 20.7404 20.5 20.8462 20.5 20.9616V40.0635ZM31 32.5577C32.3538 32.5577 33.5048 32.0836 34.4528 31.1356C35.4009 30.1875 35.875 29.0365 35.875 27.6827C35.875 26.3289 35.4009 25.1779 34.4528 24.2298C33.5048 23.2818 32.3538 22.8077 31 22.8077C29.6461 22.8077 28.4952 23.2818 27.5471 24.2298C26.5991 25.1779 26.125 26.3289 26.125 27.6827C26.125 29.0365 26.5991 30.1875 27.5471 31.1356C28.4952 32.0836 29.6461 32.5577 31 32.5577ZM22.6634 41.5H39.3366V41.1827C38.152 40.125 36.8524 39.3365 35.438 38.8173C34.0236 38.298 32.5442 38.0384 31 38.0384C29.475 38.0384 28.0029 38.2956 26.5836 38.8101C25.1644 39.3245 23.8576 40.1057 22.6634 41.1538V41.5ZM31 30.3077C30.2788 30.3077 29.661 30.0505 29.1466 29.5361C28.6322 29.0217 28.375 28.4039 28.375 27.6827C28.375 26.9615 28.6322 26.3437 29.1466 25.8293C29.661 25.3149 30.2788 25.0577 31 25.0577C31.7211 25.0577 32.3389 25.3149 32.8534 25.8293C33.3678 26.3437 33.625 26.9615 33.625 27.6827C33.625 28.4039 33.3678 29.0217 32.8534 29.5361C32.3389 30.0505 31.7211 30.3077 31 30.3077Z"
                  fill="#0D64E8"
                />
              </svg>
            </div>
            <h2 class="font-bold text-font_dark text-lg text-center">
              Sign up
            </h2>
            <h4 class="text-gray-500 font-normal text-sm text-center">
              Enter your details below to sign up and make payment
            </h4>

            <form class="grid grid-cols-2 gap-4 grid-rows-5">
              <div class="col-span-1 flex flex-col">
                <label
                  for="first_name"
                  class="text-sm font-medium text-gray-600">First name *</label
                >
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-1 flex flex-col">
                <label for="last_name" class="text-sm font-medium text-gray-600"
                  >Last name *</label
                >
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-2 flex flex-col">
                <label for="email" class="text-sm font-medium text-gray-600"
                  >Email *</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-2 flex flex-col">
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
              <div class="col-span-2 flex flex-col">
                <label
                  for="confirm_password"
                  class="text-sm font-medium text-gray-600"
                  >Confirm password *</label
                >
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-2 flex">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                <label
                  for="terms"
                  class="text-sm font-medium text-gray-600 ml-2"
                  >I agree to <span class="underline">Ts&Cs</span></label
                >
              </div>
            </form>
          </div>
          <div class="flex justify-end items-center gap-3 ">
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
