<script land="ts">
  import { paymentPackage } from "$lib/stores/onboarding";
  import { onMount } from "svelte";
  import { paymentBasicID } from "$lib/stores/onboarding";
</script>

<svelte:head>
  <style>
    .wpwl-control {
      border-radius: 5px;
      border: 1px solid grey;
      height: 40px;
      width: 100%;
    }
    .wpwl-wrapper-submit {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .wpwl-button-pay {
      border-radius: 5px;
      float: none;
      margin-top: 10px;
      width: 150px;
      color: white;
      background: #0d64e8;
      border: none;
    }

    .wpwl-button-pay:hover {
      background: #589aff;
      border: none;
    }
  </style>
  <script>
    var wpwlOptions = {
      style: "plain",
    };
  </script>
  <script
    async
    src="https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId={$paymentBasicID}/registration"></script>
</svelte:head>

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<div
  class="relative z-10"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
    class="fixed inset-0 bg-[rgba(0, 0, 0, 0.12)] transition-opacity backdrop-blur-sm bg-[#0000001F]"
  />

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div
      class="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div
        class="rounded-lg bg-white text-left drop-shadow sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 flex flex-col justify-between"
      >
        <p class="text-3xl text-blue-500 text-center">Basic Package</p>
        <br />
        <section
          class="flex bg-blue-bglight text-blue-primary p-4 rounded-md relative"
        >
          <div class="flex-1 flex gap-1">
            <div>
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
            </div>

            <div>
              <div class="font-semibold text-sm sm:text-base">
                Subscribe to Colocio Basic
              </div>
              <div class="text-xs sm:text-sm text-gray-600">
                Enter your card details and press <strong>Pay now</strong>
                to subscribe to the Colocio services. You will sign up for the
                <strong>Basic</strong> package.
                <br /><br />
                <strong>Note:</strong> All subscribtions are processed in US Dollars
                ($) and is subject to currency exchange.
              </div>
            </div>
          </div>
        </section>
        <br />
        <div class="rounded-xl ml-12 mr-12 p-5 border-2 border-gray-200">
          <div class="text-xl p-2">
            Payment Overview
            <hr class="mt-3 mb-3 border border-gray-300" />
            <div class="grid grid-cols-2">
              <div class="text-sm sm:text-base">Scale package</div>
              <div class="text-right text-sm sm:text-base">$99.00</div>
              <div class="text-sm sm:text-base">VAT</div>
              <div class="text-right text-sm sm:text-base">$9.00</div>
            </div>
            <hr class="mt-3 mb-3 border border-gray-300" />
            <div class="grid grid-cols-2">
              <div class=" font-semibold text-sm sm:text-base">Total</div>
              <div class="text-right font-semibold text-sm sm:text-base">
                $108.00
              </div>
            </div>
          </div>
        </div>

        <br />
        <div
          class="bg-gray-100 rounded-xl ml-12 mr-12 pt-10 border-2 border-gray-200"
        >
          <form
            action="/payment/process"
            class="paymentWidgets"
            data-brands="VISA MASTER AMEX"
          />
        </div>

        <div class="flex justify-end items-center gap-3 mt-4">
          <button
            on:click={() => {
              $paymentPackage = "";
            }}
            type="button"
            class="justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
