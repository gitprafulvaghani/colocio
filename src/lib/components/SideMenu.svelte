<script lang="ts">
  import { page } from "$app/stores";
  import { bool_show_menu_mobile } from "$lib/stores/stores";
  import Logo from "$lib/components/Logo.svelte";
</script>

<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
<div
  class:hidden={!$bool_show_menu_mobile}
  class="relative lg:hidden transition-opacity duration-300 ease-linear "
  role="dialog"
  aria-modal="true"
>
  <div class="fixed inset-0 bg-gray-900/80 z-[1] hidden" />
  <div class="fixed inset-0 z-[1] hidden">
    <div class="relative mr-16 flex w-full max-w-xs flex-1">
      <div class="absolute left-full top-[60px] flex w-16 justify-center pt-5">
        <button
          type="button"
          class="-m-2.5 p-2.5"
          on:click={() => {
            bool_show_menu_mobile.set(false);
          }}
        >
          <span class="sr-only">Close sidebar</span>
          <svg
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"
      >
        <button
          type="button"
          class="flex h-16 shrink-0 items-center"
          on:click={() => {
            bool_show_menu_mobile.set(true);
          }}
        >
          <img class="h-7 w-auto" src="/colocio.svg" alt="Your Company" />
        </button>
        <nav
          class="flex flex-1 flex-col"
          class:hidden={!$bool_show_menu_mobile}
        >
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li>
                  <a
                    href="/"
                    class:text-indigo-600={$page.url.pathname == "/"}
                    class:bg-gray-50={$page.url.pathname == "/"}
                    class="hover:bg-gray-50 hover:text-indigo-600 text-gray-700 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      class="stroke-path"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.75037 1.94474C8.482 1.73601 8.34781 1.63164 8.19964 1.59152C8.0689 1.55612 7.9311 1.55612 7.80036 1.59152C7.65219 1.63164 7.518 1.73601 7.24963 1.94474L2.0687 5.97435C1.72238 6.24371 1.54922 6.37839 1.42447 6.54706C1.31396 6.69647 1.23164 6.86478 1.18155 7.04374C1.125 7.24576 1.125 7.46513 1.125 7.90388V13.4306C1.125 14.2862 1.125 14.714 1.29152 15.0408C1.43799 15.3283 1.67171 15.562 1.95918 15.7085C2.28599 15.875 2.71381 15.875 3.56944 15.875H5.09722C5.31113 15.875 5.41809 15.875 5.49979 15.8334C5.57166 15.7968 5.63009 15.7383 5.6667 15.6665C5.70833 15.5848 5.70833 15.4778 5.70833 15.2639V10.2222C5.70833 9.79441 5.70833 9.5805 5.79159 9.4171C5.86483 9.27336 5.98169 9.1565 6.12542 9.08327C6.28883 9.00001 6.50274 9.00001 6.93056 9.00001H9.06944C9.49726 9.00001 9.71117 9.00001 9.87458 9.08327C10.0183 9.1565 10.1352 9.27336 10.2084 9.4171C10.2917 9.5805 10.2917 9.79441 10.2917 10.2222V15.2639C10.2917 15.4778 10.2917 15.5848 10.3333 15.6665C10.3699 15.7383 10.4283 15.7968 10.5002 15.8334C10.5819 15.875 10.6889 15.875 10.9028 15.875H12.4306C13.2862 15.875 13.714 15.875 14.0408 15.7085C14.3283 15.562 14.562 15.3283 14.7085 15.0408C14.875 14.714 14.875 14.2862 14.875 13.4306V7.90388C14.875 7.46513 14.875 7.24576 14.8185 7.04374C14.7684 6.86478 14.686 6.69647 14.5755 6.54706C14.4508 6.37839 14.2776 6.24371 13.9313 5.97435L8.75037 1.94474Z"
                        stroke="#0D64E8"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    class:text-indigo-600={$page.url.pathname == "/schedule"}
                    class:bg-gray-50={$page.url.pathname == "/schedule"}
                    href="/schedule"
                    class="menu-link text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5557 1.75H11.8612V0.361115H10.4723V1.75H3.52789V0.361115H2.139V1.75H1.44455C0.680664 1.75 0.0556641 2.375 0.0556641 3.13889V14.25C0.0556641 15.0139 0.680664 15.6389 1.44455 15.6389H12.5557C13.3196 15.6389 13.9446 15.0139 13.9446 14.25V3.13889C13.9446 2.375 13.3196 1.75 12.5557 1.75ZM12.5557 14.25H1.44455V6.61111H12.5557V14.25ZM12.5557 5.22223H1.44455V3.13889H12.5557V5.22223Z"
                      />
                    </svg>
                    Schedule
                  </a>
                </li>
                <li>
                  <!--
                                        class:text-indigo-600={$page.url
                                            .pathname == '/insights'}
                                        class:bg-gray-50={$page.url
                                            .pathname == '/insights'}
                                        class="menu-link text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                    -->
                  <!-- <a href="/insights">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5.49967 12.1667H3.83301V6.33333H5.49967V12.1667ZM8.83301 12.1667H7.16634V3.83333H8.83301V12.1667ZM12.1663 12.1667H10.4997V8.83333H12.1663V12.1667ZM14.2497 13.9167H1.74967V2.16667H14.2497V13.9167ZM14.2497 0.5H1.74967C0.833008 0.5 0.0830078 1.25 0.0830078 2.16667V13.8333C0.0830078 14.75 0.833008 15.5 1.74967 15.5H14.2497C15.1663 15.5 15.9163 14.75 15.9163 13.8333V2.16667C15.9163 1.25 15.1663 0.5 14.2497 0.5Z"
                                            />
                                        </svg>
                                        Insights
                                    </a> -->
                </li>
                <li>
                  <a
                    href="/settings"
                    class:text-indigo-600={$page.url.pathname == "/settings"}
                    class:bg-gray-50={$page.url.pathname == "/settings"}
                    class="menu-link group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <svg
                      class="stroke-path"
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.45275 1.58223C6.79515 1.58223 6.21133 2.00303 6.00337 2.62688L5.68633 3.57802C5.6526 3.67922 5.57778 3.7611 5.48184 3.80772C5.23189 3.92916 4.99202 4.06813 4.76383 4.22301C4.67544 4.28301 4.56696 4.30696 4.46229 4.28555L3.47898 4.08433C2.83473 3.95249 2.17839 4.2477 1.84959 4.8172L1.30236 5.76503C0.973557 6.33453 1.04607 7.05054 1.48237 7.54256L2.14859 8.29387C2.2193 8.3736 2.25281 8.4792 2.24527 8.5855C2.23555 8.7224 2.23061 8.86063 2.23061 9C2.23061 9.13938 2.23555 9.2776 2.24527 9.4145C2.25281 9.52079 2.2193 9.62639 2.14859 9.70613L1.48236 10.4574C1.04607 10.9495 0.973557 11.6655 1.30236 12.235L1.84959 13.1828C2.17839 13.7523 2.83472 14.0475 3.47898 13.9157L4.46228 13.7145C4.56695 13.693 4.67543 13.717 4.76383 13.777C4.99201 13.9319 5.23188 14.0708 5.48184 14.1923C5.57779 14.2389 5.6526 14.3208 5.68633 14.422L6.00337 15.3731C6.21133 15.997 6.79515 16.4178 7.45275 16.4178H8.54722C9.20482 16.4178 9.78864 15.997 9.9966 15.3731L10.3136 14.422C10.3474 14.3208 10.4222 14.2389 10.5181 14.1923C10.7681 14.0708 11.0079 13.9319 11.2361 13.777C11.3245 13.717 11.433 13.693 11.5377 13.7145L12.5209 13.9157C13.1652 14.0475 13.8215 13.7523 14.1503 13.1828L14.6976 12.235C15.0264 11.6655 14.9538 10.9495 14.5175 10.4574L13.8514 9.7062C13.7807 9.62646 13.7472 9.52086 13.7547 9.41456C13.7644 9.27764 13.7694 9.1394 13.7694 9C13.7694 8.8606 13.7644 8.72236 13.7547 8.58544C13.7471 8.47914 13.7807 8.37353 13.8514 8.2938L14.5175 7.54255C14.9538 7.05053 15.0264 6.33453 14.6975 5.76503L14.1503 4.81719C13.8215 4.24769 13.1652 3.95248 12.5209 4.08432L11.5377 4.28553C11.433 4.30695 11.3245 4.283 11.2361 4.223C11.0079 4.06812 10.7681 3.92916 10.5181 3.80772C10.4222 3.7611 10.3474 3.67922 10.3136 3.57802L9.9966 2.62688C9.78864 2.00303 9.20482 1.58223 8.54722 1.58223H7.45275Z"
                        stroke-width="2"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.99999 11.2917C9.26564 11.2917 10.2917 10.2657 10.2917 9C10.2917 7.73435 9.26564 6.70834 7.99999 6.70834C6.73433 6.70834 5.70832 7.73435 5.70832 9C5.70832 10.2657 6.73433 11.2917 7.99999 11.2917Z"
                        stroke-width="2"
                      />
                    </svg>

                    Settings
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</div>

<!-- Static sidebar for desktop -->
<div
  class="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex xl:w-[280px] w-[240px] lg:flex-col"
>
  <div
    class="flex grow flex-col gap-y-4 overflow-y-auto border-r border-gray-200 bg-white px-[25px] pb-4"
  >
    <!-- LOGO -->
    <div class="flex h-20 shrink-0 items-center justify-center">
      <Logo className="h-7 w-[184px] fill-blue-primary filter-none" />
    </div>

    <!-- MAIN NAVIGATION -->
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="space-y-[16px]">
            <li>
              <a
                href="/"
                class={`menu-link  ${
                  $page.url.pathname == "/"
                    ? "!text-[#0D64E8] hover:text-[#0D64E8] bg-[#F4F9FF] !font-medium"
                    : ""
                } hover:text-[#0D64E8] text-[#6B7280] group flex items-center gap-x-3 rounded-md p-[10px_15px] h-[40px] text-sm leading-6 font-normal`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  class={`${
                    $page.url.pathname == "/" ? "active-menu" : ""
                  } stroke-path`}
                >
                  <path
                    d="M8.75037 1.94471C8.482 1.73598 8.34781 1.63161 8.19964 1.59149C8.0689 1.55609 7.9311 1.55609 7.80036 1.59149C7.65219 1.63161 7.518 1.73598 7.24963 1.94471L2.0687 5.97432C1.72238 6.24368 1.54922 6.37836 1.42447 6.54703C1.31396 6.69644 1.23164 6.86475 1.18155 7.04371C1.125 7.24573 1.125 7.4651 1.125 7.90385V13.4305C1.125 14.2862 1.125 14.714 1.29152 15.0408C1.43799 15.3283 1.67171 15.562 1.95918 15.7085C2.28599 15.875 2.71381 15.875 3.56944 15.875H5.09722C5.31113 15.875 5.41809 15.875 5.49979 15.8333C5.57166 15.7967 5.63009 15.7383 5.6667 15.6664C5.70833 15.5847 5.70833 15.4778 5.70833 15.2639V10.2222C5.70833 9.79438 5.70833 9.58047 5.79159 9.41707C5.86483 9.27333 5.98169 9.15647 6.12542 9.08323C6.28883 8.99998 6.50274 8.99998 6.93056 8.99998H9.06944C9.49726 8.99998 9.71117 8.99998 9.87458 9.08323C10.0183 9.15647 10.1352 9.27333 10.2084 9.41707C10.2917 9.58047 10.2917 9.79438 10.2917 10.2222V15.2639C10.2917 15.4778 10.2917 15.5847 10.3333 15.6664C10.3699 15.7383 10.4283 15.7967 10.5002 15.8333C10.5819 15.875 10.6889 15.875 10.9028 15.875H12.4306C13.2862 15.875 13.714 15.875 14.0408 15.7085C14.3283 15.562 14.562 15.3283 14.7085 15.0408C14.875 14.714 14.875 14.2862 14.875 13.4305V7.90385C14.875 7.4651 14.875 7.24573 14.8185 7.04371C14.7684 6.86475 14.686 6.69644 14.5755 6.54703C14.4508 6.37836 14.2776 6.24368 13.9313 5.97432L8.75037 1.94471Z"
                    stroke={`${
                      $page.url.pathname == "/" ? "#0D64E8" : "#6B7280"
                    }`}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/schedule"
                class={`menu-link ${
                  $page.url.pathname == "/schedule"
                    ? "!text-[#0D64E8] hover:text-[#0D64E8] bg-[#F4F9FF] !font-medium"
                    : ""
                } text-[#6B7280] hover:text-[#0D64E8] hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-[10px_15px] h-[40px] text-sm leading-6 font-normal`}
              >
                <!--<svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  xmlns="http://www.w3.org/2000/svg"
                  class={`${
                    $page.url.pathname == "/schedule" ? "active-menu" : ""
                  } stroke-path`}
                >
                  <path
                    class={`${
                      $page.url.pathname == "/schedule"
                        ? "fill-[#0D64E8]"
                        : "fill-[#6B7280]"
                    }`}
                    d="M12.5557 1.75H11.8612V0.361115H10.4723V1.75H3.52789V0.361115H2.139V1.75H1.44455C0.680664 1.75 0.0556641 2.375 0.0556641 3.13889V14.25C0.0556641 15.0139 0.680664 15.6389 1.44455 15.6389H12.5557C13.3196 15.6389 13.9446 15.0139 13.9446 14.25V3.13889C13.9446 2.375 13.3196 1.75 12.5557 1.75ZM12.5557 14.25H1.44455V6.61111H12.5557V14.25ZM12.5557 5.22223H1.44455V3.13889H12.5557V5.22223Z"
                  />
                </svg>-->
                <svg
                  class={`${
                    $page.url.pathname == "/schedule" ? "!fill-[#0D64E8]" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M14.5547 2.75022H13.8602V1.36133H12.4714V2.75022H5.52691V1.36133H4.13802V2.75022H3.44358C2.67969 2.75022 2.05469 3.37522 2.05469 4.13911V15.2502C2.05469 16.0141 2.67969 16.6391 3.44358 16.6391H14.5547C15.3186 16.6391 15.9436 16.0141 15.9436 15.2502V4.13911C15.9436 3.37522 15.3186 2.75022 14.5547 2.75022ZM14.5547 15.2502H3.44358V7.61133H14.5547V15.2502ZM14.5547 6.22244H3.44358V4.13911H14.5547V6.22244Z"
                  />
                </svg>
                Schedule
              </a>
            </li>
            <li>
              <a
                href="/insights"
                class={`menu-link ${
                  $page.url.pathname == "/insights"
                    ? "!text-[#0D64E8] hover:text-[#0D64E8] bg-[#F4F9FF] !font-medium"
                    : ""
                } text-[#6B7280] hover:text-[#0D64E8] hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-[10px_15px] h-[40px] text-sm leading-6 font-normal`}
              >
                <svg
                  class={`${
                    $page.url.pathname == "/insights" ? "!fill-[#0D64E8]" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class={`${
                      $page.url.pathname == "/insights"
                        ? "fill-[#0D64E8]"
                        : "fill-[#6B7280]"
                    }`}
                    d="M5.49967 12.1667H3.83301V6.33333H5.49967V12.1667ZM8.83301 12.1667H7.16634V3.83333H8.83301V12.1667ZM12.1663 12.1667H10.4997V8.83333H12.1663V12.1667ZM14.2497 13.9167H1.74967V2.16667H14.2497V13.9167ZM14.2497 0.5H1.74967C0.833008 0.5 0.0830078 1.25 0.0830078 2.16667V13.8333C0.0830078 14.75 0.833008 15.5 1.74967 15.5H14.2497C15.1663 15.5 15.9163 14.75 15.9163 13.8333V2.16667C15.9163 1.25 15.1663 0.5 14.2497 0.5Z"
                  />
                </svg>
                Insights
              </a>
            </li>
            <li>
              <a
                href="/settings/"
                class={`menu-link group ${
                  $page.url.pathname == "/settings"
                    ? "!text-[#0D64E8] hover:text-[#0D64E8] bg-[#F4F9FF] !font-medium"
                    : ""
                } flex items-center gap-x-3 rounded-md p-[10px_15px] h-[40px] text-sm font-normal leading-6 text-[#6B7280] hover:bg-gray-50 hover:text-[#0D64E8]`}
              >
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class={`${
                    $page.url.pathname == "/settings" ? "active-menu" : ""
                  } stroke-path`}
                >
                  <path
                    d="M7.45275 1.58223C6.79515 1.58223 6.21133 2.00303 6.00337 2.62688L5.68633 3.57802C5.6526 3.67922 5.57778 3.7611 5.48184 3.80772C5.23189 3.92916 4.99202 4.06813 4.76383 4.22301C4.67544 4.28301 4.56696 4.30696 4.46229 4.28555L3.47898 4.08433C2.83473 3.95249 2.17839 4.2477 1.84959 4.8172L1.30236 5.76503C0.973557 6.33453 1.04607 7.05054 1.48237 7.54256L2.14859 8.29387C2.2193 8.3736 2.25281 8.4792 2.24527 8.5855C2.23555 8.7224 2.23061 8.86063 2.23061 9C2.23061 9.13938 2.23555 9.2776 2.24527 9.4145C2.25281 9.52079 2.2193 9.62639 2.14859 9.70613L1.48236 10.4574C1.04607 10.9495 0.973557 11.6655 1.30236 12.235L1.84959 13.1828C2.17839 13.7523 2.83472 14.0475 3.47898 13.9157L4.46228 13.7145C4.56695 13.693 4.67543 13.717 4.76383 13.777C4.99201 13.9319 5.23188 14.0708 5.48184 14.1923C5.57779 14.2389 5.6526 14.3208 5.68633 14.422L6.00337 15.3731C6.21133 15.997 6.79515 16.4178 7.45275 16.4178H8.54722C9.20482 16.4178 9.78864 15.997 9.9966 15.3731L10.3136 14.422C10.3474 14.3208 10.4222 14.2389 10.5181 14.1923C10.7681 14.0708 11.0079 13.9319 11.2361 13.777C11.3245 13.717 11.433 13.693 11.5377 13.7145L12.5209 13.9157C13.1652 14.0475 13.8215 13.7523 14.1503 13.1828L14.6976 12.235C15.0264 11.6655 14.9538 10.9495 14.5175 10.4574L13.8514 9.7062C13.7807 9.62646 13.7472 9.52086 13.7547 9.41456C13.7644 9.27764 13.7694 9.1394 13.7694 9C13.7694 8.8606 13.7644 8.72236 13.7547 8.58544C13.7471 8.47914 13.7807 8.37353 13.8514 8.2938L14.5175 7.54255C14.9538 7.05053 15.0264 6.33453 14.6975 5.76503L14.1503 4.81719C13.8215 4.24769 13.1652 3.95248 12.5209 4.08432L11.5377 4.28553C11.433 4.30695 11.3245 4.283 11.2361 4.223C11.0079 4.06812 10.7681 3.92916 10.5181 3.80772C10.4222 3.7611 10.3474 3.67922 10.3136 3.57802L9.9966 2.62688C9.78864 2.00303 9.20482 1.58223 8.54722 1.58223H7.45275Z"
                    stroke-width="2"
                    class={`${
                      $page.url.pathname == "/settings"
                        ? "text-[#0D64E8]"
                        : "text-[#6B7280]"
                    }`}
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.99999 11.2917C9.26564 11.2917 10.2917 10.2657 10.2917 9C10.2917 7.73435 9.26564 6.70834 7.99999 6.70834C6.73433 6.70834 5.70832 7.73435 5.70832 9C5.70832 10.2657 6.73433 11.2917 7.99999 11.2917Z"
                    stroke-width="2"
                    class={`${
                      $page.url.pathname == "/settings"
                        ? "text-[#0D64E8]"
                        : "text-[#6B7280]"
                    }`}
                  />
                </svg>

                Settings
              </a>
            </li>
          </ul>
        </li>
        <!-- <li class="mt-auto">
                    <div
                        class="text-sm max-w-sm text-center h-full flex flex-col gap-3 p-4 bg-white border border-gray-200 rounded-md shadow"
                    >
                        <div
                            class="w-full bg-gray-200 rounded-full h-1.5"
                        >
                            <div
                                class="bg-blue-600 h-1.5 rounded-full"
                                style="width: 45%"
                            ></div>
                        </div>
                        <div>
                            <div class="text-indigo-600 font-bold">
                                30 of 40
                            </div>
                            <div class="">AI generations left</div>
                        </div>
                        <hr class="h-px bg-gray-200 border-0" />
                        <a href="/"> Upgrade package </a>
                    </div>
                </li> -->
      </ul>
    </nav>
  </div>
</div>

<style lang="scss">
  .menu-link svg:not(.stroke-path) {
    fill: #6b7280;
  }

  .menu-link:hover svg:not(.stroke-path) {
    fill: #0D64E8;
  }

  .menu-link .stroke-path path {
    stroke: #6b7280;
  }

  .menu-link:hover .stroke-path path {
    stroke: #0D64E8;
  }
  .active-menu path {
    stroke: #0D64E8 !important;
  }
  //  .menu-link:hover
</style>
