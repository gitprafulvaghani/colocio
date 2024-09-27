<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Store_Selected_goal } from "$lib/stores/stores";
  const dispatch = createEventDispatcher();

  import Goal from "$lib/components/promotions/Goal.svelte";
  export let goal_selected = "";

  function handleGoalSelected(e: CustomEvent<string>) {
    goal_selected = e.detail;

    dispatch("goalSelected", { goal: e.detail });
    Store_Selected_goal.set(goal_selected);
  }
</script>

<div class="grid grid-cols-2 sm:gap-4 gap-3">
  <!-- First row -->
  <Goal
    on:selected={handleGoalSelected}
    name={"awareness"}
    selected={goal_selected}
  >
    <div slot="icon" class="py-0.5">
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.502 12.9807C11.4463 12.9807 12.2483 12.6503 12.908 11.9893C13.5677 11.3283 13.8976 10.5257 13.8976 9.58144C13.8976 8.6372 13.5671 7.83522 12.9061 7.1755C12.2451 6.51578 11.4425 6.18592 10.4982 6.18592C9.55401 6.18592 8.75203 6.5164 8.09231 7.17737C7.43259 7.83836 7.10273 8.64098 7.10273 9.58523C7.10273 10.5295 7.43321 11.3314 8.09418 11.9912C8.75517 12.6509 9.55779 12.9807 10.502 12.9807ZM10.5001 11.8333C9.87514 11.8333 9.34389 11.6146 8.90639 11.1771C8.46889 10.7396 8.25014 10.2083 8.25014 9.58333C8.25014 8.95833 8.46889 8.42708 8.90639 7.98958C9.34389 7.55208 9.87514 7.33333 10.5001 7.33333C11.1251 7.33333 11.6564 7.55208 12.0939 7.98958C12.5314 8.42708 12.7501 8.95833 12.7501 9.58333C12.7501 10.2083 12.5314 10.7396 12.0939 11.1771C11.6564 11.6146 11.1251 11.8333 10.5001 11.8333ZM10.5013 15.4166C8.58494 15.4166 6.83884 14.8881 5.26298 13.8309C3.68713 12.7738 2.52688 11.3579 1.78223 9.58333C2.52688 7.80876 3.68675 6.3929 5.26185 5.33575C6.83694 4.2786 8.58265 3.75002 10.499 3.75002C12.4153 3.75002 14.1614 4.2786 15.7373 5.33575C17.3132 6.3929 18.4734 7.80876 19.2181 9.58333C18.4734 11.3579 17.3135 12.7738 15.7384 13.8309C14.1634 14.8881 12.4176 15.4166 10.5013 15.4166ZM10.5001 14.1667C12.0696 14.1667 13.5106 13.7535 14.8231 12.9271C16.1356 12.1007 17.139 10.9861 17.8335 9.58333C17.139 8.18055 16.1356 7.06597 14.8231 6.23958C13.5106 5.41319 12.0696 5 10.5001 5C8.9307 5 7.48973 5.41319 6.17723 6.23958C4.86473 7.06597 3.86125 8.18055 3.16681 9.58333C3.86125 10.9861 4.86473 12.1007 6.17723 12.9271C7.48973 13.7535 8.9307 14.1667 10.5001 14.1667Z"
          fill={goal_selected == "awareness" ? "#0d64e8" : "#4B5563"}
        />
      </svg>
    </div>
    <h2
      class={`sm:text-[14px] text-[13px] font-medium ${
        goal_selected == "awareness" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
      slot="title"
    >
      Awareness
    </h2>
    <p
      slot="description"
      class={`text-[12px] sm:block hidden ${
        goal_selected == "awareness" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
    >
      Increase brand visibility and reach a broader audience with your ad.
    </p>
  </Goal>
  <Goal
    on:selected={handleGoalSelected}
    name={"traffic"}
    selected={goal_selected}
  >
    <div slot="icon" class="py-0.5">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.66632 16.242L5.78813 15.351L8.15034 12.9887H2.08301V11.7388H8.15034L5.78813 9.37658L6.66632 8.48558L10.5445 12.3638L6.66632 16.242ZM13.333 11.5064L9.4548 7.62821L13.333 3.75002L14.2112 4.64104L11.849 7.00323H17.9163V8.25321H11.849L14.2112 10.6154L13.333 11.5064Z"
          fill={goal_selected == "traffic" ? "#0d64e8" : "#4B5563"}
        />
      </svg>
    </div>
    <h2
      class={`sm:text-[14px] text-[13px] font-medium ${
        goal_selected == "traffic" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
      slot="title"
    >
      Traffic
    </h2>
    <p
      slot="description"
      class={`text-[12px] sm:block hidden ${
        goal_selected == "traffic" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
    >
      Drive more visitors to your website or landing page through targeted ad
      campaigns.
    </p>
  </Goal>
  <!-- Second rpw -->
  <Goal
    on:selected={handleGoalSelected}
    name={"engagement"}
    selected={goal_selected}
  >
    <div slot="icon" class="py-0.5">
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.16667 9.99999H7.175M10.5 9.99999H10.5083M13.8333 9.99999H13.8417M18 9.99999C18 13.6819 14.6421 16.6667 10.5 16.6667C9.21728 16.6667 8.00976 16.3804 6.95389 15.8759L3 16.6667L4.16249 13.5667C3.4263 12.5353 3 11.3119 3 9.99999C3 6.3181 6.35786 3.33333 10.5 3.33333C14.6421 3.33333 18 6.3181 18 9.99999Z"
          stroke={goal_selected == "engagement" ? "#0d64e8" : "#4B5563"}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <h2
      class={`sm:text-[14px] text-[13px] font-medium ${
        goal_selected == "engagement" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
      slot="title"
    >
      Engagement
    </h2>
    <p
      slot="description"
      class={`text-[12px] sm:block hidden ${
        goal_selected == "engagement" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
    >
      Encourage active interaction with your content, such as likes, comments,
      and shares.
    </p>
  </Goal>
  <Goal
    on:selected={handleGoalSelected}
    name={"leads"}
    selected={goal_selected}
  >
    <div slot="icon" class="py-0.5">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.19838 17.0833C7.91099 17.0833 6.81992 16.6279 5.92515 15.7171C5.03039 14.8063 4.58301 13.7046 4.58301 12.4119V8.00486L8.14867 11.6026L7.27851 12.4855L5.83299 11.008V12.4119C5.83299 13.3499 6.16071 14.1546 6.81615 14.8261C7.47161 15.4976 8.26569 15.8333 9.19838 15.8333C10.1311 15.8333 10.9251 15.4976 11.5806 14.8261C12.236 14.1546 12.5638 13.3499 12.5638 12.4119V9.68588C12.0905 9.53952 11.705 9.27323 11.4075 8.88703C11.11 8.5008 10.9612 8.05983 10.9612 7.56411C10.9612 7.06839 11.1086 6.62608 11.4035 6.23719C11.6984 5.8483 12.0851 5.58068 12.5638 5.43432V2.08336H13.8137V5.43432C14.2924 5.58068 14.6791 5.8483 14.974 6.23719C15.2689 6.62608 15.4163 7.06839 15.4163 7.56411C15.4163 8.05983 15.2689 8.50294 14.974 8.89342C14.6791 9.28392 14.2924 9.54807 13.8137 9.68588V12.4119C13.8137 13.7046 13.3664 14.8063 12.4716 15.7171C11.5768 16.6279 10.4858 17.0833 9.19838 17.0833ZM13.1887 8.54169C13.4622 8.54169 13.6936 8.44714 13.8827 8.25803C14.0718 8.06893 14.1663 7.83762 14.1663 7.56411C14.1663 7.29061 14.0718 7.0593 13.8827 6.87019C13.6936 6.6811 13.4622 6.58655 13.1887 6.58655C12.9152 6.58655 12.6839 6.6811 12.4948 6.87019C12.3057 7.0593 12.2112 7.29061 12.2112 7.56411C12.2112 7.83762 12.3057 8.06893 12.4948 8.25803C12.6839 8.44714 12.9152 8.54169 13.1887 8.54169Z"
          fill={goal_selected == "leads" ? "#0d64e8" : "#4B5563"}
        />
      </svg>
    </div>
    <h2
      class={`sm:text-[14px] text-[13px] font-medium ${
        goal_selected == "leads" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
      slot="title"
    >
      Leads
    </h2>
    <p
      slot="description"
      class={`text-[12px] sm:block hidden ${
        goal_selected == "leads" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
    >
      Capture potential customer information to build your prospect list and
      grow your business.
    </p>
  </Goal>
  <!-- Third row -->
  <Goal
    on:selected={handleGoalSelected}
    name={"promotion"}
    selected={goal_selected}
  >
    <div slot="icon" class="py-0.5">
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.4682 10.625V9.37502H18.481V10.625H15.4682ZM16.4202 16.2339L14.0099 14.4263L14.7695 13.4295L17.1797 15.2372L16.4202 16.2339ZM14.7374 6.53845L13.9779 5.54168L16.3881 3.73399L17.1477 4.73077L14.7374 6.53845ZM4.8753 15.4006V12.1474H4.02593C3.61034 12.1474 3.25538 12.0002 2.96103 11.7059C2.6667 11.4116 2.51953 11.0566 2.51953 10.641V9.35897C2.51953 8.94339 2.6667 8.58843 2.96103 8.29408C3.25538 7.99974 3.61034 7.85258 4.02593 7.85258H7.24707L10.981 5.62504V14.375L7.24707 12.1474H6.12526V15.4006H4.8753ZM12.1349 12.5993V7.40064C12.4618 7.69658 12.7252 8.06945 12.9249 8.51922C13.1247 8.96901 13.2246 9.46261 13.2246 9.99999C13.2246 10.5374 13.1247 11.031 12.9249 11.4808C12.7252 11.9305 12.4618 12.3034 12.1349 12.5993ZM4.02593 9.10256C3.96183 9.10256 3.90307 9.12926 3.84964 9.18268C3.79622 9.23611 3.76951 9.29488 3.76951 9.35897V10.641C3.76951 10.7051 3.79622 10.7639 3.84964 10.8173C3.90307 10.8707 3.96183 10.8974 4.02593 10.8974H7.59322L9.73105 12.1538V7.84614L7.59322 9.10256H4.02593Z"
          fill={goal_selected == "promotion" ? "#0d64e8" : "#4B5563"}
        />
      </svg>
    </div>
    <h2
      class={`sm:text-[14px] text-[13px] font-medium ${
        goal_selected == "promotion" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
      slot="title"
    >
      Promotion
    </h2>
    <p
      slot="description"
      class={`text-[12px] sm:block hidden ${
        goal_selected == "promotion" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
    >
      Highlight special offers, events, or product launches to attract attention
      and participation.
    </p>
  </Goal>
  <Goal
    on:selected={handleGoalSelected}
    name={"sales"}
    selected={goal_selected}
  >
    <div slot="icon" class="py-0.5">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.96152 17.9647C5.55662 17.9647 5.21234 17.8229 4.92869 17.5392C4.64503 17.2556 4.50321 16.9113 4.50321 16.5064C4.50321 16.1015 4.64503 15.7572 4.92869 15.4736C5.21234 15.1899 5.55662 15.0481 5.96152 15.0481C6.36644 15.0481 6.71072 15.1899 6.99437 15.4736C7.27803 15.7572 7.41985 16.1015 7.41985 16.5064C7.41985 16.9113 7.27803 17.2556 6.99437 17.5392C6.71072 17.8229 6.36644 17.9647 5.96152 17.9647ZM14.0384 17.9647C13.6335 17.9647 13.2892 17.8229 13.0056 17.5392C12.7219 17.2556 12.5801 16.9113 12.5801 16.5064C12.5801 16.1015 12.7219 15.7572 13.0056 15.4736C13.2892 15.1899 13.6335 15.0481 14.0384 15.0481C14.4433 15.0481 14.7876 15.1899 15.0713 15.4736C15.3549 15.7572 15.4967 16.1015 15.4967 16.5064C15.4967 16.9113 15.3549 17.2556 15.0713 17.5392C14.7876 17.8229 14.4433 17.9647 14.0384 17.9647ZM5.01279 4.79166L7.12498 9.21474H12.8061C12.8541 9.21474 12.8969 9.20272 12.9343 9.17868C12.9717 9.15464 13.0037 9.12125 13.0304 9.07852L15.266 5.01602C15.2981 4.95725 15.3007 4.90517 15.274 4.85977C15.2473 4.81435 15.2019 4.79164 15.1378 4.79164L5.01279 4.79166ZM4.41344 3.5417H15.9839C16.3247 3.5417 16.5825 3.68673 16.7571 3.97679C16.9318 4.26686 16.9401 4.56306 16.782 4.86541L14.1121 9.70189C13.9754 9.94228 13.7946 10.1295 13.5697 10.2636C13.3448 10.3977 13.0983 10.4647 12.8301 10.4647H6.74998L5.78523 12.2275C5.74249 12.2916 5.74116 12.3611 5.78123 12.4359C5.8213 12.5107 5.8814 12.5481 5.96152 12.5481H15.4967V13.798H5.96152C5.40598 13.798 4.98851 13.5585 4.70913 13.0793C4.42975 12.6001 4.41987 12.1218 4.67948 11.6442L5.8686 9.50639L2.83654 3.12497H1.25V1.87502H3.62177L4.41344 3.54168V3.5417Z"
          fill={goal_selected == "sales" ? "#0d64e8" : "#4B5563"}
        />
      </svg>
    </div>
    <h2
      class={`sm:text-[14px] text-[13px] font-medium ${
        goal_selected == "sales" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
      slot="title"
    >
      Sales
    </h2>
    <p
      slot="description"
      class={`text-[12px] sm:block hidden ${
        goal_selected == "sales" ? "text-[#0D64E8]" : "text-[#4B5563]"
      }`}
    >
      Maximise conversions and revenue by directly promoting your products or
      services.
    </p>
  </Goal>
</div>
