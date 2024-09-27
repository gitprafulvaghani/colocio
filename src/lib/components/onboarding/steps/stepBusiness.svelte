<script lang="ts">
  import {
    add_object_business,
    currencies,
    currency,
    detailed_offering,
    elevator_pitch,
    objects_added_business,
  } from '$lib/stores/stores';
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  let description_infos =
    'If your catalogue is extensive, elaborate on your flagship offerings OR group your offerings by categories. Alternatively, click “Show more” below to add a detailed list.';
  let show_more = true;

  function addProduct() {
    add_object_business.set({
      show: true,
      type: 'product',
      mode: '',
      object: {},
    });
  }

  function addService() {
    add_object_business.set({
      show: true,
      type: 'service',
      mode: '',
      object: {},
    });
  }

  function deselectImg(src: string) {
    objects_added_business.update((objects: any) => {
      return {
        products: objects.products.map((product: any) => {
          if (product.medias.includes(src)) {
            product.medias = product.medias.filter(
              (media: string) => media !== src
            );
          }
          return product;
        }),
        services: objects.services.map((service: any) => {
          if (service.medias.includes(src)) {
            service.medias = service.medias.filter(
              (media: string) => media !== src
            );
          }
          return service;
        }),
      };
    });
  }

  function editProduct(product: any) {
    add_object_business.set({
      show: true,
      type: 'product',
      mode: 'edit',
      object: product,
    });
  }

  function editService(service: any) {
    add_object_business.set({
      show: true,
      type: 'service',
      mode: 'edit',
      object: service,
    });
  }
</script>

<div class="flex flex-col gap-4">
  <h1 class="text-center text-2xl font-medium text-blue-primary">
    About your business
  </h1>
  <hr class="my-4 h-px border-0 bg-gray-200" />
  <h2 class="text-base font-bold text-gray-600 sm:text-lg">Offering</h2>

  <label class="font-medium text-gray-600">Currency</label>
  <select
    bind:value={$currency}
    id="currency"
    class="block w-2/4 rounded-lg border border-gray-300 bg-white p-2.5 text-sm
    text-gray-900 focus:border-blue-500 focus:ring-blue-500"
  >
    {#each $currencies as currency}
      <option value={currency}>{currency.code} {currency.name}</option>
    {/each}
  </select>

  <section class="flex flex-col gap-1">
    <h5 class="text-sm font-medium text-gray-600 sm:text-base">
      Elevator pitch
    </h5>
    <span class="text-xs text-gray-500 sm:text-sm">
      Give a brief sales pitch for your business and highlight a few key
      offerings in less than 280 characters.
    </span>
    <div class="relative mt-1">
      <textarea
        bind:value={$elevator_pitch}
        placeholder="Our elevator pitch..."
        class="h-36 w-full resize-none rounded-md border border-gray-300 p-2
        focus:ring-2 focus:ring-blue-500"
      />
      <div class="absolute bottom-2 right-4 text-sm text-gray-500 sm:text-base">
        {$elevator_pitch.length}/280
      </div>
    </div>
  </section>

  <section class="flex flex-col gap-1">
    <h6 class="text-sm font-medium text-gray-600 sm:text-base">
      Detailed offering
    </h6>
    <span class="text-xs text-gray-500 sm:text-sm">
      Give a detailed description of your offerings. Consider including the
      following:
      <ol class="list-decimal pl-4">
        <li>What need your business fills in the marketplace</li>
        <li>
          <div class="flex items-center gap-1">
            <span>Product/services description</span>
            <img
              src="icons/info.svg"
              title={description_infos}
              alt="icon info"
              class="h-3.5 w-3.5"
            />
          </div>
        </li>
        <li>Purchase and delivery information</li>
      </ol>
    </span>
    <div class="relative mt-1">
      <textarea
        placeholder="Our offering includes ..."
        bind:value={$detailed_offering}
        class="h-36 w-full resize-none rounded-md border border-gray-300 p-2
        focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </section>

  {#if show_more}
    <section
      class="flex flex-col"
      in:fly={{
        duration: 100,
        y: -200,
        opacity: 0.5,
        easing: quintOut,
      }}
    >
      <h5 class="text mb-4 font-medium text-gray-600">
        Add your products and/or services
      </h5>
      <div class="rounde-md flex items-center justify-between bg-gray-50 p-4">
        <span class="text-base font-bold text-gray-600 sm:text-lg"
          >Products</span
        >
        <button
          on:click={addProduct}
          type="button"
          class="flex items-center justify-center gap-2 rounded-md border
          border-gray-300 bg-white px-3.5 py-2 hover:bg-gray-100"
        >
          <img
            src="icons/plus.svg"
            alt="icon plus"
            class="h-3 w-3"
          />
          <span class="text-xs text-gray-600 sm:text-sm">Add product</span>
        </button>
      </div>
      {#each $objects_added_business.products as product}
        <div class="rounde-md flex items-center justify-between bg-gray-50 p-4">
          <table class="w-full table-auto">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="px-6 py-4">Title</th>
                <th class="px-6 py-4">Description</th>
                <th class="px-6 py-4 text-center">URL</th>
                <th class="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200 align-top">
                <td class="px-6 py-4 align-top">{product.title}</td>
                <td class="px-6 py-4">
                  <div class="flex flex-col gap-2">
                    <div>{product.description}</div>
                    {#if product.medias.length > 0}
                      <div class="flex gap-2">
                        <!-- Only the first 4 imgs -->
                        {#each product.medias.slice(0, 4) as media}
                          <div class="relative flex flex-col gap-1.5">
                            <button
                              on:click={() => {
                                deselectImg(media);
                              }}
                              type="button"
                              class="absolute right-2 top-2 flex h-4 w-4
                              items-center justify-center rounded-full
                              bg-gray-700 bg-opacity-40"
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
                                  0.410156 0.735107 0.731445C0.417236 1.05273
                                  0.413818 1.57227 0.735107 1.89014L2.34155
                                  3.49658L0.735107 5.10303C0.413818 5.42432
                                  0.413818 5.94385 0.735107 6.26172C1.0564
                                  6.57959 1.57593 6.58301 1.8938 6.26172L3.50024
                                  4.65527L5.10669 6.26172C5.42798 6.58301
                                  5.94751 6.58301 6.26538 6.26172C6.58325
                                  5.94043 6.58667 5.4209 6.26538 5.10303L4.65894
                                  3.49658L6.26538 1.89014C6.58667 1.56885
                                  6.58667 1.04932 6.26538 0.731445C5.94409
                                  0.413574 5.42456 0.410156 5.10669
                                  0.731445L3.50024 2.33789L1.8938 0.731445Z"
                                  fill="#E4E8EE"
                                />
                              </svg>
                            </button>
                            <img
                              src={media}
                              alt="media"
                              class="h-20 w-20 rounded-md border border-gray-300
                              object-cover"
                            />
                          </div>
                        {/each}
                        {#if product.medias.length > 4}
                          <div
                            class="flex h-20 w-20 items-center justify-center
                            rounded-md border border-gray-300 bg-transparent
                            text-lg font-normal text-gray-500"
                          >
                            +{product.medias.length - 4}
                          </div>
                        {/if}
                      </div>
                    {/if}
                  </div>
                </td>
                <td class="px-6 py-4">
                  {#if product.url}
                    <div class="flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.31794 11.5435L12.9205 5.94099L12.0423
                          5.0628L7.31794 9.78716L4.94294 7.41216L4.06476
                          8.29035L7.31794 11.5435ZM8.50203 15.9153C7.40708
                          15.9153 6.37789 15.7075 5.41444 15.292C4.45098 14.8764
                          3.61292 14.3125 2.90023 13.6001C2.18754 12.8877
                          1.62332 12.05 1.20759 11.087C0.791853 10.124 0.583984
                          9.09502 0.583984 8.00007C0.583984 6.90513 0.791762
                          5.87593 1.20732 4.91249C1.62287 3.94903 2.18683
                          3.11096 2.89919 2.39828C3.61157 1.68559 4.44927
                          1.12137 5.4123 0.705636C6.37531 0.2899 7.40429
                          0.0820312 8.49924 0.0820312C9.59418 0.0820312 10.6234
                          0.28981 11.5868 0.705366C12.5503 1.12092 13.3883
                          1.68488 14.101 2.39724C14.8137 3.10962 15.3779 3.94732
                          15.7937 4.91035C16.2094 5.87336 16.4173 6.90234
                          16.4173 7.99728C16.4173 9.09223 16.2095 10.1214
                          15.7939 11.0849C15.3784 12.0483 14.8144 12.8864
                          14.1021 13.5991C13.3897 14.3118 12.552 14.876 11.589
                          15.2917C10.626 15.7075 9.59697 15.9153 8.50203
                          15.9153ZM8.50063 14.6653C10.3617 14.6653 11.9381
                          14.0195 13.2298 12.7278C14.5215 11.4362 15.1673
                          9.85979 15.1673 7.99868C15.1673 6.13757 14.5215
                          4.56118 13.2298 3.26951C11.9381 1.97784 10.3617
                          1.33201 8.50063 1.33201C6.63952 1.33201 5.06313
                          1.97784 3.77146 3.26951C2.4798 4.56118 1.83396 6.13757
                          1.83396 7.99868C1.83396 9.85979 2.4798 11.4362 3.77146
                          12.7278C5.06313 14.0195 6.63952 14.6653 8.50063
                          14.6653Z"
                          fill="#02AB46"
                        />
                      </svg>
                    </div>
                  {/if}
                </td>
                <td class="px-6 py-4">
                  <button
                    on:click={() => editProduct(product)}
                    type="button"
                    class="flex items-center justify-center gap-2 rounded-md
                    border border-gray-300 bg-white px-3.5 py-1
                    hover:bg-gray-100"
                  >
                    <img
                      src="icons/edit.svg"
                      alt="edit"
                      class="h-4 w-4"
                    />
                    <span>Edit</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      {/each}

      <div
        class="rounde-md mt-4 flex items-center justify-between bg-gray-50 p-4"
      >
        <span class="text-base font-bold text-gray-600 sm:text-lg"
          >Services</span
        >
        <button
          on:click={addService}
          type="button"
          class="flex items-center justify-center gap-2 rounded-md border
          border-gray-300 bg-white px-3.5 py-2 hover:bg-gray-100"
        >
          <img
            src="icons/plus.svg"
            alt="icon plus"
            class="h-3 w-3"
          />
          <span class="text-xs text-gray-600 sm:text-sm">Add service</span>
        </button>
      </div>

      {#each $objects_added_business.services as service}
        <div class="rounde-md flex items-center justify-between bg-gray-50 p-4">
          <table class="w-full table-auto">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="px-6 py-4">Title</th>
                <th class="px-6 py-4">Description</th>
                <th class="px-6 py-4 text-center">URL</th>
                <th class="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200 align-top">
                <td class="px-6 py-4 align-top">{service.title}</td>
                <td class="px-6 py-4">
                  <div class="flex flex-col gap-2">
                    <div>{service.description}</div>
                    {#if service.medias.length > 0}
                      <div class="flex gap-2">
                        {#each service.medias.slice(0, 4) as media}
                          <img
                            src={media}
                            alt="media"
                            class="h-20 w-20 rounded-md border border-gray-300 object-cover"
                          />
                        {/each}
                        {#if service.medias.length > 4}
                          <div
                            class="flex h-20 w-20 items-center justify-center
                            rounded-md border border-gray-300 bg-transparent
                            text-lg font-normal text-gray-500"
                          >
                            +{product.medias.length - 4}
                          </div>
                        {/if}
                      </div>
                    {/if}
                  </div>
                </td>
                <td class="px-6 py-4">
                  {#if service.url}
                    <div class="flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.31794 11.5435L12.9205 5.94099L12.0423
                          5.0628L7.31794 9.78716L4.94294 7.41216L4.06476
                          8.29035L7.31794 11.5435ZM8.50203 15.9153C7.40708
                          15.9153 6.37789 15.7075 5.41444 15.292C4.45098 14.8764
                          3.61292 14.3125 2.90023 13.6001C2.18754 12.8877
                          1.62332 12.05 1.20759 11.087C0.791853 10.124 0.583984
                          9.09502 0.583984 8.00007C0.583984 6.90513 0.791762
                          5.87593 1.20732 4.91249C1.62287 3.94903 2.18683
                          3.11096 2.89919 2.39828C3.61157 1.68559 4.44927
                          1.12137 5.4123 0.705636C6.37531 0.2899 7.40429
                          0.0820312 8.49924 0.0820312C9.59418 0.0820312 10.6234
                          0.28981 11.5868 0.705366C12.5503 1.12092 13.3883
                          1.68488 14.101 2.39724C14.8137 3.10962 15.3779 3.94732
                          15.7937 4.91035C16.2094 5.87336 16.4173 6.90234
                          16.4173 7.99728C16.4173 9.09223 16.2095 10.1214
                          15.7939 11.0849C15.3784 12.0483 14.8144 12.8864
                          14.1021 13.5991C13.3897 14.3118 12.552 14.876 11.589
                          15.2917C10.626 15.7075 9.59697 15.9153 8.50203
                          15.9153ZM8.50063 14.6653C10.3617 14.6653 11.9381
                          14.0195 13.2298 12.7278C14.5215 11.4362 15.1673
                          9.85979 15.1673 7.99868C15.1673 6.13757 14.5215
                          4.56118 13.2298 3.26951C11.9381 1.97784 10.3617
                          1.33201 8.50063 1.33201C6.63952 1.33201 5.06313
                          1.97784 3.77146 3.26951C2.4798 4.56118 1.83396 6.13757
                          1.83396 7.99868C1.83396 9.85979 2.4798 11.4362 3.77146
                          12.7278C5.06313 14.0195 6.63952 14.6653 8.50063
                          14.6653Z"
                          fill="#02AB46"
                        />
                      </svg>
                    </div>
                  {/if}
                </td>
                <td class="px-6 py-4">
                  <button
                    on:click={() => editService(service)}
                    type="button"
                    class="flex items-center justify-center gap-2 rounded-md
                    border border-gray-300 bg-white px-3.5 py-1
                    hover:bg-gray-100"
                  >
                    <img
                      src="icons/edit.svg"
                      alt="edit"
                      class="h-4 w-4"
                    />
                    <span>Edit</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      {/each}
    </section>
  {/if}
  <div class="flex items-center justify-center">
    <button
      id="show-add"
      type="button"
      class="flex items-center justify-center gap-2 bg-transparent text-xs
      text-blue-primary hover:text-blue-dark-blue sm:text-sm"
      on:click={() => {
        show_more = !show_more;
      }}
    >
      <span>Show {show_more ? 'less' : 'more'}</span>

      {#if show_more}
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.40065 14.1654L10.5007 9.01467L15.6007 14.1654L17.1673
            12.5797L10.5007 5.83203L3.83398 12.5797L5.40065 14.1654Z"
            fill="#0D64E8"
          />
        </svg>
      {:else}
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.40065 5.83203L10.5007 10.9827L15.6007 5.83203L17.1673
            7.41773L10.5007 14.1654L3.83398 7.41773L5.40065 5.83203Z"
            fill="#0D64E8"
          />
        </svg>
      {/if}
    </button>
  </div>
</div>
