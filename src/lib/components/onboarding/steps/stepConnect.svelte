<script lang="ts">
  import { page } from '$app/stores';
  import { facebookLogin } from '$lib/services/facebook/Login';
  import { socialSignedIn } from '$lib/stores/onboarding';
  import { toastStore } from '$lib/stores/stores';

  // TODO: Need a system notification service to handle errors and
  // success messages. socialSignedInError is a temporary solution.
  let socialSignedInError: any = { facebook: null, google: null };

  async function handleFacebookLogin() {
    try {
      const response = await facebookLogin();
      if (response.success) {
        $socialSignedIn.facebook.success = true;
      }

      const res = await fetch('/api/facebook/accounts');
      const data = await res.json();
      if (data.success) {
        $socialSignedIn.facebook.data = data;
      }
      toastStore.update(toasts => [
        ...toasts,
        {
          id: Math.random(),
          type: 'success',
          message: 'Signed in succesfully',
          duration: 5000,
        },
      ]);
    } catch (error: any) {
      toastStore.update(toasts => [
        ...toasts,
        {
          id: Math.random(),
          type: 'danger',
          message: 'Something went wrong singing in, please try again',
          duration: 5000,
        },
      ]);
      $socialSignedIn.facebook.error = error.error;
      console.error('Facebook login failed:', error);
    }
  }

  $: data = $page.data;
</script>

<div class="flex flex-col gap-4">
  <h1 class="text-center text-2xl font-medium text-blue-primary">Connect</h1>

  <section
    class="flex w-full items-center justify-between gap-4 rounded-md border
    border-gray-300 p-3"
  >
    <div class="flex flex-col">
      <h4 class="text-sm font-medium text-gray-600 sm:text-base">
        Meta Business Account
      </h4>
      <p class="text-xs text-gray-500 sm:text-sm">
        Connect to Facebook, Pixel, Instagram and Threads.
        <button class="text-blue-primary">More info</button>
      </p>
    </div>
    <button
      on:click={handleFacebookLogin}
      disabled={$socialSignedIn.facebook.success ||
        socialSignedInError.facebook !== null}
      type="button"
      class="flex w-1/4 items-center gap-1 rounded-md border border-blue-primary
      px-3.5 py-2.5 text-sm sm:text-base"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.75 7.75003H11.2381V6.25003C11.2381 5.47604 11.298 4.98854
          12.3519 4.98854H13.683V2.60355C13.0353 2.53305 12.384 2.49855 11.7319
          2.50005C9.79869 2.50005 8.38777 3.74279 8.38777
          6.02429V7.75003H6.25V10.75L8.38777
          10.7493V17.5H11.2381V10.7478L13.4229 10.747L13.75 7.75003Z"
          fill="#0D64E8"
        />
      </svg>
      <span class="text-blue-primary">
        {#if $socialSignedIn.facebook.success && $socialSignedIn.facebook.data !== null}
          Signed in
        {:else}
          Sign in with Facebook
        {/if}
      </span>
    </button>
  </section>
  {#if $socialSignedIn.facebook.error}
    <p class="rounded bg-red-50 px-4 py-2 text-red-500">
      {$socialSignedIn.facebook.error}
    </p>
  {/if}

  <section
    class="flex w-full items-center justify-between gap-4 rounded-md border
    border-gray-300 p-3 opacity-50"
  >
    <div class="flex flex-col">
      <h4 class="text-sm font-medium text-gray-600 sm:text-base">Google</h4>
      <p class="text-xs text-gray-500 sm:text-sm">
        Connect to Google Ads, Google Analytics, Tag Manager and Youtube.
        <button class="text-blue-primary">More info</button>
      </p>
    </div>
    <button
      disabled={$socialSignedIn.google.success}
      type="button"
      class="flex w-1/4 items-center gap-1 rounded-md border border-blue-primary
      px-3.5 py-2.5 text-sm sm:text-base"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 10C2.5 5.8645 5.8645 2.5 10 2.5C11.6702 2.5 13.2511 3.03736
          14.5717 4.054L12.8289 6.318C12.0123 5.68943 11.0341 5.35714 10
          5.35714C7.43993 5.35714 5.35714 7.43993 5.35714 10C5.35714 12.5601
          7.43993 14.6429 10 14.6429C12.0619 14.6429 13.8141 13.2919 14.418
          11.4286H10V8.57143H17.5V10C17.5 14.1355 14.1355 17.5 10 17.5C5.8645
          17.5 2.5 14.1355 2.5 10Z"
          fill="#0D64E8"
        />
      </svg>

      <span class="text-blue-primary">Sign in with Google</span>
    </button>
  </section>

  <section
    class="flex w-full items-center justify-between gap-4 rounded-md border
    border-gray-300 p-3 opacity-50"
  >
    <div class="flex flex-col">
      <h4 class="text-sm font-medium text-gray-600 sm:text-base">
        LinkedIn (Coming soon)
      </h4>
      <p class="text-xs text-gray-500 sm:text-sm">
        Connect to LinkedIn Ads.
        <button class="text-blue-primary">More info</button>
      </p>
    </div>
    <button
      type="button"
      class="disabled flex w-1/4 items-center gap-1 rounded-md border
      border-blue-primary px-3.5 py-2.5 text-sm sm:text-base"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.85759 17.5H2.74777V7.48527H5.85759V17.5ZM4.301 6.11917C3.30658
          6.11917 2.5 5.29549 2.5 4.30104C2.5 3.82338 2.68975 3.36528 3.0275
          3.02751C3.36526 2.68975 3.82335 2.5 4.301 2.5C4.77866 2.5 5.23675
          2.68975 5.57451 3.02751C5.91226 3.36528 6.10201 3.82338 6.10201
          4.30104C6.10201 5.29549 5.29509 6.11917 4.301 6.11917ZM17.4967
          17.5H14.3935V12.6249C14.3935 11.463 14.3701 9.97305 12.7767
          9.97305C11.1598 9.97305 10.9121 11.2354 10.9121
          12.5412V17.5H7.80558V7.48527H10.7882V8.85137H10.8317C11.2469 8.06452
          12.261 7.23415 13.7741 7.23415C16.9214 7.23415 17.5 9.30674 17.5
          11.9988V17.5H17.4967Z"
          fill="#0D64E8"
        />
      </svg>

      <span class="text-blue-primary">Sign in with LinkedIn</span>
    </button>
  </section>

  <section
    class="flex w-full items-center justify-between gap-4 rounded-md border
    border-gray-300 p-3 opacity-50"
  >
    <div class="flex flex-col">
      <h4 class="text-sm font-medium text-gray-600 sm:text-base">
        TikTok (Coming soon)
      </h4>
      <p class="text-xs text-gray-500 sm:text-sm">
        Connect to TikTok Ads.
        <button class="text-blue-primary">More info</button>
      </p>
    </div>
    <button
      type="button"
      class="flex w-1/4 items-center gap-1 rounded-md border border-blue-primary
      px-3.5 py-2.5 text-sm sm:text-base"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.3525 3.75H10.3794V12.2645C10.3794 13.279 9.62058 14.1123
          8.67623 14.1123C7.73187 14.1123 6.97302 13.279 6.97302 12.2645C6.97302
          11.2681 7.71501 10.4529 8.62565 10.4167V8.27899C6.61889 8.31521 5
          10.0725 5 12.2645C5 14.4747 6.65261 16.25 8.6931 16.25C10.7335 16.25
          12.3862 14.4565 12.3862 12.2645V7.89854C13.1282 8.47826 14.0388
          8.82246 15 8.84059V6.7029C13.516 6.64855 12.3525 5.3442 12.3525 3.75Z"
          fill="#0D64E8"
        />
      </svg>

      <span class="text-blue-primary">Sign in TikTok</span>
    </button>
  </section>
</div>
