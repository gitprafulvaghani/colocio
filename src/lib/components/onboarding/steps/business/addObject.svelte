<script lang="ts">
  import {
    add_object_business,
    objects_added_business,
  } from '$lib/stores/stores';
  import { toastStore } from '$lib/stores/stores';
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  function closeModal() {
    add_object_business.set({ show: false, type: '', mode: '', object: {} });
    dispatch('closeModal');
  }

  let objectProps = {
    title: '',
    description: '',
    url: '',
    medias: [],
  };

  let inputFile;
  let array_srcs: string[] = [];

  const maxFileSizeInMB: number = 5;
  const maxFileSizeInKB: number = 1024 * 1024 * maxFileSizeInMB;

  function onChange() {
    for (const file of inputFile.files) {
      if (file.size > maxFileSizeInKB) {
        alert('File is too large, please keep below 5Mb');
        break;
      } else {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
          if (array_srcs.includes(reader.result)) return;
          array_srcs = [...array_srcs, reader.result];
        });
        reader.readAsDataURL(file);
      }
    }
  }

  function saveObject() {
    if (!objectProps.title || !objectProps.description) return; // TODO feedback or disable button ?
    objectProps.medias = array_srcs;
    if ($add_object_business.mode == 'edit') {
      if ($add_object_business.type == 'product') {
        $objects_added_business.products = $objects_added_business.products.map(
          product => {
            if (product.title == objectProps.title) {
              return objectProps;
            }
            return product;
          }
        );
      } else if ($add_object_business.type == 'service') {
        $objects_added_business.services = $objects_added_business.services.map(
          service => {
            if (service.title == objectProps.title) {
              return objectProps;
            }
            return service;
          }
        );
      }
    } else {
      if ($add_object_business.type == 'product') {
        $objects_added_business.products = [
          ...$objects_added_business.products,
          objectProps,
        ];
      } else if ($add_object_business.type == 'service') {
        $objects_added_business.services = [
          ...$objects_added_business.services,
          objectProps,
        ];
      }
    }

    $add_object_business.show = false;
    $add_object_business.type = '';
  }

  function deselectImg(src: string) {
    array_srcs = array_srcs.filter(img => img !== src);
  }

  onMount(() => {
    if ($add_object_business.mode == 'edit') {
      objectProps = $add_object_business.object;
      array_srcs = objectProps.medias;
    }
  });
</script>

<div
  class="relative z-[999]"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
    class="fixed inset-0 backdrop-blur-sm transition-opacity"
    style="background:rgba(0, 0, 0, 0.12);"
  ></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div
      class="flex min-h-full items-end justify-center p-4 px-4 text-center
      sm:items-center sm:px-12 lg:px-36 xl:px-64"
    >
      <div
        class="relative flex transform flex-col justify-between overflow-hidden
        rounded-lg bg-white p-8 pt-5 text-left drop-shadow transition-all
        sm:my-8 sm:mt-16 sm:w-full"
      >
        <div class="flex flex-col gap-5">
          <h2 class="text-lg font-bold text-font_dark">
            {$add_object_business.type == 'product' ? 'Product' : 'Service'}
          </h2>
          <form class="grid grid-cols-2 gap-5">
            <div class="col-span-1">
              <label
                for="title"
                class="mb-2 block text-sm font-medium text-gray-900"
                >Title</label
              >
              <input
                type="text"
                placeholder="Enter title"
                bind:value={objectProps.title}
                id="title"
                required
                class="block w-full rounded-lg border border-gray-300 bg-white
                p-2.5 text-sm text-gray-900 focus:border-blue-500
                focus:ring-blue-500"
              />
            </div>
            <div class="col-span-2">
              <label
                for="description"
                class="mb-2 block text-sm font-medium text-gray-900"
                >Description</label
              >
              <textarea
                required
                placeholder="Enter description"
                id="description"
                bind:value={objectProps.description}
                class="h-36 w-full resize-none rounded-md border border-gray-300
                p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="col-span-2">
              <label
                for="title"
                class="mb-2 block text-sm font-medium text-gray-900">URL</label
              >
              <input
                required
                placeholder="Enter URL to website/store"
                type="text"
                bind:value={objectProps.url}
                id="title"
                class="block w-full rounded-lg border border-gray-300 bg-white
                p-2.5 text-sm text-gray-900 focus:border-blue-500
                focus:ring-blue-500"
              />
            </div>
            <div class="relative col-span-2">
              <div class="mb-2 block text-sm font-medium text-gray-900">
                Media
              </div>

              <button
                on:click={() => {
                  //  bool_modal_media.set(true);
                }}
                type="button"
                class="relative flex h-[120px] w-[120px] flex-col items-center
                justify-center rounded-[10px] border border-dashed
                border-custom-gray-200 bg-transparent p-2.5
                text-custom-gray-600"
              >
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0625 3.375H8.775C6.88482 3.375 5.93973 3.375 5.21778
                    3.74285C4.58274 4.06643 4.06643 4.58274 3.74285
                    5.21778C3.375 5.93973 3.375 6.88482 3.375 8.775V18.225C3.375
                    20.1152 3.375 21.0603 3.74285 21.7822C4.06643 22.4173
                    4.58274 22.9336 5.21778 23.2571C5.93973 23.625 6.88482
                    23.625 8.775 23.625H19.125C20.1712 23.625 20.6943 23.625
                    21.1235 23.51C22.2882 23.1979 23.1979 22.2882 23.51
                    21.1235C23.625 20.6943 23.625 20.1712 23.625 19.125M21.375
                    9V2.25M18 5.625H24.75M11.8125 9.5625C11.8125 10.8051 10.8051
                    11.8125 9.5625 11.8125C8.31986 11.8125 7.3125 10.8051 7.3125
                    9.5625C7.3125 8.31986 8.31986 7.3125 9.5625 7.3125C10.8051
                    7.3125 11.8125 8.31986 11.8125 9.5625ZM16.8638
                    13.4079L7.34754 22.0591C6.81228 22.5457 6.54465 22.789
                    6.52098 22.9997C6.50046 23.1824 6.57051 23.3636 6.70858
                    23.485C6.86788 23.625 7.22957 23.625 7.95295
                    23.625H18.513C20.132 23.625 20.9416 23.625 21.5774
                    23.353C22.3756 23.0115 23.0115 22.3756 23.353 21.5774C23.625
                    20.9416 23.625 20.132 23.625 18.513C23.625 17.9682 23.625
                    17.6958 23.5654 17.4422C23.4906 17.1234 23.3471 16.8248
                    23.1449 16.5672C22.984 16.3622 22.7713 16.1921 22.346
                    15.8518L19.1991 13.3342C18.7733 12.9936 18.5604 12.8234
                    18.326 12.7632C18.1194 12.7103 17.902 12.7171 17.6991
                    12.783C17.4689 12.8578 17.2672 13.0412 16.8638 13.4079Z"
                    stroke="#9CA3AF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Add media</span>

                <input
                  bind:this={inputFile}
                  id="mediaInput"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  on:change={onChange}
                  multiple
                  class="absolute left-0 top-0 h-[300px] w-full cursor-pointer opacity-0"
                />
              </button>
              {#if array_srcs.length > 0}
                <div class="mt-4 flex gap-4">
                  {#each array_srcs as src, i}
                    <div class="relative flex flex-col gap-1.5">
                      <button
                        on:click={() => {
                          deselectImg(src);
                        }}
                        type="button"
                        class="absolute right-2 top-2 flex h-4 w-4 items-center
                        justify-center rounded-full bg-gray-700 bg-opacity-40"
                      >
                        <svg
                          width="7"
                          height="7"
                          viewBox="0 0 7 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.8938 0.731445C1.57251 0.410156 1.05298
                            0.410156 0.735107 0.731445C0.417236 1.05273 0.413818
                            1.57227 0.735107 1.89014L2.34155 3.49658L0.735107
                            5.10303C0.413818 5.42432 0.413818 5.94385 0.735107
                            6.26172C1.0564 6.57959 1.57593 6.58301 1.8938
                            6.26172L3.50024 4.65527L5.10669 6.26172C5.42798
                            6.58301 5.94751 6.58301 6.26538 6.26172C6.58325
                            5.94043 6.58667 5.4209 6.26538 5.10303L4.65894
                            3.49658L6.26538 1.89014C6.58667 1.56885 6.58667
                            1.04932 6.26538 0.731445C5.94409 0.413574 5.42456
                            0.410156 5.10669 0.731445L3.50024 2.33789L1.8938
                            0.731445Z"
                            fill="#E4E8EE"
                          />
                        </svg>
                      </button>
                      <img
                        {src}
                        alt="media"
                        class="h-32 w-32 rounded-md border border-gray-300 object-cover"
                      />
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          </form>
        </div>
        <div class="flex items-center justify-end gap-3">
          <button
            on:click={closeModal}
            type="button"
            class="items-center justify-center rounded-md bg-white px-5 py-2.5
            text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset
            ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          >
            Cancel
          </button>
          <button
            on:click={saveObject}
            disabled={objectProps.title.length <= 0 ||
              objectProps.description.length <= 0}
            class:opacity-50={objectProps.title.length <= 0 ||
              objectProps.description.length <= 0}
            type="button"
            class="flex w-24 items-center justify-center gap-2 rounded-md
            bg-blue-primary px-5 py-2.5 text-sm font-medium text-white
            hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
