<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte";
  import VerticalList from "$lib/components/VerticalList.svelte";

  export let data;
  let assets = [];
  for (let asset of data.assets) {
    assets.push({
      id: asset[0].asset_id,
      type: asset[0].type.replace(/_/g, " "),
      name: asset[0].data.name,
      profile_picture_url: asset[0].data.profile_picture_url,
    });
  }

  // const item = {'type': 'facebook page', 'profile_picture_url': '', 'name': 'Awesome Company'};
</script>

<SectionTitle><p slot="title">Accounts</p></SectionTitle>
<div class="bg-blue-100 text-center text-blue-600 rounded-md py-4 my-6">
  <p class="font-semibold text-lg">4/4 selected</p>
  <div class="text-sm font-light">
    <a class="underline" href="/">Upgrade</a>
    <span>to add more</span>
  </div>
</div>

<!-- <strong><h2>Accounts</h2></strong>
<VerticalList items={assets} main={false}/> -->

<!-- <p class="font-light pb-2">Meta Business accounts</p>
    <div class="border rounded-md p-7">
        <div class="flex justify-between items-center mb-4">
            <p class="font-semibold text-lg">Awesome Company Inc.</p>
            <button
            type="button"
            class="justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            >Remove</button>
        </div>
        <hr/>
        <div class="my-2">
            <p class="font-semibold text-lg">Meta Business assets</p>
            <div class="flex justify-between items-center py-4">
                <div class="flex w-4/4 h-15">
                    <div>
                        {#if item.type == "facebook page"}
                            {#if item.profile_picture_url}
                                <img class="w-9 h-9 border rounded-full border-gray-400" src={item.profile_picture_url} alt="">
                            {:else}
                                <svg class="w-9 h-9 border rounded-full border-gray-400"
                                viewBox="-5 -2 17 17"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4.20002H3.9905V3.00003C3.9905 2.38083 4.03838 1.99083 4.88152 1.99083H5.94641V0.0828372C5.42822 0.0264374 4.90717 -0.0011625 4.38556 3.74999e-05C2.83895 3.74999e-05 1.71021 0.994234 1.71021 2.81943V4.20002H0V6.60002L1.71021 6.59942V12H3.9905V6.59822L5.73834 6.59762L6 4.20002Z" fill="#111827"/>
                                </svg>
                            {/if}

                        {:else if item.type == "facebook ad account"}
                            <svg class="w-9 h-9 border rounded-full border-gray-400"
                            viewBox="-4 -5 25 25"
                            >
                                <path
                                    d="M2.11833 8.11257C2.11833 5.40314 3.55071 2.57592 5.23221 2.57592C6.16637 2.57592 6.9137 3.10602 8.09698 4.69633C6.97598 6.34555 6.29093 7.34686 6.29093 7.34686C4.79626 9.58508 4.29804 10.0563 3.48843 10.0563C2.67883 10.1152 2.11833 9.40838 2.11833 8.11257ZM11.8959 7.11126L10.8372 5.46204C10.5881 5.04974 10.2767 4.63743 10.0276 4.28403C10.9617 2.92932 11.7091 2.22251 12.6432 2.22251C14.5116 2.22251 16.0062 4.87304 16.0062 8.17147C16.0062 9.40838 15.5703 10.1152 14.6984 10.1152C13.8265 10.1152 13.5151 9.58508 11.8959 7.11126ZM9.21797 3.10602C7.84786 1.39791 6.66459 0.75 5.29448 0.75C2.42972 0.75 0.25 4.34293 0.25 8.11257C0.25 10.4686 1.43327 11.9411 3.42616 11.9411C4.85854 11.9411 5.85498 11.2932 7.72331 8.23037C7.72331 8.23037 8.47064 6.93455 9.03114 6.05105C9.21797 6.34555 9.4048 6.64005 9.59164 6.99346L10.4635 8.40707C12.145 11.1165 13.0792 12 14.7607 12C16.6913 12 17.75 10.4686 17.75 8.05366C17.6877 4.04843 15.4457 0.75 12.7678 0.75C11.3354 0.75 10.2144 1.81021 9.21797 3.10602Z"
                                    fill="#4B5563"
                                />
                            </svg>
                        {:else if item.type == "facebook business account"}
                            <svg class="w-9 h-9 border rounded-full border-gray-400"
                            viewBox="-4 -5 25 25"
                                >
                                <path
                                    d="M2.11833 8.11257C2.11833 5.40314 3.55071 2.57592 5.23221 2.57592C6.16637 2.57592 6.9137 3.10602 8.09698 4.69633C6.97598 6.34555 6.29093 7.34686 6.29093 7.34686C4.79626 9.58508 4.29804 10.0563 3.48843 10.0563C2.67883 10.1152 2.11833 9.40838 2.11833 8.11257ZM11.8959 7.11126L10.8372 5.46204C10.5881 5.04974 10.2767 4.63743 10.0276 4.28403C10.9617 2.92932 11.7091 2.22251 12.6432 2.22251C14.5116 2.22251 16.0062 4.87304 16.0062 8.17147C16.0062 9.40838 15.5703 10.1152 14.6984 10.1152C13.8265 10.1152 13.5151 9.58508 11.8959 7.11126ZM9.21797 3.10602C7.84786 1.39791 6.66459 0.75 5.29448 0.75C2.42972 0.75 0.25 4.34293 0.25 8.11257C0.25 10.4686 1.43327 11.9411 3.42616 11.9411C4.85854 11.9411 5.85498 11.2932 7.72331 8.23037C7.72331 8.23037 8.47064 6.93455 9.03114 6.05105C9.21797 6.34555 9.4048 6.64005 9.59164 6.99346L10.4635 8.40707C12.145 11.1165 13.0792 12 14.7607 12C16.6913 12 17.75 10.4686 17.75 8.05366C17.6877 4.04843 15.4457 0.75 12.7678 0.75C11.3354 0.75 10.2144 1.81021 9.21797 3.10602Z"
                                    fill="#4B5563"
                                />
                            </svg>
                        {/if}
                    </div>
                    <div class="ml-2">
                        <p class="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                        </p>
                        <p class="text-sm font-light text-gray-900 truncate">
                            {item.type}
                        </p>
                    </div>
                </div>
                <Switch isChecked={true} />
            </div>

            <hr/>
            <div class="flex justify-between items-center pt-4">
                <p class="font-semibold">Pixel</p>
                <Switch />
            </div>

        </div>

    </div>

    <div class="mt-8">
        <button
        type="button"
        class="flex justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
        >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V9.25H15C15.4142 9.25 15.75 9.58579 15.75 10C15.75 10.4142 15.4142 10.75 15 10.75H10.75V15C10.75 15.4142 10.4142 15.75 10 15.75C9.58579 15.75 9.25 15.4142 9.25 15V10.75L5 10.75C4.58579 10.75 4.25 10.4142 4.25 10C4.25 9.58579 4.58579 9.25 5 9.25L9.25 9.25V5C9.25 4.58579 9.58579 4.25 10 4.25Z" fill="#545F71"/>
        </svg>
        Add account</button>
    </div>
</div> -->

<!-- <p class="text-sm font-medium text-gray-900">
            Drag-and-drop the assets and accounts you want to include in your Amazing Company profile.
        </p>
        <br><br>
        <section class="flex gap-8 bg-blue-bglight text-blue-primary p-4 rounded-md relative">
            <div class="flex-1 flex gap-1">
                <div>
                    <svg class="w-4 h-4 mt-0.5" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 2C5.18486 2 2.5 4.68486 2.5 8C2.5 11.3151 5.18486 14 8.5 14C11.8151 14 14.5 11.3151 14.5 8C14.5 4.68486 11.8151 2 8.5 2ZM12.2171 10.9677C11.835 11.335 11.3189 11.4739 10.7382 10.7345L8.99627 8.61538C8.7134 8.27295 8.18735 8.28288 7.91439 8.63027L6.29653 10.7146C5.67618 11.5087 5.1402 11.3201 4.74814 10.9132C4.11786 10.1042 3.74069 9.09677 3.74069 7.99504C3.74069 5.36973 5.87469 3.23573 8.5 3.23573C11.1253 3.23573 13.2593 5.36973 13.2593 7.99504C13.2593 9.11663 12.8672 10.1489 12.2171 10.9628V10.9677Z" fill="#0D64E8"/>
                    </svg>
                </div>
                <div>
                    <div class="font-semibold text-sm sm:text-base">
                        One Account per platform
                    </div>
                    <div class="text-xs sm:text-sm text-gray-600">
                        Your profile can only include one asset/account per platform, e.g. 1x Facebook page, 1x Google Account. To add more profiles, please upgrade or contact us
                    </div>
                </div>
            </div>
        </section>
        <br>

        <strong><h2></h2></strong>
        {#if duplicateItems.length > 0}
            <section class="flex gap-8 p-4 rounded-md relative">
                <div class="flex-1 flex gap-1">
                    <div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4704 13.7386C10.3438 13.8652 10.1872 13.9285 9.99965 13.9285C9.81209 13.9285 9.65547 13.8652 9.52893 13.7386C9.40239 13.6121 9.33909 13.4555 9.33909 13.2679C9.33909 13.0803 9.40239 12.9237 9.52893 12.7972C9.65547 12.6706 9.81209 12.6073 9.99965 12.6073C10.1872 12.6073 10.3438 12.6706 10.4704 12.7972C10.5969 12.9237 10.6602 13.0803 10.6602 13.2679C10.6602 13.4555 10.5969 13.6121 10.4704 13.7386ZM10.6121 10.8836H9.38718V5.90862H10.6121V10.8836ZM10.001 17.9028C8.90773 17.9028 7.88023 17.6954 6.91842 17.2805C5.95635 16.8656 5.11961 16.3025 4.40809 15.5913C3.69656 14.8801 3.13322 14.0437 2.71809 13.0821C2.30306 12.1207 2.09551 11.0934 2.09551 10.0001C2.09551 8.90676 2.30297 7.87925 2.71782 6.91744C3.13278 5.95537 3.69586 5.11864 4.40706 4.40712C5.11827 3.69559 5.95464 3.13225 6.91628 2.71711C7.87766 2.30208 8.90494 2.09453 9.99826 2.09453C11.0916 2.09453 12.1191 2.30199 13.0809 2.71684C14.043 3.1318 14.8797 3.69488 15.5912 4.40608C16.3027 5.11729 16.8661 5.95366 17.2812 6.9153C17.6963 7.87668 17.9038 8.90397 17.9038 9.99728C17.9038 11.0906 17.6963 12.1181 17.2815 13.0799C16.8665 14.042 16.3035 14.8787 15.5923 15.5902C14.881 16.3018 14.0447 16.8651 13.083 17.2802C12.1217 17.6953 11.0944 17.9028 10.001 17.9028ZM9.99965 16.6778C11.864 16.6778 13.4436 16.0307 14.7377 14.7367C16.0317 13.4426 16.6788 11.863 16.6788 9.99868C16.6788 8.13432 16.0317 6.55473 14.7377 5.26067C13.4436 3.96661 11.864 3.31951 9.99965 3.31951C8.1353 3.31951 6.55571 3.96661 5.26165 5.26067C3.96759 6.55473 3.32049 8.13432 3.32049 9.99868C3.32049 11.863 3.96759 13.4426 5.26165 14.7367C6.55571 16.0307 8.1353 16.6778 9.99965 16.6778Z" fill="#FF4040" stroke="#FF4040" stroke-width="0.025"/>
                        </svg>

                    </div>
                    <div>
                        <div class="text-s sm:text text-red-500">
                            A { duplicateItems } account already exists in this profile
                        </div>
                    </div>
                </div>
            </section>
        {/if} -->

<!-- <VerticalList items={[]} main={true}/>
        <br> -->
