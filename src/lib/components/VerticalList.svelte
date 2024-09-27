<script>
  import { accounts } from '$lib/stores/onboarding';
  import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import { cubicIn } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  export let items;
  export let main;
  const flipDurationMs = 300;

  function handleDndConsider(e) {
    items = e.detail.items;
  }
  function handleDndFinalize(e) {
    items = e.detail.items;
    if (e.target.ariaLabel == 'true') {
      $accounts = e.detail.items;
    }
  }
</script>

<section
  use:dndzone={{ items, flipDurationMs }}
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
  class="grid min-h-40 grid-cols-2 gap-2 bg-gray-100 !outline-none"
  aria-label={main}
>
  {#each items as item (item.id)}
    <div animate:flip={{ duration: flipDurationMs }}>
      {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
        <div
          in:fade={{ duration: 200, easing: cubicIn }}
          class="custom-shadow-item rounded-md"
        ></div>
      {/if}
      <div
        class="w-4/4 h-15 border-black-200 flex rounded-md border-2 bg-white shadow-md"
      >
        <div>
          {#if item.type == 'facebook page'}
            {#if item.profile_picture_url}
              <img
                class="h-9 w-9 rounded-full border border-gray-400"
                src={item.profile_picture_url}
                alt=""
              />
            {:else}
              <svg
                class="h-9 w-9 rounded-full border border-gray-400"
                viewBox="-5 -2 17 17"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 4.20002H3.9905V3.00003C3.9905 2.38083 4.03838 1.99083
                  4.88152 1.99083H5.94641V0.0828372C5.42822 0.0264374 4.90717
                  -0.0011625 4.38556 3.74999e-05C2.83895 3.74999e-05 1.71021
                  0.994234 1.71021 2.81943V4.20002H0V6.60002L1.71021
                  6.59942V12H3.9905V6.59822L5.73834 6.59762L6 4.20002Z"
                  fill="#111827"
                />
              </svg>
            {/if}
          {:else if item.type == 'facebook ad account'}
            <svg
              class="h-9 w-9 rounded-full border border-gray-400"
              viewBox="-4 -5 25 25"
            >
              <path
                d="M2.11833 8.11257C2.11833 5.40314 3.55071 2.57592 5.23221
                2.57592C6.16637 2.57592 6.9137 3.10602 8.09698 4.69633C6.97598
                6.34555 6.29093 7.34686 6.29093 7.34686C4.79626 9.58508 4.29804
                10.0563 3.48843 10.0563C2.67883 10.1152 2.11833 9.40838 2.11833
                8.11257ZM11.8959 7.11126L10.8372 5.46204C10.5881 5.04974 10.2767
                4.63743 10.0276 4.28403C10.9617 2.92932 11.7091 2.22251 12.6432
                2.22251C14.5116 2.22251 16.0062 4.87304 16.0062 8.17147C16.0062
                9.40838 15.5703 10.1152 14.6984 10.1152C13.8265 10.1152 13.5151
                9.58508 11.8959 7.11126ZM9.21797 3.10602C7.84786 1.39791 6.66459
                0.75 5.29448 0.75C2.42972 0.75 0.25 4.34293 0.25 8.11257C0.25
                10.4686 1.43327 11.9411 3.42616 11.9411C4.85854 11.9411 5.85498
                11.2932 7.72331 8.23037C7.72331 8.23037 8.47064 6.93455 9.03114
                6.05105C9.21797 6.34555 9.4048 6.64005 9.59164 6.99346L10.4635
                8.40707C12.145 11.1165 13.0792 12 14.7607 12C16.6913 12 17.75
                10.4686 17.75 8.05366C17.6877 4.04843 15.4457 0.75 12.7678
                0.75C11.3354 0.75 10.2144 1.81021 9.21797 3.10602Z"
                fill="#4B5563"
              />
            </svg>
          {:else if item.type == 'facebook business account'}
            <svg
              class="h-9 w-9 rounded-full border border-gray-400"
              viewBox="-4 -5 25 25"
            >
              <path
                d="M2.11833 8.11257C2.11833 5.40314 3.55071 2.57592 5.23221
                2.57592C6.16637 2.57592 6.9137 3.10602 8.09698 4.69633C6.97598
                6.34555 6.29093 7.34686 6.29093 7.34686C4.79626 9.58508 4.29804
                10.0563 3.48843 10.0563C2.67883 10.1152 2.11833 9.40838 2.11833
                8.11257ZM11.8959 7.11126L10.8372 5.46204C10.5881 5.04974 10.2767
                4.63743 10.0276 4.28403C10.9617 2.92932 11.7091 2.22251 12.6432
                2.22251C14.5116 2.22251 16.0062 4.87304 16.0062 8.17147C16.0062
                9.40838 15.5703 10.1152 14.6984 10.1152C13.8265 10.1152 13.5151
                9.58508 11.8959 7.11126ZM9.21797 3.10602C7.84786 1.39791 6.66459
                0.75 5.29448 0.75C2.42972 0.75 0.25 4.34293 0.25 8.11257C0.25
                10.4686 1.43327 11.9411 3.42616 11.9411C4.85854 11.9411 5.85498
                11.2932 7.72331 8.23037C7.72331 8.23037 8.47064 6.93455 9.03114
                6.05105C9.21797 6.34555 9.4048 6.64005 9.59164 6.99346L10.4635
                8.40707C12.145 11.1165 13.0792 12 14.7607 12C16.6913 12 17.75
                10.4686 17.75 8.05366C17.6877 4.04843 15.4457 0.75 12.7678
                0.75C11.3354 0.75 10.2144 1.81021 9.21797 3.10602Z"
                fill="#4B5563"
              />
            </svg>
          {/if}
        </div>
        <div>
          <p class="text-left text-sm font-medium text-gray-900">
            {item.name}
          </p>
          <p class="text-left text-sm font-light text-gray-900">
            {item.type}
          </p>
        </div>
      </div>
    </div>
  {/each}
</section>

<style lang="scss">
  div {
    position: relative;
    text-align: center;
    margin: 0.2em;
    padding: 0.3em;
  }

  .custom-shadow-item {
    position: absolute;
    top: 0.5rem;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: visible;
    background: grey;
    opacity: 0.5;
    height: 4rem;
    /* margin: 10 10 0 0; */
  }
</style>
