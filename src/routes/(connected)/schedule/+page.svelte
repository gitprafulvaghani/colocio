<script lang="ts">
  import {
    library,
    StoreSharePost,
    ViewSummerStore,
    isEditModelOpen,
  } from '$lib/stores/stores';
  import { onMount } from 'svelte';
  import { Tabs, TabItem, Popover } from 'flowbite-svelte';
  import ViewMetrics from '$lib/components/ViewMetrics.svelte';
  import FullCalendar from 'svelte-fullcalendar';
  import daygridPlugin from '@fullcalendar/daygrid';
  import timegridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import {
    Get_Ad_Archive,
    Get_All_Ad_Archive,
    getAdSetById,
    getCreativeById,
    getCreativeDetails,
  } from '$lib/services/NewFacebook/NewFacebookService';
  import { get, writable } from 'svelte/store';
  import EditAd from '$lib/components/EditAd.svelte';
  import {
    getAdsPreviewData,
    getAllCampaigns,
    GetpostPreviews,
    Get_Ad_Draft,
  } from '../../../lib/services/NewFacebook/NewFacebookService';
  import Toast from '$lib/components/notification/Toast.svelte';
  import KpiPopup from '$lib/components/KpiPopup.svelte';
  import Dropdown from '$lib/components/Dropdown.svelte';
  import { getPlatfrom } from '$lib/services/NewFacebook/Insights_service';
  import Loader from '$lib/components/Loader.svelte';
  import { goto } from '$app/navigation';
  import { notification } from '$lib/components/notification/notification';
  import PostKpiPopup from '../../../lib/components/PostKpiPopup.svelte';

  const arraydetails = writable([]);
  const arraydetails2 = writable([]);
  const Ad_archive_main = writable([]);
  const Ad_draft_main = writable([]);
  export const eventStore = writable([]);

  const calarraydetails = writable([]);
  let totalItem;
  let Copyarray: any[] = [];
  let Copyarray2: any[] = [];
  let CopyDraftarray: any[] = [];
  let CopyArchivedarray: any[] = [];
  let events = [];
  let isOpen = false;
  let selected = 'All';
  let selected_library: any[] = [];
  const items = ['All', 'Ad', 'Post'];
  $: isShowEditModelOpen = $isEditModelOpen;
  let currentIndex = 0;
  let currentPromotionPage = 1;
  const postsPerPage = 10;

  const tabs = [
    {
      title: 'Promotions',
    },
    {
      title: 'Drafts',
    },
    {
      title: 'Archive',
    },
  ];
  function handleDateClick(info: any) {
    const selectedDate = info.dateStr;
    console.log('Date clicked:', selectedDate);
    const currentDate = format_CLick_Date(new Date());
    if (selectedDate >= currentDate) {
      goto(`/post?date=${selectedDate}`);
    } else {
      notification.danger('Please select valid date', 3000);
    }
  }
  function format_CLick_Date(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function showDiv(index: any) {
    const divs = document.querySelectorAll('.content');
    divs.forEach(div => div.classList.add('hidden'));
    const currentDiv = document.getElementById(index);
    if (currentDiv) {
      currentDiv.classList.remove('hidden');
    }
  }
  function handleTabClick(index: any) {
    currentIndex = index;
    showDiv(currentIndex);
  }

  $: {
    selected_library = $library.filter((media: any) => media.selected);
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function selectItem(item: string, type: string) {
    selected = item;
    isOpen = false;
    if (type === 'promotion') {
      filterByStatus(item);
    } else if (type === 'draft') {
      filterDraft(item);
    } else if (type === 'archived') {
      filterArchived(item);
    }
  }

  function filterByStatus(status: string) {
    const filteredData: Record<string, any[]> = {};
    const adData: Record<string, any[]> = {};
    //    Object.keys(Copyarray).forEach((month, year) => {
    //      filteredData[month] = Copyarray[month].filter(
    //        (post: { type: any }) => post.type == status
    //      );
    //    });
    //    arraydetails.set(filteredData);
    //
    //    if (status === "All") {
    //      arraydetails.set(Copyarray);
    //    }
    //    //-----------------------------
    //    Object.keys(Copyarray2).forEach((month) => {
    //      adData[month] = Copyarray2[month].filter(
    //        (post: { type: any }) => post.type == status
    //      );
    //    });
    //    arraydetails2.set(adData);
    //
    //    if (status === "All") {
    //      arraydetails2.set(Copyarray2);
    //    }

    Object.keys(Copyarray).forEach(monthYear => {
      filteredData[monthYear] = Copyarray[monthYear].filter(
        (post: { type: any }) => post.type == status
      );
    });
    arraydetails.set(filteredData);

    if (status === 'All') {
      arraydetails.set(Copyarray);
    }

    Object.keys(Copyarray2).forEach(monthYear => {
      adData[monthYear] = Copyarray2[monthYear].filter(
        (post: { type: any }) => post.type == status
      );
    });
    arraydetails2.set(adData);

    if (status === 'All') {
      arraydetails2.set(Copyarray2);
    }
  }

  function filterDraft(status: string) {
    const filteredData = {};
    Object.keys(CopyDraftarray).forEach(month => {
      filteredData[month] = CopyDraftarray[month].filter(
        (post: { type: any }) => post.type == status
      );
    });
    Ad_draft_main.set(filteredData);

    if (status === 'All') {
      Ad_draft_main.set(CopyDraftarray);
    }
  }

  function filterArchived(status: string) {
    const filteredData = {};
    Object.keys(CopyArchivedarray).forEach(month => {
      filteredData[month] = CopyArchivedarray[month].filter(
        (post: { type: any }) => post.type == status
      );
    });
    Ad_archive_main.set(filteredData);

    if (status === 'All') {
      Ad_archive_main.set(CopyArchivedarray);
    }
  }

  $: startIndex = (currentPromotionPage - 1) * postsPerPage;
  $: endIndex = startIndex + postsPerPage;

  // let typeSelected = "All";
  // const typeItems = ["All", "Post", "Ad"];

  let options = {
    droppable: true,
    editable: true,
    initialView: 'timeGridWeek',
    plugins: [daygridPlugin, timegridPlugin, interactionPlugin],
    headerToolbar: {
      right: 'dayGridMonth,timeGridWeek prev,today,next',
      left: 'title',
    },
    height: '50%',
    //weekends: true,
    allDayDefault: false,
    eventContent: renderEventContent,
    events: (fetchInfo, successCallback, failureCallback) => {
      eventStore.subscribe(events => {
        // console.log("events", events);

        successCallback(events);
      });
    },
    dateClick: handleDateClick,
  };

  let calendarComponentRef: { getAPI: () => any };
  function renderEventContent(eventInfo) {
    let imageUrl = eventInfo.event.extendedProps.image_url;
    let title = eventInfo.event.title;
    let type = eventInfo.event.extendedProps.type;
    let start = eventInfo.event.start;
    let end = eventInfo.event.end;
    let startTime = start
      ? start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '';
    let endTime = end
      ? end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '';

    if (imageUrl) {
      if (type === 'Post') {
        return {
          html: `
          <div class="fc-event-content post-data">
                          <div class='fc-heading'>
                              <span class="post-budge">${type}</span>
                              <span class='fc-timing'>${startTime} - ${endTime}</span>
                          </div>
                          <div class='photo-post'>
                              <img class="event-image" src="${imageUrl}" alt="${title}" style="width:100%; margin:0;"/>
                              <div class='social-btns'>
                                  <button>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                      <path d="M11 6.20002H8.9905V5.00003C8.9905 4.38083 9.03838 3.99083 9.88152 3.99083H10.9464V2.08284C10.4282 2.02644 9.90717 1.99884 9.38556 2.00004C7.83895 2.00004 6.71021 2.99423 6.71021 4.81943V6.20002H5V8.60002L6.71021 8.59942V14H8.9905V8.59822L10.7383 8.59762L11 6.20002Z" fill="#0D64E8"/>
                                      </svg>
                                  </button>
                                  <button>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                          <path d="M5.33333 2C3.49533 2 2 3.49533 2 5.33333V10.6667C2 12.5047 3.49533 14 5.33333 14H10.6667C12.5047 14 14 12.5047 14 10.6667V5.33333C14 3.49533 12.5047 2 10.6667 2H5.33333ZM5.33333 3.33333H10.6667C11.7693 3.33333 12.6667 4.23067 12.6667 5.33333V10.6667C12.6667 11.7693 11.7693 12.6667 10.6667 12.6667H5.33333C4.23067 12.6667 3.33333 11.7693 3.33333 10.6667V5.33333C3.33333 4.23067 4.23067 3.33333 5.33333 3.33333ZM11.3333 4C11.1565 4 10.987 4.07024 10.8619 4.19526C10.7369 4.32029 10.6667 4.48986 10.6667 4.66667C10.6667 4.84348 10.7369 5.01305 10.8619 5.13807C10.987 5.2631 11.1565 5.33333 11.3333 5.33333C11.5101 5.33333 11.6797 5.2631 11.8047 5.13807C11.9298 5.01305 12 4.84348 12 4.66667C12 4.48986 11.9298 4.32029 11.8047 4.19526C11.6797 4.07024 11.5101 4 11.3333 4ZM8 4.66667C6.162 4.66667 4.66667 6.162 4.66667 8C4.66667 9.838 6.162 11.3333 8 11.3333C9.838 11.3333 11.3333 9.838 11.3333 8C11.3333 6.162 9.838 4.66667 8 4.66667ZM8 6C9.10267 6 10 6.89733 10 8C10 9.10267 9.10267 10 8 10C6.89733 10 6 9.10267 6 8C6 6.89733 6.89733 6 8 6Z" fill="#0D64E8"/>
                                      </svg>
                                  </button>
                                  <button>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                      <path d="M9.88196 3H8.30354V9.81158C8.30354 10.6232 7.69646 11.2899 6.94098 11.2899C6.1855 11.2899 5.57842 10.6232 5.57842 9.81158C5.57842 9.0145 6.17201 8.36231 6.90052 8.33333V6.62319C5.29511 6.65217 4 8.05797 4 9.81158C4 11.5797 5.32209 13 6.95448 13C8.58684 13 9.90893 11.5652 9.90893 9.81158V6.31883C10.5025 6.78261 11.231 7.05797 12 7.07247V5.36232C10.8128 5.31884 9.88196 4.27536 9.88196 3Z" fill="#0D64E8"/>
                                      </svg>
                                  </button>
                              </div>
                          </div>
                          <div class="event-des">${title}</div>
                      </div>
                    `,
        };
      } else if (type === 'Ad') {
        return {
          html: `
          <div class="fc-event-content post-data ad-data">
              <div class='fc-heading'>
                <div>
                  <img class="event-image" src="${imageUrl}" alt="${title}" style="width:100%;"/>
                </div>
             <div class="add-timer-main"> <div class="add-time-set">
               <div class="add-time-social">
                 <div class="post-budge">${type}</div>
                  <div class='fc-timing'>${startTime} - ${endTime}</div>
                  </div>
                  <div class='social-btns'>
                      <button>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M11 6.20002H8.9905V5.00003C8.9905 4.38083 9.03838 3.99083 9.88152 3.99083H10.9464V2.08284C10.4282 2.02644 9.90717 1.99884 9.38556 2.00004C7.83895 2.00004 6.71021 2.99423 6.71021 4.81943V6.20002H5V8.60002L6.71021 8.59942V14H8.9905V8.59822L10.7383 8.59762L11 6.20002Z" fill="#0D64E8"/>
                          </svg>
                      </button>
                      <button>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M5.33333 2C3.49533 2 2 3.49533 2 5.33333V10.6667C2 12.5047 3.49533 14 5.33333 14H10.6667C12.5047 14 14 12.5047 14 10.6667V5.33333C14 3.49533 12.5047 2 10.6667 2H5.33333ZM5.33333 3.33333H10.6667C11.7693 3.33333 12.6667 4.23067 12.6667 5.33333V10.6667C12.6667 11.7693 11.7693 12.6667 10.6667 12.6667H5.33333C4.23067 12.6667 3.33333 11.7693 3.33333 10.6667V5.33333C3.33333 4.23067 4.23067 3.33333 5.33333 3.33333ZM11.3333 4C11.1565 4 10.987 4.07024 10.8619 4.19526C10.7369 4.32029 10.6667 4.48986 10.6667 4.66667C10.6667 4.84348 10.7369 5.01305 10.8619 5.13807C10.987 5.2631 11.1565 5.33333 11.3333 5.33333C11.5101 5.33333 11.6797 5.2631 11.8047 5.13807C11.9298 5.01305 12 4.84348 12 4.66667C12 4.48986 11.9298 4.32029 11.8047 4.19526C11.6797 4.07024 11.5101 4 11.3333 4ZM8 4.66667C6.162 4.66667 4.66667 6.162 4.66667 8C4.66667 9.838 6.162 11.3333 8 11.3333C9.838 11.3333 11.3333 9.838 11.3333 8C11.3333 6.162 9.838 4.66667 8 4.66667ZM8 6C9.10267 6 10 6.89733 10 8C10 9.10267 9.10267 10 8 10C6.89733 10 6 9.10267 6 8C6 6.89733 6.89733 6 8 6Z" fill="#0D64E8"/>
                          </svg>
                      </button>
                      <button>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M9.88196 3H8.30354V9.81158C8.30354 10.6232 7.69646 11.2899 6.94098 11.2899C6.1855 11.2899 5.57842 10.6232 5.57842 9.81158C5.57842 9.0145 6.17201 8.36231 6.90052 8.33333V6.62319C5.29511 6.65217 4 8.05797 4 9.81158C4 11.5797 5.32209 13 6.95448 13C8.58684 13 9.90893 11.5652 9.90893 9.81158V6.31883C10.5025 6.78261 11.231 7.05797 12 7.07247V5.36232C10.8128 5.31884 9.88196 4.27536 9.88196 3Z" fill="#0D64E8"/>
                          </svg>
                      </button>
                  </div>
                  </div>
                  <div class="event-des">${title}</div>
                  </div>

          </div>`,
        };
      }
    } else {
      return {
        html: `<div class="fc-event-content"><div>${title}</div></div>`,
      };
    }
  }

  let eventData = { title: 'my event', duration: '02:00' };

  function toggleWeekends() {
    options = { ...options, weekends: !options.weekends };
  }

  function gotoPast() {
    let calendarApi = calendarComponentRef.getAPI();
    calendarApi.gotoDate('2000-01-01');
  }

  function SharePost(details: any[]) {
    StoreSharePost.set(details);
  }
  let isModelOpen = false;
  let SendPostDetails = {};

  function toggleModel(value: any) {
    isModelOpen = true;
    SendPostDetails = {
      Modalopen: isModelOpen,
      details: value,
    };
    ViewSummerStore.set(SendPostDetails);
  }
  let postToEdit = {};
  function openEditModel(post: {}) {
    postToEdit = post;
    isEditModelOpen.set(true);
  }

  async function GetPreview(type = 'All') {
    try {
      const PostData = await GetpostPreviews();
      const AdData = await getAdsPreviewData();

      const details: any[] = [];

      let combinedData: any[] = [];

      if (type === 'All' || type === 'Post') {
        combinedData = [
          ...combinedData,
          ...PostData.map((res: any) => ({
            title: res.message,
            start: res.created_time || '2024-06-01T10:00:00',
            end: res.created_time || '2024-05-17T12:24:50+0000',
            image_url: res.full_picture || '/images/post-type.png',
            type: 'Post',
          })),
        ];
      }

      if (type === 'All' || type === 'Ad') {
        combinedData = [
          ...combinedData,
          ...AdData.map((res: any) => ({
            title: res.name,
            start: res.date_start || '2024-06-01T10:00:00',
            end: res.date_stop || '2024-06-01T10:00:00',
            image_url: res.full_picture || '/images/post-type.png',
            type: 'Ad',
          })),
        ];
      }

      details.push(...combinedData);
      eventStore.set(details);

      const detailsData: any[] = [];
      const detailsData2: any[] = [];

      PostData.forEach((res: any) => {
        const response = {
          created_time: res.created_time || '2024-06-01T10:00:00',
          full_picture: res.full_picture || '/images/post-type.png',
          id: res.id,
          message: res.message,
          type: 'Post',
          postTypeImage: '/images/post-type.png',
          postTypeColor: '#0D64E8',
          platforms_ad: ['Facebook', 'Instagram'],
          scheduled: '9/2/2023, 8:00 AM',
          status: res.status,
        };
        detailsData.push(response);
      });

      for (const ad of AdData) {
        let full_picture = ad.thumbnail_url;

        if (ad.creative && ad.creative.id && !full_picture) {
          const creativeDetails = await getCreativeDetails(ad.creative.id);
          full_picture = creativeDetails.thumbnail_url;
        }

        const response = {
          created_time: ad.created_time || '2024-06-01T10:00:00',
          full_picture: full_picture,
          platform: ad.platforms_ad,
          id: ad.id,
          message: ad.name,
          type: 'Ad',
          postTypeImage: '/images/post-type.png',
          postTypeColor: '#0D64E8',
          platforms_ad: ['Facebook', 'Instagram'],
          scheduled: '9/2/2023, 8:00 AM',
          status: ad.status,
          goal: ad.optimization_goal,
        };
        detailsData2.push(response);
      }

      const groupData = groupPromotionPostsByMonth(detailsData);
      arraydetails.set(groupData);
      arraydetails2.set(detailsData2);

      Copyarray = groupData;
      Copyarray2 = detailsData2;
      eventStore.set(details);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  async function All_Ad_Archive() {
    const final_Archive_Details = await Get_All_Ad_Archive();

    const details: any[] = [];
    final_Archive_Details.forEach(
      (res: { ad_delivery_start_time: any; id: any; page_name: any }) => {
        const response = {
          created_time: res.ad_delivery_start_time,
          id: res.id,
          message: res.page_name,
          type: 'Post',
          postTypeImage: '/images/post-type.png',
          postTypeColor: '#0D64E8',
          platforms_ad: ['Facebook', 'Instagram'],
          scheduled: '9/2/2023, 8:00 AM',
          status: 'processing',
        };
        details.push(response);
      }
    );
    const groupedData = groupPostsByMonth(details);
    CopyArchivedarray = groupedData;
    Ad_archive_main.set(groupedData);
  }

  async function Ad_Draft() {
    const campain = await getAllCampaigns();

    const Details = await Get_Ad_Draft();
    const details: any[] = [];
    Details.forEach(
      (res: { created_time: any; id: any; name: any; status: any }) => {
        const response = {
          created_time: res.created_time,
          id: res.id,
          message: res.name,
          type: 'Post',
          postTypeImage: '/images/post-type.png',
          postTypeColor: '#0D64E8',
          platforms_ad: ['Facebook', 'Instagram'],
          scheduled: '9/2/2023, 8:00 AM',
          status: res.status,
        };
        details.push(response);
      }
    );
    const groupedData = groupPostsByMonth(details);
    CopyDraftarray = groupedData;
    Ad_draft_main.set(groupedData);
  }

  async function Ad_Archive() {
    const Details = await Get_Ad_Archive();
  }

  async function creativeID() {
    const data = await getCreativeById();
  }

  async function adSetID() {
    const data = await getAdSetById();
  }

  function formatDate(isoString: string | number | Date) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function groupPostsByMonth(posts: any[]) {
    return posts.reduce(
      (
        acc: Record<string, any[]>,
        post: { created_time: string | number | Date }
      ) => {
        //    const month = new Date(post.created_time).getMonth();
        //    if (!acc[month]) {
        //      acc[month] = [];
        //    }
        //    acc[month].push(post);
        //    return acc;
        //  },

        const date = new Date(post.created_time);
        const monthYear = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, '0')}`;
        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(post);
        return acc;
      },
      {}
    );
  }

  function groupPromotionPostsByMonth(posts: any[]) {
    return posts.reduce(
      (
        acc: Record<string, any[]>,
        post: { created_time: string | number | Date }
      ) => {
        const date = new Date(post.created_time);
        const monthYear = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, '0')}`;
        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(post);
        return acc;
      },
      {}
    );
  }

  let typeSelected = 'All';
  const typeItems = ['All', 'Post', 'Ad'];

  $: handleValueChange(typeSelected);

  async function handleValueChange(data: any) {
    typeSelected = data;
    console.log('+++++++++++++++++++', typeSelected);
    try {
      const api = calendarComponentRef;
      await GetPreview(typeSelected);

      console.log('type select log');
    } catch (error) {
      console.error('Error accessing FullCalendar API:', error);
    }
  }

  let popoverOpen = false;

  function openPopover() {
    popoverOpen = true;
  }

  onMount(() => {
    openPopover();
    getPlatfrom();
    Ad_Draft();
    All_Ad_Archive();
  });

  onMount(async () => {
    await GetPreview(typeSelected);
  });

  let isOpen2 = false;
</script>

<div class="p-4 pb-[80px]">
  <Toast />
  <h2 class="text-[22px] font-medium text-[#4B5563] sm:text-[24px]">
    Schedule
  </h2>
  <div
    class="mt-[20px] rounded-[12px] bg-white p-4 shadow-[0px_4px_9px_0px_#00000014] lg:p-8"
  >
    <div class="demo-app-calendar calendar-main relative">
      <FullCalendar
        bind:this={calendarComponentRef}
        events={eventStore}
        eventContent={renderEventContent}
        {options}
      />
      <div class="absolute right-0 top-[172px] sm:top-[67px] md:top-0">
        <Dropdown
          label=""
          items={typeItems}
          selected={typeSelected}
          on:change={e => {
            typeSelected = e.detail;
          }}
        />
      </div>
    </div>
  </div>
  <div
    class="mt-[20px] rounded-[12px] bg-white p-4 shadow-[0px_4px_9px_0px_#00000014] lg:p-8"
  >
    <div class="">
      <Tabs class="tab-main border-b-[1px] border-b-[#E5E7EB]">
        {#each tabs as tab, index (tab.title)}
          <div
            class="tab-data tab-data3 !max-w-auto flex !min-w-[90px] flex-col items-center justify-center sm:!min-w-[114px] {currentIndex ===
            index
              ? 'active'
              : ''}"
            on:click={() => handleTabClick(index)}
          >
            <TabItem
              open={currentIndex === index}
              title={tab.title}
            >
              <p class="text-[14px] text-[#4B5563] dark:text-gray-400">
                <b>{tab.title}</b>
              </p>
            </TabItem>
          </div>
        {/each}
      </Tabs>

      <!-- ====================== promotion ===================== -->
      <div
        id="0"
        class="content"
      >
        <div
          class="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <h1 class="text-[18px] font-semibold text-[#111827]">Promotions</h1>
          <div
            class="flex flex-col gap-[20px] sm:flex-row sm:items-center sm:gap-[32px]"
          >
            <div class="flex items-center gap-[10px]">
              <input
                id="green-checkbox"
                type="checkbox"
                class="rounded border-[1px] border-[#D5DAE1] bg-white text-[#6FAA79]"
              />
              <label
                for="green-checkbox"
                class="whitespace-nowrap text-[14px] text-[#111827]"
                >Group Campaigns</label
              >
            </div>
            <div class="dropdown w-full sm:w-auto">
              <button
                class="dropdown-button !w-full sm:!w-[120px]"
                on:click={toggleDropdown}
              >
                <span>{selected}</span>
                <svg
                  class="w-[14px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4.90065 5.83301L10.0007 10.9837L15.1007 5.83301L16.6673 7.4187L10.0007 14.1663L3.33398 7.4187L4.90065 5.83301Z"
                    fill="#000"
                  />
                </svg>
              </button>
              <div
                class="dropdown-content relative !z-20 {isOpen ? 'show' : ''}"
              >
                {#each items as item}
                  <div
                    class="dropdown-item"
                    on:click={() => selectItem(item, 'promotion')}
                  >
                    {item}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>

        {#if $arraydetails.length === 0}
          <div class="mt-[40px]">
            <Loader />
          </div>
        {:else}
          <div class="custom-scroll max-h-[470px] overflow-x-auto">
            <table class="w-full">
              <thead
                class="sticky top-0 z-10 border-b-[1px] border-b-[#D1D5DB] bg-white"
              >
                <th class="w-[51px]" />
                <th
                  class="h-[52px] text-left text-[14px] font-semibold text-[#111827]"
                  >Type</th
                >
                <th
                  class="h-[52px] px-4 text-left text-[14px] font-semibold text-[#111827]"
                  >Description/Caption</th
                >
                <th
                  class="h-[52px] px-4 text-left text-[14px] font-semibold text-[#111827]"
                  >Schedule</th
                >
                <th />
                <th />
              </thead>
              <tbody>
                {#if Object.values($arraydetails).every(arr => arr.length > 0)}
                  {#each Object.keys($arraydetails) as month}
                    <tr>
                      <td colspan="5">
                        <p
                          class="pb-[8px] pt-[16px] text-[14px] font-semibold text-[#111827]"
                        >
                          {new Date(month).toLocaleString('default', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </td>
                    </tr>
                    {#each $arraydetails[month] as post}
                      <tr>
                        <td class=" py-[7.5px] pr-[12px]">
                          <div class="flex h-[38px] w-[38px] items-center">
                            <img
                              src={post.full_picture ||
                                post.thumbnail_url ||
                                '/images/post-type.png'}
                              alt="post-type"
                              class="h-full w-full rounded-[6px] object-cover"
                            />
                          </div>
                        </td>
                        <td class="py-[7.5px] pr-4">
                          <div class="flex gap-1">
                            <div
                              class:bg-[#0D64E8]={post.type === 'Post'}
                              class=" flex h-[21px] w-fit items-center justify-center rounded-md bg-[#0024A4] p-[3px_5px] text-[12px] text-white"
                            >
                              {post.type}
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-[7.5px]"
                          ><p class="message-clip text-[14px] text-[#4B5563]">
                            {post.message}
                          </p></td
                        >
                        <td class="px-4 py-[7.5px]">
                          <div
                            class="flex items-center justify-between gap-2 pr-[16px]"
                          >
                            <div class="flex items-center gap-2">
                              {#if post.status === 'added_photos'}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <rect
                                    width="20"
                                    height="20"
                                    rx="10"
                                    fill="#E4FDEA"
                                  />
                                  <g opacity="0.2">
                                    <path
                                      d="M5.91698 8.1378H14.0836V6.67945C14.0836 6.63457 14.0649 6.59343 14.0276 6.55603C13.9902 6.51864 13.949 6.49995 13.9041 6.49995H6.09648C6.05161 6.49995 6.01047 6.51864 5.97306 6.55603C5.93567 6.59343 5.91698 6.63457 5.91698 6.67945V8.1378ZM6.09648 15.5416C5.80182 15.5416 5.55241 15.4395 5.34824 15.2353C5.14408 15.0312 5.04199 14.7818 5.04199 14.4871V6.67945C5.04199 6.38479 5.14408 6.13538 5.34824 5.93121C5.55241 5.72704 5.80182 5.62496 6.09648 5.62496H6.90418V4.39099H7.8016V5.62496H12.2215V4.39099H13.0964V5.62496H13.9041C14.1988 5.62496 14.4482 5.72704 14.6524 5.93121C14.8565 6.13538 14.9586 6.38479 14.9586 6.67945V9.86645C14.8188 9.80513 14.6759 9.75559 14.5301 9.71782C14.3843 9.68006 14.2355 9.65033 14.0836 9.62864V9.01279H5.91698V14.4871C5.91698 14.532 5.93567 14.5731 5.97306 14.6105C6.01047 14.6479 6.05161 14.6666 6.09648 14.6666H9.88927C9.93863 14.8281 9.99827 14.9809 10.0682 15.1248C10.1381 15.2688 10.2176 15.4077 10.3066 15.5416H6.09648ZM13.6125 16.1249C12.8841 16.1249 12.2645 15.8695 11.7537 15.3588C11.2429 14.848 10.9875 14.2284 10.9875 13.4999C10.9875 12.7715 11.2429 12.1519 11.7537 11.6411C12.2645 11.1304 12.8841 10.875 13.6125 10.875C14.3409 10.875 14.9605 11.1304 15.4713 11.6411C15.9821 12.1519 16.2375 12.7715 16.2375 13.4999C16.2375 14.2284 15.9821 14.848 15.4713 15.3588C14.9605 15.8695 14.3409 16.1249 13.6125 16.1249ZM14.584 14.8349L14.9474 14.4714L13.8705 13.3945V11.7836H13.3545V13.6054L14.584 14.8349Z"
                                      fill="#02AB46"
                                    />
                                  </g>
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M15.0382 6.71212C15.2432 6.91714 15.2432 7.24956 15.0382 7.45458L8.82773 13.665C8.5088 13.9839 7.99172 13.9839 7.67279 13.665L4.96236 10.9546C4.75734 10.7496 4.75734 10.4171 4.96236 10.2121C5.16739 10.0071 5.4998 10.0071 5.70482 10.2121L8.25026 12.7576L14.2957 6.71212C14.5007 6.50709 14.8331 6.50709 15.0382 6.71212Z"
                                    fill="#1B1D1F"
                                  />
                                </svg>
                              {/if}
                              {#if post.status === 'mobile_status_update'}
                                <svg
                                  width="17"
                                  height="18"
                                  viewBox="0 0 17 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.16697 6.33977H13.8336V4.25641C13.8336 4.1923 13.8069 4.13353 13.7535 4.0801C13.7001 4.02668 13.6413 3.99997 13.5772 3.99997H2.42341C2.3593 3.99997 2.30053 4.02668 2.2471 4.0801C2.19368 4.13353 2.16697 4.1923 2.16697 4.25641V6.33977ZM2.42341 16.9166C2.00246 16.9166 1.64616 16.7708 1.35449 16.4791C1.06283 16.1875 0.916992 15.8311 0.916992 15.4102V4.25641C0.916992 3.83547 1.06283 3.47916 1.35449 3.18749C1.64616 2.89583 2.00246 2.74999 2.42341 2.74999H3.57726V0.987183H4.85928V2.74999H11.1734V0.987183H12.4233V2.74999H13.5772C13.9981 2.74999 14.3545 2.89583 14.6461 3.18749C14.9378 3.47916 15.0836 3.83547 15.0836 4.25641V8.80927C14.8838 8.72167 14.6798 8.65089 14.4715 8.59693C14.2631 8.54299 14.0505 8.50052 13.8336 8.46954V7.58975H2.16697V15.4102C2.16697 15.4743 2.19368 15.5331 2.2471 15.5865C2.30053 15.6399 2.3593 15.6666 2.42341 15.6666H7.84168C7.91219 15.8974 7.9974 16.1156 8.09728 16.3213C8.19717 16.5269 8.31069 16.7254 8.43783 16.9166H2.42341ZM13.1606 17.75C12.12 17.75 11.2348 17.3851 10.5051 16.6554C9.77544 15.9257 9.4106 15.0406 9.4106 14C9.4106 12.9594 9.77544 12.0742 10.5051 11.3445C11.2348 10.6148 12.12 10.25 13.1606 10.25C14.2012 10.25 15.0863 10.6148 15.816 11.3445C16.5457 12.0742 16.9105 12.9594 16.9105 14C16.9105 15.0406 16.5457 15.9257 15.816 16.6554C15.0863 17.3851 14.2012 17.75 13.1606 17.75ZM14.5484 15.907L15.0676 15.3878L13.5292 13.8493V11.5481H12.792V14.1506L14.5484 15.907Z"
                                    fill="#4B5563"
                                  />
                                </svg>
                              {/if}
                              {#if post.status === 'ACTIVE'}
                                <svg
                                  width="17"
                                  height="18"
                                  viewBox="0 0 17 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.16697 6.33977H13.8336V4.25641C13.8336 4.1923 13.8069 4.13353 13.7535 4.0801C13.7001 4.02668 13.6413 3.99997 13.5772 3.99997H2.42341C2.3593 3.99997 2.30053 4.02668 2.2471 4.0801C2.19368 4.13353 2.16697 4.1923 2.16697 4.25641V6.33977ZM2.42341 16.9166C2.00246 16.9166 1.64616 16.7708 1.35449 16.4791C1.06283 16.1875 0.916992 15.8311 0.916992 15.4102V4.25641C0.916992 3.83547 1.06283 3.47916 1.35449 3.18749C1.64616 2.89583 2.00246 2.74999 2.42341 2.74999H3.57726V0.987183H4.85928V2.74999H11.1734V0.987183H12.4233V2.74999H13.5772C13.9981 2.74999 14.3545 2.89583 14.6461 3.18749C14.9378 3.47916 15.0836 3.83547 15.0836 4.25641V8.80927C14.8838 8.72167 14.6798 8.65089 14.4715 8.59693C14.2631 8.54299 14.0505 8.50052 13.8336 8.46954V7.58975H2.16697V15.4102C2.16697 15.4743 2.19368 15.5331 2.2471 15.5865C2.30053 15.6399 2.3593 15.6666 2.42341 15.6666H7.84168C7.91219 15.8974 7.9974 16.1156 8.09728 16.3213C8.19717 16.5269 8.31069 16.7254 8.43783 16.9166H2.42341ZM13.1606 17.75C12.12 17.75 11.2348 17.3851 10.5051 16.6554C9.77544 15.9257 9.4106 15.0406 9.4106 14C9.4106 12.9594 9.77544 12.0742 10.5051 11.3445C11.2348 10.6148 12.12 10.25 13.1606 10.25C14.2012 10.25 15.0863 10.6148 15.816 11.3445C16.5457 12.0742 16.9105 12.9594 16.9105 14C16.9105 15.0406 16.5457 15.9257 15.816 16.6554C15.0863 17.3851 14.2012 17.75 13.1606 17.75ZM14.5484 15.907L15.0676 15.3878L13.5292 13.8493V11.5481H12.792V14.1506L14.5484 15.907Z"
                                    fill="#4B5563"
                                  />
                                </svg>
                              {/if}
                              <p
                                class="whitespace-nowrap text-[14px] text-[#4B5563]"
                              >
                                {formatDate(post.created_time)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex h-full items-center">
                            <div
                              class="flex h-[35px] items-center gap-[2px] border-r-[1px] border-r-[#E5E7EB] px-[16px]"
                            >
                              {#if post.platforms_ad.includes('Facebook')}
                                <svg
                                  width="6"
                                  height="12"
                                  viewBox="0 0 6 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6 4.20002H3.9905V3.00003C3.9905 2.38083 4.03838 1.99083 4.88152 1.99083H5.94641V0.0828372C5.42822 0.0264374 4.90717 -0.0011625 4.38556 3.74999e-05C2.83895 3.74999e-05 1.71021 0.994234 1.71021 2.81943V4.20002H0V6.60002L1.71021 6.59942V12H3.9905V6.59822L5.73834 6.59762L6 4.20002Z"
                                    fill="#111827"
                                  />
                                </svg>
                              {/if}
                              {#if post.platforms_ad.includes('Instagram')}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <rect
                                    width="20"
                                    height="20"
                                    rx="10"
                                    fill="white"
                                  />
                                  <path
                                    d="M7.33333 4C5.49533 4 4 5.49533 4 7.33333V12.6667C4 14.5047 5.49533 16 7.33333 16H12.6667C14.5047 16 16 14.5047 16 12.6667V7.33333C16 5.49533 14.5047 4 12.6667 4H7.33333ZM7.33333 5.33333H12.6667C13.7693 5.33333 14.6667 6.23067 14.6667 7.33333V12.6667C14.6667 13.7693 13.7693 14.6667 12.6667 14.6667H7.33333C6.23067 14.6667 5.33333 13.7693 5.33333 12.6667V7.33333C5.33333 6.23067 6.23067 5.33333 7.33333 5.33333ZM13.3333 6C13.1565 6 12.987 6.07024 12.8619 6.19526C12.7369 6.32029 12.6667 6.48986 12.6667 6.66667C12.6667 6.84348 12.7369 7.01305 12.8619 7.13807C12.987 7.2631 13.1565 7.33333 13.3333 7.33333C13.5101 7.33333 13.6797 7.2631 13.8047 7.13807C13.9298 7.01305 14 6.84348 14 6.66667C14 6.48986 13.9298 6.32029 13.8047 6.19526C13.6797 6.07024 13.5101 6 13.3333 6ZM10 6.66667C8.162 6.66667 6.66667 8.162 6.66667 10C6.66667 11.838 8.162 13.3333 10 13.3333C11.838 13.3333 13.3333 11.838 13.3333 10C13.3333 8.162 11.838 6.66667 10 6.66667ZM10 8C11.1027 8 12 8.89733 12 10C12 11.1027 11.1027 12 10 12C8.89733 12 8 11.1027 8 10C8 8.89733 8.89733 8 10 8Z"
                                    fill="#111827"
                                  />
                                </svg>
                              {/if}
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-[7.5px]">
                          <div class="flex justify-end gap-[16px]">
                            <button on:click={() => SharePost(post)}>
                              <a href="/sharepost">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M18 22C17.1667 22 16.4583 21.7083 15.875 21.125C15.2917 20.5417 15 19.8333 15 19C15 18.8833 15.0083 18.7625 15.025 18.6375C15.0417 18.5125 15.0667 18.4 15.1 18.3L8.05 14.2C7.76667 14.45 7.45 14.6458 7.1 14.7875C6.75 14.9292 6.38333 15 6 15C5.16667 15 4.45833 14.7083 3.875 14.125C3.29167 13.5417 3 12.8333 3 12C3 11.1667 3.29167 10.4583 3.875 9.875C4.45833 9.29167 5.16667 9 6 9C6.38333 9 6.75 9.07083 7.1 9.2125C7.45 9.35417 7.76667 9.55 8.05 9.8L15.1 5.7C15.0667 5.6 15.0417 5.4875 15.025 5.3625C15.0083 5.2375 15 5.11667 15 5C15 4.16667 15.2917 3.45833 15.875 2.875C16.4583 2.29167 17.1667 2 18 2C18.8333 2 19.5417 2.29167 20.125 2.875C20.7083 3.45833 21 4.16667 21 5C21 5.83333 20.7083 6.54167 20.125 7.125C19.5417 7.70833 18.8333 8 18 8C17.6167 8 17.25 7.92917 16.9 7.7875C16.55 7.64583 16.2333 7.45 15.95 7.2L8.9 11.3C8.93333 11.4 8.95833 11.5125 8.975 11.6375C8.99167 11.7625 9 11.8833 9 12C9 12.1167 8.99167 12.2375 8.975 12.3625C8.95833 12.4875 8.93333 12.6 8.9 12.7L15.95 16.8C16.2333 16.55 16.55 16.3542 16.9 16.2125C17.25 16.0708 17.6167 16 18 16C18.8333 16 19.5417 16.2917 20.125 16.875C20.7083 17.4583 21 18.1667 21 19C21 19.8333 20.7083 20.5417 20.125 21.125C19.5417 21.7083 18.8333 22 18 22ZM18 6C18.2833 6 18.5208 5.90417 18.7125 5.7125C18.9042 5.52083 19 5.28333 19 5C19 4.71667 18.9042 4.47917 18.7125 4.2875C18.5208 4.09583 18.2833 4 18 4C17.7167 4 17.4792 4.09583 17.2875 4.2875C17.0958 4.47917 17 4.71667 17 5C17 5.28333 17.0958 5.52083 17.2875 5.7125C17.4792 5.90417 17.7167 6 18 6ZM6 13C6.28333 13 6.52083 12.9042 6.7125 12.7125C6.90417 12.5208 7 12.2833 7 12C7 11.7167 6.90417 11.4792 6.7125 11.2875C6.52083 11.0958 6.28333 11 6 11C5.71667 11 5.47917 11.0958 5.2875 11.2875C5.09583 11.4792 5 11.7167 5 12C5 12.2833 5.09583 12.5208 5.2875 12.7125C5.47917 12.9042 5.71667 13 6 13ZM18 20C18.2833 20 18.5208 19.9042 18.7125 19.7125C18.9042 19.5208 19 19.2833 19 19C19 18.7167 18.9042 18.4792 18.7125 18.2875C18.5208 18.0958 18.2833 18 18 18C17.7167 18 17.4792 18.0958 17.2875 18.2875C17.0958 18.4792 17 18.7167 17 19C17 19.2833 17.0958 19.5208 17.2875 19.7125C17.4792 19.9042 17.7167 20 18 20Z"
                                    fill="#0D64E8"
                                  />
                                </svg>
                              </a>
                            </button>
                            <div class="group relative">
                              <button
                                id={`button-${post.id}`}
                                class:opacity-30={post.status === 'processing'}
                                disabled={post.status === 'processing'}
                                on:click={() => toggleModel(post)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17ZM19.5 19.1H4.5V5H19.5V19.1ZM19.5 3H4.5C3.4 3 2.5 3.9 2.5 5V19C2.5 20.1 3.4 21 4.5 21H19.5C20.6 21 21.5 20.1 21.5 19V5C21.5 3.9 20.6 3 19.5 3Z"
                                    fill="#0D64E8"
                                  />
                                </svg>
                              </button>
                              <div class="popover-main">
                                <Popover
                                  triggeredBy={`#button-${post.id}`}
                                  placement="left"
                                >
                                  <PostKpiPopup />
                                </Popover>
                              </div>
                            </div>
                            <button
                              on:click={() => openEditModel(post)}
                              class="relative"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M16.2938 4.53921C17.0748 3.75816 18.3412 3.75817 19.1222 4.53921L20.4605 5.87745C21.2415 6.6585 21.2415 7.92483 20.4605 8.70588L9.80286 19.3635C9.52366 19.6427 9.16806 19.833 8.78088 19.9104L4.46052 20.7745C4.32057 20.8025 4.19719 20.6791 4.22518 20.5392L5.08925 16.2188C5.16669 15.8316 5.357 15.476 5.6362 15.1968L16.2938 4.53921Z"
                                  stroke="#0D64E8"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M14.583 6.25L18.7497 10.4167"
                                  stroke="#0D64E8"
                                  stroke-width="2"
                                />
                              </svg>
                              <span
                                class="absolute right-[1px] top-[2px] block h-[8px] w-[8px] rounded-full bg-[#FF4040]"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    {/each}
                  {/each}
                {:else}
                  <tr>
                    <td colspan="5">
                      <p
                        class="pb-[8px] pt-[16px] text-[14px] font-semibold text-[#111827]"
                      >
                        No data found
                      </p>
                    </td>
                  </tr>
                {/if}
              </tbody>
            </table>
          </div>
        {/if}

        <!-- ------------------------- ad ------------------------ -->

        {#if $arraydetails2.length !== 0}
          <div class="custom-scroll max-h-[470px] overflow-x-auto">
            <table class="w-full">
              <thead
                class="sticky top-0 z-10 border-y-[1px] border-y-[#D1D5DB] bg-white"
              >
                <th class="" />
                <th
                  class="h-[52px] text-left text-[14px] font-semibold text-[#111827]"
                  >Type</th
                >
                <th
                  class="h-[52px] px-4 text-left text-[14px] font-semibold text-[#111827]"
                  >Ad title</th
                >
                <th
                  class="h-[52px] px-4 text-left text-[14px] font-semibold text-[#111827]"
                  >Schedule</th
                >
                <th />
                <th />
              </thead>
              <tbody>
                {#if $arraydetails2.length !== 0}
                  {#each $arraydetails2 as post}
                    <tr>
                      <td class=" py-[7.5px] pr-[12px]">
                        <div class="flex h-[38px] w-[38px] items-center">
                          <img
                            src={post.full_picture ||
                              post.thumbnail_url ||
                              '/images/post-type.png'}
                            alt="post-type"
                            class="h-full w-full rounded-[6px] object-cover"
                          />
                        </div>
                      </td>
                      <td class="py-[7.5px] pr-4">
                        <div class="flex gap-1">
                          <div
                            class:bg-[#0D64E8]={post.type === 'Post'}
                            class=" flex h-[21px] w-fit items-center justify-center rounded-md bg-[#0024A4] p-[3px_5px] text-[12px] text-white"
                          >
                            {post.type}
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-[7.5px]"
                        ><p class="message-clip text-[14px] text-[#4B5563]">
                          {post.message}
                        </p></td
                      >
                      <td class="px-4 py-[7.5px]">
                        <div
                          class="flex items-center justify-between gap-2 pr-[16px]"
                        >
                          <div class="flex items-center gap-2">
                            {#if post.status === 'ACTIVE'}
                              <div
                                class="h-[24px] rounded-[100px] bg-[#E4FDEA] px-2 text-[14px] text-[#02AB46]"
                              >
                                Live
                              </div>
                            {/if}
                            <p
                              class="whitespace-nowrap text-[14px] text-[#4B5563]"
                            >
                              {post.scheduled}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex h-full items-center">
                          <div
                            class="flex h-[35px] items-center gap-[2px] border-r-[1px] border-r-[#E5E7EB] px-[16px]"
                          >
                            {#if post.platforms_ad.includes('Facebook')}
                              <svg
                                width="6"
                                height="12"
                                viewBox="0 0 6 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 4.20002H3.9905V3.00003C3.9905 2.38083 4.03838 1.99083 4.88152 1.99083H5.94641V0.0828372C5.42822 0.0264374 4.90717 -0.0011625 4.38556 3.74999e-05C2.83895 3.74999e-05 1.71021 0.994234 1.71021 2.81943V4.20002H0V6.60002L1.71021 6.59942V12H3.9905V6.59822L5.73834 6.59762L6 4.20002Z"
                                  fill="#111827"
                                />
                              </svg>
                            {/if}
                            {#if post.platforms_ad.includes('Instagram')}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <rect
                                  width="20"
                                  height="20"
                                  rx="10"
                                  fill="white"
                                />
                                <path
                                  d="M7.33333 4C5.49533 4 4 5.49533 4 7.33333V12.6667C4 14.5047 5.49533 16 7.33333 16H12.6667C14.5047 16 16 14.5047 16 12.6667V7.33333C16 5.49533 14.5047 4 12.6667 4H7.33333ZM7.33333 5.33333H12.6667C13.7693 5.33333 14.6667 6.23067 14.6667 7.33333V12.6667C14.6667 13.7693 13.7693 14.6667 12.6667 14.6667H7.33333C6.23067 14.6667 5.33333 13.7693 5.33333 12.6667V7.33333C5.33333 6.23067 6.23067 5.33333 7.33333 5.33333ZM13.3333 6C13.1565 6 12.987 6.07024 12.8619 6.19526C12.7369 6.32029 12.6667 6.48986 12.6667 6.66667C12.6667 6.84348 12.7369 7.01305 12.8619 7.13807C12.987 7.2631 13.1565 7.33333 13.3333 7.33333C13.5101 7.33333 13.6797 7.2631 13.8047 7.13807C13.9298 7.01305 14 6.84348 14 6.66667C14 6.48986 13.9298 6.32029 13.8047 6.19526C13.6797 6.07024 13.5101 6 13.3333 6ZM10 6.66667C8.162 6.66667 6.66667 8.162 6.66667 10C6.66667 11.838 8.162 13.3333 10 13.3333C11.838 13.3333 13.3333 11.838 13.3333 10C13.3333 8.162 11.838 6.66667 10 6.66667ZM10 8C11.1027 8 12 8.89733 12 10C12 11.1027 11.1027 12 10 12C8.89733 12 8 11.1027 8 10C8 8.89733 8.89733 8 10 8Z"
                                  fill="#111827"
                                />
                              </svg>
                            {/if}
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-[7.5px]">
                        <div class="flex justify-end gap-[16px]">
                          <!--<button on:click={() => SharePost(post)}>
                                  <a href="/sharepost">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M18 22C17.1667 22 16.4583 21.7083 15.875 21.125C15.2917 20.5417 15 19.8333 15 19C15 18.8833 15.0083 18.7625 15.025 18.6375C15.0417 18.5125 15.0667 18.4 15.1 18.3L8.05 14.2C7.76667 14.45 7.45 14.6458 7.1 14.7875C6.75 14.9292 6.38333 15 6 15C5.16667 15 4.45833 14.7083 3.875 14.125C3.29167 13.5417 3 12.8333 3 12C3 11.1667 3.29167 10.4583 3.875 9.875C4.45833 9.29167 5.16667 9 6 9C6.38333 9 6.75 9.07083 7.1 9.2125C7.45 9.35417 7.76667 9.55 8.05 9.8L15.1 5.7C15.0667 5.6 15.0417 5.4875 15.025 5.3625C15.0083 5.2375 15 5.11667 15 5C15 4.16667 15.2917 3.45833 15.875 2.875C16.4583 2.29167 17.1667 2 18 2C18.8333 2 19.5417 2.29167 20.125 2.875C20.7083 3.45833 21 4.16667 21 5C21 5.83333 20.7083 6.54167 20.125 7.125C19.5417 7.70833 18.8333 8 18 8C17.6167 8 17.25 7.92917 16.9 7.7875C16.55 7.64583 16.2333 7.45 15.95 7.2L8.9 11.3C8.93333 11.4 8.95833 11.5125 8.975 11.6375C8.99167 11.7625 9 11.8833 9 12C9 12.1167 8.99167 12.2375 8.975 12.3625C8.95833 12.4875 8.93333 12.6 8.9 12.7L15.95 16.8C16.2333 16.55 16.55 16.3542 16.9 16.2125C17.25 16.0708 17.6167 16 18 16C18.8333 16 19.5417 16.2917 20.125 16.875C20.7083 17.4583 21 18.1667 21 19C21 19.8333 20.7083 20.5417 20.125 21.125C19.5417 21.7083 18.8333 22 18 22ZM18 6C18.2833 6 18.5208 5.90417 18.7125 5.7125C18.9042 5.52083 19 5.28333 19 5C19 4.71667 18.9042 4.47917 18.7125 4.2875C18.5208 4.09583 18.2833 4 18 4C17.7167 4 17.4792 4.09583 17.2875 4.2875C17.0958 4.47917 17 4.71667 17 5C17 5.28333 17.0958 5.52083 17.2875 5.7125C17.4792 5.90417 17.7167 6 18 6ZM6 13C6.28333 13 6.52083 12.9042 6.7125 12.7125C6.90417 12.5208 7 12.2833 7 12C7 11.7167 6.90417 11.4792 6.7125 11.2875C6.52083 11.0958 6.28333 11 6 11C5.71667 11 5.47917 11.0958 5.2875 11.2875C5.09583 11.4792 5 11.7167 5 12C5 12.2833 5.09583 12.5208 5.2875 12.7125C5.47917 12.9042 5.71667 13 6 13ZM18 20C18.2833 20 18.5208 19.9042 18.7125 19.7125C18.9042 19.5208 19 19.2833 19 19C19 18.7167 18.9042 18.4792 18.7125 18.2875C18.5208 18.0958 18.2833 18 18 18C17.7167 18 17.4792 18.0958 17.2875 18.2875C17.0958 18.4792 17 18.7167 17 19C17 19.2833 17.0958 19.5208 17.2875 19.7125C17.4792 19.9042 17.7167 20 18 20Z"
                                        fill="#0D64E8"
                                      />
                                    </svg>
                                  </a>
                                </button>-->
                          <div class="group relative">
                            <button
                              id={`button-${post.id}`}
                              class:opacity-30={post.status === 'processing'}
                              disabled={post.status === 'processing'}
                              on:click={() => toggleModel(post)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17ZM19.5 19.1H4.5V5H19.5V19.1ZM19.5 3H4.5C3.4 3 2.5 3.9 2.5 5V19C2.5 20.1 3.4 21 4.5 21H19.5C20.6 21 21.5 20.1 21.5 19V5C21.5 3.9 20.6 3 19.5 3Z"
                                  fill="#0D64E8"
                                />
                              </svg>
                            </button>
                            <div class="popover-main">
                              <Popover
                                triggeredBy={`#button-${post.id}`}
                                placement="left"
                              >
                                <KpiPopup />
                              </Popover>
                            </div>
                          </div>
                          <button
                            on:click={() => openEditModel(post)}
                            class="relative"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.2938 4.53921C17.0748 3.75816 18.3412 3.75817 19.1222 4.53921L20.4605 5.87745C21.2415 6.6585 21.2415 7.92483 20.4605 8.70588L9.80286 19.3635C9.52366 19.6427 9.16806 19.833 8.78088 19.9104L4.46052 20.7745C4.32057 20.8025 4.19719 20.6791 4.22518 20.5392L5.08925 16.2188C5.16669 15.8316 5.357 15.476 5.6362 15.1968L16.2938 4.53921Z"
                                stroke="#0D64E8"
                                stroke-width="1.5"
                              />
                              <path
                                d="M14.583 6.25L18.7497 10.4167"
                                stroke="#0D64E8"
                                stroke-width="2"
                              />
                            </svg>
                            <span
                              class="absolute right-[1px] top-[2px] block h-[8px] w-[8px] rounded-full bg-[#FF4040]"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  {/each}
                {:else}
                  <tr>
                    <td colspan="5">
                      <p
                        class="pb-[8px] pt-[16px] text-[14px] font-semibold text-[#111827]"
                      >
                        No data found
                      </p>
                    </td>
                  </tr>
                {/if}
              </tbody>
            </table>
          </div>
        {/if}
      </div>

      <!-- ====================== draft ===================== -->
      <div
        id="1"
        class="content hidden"
      >
        <div
          class="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <h1 class="text-[18px] font-semibold text-[#111827]">Draft</h1>
          <div
            class="flex flex-col gap-[20px] sm:flex-row sm:items-center sm:gap-[32px]"
          >
            <div class="flex items-center gap-[10px]">
              <input
                id="green-checkbox"
                type="checkbox"
                class="rounded border-[1px] border-[#D5DAE1] bg-white text-[#6FAA79]"
              />
              <label
                for="green-checkbox"
                class="whitespace-nowrap text-[14px] text-[#111827]"
                >Group Campaigns</label
              >
            </div>
            <div class="dropdown w-full sm:w-auto">
              <button
                class="dropdown-button !w-full sm:!w-[120px]"
                on:click={toggleDropdown}
              >
                <span>{selected}</span>
                <svg
                  class="w-[14px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4.90065 5.83301L10.0007 10.9837L15.1007 5.83301L16.6673 7.4187L10.0007 14.1663L3.33398 7.4187L4.90065 5.83301Z"
                    fill="#000"
                  />
                </svg>
              </button>
              <div
                class="dropdown-content relative !z-20 {isOpen ? 'show' : ''}"
              >
                {#each items as item}
                  <div
                    class="dropdown-item"
                    on:click={() => selectItem(item, 'draft')}
                  >
                    {item}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
        <div class="custom-scroll max-h-[470px] overflow-x-auto">
          <table class="w-full">
            <thead
              class="sticky top-0 z-10 border-b-[1px] border-b-[#D1D5DB] bg-white"
            >
              <th class="" />
              <th
                class="h-[52px] text-left text-[14px] font-semibold text-[#111827]"
                >Type</th
              >
              <th
                class="h-[52px] px-4 text-left text-[14px] font-semibold text-[#111827]"
                >Description/Caption</th
              >
              <th
                class="h-[52px] px-4 text-left text-[14px] font-semibold text-[#111827]"
                >Last updated</th
              >
              <th />
              <th />
            </thead>
            <tbody>
              {#if Object.values($Ad_draft_main).every(arr => arr.length > 0)}
                {#each Object.keys($Ad_draft_main) as month}
                  <tr>
                    <td colspan="5">
                      <p
                        class="pb-[8px] pt-[16px] text-[14px] font-semibold text-[#111827]"
                      >
                        {new Date(month).toLocaleString('default', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </td>
                  </tr>

                  {#each $Ad_draft_main[month] as post}
                    <tr>
                      <td class=" w-[51px] py-[7.5px] pr-[12px]">
                        <div class="flex h-[38px] w-[38px] items-center">
                          <img
                            src="/images/post-type.png"
                            alt="post-type"
                            class="mr-[16px] min-h-[38px] min-w-[38px]"
                          />
                        </div>
                      </td>
                      <td class="py-[7.5px] pr-4">
                        <div class="flex gap-1">
                          <div
                            class:bg-[#0D64E8]={post.type === 'Post'}
                            class=" flex h-[21px] w-fit items-center justify-center rounded-md bg-[#0024A4] p-[3px_5px] text-[12px] text-white"
                          >
                            {post.type}
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-[7.5px]"
                        ><p class="message-clip text-[14px] text-[#4B5563]">
                          {post.message}
                        </p></td
                      >
                      <td class="px-4 py-[7.5px]">
                        <div
                          class="flex items-center justify-between gap-2 pr-[16px]"
                        >
                          <div class="flex items-center gap-2">
                            {#if post.status === 'completed'}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <rect
                                  width="20"
                                  height="20"
                                  rx="10"
                                  fill="#E4FDEA"
                                />
                                <g opacity="0.2">
                                  <path
                                    d="M5.91698 8.1378H14.0836V6.67945C14.0836 6.63457 14.0649 6.59343 14.0276 6.55603C13.9902 6.51864 13.949 6.49995 13.9041 6.49995H6.09648C6.05161 6.49995 6.01047 6.51864 5.97306 6.55603C5.93567 6.59343 5.91698 6.63457 5.91698 6.67945V8.1378ZM6.09648 15.5416C5.80182 15.5416 5.55241 15.4395 5.34824 15.2353C5.14408 15.0312 5.04199 14.7818 5.04199 14.4871V6.67945C5.04199 6.38479 5.14408 6.13538 5.34824 5.93121C5.55241 5.72704 5.80182 5.62496 6.09648 5.62496H6.90418V4.39099H7.8016V5.62496H12.2215V4.39099H13.0964V5.62496H13.9041C14.1988 5.62496 14.4482 5.72704 14.6524 5.93121C14.8565 6.13538 14.9586 6.38479 14.9586 6.67945V9.86645C14.8188 9.80513 14.6759 9.75559 14.5301 9.71782C14.3843 9.68006 14.2355 9.65033 14.0836 9.62864V9.01279H5.91698V14.4871C5.91698 14.532 5.93567 14.5731 5.97306 14.6105C6.01047 14.6479 6.05161 14.6666 6.09648 14.6666H9.88927C9.93863 14.8281 9.99827 14.9809 10.0682 15.1248C10.1381 15.2688 10.2176 15.4077 10.3066 15.5416H6.09648ZM13.6125 16.1249C12.8841 16.1249 12.2645 15.8695 11.7537 15.3588C11.2429 14.848 10.9875 14.2284 10.9875 13.4999C10.9875 12.7715 11.2429 12.1519 11.7537 11.6411C12.2645 11.1304 12.8841 10.875 13.6125 10.875C14.3409 10.875 14.9605 11.1304 15.4713 11.6411C15.9821 12.1519 16.2375 12.7715 16.2375 13.4999C16.2375 14.2284 15.9821 14.848 15.4713 15.3588C14.9605 15.8695 14.3409 16.1249 13.6125 16.1249ZM14.584 14.8349L14.9474 14.4714L13.8705 13.3945V11.7836H13.3545V13.6054L14.584 14.8349Z"
                                    fill="#02AB46"
                                  />
                                </g>
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M15.0382 6.71212C15.2432 6.91714 15.2432 7.24956 15.0382 7.45458L8.82773 13.665C8.5088 13.9839 7.99172 13.9839 7.67279 13.665L4.96236 10.9546C4.75734 10.7496 4.75734 10.4171 4.96236 10.2121C5.16739 10.0071 5.4998 10.0071 5.70482 10.2121L8.25026 12.7576L14.2957 6.71212C14.5007 6.50709 14.8331 6.50709 15.0382 6.71212Z"
                                  fill="#1B1D1F"
                                />
                              </svg>
                            {/if}
                            {#if post.status === 'processing'}
                              <svg
                                width="17"
                                height="18"
                                viewBox="0 0 17 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.16697 6.33977H13.8336V4.25641C13.8336 4.1923 13.8069 4.13353 13.7535 4.0801C13.7001 4.02668 13.6413 3.99997 13.5772 3.99997H2.42341C2.3593 3.99997 2.30053 4.02668 2.2471 4.0801C2.19368 4.13353 2.16697 4.1923 2.16697 4.25641V6.33977ZM2.42341 16.9166C2.00246 16.9166 1.64616 16.7708 1.35449 16.4791C1.06283 16.1875 0.916992 15.8311 0.916992 15.4102V4.25641C0.916992 3.83547 1.06283 3.47916 1.35449 3.18749C1.64616 2.89583 2.00246 2.74999 2.42341 2.74999H3.57726V0.987183H4.85928V2.74999H11.1734V0.987183H12.4233V2.74999H13.5772C13.9981 2.74999 14.3545 2.89583 14.6461 3.18749C14.9378 3.47916 15.0836 3.83547 15.0836 4.25641V8.80927C14.8838 8.72167 14.6798 8.65089 14.4715 8.59693C14.2631 8.54299 14.0505 8.50052 13.8336 8.46954V7.58975H2.16697V15.4102C2.16697 15.4743 2.19368 15.5331 2.2471 15.5865C2.30053 15.6399 2.3593 15.6666 2.42341 15.6666H7.84168C7.91219 15.8974 7.9974 16.1156 8.09728 16.3213C8.19717 16.5269 8.31069 16.7254 8.43783 16.9166H2.42341ZM13.1606 17.75C12.12 17.75 11.2348 17.3851 10.5051 16.6554C9.77544 15.9257 9.4106 15.0406 9.4106 14C9.4106 12.9594 9.77544 12.0742 10.5051 11.3445C11.2348 10.6148 12.12 10.25 13.1606 10.25C14.2012 10.25 15.0863 10.6148 15.816 11.3445C16.5457 12.0742 16.9105 12.9594 16.9105 14C16.9105 15.0406 16.5457 15.9257 15.816 16.6554C15.0863 17.3851 14.2012 17.75 13.1606 17.75ZM14.5484 15.907L15.0676 15.3878L13.5292 13.8493V11.5481H12.792V14.1506L14.5484 15.907Z"
                                  fill="#4B5563"
                                />
                              </svg>
                            {/if}
                            {#if post.status === 'ACTIVE'}
                              <svg
                                width="17"
                                height="18"
                                viewBox="0 0 17 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.16697 6.33977H13.8336V4.25641C13.8336 4.1923 13.8069 4.13353 13.7535 4.0801C13.7001 4.02668 13.6413 3.99997 13.5772 3.99997H2.42341C2.3593 3.99997 2.30053 4.02668 2.2471 4.0801C2.19368 4.13353 2.16697 4.1923 2.16697 4.25641V6.33977ZM2.42341 16.9166C2.00246 16.9166 1.64616 16.7708 1.35449 16.4791C1.06283 16.1875 0.916992 15.8311 0.916992 15.4102V4.25641C0.916992 3.83547 1.06283 3.47916 1.35449 3.18749C1.64616 2.89583 2.00246 2.74999 2.42341 2.74999H3.57726V0.987183H4.85928V2.74999H11.1734V0.987183H12.4233V2.74999H13.5772C13.9981 2.74999 14.3545 2.89583 14.6461 3.18749C14.9378 3.47916 15.0836 3.83547 15.0836 4.25641V8.80927C14.8838 8.72167 14.6798 8.65089 14.4715 8.59693C14.2631 8.54299 14.0505 8.50052 13.8336 8.46954V7.58975H2.16697V15.4102C2.16697 15.4743 2.19368 15.5331 2.2471 15.5865C2.30053 15.6399 2.3593 15.6666 2.42341 15.6666H7.84168C7.91219 15.8974 7.9974 16.1156 8.09728 16.3213C8.19717 16.5269 8.31069 16.7254 8.43783 16.9166H2.42341ZM13.1606 17.75C12.12 17.75 11.2348 17.3851 10.5051 16.6554C9.77544 15.9257 9.4106 15.0406 9.4106 14C9.4106 12.9594 9.77544 12.0742 10.5051 11.3445C11.2348 10.6148 12.12 10.25 13.1606 10.25C14.2012 10.25 15.0863 10.6148 15.816 11.3445C16.5457 12.0742 16.9105 12.9594 16.9105 14C16.9105 15.0406 16.5457 15.9257 15.816 16.6554C15.0863 17.3851 14.2012 17.75 13.1606 17.75ZM14.5484 15.907L15.0676 15.3878L13.5292 13.8493V11.5481H12.792V14.1506L14.5484 15.907Z"
                                  fill="#4B5563"
                                />
                              </svg>
                            {/if}
                            <p
                              class="whitespace-nowrap text-[14px] text-[#4B5563]"
                            >
                              {post.scheduled}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-[7.5px]">
                        <div class="flex h-full items-center">
                          <div
                            class="flex h-[35px] items-center gap-[2px] border-r-[1px] border-r-[#E5E7EB] px-[16px]"
                          >
                            {#if post.platforms_ad.includes('Facebook')}
                              <svg
                                width="6"
                                height="12"
                                viewBox="0 0 6 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 4.20002H3.9905V3.00003C3.9905 2.38083 4.03838 1.99083 4.88152 1.99083H5.94641V0.0828372C5.42822 0.0264374 4.90717 -0.0011625 4.38556 3.74999e-05C2.83895 3.74999e-05 1.71021 0.994234 1.71021 2.81943V4.20002H0V6.60002L1.71021 6.59942V12H3.9905V6.59822L5.73834 6.59762L6 4.20002Z"
                                  fill="#111827"
                                />
                              </svg>
                            {/if}
                            {#if post.platforms_ad.includes('Instagram')}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <rect
                                  width="20"
                                  height="20"
                                  rx="10"
                                  fill="white"
                                />
                                <path
                                  d="M7.33333 4C5.49533 4 4 5.49533 4 7.33333V12.6667C4 14.5047 5.49533 16 7.33333 16H12.6667C14.5047 16 16 14.5047 16 12.6667V7.33333C16 5.49533 14.5047 4 12.6667 4H7.33333ZM7.33333 5.33333H12.6667C13.7693 5.33333 14.6667 6.23067 14.6667 7.33333V12.6667C14.6667 13.7693 13.7693 14.6667 12.6667 14.6667H7.33333C6.23067 14.6667 5.33333 13.7693 5.33333 12.6667V7.33333C5.33333 6.23067 6.23067 5.33333 7.33333 5.33333ZM13.3333 6C13.1565 6 12.987 6.07024 12.8619 6.19526C12.7369 6.32029 12.6667 6.48986 12.6667 6.66667C12.6667 6.84348 12.7369 7.01305 12.8619 7.13807C12.987 7.2631 13.1565 7.33333 13.3333 7.33333C13.5101 7.33333 13.6797 7.2631 13.8047 7.13807C13.9298 7.01305 14 6.84348 14 6.66667C14 6.48986 13.9298 6.32029 13.8047 6.19526C13.6797 6.07024 13.5101 6 13.3333 6ZM10 6.66667C8.162 6.66667 6.66667 8.162 6.66667 10C6.66667 11.838 8.162 13.3333 10 13.3333C11.838 13.3333 13.3333 11.838 13.3333 10C13.3333 8.162 11.838 6.66667 10 6.66667ZM10 8C11.1027 8 12 8.89733 12 10C12 11.1027 11.1027 12 10 12C8.89733 12 8 11.1027 8 10C8 8.89733 8.89733 8 10 8Z"
                                  fill="#111827"
                                />
                              </svg>
                            {/if}
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-[7.5px]">
                        <div class="flex justify-end gap-[16px]">
                          <button on:click={() => SharePost(post)}>
                            <a href="/sharepost">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M18 22C17.1667 22 16.4583 21.7083 15.875 21.125C15.2917 20.5417 15 19.8333 15 19C15 18.8833 15.0083 18.7625 15.025 18.6375C15.0417 18.5125 15.0667 18.4 15.1 18.3L8.05 14.2C7.76667 14.45 7.45 14.6458 7.1 14.7875C6.75 14.9292 6.38333 15 6 15C5.16667 15 4.45833 14.7083 3.875 14.125C3.29167 13.5417 3 12.8333 3 12C3 11.1667 3.29167 10.4583 3.875 9.875C4.45833 9.29167 5.16667 9 6 9C6.38333 9 6.75 9.07083 7.1 9.2125C7.45 9.35417 7.76667 9.55 8.05 9.8L15.1 5.7C15.0667 5.6 15.0417 5.4875 15.025 5.3625C15.0083 5.2375 15 5.11667 15 5C15 4.16667 15.2917 3.45833 15.875 2.875C16.4583 2.29167 17.1667 2 18 2C18.8333 2 19.5417 2.29167 20.125 2.875C20.7083 3.45833 21 4.16667 21 5C21 5.83333 20.7083 6.54167 20.125 7.125C19.5417 7.70833 18.8333 8 18 8C17.6167 8 17.25 7.92917 16.9 7.7875C16.55 7.64583 16.2333 7.45 15.95 7.2L8.9 11.3C8.93333 11.4 8.95833 11.5125 8.975 11.6375C8.99167 11.7625 9 11.8833 9 12C9 12.1167 8.99167 12.2375 8.975 12.3625C8.95833 12.4875 8.93333 12.6 8.9 12.7L15.95 16.8C16.2333 16.55 16.55 16.3542 16.9 16.2125C17.25 16.0708 17.6167 16 18 16C18.8333 16 19.5417 16.2917 20.125 16.875C20.7083 17.4583 21 18.1667 21 19C21 19.8333 20.7083 20.5417 20.125 21.125C19.5417 21.7083 18.8333 22 18 22ZM18 6C18.2833 6 18.5208 5.90417 18.7125 5.7125C18.9042 5.52083 19 5.28333 19 5C19 4.71667 18.9042 4.47917 18.7125 4.2875C18.5208 4.09583 18.2833 4 18 4C17.7167 4 17.4792 4.09583 17.2875 4.2875C17.0958 4.47917 17 4.71667 17 5C17 5.28333 17.0958 5.52083 17.2875 5.7125C17.4792 5.90417 17.7167 6 18 6ZM6 13C6.28333 13 6.52083 12.9042 6.7125 12.7125C6.90417 12.5208 7 12.2833 7 12C7 11.7167 6.90417 11.4792 6.7125 11.2875C6.52083 11.0958 6.28333 11 6 11C5.71667 11 5.47917 11.0958 5.2875 11.2875C5.09583 11.4792 5 11.7167 5 12C5 12.2833 5.09583 12.5208 5.2875 12.7125C5.47917 12.9042 5.71667 13 6 13ZM18 20C18.2833 20 18.5208 19.9042 18.7125 19.7125C18.9042 19.5208 19 19.2833 19 19C19 18.7167 18.9042 18.4792 18.7125 18.2875C18.5208 18.0958 18.2833 18 18 18C17.7167 18 17.4792 18.0958 17.2875 18.2875C17.0958 18.4792 17 18.7167 17 19C17 19.2833 17.0958 19.5208 17.2875 19.7125C17.4792 19.9042 17.7167 20 18 20Z"
                                  fill="#0D64E8"
                                />
                              </svg>
                            </a>
                          </button>

                          <button
                            class:opacity-30={post.status === 'processing'}
                            disabled={post.status === 'processing'}
                            on:click={() => toggleModel(post)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17ZM19.5 19.1H4.5V5H19.5V19.1ZM19.5 3H4.5C3.4 3 2.5 3.9 2.5 5V19C2.5 20.1 3.4 21 4.5 21H19.5C20.6 21 21.5 20.1 21.5 19V5C21.5 3.9 20.6 3 19.5 3Z"
                                fill="#0D64E8"
                              />
                            </svg>
                          </button>
                          <button on:click={() => openEditModel(post)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.2938 4.53921C17.0748 3.75816 18.3412 3.75817 19.1222 4.53921L20.4605 5.87745C21.2415 6.6585 21.2415 7.92483 20.4605 8.70588L9.80286 19.3635C9.52366 19.6427 9.16806 19.833 8.78088 19.9104L4.46052 20.7745C4.32057 20.8025 4.19719 20.6791 4.22518 20.5392L5.08925 16.2188C5.16669 15.8316 5.357 15.476 5.6362 15.1968L16.2938 4.53921Z"
                                stroke="#0D64E8"
                                stroke-width="1.5"
                              />
                              <path
                                d="M14.583 6.25L18.7497 10.4167"
                                stroke="#0D64E8"
                                stroke-width="2"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  {/each}
                {/each}
              {:else}
                <tr>
                  <td colspan="5">
                    <p
                      class="pb-[8px] pt-[16px] text-[14px] font-semibold text-[#111827]"
                    >
                      No data found
                    </p>
                  </td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>

        <!--<div
              class="flex justify-between items-center border-t-[#E5E7EB] border-t-[1px] pt-[20px] mt-[20px] flex-wrap gap-3"
            >
              <p class="text-[14px] text-[#6B7280]">
                Showing {startDraftIndex + 1} to {endDraftIndex} of {$Ad_draft_main.length}
              </p>
              <div
                class="flex justify-center items-center border-[#D1D5DB] border-[1px] w-fit rounded-md"
              >
                <button
                  class="w-[48px] h-[40px] flex justify-center items-center border-r-[#D1D5DB] border-r-[1px] disabled:opacity-50"
                  disabled={currentDraftPage === 1}
                  on:click={() => handleDraftChange(currentDraftPage - 1)}
                >
                  <span>
                    <svg
                      class="rotate-[180deg]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5.83398 15.1002L10.9847 10.0002L5.83398 4.90016L7.41968 3.3335L14.1673 10.0002L7.41968 16.6668L5.83398 15.1002Z"
                        fill="#4B5563"
                      />
                    </svg>
                  </span>
                </button>

                <div class="flex items-center">
                  <button
                    class="px-[15.5px] h-[40px] flex justify-center items-center border-r-[#D1D5DB] border-r-[1px] text-[#4B5563] text-[14px]"
                    on:click={() => handleDraftChange(1)}
                    class:active={currentDraftPage === 1}
                  >
                    1
                  </button>
                  <button
                    class="px-[15.5px] h-[40px] flex justify-center items-center border-r-[#D1D5DB] border-r-[1px] text-[#4B5563] text-[14px]"
                    on:click={() => handleDraftChange(2)}
                    class:active={currentDraftPage === 2}
                  >
                    2
                  </button>
                  <button
                    class="px-[15.5px] h-[40px] flex justify-center items-center border-r-[#D1D5DB] border-r-[1px] text-[#4B5563] text-[14px]"
                    on:click={() => handleDraftChange(3)}
                    class:active={currentDraftPage === 3}
                  >
                    3
                  </button>
                </div>

                <button
                  class="w-[48px] h-[40px] flex justify-center items-center disabled:opacity-50"
                  disabled={currentDraftPage === totalDraftPages}
                  on:click={() => handleDraftChange(currentDraftPage + 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M5.83398 15.1002L10.9847 10.0002L5.83398 4.90016L7.41968 3.3335L14.1673 10.0002L7.41968 16.6668L5.83398 15.1002Z"
                      fill="#4B5563"
                    />
                  </svg>
                </button>
              </div>
            </div>-->
      </div>

      <!-- ====================== archive ===================== -->
      <div
        id="2"
        class="content hidden"
      >
        <div
          class="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <h1 class="text-[18px] font-semibold text-[#111827]">Archived</h1>
          <div
            class="flex flex-col gap-[20px] sm:flex-row sm:items-center sm:gap-[32px]"
          >
            <div class="flex items-center gap-[10px]">
              <input
                id="green-checkbox"
                type="checkbox"
                class="rounded border-[1px] border-[#D5DAE1] bg-white text-[#6FAA79]"
              />
              <label
                for="green-checkbox"
                class="whitespace-nowrap text-[14px] text-[#111827]"
                >Group Campaigns</label
              >
            </div>
            <div class="dropdown w-full sm:w-auto">
              <button
                class="dropdown-button !w-full sm:!w-[120px]"
                on:click={toggleDropdown}
              >
                <span>{selected}</span>
                <svg
                  class="w-[14px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4.90065 5.83301L10.0007 10.9837L15.1007 5.83301L16.6673 7.4187L10.0007 14.1663L3.33398 7.4187L4.90065 5.83301Z"
                    fill="#000"
                  />
                </svg>
              </button>
              <div
                class="dropdown-content relative !z-20 {isOpen ? 'show' : ''}"
              >
                {#each items as item}
                  <div
                    class="dropdown-item"
                    on:click={() => selectItem(item, 'archived')}
                  >
                    {item}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
        <div class="custom-scroll max-h-[470px] overflow-x-auto">
          <table class="w-full">
            <thead
              class="sticky top-0 z-10 border-b-[1px] border-b-[#D1D5DB] bg-white"
            >
              <th class="" />
              <th
                class="h-[52px] text-left text-[14px] font-semibold text-[#111827]"
                >Type</th
              >
              <th
                class="h-[52px] px-4 text-left text-[14px] font-semibold text-[#111827]"
                >Description/Caption</th
              >
              <th
                class="h-[52px] px-4 text-left text-[14px] font-semibold text-[#111827]"
                >Last updated</th
              >
              <th />
              <th />
            </thead>
            <tbody>
              {#if Object.values($Ad_archive_main).every(arr => arr.length > 0)}
                {#each Object.keys($Ad_archive_main) as month}
                  <tr>
                    <td colspan="5">
                      <p
                        class="pb-[8px] pt-[16px] text-[14px] font-semibold text-[#111827]"
                      >
                        {new Date(month).toLocaleString('default', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </td>
                  </tr>

                  {#each $Ad_archive_main[month] as post}
                    <tr>
                      <td class=" w-[51px] py-[7.5px] pr-[12px]">
                        <div class="flex h-[38px] w-[38px] items-center">
                          <img
                            src="/images/post-type.png"
                            alt="post-type"
                            class="mr-[16px] min-h-[38px] min-w-[38px]"
                          />
                        </div>
                      </td>
                      <td class="py-[7.5px] pr-4">
                        <div class="flex gap-1">
                          <div
                            class:bg-[#0D64E8]={post.type === 'Post'}
                            class=" flex h-[21px] w-fit items-center justify-center rounded-md bg-[#0024A4] p-[3px_5px] text-[12px] text-white"
                          >
                            {post.type}
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-[7.5px]"
                        ><p class="message-clip text-[14px] text-[#4B5563]">
                          {post.message}
                        </p></td
                      >
                      <td class="px-4 py-[7.5px]">
                        <div
                          class="flex items-center justify-between gap-2 pr-[16px]"
                        >
                          <div class="flex items-center gap-2">
                            {#if post.status === 'completed'}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <rect
                                  width="20"
                                  height="20"
                                  rx="10"
                                  fill="#E4FDEA"
                                />
                                <g opacity="0.2">
                                  <path
                                    d="M5.91698 8.1378H14.0836V6.67945C14.0836 6.63457 14.0649 6.59343 14.0276 6.55603C13.9902 6.51864 13.949 6.49995 13.9041 6.49995H6.09648C6.05161 6.49995 6.01047 6.51864 5.97306 6.55603C5.93567 6.59343 5.91698 6.63457 5.91698 6.67945V8.1378ZM6.09648 15.5416C5.80182 15.5416 5.55241 15.4395 5.34824 15.2353C5.14408 15.0312 5.04199 14.7818 5.04199 14.4871V6.67945C5.04199 6.38479 5.14408 6.13538 5.34824 5.93121C5.55241 5.72704 5.80182 5.62496 6.09648 5.62496H6.90418V4.39099H7.8016V5.62496H12.2215V4.39099H13.0964V5.62496H13.9041C14.1988 5.62496 14.4482 5.72704 14.6524 5.93121C14.8565 6.13538 14.9586 6.38479 14.9586 6.67945V9.86645C14.8188 9.80513 14.6759 9.75559 14.5301 9.71782C14.3843 9.68006 14.2355 9.65033 14.0836 9.62864V9.01279H5.91698V14.4871C5.91698 14.532 5.93567 14.5731 5.97306 14.6105C6.01047 14.6479 6.05161 14.6666 6.09648 14.6666H9.88927C9.93863 14.8281 9.99827 14.9809 10.0682 15.1248C10.1381 15.2688 10.2176 15.4077 10.3066 15.5416H6.09648ZM13.6125 16.1249C12.8841 16.1249 12.2645 15.8695 11.7537 15.3588C11.2429 14.848 10.9875 14.2284 10.9875 13.4999C10.9875 12.7715 11.2429 12.1519 11.7537 11.6411C12.2645 11.1304 12.8841 10.875 13.6125 10.875C14.3409 10.875 14.9605 11.1304 15.4713 11.6411C15.9821 12.1519 16.2375 12.7715 16.2375 13.4999C16.2375 14.2284 15.9821 14.848 15.4713 15.3588C14.9605 15.8695 14.3409 16.1249 13.6125 16.1249ZM14.584 14.8349L14.9474 14.4714L13.8705 13.3945V11.7836H13.3545V13.6054L14.584 14.8349Z"
                                    fill="#02AB46"
                                  />
                                </g>
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M15.0382 6.71212C15.2432 6.91714 15.2432 7.24956 15.0382 7.45458L8.82773 13.665C8.5088 13.9839 7.99172 13.9839 7.67279 13.665L4.96236 10.9546C4.75734 10.7496 4.75734 10.4171 4.96236 10.2121C5.16739 10.0071 5.4998 10.0071 5.70482 10.2121L8.25026 12.7576L14.2957 6.71212C14.5007 6.50709 14.8331 6.50709 15.0382 6.71212Z"
                                  fill="#1B1D1F"
                                />
                              </svg>
                            {/if}
                            {#if post.status === 'processing'}
                              <svg
                                width="17"
                                height="18"
                                viewBox="0 0 17 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.16697 6.33977H13.8336V4.25641C13.8336 4.1923 13.8069 4.13353 13.7535 4.0801C13.7001 4.02668 13.6413 3.99997 13.5772 3.99997H2.42341C2.3593 3.99997 2.30053 4.02668 2.2471 4.0801C2.19368 4.13353 2.16697 4.1923 2.16697 4.25641V6.33977ZM2.42341 16.9166C2.00246 16.9166 1.64616 16.7708 1.35449 16.4791C1.06283 16.1875 0.916992 15.8311 0.916992 15.4102V4.25641C0.916992 3.83547 1.06283 3.47916 1.35449 3.18749C1.64616 2.89583 2.00246 2.74999 2.42341 2.74999H3.57726V0.987183H4.85928V2.74999H11.1734V0.987183H12.4233V2.74999H13.5772C13.9981 2.74999 14.3545 2.89583 14.6461 3.18749C14.9378 3.47916 15.0836 3.83547 15.0836 4.25641V8.80927C14.8838 8.72167 14.6798 8.65089 14.4715 8.59693C14.2631 8.54299 14.0505 8.50052 13.8336 8.46954V7.58975H2.16697V15.4102C2.16697 15.4743 2.19368 15.5331 2.2471 15.5865C2.30053 15.6399 2.3593 15.6666 2.42341 15.6666H7.84168C7.91219 15.8974 7.9974 16.1156 8.09728 16.3213C8.19717 16.5269 8.31069 16.7254 8.43783 16.9166H2.42341ZM13.1606 17.75C12.12 17.75 11.2348 17.3851 10.5051 16.6554C9.77544 15.9257 9.4106 15.0406 9.4106 14C9.4106 12.9594 9.77544 12.0742 10.5051 11.3445C11.2348 10.6148 12.12 10.25 13.1606 10.25C14.2012 10.25 15.0863 10.6148 15.816 11.3445C16.5457 12.0742 16.9105 12.9594 16.9105 14C16.9105 15.0406 16.5457 15.9257 15.816 16.6554C15.0863 17.3851 14.2012 17.75 13.1606 17.75ZM14.5484 15.907L15.0676 15.3878L13.5292 13.8493V11.5481H12.792V14.1506L14.5484 15.907Z"
                                  fill="#4B5563"
                                />
                              </svg>
                            {/if}
                            {#if post.status === 'ACTIVE'}
                              <svg
                                width="17"
                                height="18"
                                viewBox="0 0 17 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.16697 6.33977H13.8336V4.25641C13.8336 4.1923 13.8069 4.13353 13.7535 4.0801C13.7001 4.02668 13.6413 3.99997 13.5772 3.99997H2.42341C2.3593 3.99997 2.30053 4.02668 2.2471 4.0801C2.19368 4.13353 2.16697 4.1923 2.16697 4.25641V6.33977ZM2.42341 16.9166C2.00246 16.9166 1.64616 16.7708 1.35449 16.4791C1.06283 16.1875 0.916992 15.8311 0.916992 15.4102V4.25641C0.916992 3.83547 1.06283 3.47916 1.35449 3.18749C1.64616 2.89583 2.00246 2.74999 2.42341 2.74999H3.57726V0.987183H4.85928V2.74999H11.1734V0.987183H12.4233V2.74999H13.5772C13.9981 2.74999 14.3545 2.89583 14.6461 3.18749C14.9378 3.47916 15.0836 3.83547 15.0836 4.25641V8.80927C14.8838 8.72167 14.6798 8.65089 14.4715 8.59693C14.2631 8.54299 14.0505 8.50052 13.8336 8.46954V7.58975H2.16697V15.4102C2.16697 15.4743 2.19368 15.5331 2.2471 15.5865C2.30053 15.6399 2.3593 15.6666 2.42341 15.6666H7.84168C7.91219 15.8974 7.9974 16.1156 8.09728 16.3213C8.19717 16.5269 8.31069 16.7254 8.43783 16.9166H2.42341ZM13.1606 17.75C12.12 17.75 11.2348 17.3851 10.5051 16.6554C9.77544 15.9257 9.4106 15.0406 9.4106 14C9.4106 12.9594 9.77544 12.0742 10.5051 11.3445C11.2348 10.6148 12.12 10.25 13.1606 10.25C14.2012 10.25 15.0863 10.6148 15.816 11.3445C16.5457 12.0742 16.9105 12.9594 16.9105 14C16.9105 15.0406 16.5457 15.9257 15.816 16.6554C15.0863 17.3851 14.2012 17.75 13.1606 17.75ZM14.5484 15.907L15.0676 15.3878L13.5292 13.8493V11.5481H12.792V14.1506L14.5484 15.907Z"
                                  fill="#4B5563"
                                />
                              </svg>
                            {/if}
                            <p
                              class="whitespace-nowrap text-[14px] text-[#4B5563]"
                            >
                              {post.scheduled}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex h-full items-center">
                          <div
                            class="flex h-[35px] items-center gap-[2px] border-r-[1px] border-r-[#E5E7EB] px-[16px]"
                          >
                            {#if post.platforms_ad.includes('Facebook')}
                              <svg
                                width="6"
                                height="12"
                                viewBox="0 0 6 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 4.20002H3.9905V3.00003C3.9905 2.38083 4.03838 1.99083 4.88152 1.99083H5.94641V0.0828372C5.42822 0.0264374 4.90717 -0.0011625 4.38556 3.74999e-05C2.83895 3.74999e-05 1.71021 0.994234 1.71021 2.81943V4.20002H0V6.60002L1.71021 6.59942V12H3.9905V6.59822L5.73834 6.59762L6 4.20002Z"
                                  fill="#111827"
                                />
                              </svg>
                            {/if}
                            {#if post.platforms_ad.includes('Instagram')}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <rect
                                  width="20"
                                  height="20"
                                  rx="10"
                                  fill="white"
                                />
                                <path
                                  d="M7.33333 4C5.49533 4 4 5.49533 4 7.33333V12.6667C4 14.5047 5.49533 16 7.33333 16H12.6667C14.5047 16 16 14.5047 16 12.6667V7.33333C16 5.49533 14.5047 4 12.6667 4H7.33333ZM7.33333 5.33333H12.6667C13.7693 5.33333 14.6667 6.23067 14.6667 7.33333V12.6667C14.6667 13.7693 13.7693 14.6667 12.6667 14.6667H7.33333C6.23067 14.6667 5.33333 13.7693 5.33333 12.6667V7.33333C5.33333 6.23067 6.23067 5.33333 7.33333 5.33333ZM13.3333 6C13.1565 6 12.987 6.07024 12.8619 6.19526C12.7369 6.32029 12.6667 6.48986 12.6667 6.66667C12.6667 6.84348 12.7369 7.01305 12.8619 7.13807C12.987 7.2631 13.1565 7.33333 13.3333 7.33333C13.5101 7.33333 13.6797 7.2631 13.8047 7.13807C13.9298 7.01305 14 6.84348 14 6.66667C14 6.48986 13.9298 6.32029 13.8047 6.19526C13.6797 6.07024 13.5101 6 13.3333 6ZM10 6.66667C8.162 6.66667 6.66667 8.162 6.66667 10C6.66667 11.838 8.162 13.3333 10 13.3333C11.838 13.3333 13.3333 11.838 13.3333 10C13.3333 8.162 11.838 6.66667 10 6.66667ZM10 8C11.1027 8 12 8.89733 12 10C12 11.1027 11.1027 12 10 12C8.89733 12 8 11.1027 8 10C8 8.89733 8.89733 8 10 8Z"
                                  fill="#111827"
                                />
                              </svg>
                            {/if}
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-[7.5px]">
                        <div class="flex justify-end gap-[16px]">
                          <button on:click={() => SharePost(post)}>
                            <a href="/sharepost">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M18 22C17.1667 22 16.4583 21.7083 15.875 21.125C15.2917 20.5417 15 19.8333 15 19C15 18.8833 15.0083 18.7625 15.025 18.6375C15.0417 18.5125 15.0667 18.4 15.1 18.3L8.05 14.2C7.76667 14.45 7.45 14.6458 7.1 14.7875C6.75 14.9292 6.38333 15 6 15C5.16667 15 4.45833 14.7083 3.875 14.125C3.29167 13.5417 3 12.8333 3 12C3 11.1667 3.29167 10.4583 3.875 9.875C4.45833 9.29167 5.16667 9 6 9C6.38333 9 6.75 9.07083 7.1 9.2125C7.45 9.35417 7.76667 9.55 8.05 9.8L15.1 5.7C15.0667 5.6 15.0417 5.4875 15.025 5.3625C15.0083 5.2375 15 5.11667 15 5C15 4.16667 15.2917 3.45833 15.875 2.875C16.4583 2.29167 17.1667 2 18 2C18.8333 2 19.5417 2.29167 20.125 2.875C20.7083 3.45833 21 4.16667 21 5C21 5.83333 20.7083 6.54167 20.125 7.125C19.5417 7.70833 18.8333 8 18 8C17.6167 8 17.25 7.92917 16.9 7.7875C16.55 7.64583 16.2333 7.45 15.95 7.2L8.9 11.3C8.93333 11.4 8.95833 11.5125 8.975 11.6375C8.99167 11.7625 9 11.8833 9 12C9 12.1167 8.99167 12.2375 8.975 12.3625C8.95833 12.4875 8.93333 12.6 8.9 12.7L15.95 16.8C16.2333 16.55 16.55 16.3542 16.9 16.2125C17.25 16.0708 17.6167 16 18 16C18.8333 16 19.5417 16.2917 20.125 16.875C20.7083 17.4583 21 18.1667 21 19C21 19.8333 20.7083 20.5417 20.125 21.125C19.5417 21.7083 18.8333 22 18 22ZM18 6C18.2833 6 18.5208 5.90417 18.7125 5.7125C18.9042 5.52083 19 5.28333 19 5C19 4.71667 18.9042 4.47917 18.7125 4.2875C18.5208 4.09583 18.2833 4 18 4C17.7167 4 17.4792 4.09583 17.2875 4.2875C17.0958 4.47917 17 4.71667 17 5C17 5.28333 17.0958 5.52083 17.2875 5.7125C17.4792 5.90417 17.7167 6 18 6ZM6 13C6.28333 13 6.52083 12.9042 6.7125 12.7125C6.90417 12.5208 7 12.2833 7 12C7 11.7167 6.90417 11.4792 6.7125 11.2875C6.52083 11.0958 6.28333 11 6 11C5.71667 11 5.47917 11.0958 5.2875 11.2875C5.09583 11.4792 5 11.7167 5 12C5 12.2833 5.09583 12.5208 5.2875 12.7125C5.47917 12.9042 5.71667 13 6 13ZM18 20C18.2833 20 18.5208 19.9042 18.7125 19.7125C18.9042 19.5208 19 19.2833 19 19C19 18.7167 18.9042 18.4792 18.7125 18.2875C18.5208 18.0958 18.2833 18 18 18C17.7167 18 17.4792 18.0958 17.2875 18.2875C17.0958 18.4792 17 18.7167 17 19C17 19.2833 17.0958 19.5208 17.2875 19.7125C17.4792 19.9042 17.7167 20 18 20Z"
                                  fill="#0D64E8"
                                />
                              </svg>
                            </a>
                          </button>

                          <button
                            class:opacity-30={post.status === 'processing'}
                            disabled={post.status === 'processing'}
                            on:click={() => toggleModel(post)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17ZM19.5 19.1H4.5V5H19.5V19.1ZM19.5 3H4.5C3.4 3 2.5 3.9 2.5 5V19C2.5 20.1 3.4 21 4.5 21H19.5C20.6 21 21.5 20.1 21.5 19V5C21.5 3.9 20.6 3 19.5 3Z"
                                fill="#0D64E8"
                              />
                            </svg>
                          </button>
                          <button on:click={() => openEditModel(post)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.2938 4.53921C17.0748 3.75816 18.3412 3.75817 19.1222 4.53921L20.4605 5.87745C21.2415 6.6585 21.2415 7.92483 20.4605 8.70588L9.80286 19.3635C9.52366 19.6427 9.16806 19.833 8.78088 19.9104L4.46052 20.7745C4.32057 20.8025 4.19719 20.6791 4.22518 20.5392L5.08925 16.2188C5.16669 15.8316 5.357 15.476 5.6362 15.1968L16.2938 4.53921Z"
                                stroke="#0D64E8"
                                stroke-width="1.5"
                              />
                              <path
                                d="M14.583 6.25L18.7497 10.4167"
                                stroke="#0D64E8"
                                stroke-width="2"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  {/each}
                {/each}
              {:else}
                <tr>
                  <td colspan="5">
                    <p
                      class="pb-[8px] pt-[16px] text-[14px] font-semibold text-[#111827]"
                    >
                      No data found
                    </p>
                  </td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>

        <!--<div
              class="flex justify-between items-center border-t-[#E5E7EB] border-t-[1px] pt-[20px] mt-[20px] flex-wrap gap-3"
            >
              <p class="text-[14px] text-[#6B7280]">
                Showing {startArchivedIndex + 1} to {Math.min(
                  endArchivedIndex,
                  totalArchivedPosts
                )} of {totalArchivedPosts}
              </p>
              <div
                class="flex justify-center items-center border-[#D1D5DB] border-[1px] w-fit rounded-md"
              >
                <button
                  class="w-[48px] h-[40px] flex justify-center items-center border-r-[#D1D5DB] border-r-[1px] disabled:opacity-50"
                  disabled={currentArchivedPage === 1}
                  on:click={() => handleArchivedChange(currentArchivedPage - 1)}
                >
                  <span>
                    <svg
                      class="rotate-[180deg]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5.83398 15.1002L10.9847 10.0002L5.83398 4.90016L7.41968 3.3335L14.1673 10.0002L7.41968 16.6668L5.83398 15.1002Z"
                        fill="#4B5563"
                      />
                    </svg>
                  </span>
                </button>

                <div class="flex items-center">
                  {#each getPages() as page}
                    {#if page === "..."}
                      <span
                        class="px-[15.5px] h-[40px] flex justify-center items-center border-r-[#D1D5DB] border-r-[1px] text-[#4B5563] text-[14px]"
                        >...</span
                      >
                    {:else}
                      <button
                        class="px-[15.5px] h-[40px] flex justify-center items-center border-r-[#D1D5DB] border-r-[1px] text-[#4B5563] text-[14px] {currentArchivedPage ===
                        page
                          ? 'active'
                          : ''}"
                        on:click={() => handleArchivedChange(page)}
                      >
                        {page}
                      </button>
                    {/if}
                  {/each}
                </div>

                <button
                  class="w-[48px] h-[40px] flex justify-center items-center disabled:opacity-50"
                  disabled={currentArchivedPage === totalArchivedPages}
                  on:click={() => handleArchivedChange(currentArchivedPage + 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M5.83398 15.1002L10.9847 10.0002L5.83398 4.90016L7.41968 3.3335L14.1673 10.0002L7.41968 16.6668L5.83398 15.1002Z"
                      fill="#4B5563"
                    />
                  </svg>
                </button>
              </div>
            </div>-->
      </div>
    </div>
  </div>
  {#if isModelOpen}
    <ViewMetrics isOpen={SendPostDetails} />
  {/if}
  {#if isShowEditModelOpen}
    <EditAd post={postToEdit} />
  {/if}
</div>

<style>
  .dropdown-button {
    background-color: #fff;
    width: 120px;
    justify-content: space-between;
    border: 1px solid #d1d5db;
    color: #4b5563;
    padding: 6px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 0.375rem;
    height: 40px;
  }
  .dropdown {
    position: relative;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 120px;
    border: 1px solid #d1d5db;
    z-index: 1;
  }
  .dropdown-content.show {
    display: block;
  }
  .dropdown-item {
    padding: 8px 16px;
    cursor: pointer;
  }
  .dropdown-item:hover {
    background-color: #e4efff;
    color: #0d64e8;
  }
  .fc-event img {
    display: block;
    margin-top: 5px;
    height: 200px;
  }

  :global(.draggable) {
    color: white;
    background: #3788d8;
    width: fit-content;
    padding: 1rem;
    margin: 1rem;
    cursor: pointer;
  }
  :global(.event-image) {
    width: 100%;
    aspect-ratio: 5/4;
    overflow: hidden;
    border-radius: 4px;
  }
  :global(.fc-event-content img) {
    display: block;
    height: 80px;
    margin: 0 auto;
  }
  :global(.post-budge) {
    background: #0d64e8;
    color: #fff;
    height: 16px;
    border-radius: 4px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 0 4px;
  }
  :global(.fc-view-harness) {
    height: 472px;
  }
  :global(.fc-col-header) {
    width: 100% !important;
  }
  :global(.calendar-main .fc-header-toolbar) {
    margin-right: 136px;
  }
  @media (max-width: 1280px) {
    :global(.calendar-main .fc-header-toolbar) {
      margin-right: 116px;
    }
  }
  @media (max-width: 768px) {
    :global(.calendar-main .fc-header-toolbar) {
      flex-direction: column;
      margin-right: 0;
    }
  }
  @media (max-width: 640px) {
    :global(.fc-direction-ltr .fc-toolbar > * > :not(:first-child)) {
      margin-left: 0;
      margin-top: 14px;
    }
    :global(.calendar-main .fc-header-toolbar) {
      margin-bottom: 4.5em !important;
    }
  }
</style>
