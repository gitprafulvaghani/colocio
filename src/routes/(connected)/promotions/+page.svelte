<script lang="ts">
  import { onMount } from "svelte";
  import ProgressBar from "$lib/components/promotions/ProgressBar.svelte";
  import SubHeader from "$lib/components/promotions/SubHeader.svelte";

  // card components
  import GoalCard from "$lib/components/promotions/GoalCard.svelte";
  import PlatformCard from "$lib/components/promotions/PlatformCard.svelte";
  import MediaCard from "$lib/components/promotions/MediaCard.svelte";
  import TextCard from "$lib/components/promotions/TextCard..svelte";
  import AudienceCard from "$lib/components/promotions/AudienceCard.svelte";
  import ScheduleCard from "$lib/components/promotions/ScheduleCard.svelte";
  import EndCard from "$lib/components/promotions/EndCard.svelte";

  // helpers
  import EstimatedResultsCard from "$lib/components/promotions/EstimatedResultsCard.svelte";
  import ModalSummary from "$lib/components/promotions/ModalSummary.svelte";
  import PaymentOverviewCard from "$lib/components/promotions/PaymentOverviewCard.svelte";
  import PlatformRenderCard from "$lib/components/promotions/PlatformRenderCard.svelte";
  import { IsPreviewShow } from "$lib/services/interface/promotionstore";

  let step = 1; //current step

  let ad_name = "Enter your Ad name here";
  let ad_desc = "";
  let goal_selected = "";

  let description = "";
  let headline_1 = "";
  let headline_2 = "";
  let bool_show_button = true;
  let action_button_text = "";

  let accounts_reached = "0";
  let engagement = 0;
  let total_budget = 1000;
  let estimated_vat = 140;
  let total_budget_description = "";
  let bool_colocio_description = false;
  let colocio_description = "";
  let colocio_prompt = "";
  let url_action = "";

  // Function to handle URL parameter changes
  function handleURLParameterChanges() {
    const urlParam = new URLSearchParams(window.location.search);
    const stepValue = urlParam.get("step");
    if (stepValue && parseInt(stepValue) > 0 && parseInt(stepValue) < 8) {
      step = parseInt(stepValue);
    }
  }

  function handleGoalSelected(e: CustomEvent) {
    goal_selected = e.detail.goal;

    //TODO: Transform into FB objectives
  }

  function applyRecommendation() {
    accounts_reached = "550 - 1500K";
    engagement = 80;
    total_budget = 34500;
    estimated_vat = 2500;
    total_budget_description = "R1500.00 x 23 days";
  }

  function handleEdit(e: CustomEvent<number>) {
    step = e.detail;
  }

  let audience_infos = {
    age: "",
    gender: "",
    locations: [],
    interests: [],
    sources: ["Recently followed"],
  };

  let schedule_infos = {
    start: "",
    end: "",
    days: 0,
    daily_spend: 1000,
    daily_reach: 1500,
  };

  function setStep(value: number) {
    step = value;
    const urlParam = new URLSearchParams(window.location.search);
    urlParam.set("step", value.toString());
    const newURL = `${window.location.pathname}?${urlParam.toString()}`;
    window.history.pushState({ path: newURL }, "", newURL);
  }

  let bool_summary_modal = false;

  onMount(() => {
    window.addEventListener("popstate", handleURLParameterChanges);
    const stepValue = new URLSearchParams(window.location.search).get("step");
    if (stepValue && parseInt(stepValue) > 0 && parseInt(stepValue) < 8) {
      step = parseInt(stepValue);
    }
  });
</script>

<svelte:head>
  <title>Manul Add | Colocio</title>
  <meta name="description" content="Manual add page of the Colocio app" />
  <meta
    name="keywords"
    content="colocio, ai, ads, facebook, meta, facebook ads, campaign"
  />
</svelte:head>

<main class="flex flex-col gap-5 p-4 pb-[80px]">
  <SubHeader {ad_name} />
  <!--<div class="xl:px-44">-->
  <ProgressBar {step} />
  <div
    class={`${
      step !== 4 && step !== 6 && step !== 5 && step !== 7
        ? "max-w-[1200px]"
        : ""
    } mx-auto w-full`}
  >
    {#if step == 1}
      <PlatformCard
        on:nextStep={() => {
          setStep(2);
        }}
        on:prevStep={() => {
          // Define any necessary action if going back from step 1 is allowed or disable it.
        }}
      />
    {:else if step == 2}
      <GoalCard
        {ad_desc}
        {goal_selected}
        on:goalSelected={handleGoalSelected}
        on:nextStep={() => {
          setStep(3); // Leads to AudienceCard now
        }}
        on:prevStep={() => {
          setStep(1);
        }}
      />
    {:else if step == 3}
      <AudienceCard
        on:nextStep={() => {
          setStep(4);
        }}
        on:prevStep={() => {
          setStep(2);
        }}
        bind:audience_infos
      />
    {:else if step == 4}
      <MediaCard
        on:nextStep={() => {
          setStep(5);
        }}
        on:prevStep={() => {
          setStep(3);
        }}
      />
    {:else if step == 5}
      <TextCard
        on:nextStep={() => {
          setStep(6);
        }}
        on:prevStep={() => {
          setStep(4);
        }}
        bind:description
        bind:headline_1
        bind:headline_2
        bind:bool_show_button
        bind:action_button_text
        bind:colocio_description
        bind:colocio_prompt
        bind:bool_colocio_description
        bind:url_action
      />
    {:else if step == 6}
      <div class="flex lg:flex-row flex-col gap-4">
        <ScheduleCard
          on:applyRecommendation={applyRecommendation}
          on:nextStep={() => {
            setStep(7);
          }}
          on:prevStep={() => {
            setStep(5);
          }}
          bind:schedule_infos
        />
        <button
          on:click={() => ($IsPreviewShow = !$IsPreviewShow)}
          class={`${
            $IsPreviewShow
              ? "bg-[#F4F9FF] border-[#E4EFFF] !text-[#0D64E8]"
              : ""
          } border-[#D1D5DB] border-[1px] text-[#4B5563] h-[32px] text-[14px] font-semibold rounded-md lg:hidden flex gap-[10px] justify-center items-center w-full`}
          >Overview
          <span class={`${$IsPreviewShow ? "rotate-180" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              ><path
                d="M4.89967 5.83398L9.99967 10.9847L15.0997 5.83398L16.6663 7.41968L9.99967 14.1673L3.33301 7.41968L4.89967 5.83398Z"
                fill={`${$IsPreviewShow ? "#0D64E8" : "#111827"}`}
              /></svg
            >
          </span>
        </button>
        <div
          class={` ${
            $IsPreviewShow ? "block lg:w-auto w-full" : "lg:block hidden"
          }`}
        >
          <EstimatedResultsCard {accounts_reached} {engagement} />
          <PaymentOverviewCard
            {total_budget}
            {estimated_vat}
            {total_budget_description}
          />
        </div>
      </div>
    {:else if step == 7}
      <EndCard
        on:prevStep={() => {
          setStep(6);
        }}
        on:schedule={() => {
          bool_summary_modal = true;
        }}
        on:edit={handleEdit}
        {audience_infos}
        {schedule_infos}
      />
    {/if}

    {#if bool_summary_modal}
      <ModalSummary
        on:close={() => {
          bool_summary_modal = false;
        }}
        {description}
        {headline_1}
        {headline_2}
        {action_button_text}
        {bool_show_button}
      />
    {/if}
  </div>
</main>
