<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let message = '';
    export let type = 'info';
    export let duration = 10000;

    const dispatch = createEventDispatcher();
    let color: string;

    if (type == 'success') {
        color = 'bg-green-500';
    } else if (type == 'danger') {
        color = 'bg-red-500';
    } else {
        color = 'bg-blue-500';
    }

    setTimeout(() => {
        close();
    }, duration);

    function close() {
        dispatch('close');
    }
</script>

<div
    class="absolute z-100 left-5 bottom-5 flex items-center w-full max-w-xs p-4 mb-4 text-white {color} rounded-lg shadow-lg"
    role="alert"
>
    {#if type == 'success'}
        <span class="material-symbols-outlined"> check_circle </span>
    {:else if type == 'info'}
        <span class="material-symbols-outlined"> info </span>
    {:else if type == 'danger'}
        <span class="material-symbols-outlined"> dangerous </span>
    {/if}

    <div class="ms-3 text-sm font-normal">{message}</div>
    <button
        on:click={close}
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 text-white bg-transparent rounded-lg p-1.5 hover:text-red-500 inline-flex items-center justify-center h-8 w-8"
        data-dismiss-target="#toast-success"
        aria-label="Close"
    >
        <span class="sr-only">Close</span>
        <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
        >
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
        </svg>
    </button>
</div>
