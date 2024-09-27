<script lang="ts">
    import {calendarFilter} from '$lib/stores/stores';
    
</script>

<div class="flex flex-col lg:flex-row justify-between sm:mt-4 lg:mt-0">
    <div class="gap-2 sm:gap-4 xl:gap-8 hidden sm:flex">
        <div class="flex items-center gap-3 pl-3.5 xl:pl-0">
            <label for="countries" class="block text-sm font-medium text-gray-900 ">Type</label>
            <select id="countries" class="bg-white border p-1.5 xl:p-2.5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 xl:w-[120px]">
            <option selected>All</option>
            <option value="TODO">TODO</option>
            </select>
        </div>
        <div class="flex items-center gap-3">
            <label for="countries" class="block text-sm font-medium text-gray-900 ">Platform</label>
            <select id="countries" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block xl:w-[120px] w-20 p-1.5 xl:p-2.5">
            <option selected>All</option>
            <option value="TODO">TODO</option>
            </select>
        </div>
        <div class="flex items-center gap-3">
            <label for="countries" class="block text-sm font-medium text-gray-900 ">Format</label>
            <select id="countries" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block xl:w-[120px] w-20 p-1.5 xl:p-2.5">
            <option selected>All</option>
            <option value="TODO">TODO</option>
            </select>
        </div>
    </div>
    <div class="flex lg:items-center text-sm font-semibold">
        <button 
            on:click={() => calendarFilter.set('day')}
            class:text-blue-primary={$calendarFilter == "day"}
            type="button" class="transparent px-3.5 py-2 text-font-dark">
            Today
        </button>
        <button 
            on:click={() => calendarFilter.set("week")}
            class:text-blue-primary={$calendarFilter == "week"}
            type="button" class="transparent px-3.5 py-2 text-font-dark">
            1 week
        </button>
        <button 
            on:click={() => calendarFilter.set("month")}
            class:text-blue-primary={$calendarFilter == "month"}
            type="button" class="transparent px-3.5 py-2 text-font-dark">
            1 month
        </button>
        <button 
            on:click={() => calendarFilter.set("year")}
            class:text-blue-primary={$calendarFilter == "year"}
            type="button" class="transparent px-3.5 py-2 text-font-dark hidden sm:block">
            1 year
        </button>
        <button 
            on:click={() => calendarFilter.set("all")}
            class:text-blue-primary={$calendarFilter == "all"}    
            type="button" class="transparent px-3.5 py-2 text-font-dark hidden sm:block">
            All time
        </button>
    </div>
</div>