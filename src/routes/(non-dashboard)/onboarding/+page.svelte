<!-- TODO: After the sign up from PayPal, need to make sure that there is a
profile created for the user.-->
<!-- TODO: Add any extra data that is needed to the profile at this point.
Thinking of things like the source of the user, so in this case it would be that
the user signed up from PayPal. -->

<script lang="ts">
  import {
    PUBLIC_FACEBOOK_API_VERSION,
    PUBLIC_FACEBOOK_APP_ID,
  } from '$env/static/public';
  import Logo from '$lib/components/Logo.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import AddObject from '$lib/components/onboarding/steps/business/addObject.svelte';
  import LetsGetStarted from '$lib/components/onboarding/steps/letsGetStarted.svelte';
  import StepAccounts from '$lib/components/onboarding/steps/stepAccounts.svelte';
  import StepAudience from '$lib/components/onboarding/steps/stepAudience.svelte';
  import StepBusiness from '$lib/components/onboarding/steps/stepBusiness.svelte';
  import StepComplete from '$lib/components/onboarding/steps/stepComplete.svelte';
  import StepConnect from '$lib/components/onboarding/steps/stepConnect.svelte';
  import StepProgress from '$lib/components/onboarding/steps/stepProgress.svelte';
  import StepUsers from '$lib/components/onboarding/steps/stepUsers.svelte';
  import {
    accounts,
    audience,
    duplicate,
    socialSignedIn,
  } from '$lib/stores/onboarding';
  import {
    add_object_business,
    company_infos,
    currencies,
    elevator_pitch,
    toastStore,
  } from '$lib/stores/stores';
  import { redirect } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  export let data;

  if (data.currencies) {
    $currencies = data.currencies;
  }

  const steps = [
    LetsGetStarted,
    StepConnect,
    StepAccounts,
    StepUsers,
    StepBusiness,
    StepAudience,
    StepComplete,
  ];

  let currentStep: number = 1;

  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      currentStep--;
    } else {
      redirect(303, '/login');
    }
  }

  function removeToast(id: number) {
    toastStore.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  onMount(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: false,
        version: PUBLIC_FACEBOOK_API_VERSION,
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      if (fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, 'script', 'facebook-jssdk');
  });

  let bool_next_allowed = false;

  $: {
    bool_next_allowed = isNextAllowed(
      currentStep,
      $socialSignedIn,
      $elevator_pitch,
      $accounts,
      $duplicate,
      $audience,
      $company_infos.name
    );
  }

  function isNextAllowed(
    stepNumber: number,
    signedInInfos,
    pitch: string,
    accounts: any[], // Replace `any` with the specific type
    duplicate: boolean,
    audience,
    companyName: string
  ) {
    let bool_allowed = false;
    if (stepNumber == 0) {
      if (companyName) {
        bool_allowed = true;
      }
    } else if (stepNumber == 1) {
      bool_allowed =
        signedInInfos.facebook.success && signedInInfos.facebook.data !== null;
    } else if (stepNumber == 2) {
      if (accounts.length > 0 && !duplicate) {
        bool_allowed = true;
      }
    } else if (stepNumber == 3) {
      nextStep();
    } else if (stepNumber == 4) {
      bool_allowed = pitch.length < 280;
    } else if (stepNumber == 5) {
      if (
        audience.name &&
        audience.age.min &&
        audience.age.max &&
        audience.gender
      ) {
        bool_allowed = true;
      }
    }
    return bool_allowed;
  }
</script>

{#each $toastStore as toast (toast.id)}
  <Toast
    bind:message={toast.message}
    bind:duration={toast.duration}
    bind:type={toast.type}
    on:close={() => removeToast(toast.id)}
  />
{/each}

<svelte:head>
  <title>Welcome | Colocio</title>
  <meta
    name="description"
    content="Let's get started with creating your profile."
  />
  <meta
    name="keywords"
    content="colocio, ai, ads, facebook, meta, facebook ads, campaign"
  />
  <!-- TODO: Not sure where this font is being used  -->
  <!-- <link -->
  <!--   rel="stylesheet" -->
  <!--   href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" -->
  <!-- /> -->
</svelte:head>

<main class="bg-blue-600">
  <div class="flex h-screen flex-col justify-between">
    <header class="p-6">
      <Logo className="fill-white filter-none w-[170px]"></Logo>
    </header>

    <div
      class="relative z-[999]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {#if $add_object_business.show}
        <AddObject />
      {/if}
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full flex-col items-end justify-center p-4
          text-center sm:items-center sm:p-0"
        >
          <StepProgress step={currentStep} />
          <div
            class="relative flex w-full flex-col gap-4 px-2 sm:flex-row sm:px-10
            lg:px-32 2xl:px-96"
          >
            <div
              class="relative flex flex-1 transform flex-col justify-between
              overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left
              drop-shadow transition-all sm:my-8 sm:w-full sm:p-6"
            >
              <svelte:component this={steps[currentStep]}></svelte:component>

              {#if currentStep != 6}
                <div class="mt-4 flex items-center justify-end gap-3">
                  <button
                    on:click={previousStep}
                    type="button"
                    class="items-center justify-center rounded-md bg-white px-5
                    py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1
                    ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1
                    sm:mt-0"
                  >
                    {#if currentStep == 0}
                      Cancel
                    {:else}
                      Back
                    {/if}
                  </button>

                  <button
                    on:click={nextStep}
                    type="button"
                    disabled={!bool_next_allowed}
                    class:opacity-50={!bool_next_allowed}
                    class="flex w-24 items-center justify-center gap-2
                    rounded-md bg-blue-primary px-5 py-2.5 text-sm font-medium
                    text-white hover:bg-blue-800 focus:ring-4
                    focus:ring-blue-300"
                  >
                    Next
                  </button>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
