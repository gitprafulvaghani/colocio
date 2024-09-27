<script lang="ts">
  //  import { isEditModelOpen } from "$lib/stores/stores";
  import SocialMedia from "$lib/components/promotions/SocialMedia.svelte";
  import {
    platforms_ad,
    platformDetailsStore,
    bool_modal_media,
    isEditModelOpen,
  } from "$lib/stores/stores";
  import { createEventDispatcher, onMount } from "svelte";
  import {
    get_AdSet_ById,
    get_Creative_By_Id,
  } from "$lib/services/NewFacebook/preview_Service";
  import { writable } from "svelte/store";

  export let post;

  const dispatch = createEventDispatcher();
  $: showModal = $isEditModelOpen;

  let platformarray: any[] = ["Facebook"];
  function handleSubmit() {
    platformDetailsStore.set(platformarray);
  }

  let bool_one_platform_selected = true;
  $: {
    bool_one_platform_selected = isOnePlatformSelected($platforms_ad);
  }

  function isOnePlatformSelected(values: any) {
    return values.filter((platform: any) => platform.selected).length >= 1;
  }
  function updateSelection(platformName: any, isSelected: any) {
    if (isSelected) {
      if (!platformarray.includes(platformName)) {
        platformarray.push(platformName);
      }
    } else {
      platformarray = platformarray.filter((item) => item !== platformName);
    }
  }
  let tab_selected = "facebook";

  function toggleModal() {
    showModal = false;
    isEditModelOpen.set(false);
  }

  let location = "";
  let interest = { name: "" };

  export let audience_infos = {
    age: "",
    gender: "",
    locations: [],
    interests: [],
    sources: [],
  };

  let audienceData = writable({
    age: "",
    gender: "",
    locations: [],
    interests: [],
  });
  let adSetData = writable({});
  export let schedule_infos: any = {
    start: "",
    end: "",
    days: 0,
    daily_spend: 1000,
    daily_reach: 1500,
  };
  let percent_optimization = 0;
  let budget_range = 85;
  let reach_range = 50;

  export let total_budget = 0;
  export let total_budget_description = "";
  export let estimated_vat = 0;

  function addInterest() {
    if (interest.name.trim() === "") return;
    audienceData.update((data) => ({
      ...data,
      interests: [
        ...data.interests,
        { name: interest.name.trim(), selected: true },
      ],
    }));
    interest.name = "";
  }
  function addLocation() {
    if (location === "") return;
    audienceData.update((data) => ({
      ...data,
      locations: [...data.locations, { name: location, selected: true }],
    }));
    location = "";
  }

  function removeLocation(value: string) {
    audience_infos.locations = audience_infos.locations.filter(
      (item) => item != value
    );
  }
  const defaultCreativeAdSet = {
    name: "24/7 Line open for you 2023-09-27-d456c96d21340c794e7687d6da9bcf30",
    status: "ACTIVE",
    thumbnail_url:
      "https://external.famd1-2.fna.fbcdn.net/emg1/v/t13/10372216821775178146?url=https%3A%2F%2Fwww.facebook.com%2Fads%2Fimage%2F%3Fd%3DAQJ03Gw9JCx4ZnJnFbsbJ_vT0b3vwjKiEbObAx_FpQyJeP-fsjEIxT3FX-8-p12qY-H1ZdqdMxE8xOxakVJT0wx0WPuodAOJCsHzddS3ZDoVIl6a19kVjXWtIqAYnenVX7eTfJLZsekXl_8JFCA89Zbe&fb_obo=1&utld=facebook.com&stp=c0.5000x0.5000f_dst-emg0_p64x64_q75&ccb=13-1&oh=06_Q3994MhroOzRDHh0g_mkLIn3XHU5ANf_FAufm8WHeNH4Hmw&oe=66634219&_nc_sid=58080a",
    effective_object_story_id: "112103471796536_248004518233719",
    object_story_spec: {
      page_id: "112103471796536",
      instagram_actor_id: "6057904157630874",
      link_data: {
        link: "https://api.whatsapp.com/send",
        message:
          "Lets settle your.COJ account over 60 months. No need to pay upfront.. \nContact us today by giving us a call, visit our office, or simply drop us a whatsapp below",
        name: "24/7 Line open for you",
        image_hash: "22600930454d3d5eea69499c186a759b",
        call_to_action: {
          type: "WHATSAPP_MESSAGE",
          value: {
            app_destination: "WHATSAPP",
          },
        },
      },
    },
    account_id: "184170614687925",
    body: "Lets settle your.COJ account over 60 months. No need to pay upfront.. \nContact us today by giving us a call, visit our office, or simply drop us a whatsapp below",
    call_to_action_type: "WHATSAPP_MESSAGE",
    effective_instagram_story_id: "6623213004438282",
    image_url:
      "https://scontent.famd1-1.fna.fbcdn.net/v/t45.1600-4/382601236_23859847597480576_4782112003380203208_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=L4PvcnEl3fwQ7kNvgHE95wN&_nc_ht=scontent.famd1-1.fna&edm=AAT1rw8EAAAA&oh=00_AYBgskLXgDb1vlyWP0NpF2NZfIRF0hTiN4L5R7AF-vxu-Q&oe=6667285A",
    title: "24/7 Line open for you",
    id: "23859847725310576",
  };

  async function GetPreview(post: any) {
    const AdSet = await get_AdSet_ById("23858751790020576");
    adSetData.set(AdSet);
    const transformedData = transformAudienceData(AdSet.targeting);

    audienceData.set(transformedData);
    //const creative_AdSet = await get_Creative_By_Id(post.creative.id);
    //const creative_AdSet = await get_Creative_By_Id(AdSet.campaign_id);
    const creative_AdSet = await get_Creative_By_Id("23858751789390576");
    const finalCreativeAdSet = creative_AdSet || defaultCreativeAdSet;
  }

  function transformAudienceData(data) {
    return {
      age: `${data.age_min} - ${data.age_max}`,
      gender: data.genders ? data.genders.join(", ") : "All",
      locations: [
        ...data.geo_locations.custom_locations.map((loc) => ({
          name: `${loc.latitude}, ${loc.longitude} (${loc.radius} km)`,
          selected: true,
        })),
        ...data.geo_locations.places.map((place) => ({
          name: `${place.name} (${place.radius} km)`,
          selected: true,
        })),
      ],
      interests: data.flexible_spec
        ? data.flexible_spec.flatMap((spec) =>
            spec.interests.map((interest) => ({
              name: interest.name,
              selected: true,
            }))
          )
        : [],
      sources: data.brand_safety_content_filter_levels
        ? data.brand_safety_content_filter_levels
        : [],
    };
  }

  export function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onMount(() => {
    if (post != undefined) {
      GetPreview(post);
    }
  });
  function imagename(path: string) {
    if (path != undefined) {
      const parts = path.split("/");
      const fileName = parts[parts.length - 1];
      return fileName;
    }
  }
</script>

{#if showModal}
  <div class="modal-background">
    <div>
      <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 bg-[rgba(0, 0, 0, 0.12)] transition-opacity backdrop-blur-sm bg-[#0000001F]"
        />
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center"
          >
            <div
              class="relative transform overflow-hidden rounded-lg bg-white text-left drop-shadow transition-all sm:my-8 sm:!mt-16 sm:w-full sm:max-w-[1166px] md:p-8 p-4 pt-10 flex flex-col justify-between"
            >
              <!-- closer -->
              <button
                on:click={toggleModal}
                class="absolute right-[13px] top-[17px]"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.57613 4.37575C3.81044 4.14143 4.19034 4.14143 4.42465 4.37575L7.60039 7.55148L10.7761 4.37575C11.0104 4.14143 11.3903 4.14143 11.6247 4.37575C11.859 4.61006 11.859 4.98996 11.6247 5.22428L8.44892 8.40001L11.6247 11.5757C11.859 11.8101 11.859 12.19 11.6247 12.4243C11.3903 12.6586 11.0104 12.6586 10.7761 12.4243L7.60039 9.24854L4.42465 12.4243C4.19034 12.6586 3.81044 12.6586 3.57613 12.4243C3.34181 12.19 3.34181 11.8101 3.57613 11.5757L6.75186 8.40001L3.57613 5.22428C3.34181 4.98996 3.34181 4.61006 3.57613 4.37575Z"
                    fill="#1B1D1F"
                  />
                </svg></button
              >
              <div>
                <div
                  class="bg-[#F0E6FC] flex justify-between rounded-md p-[9.5px_8px] items-center"
                >
                  <div class="flex gap-[10px] items-center">
                    <div
                      class="bg-[#6717CC] rounded-md px-[5px] h-[21px] text-[12px] text-white flex items-center justify-center"
                    >
                      Campaign
                    </div>
                    <p class="text-[#6717CC] text-[14px]">
                      Summer Campaign ‘23
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 18.12L13.1808 12L7 5.88L8.90283 4L17 12L8.90283 20L7 18.12Z"
                      fill="#6717CC"
                    />
                  </svg>
                </div>
                <div
                  class="flex sm:flex-row flex-col gap-4 justify-between items-start mt-5"
                >
                  <div>
                    <div class="flex items-center gap-2">
                      <div
                        class="bg-[#0024A4] text-white w-[26px] h-[21px] rounded-md text-[12px] flex justify-center items-center"
                      >
                        Ad
                      </div>
                      <p class="text-[#111827] text-[18px] font-semibold">
                        {$adSetData.name || "Summer Ad 1"}
                      </p>
                      <div
                        class="text-[#02AB46] text-[14px] bg-[#E4FDEA] rounded-[100px] px-2 h-[24px] flex justify-center items-center"
                      >
                        {$adSetData.status}
                      </div>
                    </div>
                    <p class="text-[#9CA3AF] text-[14px] mt-1">
                      Last updated: {formatDate($adSetData.created_time)}
                    </p>
                  </div>
                  <div class="flex gap-2">
                    <button
                      on:click={toggleModal}
                      class="border-[#D1D5DB] border-[1px] rounded-md h-[40px] max-w-[72px] w-full text-[14px] px-[13px]"
                      >Cancel</button
                    >
                    <button
                      class="bg-[#0D64E8] text-white rounded-md h-[40px] w-[100px] flex justify-center items-center gap-2 text-[14px]"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.6612 3.125C13.7625 3.125 13.8597 3.16524 13.9313 3.23687L16.7631 6.06869C16.8348 6.14032 16.875 6.23746 16.875 6.33876V16.4931C16.875 16.704 16.704 16.875 16.4931 16.875H3.50694C3.296 16.875 3.125 16.704 3.125 16.4931V3.50694C3.125 3.296 3.296 3.125 3.50694 3.125H13.6612Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.18056 11.1458C6.18056 10.9349 6.35156 10.7639 6.5625 10.7639H13.4375C13.6484 10.7639 13.8194 10.9349 13.8194 11.1458V16.4931C13.8194 16.704 13.6484 16.875 13.4375 16.875H6.5625C6.35156 16.875 6.18056 16.704 6.18056 16.4931V11.1458Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.94444 3.50694C6.94444 3.296 7.11545 3.125 7.32639 3.125H12.6736C12.8846 3.125 13.0556 3.296 13.0556 3.50694V6.5625C13.0556 6.77344 12.8846 6.94444 12.6736 6.94444H7.32639C7.11545 6.94444 6.94444 6.77344 6.94444 6.5625V3.50694Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                      </svg> Save</button
                    >
                  </div>
                </div>
                <hr class="h-[1px] bg-[#E5E7EB] my-5" />
                <div class="flex lg:flex-row flex-col gap-4">
                  <div>
                    <div class="flex gap-1 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 2C5.57981 2 2 5.57982 2 10C2 14.4202 5.57981 18 10 18C14.4202 18 18 14.4202 18 10C18 5.57982 14.4202 2 10 2ZM14.9562 13.957C14.4466 14.4467 13.7585 14.6319 12.9843 13.646L10.6617 10.8205C10.2845 10.3639 9.58313 10.3772 9.21919 10.8404L7.06204 13.6195C6.23491 14.6782 5.52026 14.4268 4.99752 13.8842C4.15715 12.8056 3.65426 11.4624 3.65426 9.99338C3.65426 6.49297 6.49958 3.64764 10 3.64764C13.5004 3.64764 16.3457 6.49297 16.3457 9.99338C16.3457 11.4888 15.823 12.8652 14.9562 13.9504V13.957Z"
                          fill="#0D64E8"
                        />
                      </svg>
                      <div>
                        <h2 class="text-[#0D64E8] text-[18px] font-semibold">
                          Improve with Colocio:
                        </h2>
                        <p class="text-[#0D64E8] text-[12px]">
                          Here are recommendation based on your audience and
                          engagement to date:
                        </p>
                      </div>
                    </div>
                    <div class="bg-[#E4EFFF] rounded-xl p-4 mb-4">
                      <div
                        class="flex sm:flex-row flex-col justify-between sm:items-center items-start sm:gap-0 gap-4"
                      >
                        <div class="flex items-start gap-3">
                          <img src="/icons/share2.svg" alt="share2" />
                          <div>
                            <h2 class="text-[#0D64E8] text-[14px] font-medium">
                              Platforms
                            </h2>
                            <p class="text-[#0D64E8] text-[12px]">
                              Add X to you platforms to reach your untapped
                              audience
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center gap-4 sm:w-auto w-full">
                          <button
                            class="border-[#0D64E8] border-[1px] rounded-md h-[40px] sm:w-auto w-full text-[14px] px-[14px] text-[#0D64E8]"
                            >Apply</button
                          >
                          <button
                            ><img src="/icons/right.svg" alt="right" /></button
                          >
                        </div>
                      </div>
                    </div>
                    <div class="bg-[#E4EFFF] rounded-xl p-4 mb-4">
                      <div
                        class="flex sm:flex-row flex-col justify-between sm:items-center items-start sm:gap-0 gap-4"
                      >
                        <div class="flex items-start gap-3">
                          <img
                            src="/icons/text.svg"
                            alt="text"
                            class="w-[20px]"
                          />
                          <div>
                            <h2 class="text-[#0D64E8] text-[14px] font-medium">
                              Text
                            </h2>
                            <ul
                              class="text-[#0D64E8] text-[12px] list-disc pl-[24px]"
                            >
                              <li class="leading-[15px]">
                                Add more Call-to-actions to your
                                descriptions/captions.
                              </li>
                              <li class="leading-[15px]">
                                Include your popular hashtags, e.g.
                                #AmazingCompany.
                              </li>
                              <li class="leading-[15px]">
                                Mention the location of your event
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="flex items-center gap-4 sm:w-auto w-full">
                          <button
                            class="border-[#0D64E8] border-[1px] rounded-md h-[40px] sm:w-auto w-full text-[14px] px-[14px] text-[#0D64E8]"
                            >Generate</button
                          >
                          <button
                            ><img src="/icons/right.svg" alt="right" /></button
                          >
                        </div>
                      </div>
                    </div>
                    <div class="bg-[#E4EFFF] rounded-xl p-4 mb-4">
                      <div
                        class="flex sm:flex-row flex-col justify-between sm:items-center items-start sm:gap-0 gap-4"
                      >
                        <div class="flex items-start gap-3 sm:w-auto w-full">
                          <img
                            src="/icons/user_group.svg"
                            alt="text"
                            class="w-[20px]"
                          />
                          <div>
                            <h2 class="text-[#0D64E8] text-[14px] font-medium">
                              Audience
                            </h2>
                            <p class="text-[#0D64E8] text-[12px]">
                              Narrow your location to optimally target your
                              audience:
                            </p>
                            <ul
                              class="text-[#0D64E8] text-[12px] list-disc pl-[24px]"
                            >
                              <li class="leading-[15px]">
                                Add surrounding location like Washington, USA,
                                Boston, USA.
                              </li>
                              <li class="leading-[15px]">
                                Remove distant location like London, UK.
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="flex items-center gap-4 sm:w-auto w-full">
                          <button
                            class="border-[#0D64E8] border-[1px] rounded-md h-[40px] sm:w-auto w-full text-[14px] px-[14px] text-[#0D64E8]"
                            >Apply</button
                          >
                          <button
                            ><img src="/icons/right.svg" alt="right" /></button
                          >
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        class="bg-white md:p-8 p-4 rounded-xl mt-5 border-[#D1D5DB] border-[1px] flex-1"
                      >
                        <div class="flex flex-col justify-between h-full">
                          <div class="flex flex-col gap-4">
                            <h1
                              class="flex items-center gap-2.5 font-bold text-lg text-font_dark"
                            >
                              <svg
                                width="45"
                                height="44"
                                viewBox="0 0 45 44"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M27.5 32.8333C26.5972 32.8333 25.8299 32.5174 25.1979 31.8854C24.566 31.2535 24.25 30.4861 24.25 29.5833C24.25 29.4569 24.259 29.326 24.2771 29.1906C24.2951 29.0552 24.3222 28.9333 24.3583 28.825L16.7208 24.3833C16.4139 24.6542 16.0708 24.8663 15.6917 25.0198C15.3125 25.1733 14.9153 25.25 14.5 25.25C13.5972 25.25 12.8299 24.934 12.1979 24.3021C11.566 23.6701 11.25 22.9028 11.25 22C11.25 21.0972 11.566 20.3299 12.1979 19.6979C12.8299 19.066 13.5972 18.75 14.5 18.75C14.9153 18.75 15.3125 18.8267 15.6917 18.9802C16.0708 19.1337 16.4139 19.3458 16.7208 19.6167L24.3583 15.175C24.3222 15.0667 24.2951 14.9448 24.2771 14.8094C24.259 14.674 24.25 14.5431 24.25 14.4167C24.25 13.5139 24.566 12.7465 25.1979 12.1146C25.8299 11.4826 26.5972 11.1667 27.5 11.1667C28.4028 11.1667 29.1701 11.4826 29.8021 12.1146C30.434 12.7465 30.75 13.5139 30.75 14.4167C30.75 15.3194 30.434 16.0868 29.8021 16.7187C29.1701 17.3507 28.4028 17.6667 27.5 17.6667C27.0847 17.6667 26.6875 17.5899 26.3083 17.4365C25.9292 17.283 25.5861 17.0708 25.2792 16.8L17.6417 21.2417C17.6778 21.35 17.7049 21.4719 17.7229 21.6073C17.741 21.7427 17.75 21.8736 17.75 22C17.75 22.1264 17.741 22.2573 17.7229 22.3927C17.7049 22.5281 17.6778 22.65 17.6417 22.7583L25.2792 27.2C25.5861 26.9292 25.9292 26.717 26.3083 26.5635C26.6875 26.4101 27.0847 26.3333 27.5 26.3333C28.4028 26.3333 29.1701 26.6493 29.8021 27.2812C30.434 27.9132 30.75 28.6806 30.75 29.5833C30.75 30.4861 30.434 31.2535 29.8021 31.8854C29.1701 32.5174 28.4028 32.8333 27.5 32.8333ZM27.5 15.5C27.8069 15.5 28.0642 15.3962 28.2719 15.1885C28.4795 14.9809 28.5833 14.7236 28.5833 14.4167C28.5833 14.1097 28.4795 13.8524 28.2719 13.6448C28.0642 13.4372 27.8069 13.3333 27.5 13.3333C27.1931 13.3333 26.9358 13.4372 26.7281 13.6448C26.5205 13.8524 26.4167 14.1097 26.4167 14.4167C26.4167 14.7236 26.5205 14.9809 26.7281 15.1885C26.9358 15.3962 27.1931 15.5 27.5 15.5ZM14.5 23.0833C14.8069 23.0833 15.0642 22.9795 15.2719 22.7719C15.4795 22.5642 15.5833 22.3069 15.5833 22C15.5833 21.6931 15.4795 21.4358 15.2719 21.2281C15.0642 21.0205 14.8069 20.9167 14.5 20.9167C14.1931 20.9167 13.9358 21.0205 13.7281 21.2281C13.5205 21.4358 13.4167 21.6931 13.4167 22C13.4167 22.3069 13.5205 22.5642 13.7281 22.7719C13.9358 22.9795 14.1931 23.0833 14.5 23.0833ZM27.5 30.6667C27.8069 30.6667 28.0642 30.5628 28.2719 30.3552C28.4795 30.1476 28.5833 29.8903 28.5833 29.5833C28.5833 29.2764 28.4795 29.0191 28.2719 28.8115C28.0642 28.6038 27.8069 28.5 27.5 28.5C27.1931 28.5 26.9358 28.6038 26.7281 28.8115C26.5205 29.0191 26.4167 29.2764 26.4167 29.5833C26.4167 29.8903 26.5205 30.1476 26.7281 30.3552C26.9358 30.5628 27.1931 30.6667 27.5 30.6667Z"
                                  fill="#0D64E8"
                                />
                                <rect
                                  x="1.5"
                                  y="1"
                                  width="42"
                                  height="42"
                                  rx="9"
                                  stroke="#0D64E8"
                                  stroke-width="2"
                                />
                              </svg>
                              Platform
                            </h1>
                            <hr class="bg-gray-200 h-[1px]" />
                            <div
                              class="bg-[#E4EFFF] rounded-md p-3 flex justify-between sm:gap-8 gap-4"
                            >
                              <div class="flex gap-1">
                                <svg
                                  class="min-w-4 min-h-4 mt-0.5"
                                  width="17"
                                  height="16"
                                  viewBox="0 0 17 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  ><path
                                    d="M8.5 2C5.18486 2 2.5 4.68486 2.5 8C2.5 11.3151 5.18486 14 8.5 14C11.8151 14 14.5 11.3151 14.5 8C14.5 4.68486 11.8151 2 8.5 2ZM12.2171 10.9677C11.835 11.335 11.3189 11.4739 10.7382 10.7345L8.99627 8.61538C8.7134 8.27295 8.18735 8.28288 7.91439 8.63027L6.29653 10.7146C5.67618 11.5087 5.1402 11.3201 4.74814 10.9132C4.11786 10.1042 3.74069 9.09677 3.74069 7.99504C3.74069 5.36973 5.87469 3.23573 8.5 3.23573C11.1253 3.23573 13.2593 5.36973 13.2593 7.99504C13.2593 9.11663 12.8672 10.1489 12.2171 10.9628V10.9677Z"
                                    fill="#0D64E8"
                                  /></svg
                                >
                                <div>
                                  <p
                                    class="text-[14px] font-medium text-[#0D64E8]"
                                  >
                                    Improve with Colocio:
                                  </p>
                                  <p class="text-[12px] text-[#0D64E8]">
                                    Add X to you platforms to reach your
                                    untapped audience
                                  </p>
                                </div>
                              </div>
                              <svg
                                class="min-w-4 min-h-4 mt-0.5"
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
                              >
                            </div>
                            <h2 class="text-gray-600 text-sm">Platform</h2>
                            <div class="flex flex-col">
                              <div class="text-sm text-gray-900 w-full h-full">
                                <div class="flex flex-col gap-2">
                                  {#each $platforms_ad as platform}
                                    <div class="flex gap-[10px]">
                                      <div class="text-center">
                                        <input
                                          id="green-checkbox"
                                          type="checkbox"
                                          bind:checked={platform.selected}
                                          on:change={() =>
                                            updateSelection(
                                              platform.name,
                                              platform.selected
                                            )}
                                          class="text-[#6FAA79] bg-gray-100 border-[#D5DAE1] border-[1px] rounded"
                                        />
                                      </div>
                                      <div class="w-[20px] h-[20px] text-left">
                                        <img
                                          src="/icons/{platform.name.toLowerCase()}.svg"
                                          alt={platform.name}
                                          class="w-[20px] h-[20px]"
                                        />
                                      </div>
                                      <div>
                                        <div>{platform.name}</div>
                                        {#if platform.description}<p
                                            class="text-gray-500 text-xs"
                                          >
                                            {platform.description}
                                          </p>{/if}
                                      </div>
                                    </div>
                                  {/each}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-white md:p-8 p-4 rounded-xl mt-5 border-[#D1D5DB] border-[1px] flex-1"
                      >
                        <div class="flex flex-col justify-between h-full">
                          <div class="flex flex-col gap-[20px]">
                            <h1
                              class="flex items-center gap-2.5 font-bold text-lg text-font_dark"
                            >
                              <svg
                                width="45"
                                height="44"
                                viewBox="0 0 45 44"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M26.875 30.875H17.2202C16.5891 30.875 16.2736 30.875 16.1275 30.7502C16.0007 30.6419 15.9334 30.4795 15.9465 30.3133C15.9616 30.1217 16.1847 29.8986 16.6309 29.4524L25.4882 20.5952C25.9007 20.1827 26.1069 19.9764 26.3448 19.8991C26.554 19.8311 26.7793 19.8311 26.9886 19.8991C27.2264 19.9764 27.4327 20.1827 27.8452 20.5952L31.875 24.625V25.875M26.875 30.875C28.6252 30.875 29.5002 30.875 30.1687 30.5344C30.7567 30.2348 31.2348 29.7567 31.5344 29.1687C31.875 28.5002 31.875 27.6252 31.875 25.875M26.875 30.875H18.125C16.3748 30.875 15.4998 30.875 14.8313 30.5344C14.2433 30.2348 13.7652 29.7567 13.4656 29.1687C13.125 28.5002 13.125 27.6252 13.125 25.875V17.125C13.125 15.3748 13.125 14.4998 13.4656 13.8313C13.7652 13.2433 14.2433 12.7652 14.8313 12.4656C15.4998 12.125 16.3748 12.125 18.125 12.125H26.875C28.6252 12.125 29.5002 12.125 30.1687 12.4656C30.7567 12.7652 31.2348 13.2433 31.5344 13.8313C31.875 14.4998 31.875 15.3748 31.875 17.125V25.875M20.9375 17.8542C20.9375 19.0048 20.0048 19.9375 18.8542 19.9375C17.7036 19.9375 16.7708 19.0048 16.7708 17.8542C16.7708 16.7036 17.7036 15.7708 18.8542 15.7708C20.0048 15.7708 20.9375 16.7036 20.9375 17.8542Z"
                                  stroke="#0D64E8"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <rect
                                  x="1.5"
                                  y="1"
                                  width="42"
                                  height="42"
                                  rx="9"
                                  stroke="#0D64E8"
                                  stroke-width="2"
                                />
                              </svg>
                              Media
                            </h1>
                            <hr class="bg-gray-200 h-[1px]" />
                            <div class="flex gap-4">
                              <div class="flex flex-col gap-1.5 relative">
                                <button
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
                                  src={post.full_picture}
                                  class="h-[120px] w-[120px] object-cover rounded-[10px]"
                                  alt="demo"
                                />
                                <div class="text-sm text-center text-gray-600">
                                  {imagename(post.postTypeImage)}
                                </div>
                              </div>

                              <button
                                on:click={() => {
                                  bool_modal_media.set(true);
                                }}
                                class="w-[120px] h-[120px] bg-transparent relative text-custom-gray-600 border border-dashed border-custom-gray-200 rounded-[10px] p-2.5 flex flex-col items-center justify-center"
                              >
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
                                <span>Add media</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-white md:p-8 p-4 rounded-xl mt-5 border-[#D1D5DB] border-[1px] flex-1"
                      >
                        <h1
                          class="flex items-center gap-2.5 text-lg text-font_dark"
                        >
                          <svg
                            width="45"
                            height="44"
                            viewBox="0 0 45 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M23.5416 17.2917H15.4166C14.2499 17.2917 13.6665 17.2917 13.2208 17.5187C12.8288 17.7185 12.5101 18.0372 12.3104 18.4292C12.0833 18.8748 12.0833 19.4582 12.0833 20.625V24.375C12.0833 25.5418 12.0833 26.1252 12.3104 26.5708C12.5101 26.9628 12.8288 27.2815 13.2208 27.4813C13.6665 27.7083 14.2499 27.7083 15.4166 27.7083H23.5416M27.7083 17.2917H29.5833C30.7501 17.2917 31.3335 17.2917 31.7791 17.5187C32.1711 17.7185 32.4898 18.0372 32.6896 18.4292C32.9166 18.8748 32.9166 19.4582 32.9166 20.625V24.375C32.9166 25.5418 32.9166 26.1252 32.6896 26.5708C32.4898 26.9628 32.1711 27.2815 31.7791 27.4813C31.3335 27.7083 30.7501 27.7083 29.5833 27.7083H27.7083M27.7083 31.875L27.7083 13.125M30.3125 13.125L25.1041 13.125M30.3125 31.875L25.1041 31.875"
                              stroke="#0D64E8"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <rect
                              x="1.5"
                              y="1"
                              width="42"
                              height="42"
                              rx="9"
                              stroke="#0D64E8"
                              stroke-width="2"
                            />
                          </svg>
                          <div class="font-bold">Text</div>
                        </h1>
                        <hr class="bg-gray-200 h-[1px] my-[20px]" />
                        <div
                          class="bg-[#E4EFFF] rounded-md p-3 flex justify-between sm:gap-8 gap-3"
                        >
                          <div class="flex gap-1">
                            <svg
                              class="min-w-4 min-h-4 mt-0.5"
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              ><path
                                d="M8.5 2C5.18486 2 2.5 4.68486 2.5 8C2.5 11.3151 5.18486 14 8.5 14C11.8151 14 14.5 11.3151 14.5 8C14.5 4.68486 11.8151 2 8.5 2ZM12.2171 10.9677C11.835 11.335 11.3189 11.4739 10.7382 10.7345L8.99627 8.61538C8.7134 8.27295 8.18735 8.28288 7.91439 8.63027L6.29653 10.7146C5.67618 11.5087 5.1402 11.3201 4.74814 10.9132C4.11786 10.1042 3.74069 9.09677 3.74069 7.99504C3.74069 5.36973 5.87469 3.23573 8.5 3.23573C11.1253 3.23573 13.2593 5.36973 13.2593 7.99504C13.2593 9.11663 12.8672 10.1489 12.2171 10.9628V10.9677Z"
                                fill="#0D64E8"
                              /></svg
                            >
                            <div>
                              <p class="text-[14px] font-medium text-[#0D64E8]">
                                Improve with Colocio:
                              </p>
                              <ul
                                class="text-[#0D64E8] text-[12px] list-disc pl-[22px]"
                              >
                                <li class="leading-[15px]">
                                  Add more Call-to-actions to your
                                  descriptions/captions.
                                </li>
                                <li class="leading-[15px]">
                                  Include your popular hashtags, e.g.
                                  #AmazingCompany.
                                </li>
                                <li class="leading-[15px]">
                                  Mention the location of your event
                                </li>
                              </ul>
                            </div>
                          </div>
                          <svg
                            class="min-w-4 min-h-4 mt-0.5"
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
                          >
                        </div>
                        <div class="flex items-center w-full gap-2.5 mt-[21px]">
                          <input
                            id="green-checkbox"
                            type="checkbox"
                            value=""
                            checked
                            disabled
                            class="w-4 h-4 text-[#E5E7EB] border-[#9CA3AF] rounded"
                          />
                          <div
                            class="text-gray-600 text-sm flex flex-1 items-center gap-1"
                          >
                            <div class="flex gap-1 items-center">
                              <p class="text-[#4B5563] text-[14px]">
                                Custom text for Facebook, Instagram, X and
                                Tiktok
                              </p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M8 1.99438C4.68629 1.99438 2 4.68068 2 7.99438C2 11.3081 4.68629 13.9944 8 13.9944C11.3137 13.9944 14 11.3081 14 7.99438C14 4.68068 11.3137 1.99438 8 1.99438ZM2.91455 7.99438C2.91455 5.18577 5.19138 2.90893 8 2.90893C10.8086 2.90893 13.0855 5.18577 13.0855 7.99438C13.0855 10.803 10.8086 13.0798 8 13.0798C5.19138 13.0798 2.91455 10.803 2.91455 7.99438ZM8.45727 7.99438C8.45727 7.74184 8.25255 7.53711 8 7.53711C7.74745 7.53711 7.54273 7.74184 7.54273 7.99438V10.2115C7.54273 10.464 7.74745 10.6687 8 10.6687C8.25255 10.6687 8.45727 10.464 8.45727 10.2115V7.99438ZM7.44573 6.33157C7.44573 6.02545 7.69388 5.77729 8 5.77729C8.30612 5.77729 8.55427 6.02545 8.55427 6.33157C8.55427 6.63768 8.30612 6.88584 8 6.88584C7.69388 6.88584 7.44573 6.63768 7.44573 6.33157Z"
                                  fill="#111827"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex items-center text-sm text-center border-b border-gray-200 my-5"
                        >
                          <button
                            type="button"
                            on:click={() => {
                              tab_selected = "facebook";
                            }}
                            class={tab_selected === "facebook"
                              ? "w-[115px] flex items-center gap-1 justify-center pb-2 border-b-[#0d64e8] border-b-[1px]"
                              : "w-[115px] flex items-center gap-1 justify-center pb-2"}
                          >
                            <svg
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.9785 9.3L11.334 6.9835H9.11127V5.48025C9.11127 4.8465 9.42177 4.22875 10.4173 4.22875H11.4278V2.2565C11.4278 2.2565 10.5108 2.1 9.63402 2.1C7.80352 2.1 6.60702 3.2095 6.60702 5.218V6.9835H4.57227V9.3H6.60702V14.9H9.11127V9.3H10.9785Z"
                                fill={tab_selected == "facebook"
                                  ? "#0D64E8"
                                  : "#111827"}
                              />
                            </svg>
                            <span
                              class="text-gray-600"
                              class:text-gray-600={tab_selected != "facebook"}
                              class:text-blue-primary={tab_selected ==
                                "facebook"}>Facebook</span
                            >
                          </button>
                          <button
                            type="button"
                            on:click={() => {
                              tab_selected = "instagram";
                            }}
                            class={tab_selected === "instagram"
                              ? "w-[115px] flex items-center gap-1 justify-center pb-2 border-b-[#0d64e8] border-b-[1px]"
                              : "w-[115px] flex items-center gap-1 justify-center pb-2"}
                          >
                            <svg
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.33333 2.5C3.49533 2.5 2 3.99533 2 5.83333V11.1667C2 13.0047 3.49533 14.5 5.33333 14.5H10.6667C12.5047 14.5 14 13.0047 14 11.1667V5.83333C14 3.99533 12.5047 2.5 10.6667 2.5H5.33333ZM5.33333 3.83333H10.6667C11.7693 3.83333 12.6667 4.73067 12.6667 5.83333V11.1667C12.6667 12.2693 11.7693 13.1667 10.6667 13.1667H5.33333C4.23067 13.1667 3.33333 12.2693 3.33333 11.1667V5.83333C3.33333 4.73067 4.23067 3.83333 5.33333 3.83333ZM11.3333 4.5C11.1565 4.5 10.987 4.57024 10.8619 4.69526C10.7369 4.82029 10.6667 4.98986 10.6667 5.16667C10.6667 5.34348 10.7369 5.51305 10.8619 5.63807C10.987 5.7631 11.1565 5.83333 11.3333 5.83333C11.5101 5.83333 11.6797 5.7631 11.8047 5.63807C11.9298 5.51305 12 5.34348 12 5.16667C12 4.98986 11.9298 4.82029 11.8047 4.69526C11.6797 4.57024 11.5101 4.5 11.3333 4.5ZM8 5.16667C6.162 5.16667 4.66667 6.662 4.66667 8.5C4.66667 10.338 6.162 11.8333 8 11.8333C9.838 11.8333 11.3333 10.338 11.3333 8.5C11.3333 6.662 9.838 5.16667 8 5.16667ZM8 6.5C9.10267 6.5 10 7.39733 10 8.5C10 9.60267 9.10267 10.5 8 10.5C6.89733 10.5 6 9.60267 6 8.5C6 7.39733 6.89733 6.5 8 6.5Z"
                                fill={tab_selected == "instagram"
                                  ? "#0D64E8"
                                  : "#111827"}
                              />
                            </svg>
                            <span
                              class="text-gray-600"
                              class:text-gray-600={tab_selected != "instagram"}
                              class:text-blue-primary={tab_selected ==
                                "instagram"}>Instagram</span
                            >
                          </button>
                        </div>
                        {#if tab_selected === "facebook"}
                          <div>
                            <div>
                              <div>
                                <label
                                  class="text-[#4B5563] text-[14px] font-medium block"
                                  >Description</label
                                >
                                <input
                                  type="text"
                                  value="Don’t miss out on our amazing Summer Packages."
                                  class="border-[#D1D5DB] border-[1px] h-[40px] mt-1 rounded-md w-full text-[14px] px-[15px]"
                                />
                              </div>
                              <div class="mt-5">
                                <label
                                  class="text-[#4B5563] text-[14px] font-medium block"
                                  >Headline 1</label
                                >
                                <input
                                  type="text"
                                  value="Get yours now!"
                                  class="border-[#D1D5DB] border-[1px] h-[40px] mt-1 rounded-md w-full text-[14px] px-[15px]"
                                />
                              </div>
                              <div class="mt-5">
                                <label
                                  class="text-[#4B5563] text-[14px] font-medium block"
                                  >Headline 2</label
                                >
                                <input
                                  type="text"
                                  value="Buy online!"
                                  class="border-[#D1D5DB] border-[1px] h-[40px] mt-1 rounded-md w-full text-[14px] px-[15px]"
                                />
                              </div>
                            </div>
                            <div class="flex items-center w-full gap-2.5 mt-5">
                              <input
                                id="green-checkbox"
                                type="checkbox"
                                checked
                                class="w-4 h-4 text-[#6FAA79] bg-gray-100 border-gray-300 rounded"
                              />
                              <label
                                class="text-gray-600 text-sm flex flex-1 items-center gap-1"
                              >
                                Show button
                              </label>
                            </div>
                            <div class="flex flex-col gap-1 mt-5">
                              <label
                                for="action"
                                class="font-medium text-gray-600 text-[14px]"
                                >Button text</label
                              >
                              <div class="flex items-center w-full gap-3">
                                <select
                                  id="action"
                                  class="bg-white border w-72 border-gray-300 text-[#4B5563] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                >
                                  <option value="Shop now">Shop now</option>
                                  <option value="Go">Go</option>
                                  <option value="Buy it">Buy it</option>
                                  <option value="Show me">Show me</option>
                                </select>
                              </div>
                            </div>
                            <div class="flex flex-col gap-1 mt-5">
                              <label
                                for="url_action"
                                class="font-medium text-gray-600 text-[14px]"
                                >URL</label
                              >
                              <div class="flex items-center gap-3">
                                <div class="flex-1">
                                  <input
                                    type="text"
                                    id="url_action"
                                    value="https://amazingcompany.com/shop"
                                    class="bg-white border border-gray-300 text-[#4B5563] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        {/if}
                        {#if tab_selected === "instagram"}
                          <div>
                            <div>
                              <div>
                                <label
                                  class="text-[#4B5563] text-[14px] font-medium block"
                                  >Description</label
                                >
                                <input
                                  type="text"
                                  value="Don’t miss out on our amazing Summer Packages."
                                  class="border-[#D1D5DB] border-[1px] h-[40px] mt-1 rounded-md w-full text-[14px] px-[15px]"
                                />
                              </div>
                              <div class="mt-5">
                                <label
                                  class="text-[#4B5563] text-[14px] font-medium block"
                                  >Headline 1</label
                                >
                                <input
                                  type="text"
                                  value="Get yours now!"
                                  class="border-[#D1D5DB] border-[1px] h-[40px] mt-1 rounded-md w-full text-[14px] px-[15px]"
                                />
                              </div>
                              <div class="mt-5">
                                <label
                                  class="text-[#4B5563] text-[14px] font-medium block"
                                  >Headline 2</label
                                >
                                <input
                                  type="text"
                                  value="Buy online!"
                                  class="border-[#D1D5DB] border-[1px] h-[40px] mt-1 rounded-md w-full text-[14px] px-[15px]"
                                />
                              </div>
                            </div>
                            <div class="flex items-center w-full gap-2.5 mt-5">
                              <input
                                id="green-checkbox"
                                type="checkbox"
                                checked
                                class="w-4 h-4 text-[#6FAA79] bg-gray-100 border-gray-300 rounded"
                              />
                              <label
                                class="text-gray-600 text-sm flex flex-1 items-center gap-1"
                              >
                                Show button
                              </label>
                            </div>
                            <div class="flex flex-col gap-1 mt-5">
                              <label
                                for="action"
                                class="font-medium text-gray-600 text-[14px]"
                                >Button text</label
                              >
                              <div class="flex items-center w-full gap-3">
                                <select
                                  id="action"
                                  class="bg-white border w-72 border-gray-300 text-[#4B5563] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                >
                                  <option value="Shop now">Shop now</option>
                                  <option value="Go">Go</option>
                                  <option value="Buy it">Buy it</option>
                                  <option value="Show me">Show me</option>
                                </select>
                              </div>
                            </div>
                            <div class="flex flex-col gap-1 mt-5">
                              <label
                                for="url_action"
                                class="font-medium text-gray-600 text-[14px]"
                                >URL</label
                              >
                              <div class="flex items-center gap-3">
                                <div class="flex-1">
                                  <input
                                    type="text"
                                    id="url_action"
                                    value="https://amazingcompany.com/shop"
                                    class="bg-white border border-gray-300 text-[#4B5563] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        {/if}
                      </div>
                      <div
                        class="bg-white md:p-8 p-4 rounded-xl mt-5 border-[#D1D5DB] border-[1px] flex-1"
                      >
                        <div>
                          <h1
                            class="flex items-center gap-2.5 text-lg text-font_dark"
                          >
                            <svg
                              width="45"
                              height="44"
                              viewBox="0 0 45 44"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M28.417 30.6667H33.8337V28.5C33.8337 26.7051 32.3786 25.25 30.5837 25.25C29.5484 25.25 28.6262 25.734 28.0311 26.4881M28.417 30.6667H17.5837M28.417 30.6667V28.5C28.417 27.7891 28.28 27.1101 28.0311 26.4881M17.5837 30.6667H12.167V28.5C12.167 26.7051 13.6221 25.25 15.417 25.25C16.4522 25.25 17.3744 25.734 17.9696 26.4881M17.5837 30.6667V28.5C17.5837 27.7891 17.7206 27.1101 17.9696 26.4881M17.9696 26.4881C18.7683 24.4928 20.7197 23.0833 23.0003 23.0833C25.2809 23.0833 27.2324 24.4928 28.0311 26.4881M26.2503 16.5833C26.2503 18.3783 24.7953 19.8333 23.0003 19.8333C21.2054 19.8333 19.7503 18.3783 19.7503 16.5833C19.7503 14.7884 21.2054 13.3333 23.0003 13.3333C24.7953 13.3333 26.2503 14.7884 26.2503 16.5833ZM32.7503 19.8333C32.7503 21.03 31.7803 22 30.5837 22C29.387 22 28.417 21.03 28.417 19.8333C28.417 18.6367 29.387 17.6667 30.5837 17.6667C31.7803 17.6667 32.7503 18.6367 32.7503 19.8333ZM17.5837 19.8333C17.5837 21.03 16.6136 22 15.417 22C14.2204 22 13.2503 21.03 13.2503 19.8333C13.2503 18.6367 14.2204 17.6667 15.417 17.6667C16.6136 17.6667 17.5837 18.6367 17.5837 19.8333Z"
                                stroke="#0D64E8"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <rect
                                x="1.5"
                                y="1"
                                width="42"
                                height="42"
                                rx="9"
                                stroke="#0D64E8"
                                stroke-width="2"
                              />
                            </svg>
                            <div>
                              <div class="font-bold">Audience</div>
                            </div>
                          </h1>
                          <hr class="bg-gray-200 h-[1px] my-4" />
                          <div
                            class="bg-[#E4EFFF] rounded-md p-3 flex justify-between sm:gap-8 gap-4"
                          >
                            <div class="flex gap-1">
                              <svg
                                class="min-w-4 min-h-4 mt-0.5"
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                  d="M8.5 2C5.18486 2 2.5 4.68486 2.5 8C2.5 11.3151 5.18486 14 8.5 14C11.8151 14 14.5 11.3151 14.5 8C14.5 4.68486 11.8151 2 8.5 2ZM12.2171 10.9677C11.835 11.335 11.3189 11.4739 10.7382 10.7345L8.99627 8.61538C8.7134 8.27295 8.18735 8.28288 7.91439 8.63027L6.29653 10.7146C5.67618 11.5087 5.1402 11.3201 4.74814 10.9132C4.11786 10.1042 3.74069 9.09677 3.74069 7.99504C3.74069 5.36973 5.87469 3.23573 8.5 3.23573C11.1253 3.23573 13.2593 5.36973 13.2593 7.99504C13.2593 9.11663 12.8672 10.1489 12.2171 10.9628V10.9677Z"
                                  fill="#0D64E8"
                                /></svg
                              >
                              <div>
                                <p
                                  class="text-[14px] font-medium text-[#0D64E8]"
                                >
                                  Improve with Colocio:
                                </p>
                                <p class="text-[#0D64E8] text-[12px]">
                                  Narrow your location to optimally target your
                                  audience:
                                </p>
                                <ul
                                  class="text-[#0D64E8] text-[12px] list-disc pl-[24px]"
                                >
                                  <li class="leading-[15px]">
                                    Add surrounding location like Washington,
                                    USA, Boston, USA.
                                  </li>
                                  <li class="leading-[15px]">
                                    Remove distant location like London, UK.
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <svg
                              class="min-w-4 min-h-4 mt-0.5"
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
                            >
                          </div>
                          <div>
                            <h3
                              class="text-font_dark font-bold my-4 text-[14px]"
                            >
                              Demographic
                            </h3>
                            <div
                              class="sm:grid flex sm:flex-none flex-col grid-cols-2 gap-4 mb-8"
                            >
                              <div class="col-span-1 flex flex-col gap-1">
                                <label
                                  for="age"
                                  class="font-medium text-gray-600 text-[14px]"
                                  >Age</label
                                >
                                <select
                                  bind:value={$audienceData.age}
                                  id="age"
                                  class="bg-white border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 h-[40px]"
                                >
                                  <option value="12-18">12 - 18</option>
                                  <option value="18-24">18 - 24</option>
                                  <option value="24-30">24 - 30</option>
                                  <option value="30-40">30 - 40</option>
                                  <option value="40-50">40 - 50</option>
                                  <option value="27 - 65">27 - 65</option>
                                </select>
                              </div>
                              <div class="col-span-1 flex flex-col gap-1">
                                <label
                                  for="age"
                                  class="font-medium text-gray-600 text-[14px]"
                                  >Gender</label
                                >
                                <select
                                  bind:value={$audienceData.gender}
                                  id="age"
                                  class="bg-white border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 h-[40px]"
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="All">All</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                              <div class="col-span-1 flex flex-col gap-1">
                                <label
                                  for="age"
                                  class="font-medium text-gray-600 text-[14px]"
                                  >Location</label
                                >
                                <div class="relative">
                                  <input
                                    type="text"
                                    id="headline_2"
                                    class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[40px]"
                                    bind:value={location}
                                    on:keyup={(e) => {
                                      if (e.key == "Enter") addLocation();
                                    }}
                                  />
                                  <button
                                    type="button"
                                    class="bg-transparent absolute right-3 top-3"
                                    on:click={addLocation}
                                  >
                                    {#if location == ""}
                                      <img
                                        src="/icons/search.svg"
                                        alt="plus"
                                        class="w-5 h-5"
                                      />
                                    {:else}
                                      <img
                                        src="/icons/plus.svg"
                                        alt="plus"
                                        class="w-5 h-5"
                                      />
                                    {/if}
                                  </button>
                                </div>

                                <div
                                  class="flex flex-wrap col-span-2 gap-2 mt-2"
                                >
                                  {#each $audienceData.locations as loc}
                                    <button
                                      on:click={() => removeLocation(loc)}
                                      type="button"
                                      class={`px-3 py-2 bg-blue-bglight text-blue-primary border rounded-md border-gray-300 gap-2 flex items-center justify-between text-[14px] h-[32px]
                                      ${
                                        loc.selected
                                          ? "!bg-[#F4F9FF] !border-[#E4EFFF]"
                                          : ""
                                      }`}
                                      class:bg-white={!loc.selected}
                                      class:text-blue-primary={loc.selected}
                                      class:text-gray-600={!loc.selected}
                                      on:click={() => {
                                        loc.selected = !loc.selected;
                                        $audienceData.update((data) => ({
                                          ...data,
                                        }));
                                      }}
                                    >
                                      {loc.name}
                                      {#if loc.selected}
                                        <img
                                          src="/icons/close_blue.svg"
                                          alt="Remove"
                                          class="w-5 h-5"
                                        />
                                      {:else}
                                        <img
                                          src="/icons/plus.svg"
                                          alt="Add"
                                          class="w-5 h-5"
                                        />
                                      {/if}
                                    </button>
                                  {/each}
                                </div>
                              </div>
                              <hr class="bg-gray-200 h-[1px] col-span-2" />

                              <h3
                                class="text-font_dark font-bold col-span-2 text-[14px]"
                              >
                                Interests and behaviours
                              </h3>

                              <div class="col-span-1 flex flex-col gap-1">
                                <label
                                  for="age"
                                  class="font-medium text-gray-600 text-[14px]"
                                  >Add interests/behaviours</label
                                >
                                <p class="text-gray-500 text-xs text-[12px]">
                                  e.g. shops online, music festivals
                                </p>
                                <div class="relative">
                                  <input
                                    type="text"
                                    bind:value={interest.name}
                                    id="interest"
                                    class="bg-white border border-gray-300 text-gray-900
                                  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                  block w-full p-2.5 h-[40px]"
                                    on:keyup={(e) => {
                                      if (e.key == "Enter") addInterest();
                                    }}
                                  />
                                  <button
                                    type="button"
                                    class="bg-transparent absolute right-3 top-3"
                                    on:click={addInterest}
                                  >
                                    <img
                                      src="/icons/plus.svg"
                                      alt="plus"
                                      class="w-5 h-5"
                                    />
                                  </button>
                                </div>
                              </div>
                              <div class="flex flex-wrap col-span-2 gap-2">
                                {#each $audienceData.interests as interest}
                                  <button
                                    type="button"
                                    class={`px-3 py-2 bg-blue-bglight text-blue-primary border rounded-md border-gray-300 gap-2 flex items-center justify-between h-[32px] text-[14px] ${
                                      interest.selected
                                        ? "!bg-[#F4F9FF] !border-[#E4EFFF]"
                                        : ""
                                    }`}
                                    class:bg-white={!interest.selected}
                                    class:text-blue-primary={interest.selected}
                                    class:text-gray-600={!interest.selected}
                                    on:click={() => {
                                      interest.selected = !interest.selected;
                                      $audienceData.update((data) => ({
                                        ...data,
                                        interests: [...data.interests],
                                      }));
                                    }}
                                  >
                                    {interest.name}
                                    {#if interest.selected}
                                      <img
                                        src="/icons/close_blue.svg"
                                        alt="Remove"
                                        class="w-5 h-5"
                                      />
                                    {:else}
                                      <img
                                        src="/icons/plus.svg"
                                        alt="Add"
                                        class="w-5 h-5"
                                      />
                                    {/if}
                                  </button>
                                {/each}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-white md:p-8 p-4 rounded-xl mt-5 border-[#D1D5DB] border-[1px] flex-1"
                      >
                        <div class="flex flex-col gap-[20px] pb-6">
                          <h1
                            class="flex items-center gap-2.5 text-lg text-font_dark"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="44"
                              height="44"
                              viewBox="0 0 44 44"
                              fill="none"
                            >
                              <path
                                d="M31 21.5V18.8C31 17.1198 31 16.2798 30.673 15.638C30.3854 15.0735 29.9265 14.6146 29.362 14.327C28.7202 14 27.8802 14 26.2 14H17.8C16.1198 14 15.2798 14 14.638 14.327C14.0735 14.6146 13.6146 15.0735 13.327 15.638C13 16.2798 13 17.1198 13 18.8V27.2C13 28.8802 13 29.7202 13.327 30.362C13.6146 30.9265 14.0735 31.3854 14.638 31.673C15.2798 32 16.1198 32 17.8 32H22.5M31 20H13M26 12V16M18 12V16M28 31V25M25 28H31"
                                stroke="#0D64E8"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <rect
                                x="1"
                                y="1"
                                width="42"
                                height="42"
                                rx="9"
                                stroke="#0D64E8"
                                stroke-width="2"
                              />
                            </svg>
                            <div>
                              <div class="font-bold">Schedule</div>
                              <div class="text-blue-primary text-xs">
                                <span class="font-bold"
                                  >{percent_optimization}%</span
                                > of text optimized
                              </div>
                            </div>
                          </h1>

                          <hr class="bg-gray-200 h-[1px]" />

                          <div
                            class="flex sm:flex-row flex-col bg-blue-bglight text-blue-primary text-sm p-3 rounded-md relative gap-8 items-end"
                          >
                            <div class="flex-1 flex gap-1">
                              <div>
                                <svg
                                  class="min-w-4 min-h-4 mt-0.5"
                                  width="17"
                                  height="16"
                                  viewBox="0 0 17 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.5 2C5.18486 2 2.5 4.68486 2.5 8C2.5 11.3151 5.18486 14 8.5 14C11.8151 14 14.5 11.3151 14.5 8C14.5 4.68486 11.8151 2 8.5 2ZM12.2171 10.9677C11.835 11.335 11.3189 11.4739 10.7382 10.7345L8.99627 8.61538C8.7134 8.27295 8.18735 8.28288 7.91439 8.63027L6.29653 10.7146C5.67618 11.5087 5.1402 11.3201 4.74814 10.9132C4.11786 10.1042 3.74069 9.09677 3.74069 7.99504C3.74069 5.36973 5.87469 3.23573 8.5 3.23573C11.1253 3.23573 13.2593 5.36973 13.2593 7.99504C13.2593 9.11663 12.8672 10.1489 12.2171 10.9628V10.9677Z"
                                    fill="#0D64E8"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div class="font-semibold">
                                  Colocio recommends:
                                </div>
                                <div class="text-xs">
                                  Daily spend of $500.00 from 1 December 2023 to
                                  23 December 2023 to ensure the optimal reach
                                  of up to 1 500k new viewers and an 80%
                                  increase in engagement.
                                </div>
                              </div>
                            </div>
                            <!-- on:click={applyRecommendation} -->
                            <button
                              type="button"
                              class="text-white flex items-center justify-center gap-2 bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm py-2.5 h-[32px] text-[14px] sm:max-w-[66px] max-w-full w-full px-[14px]"
                            >
                              Apply
                            </button>
                          </div>
                          <div>
                            <h3
                              class="text-font_dark font-bold mb-4 text-[14px]"
                            >
                              Duration
                            </h3>
                            <div
                              class="sm:grid flex sm:flex-none flex-col grid-cols-2 gap-[20px]"
                            >
                              <div class="col-span-1 flex flex-col gap-1">
                                <label
                                  for="start"
                                  class="font-medium text-gray-600 text-[14px]"
                                  >Start date/time</label
                                >
                                <div class="relative">
                                  <input
                                    type="text"
                                    bind:value={schedule_infos.start}
                                    id="start"
                                    class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  />
                                  <span
                                    class="bg-transparent absolute right-3 top-3"
                                  >
                                    <img
                                      src="/icons/calendar_black.svg"
                                      alt="calendar"
                                      class="w-4 h-4"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div class="flex items-center col-span-2">
                                <input
                                  id="green-radio"
                                  type="radio"
                                  value=""
                                  name="colored-radio"
                                  class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                                />
                                <label
                                  for="green-radio"
                                  class="ml-2 text-sm text-gray-600"
                                  >Run ad continuously</label
                                >
                              </div>
                              <div class="flex items-center col-span-2">
                                <input
                                  id="green-radio"
                                  type="radio"
                                  value=""
                                  name="colored-radio"
                                  class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                                />
                                <label
                                  for="green-radio"
                                  class="ml-2 text-sm text-gray-600"
                                  >Choose end date/time</label
                                >
                              </div>
                              <div class="col-span-1 flex flex-col gap-1">
                                <label
                                  for="start"
                                  class="font-medium text-gray-600 text-[14px]"
                                  >End date/time</label
                                >
                                <div class="relative">
                                  <input
                                    type="text"
                                    bind:value={schedule_infos.end}
                                    id="start"
                                    class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  />
                                  <span
                                    class="bg-transparent absolute right-3 top-3"
                                  >
                                    <img
                                      src="/icons/calendar_black.svg"
                                      alt="calendar"
                                      class="w-4 h-4"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div class="col-span-1 flex flex-col gap-1">
                                <label
                                  for="age"
                                  class="font-medium text-gray-600 text-[14px]"
                                  >Days</label
                                >
                                <select
                                  bind:value={schedule_infos.days}
                                  id="age"
                                  class="bg-white border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                >
                                  {#each Array(30) as day, index}
                                    <option value={index}>{index}</option>
                                  {/each}
                                </select>
                              </div>
                              <hr class="bg-gray-200 h-[1px] col-span-2" />
                              <div class="col-span-2">
                                <h3
                                  class="text-font_dark font-bold text-[14px]"
                                >
                                  Budget
                                </h3>
                                <div class="flex items-center my-[20px]">
                                  <input
                                    checked
                                    id="green-checkbox"
                                    type="checkbox"
                                    value=""
                                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                  />
                                  <label
                                    for="green-radio"
                                    class="ml-2 text-sm text-gray-600"
                                    >Allow me to boost campaign at any stage</label
                                  >
                                </div>
                                <div
                                  class=" flex flex-col justify-center items-center gap-2"
                                  style="display: none;"
                                >
                                  <span class="text-gray-600 font-medium"
                                    >Daily spend</span
                                  >
                                  <span
                                    class="p-4 border border-gray-300 text-3xl font-bold text-gray-600 rounded-md w-[300px] text-center mt-2"
                                    >$ {schedule_infos.daily_spend}</span
                                  >
                                </div>

                                <div
                                  class=" flex flex-col justify-center items-center gap-2"
                                >
                                  <span class="text-gray-600 font-medium"
                                    >Total daily spend</span
                                  >
                                  <span
                                    class="p-[12px] border border-gray-300 text-[28px] h-[61px] font-bold text-gray-600 rounded-md sm:w-[303px] w-full text-center"
                                    >$ {reach_range}</span
                                  >
                                </div>
                                <div class=" items-center flex gap-2 mt-5">
                                  <p class="text-gray-600 text-xs flex">$ 0</p>

                                  <input
                                    id="range-reach"
                                    type="range"
                                    bind:value={reach_range}
                                    class="flex-1 h-1 bg-gray-200 rounded-lg appearance-none range-slider"
                                    style="background: linear-gradient(to right, #0d64e8 0%, #0d64e8 {reach_range}%, #d3d3d3 {reach_range}%, #d3d3d3 100%);"
                                  />
                                  <p class="text-gray-600 text-xs flex">
                                    $ 2000
                                  </p>
                                </div>
                              </div>
                              <hr class="bg-gray-200 h-[1px] col-span-2" />
                              <div class="col-span-2">
                                <h3
                                  class="text-font_dark font-bold text-[14px]"
                                >
                                  Reach
                                </h3>
                                <div
                                  class=" flex flex-col justify-center items-center gap-2"
                                >
                                  <span class="text-gray-600 font-medium"
                                    >Daily audience reached (Goal)</span
                                  >
                                  <span
                                    class="p-[12px] border border-gray-300 text-[28px] h-[61px] font-bold text-gray-600 rounded-md sm:w-[303px] w-full text-center"
                                    >$ {budget_range}</span
                                  >
                                </div>
                                <div class=" items-center flex gap-2 mt-5">
                                  <p class="text-gray-600 text-xs flex">$ 0</p>

                                  <input
                                    id="range-reach"
                                    type="range"
                                    bind:value={budget_range}
                                    class="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointe range-slider"
                                    style="background: linear-gradient(to right, #0d64e8 0%, #0d64e8 {budget_range}%, #d3d3d3 {budget_range}%, #d3d3d3 100%);"
                                  />

                                  <p class="text-gray-600 text-xs flex">
                                    $ 2000
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-end gap-2 mt-[16px]">
                      <button
                        on:click={toggleModal}
                        class="border-[#D1D5DB] border-[1px] rounded-md h-[40px] sm:max-w-[72px] max-w-full w-full text-[14px] px-[13px]"
                        >Cancel</button
                      >
                      <button
                        class="bg-[#0D64E8] text-white rounded-md h-[40px] sm:w-[100px] w-full flex justify-center items-center gap-2 text-[14px]"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.6612 3.125C13.7625 3.125 13.8597 3.16524 13.9313 3.23687L16.7631 6.06869C16.8348 6.14032 16.875 6.23746 16.875 6.33876V16.4931C16.875 16.704 16.704 16.875 16.4931 16.875H3.50694C3.296 16.875 3.125 16.704 3.125 16.4931V3.50694C3.125 3.296 3.296 3.125 3.50694 3.125H13.6612Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.18056 11.1458C6.18056 10.9349 6.35156 10.7639 6.5625 10.7639H13.4375C13.6484 10.7639 13.8194 10.9349 13.8194 11.1458V16.4931C13.8194 16.704 13.6484 16.875 13.4375 16.875H6.5625C6.35156 16.875 6.18056 16.704 6.18056 16.4931V11.1458Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.94444 3.50694C6.94444 3.296 7.11545 3.125 7.32639 3.125H12.6736C12.8846 3.125 13.0556 3.296 13.0556 3.50694V6.5625C13.0556 6.77344 12.8846 6.94444 12.6736 6.94444H7.32639C7.11545 6.94444 6.94444 6.77344 6.94444 6.5625V3.50694Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                          />
                        </svg> Save</button
                      >
                    </div>
                  </div>
                  <div>
                    <SocialMedia />
                    <div
                      class="bg-white border-[#D1D5DB] border-[1px] md:p-8 p-4 rounded-[10px] mt-4"
                    >
                      <div class="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                        >
                          <path
                            d="M10.5 2C4.69851 2 0 5.80356 0 10.5C0 15.1964 4.69851 19 10.5 19C16.3015 19 21 15.1964 21 10.5C21 5.80356 16.3015 2 10.5 2ZM17.005 14.7043C16.3362 15.2246 15.433 15.4214 14.4169 14.3739L11.3685 11.3718C10.8734 10.8867 9.95285 10.9007 9.47519 11.3929L6.64393 14.3457C5.55832 15.4706 4.62035 15.2035 3.93424 14.627C2.83126 13.481 2.17122 12.0538 2.17122 10.493C2.17122 6.77378 5.9057 3.75062 10.5 3.75062C15.0943 3.75062 18.8288 6.77378 18.8288 10.493C18.8288 12.0819 18.1427 13.5443 17.005 14.6973V14.7043Z"
                            fill="#0D64E8"
                          />
                        </svg>
                        <p class="text-[#111827] text-[18px] font-semibold">
                          Colocio optimized
                        </p>
                      </div>
                      <div
                        class="flex items-center bg-blue-bglight text-blue-primary text-sm sm:p-[16px] p-[6px] rounded-md relative max-w-[328px] w-full mt-4"
                      >
                        <div
                          class="flex gap-4 items-center pr-[16px] py-[6.5px]"
                        >
                          <svg
                            width="66"
                            height="65"
                            viewBox="0 0 66 65"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33 1.38382e-05C50.9492 1.30536e-05 65.5 14.5508 65.5 32.5C65.5 50.4492 50.9492 65 33 65C15.0507 65 0.499999 50.4493 0.499999 32.5C0.499998 14.5508 15.0507 1.46228e-05 33 1.38382e-05ZM33 47.8205C41.4613 47.8205 48.3205 40.9613 48.3205 32.5C48.3205 24.0387 41.4613 17.1795 33 17.1795C24.5387 17.1795 17.6795 24.0387 17.6795 32.5C17.6795 40.9613 24.5387 47.8205 33 47.8205Z"
                              fill="#589AFF"
                            />
                            <path
                              d="M33 1.38382e-05C38.1207 1.36143e-05 43.169 1.21002 47.7333 3.53141C52.2976 5.8528 56.2488 9.21987 59.2648 13.3582C62.2808 17.4965 64.2762 22.2889 65.0885 27.3448C65.9008 32.4007 65.5068 37.5769 63.9388 42.4517C62.3709 47.3264 59.6732 51.7617 56.0657 55.3959C52.4582 59.0302 48.043 61.7606 43.1799 63.3645C38.3169 64.9685 33.1437 65.4006 28.0819 64.6257C23.0201 63.8508 18.2131 61.8908 14.0527 58.9055L24.0682 44.9476C26.0295 46.3549 28.2955 47.2788 30.6816 47.6441C33.0677 48.0094 35.5064 47.8057 37.7988 47.0496C40.0913 46.2935 42.1726 45.0064 43.8732 43.2932C45.5737 41.58 46.8454 39.4892 47.5846 37.1912C48.3237 34.8933 48.5094 32.4532 48.1265 30.0698C47.7436 27.6865 46.803 25.4273 45.3812 23.4765C43.9595 21.5257 42.0969 19.9385 39.9453 18.8442C37.7937 17.7499 35.4139 17.1795 33 17.1795L33 1.38382e-05Z"
                              fill="#0D64E8"
                            />
                          </svg>
                        </div>
                        <div class="flex flex-col text-blue-primary text-sm">
                          <div class="flex items-center gap-1 mb-1">
                            <img
                              src="/icons/colocio.svg"
                              alt="Instagram"
                              class="w-4 h-4"
                            />
                            <p class="text-blue-primary text-[14px]">
                              Optimised 60%
                            </p>
                          </div>
                          <div class="flex items-center">
                            <p class="w-24 text-[12px]">Text</p>
                            <p class=" text-[12px]">100%</p>
                          </div>
                          <div class="flex items-center">
                            <p class="w-24 text-[12px]">Audience</p>
                            <p class=" text-[12px]">50%</p>
                          </div>
                          <div class="flex items-center">
                            <p class="w-24 text-[12px]">Schedule</p>
                            <p class=" text-[12px]">65%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="bg-white border-[#D1D5DB] border-[1px] md:p-8 p-4 rounded-[10px] mt-4"
                    >
                      <div class="flex flex-col gap-4 pb-6">
                        <h2 class="flex gap-2.5 text-lg text-font_dark">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.4995 13.5001L20.9995 3.00005M10.6271 13.8281L13.2552 20.5861C13.4867 21.1815 13.6025 21.4791 13.7693 21.566C13.9139 21.6414 14.0862 21.6415 14.2308 21.5663C14.3977 21.4796 14.5139 21.1821 14.7461 20.587L21.3364 3.69925C21.5461 3.16207 21.6509 2.89348 21.5935 2.72185C21.5437 2.5728 21.4268 2.45583 21.2777 2.40604C21.1061 2.34871 20.8375 2.45352 20.3003 2.66315L3.41258 9.25349C2.8175 9.48572 2.51997 9.60183 2.43326 9.76873C2.35809 9.91342 2.35819 10.0857 2.43353 10.2303C2.52043 10.3971 2.81811 10.5128 3.41345 10.7444L10.1715 13.3725C10.2923 13.4195 10.3527 13.443 10.4036 13.4793C10.4487 13.5114 10.4881 13.5509 10.5203 13.596C10.5566 13.6468 10.5801 13.7073 10.6271 13.8281Z"
                              stroke="#0D64E8"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>

                          <div>
                            <div
                              class="text-[#111827] text-[18px] font-semibold leading-[21px]"
                            >
                              Estimated results
                            </div>
                          </div>
                        </h2>
                        <hr class="bg-gray-200 h-[1px]" />
                        <div class="flex flex-col">
                          <h3 class="text-font_dark font-medium text-[14px]">
                            Accounts reached
                          </h3>
                          <div
                            class="text-[28px] text-blue-primary font-semibold leading-[30px] mt-1"
                          >
                            550 - 1500K
                          </div>
                        </div>
                        <hr class="bg-gray-200 h-[1px]" />
                        <div class="flex flex-col">
                          <h3 class="text-font_dark font-medium text-[14px]">
                            Engagement
                          </h3>
                          <div
                            class="text-[28px] text-blue-primary font-semibold leading-[30px] mt-1"
                          >
                            +80%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="bg-white border-[#D1D5DB] border-[1px] md:p-8 p-4 rounded-[10px] mt-4"
                    >
                      <div class="flex flex-col">
                        <h2
                          class="flex items-center gap-2.5 text-lg text-font_dark mb-[16px]"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 14H16.51M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V9C21 7.89543 20.1046 7 19 7L5 7C3.89543 7 3 6.10457 3 5ZM3 5C3 3.89543 3.89543 3 5 3H17M17 14C17 14.2761 16.7761 14.5 16.5 14.5C16.2239 14.5 16 14.2761 16 14C16 13.7239 16.2239 13.5 16.5 13.5C16.7761 13.5 17 13.7239 17 14Z"
                              stroke="#0D64E8"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <div class="font-semibold text-[#111827]">
                            Payment Overview
                          </div>
                        </h2>
                        <hr class="bg-gray-200 h-[1px]" />
                        <div class="flex justify-between text-[14px] py-[16px]">
                          <div class="text-gray-500 flex-col">
                            <div>
                              <div>Total budget</div>
                              <span class="text-[12px]"
                                >R1 500.00 x 23 days</span
                              >
                            </div>
                            <div class="text-[14px] text-gray-400">
                              $34 500.00
                            </div>
                          </div>
                          <div class="text-font_dark font-medium">
                            ${total_budget}
                          </div>
                        </div>
                        <!--<hr class="bg-gray-200 h-[1px]" />-->
                        <div class="flex justify-between text-[14px] pb-[16px]">
                          <div class="text-gray-500">Estimated VAT</div>
                          <div class="text-font_dark font-medium">
                            ${estimated_vat}
                          </div>
                        </div>
                        <hr class="bg-gray-200 h-[1px]" />
                        <div class="flex justify-between text-[14px] pt-[16px]">
                          <div class="text-gray-500">Total</div>
                          <div class="text-[#0D64E8] font-medium">
                            ${total_budget + estimated_vat}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
