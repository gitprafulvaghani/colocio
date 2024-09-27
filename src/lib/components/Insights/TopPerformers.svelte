<script lang="ts">
  import Swiper from 'swiper/bundle';
  import 'swiper/css/bundle';
  import { onMount, onDestroy } from 'svelte';
  import { fetch_Tab_Performing } from '$lib/services/NewFacebook/Insights_service';
  import Loader from '$lib/components/Loader.svelte';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';
  import { createEventDispatcher } from 'svelte';

  let engagementData: any[] = [];
  const dispatch = createEventDispatcher();
  let swiper: any;
  let isLoading = false;
  let platform = '';
  // @ts-ignore

  export let title: string = 'ad';
  let number_of_slides = 1;
  let Post_Details: any[] = [];
  let Ad_Details: any[] = [];
  function updateVariableValue() {
    number_of_slides = window.innerWidth > 1024 ? 5 : 2;
    if (swiper) {
      swiper.params.slidesPerView = number_of_slides;
      swiper.update();
    }
  }

  let data = {
    picture: {
      url: 'https://scontent.famd15-2.fna.fbcdn.net/v/t39.30808-6/441165528_363555793405140_6815274963059402675_n.jpg?stp=cp1_dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=UsvXJU18HOoQ7kNvgH3CAvN&_nc_ht=scontent.famd15-2.fna&edm=AKIiGfEEAAAA&oh=00_AYBtcAEgSiC85HVo-ZXNx-ebE1HEMx0beTrIHkIaZe1cPw&oe=668056B3',
    },
  };
  $: totalCount =
    data.picture && data.picture.summary && data.picture.summary.total_count;

  // async function handle_performence_deta() {
  //   isLoading = true;
  //   try {
  //     let response;
  //     if (title === 'post') {
  //       response = await fetch_Tab_Performing('post');
  //     } else {
  //       response = await fetch_Tab_Performing('ad');
  //     }
  //     console.log('check response data ++++++', response);

  //     response.data.forEach(res => {
  //       let payload;
  //       if (title === 'post') {
  //         payload = {
  //           comments: res.comments,
  //           created_time: res.created_time,
  //           full_picture: res.full_picture,
  //           id: res.id,
  //           likes: res.likes,
  //           message: res.message,
  //           picture: res.picture,
  //           reactions: res.reactions,
  //           status_type: res.status_type,
  //           updated_time: res.updated_time,
  //           shares: res.shares,
  //         };
  //       } else {
  //         payload = {
  //           message: res.name,
  //           updated_time: res.updated_time,
  //           created_time: res.created_time,
  //           picture: res.adcreatives
  //             ? res.adcreatives.data[0].thumbnail_url
  //             : '/images/poolparty1.png',
  //           full_picture: res.adcreatives
  //             ? res.adcreatives.data[0].thumbnail_url
  //             : '/images/poolparty1.png',
  //           id: res.id,
  //         };
  //       }

  //       Post_Details = [...Post_Details, payload]; // Ensuring reactivity
  //       console.log('check post details +++++++++++++', Post_Details);
  //       engagementData = Post_Details;
  //       console.log('check dtata engagementData++++', engagementData);

  //       isLoading = false;
  //     });
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }

  async function handle_performence_deta() {
    isLoading = true;
    try {
      let response;
      if (title === 'post') {
        response = await fetch_Tab_Performing('post');
      } else {
        response = await fetch_Tab_Performing('ad');
      }

      // Assuming response.data contains the array of post/ad details
      const data = response.data.map(res => {
        if (title === 'post') {
          return {
            comments: res.comments,
            created_time: res.created_time,
            full_picture: res.full_picture,
            id: res.id,
            likes: res.likes,
            message: res.message,
            picture: res.picture,
            reactions: res.reactions,
            status_type: res.status_type,
            updated_time: res.updated_time,
            shares: res.shares,
            platform: res.platform || 'Unknown', // Add platform info if available
          };
        } else {
          return {
            message: res.name,
            updated_time: res.updated_time,
            created_time: res.created_time,
            picture: res.adcreatives
              ? res.adcreatives.data[0].thumbnail_url
              : '/images/poolparty1.png',
            full_picture: res.adcreatives
              ? res.adcreatives.data[0].thumbnail_url
              : '/images/poolparty1.png',
            id: res.id,
            platform: res.platform || 'Unknown', // Add platform info if available
          };
        }
      });

      Post_Details = data;
      engagementData = data;
      console.log('check data for post details++++++++++', engagementData);

      // Calculate engagements after data fetch
      const engagements = calculateEngagements(engagementData);

      console.log('check++++++++++++++++++++++++++++++++++++++ ', engagements);
      platform =
        engagements.Facebook > engagements.Instagram ? 'Facebook' : 'Instagram';
      dispatch('platformCalculated', { topplatform: platform });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      isLoading = false;
    }
  }

  function calculateEngagements(posts: any) {
    let platformEngagements = {
      Facebook: 0,
      Instagram: 0,
    };

    const thirtyDaysAgo = subDays(new Date(), 30);

    posts.forEach((post: any) => {
      const postDate = parseISO(post.created_time);
      console.log('Post Date:++++++++++++++++++', postDate);
      if (postDate >= thirtyDaysAgo) {
        const totalEngagements =
          (post.likes ? post.likes.summary.total_count : 0) +
          (post.comments ? post.comments.summary.total_count : 0) +
          (post.reactions ? post.reactions.summary.total_count : 0) +
          (post.shares ? post.shares.summary.total_count : 0);

        if (post.platform === 'Facebook') {
          platformEngagements.Facebook += totalEngagements;
        } else if (post.platform === 'Instagram') {
          platformEngagements.Instagram += totalEngagements;
        }
      }
    });

    return platformEngagements;
  }

  onMount(() => {
    updateVariableValue();
    handle_performence_deta();
    swiper = new Swiper('.swiper-container', {
      slidesPerView: number_of_slides,
      spaceBetween: 30,
      on: {
        resize: updateVariableValue,
      },
    });

    window.addEventListener('resize', updateVariableValue);

    return () => {
      window.removeEventListener('resize', updateVariableValue);
      if (swiper) {
        swiper.destroy();
      }
    };
  });

  onDestroy(() => {
    if (swiper) {
      swiper.destroy();
    }
  });

  const splideOptions = {
    perPage: 4,
    rewind: true,
    gap: '1rem',
    pagination: false,
    breakpoints: {
      1440: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      576: {
        perPage: 1,
      },
    },
  };
</script>

{#if isLoading}
  <div class="mt-[40px] flex w-full justify-center">
    <Loader />
  </div>
{:else}
  <!--<div class="w-full">
    <div class="flex w-full items-center gap-5">
      <button
        type="button"
        class="hidden items-center justify-center sm:flex"
        on:click={() => {
          swiper.slidePrev();
        }}
      >
        <svg
          width="29"
          height="30"
          viewBox="0 0 29 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.542 7.60484L13.0735 14.9998L20.542 22.3948L18.2427 24.6665L8.45866 14.9998L18.2427 5.33317L20.542 7.60484Z"
            fill="#0D64E8"
          />
        </svg>
      </button>

      <button
        type="button"
        class="hidden items-center justify-center sm:flex"
        on:click={() => {
          swiper.slideNext();
        }}
      >
        <svg
          width="29"
          height="30"
          viewBox="0 0 29 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.45801 22.3952L15.9265 15.0002L8.45801 7.60516L10.7573 5.3335L20.5413 15.0002L10.7573 24.6668L8.45801 22.3952Z"
            fill="#0D64E8"
          />
        </svg>
      </button>
    </div>
  </div>-->
  <div>
    <Splide
      options={splideOptions}
      aria-label="Svelte Splide Example"
    >
      {#each Post_Details as data, index}
        <SplideSlide>
          <div
            class="!mr-0 flex w-full flex-1 flex-col rounded-[10px] border border-[#D1D5DB] bg-white p-2 lg:p-4"
          >
            <div class="mb-1 flex w-full items-center justify-between gap-1">
              <div class="flex items-center gap-1">
                <span
                  class="flex h-[16px] items-center justify-center rounded-md bg-blue-dark-blue px-1 py-0.5 text-[10px] text-white"
                >
                  {title === 'ad' ? 'Ad' : 'Post'}
                </span>
                <span class="slide-head font-bold text-blue-dark-blue">
                  {data.message}
                </span>
              </div>
              <div class="flex gap-1">
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 6.20002H9.4905V5.00003C9.4905 4.38083 9.53838 3.99083 10.3815 3.99083H11.4464V2.08284C10.9282 2.02644 10.4072 1.99884 9.88556 2.00004C8.33895 2.00004 7.21021 2.99423 7.21021 4.81943V6.20002H5.5V8.60002L7.21021 8.59942V14H9.4905V8.59822L11.2383 8.59762L11.5 6.20002Z"
                    fill="#0024A4"
                  />
                </svg>
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.83333 2C3.99533 2 2.5 3.49533 2.5 5.33333V10.6667C2.5 12.5047 3.99533 14 5.83333 14H11.1667C13.0047 14 14.5 12.5047 14.5 10.6667V5.33333C14.5 3.49533 13.0047 2 11.1667 2H5.83333ZM5.83333 3.33333H11.1667C12.2693 3.33333 13.1667 4.23067 13.1667 5.33333V10.6667C13.1667 11.7693 12.2693 12.6667 11.1667 12.6667H5.83333C4.73067 12.6667 3.83333 11.7693 3.83333 10.6667V5.33333C3.83333 4.23067 4.73067 3.33333 5.83333 3.33333ZM11.8333 4C11.6565 4 11.487 4.07024 11.3619 4.19526C11.2369 4.32029 11.1667 4.48986 11.1667 4.66667C11.1667 4.84348 11.2369 5.01305 11.3619 5.13807C11.487 5.2631 11.6565 5.33333 11.8333 5.33333C12.0101 5.33333 12.1797 5.2631 12.3047 5.13807C12.4298 5.01305 12.5 4.84348 12.5 4.66667C12.5 4.48986 12.4298 4.32029 12.3047 4.19526C12.1797 4.07024 12.0101 4 11.8333 4ZM8.5 4.66667C6.662 4.66667 5.16667 6.162 5.16667 8C5.16667 9.838 6.662 11.3333 8.5 11.3333C10.338 11.3333 11.8333 9.838 11.8333 8C11.8333 6.162 10.338 4.66667 8.5 4.66667ZM8.5 6C9.60267 6 10.5 6.89733 10.5 8C10.5 9.10267 9.60267 10 8.5 10C7.39733 10 6.5 9.10267 6.5 8C6.5 6.89733 7.39733 6 8.5 6Z"
                    fill="#0024A4"
                  />
                </svg>
              </div>
            </div>
            <div
              class="mb-3 flex w-full items-center justify-start whitespace-nowrap text-xs text-gray-600"
            >
              <span class="truncate">1/2/2023, 8:00 AM</span>
              -
              <span class="truncate">14/2/2023, 8:00 AM</span>
            </div>
            <div class="mb-3 flex h-[184px] w-full items-center justify-center">
              {#if data.picture !== undefined}
                <img
                  src={data.picture}
                  alt="Profile Picture"
                  class="h-full w-full rounded-lg object-cover"
                />
              {:else}
                <img
                  src="/images/poolparty1.png"
                  class="h-full w-full rounded-[10px] object-cover"
                  alt="img"
                />
              {/if}
            </div>
            <div class="mb-3 flex w-full justify-between gap-4">
              <div class="flex flex-col">
                <span class="text-[10px] text-font_dark">Likes</span>

                {#if data?.likes?.summary?.total_count !== undefined}
                  <span class="text-lg font-bold text-[#0D64E8]"
                    >{data?.likes?.summary?.total_count}</span
                  >
                {:else}
                  <span class="text-lg font-bold text-[#0D64E8]">0</span>
                {/if}
              </div>
              <div class="flex flex-col">
                <span class="text-xs text-font_dark">Comments</span>
                {#if data?.comments?.summary?.total_count !== undefined}
                  <span class="text-lg font-bold text-[#0D64E8]"
                    >{data?.comments?.summary?.total_count}</span
                  >
                {:else}
                  <span class="text-lg font-bold text-[#0D64E8]">0</span>
                {/if}
              </div>
              <div class="flex flex-col">
                <span class="text-xs text-font_dark">Shares</span>
                {#if data?.shares !== undefined}
                  <span class="text-lg font-bold text-[#0D64E8]"
                    >{data.shares.count}</span
                  >
                {:else}
                  <span class="text-lg font-bold text-[#0D64E8]">0</span>
                {/if}
              </div>
            </div>
            <div class="mb-3 h-1.5 w-full rounded-full bg-gray-200">
              <div
                class="h-1.5 rounded-full bg-blue-600"
                style="width: 45%"
              />
            </div>
            <div class="flex items-center justify-center gap-1">
              <span class="text-[14px] font-bold text-[#0D64E8]">70%</span>
              <span class="text-[14px] text-[#6B7280]">Optimized</span>
            </div>
          </div>
        </SplideSlide>
      {/each}
    </Splide>
  </div>
{/if}

<style>
  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .disabled-button {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
