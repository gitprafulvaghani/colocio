<script lang="ts">
    import GrowthSourcesChart from "$lib/components/GrowthSourcesChart.svelte";
    import GrowthRateChart from "./GrowthRateChart.svelte";
</script>
<div class="flex flex-col lg:flex-row gap-4">
    <div class="lg:flex-1 flex justify-center items-center w-full h-80 lg:h-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-7">
       <GrowthSourcesChart />
    </div>
    <div class="lg:flex-[2] flex justify-center items-center w-full h-80 lg:h-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:px-7 sm:py-4">
        <GrowthRateChart />
    </div>
</div>