<script>
  import { writable, get } from "svelte/store";

  export let duration = 3000;

  export const toast = writable({
    message: "",
    visible: false,
  });

  export function showToast(message) {
    toast.set({ message, visible: true });
    setTimeout(() => {
      hideToast();
    }, duration);
  }

  function hideToast() {
    toast.update((prev) => ({ ...prev, visible: false }));
  }
</script>

{#if $toast.visible}
  <div class="toast">
    <p>{$toast.message}</p>
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 9999;
  }
</style>
