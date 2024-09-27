<script lang="ts">
  import { onMount } from 'svelte';
    // export let data: any; //TODO : consider removing this and using local mount/load calls
    import Loader from './Loader.svelte';

    let indicators = [
	{
		name: "Likes",
		value: 400,
		total: 914,
		percent: 10,
	},
	{
		name: "Comments",
		value: 120,
		total: 110,
		percent: -10,
	},
	{
		name: "Shares",
		value: 25,
		total: 21,
		percent: 10,
	},
	{
		name: "Messages",
		value: 100,
		total: 97,
		percent: 10,
	}
]

    async function getFakeIndicators(){
	    return new Promise((resolve, reject) => {
		setTimeout(() => {
		  resolve(indicators);
		}, 1500);
	});
}

    onMount(async () => {
		//pulled from +page.server.ts file
        await getFakeIndicators();
	});
</script>

<div class="flex flex-col lg:flex-row gap-4">
    <div class="lg:flex-1 w-full h-80 lg:h-auto p-4 bg-white border border-gray-200 rounded-lg shadow lg:p-8">
        <div class="flow-root">
            <Loader />
            <i>will load more</i>
            <ul role="list" class="divide-y divide-gray-200">
                    <p>{indicators[0].name}</p>
                    <p>{indicators[0].total}</p>
                    <p>{indicators[0].value}</p>
            </ul>
        </div>
    </div>
</div>
