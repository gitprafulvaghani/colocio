<script>
    export let checkboxValue = 0;
    export let isChecked = false;

</script>

<label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" bind:value={checkboxValue} checked={isChecked} class="sr-only peer">
    <div class="relative w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
</label>