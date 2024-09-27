<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { facebookLogin } from '$lib/services/facebook/Login';

    import {
        socialSignedIn,
        facebookResponse,
    } from '$lib/stores/onboarding';
    import type { ActionResult } from '@sveltejs/kit';

    let company_name = 'Amazing Company';
    let count_selected = 0;
    let max_selection = 4;

    $: data = $page.data;
</script>

<div class="flex flex-col gap-4">
    <h1 class="font-medium text-blue-primary text-2xl text-center">
        Accounts
    </h1>
    <hr class="h-px bg-gray-200 border-0 my-4" />
    <h2 class="text-center text-gray-600 text-sm sm:text-base">
        Select up to 4 assets/accounts to add to your <b>{company_name}</b
        > profile.
    </h2>
    <section
        class="bg-blue-bglight text-blue-primary flex flex-col w-[200px] sm:w-[400px] p-3 rounded-md m-auto items-center"
    >
        <p class="font-bold text-base sm:text-lg">
            {count_selected}/{max_selection} selected
        </p>
        <p class="text-xs sm:text-sm">
            <a href="/" class="underline">Upgrade</a> to add more
        </p>
    </section>

    <!-- Meta Business accounts -->
    <div class="mt-4 flex flex-col gap-2">
        <h3 class="flex items-center gap-1">
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3.11833 11.1126C3.11833 8.40314 4.55071 5.57592 6.23221 5.57592C7.16637 5.57592 7.9137 6.10602 9.09698 7.69633C7.97598 9.34555 7.29093 10.3469 7.29093 10.3469C5.79626 12.5851 5.29804 13.0563 4.48843 13.0563C3.67883 13.1152 3.11833 12.4084 3.11833 11.1126ZM12.8959 10.1113L11.8372 8.46204C11.5881 8.04974 11.2767 7.63743 11.0276 7.28403C11.9617 5.92932 12.7091 5.22251 13.6432 5.22251C15.5116 5.22251 17.0062 7.87304 17.0062 11.1715C17.0062 12.4084 16.5703 13.1152 15.6984 13.1152C14.8265 13.1152 14.5151 12.5851 12.8959 10.1113ZM10.218 6.10602C8.84786 4.39791 7.66459 3.75 6.29448 3.75C3.42972 3.75 1.25 7.34293 1.25 11.1126C1.25 13.4686 2.43327 14.9411 4.42616 14.9411C5.85854 14.9411 6.85498 14.2932 8.72331 11.2304C8.72331 11.2304 9.47064 9.93456 10.0311 9.05105C10.218 9.34555 10.4048 9.64005 10.5916 9.99346L11.4635 11.4071C13.145 14.1165 14.0792 15 15.7607 15C17.6913 15 18.75 13.4686 18.75 11.0537C18.6877 7.04843 16.4457 3.75 13.7678 3.75C12.3354 3.75 11.2144 4.81021 10.218 6.10602Z"
                    fill="#4B5563"
                />
            </svg>
            Meta Business accounts
        </h3>
        <section
            class="border border-gray-300 rounded-lg p-8 flex flex-col gap-3"
        >
            <div class="flex justify-between">
                <div class="flex items-center gap-3">
                    <svg
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="42"
                            height="42"
                            rx="21"
                            fill="#111827"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.8963 10.125C14.9475 10.125 10.125 14.9475 10.125 20.8963C10.125 23.7499 11.2347 26.3443 13.046 28.2716L11.5152 31.6676H16.1314L16.5465 30.7532C17.8768 31.3411 19.3484 31.6676 20.8963 31.6676C22.6675 31.6676 24.3388 31.24 25.8128 30.4826L26.3433 31.6676H30.973L29.2043 27.7522C30.743 25.8897 31.6676 23.5009 31.6676 20.8963C31.6676 15.0601 27.026 10.3081 21.233 10.1302L21.2306 10.125L21.2284 10.13C21.1181 10.1267 21.0074 10.125 20.8963 10.125ZM21.2284 10.13L20.7744 11.1273L13.046 28.2716C14.0282 29.3166 15.2167 30.1655 16.5465 30.7532L17.527 28.5939L17.594 28.4335H24.8941L24.9612 28.5805L25.8128 30.4826C27.1217 29.8099 28.275 28.877 29.2043 27.7522L21.7003 11.1407L21.233 10.1302L21.2284 10.13ZM22.9349 24.1303H19.5398L21.2441 20.3617L22.9349 24.1303Z"
                            fill="white"
                        />
                    </svg>
                    <span
                        class="text-base sm:text-lg font-bold text-font_dark"
                        >{company_name} Inc.</span
                    >
                </div>
                <button
                    class="bg-transparent border text-sm sm:text-base text-gray-600 hover:bg-gray-50 border-gray-300 px-3.5 py-2.5 rounded-md"
                    >Remove</button
                >
            </div>
            <hr class="h-px bg-gray-200 border-0" />
            <div class="text-base sm:text-lg font-bold text-font_dark">
                Meta Business Assets
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center gap-1">
                    <svg
                        width="48"
                        height="42"
                        viewBox="0 0 48 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="42"
                            height="42"
                            rx="21"
                            fill="#0024A4"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.8963 10.125C14.9475 10.125 10.125 14.9475 10.125 20.8963C10.125 23.7499 11.2347 26.3443 13.046 28.2716L11.5152 31.6676H16.1314L16.5465 30.7532C17.8768 31.3411 19.3484 31.6676 20.8963 31.6676C22.6675 31.6676 24.3388 31.24 25.8128 30.4826L26.3433 31.6676H30.973L29.2043 27.7522C30.743 25.8897 31.6676 23.5009 31.6676 20.8963C31.6676 15.0601 27.026 10.3081 21.233 10.1302L21.2306 10.125L21.2284 10.13C21.1181 10.1267 21.0074 10.125 20.8963 10.125ZM21.2284 10.13L20.7744 11.1273L13.046 28.2716C14.0282 29.3166 15.2167 30.1655 16.5465 30.7532L17.527 28.5939L17.594 28.4335H24.8941L24.9612 28.5805L25.8128 30.4826C27.1217 29.8099 28.275 28.877 29.2043 27.7522L21.7003 11.1407L21.233 10.1302L21.2284 10.13ZM22.9349 24.1303H19.5398L21.2441 20.3617L22.9349 24.1303Z"
                            fill="white"
                        />
                        <rect
                            x="28.5"
                            y="22.5"
                            width="19"
                            height="19"
                            rx="9.5"
                            fill="white"
                        />
                        <rect
                            x="28.5"
                            y="22.5"
                            width="19"
                            height="19"
                            rx="9.5"
                            stroke="#E5E7EB"
                        />
                        <path
                            d="M41 30.2H38.9905V29C38.9905 28.3808 39.0384 27.9908 39.8815 27.9908H40.9464V26.0828C40.4282 26.0264 39.9072 25.9988 39.3856 26C37.839 26 36.7102 26.9942 36.7102 28.8194V30.2H35V32.6L36.7102 32.5994V38H38.9905V32.5982L40.7383 32.5976L41 30.2Z"
                            fill="#111827"
                        />
                    </svg>
                    <div class="flex flex-col">
                        <p
                            class="text-sm sm:text-base font-bold text-font_dark"
                        >
                            {company_name}
                        </p>
                        <p class="text-sm sm:text-base text-gray-400">
                            Facebook page
                        </p>
                    </div>
                </div>
                <div>
                    <label
                        class="relative inline-flex items-center me-5 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            value=""
                            class="sr-only peer"
                            checked
                        />
                        <div
                            class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green_accent"
                        ></div>
                    </label>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center gap-1">
                    <svg
                        width="48"
                        height="42"
                        viewBox="0 0 48 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="42"
                            height="42"
                            rx="21"
                            fill="#0024A4"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.8963 10.125C14.9475 10.125 10.125 14.9475 10.125 20.8963C10.125 23.7499 11.2347 26.3443 13.046 28.2716L11.5152 31.6676H16.1314L16.5465 30.7532C17.8768 31.3411 19.3484 31.6676 20.8963 31.6676C22.6675 31.6676 24.3388 31.24 25.8128 30.4826L26.3433 31.6676H30.973L29.2043 27.7522C30.743 25.8897 31.6676 23.5009 31.6676 20.8963C31.6676 15.0601 27.026 10.3081 21.233 10.1302L21.2306 10.125L21.2284 10.13C21.1181 10.1267 21.0074 10.125 20.8963 10.125ZM21.2284 10.13L20.7744 11.1273L13.046 28.2716C14.0282 29.3166 15.2167 30.1655 16.5465 30.7532L17.527 28.5939L17.594 28.4335H24.8941L24.9612 28.5805L25.8128 30.4826C27.1217 29.8099 28.275 28.877 29.2043 27.7522L21.7003 11.1407L21.233 10.1302L21.2284 10.13ZM22.9349 24.1303H19.5398L21.2441 20.3617L22.9349 24.1303Z"
                            fill="white"
                        />
                        <rect
                            x="28.5"
                            y="22.5"
                            width="19"
                            height="19"
                            rx="9.5"
                            fill="white"
                        />
                        <rect
                            x="28.5"
                            y="22.5"
                            width="19"
                            height="19"
                            rx="9.5"
                            stroke="#E5E7EB"
                        />
                        <path
                            d="M35.3333 26C33.4953 26 32 27.4953 32 29.3333V34.6667C32 36.5047 33.4953 38 35.3333 38H40.6667C42.5047 38 44 36.5047 44 34.6667V29.3333C44 27.4953 42.5047 26 40.6667 26H35.3333ZM35.3333 27.3333H40.6667C41.7693 27.3333 42.6667 28.2307 42.6667 29.3333V34.6667C42.6667 35.7693 41.7693 36.6667 40.6667 36.6667H35.3333C34.2307 36.6667 33.3333 35.7693 33.3333 34.6667V29.3333C33.3333 28.2307 34.2307 27.3333 35.3333 27.3333ZM41.3333 28C41.1565 28 40.987 28.0702 40.8619 28.1953C40.7369 28.3203 40.6667 28.4899 40.6667 28.6667C40.6667 28.8435 40.7369 29.013 40.8619 29.1381C40.987 29.2631 41.1565 29.3333 41.3333 29.3333C41.5101 29.3333 41.6797 29.2631 41.8047 29.1381C41.9298 29.013 42 28.8435 42 28.6667C42 28.4899 41.9298 28.3203 41.8047 28.1953C41.6797 28.0702 41.5101 28 41.3333 28ZM38 28.6667C36.162 28.6667 34.6667 30.162 34.6667 32C34.6667 33.838 36.162 35.3333 38 35.3333C39.838 35.3333 41.3333 33.838 41.3333 32C41.3333 30.162 39.838 28.6667 38 28.6667ZM38 30C39.1027 30 40 30.8973 40 32C40 33.1027 39.1027 34 38 34C36.8973 34 36 33.1027 36 32C36 30.8973 36.8973 30 38 30Z"
                            fill="#111827"
                        />
                    </svg>
                    <div class="flex flex-col">
                        <p
                            class="text-sm sm:text-base font-bold text-font_dark"
                        >
                            {company_name}
                        </p>
                        <p class="text-sm sm:text-base text-gray-400">
                            Instagram account
                        </p>
                    </div>
                </div>
                <div>
                    <label
                        class="relative inline-flex items-center me-5 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            value=""
                            class="sr-only peer"
                            checked
                        />
                        <div
                            class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green_accent"
                        ></div>
                    </label>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center gap-1">
                    <svg
                        width="48"
                        height="42"
                        viewBox="0 0 48 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="42"
                            height="42"
                            rx="21"
                            fill="#0024A4"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.8963 10.125C14.9475 10.125 10.125 14.9475 10.125 20.8963C10.125 23.7499 11.2347 26.3443 13.046 28.2716L11.5152 31.6676H16.1314L16.5465 30.7532C17.8768 31.3411 19.3484 31.6676 20.8963 31.6676C22.6675 31.6676 24.3388 31.24 25.8128 30.4826L26.3433 31.6676H30.973L29.2043 27.7522C30.743 25.8897 31.6676 23.5009 31.6676 20.8963C31.6676 15.0601 27.026 10.3081 21.233 10.1302L21.2306 10.125L21.2284 10.13C21.1181 10.1267 21.0074 10.125 20.8963 10.125ZM21.2284 10.13L20.7744 11.1273L13.046 28.2716C14.0282 29.3166 15.2167 30.1655 16.5465 30.7532L17.527 28.5939L17.594 28.4335H24.8941L24.9612 28.5805L25.8128 30.4826C27.1217 29.8099 28.275 28.877 29.2043 27.7522L21.7003 11.1407L21.233 10.1302L21.2284 10.13ZM22.9349 24.1303H19.5398L21.2441 20.3617L22.9349 24.1303Z"
                            fill="white"
                        />
                        <rect
                            x="28.5"
                            y="22.5"
                            width="19"
                            height="19"
                            rx="9.5"
                            fill="white"
                        />
                        <rect
                            x="28.5"
                            y="22.5"
                            width="19"
                            height="19"
                            rx="9.5"
                            stroke="#E5E7EB"
                        />
                        <g clip-path="url(#clip0_2793_39344)">
                            <path
                                d="M40.8461 31.5618C40.7944 31.537 40.7419 31.5132 40.6887 31.4903C40.5961 29.7836 39.6635 28.8066 38.0976 28.7966C38.0905 28.7965 38.0835 28.7965 38.0764 28.7965C37.1398 28.7965 36.3608 29.1963 35.8814 29.9238L36.7426 30.5146C37.1007 29.9711 37.6628 29.8553 38.0768 29.8553C38.0816 29.8553 38.0864 29.8553 38.0911 29.8553C38.6067 29.8586 38.9957 30.0085 39.2476 30.3009C39.4308 30.5137 39.5534 30.8078 39.6141 31.179C39.1569 31.1013 38.6626 31.0774 38.1341 31.1077C36.6453 31.1935 35.6882 32.0617 35.7525 33.2682C35.7851 33.8802 36.09 34.4067 36.6109 34.7507C37.0514 35.0414 37.6187 35.1836 38.2083 35.1514C38.9869 35.1088 39.5977 34.8117 40.0238 34.2685C40.3474 33.856 40.5521 33.3214 40.6425 32.6479C41.0136 32.8718 41.2886 33.1665 41.4404 33.5208C41.6987 34.1229 41.7138 35.1125 40.9063 35.9192C40.1989 36.626 39.3485 36.9318 38.0633 36.9412C36.6378 36.9306 35.5596 36.4734 34.8586 35.5823C34.2022 34.7479 33.863 33.5426 33.8503 32C33.863 30.4574 34.2022 29.2521 34.8586 28.4177C35.5596 27.5266 36.6377 27.0694 38.0633 27.0588C39.4992 27.0695 40.5962 27.5288 41.324 28.4242C41.6809 28.8633 41.9499 29.4156 42.1273 30.0594L43.1365 29.7901C42.9215 28.9976 42.5832 28.3147 42.1228 27.7484C41.1897 26.6004 39.8251 26.0122 38.0668 26H38.0598C36.3051 26.0122 34.9558 26.6026 34.0493 27.755C33.2426 28.7804 32.8265 30.2072 32.8125 31.9958L32.8125 32L32.8125 32.0042C32.8265 33.7927 33.2426 35.2196 34.0493 36.2451C34.9558 37.3974 36.3051 37.9879 38.0598 38H38.0668C39.6269 37.9892 40.7265 37.5808 41.6324 36.6757C42.8176 35.4916 42.7819 34.0074 42.3912 33.0963C42.111 32.4429 41.5767 31.9123 40.8461 31.5618ZM38.1525 34.0942C37.5 34.1309 36.8221 33.8381 36.7887 33.2108C36.7639 32.7456 37.1197 32.2266 38.1926 32.1648C38.3154 32.1577 38.436 32.1543 38.5544 32.1543C38.9441 32.1543 39.3087 32.1921 39.6401 32.2646C39.5165 33.8084 38.7914 34.0591 38.1525 34.0942Z"
                                fill="black"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_2793_39344">
                                <rect
                                    width="12"
                                    height="12"
                                    fill="white"
                                    transform="translate(32 26)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                    <div class="flex flex-col">
                        <p
                            class="text-sm sm:text-base font-bold text-font_dark"
                        >
                            {company_name}
                        </p>
                        <p class="text-sm sm:text-base text-gray-400">
                            Threads account
                        </p>
                    </div>
                </div>
                <div>
                    <label
                        class="relative inline-flex items-center me-5 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            value=""
                            class="sr-only peer"
                            checked
                        />
                        <div
                            class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green_accent"
                        ></div>
                    </label>
                </div>
            </div>
            <hr class="h-px bg-gray-200 border-0 my-4" />
            <div class="flex items-center justify-between">
                <div
                    class="text-sm sm:text-base font-bold text-font_dark"
                >
                    Pixel
                </div>
                <div>
                    <label
                        class="relative inline-flex items-center me-5 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            value=""
                            class="sr-only peer"
                            checked
                        />
                        <div
                            class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green_accent"
                        ></div>
                    </label>
                </div>
            </div>
        </section>
    </div>
</div>
