<script lang="ts">
  import Swiper from "swiper/bundle";
  import "swiper/css/bundle";
  import { onMount } from "svelte";
  import {
    GetAgeandGender,
    GetInterestandBehaviourAudiences,
    GetRegionandcountry,
    Optimalaudience,
  } from "../../services/NewFacebook/Insights_service";
  import Loader from "../Loader.svelte";
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";

  export let ageGenderData: any;
  // ageGenderData.map((res)=>{
  //   console.log(res.genders[0]);
  // })

  // let ageGenderData:any = [];
  console.log("ageGenderDataageGenderData", ageGenderData);

  let locationData: any[] = [];
  // let interests: any[] = [];
  let interests = [
    "Online shopping",
    "Food and drink pairing",
    "Social events",
    "Outdoor events",
    "Friend & family",
  ];

  let swiper: any;
  let number_of_slides = 4;
  function updateVariableValue() {
    if (window.innerWidth > 1024) {
      number_of_slides = 2;
    } else {
      number_of_slides = 1;
    }

    swiper.params.slidesPerView = number_of_slides;
  }

  onMount(() => {
    // GetAgeandGenderDetails();

    swiper = new Swiper(".swiper-container", {
      slidesPerView: number_of_slides, // Number of slides to show at once
      spaceBetween: 30, // Space between slides
      //   navigation: {
      //     nextEl: '.swiper-button-next', // CSS selector for the next arrow
      //     prevEl: '.swiper-button-prev', // CSS selector for the previous arrow
      // },
    });

    window.addEventListener("resize", updateVariableValue);
  });
  const splideOptions = {
    perPage: 4,
    rewind: true,
    gap: "1rem",
    pagination: false,
    breakpoints: {
      1440: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      576: {
        perPage: 1,
      },
    },
  };
</script>

<!--<div class="w-full flex items-center gap-5">-->
<Splide options={splideOptions} aria-label="Svelte Splide Example">
  {#each ageGenderData as { age_max, age_min, genders, geo_locations, interests }}
    <SplideSlide>
      <div
        class="swiper-slide w-1/3 flex-1 p-2 sm:p-4 flex flex-col bg-white rounded-md border border-gray-200 !mr-0"
      >
        <img
          class="mb-[13px]"
          src="/images/audience.png"
          alt="Rounded avatar"
        />
        <div
          class="flex font-semibold items-center text-font_dark text-base whitespace-nowrap mb-[13px]"
        >
          Party Patric
        </div>

        <div class="">
          <div class="flex gap-[29px] mb-1">
            <p class="text-[#6B7280] text-[14px] font-normal w-[57px]">Age</p>
            <p class="text-font_dark text-[14px] font-normal">
              {age_min}-{age_max}
            </p>
          </div>
          <div class="flex gap-[29px] mb-1">
            <p class="text-[#6B7280] text-[14px] font-normal w-[57px]">
              Gender
            </p>
            {#if genders}
              {#if genders[0] === 0}
                <p class="text-font_dark text-[14px] font-normal">Male</p>
              {:else if genders[0] === 1}
                <p class="text-font_dark text-[14px] font-normal">Female</p>
              {/if}
            {:else}
              No data found
            {/if}
          </div>
          <!-- <div class="flex gap-[29px] mb-1">
                <p class="text-[#6B7280] text-[14px] font-normal w-[57px]">
                  Location
                </p>
                {#if geo_locations.cities}
                {#each geo_locations as { cities }}
                  <p class="text-font_dark text-[14px] font-normal">
                    {cities}
                  </p>
                  {/each}
                {/if}
              </div> -->
          <div class="flex gap-[29px] mb-1">
            <p class="text-[#6B7280] text-[14px] font-normal w-[57px]">
              Location
            </p>
            {#if geo_locations && geo_locations.length > 0}
              {#each geo_locations as ad}
                {#each ad.targeting.geo_locations.cities as city}
                  <p class="text-font_dark text-[14px] font-normal">
                    {city.name}
                  </p>
                {/each}
              {/each}
            {:else}
              <p class="text-font_dark text-[14px] font-normal">
                No geo locations data available.
              </p>
            {/if}
          </div>
        </div>

        <hr class="bg-gray-200 h-[1px] my-[13px]" />

        <div class="flex flex-col gap-3">
          <h6 class="text-gray-500 text-sm">Interests & behaviours</h6>
          {#if interests}
            {#each interests as interest}
              <div class="col-span-2 flex gap-1 gap-y-2 items-center flex-wrap">
                <button
                  type="button"
                  disabled
                  class="text-font_dark text-[14px] font-normal whitespace-nowrap shadow-md border border-gray-200 w-fit p-1.5 py-[2px] rounded-md"
                  ><p>{interest}</p></button
                >
              </div>
            {/each}
          {:else}
            No data found
          {/if}
        </div>
      </div>
    </SplideSlide>
  {/each}
</Splide>
<!--</div>-->
