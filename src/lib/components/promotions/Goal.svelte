<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let name: string;
  export let selected: string;

  function goalSelected() {
    dispatch("selected", name);
  }
</script>

<button
  type="button"
  class={`sm:p-4 p-3 border border-[#D1D5DB] rounded-md text-left cursor-pointer ${
    name == selected ? "!bg-[#F4F9FF] border-[#E4EFFF] border-[1px]" : ""
  }`}
  on:click={goalSelected}
>
  <div class="flex items-center sm:gap-2.5 gap-1">
    <slot name="icon">Icon</slot>
    <div>
      <slot name="title">Title</slot>
      <div
        class:text-gray-500={name != selected}
        class:text-blue-primary={name == selected}
        class={`${name == selected ? "text-[#0D64E8]" : ""}text-sm `}
      >
        <slot name="description">Description</slot>
      </div>
    </div>
  </div>
  <div />
</button>
