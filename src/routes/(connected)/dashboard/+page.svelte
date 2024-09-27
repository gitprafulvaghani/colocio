<script>
  import FullCalendar from "svelte-fullcalendar";
  import EngagementOverview from "$lib/components/EngagementOverview.svelte";
  import GlobalGrowth from "$lib/components/GlobalGrowth.svelte";
  import Dropdown from "$lib/components/Dropdown.svelte";
  import { GetpostPreviews } from "$lib/services/NewFacebook/NewFacebookService";
  import { get, writable } from "svelte/store";
  import { onMount } from "svelte";
  import daygridPlugin from "@fullcalendar/daygrid";
  import timegridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";

  let typeSelected = "All";
  let platformSelected = "All";
  let customSelected = "All";

  export const eventStore = writable([]);
  let calendarComponentRef;

  const typeItems = ["Type 1", "Type 2", "Type 3"];
  const platformItems = ["Platform 1", "Platform 2", "Platform 3"];
  const customItems = ["Option 1", "Option 2", "Option 3"];

  function renderEventContent(eventInfo) {
    let imageUrl = eventInfo.event.extendedProps.image_url;
    let title = eventInfo.event.title;

    if (imageUrl) {
      return {
        html: `
            <div class="fc-event-content post-data">
                  <div class='fc-heading'>
                      <span class="post-budge">Post</span>
                      <span class='fc-timing'>8:00 AM</span>
                  </div>
                  <div class='photo-post'>
                      <img class="event-image" src="${imageUrl}" alt="${title}" style="width:100%;"/>
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
    } else {
      return {
        html: `<div class="fc-event-content"><div>${title}</div></div>`,
      };
    }
  }

  // async function GetPreview() {
  //   try {
  //     const postData = await GetpostPreviews();
  //     const details = postData.map((res) => ({
  //       title: res.message,
  //       start: res.date_start || "2024-06-01T10:00:00",
  //       end: res.date_stop || "2024-06-01T10:00:00",
  //       image_url: res.full_picture,
  //     }));
  //     eventStore.set(details);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //   }
  // }
  async function fetchEvents() {
    try {
      const postData = await GetpostPreviews();
      const events = postData.map((res) => ({
        title: res.message,
        start: res.date_start || "2024-06-01T10:00:00",
        end: res.date_stop || "2024-06-01T10:00:00",
        image_url: res.full_picture,
      }));
      eventStore.set(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  let options = {
    // droppable: true,
    // editable: true,

    plugins: [daygridPlugin, timegridPlugin, interactionPlugin],
    initialView: "timeGridWeek",
    headerToolbar: {
      right: "prev,today,next",
      left: "title",
      // right: 'dayGridMonth,timeGridWeek',
    },
    // height: "100%",
    // weekends: true,
    // eventContent: renderEventContent,
    events: (fetchInfo, successCallback, failureCallback) => {
      eventStore.subscribe((events) => successCallback(events));
    },
    eventContent: function (eventInfo) {
      let imageUrl = eventInfo.event.extendedProps.image_url;
      let title = eventInfo.event.title;
      return {
        html: `<div class="fc-event-content">
                  <div>${title}</div>
                  ${
                    imageUrl
                      ? `<img src="${imageUrl}" alt="${title}" style="width: 100%;">`
                      : ""
                  }
                 </div>`,
      };
    },
  };

  onMount(() => {
    fetchEvents();
  });
</script>

<div class="pb-[80px]">
  <div class="px-[16px] py-[16px]">
    <div
      class="flex gap-4 justify-between pb-[20px] border-b-[#E5E7EB] border-b-[1px] mb-[20px] flex-wrap"
    >
      <div class="flex xl:gap-8 gap-4 items-center flex-wrap">
        <Dropdown
          label="Type"
          items={typeItems}
          selected={typeSelected}
          on:change={(e) => (typeSelected = e.detail)}
        />
        <Dropdown
          label="Platform"
          items={platformItems}
          selected={platformSelected}
          on:change={(e) => (platformSelected = e.detail)}
        />
        <Dropdown
          label="Custom"
          items={customItems}
          selected={customSelected}
          on:change={(e) => (customSelected = e.detail)}
        />
      </div>
      <div>
        <button
          class="p-[11.5px_7px_11.5px_14px] text-[#111827] text-[14px] font-medium"
          >Today</button
        >
        <button
          class="p-[11.5px_7px_11.5px_14px] text-[#0D64E8] text-[14px] font-semibold"
          >1 week</button
        >
        <button
          class="p-[11.5px_7px_11.5px_14px] text-[#111827] text-[14px] font-medium"
          >1 month</button
        >
        <button
          class="p-[11.5px_7px_11.5px_14px] text-[#111827] text-[14px] font-medium"
          >1 year</button
        >
        <button
          class="p-[11.5px_7px_11.5px_14px] text-[#111827] text-[14px] font-medium"
          >All time</button
        >
      </div>
    </div>
    <div class="flex items-center gap-2 mb-[20px]">
      <h2 class="text-[#4B5563] sm:text-[24px] text-[22px] font-medium">
        Schedule overview
      </h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.5 2C5.35786 2 2 5.35786 2 9.5C2 13.6421 5.35786 17 9.5 17C13.6421 17 17 13.6421 17 9.5C17 5.35786 13.6421 2 9.5 2ZM3.14319 9.5C3.14319 5.98923 5.98923 3.14319 9.5 3.14319C13.0108 3.14319 15.8568 5.98923 15.8568 9.5C15.8568 13.0108 13.0108 15.8568 9.5 15.8568C5.98923 15.8568 3.14319 13.0108 3.14319 9.5ZM10.0716 9.5C10.0716 9.18432 9.81568 8.92841 9.5 8.92841C9.18432 8.92841 8.92841 9.18432 8.92841 9.5V12.2714C8.92841 12.587 9.18432 12.843 9.5 12.843C9.81568 12.843 10.0716 12.587 10.0716 12.2714V9.5ZM8.80716 7.42148C8.80716 7.03883 9.11735 6.72864 9.5 6.72864C9.88265 6.72864 10.1928 7.03883 10.1928 7.42148C10.1928 7.80412 9.88265 8.11432 9.5 8.11432C9.11735 8.11432 8.80716 7.80412 8.80716 7.42148Z"
          fill="#4B5563"
        />
      </svg>
    </div>
    <div class="demo-app-calendar dash-calendar">
      <FullCalendar bind:this={calendarComponentRef} {options} />
      <button
        class="bg-[#0D64E8] text-white h-[40px] rounded-md max-w-[145px] text-[14px] w-full absolute sm:top-[20px] top-[122px] right-[16px]"
        >Manage schedule</button
      >
    </div>

    <div>
      <EngagementOverview />
      <GlobalGrowth />
    </div>
  </div>
</div>

<style>
  .dash-calendar {
    background: #fff;
    border-radius: 6px;
    position: relative;
    border: 1px solid #d1d5db;
  }
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
    border-radius: 6px;
  }
  .dropdown-content.show {
    display: block;
  }
  .dropdown-item {
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
  }
  .dropdown-item:hover {
    background-color: #e4efff;
    color: #0d64e8;
  }
  :global(.fc-view-harness) {
    height: 472px !important;
  }
</style>
