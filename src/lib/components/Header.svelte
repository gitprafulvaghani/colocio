<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { bool_show_menu_mobile, insights_selected } from "$lib/stores/stores";
  import { page } from "$app/stores";

  export const currentUser: string = "";
  export const activeEntity: string = "";

  const dispatch = createEventDispatcher();
  const LOGOUT_REQUESTED = "logout_requested";
  const EVENT_KEYDOWN = "keydown";

  // dropdown menues handling flags
  let bool_dropdown = false;
  let bool_profile_dropdown = false;
  let bool_promotion_dropdown = false;
  let bool_modal_chat = false;

  function modalToggle(action: CustomEvent) {
    // This is optional if you want to use the event.detail.action option
    switch (action) {
      case "open":
        bool_modal_chat = true;
        break;
      case "close":
        bool_modal_chat = false;
        break;
      default:
        bool_modal_chat = !bool_modal_chat;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      dispatch("modalToggle", { action: "close" });
    }
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      // dispatch('modalToggle');
      event.preventDefault();
    }
  }
  function handalDropOpen() {
    console.log("check ============>", $page.url.pathname);

    bool_profile_dropdown = true;
    bool_dropdown = true;
  }
  function handleMouseLeaveButton() {
    setTimeout(() => {
      if (!bool_profile_dropdown) {
        bool_dropdown = false;
      }
    }, 200);
  }

  function handleMouseLeaveDropdown() {
    bool_profile_dropdown = false;
    bool_dropdown = false;
  }

  onMount(() => {
    // window.addEventListener('keydown', handleKeydown);
  });
</script>

<div
  class="sticky top-0 z-10 flex sm:h-16 shrink-0 items-start sm:items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 flex-wrap"
>
  <span class="flex h-16 shrink-0 items-center lg:hidden">
    <img
      class="lg:h-7 sm:h-5 h-5 w-auto"
      src="/colocio.svg"
      alt="Your Company"
    />
  </span>

  <button
    type="button"
    class="-m-2.5 p-2.5 text-gray-500 hidden"
    on:click={() => {
      bool_show_menu_mobile.set(true);
    }}
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </button>

  <div
    class="flex flex-auto justify-end sm:justify-between gap-x-4 self-stretch lg:gap-x-6 flex-wrap"
  >
    {#if $page.url.pathname == "/"}
      <div class="relative flex items-center">
        <button class="lg:hidden block">helloo</button>
        <button
          type="button"
          class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1.5 w-8 h-8 sm:w-auto sm:h-auto whitespace-nowrap rounded-md sm:rounded flex items-center gap-2"
          on:click={() => {
            bool_promotion_dropdown = !bool_promotion_dropdown;
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1V6M6 6V11M6 6H11M6 6L1 6"
              stroke="#0D64E8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="hidden sm:inline-block">Create promotion</span>
        </button>

        <div
          class:hidden={!bool_promotion_dropdown}
          class="absolute right-0 sm:left-0 z-20 mt-2 w-56 top-11 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            <a
              href="/"
              on:click={() => {
                bool_promotion_dropdown = false;
              }}
              class="flex flex-col hover:bg-gray-100 text-gray-500 px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
            >
              <div>Campaign</div>
              <div class="text-xs">Combine paid ad and posts</div>
            </a>
            <a
              href="/automated"
              on:click={() => {
                bool_promotion_dropdown = false;
              }}
              class="flex flex-col hover:bg-gray-100 text-gray-500 px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-1"
            >
              <div>Automated ad</div>
              <div class="text-xs">Custom AI automations and metrics</div>
            </a>
            <a
              href="/promotions"
              on:click={() => {
                bool_promotion_dropdown = false;
              }}
              class="flex flex-col hover:bg-gray-100 text-gray-500 px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
            >
              <div>Manual ad</div>
              <div class="text-xs">Step-by-step AI experience</div>
            </a>
            <a
              href="/"
              on:click={() => {
                bool_promotion_dropdown = false;
              }}
              class="flex flex-col hover:bg-gray-100 text-gray-500 px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
            >
              <div>Create test campaign</div>
            </a>
          </div>
        </div>
      </div>
      <div
        class="hidden sm:flex flex-auto items-center justify-center bg-transparent"
      >
        <!-- Clickable button opens modal -->
        <button
          type="button"
          class="flex w-full justify-center items-center bg-gray-50 rounded-md px-4 py-2 relative"
          on:click={() => {
            dispatch("modalToggle");
          }}
        >
          <span>Ask Colocio ...</span>
          <span
            class="absolute right-20 top-2 flex items-center justify-center gap-2.5"
          >
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.7801 23.1627C17.9767 23.1627 23.0001 18.1393 23.0001 11.9427C23.0001 5.74602 17.9767 0.722656 11.7801 0.722656C5.58343 0.722656 0.560059 5.74602 0.560059 11.9427C0.560059 15.2616 2.00108 18.2439 4.29158 20.2981C4.09101 20.7733 3.7932 21.2638 3.35283 21.7708C2.85019 22.3495 3.01218 23.2258 3.77763 23.2655C5.36627 23.3479 7.25096 23.0027 8.22434 22.5875C9.34168 22.9606 10.5373 23.1627 11.7801 23.1627Z"
                fill="#E4EFFF"
              />
              <path
                d="M12 5C8.13234 5 5 8.13234 5 12C5 15.8677 8.13234 19 12 19C15.8677 19 19 15.8677 19 12C19 8.13234 15.8677 5 12 5ZM16.3366 15.4624C15.8908 15.8908 15.2887 16.0529 14.6112 15.1902L12.579 12.7179C12.249 12.3184 11.6352 12.33 11.3168 12.7353L9.42928 15.1671C8.70555 16.0935 8.08023 15.8734 7.62283 15.3987C6.88751 14.4549 6.44748 13.2796 6.44748 11.9942C6.44748 8.93135 8.93713 6.44169 12 6.44169C15.0629 6.44169 17.5525 8.93135 17.5525 11.9942C17.5525 13.3027 17.0951 14.507 16.3366 15.4566V15.4624Z"
                fill="#0D64E8"
              />
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.91984 4.66666L7.99984 8.78721L12.0798 4.66666L13.3332 5.93521L7.99984 11.3333L2.6665 5.93521L3.91984 4.66666Z"
                fill="#0D64E8"
              />
            </svg>
          </span>
        </button>
      </div>
    {:else if $page.url.pathname == "/insights"}
      <ul
        class="flex flex-wrap text-sm text-center my-2 rounded-lg text-gray-500 border border-gray-200 sm:order-1 order-2"
      >
        <li class="">
          <button
            class:bg-blue-bglight={$insights_selected == "trends"}
            class:text-blue-600={$insights_selected == "trends"}
            class:hover:text-gray-600={$insights_selected != "trends"}
            class:hover:bg-gray-50={$insights_selected != "trends"}
            on:click={() => {
              insights_selected.set("trends");
            }}
            type="button"
            aria-current="page"
            class="inline-block px-3.5 py-3 rounded-l-lg active">Trends</button
          >
        </li>
        <li class="">
          <button
            class:bg-blue-bglight={$insights_selected == "audiences"}
            class:text-blue-600={$insights_selected == "audiences"}
            class:hover:text-gray-600={$insights_selected != "audiences"}
            class:hover:bg-gray-50={$insights_selected != "audiences"}
            on:click={() => {
              insights_selected.set("audiences");
            }}
            type="button"
            class="inline-block px-3.5 py-3 border-l border-r border-gray-200 hover:text-gray-600 hover:bg-gray-50"
            >Audiences</button
          >
        </li>
        <li class="">
          <button
            class:bg-blue-bglight={$insights_selected == "metrics"}
            class:text-blue-600={$insights_selected == "metrics"}
            class:hover:text-gray-600={$insights_selected != "metrics"}
            class:hover:bg-gray-50={$insights_selected != "metrics"}
            on:click={() => {
              insights_selected.set("metrics");
            }}
            type="button"
            class="inline-block px-3.5 py-3 rounded-r-lg"
          >
            Metrics
          </button>
        </li>
      </ul>
    {/if}
    <!--  -->
    <div
      class={$page.url.pathname == "/insights"
        ? "sm:order-2 order-1 flex items-center gap-x-4 lg:gap-x-6"
        : "flex items-center gap-x-4 lg:gap-x-6"}
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
      >
        <span class="sr-only">View notifications</span>
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </button>

      <!-- Separator -->
      <div
        class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
        aria-hidden="true"
      />

      <!-- Profile dropdown -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="relative flex items-center gap-2">
        <button
          on:click={handalDropOpen}
          type="button"
          class="-m-1.5 flex gap-2 items-center p-1.5"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="h-8 w-8 rounded-full bg-gray-50"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <span class="flex gap-4 items-center">
            <span
              class="ml-4 text-sm leading-6 text-gray-900 hidden md:inline-block"
              aria-hidden="true">{"Add data here"}</span
            >
            <div class="flex gap-2 items-center">
              <button
                class="w-[42px] h-[42px] rounded-[10px] flex justify-center items-center bg-[#0024A4]"
                on:mouseenter={() => (bool_dropdown = true)}
                on:mouseleave={handleMouseLeaveButton}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.9993 0.829498C5.83018 0.829498 0.829102 5.83057 0.829102 11.9997C0.829102 14.959 1.97987 17.6495 3.85832 19.6481L2.27076 23.1699H7.05792L7.48847 22.2217C8.86798 22.8313 10.3941 23.1699 11.9993 23.1699C13.8361 23.1699 15.5694 22.7266 17.0979 21.9411L17.6481 23.1699H22.4492L20.615 19.1096C22.2108 17.178 23.1695 14.7008 23.1695 11.9997C23.1695 5.94741 18.3561 1.01935 12.3485 0.834854L12.3461 0.829498L12.3437 0.834706C12.2293 0.831242 12.1145 0.829498 11.9993 0.829498ZM12.3437 0.834706L11.8729 1.86891L3.85832 19.6481C4.87689 20.7319 6.10943 21.6122 7.48847 22.2217L8.5052 19.9824L8.57478 19.8161H16.1452L16.2148 19.9685L17.0979 21.9411C18.4554 21.2435 19.6513 20.276 20.615 19.1096L12.8331 1.88277L12.3485 0.834854C12.3469 0.834804 12.3453 0.834755 12.3437 0.834706ZM14.1134 15.3535H10.5926L12.36 11.4454L14.1134 15.3535Z"
                    fill="white"
                  />
                </svg>
              </button>
              <svg
                class="h-5 w-5 text-black hidden sm:inline-block"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </span>
        </button>

        <div
          class:opacity-0={!bool_dropdown}
          class:scale-95={!bool_dropdown}
          class:opacity-100={bool_dropdown}
          class:scale-100={bool_dropdown}
          on:mouseenter={() => (bool_profile_dropdown = true)}
          on:mouseleave={handleMouseLeaveDropdown}
          class="absolute transform transition ease-out duration-100 right-0 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabindex="-1"
        >
          <a
            class="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50 active:bg-gray-50"
            role="menuitem"
            tabindex="-1"
            id="user-menu-item-0"
          >
            Your profile
          </a>

          <a
            on:click={() => {
              dispatch(LOGOUT_REQUESTED);
            }}
            class="block cursor-pointer px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50 active:bg-gray-50"
            role="menuitem"
            tabindex="-1"
            id="sign-out-option"
          >
            Sign out
          </a>
        </div>

        <!--<button
          class="bg-slate-dark text-custom-gray-200 hover:text-slate-light p-2 rounded"
          on:click={() => {
            dispatch(LOGOUT_REQUESTED);
          }}
        >
          Sign out
        </button>-->
      </div>
    </div>
  </div>
</div>
