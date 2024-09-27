<script lang="ts">
  import { onMount } from "svelte";
  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css"; // optional for styling
  import "tippy.js/themes/light.css";

  export let tippyContent: string = "";
  export let tippyId: string = "tippyid";

  onMount(() => {
    if (tippyContent == "") return;
    if (tippyId == "" || tippyId == "tippyid") return;
    tippy(`#${tippyId}`, {
      content: tippyContent,
      theme: "light",
      arrow: false,
      maxWidth: 170,
      placement: "top-start",
    });
  });
</script>

<h2 class="text-gray-600 mb-[23px] text-2xl flex items-center gap-2 font-bold">
  <slot name="title">Title</slot>
  {#if tippyContent}
    <svg
      id={tippyId}
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.5 2C5.35786 2 2 5.35786 2 9.5C2 13.6421 5.35786 17 9.5 17C13.6421 17 17 13.6421 17 9.5C17 5.35786 13.6421 2 9.5 2ZM3.14319 9.5C3.14319 5.98923 5.98923 3.14319 9.5 3.14319C13.0108 3.14319 15.8568 5.98923 15.8568 9.5C15.8568 13.0108 13.0108 15.8568 9.5 15.8568C5.98923 15.8568 3.14319 13.0108 3.14319 9.5ZM10.0716 9.5C10.0716 9.18432 9.81568 8.92841 9.5 8.92841C9.18432 8.92841 8.92841 9.18432 8.92841 9.5V12.2714C8.92841 12.587 9.18432 12.843 9.5 12.843C9.81568 12.843 10.0716 12.587 10.0716 12.2714V9.5ZM8.80716 7.42148C8.80716 7.03883 9.11735 6.72864 9.5 6.72864C9.88265 6.72864 10.1928 7.03883 10.1928 7.42148C10.1928 7.80412 9.88265 8.11432 9.5 8.11432C9.11735 8.11432 8.80716 7.80412 8.80716 7.42148Z"
        fill="#4B5563"
      />
    </svg>
  {/if}
</h2>
