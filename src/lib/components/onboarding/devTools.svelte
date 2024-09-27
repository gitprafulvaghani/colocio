<script lang="ts">
  import { audience, accounts } from '$lib/stores/onboarding';
  import { company_infos } from '$lib/stores/stores';

  $: $accounts, $audience, $company_infos;
  let isOpen = false;
</script>

<div class="fixed right-0 top-0 z-[999999] bg-red-700 p-2">
  <button
    class="text-white"
    on:click={() => {
      isOpen = !isOpen;
    }}>Toggle Dev Tools</button
  >
</div>
{#if isOpen}
  <dialog
    class="fixed top-0 z-[999999] block h-[70vh] max-w-[70vw] p-6
    shadow-xl shadow-blue-dark-blue/15"
  >
    <div class="overflow-y-scroll">
      <h2 class="font-bold">Dev Tools</h2>

      <div class="space-y-2">
        <div>$company_infos</div>
        <div class="rounded-s border border-gray-400 p-2">
          <div class="text-xs">{JSON.stringify($company_infos, null, 2)}</div>
        </div>

        <div>$accounts</div>
        <div class="rounded-s border border-gray-400 p-2">
          <div class="text-xs">{JSON.stringify($accounts, null, 2)}</div>
        </div>

        <div>$audience</div>
        <div class="rounded-s border border-gray-400 p-2">
          <div class="text-xs">{JSON.stringify($audience, null, 2)}</div>
        </div>
      </div>
    </div>
  </dialog>
{/if}
