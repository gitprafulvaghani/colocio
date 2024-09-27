<script lang="ts">
  export let step: number;
  let width = 0;

  $: {
    width = getWidth(step);
  }

  function getWidth(stepValue: number) {
    let width = 0;
    switch (stepValue) {
      case 1:
        width = 16.5;
        break;
      case 2:
        width = 16.5 * 2;
        break;
      case 3:
        width = 16.5 * 3;
        break;
      case 4:
        width = 16.5 * 4;
        break;
      case 5:
        width = 16.5 * 5;
        break;
      case 6:
        width = 100;
        break;
      default:
        break;
    }
    return width;
  }
</script>

<div
  class="mb-8 mt-20 w-full px-6 sm:mb-0 sm:px-10 lg:mt-10 lg:px-32 2xl:px-96"
>
  <div
    class="mb-2 flex items-center justify-between text-xs font-medium text-white
    sm:text-sm"
  >
    <div>Step {step + 1}/6</div>
  </div>
  <div class="h-1.5 w-full rounded-full bg-blue-light">
    <div
      class="h-1.5 rounded-full bg-blue-bglight"
      style:width="{width}%"
    ></div>
  </div>
  <div
    class="mt-2 flex items-center justify-between text-xs font-medium text-white
    sm:text-sm"
  >
    <div>Start</div>
    <div class:text-blue-light={step < 1}>Connect</div>
    <div class:text-blue-light={step < 2}>Accounts</div>
    <div class:text-blue-light={step < 3}>Users</div>
    <div class:text-blue-light={step < 4}>Business</div>
    <div class:text-blue-light={step < 5}>Audience</div>
    <div class:text-blue-light={step < 6}>Complete</div>
  </div>
</div>
