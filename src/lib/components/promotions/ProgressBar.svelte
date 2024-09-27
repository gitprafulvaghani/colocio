<script lang="ts">
  export let step: number;
  let percentage = 0;
  let width = 0;
  $: {
    width = getWidth(step);
    percentage = ((step - 1) / 6) * 100;
  }

  function getWidth(step_value: number) {
    let width = 0;
    switch (step_value) {
      case 2:
        width = 18;
        break;
      case 3:
        width = 34;
        break;
      case 4:
        width = 50;
        break;
      case 5:
        width = 65;
        break;
      case 6:
        width = 81;
        break;
      case 7:
        width = 100;
        break;
      default:
        break;
    }
    return width;
  }
</script>

<div class="sm:block hidden max-w-[1200px] w-full mx-auto">
  <div
    class="mb-2 flex items-center justify-between text-blue-primary text-sm font-medium"
  >
    <div class="text-[12px] font-semibold">Step {step}/7</div>
    <div class="flex items-center gap-1">
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.92871 0C4.50853 0 0.928711 3.57982 0.928711 8C0.928711 12.4202 4.50853 16 8.92871 16C13.3489 16 16.9287 12.4202 16.9287 8C16.9287 3.57982 13.3489 0 8.92871 0ZM13.8849 11.957C13.3754 12.4467 12.6872 12.6319 11.913 11.646L9.59041 8.82051C9.21324 8.36394 8.51184 8.37717 8.1479 8.84036L5.99075 11.6195C5.16362 12.6782 4.44897 12.4268 3.92623 11.8842C3.08586 10.8056 2.58297 9.46237 2.58297 7.99338C2.58297 4.49297 5.42829 1.64764 8.92871 1.64764C12.4291 1.64764 15.2745 4.49297 15.2745 7.99338C15.2745 9.48883 14.7517 10.8652 13.8849 11.9504V11.957Z"
          fill="#0D64E8"
        />
      </svg>
      <span class="text-[12px] font-semibold">
        {Math.floor(percentage)}% Optimized
      </span>
    </div>
  </div>
  <div class="w-full bg-gray-200 rounded-full h-1.5">
    <div class="bg-blue-600 h-1.5 rounded-full" style:width="{width}%" />
  </div>
  <div
    class="mt-2 flex items-center justify-between text-gray-500 font-medium sm:flex-nowrap flex-wrap gap-4 text-[12px]"
  >
    <div
      class:text-blue-primary={step == 1}
      class={`${step == 1 ? "font-semibold" : ""}
      ${
        step == 2 ||
        step == 3 ||
        step == 4 ||
        step == 5 ||
        step == 6 ||
        step == 7
          ? "text-[#0D64E8]"
          : ""
      }`}
    >
      Platform
    </div>
    <div
      class:text-blue-primary={step == 2}
      class={`${step == 2 ? "font-semibold" : ""} ${
        step == 3 || step == 4 || step == 5 || step == 6 || step == 7
          ? "text-[#0D64E8]"
          : ""
      }`}
    >
      Goal
    </div>
    <div
      class:text-blue-primary={step == 3}
      class={`${step == 3 ? "font-semibold" : ""} ${
        step == 4 || step == 5 || step == 6 || step == 7 ? "text-[#0D64E8]" : ""
      }`}
    >
      Audience
    </div>
    <div
      class:text-blue-primary={step == 4}
      class={`${step == 4 ? "font-semibold" : ""}${
        step == 5 || step == 6 || step == 7 ? "text-[#0D64E8]" : ""
      }`}
    >
      Media
    </div>
    <div
      class:text-blue-primary={step == 5}
      class={`${step == 5 ? "font-semibold" : ""} ${
        step == 6 || step == 7 ? "text-[#0D64E8]" : ""
      }`}
    >
      Text
    </div>
    <div
      class:text-blue-primary={step == 6}
      class={`${step == 6 ? "font-semibold" : ""} ${
        step == 7 ? "text-[#0D64E8]" : ""
      }`}
    >
      Schedule
    </div>
    <div
      class:text-blue-primary={step == 7}
      class={`${step == 7 ? "font-semibold" : ""} ${
        step - 1 == 7 ? "text-[#0D64E8]" : ""
      }`}
    >
      Preview
    </div>
  </div>
</div>
