<script lang="ts">
  import OptimalAudiencesChart from "./OptimalAudiencesChart.svelte";
  import { Optimalaudience } from "$lib/services/NewFacebook/Insights_service";
  import { onMount } from "svelte";

  let selected = "Summer Samantha";
  let audiences = ["Summer Samantha", "Hosting Heather", "Mixologist Mike"];
  // let interests = [
  //   "Online shopping",
  //   "Food and drink pairing",
  //   "Social events",
  //   "Outdoor events",
  //   "Friend & family",
  // ];

  let interests = [];
  let ageRange = "";
  let gender = "";
  let location = "";
  //
  //  async function handleaudiancedeta() {
  //    try {
  //      await GetInterestandBehaviour();
  //    } catch (error) {
  //      console.error("Error fetching data:", error);
  //    }
  //  }

  async function handleOptimalaudiance() {
    try {
      const response = await Optimalaudience();
      console.log("response=======", response);
      if (response && response.length > 0) {
        const adset = response[0];

        if (adset.targeting) {
          ageRange = `${adset.targeting.age_min}-${adset.targeting.age_max}`;

          if (adset.targeting.genders && adset.targeting.genders.length > 0) {
            gender = adset.targeting.genders[0] === 1 ? "Female" : "Male";
          } else {
            gender = "Unknown";
          }

          if (adset.targeting.geo_locations) {
            if (adset.targeting.geo_locations.cities) {
              location = adset.targeting.geo_locations.cities
                .map((city) => city.name)
                .join(", ");
            } else if (adset.targeting.geo_locations.countries) {
              location = adset.targeting.geo_locations.countries.join(", ");
            } else {
              location = "Unknown";
            }
          } else {
            location = "Unknown";
          }

          if (adset.targeting.interests) {
            interests = adset.targeting.interests.map(
              (interest) => interest.name
            );
          } else {
            interests = [];
          }
        } else {
          console.error("Targeting data is missing in the response.");
        }
      } else {
        console.error("Response is empty or does not contain expected data.");
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  }

  onMount(() => {
    handleOptimalaudiance();
  });
</script>

<div
  class="flex-1 flex flex-col gap-5 bg-white rounded-lg shadow flex-grow md:p-8 p-4"
>
  <h4 class="text-font_dark text-[18px] font-semibold">Optimal audiences</h4>
  <div class="flex flex-col">
    <div
      class="flex gap-8 bg-blue-bglight text-[#0D64E8] text-sm p-4 rounded-md relative"
    >
      <div class="flex-1 flex gap-1">
        <div>
          <svg
            class="w-4 h-4 mt-0.5"
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
          <div class="font-semibold">Pareto generated profiles</div>
          <div class="text-xs">
            Pareto generates audience profiles by analyzing the data of social
            media users who engage with your content the most. Since these
            profiles are tailored to your specific social media audience, it's
            advantageous to directly target them in your upcoming posts and
            campaigns for optimal results.
          </div>
        </div>
      </div>
      <button
        type="button"
        class="bg-transparent top-2 right-2 flex items-center rounded-md absolute"
      >
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.2712 11.7712L4.72876 4.22876M12.2712 4.22876L4.72876 11.7712"
            stroke="#0D64E8"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
    <div class="my-[20px]">
      <OptimalAudiencesChart />
    </div>
    <!-- TODO CHART -->

    <div
      class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-[20px]"
    >
      <ul class="flex flex-wrap -mb-px">
        {#each audiences as audience}
          <li class="">
            <button
              on:click={() => {
                selected = audience;
              }}
              type="button"
              class={`${
                selected === audience
                  ? "text-[#0D64E8] border-b-[#0D64E8] border-b-[1px]"
                  : "text-[#4B5563]"
              } text-[14px] font-normal inline-block px-3 py-2 border-b-2 border-transparent`}
            >
              {audience}
            </button>
          </li>
        {/each}
      </ul>
    </div>

    <div class="flex sm:flex-row flex-col gap-3.5 mb-[12px]">
      <img
        class="w-28 h-28 rounded-full"
        src="/images/samantha.png"
        alt="Rounded avatar"
      />
      <div class="text-sm text-gray-500">
        Summer Samantha embodies the spirit of a 28-35-year-old New Yorker who
        finds immense joy in embracing the outdoors. The warmth of the sun
        invigorates her, prompting her to organize lively gatherings such as
        picnics and pool parties where she can bask in the sun's glow and engage
        in spirited conversations with her friends. A passion for mixology adds
        a delightful touch to these events as she eagerly experiments with
        creating unique cocktails, leaving her guests impressed and eagerly
        anticipating her next gathering. However, the ever-changing weather in
        New York poses a challenge, making it crucial for her to plan and adapt
        her outdoor events accordingly. Despite this, she is determined to
        curate experiences that linger in the memories of her friends, blending
        her love for outdoor festivities with a thriving career in the bustling
        city.
      </div>
    </div>

    <hr class="bg-gray-200 h-[1px]" />
    <div class="grid grid-cols-2 gap-x-5 gap-y-1 text-sm max-w-[240px] my-3">
      <p class="text-gray-500">Age</p>
      <p class="text-font_dark">{ageRange}</p>
      <p class="text-gray-500">Gender</p>
      <p class="text-font_dark">{gender}</p>
      <p class="text-gray-500">Location</p>
      <p class="text-font_dark">{location}</p>
    </div>
    <hr class="bg-gray-200 h-[1px]" />
    <div class="flex flex-col gap-3 mt-3">
      <h6 class="text-gray-500 text-sm">Interests & behaviours</h6>
      <div class="col-span-2 text-font_dark flex flex-wrap gap-1 items-center">
        {#each interests as interest}
          <button
            type="button"
            disabled
            class="text-font_dark text-[14px] shadow-md border border-gray-200 w-fit p-1.5 py-[2px] rounded-md"
            >{interest}
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
