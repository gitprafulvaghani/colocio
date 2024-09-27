<script lang="ts">
  import { bool_modal_media, library } from "$lib/stores/stores";

  let active_tab = "upload";
  $: showModal = $bool_modal_media;

  let selected_library: any[] = [];

  $: {
    selected_library = $library.filter((media: any) => media.selected);
  }

  let max_media = 10;

  function deselectImg(img_src: string) {
    library.update((library: any[]) => {
      return library.map((media: any) => {
        if (media.src == img_src) {
          media.selected = false;
        }
        return media;
      });
    });
  }

  //  function handleClickImage(index_img: number) {
  //    console.log("index_img", index_img);
  //    if (!$library[index_img].selected && selected_library.length >= max_media) {
  //      return;
  //    }
  //    $library[index_img].selected = !$library[index_img].selected;
  //  }
  let currentSelectionOrder = 1;
  function handleClickImage(index_img) {
    library.update((lib) => {
      if (!lib[index_img].selected && selected_library.length >= max_media) {
        return lib;
      }

      if (lib[index_img].selected) {
        lib[index_img].selected = false;
        lib[index_img].selectionOrder = null;
        selected_library = selected_library.filter((i) => i !== index_img);
        // Recalculate the selection orders for all selected images
        let order = 1;
        for (let img of lib) {
          if (img.selected) {
            img.selectionOrder = order++;
          }
        }
        currentSelectionOrder = order;
      } else {
        lib[index_img].selected = true;
        lib[index_img].selectionOrder = currentSelectionOrder++;
        selected_library.push(index_img);
      }

      return lib;
    });
  }

  let selectedImagesCount = 0;

  function selectedImageCount(selected) {
    if (selected) {
      selectedImagesCount++;
    } else {
      selectedImagesCount--;
    }
    if (selectedImagesCount < 0) {
      selectedImagesCount = 0;
    }
    return selected ? selectedImagesCount : "";
  }

  let selectedFile: string | ArrayBuffer | null;

  function handleFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      selectedFile = reader.result;
      library.update((lib) => [
        ...lib,
        { src: selectedFile, name: file.name, selected: true },
      ]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
</script>

{#if showModal}
  <div class="modal-background">
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-[rgba(0, 0, 0, 0.12)] transition-opacity backdrop-blur-sm bg-[#0000001F] "
      />

      <div class="fixed inset-0 !z-[100] w-screen overflow-y-auto">
        <div
          class="flex min-h-full justify-center text-center items-center p-3 w-full"
        >
          <div
            class="relative transform overflow-auto rounded-lg bg-white px-4 pb-4 pt-5 text-left drop-shadow transition-all sm:my-8 sm:!mt-16 sm:w-full sm:max-w-3xl sm:p-6 flex flex-col justify-between w-full h-[84vh]"
          >
            <button
              class="absolute right-[13px] top-[17px]"
              on:click={() => {
                bool_modal_media.set(false);
              }}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                ><path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.57613 4.37575C3.81044 4.14143 4.19034 4.14143 4.42465 4.37575L7.60039 7.55148L10.7761 4.37575C11.0104 4.14143 11.3903 4.14143 11.6247 4.37575C11.859 4.61006 11.859 4.98996 11.6247 5.22428L8.44892 8.40001L11.6247 11.5757C11.859 11.8101 11.859 12.19 11.6247 12.4243C11.3903 12.6586 11.0104 12.6586 10.7761 12.4243L7.60039 9.24854L4.42465 12.4243C4.19034 12.6586 3.81044 12.6586 3.57613 12.4243C3.34181 12.19 3.34181 11.8101 3.57613 11.5757L6.75186 8.40001L3.57613 5.22428C3.34181 4.98996 3.34181 4.61006 3.57613 4.37575Z"
                  fill="#1B1D1F"
                /></svg
              ></button
            >
            <div class="flex flex-col gap-5">
              <h2 class="font-bold text-font_dark text-lg">Add media</h2>
              <div class="flex">
                <div
                  class="flex items-center text-sm text-center border-b border-gray-200 w-full border-collapse"
                >
                  <div class="flex sm:w-auto w-full">
                    <button
                      class:text-blue-primary={active_tab == "upload"}
                      class:border-blue-primary={active_tab == "upload"}
                      class:border-b={active_tab == "upload"}
                      class:text-gray-600={active_tab != "upload"}
                      on:click={() => {
                        active_tab = "upload";
                      }}
                      type="button"
                      class="flex-1 flex items-center gap-1 justify-center sm:min-w-[115px] min-w-[50%] pb-2"
                    >
                      <span>Upload</span>
                    </button>

                    <button
                      class:text-blue-primary={active_tab == "library"}
                      class:border-blue-primary={active_tab == "library"}
                      class:border-b={active_tab == "library"}
                      class:text-gray-600={active_tab != "library"}
                      on:click={() => {
                        active_tab = "library";
                      }}
                      type="button"
                      class="flex-1 flex items-center gap-1 justify-center sm:min-w-[115px] min-w-[50%] pb-2"
                    >
                      <span class="">Library</span>
                    </button>
                  </div>
                </div>
              </div>

              {#if active_tab == "upload"}
                <div
                  class="w-full sm:h-[300px] bg-transparent relative text-custom-gray-600 sm:border sm:border-dashed sm:border-custom-gray-200 rounded-[10px] p-2.5 gap-2.5 flex flex-col items-center justify-center"
                >
                  <input
                    type="file"
                    class="opacity-0 w-full absolute sm:h-[300px] h-[80px] top-0 left-0"
                    on:change={handleFileChange}
                    accept="image/*"
                  />
                  <span class="sm:block hidden">
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.0625 3.375H8.775C6.88482 3.375 5.93973 3.375 5.21778 3.74285C4.58274 4.06643 4.06643 4.58274 3.74285 5.21778C3.375 5.93973 3.375 6.88482 3.375 8.775V18.225C3.375 20.1152 3.375 21.0603 3.74285 21.7822C4.06643 22.4173 4.58274 22.9336 5.21778 23.2571C5.93973 23.625 6.88482 23.625 8.775 23.625H19.125C20.1712 23.625 20.6943 23.625 21.1235 23.51C22.2882 23.1979 23.1979 22.2882 23.51 21.1235C23.625 20.6943 23.625 20.1712 23.625 19.125M21.375 9V2.25M18 5.625H24.75M11.8125 9.5625C11.8125 10.8051 10.8051 11.8125 9.5625 11.8125C8.31986 11.8125 7.3125 10.8051 7.3125 9.5625C7.3125 8.31986 8.31986 7.3125 9.5625 7.3125C10.8051 7.3125 11.8125 8.31986 11.8125 9.5625ZM16.8638 13.4079L7.34754 22.0591C6.81228 22.5457 6.54465 22.789 6.52098 22.9997C6.50046 23.1824 6.57051 23.3636 6.70858 23.485C6.86788 23.625 7.22957 23.625 7.95295 23.625H18.513C20.132 23.625 20.9416 23.625 21.5774 23.353C22.3756 23.0115 23.0115 22.3756 23.353 21.5774C23.625 20.9416 23.625 20.132 23.625 18.513C23.625 17.9682 23.625 17.6958 23.5654 17.4422C23.4906 17.1234 23.3471 16.8248 23.1449 16.5672C22.984 16.3622 22.7713 16.1921 22.346 15.8518L19.1991 13.3342C18.7733 12.9936 18.5604 12.8234 18.326 12.7632C18.1194 12.7103 17.902 12.7171 17.6991 12.783C17.4689 12.8578 17.2672 13.0412 16.8638 13.4079Z"
                        stroke="#9CA3AF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <div class="text-font_dark">
                    <span class="text-blue-primary font-bold"
                      >Upload a file</span
                    > or drag and drop
                  </div>
                  <span class="text-gray-600 text-sm text-center"
                    >PNG, JPG, GIF, MP4, MOV up to 10 MB</span
                  >
                </div>
              {:else if active_tab == "library"}
                <div class="sm:flex hidden items-center justify-between">
                  <button
                    type="button"
                    class="flex gap-1 items-center rounded-md bg-white px-4 py-3 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 13.3333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V13.3333M14.1667 6.66667L10.2946 2.79463C10.1319 2.63191 9.86809 2.63191 9.70537 2.79463L5.83333 6.66667M10 3.33334L10 12.5"
                        stroke="#4B5563"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Upload
                  </button>
                  <div class="flex items-center text-font_dark font-medium">
                    <button class="text-center px-4 py-3 text-blue-primary">
                      All
                    </button>
                    <button class="text-center px-4 py-3"> Images </button>
                    <button class="text-center px-4 py-3"> Videos </button>
                  </div>
                </div>
                <div class="flex gap-4 flex-wrap justify-center">
                  {#each $library as image_lib, index}
                    {#if !image_lib.src.startsWith("data:")}
                      <button
                        type="button"
                        on:click={() => {
                          handleClickImage(index);
                        }}
                        class="flex flex-col gap-1.5 relative"
                      >
                        <button
                          class:hidden={!image_lib.selected}
                          type="button"
                          class="absolute text-xs rounded-full w-4 h-4 bg-blue-primary text-white top-2 right-2 flex items-center justify-center"
                          >{selectedImageCount(image_lib.selected)}</button
                        >
                        <img
                          class:border-blue-primary={image_lib.selected}
                          class:border-[6px]={image_lib.selected}
                          src={"/images/" + image_lib.src}
                          class="h-[120px] w-[120px] object-cover rounded-[10px]"
                          alt="demo"
                        />
                        <div class="text-sm text-center text-gray-600">
                          {image_lib.name ? image_lib.name : image_lib.src}
                        </div>
                      </button>
                    {/if}
                  {/each}
                </div>
              {/if}

              <hr class="bg-gray-200 h-[1px]" />
              <div class="flex flex-col gap-5">
                <h4 class="font-bold text-font_dark">
                  Selected media {selected_library.length}/5
                </h4>
                <div class="flex gap-4 overflow-auto">
                  {#each selected_library as img_lib, index}
                    <div class="flex flex-col gap-1.5 relative">
                      <button
                        on:click={() => {
                          deselectImg(img_lib.src);
                        }}
                        type="button"
                        class="absolute rounded-full w-4 h-4 bg-gray-700 bg-opacity-40 top-2 right-2 flex items-center justify-center"
                      >
                        <svg
                          width="7"
                          height="7"
                          viewBox="0 0 7 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.8938 0.731445C1.57251 0.410156 1.05298 0.410156 0.735107 0.731445C0.417236 1.05273 0.413818 1.57227 0.735107 1.89014L2.34155 3.49658L0.735107 5.10303C0.413818 5.42432 0.413818 5.94385 0.735107 6.26172C1.0564 6.57959 1.57593 6.58301 1.8938 6.26172L3.50024 4.65527L5.10669 6.26172C5.42798 6.58301 5.94751 6.58301 6.26538 6.26172C6.58325 5.94043 6.58667 5.4209 6.26538 5.10303L4.65894 3.49658L6.26538 1.89014C6.58667 1.56885 6.58667 1.04932 6.26538 0.731445C5.94409 0.413574 5.42456 0.410156 5.10669 0.731445L3.50024 2.33789L1.8938 0.731445Z"
                            fill="#E4E8EE"
                          />
                        </svg>
                      </button>
                      <img
                        src={img_lib.src.startsWith("data:")
                          ? img_lib.src
                          : "/images/" + img_lib.src}
                        class="h-[120px] min-w-[120px] object-cover rounded-[10px]"
                        alt="demo"
                      />
                      <div class="text-sm text-center text-gray-600 truncate">
                        {index + 1}. {img_lib.name ? img_lib.name : img_lib.src}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
            <div class="flex justify-end items-center gap-3">
              <button
                on:click={() => {
                  bool_modal_media.set(false);
                }}
                type="button"
                class="justify-center items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 sm:max-w-max max-w-[50%] w-full"
                >Cancel</button
              >
              <button
                on:click={() => {
                  bool_modal_media.set(false);
                }}
                type="button"
                class="text-white flex items-center justify-center gap-2 sm:max-w-[100px] max-w-[50%] w-full bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
