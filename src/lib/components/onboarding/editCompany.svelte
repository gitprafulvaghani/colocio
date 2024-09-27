<!-- <script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import {company_infos} from '$lib/stores/stores';

    const dispatch = createEventDispatcher();

    let company_infos_temp = {
        name:'',
        logo:''
    }
    onMount(()=>{
        console.log('MOUHTED');
        company_infos_temp.name = $company_infos.name;
        company_infos_temp.logo = $company_infos.logo;
    })  
</script>

<div class="flex flex-col items-center gap-8">
    <div class="flex flex-col items-center gap-2">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="40" fill="#111827"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M39.8029 19.2852C28.4718 19.2852 19.2861 28.4708 19.2861 39.8019C19.2861 45.2373 21.3998 50.179 24.85 53.85L21.9341 60.3186H30.7268L31.5176 58.5769C34.0514 59.6967 36.8545 60.3186 39.8029 60.3186C43.1766 60.3186 46.3601 59.5043 49.1676 58.0615L50.1782 60.3186H58.9965L55.6276 52.8608C58.5586 49.3131 60.3196 44.7631 60.3196 39.8019C60.3196 28.6854 51.4786 19.6339 40.4443 19.295L40.4397 19.2852L40.4354 19.2947C40.2253 19.2884 40.0145 19.2852 39.8029 19.2852ZM40.4354 19.2947L39.5707 21.1943L24.85 53.85C26.7209 55.8406 28.9847 57.4575 31.5176 58.5769L33.3851 54.4639L33.5129 54.1585H47.4177L47.5455 54.4385L49.1676 58.0615C51.6609 56.7802 53.8576 55.0033 55.6276 52.8608L41.3344 21.2197L40.4443 19.295L40.4354 19.2947ZM43.6859 45.962H37.2191L40.4653 38.7837L43.6859 45.962Z" fill="white"/>
        </svg>
        <div class="flex items-center gap-4">
            <a href="">Upload</a>
            <hr class="w-[1px] h-4 bg-gray-300 border-0" />
            <a href="">Reset</a>
        </div>
    </div>
    <div class="flex flex-col text-center items-center gap-1">
        <h3 class="font-medium text-gray-600 text-sm sm:text-base">Your company name</h3>
        <input type="text" class="text-center px-4 py-3 rounded-md border border-gray-300" bind:value={company_infos_temp.name}/>
    </div>
    <div class="flex gap-4 items-center">
        <button on:click={()=>{dispatch('cancel')}} type="button" class="flex hover:bg-gray-50 text-gray-600 items-center gap-2 px-3.5 py-2 text-sm sm:text-base rounded-md bg-transparent border border-gray-200">
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.96967 5.46967C5.26256 5.17678 5.73744 5.17678 6.03033 5.46967L10 9.43934L13.9697 5.46967C14.2626 5.17678 14.7374 5.17678 15.0303 5.46967C15.3232 5.76256 15.3232 6.23744 15.0303 6.53033L11.0607 10.5L15.0303 14.4697C15.3232 14.7626 15.3232 15.2374 15.0303 15.5303C14.7374 15.8232 14.2626 15.8232 13.9697 15.5303L10 11.5607L6.03033 15.5303C5.73744 15.8232 5.26256 15.8232 4.96967 15.5303C4.67678 15.2374 4.67678 14.7626 4.96967 14.4697L8.93934 10.5L4.96967 6.53033C4.67678 6.23744 4.67678 5.76256 4.96967 5.46967Z" fill="#4B5563"/>
            </svg>
            <span>Cancel</span>
        </button>
        <button on:click={()=>{dispatch('save', {infos:company_infos_temp})}} type="button" class="flex hover:opacity-90 text-white items-center gap-2 px-3.5 py-2 text-sm sm:text-base rounded-md bg-blue-primary border border-transparent">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6612 3.125C13.7625 3.125 13.8597 3.16524 13.9313 3.23687L16.7631 6.06869C16.8348 6.14032 16.875 6.23746 16.875 6.33876V16.4931C16.875 16.704 16.704 16.875 16.4931 16.875H3.50694C3.296 16.875 3.125 16.704 3.125 16.4931V3.50694C3.125 3.296 3.296 3.125 3.50694 3.125H13.6612Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M6.18056 11.1458C6.18056 10.9349 6.35156 10.7639 6.5625 10.7639H13.4375C13.6484 10.7639 13.8194 10.9349 13.8194 11.1458V16.4931C13.8194 16.704 13.6484 16.875 13.4375 16.875H6.5625C6.35156 16.875 6.18056 16.704 6.18056 16.4931V11.1458Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M6.94444 3.50694C6.94444 3.296 7.11545 3.125 7.32639 3.125H12.6736C12.8846 3.125 13.0556 3.296 13.0556 3.50694V6.5625C13.0556 6.77344 12.8846 6.94444 12.6736 6.94444H7.32639C7.11545 6.94444 6.94444 6.77344 6.94444 6.5625V3.50694Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
            <span>Save</span>
        </button>
    </div>
</div> -->