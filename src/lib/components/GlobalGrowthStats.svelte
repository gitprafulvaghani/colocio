<script lang="ts">
    import { onMount } from 'svelte';

    let indicators = [
        {
            name: 'Profile visits',
            value: 100,
            total: 97,
            percent: 10,
        },
        {
            name: 'New page likes/follows',
            value: 80,
            total: 75,
            percent: 10,
        },
        {
            name: 'Page unlikes/unfollows',
            value: 11,
            total: 14,
            percent: -10,
        },
    ];

    const getTotalPageViews = async (): Promise<number[]> => {
        const response = await fetch('/api/metrics/page-views');

        const totalPageViews = (await response.json()) as {
            success: boolean;
            result?: number[];
            message?: string;
        };

        if (totalPageViews.success) {
            // save data on db
            await fetch('/api/metrics/page-views', {
                method: 'POST',
                body: JSON.stringify({
                    pageViews: totalPageViews.result,
                }),
            });

            return totalPageViews.result ?? [0, 0];
        } else {
            return [0, 0];
        }
    };

    const getFollwersCount = async (): Promise<number[]> => {
        const response = await fetch('/api/metrics/followers-count');

        const followersCount = (await response.json()) as {
            success: boolean;
            result: number[];
        };

        if (followersCount.success) {
            // save data on db
            await fetch('/api/metrics/followers-count', {
                method: 'POST',
                body: JSON.stringify({
                    count: followersCount.result[1],
                }),
            });

            return followersCount.result;
        } else {
            return [0, 0];
        }
    };

    onMount(async () => {
        const totalPageViews = await getTotalPageViews();
        const followersCount = await getFollwersCount();

        indicators[0].value = totalPageViews[1];
        indicators[0].total = totalPageViews[0];
        indicators[0].percent =
            ((totalPageViews[1] - totalPageViews[0]) /
                totalPageViews[0]) *
            100;

        indicators[1].value = followersCount[1];
        indicators[1].total = followersCount[0];
        indicators[1].percent =
            ((followersCount[1] - followersCount[0]) /
                followersCount[0]) *
            100;
    });
</script>

<dl
    class="grid grid-cols-1 rounded-md border border-gray-200 bg-white gap-px shadow-lg lg:grid-cols-3"
>
    {#each indicators as indicator}
        <div
            class="flex-1 flex w-full justify-between items-end p-4 lg:p-8"
        >
            <div class="flex flex-col">
                <div class="text-font_dark text-bold">
                    {indicator.name}
                </div>
                <div class="flex items-baseline">
                    <span class="text-3xl text-blue-primary"
                        >{indicator.value}</span
                    >
                    <span class="pl-1.5">from {indicator.total}</span>
                </div>
            </div>
            <div>
                <span
                    class:bg-green-100={Math.sign(indicator.percent) >= 0}
                    class:text-green_accent={Math.sign(
                        indicator.percent
                    ) >= 0}
                    class:bg-red-100={Math.sign(indicator.percent) < 0}
                    class:text-red_accent={Math.sign(indicator.percent) <
                        0}
                    class="flex items-center gap-1 text-xs font-medium mr-2 p-2 rounded-full"
                >
                    {#if Math.sign(indicator.percent) >= 0}
                        <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.333008 7.50001L1.50801 8.67501L6.16634 4.02501V14.1667H7.83301V4.02501L12.483 8.68334L13.6663 7.50001L6.99967 0.833344L0.333008 7.50001Z"
                                fill="#02AB46"
                            />
                        </svg>
                    {:else}
                        <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.6663 7.49998L12.4913 6.32498L7.83301 10.975V0.833313H6.16634V10.975L1.51634 6.31665L0.333008 7.49998L6.99967 14.1666L13.6663 7.49998Z"
                                fill="#FF4040"
                            />
                        </svg>
                    {/if}

                    {Math.abs(indicator.percent).toFixed(2)}%
                </span>
            </div>
        </div>
    {/each}
</dl>
