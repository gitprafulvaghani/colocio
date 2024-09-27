<script>
  import { createEventDispatcher } from "svelte";

  export let label;
  export let items = [];
  export let selected = "";

  const dispatch = createEventDispatcher();
  let isOpen = false;

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function selectItem(item) {
    selected = item;
    isOpen = false;
    dispatch("change", item);
  }
</script>

<div class="flex gap-[16px] items-center drop-con">
  <p class="text-[#4B5563] text-[14px] font-medium">{label}</p>
  <div class="dropdown sm:w-auto w-full">
    <button
      class="dropdown-button !w-full xl:min-w-[120px] sm:min-w-[100px] min-w-[50%]"
      on:click={toggleDropdown}
    >
      <span class="text-[14px]">{selected}</span>
      <svg
        class="w-[14px]"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M4.90065 5.83301L10.0007 10.9837L15.1007 5.83301L16.6673 7.4187L10.0007 14.1663L3.33398 7.4187L4.90065 5.83301Z"
          fill="#000"
        />
      </svg>
    </button>
    <div class="dropdown-content {isOpen ? 'show' : ''}">
      {#each items as item}
        <div class="dropdown-item" on:click={() => selectItem(item)}>
          {item}
        </div>
      {/each}
    </div>
  </div>
</div>
