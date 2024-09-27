<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { AudienceStore, GoalsStore } from '$lib/stores/stores';
  import { onMount } from 'svelte';
  import {
    GetBehaviorsData,
    GetInterestsData,
  } from '$lib/services/NewFacebook/NewFacebookService';
  import { writable } from 'svelte/store';
  import { isEmpty } from '$lib/services/promotionservice';
  import { getPlaceAutocomplete } from '../../services/NewFacebook/google_service';
  import { useClickOutside } from '$lib/services/useClickOutside';
  import { notification } from '../notification/notification';
  import type { AudienceInfos } from '$lib/services/interface/promotions';

  const dispatch = createEventDispatcher();

  export let percent_optimization = 0;
  const interestData = writable([]);
  const locationData = writable([]);
  const uniqArrayData = writable([]);
  let interestDataMain = writable([
    {
      id: 1,
      name: 'Interests',
      selected: false,
      children: [
        {
          id: 11,
          name: 'Child Interest 1-1',
          selected: false,
          checked: false,
          children: [
            {
              id: 111,
              name: 'Sub Child Interest 1-1-1',
              selected: false,
              checked: false,
            },
            {
              id: 12,
              name: 'Child Interest 1-2',
              selected: false,
              checked: false,
              children: [
                {
                  id: 121,
                  name: 'Sub Child Interest 1-2-1',
                  selected: false,
                  checked: false,
                },
                {
                  id: 112,
                  name: 'Sub Child Interest 1-1-2',
                  selected: false,
                  checked: false,
                },
              ],
            },
            {
              id: 122,
              name: 'Sub Child Interest 1-2-2',
              selected: false,
              checked: false,
            },
          ],
        },
        {
          id: 13,
          name: 'Child Interest 1-3',
          selected: false,
          checked: false,
          children: [
            {
              id: 131,
              name: 'Sub Child Interest 1-3-1',
              selected: false,
              checked: false,
            },
            {
              id: 132,
              name: 'Sub Child Interest 1-3-2',
              selected: false,
              checked: false,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Behaviors',
      selected: false,
      children: [
        {
          id: 21,
          name: 'Child Interest 2-1',
          selected: false,
          checked: false,
          children: [
            {
              id: 211,
              name: 'Sub Child Interest 2-1-1',
              selected: false,
              checked: false,
            },
            {
              id: 212,
              name: 'Sub Child Interest 2-1-2',
              selected: false,
              checked: false,
            },
          ],
        },
        {
          id: 22,
          name: 'Child Interest 2-2',
          selected: false,
          checked: false,
          children: [
            {
              id: 221,
              name: 'Sub Child Interest 2-2-1',
              selected: false,
              checked: false,
            },
            {
              id: 222,
              name: 'Sub Child Interest 2-2-2',
              selected: false,
              checked: false,
            },
          ],
        },
        {
          id: 23,
          name: 'Child Interest 2-3',
          selected: false,
          children: [
            {
              id: 231,
              name: 'Sub Child Interest 2-3-1',
              selected: false,
              checked: false,
            },
            {
              id: 232,
              name: 'Sub Child Interest 2-3-2',
              selected: false,
              checked: false,
            },
          ],
        },
      ],
    },
  ]);

  let Sources_propositon = [
    'Recently followed',
    'Recently viewed page',
    'Regularly engages',
    'Recently visited website',
    'Recently made purchase',
    'Items in Cart/Favorites',
    'Regular website visitors',
    'Regularly purchases',
  ];
  let location = '';
  let GoalsplatformDetails: any = {};
  $: ageCompleted = !!audience_infos.age;
  $: genderCompleted = !!audience_infos.gender;
  $: locationCompleted =
    $locationData.filter(location => location.selected).length > 0;
  $: interestsCompleted =
    $interestData.filter(interest => interest.selected).length > 0;
  $: sourcesCompleted = audience_infos.sources.length > 0;

  $: completedFields = [
    ageCompleted,
    genderCompleted,
    locationCompleted,
    interestsCompleted,
    sourcesCompleted,
  ].filter(Boolean).length;
  $: percentOptimization = (completedFields / 5) * 100;

  export let audience_infos: AudienceInfos = {
    age: '',
    gender: '',
    sources: [],
    locations: [],
    interests: [],
  };

  function setDefaultAge() {
    audience_infos.age = '24-30';
    audience_infos.gender = 'Female';
    audience_infos.locations = [
      'United States Minor Outlying Islands',
      'United Kingdom',
    ];
    audience_infos.interests = [
      'Road movie',
      'Monster movie',
      'Moviefone',
      'DEADPOOL: The Movie',
    ];
    audience_infos.sources = [
      'Regularly engages',
      'Recently visited website',
      'Regularly purchases',
    ];

    locationData.update((locations: any) => {
      return locations.map((location: any) => ({
        ...location,
        selected: audience_infos.locations.includes(location.name),
      }));
    });

    interestData.update((interests: any) => {
      return interests.map((interest: any) => ({
        ...interest,
        selected: audience_infos.interests.includes(interest.name),
      }));
    });
  }

  let newInterest = '';

  function addInterest() {
    if (newInterest.trim() !== '') {
      interestData.update(data => [
        ...data,
        { name: newInterest, selected: false },
      ]);
      newInterest = '';
    }
  }
  let newLocation = '';

  function addLocation(event: any) {
    const value = event.target.value;
    fetchPredictions(value);
  }

  function GetPlatGold() {
    const unsubscribe = GoalsStore.subscribe(value => {
      GoalsplatformDetails = value;
    });

    return () => {
      unsubscribe();
    };
  }
  $: isButtonDisabled =
    !audience_infos.age ||
    !audience_infos.gender ||
    $selectedLocations.filter(location => location.selected).length === 0 ||
    //$interestData.filter(interest => interest.selected).length === 0 ||
    audience_infos.sources.length === 0;

  function NextStep() {
    const selected_Locations = $selectedLocations
      .filter(location => location.selected)
      .map(location => location.name);
    //audience_infos.locations = selected_Locations;
    audience_infos.locations = $selectedLocations

    const selectedInterest = $uniqArrayData
      .filter(interest => interest.selected)
      .map(interest => interest.name);
    audience_infos.interests = selectedInterest;
    const Details = {
      platform: GoalsplatformDetails.platform,
      Goals: GoalsplatformDetails.Goal,
      Audience: audience_infos,
    };
    AudienceStore.set(audience_infos);
    dispatch('nextStep');
  }

  function filterLocations(query: any) {
    return $locationData.filter(location =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  const selectedLocations = writable([]);
  function handle_select_Location(location: any) {
    newLocation = location.description;
    if (newLocation.trim() !== '') {
      selectedLocations.update(data => [
        ...data,
        { name: newLocation, selected: true },
      ]);
    }
    setTimeout(() => {
      newLocation = '';
    }, 0);
  }

  function AutoFillformData() {
    if ($AudienceStore && !isEmpty($AudienceStore)) {
      (audience_infos.age = $AudienceStore.age),
        (audience_infos.gender = $AudienceStore.gender),
        (audience_infos.locations = $AudienceStore.locations),
        (audience_infos.interests = $AudienceStore.interests),
        (audience_infos.sources = $AudienceStore.sources);
    }
  }

  function filterInterests(query: any) {
    return $interestDataMain.filter(interest =>
      interest.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  function handleSelectInterest(interest: any) {
    interestDataMain.update(interests => {
      interest.selected = !interest.selected;
      interests.forEach(item => {
        if (item !== interest) {
          item.selected = false;
        }
      });
      return interests;
    });
  }
  const handleSelectChild = (child: any) => {
    child.selected = !child.selected;
    interestDataMain.update(items => [...items]);
  };
  let predictions: any[] = [];

  async function fetchPredictions(value: string) {
    try {
      const data = await getPlaceAutocomplete(value);
      predictions = data.predictions;
    } catch (error) {
      notification.danger('Error fetching predictions !', 3000);
      console.error('Error fetching predictions:', error);
    }
  }

  async function GetInterest_Behaviors() {
    const BehavioursData = await GetBehaviorsData();
    const InterestData = await GetInterestsData();
    interestDataMain.update(data => {
      const interestsObj = data.find(item => item.name === 'Interests');
      if (interestsObj) {
        interestsObj.children = InterestData;
      }
      const behaviorsObj = data.find(item => item.name === 'Behaviors');
      if (behaviorsObj) {
        behaviorsObj.children = BehavioursData;
      }

      return data;
    });

    interestDataMain.update(data => {
      data.map(sub_child => {
        sub_child.children.map(ele => {
          ele.selected = false;
          ele.checked = false;
          ele.parentName = sub_child.name;
          const t1: never[] = [];
          ele?.path.map(
            (subpath: { [x: string]: any }, index: string | number) => {
              let subchild = {
                id: index,
                name: subpath,
                checked: false,
              };
              t1.push(subchild);
            }
          );
          ele.children = t1;
        });
      });

      return data;
    });
  }

  onMount(() => {
    GetInterest_Behaviors();
    GetPlatGold();
    AutoFillformData();
  });

  let array: { name: any; checked: any }[] = [];
  function handleParentChange(e: any, child: any, currentStatus1: any) {
    interestDataMain.update(data => {
      data.forEach(ele => {
        if (ele.name === child.parentName) {
          ele.checked = !currentStatus1;
          ele.children.forEach(sub => {
            if (sub.id === child.id) {
              sub.checked = !child.checked;
              sub.children.forEach(child_sub => {
                child_sub.checked = !currentStatus1;
              });
            }
          });
        }
      });
      return [...data];
    });
    child.children.map((res: any) => {
      if (res.checked) {
        const payload = {
          name: res.name,
          checked: res.checked,
        };
        array.push(payload);
      }
    });
    handleSelectchange($interestDataMain);
  }

  function removeDuplicates(array: any, key: any) {
    const seen = new Set();
    return array
      .filter((item: any) => {
        if (!item.checked) {
          return false;
        }
        const value = item[key];
        if (seen.has(value)) {
          return false;
        }
        seen.add(value);
        return true;
      })
      .map(item => ({ ...item, selected: true }));
  }

  function handleSubChildChange(e: any, subChild: any, child: any) {
    subChild.checked = !subChild.checked;

    const allSubChildrenChecked = child.children.every(
      (item: any) => item.checked
    );
    child.checked = allSubChildrenChecked;
    interestDataMain.update((data: any) => {
      return data.map((res: any) => {
        if (res.children.some((c: any) => c.id === child.id)) {
          return {
            ...res,
            children: res.children.map((subchild: any) => {
              if (subchild.id === child.id) {
                return {
                  ...child,
                  children: child.children.map((subItem: any) => {
                    if (subItem.id === subChild.id) {
                      return subChild;
                    }
                    return subItem;
                  }),
                };
              }
              return subchild;
            }),
          };
        }
        return res;
      });
    });
    setTimeout(() => {
      handleSelectchange($interestDataMain);
    }, 1000);
  }
  let array1: any[] = [];
  function handleSelectchange(mainData: any) {
    const intrest = $interestDataMain;
    mainData.map((res: any) => {
      if (res.children && Array.isArray(res.children)) {
        res.children.map((child: any) => {
          if (child.children && Array.isArray(child.children)) {
            child.children.map((subChild: any) => {
              if (subChild.checked) {
                array1.push(subChild);
              }
            });
          }
        });
      }
    });
    setTimeout(() => {
      const uniqueArray = removeDuplicates(array1, 'name');
      uniqArrayData.set(uniqueArray);
    }, 1000);
  }
  function handleClickOutside() {
    newInterest = '';
  }

  console.log('AudienceStore', $AudienceStore);
</script>

<div class="mt-5 rounded-xl bg-white p-4 drop-shadow-md md:p-8">
  <div class="flex flex-col gap-4 pb-6">
    <h1 class="flex items-center gap-2.5 text-lg text-font_dark">
      <svg
        width="45"
        height="44"
        viewBox="0 0 45 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.417 30.6667H33.8337V28.5C33.8337 26.7051 32.3786 25.25 30.5837 25.25C29.5484 25.25 28.6262 25.734 28.0311 26.4881M28.417 30.6667H17.5837M28.417 30.6667V28.5C28.417 27.7891 28.28 27.1101 28.0311 26.4881M17.5837 30.6667H12.167V28.5C12.167 26.7051 13.6221 25.25 15.417 25.25C16.4522 25.25 17.3744 25.734 17.9696 26.4881M17.5837 30.6667V28.5C17.5837 27.7891 17.7206 27.1101 17.9696 26.4881M17.9696 26.4881C18.7683 24.4928 20.7197 23.0833 23.0003 23.0833C25.2809 23.0833 27.2324 24.4928 28.0311 26.4881M26.2503 16.5833C26.2503 18.3783 24.7953 19.8333 23.0003 19.8333C21.2054 19.8333 19.7503 18.3783 19.7503 16.5833C19.7503 14.7884 21.2054 13.3333 23.0003 13.3333C24.7953 13.3333 26.2503 14.7884 26.2503 16.5833ZM32.7503 19.8333C32.7503 21.03 31.7803 22 30.5837 22C29.387 22 28.417 21.03 28.417 19.8333C28.417 18.6367 29.387 17.6667 30.5837 17.6667C31.7803 17.6667 32.7503 18.6367 32.7503 19.8333ZM17.5837 19.8333C17.5837 21.03 16.6136 22 15.417 22C14.2204 22 13.2503 21.03 13.2503 19.8333C13.2503 18.6367 14.2204 17.6667 15.417 17.6667C16.6136 17.6667 17.5837 18.6367 17.5837 19.8333Z"
          stroke="#0D64E8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="1.5"
          y="1"
          width="42"
          height="42"
          rx="9"
          stroke="#0D64E8"
          stroke-width="2"
        />
      </svg>
      <div>
        <div class="font-bold">Audience</div>
        <div class="text-xs text-blue-primary">
          <span class="font-bold">{percentOptimization.toFixed(0)}%</span>
          of text optimized
        </div>
      </div>
    </h1>

    <hr class="h-[1px] bg-gray-200" />

    <div
      class="relative flex gap-8 rounded-md bg-blue-bglight p-[12px] text-sm text-blue-primary"
    >
      <div
        class="flex flex-1 flex-wrap items-end gap-[18px] sm:flex-nowrap sm:gap-[32px]"
      >
        <div class="flex items-start">
          <div>
            <svg
              class="mt-0.5 h-4 w-4"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 2C5.18486 2 2.5 4.68486 2.5 8C2.5 11.3151 5.18486 14 8.5 14C11.8151 14 14.5 11.3151 14.5 8C14.5 4.68486 11.8151 2 8.5 2ZM12.2171 10.9677C11.835 11.335 11.3189 11.4739 10.7382 10.7345L8.99627 8.61538C8.7134 8.27295 8.18735 8.28288 7.91439 8.63027L6.29653 10.7146C5.67618 11.5087 5.1402 11.3201 4.74814 10.9132C4.11786 10.1042 3.74069 9.09677 3.74069 7.99504C3.74069 5.36973 5.87469 3.23573 8.5 3.23573C11.1253 3.23573 13.2593 5.36973 13.2593 7.99504C13.2593 9.11663 12.8672 10.1489 12.2171 10.9628V10.9677Z"
                fill="#0D64E8"
              />
            </svg>
          </div>
          <div>
            <div class="font-semibold">Colocio recommends:</div>
            <div class="text-xs">
              A demographic of age 21-35, female with a location of New York,
              USA and London, UK. Interest and Behaviours include online
              shopping, music festivals, night life, food and drink pairing,
              social events, outdoors, at home dining.
            </div>
          </div>
        </div>
        <button
          on:click={setDefaultAge}
          class="h-[32px] w-full rounded-md bg-[#0D64E8] text-[14px] text-white sm:max-w-[66px]"
          >Apply</button
        >
      </div>
    </div>
    <div>
      <h3 class="mb-4 text-[14px] font-bold text-font_dark">Description</h3>
      <div class="flex grid-cols-2 flex-col gap-4 sm:grid sm:flex-none">
        <div class="col-span-1 flex flex-col gap-1">
          <label
            for="age"
            class="text-[14px] font-medium text-gray-600">Age</label
          >
          <select
            bind:value={audience_infos.age}
            id="age"
            class="block h-[40px] w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="12-18">12 - 18</option>
            <option value="18-24">18 - 24</option>
            <option value="24-30">24 - 30</option>
            <option value="30-40">30 - 40</option>
            <option value="40-50">40 - 50</option>
          </select>
        </div>
        <div class="col-span-1 flex flex-col gap-1">
          <label
            for="age"
            class="text-[14px] font-medium text-gray-600">Gender</label
          >
          <select
            bind:value={audience_infos.gender}
            id="age"
            class="block h-[40px] w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="All">All</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="col-span-1 flex flex-col gap-1">
          <label
            for="age"
            class="text-[14px] font-medium text-gray-600">Location</label
          >
          <div class="relative">
            <input
              type="text"
              id="headline_2"
              class="block h-[40px] w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              bind:value={newLocation}
              on:keyup={e => {
                addLocation(event);
              }}
            />
            <ul
              class="absolute z-10 mt-1 h-[160px] w-full overflow-auto rounded-lg border border-gray-300 bg-white"
              hidden={newLocation.trim() === ''}
            >
              {#if predictions.length === 0}
                <li class="p-2">No results match</li>
              {:else}
                {#each predictions as prediction}
                  <li
                    class="flex cursor-pointer items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap p-2 hover:bg-gray-100"
                    on:click={() => handle_select_Location(prediction)}
                  >
                    <img
                      src="/images/map.png"
                      class="w-4 opacity-70"
                    />
                    <span
                      class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
                      >{prediction.description}</span
                    >
                  </li>
                {/each}
              {/if}
            </ul>
            <button
              type="button"
              class="absolute right-3 top-3 bg-transparent"
              on:click={addLocation}
            >
              {#if location == ''}
                <img
                  src="/icons/search.svg"
                  alt="plus"
                  class="h-5 w-5"
                />
              {:else}
                <img
                  src="/icons/plus.svg"
                  alt="plus"
                  class="h-5 w-5"
                />
              {/if}
            </button>
          </div>
        </div>
        <div class="col-span-2 mt-2 flex flex-wrap gap-2">
          {#each $selectedLocations as location}
            <button
              type="button"
              class={`flex items-center justify-between gap-2 rounded-md border border-gray-300 px-3 py-[4.5px] text-[14px] hover:bg-blue-bglight ${location.selected ? 'border-[#E4EFFF] bg-[#F4F9FF]' : ''}`}
              class:bg-white={!location.selected}
              class:text-blue-primary={location.selected}
              class:text-gray-600={!location.selected}
              on:click={() => {
                location.selected = !location.selected;
                selectedLocations.update(data => [...data]);
              }}
            >
              {location.name}
              {#if location.selected}
                <img
                  src="/icons/close_blue.svg"
                  alt="Remove"
                  class="h-5 w-5"
                />
              {:else}
                <img
                  src="/icons/plus.svg"
                  alt="Add"
                  class="h-5 w-5"
                />
              {/if}
            </button>
          {/each}

          {#if $AudienceStore?.locations?.length > 0}
          {#each $AudienceStore?.locations as location}
          <button
            type="button"
            class={`flex items-center justify-between gap-2 rounded-md border border-gray-300 px-3 py-[4.5px] text-[14px] hover:bg-blue-bglight ${location.selected ? 'border-[#E4EFFF] bg-[#F4F9FF]' : ''}`}
            class:bg-white={!location.selected}
            class:text-blue-primary={location.selected}
            class:text-gray-600={!location.selected}
            on:click={() => {
              location.selected = !location.selected;
              selectedLocations.update(data => [...data]);
            }}
          >
            {location.name}
            {#if location.selected}
              <img
                src="/icons/close_blue.svg"
                alt="Remove"
                class="h-5 w-5"
              />
            {:else}
              <img
                src="/icons/plus.svg"
                alt="Add"
                class="h-5 w-5"
              />
            {/if}
          </button>
        {/each}
          {/if}




        </div>
        <hr class="col-span-2 h-[1px] bg-gray-200" />

        <h3 class="col-span-2 text-[14px] font-bold text-font_dark">
          Interests and behaviours
        </h3>

        <div class="col-span-1 flex flex-col gap-1">
          <label
            for="age"
            class="text-[14px] font-medium text-gray-600"
            >Add interests/behaviours</label
          >
          <p class="text-[12px] text-xs text-gray-500">
            e.g. shops online, music festivals
          </p>
          <div class="relative">
            <input
              type="text"
              id="interest"
              class="block h-[40px] w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              bind:value={newInterest}
              on:input={e => filterInterests(e.target?.value)}
              on:keyup={e => {
                if (e.key == 'Enter') addInterest();
              }}
            />
            {#if newInterest.trim() !== ''}
              <div
                class=""
                use:useClickOutside={handleClickOutside}
              >
                <ul
                  class="absolute z-10 mt-1 max-h-[200px] w-full overflow-auto rounded-lg border border-gray-300 bg-white"
                >
                  {#each $interestDataMain as interest}
                    <li
                      class="cursor-pointer border-b p-2 text-[14px]"
                      on:click={e => {
                        e.stopPropagation();
                        handleSelectInterest(interest);
                      }}
                    >
                      <div class="flex items-center gap-[6px]">
                        <div class="flex flex-1 items-center gap-[6px]">
                          <span>
                            <img
                              src="/images/arrowdown.png"
                              alt="arrowdown"
                              class="w-3 {interest.selected
                                ? ''
                                : 'rotate-[-90deg]'}"
                            />
                          </span>
                          {interest.name}
                        </div>
                        <img
                          src="/images/info-icon-svgrepo-com.svg"
                          alt="arrowdown"
                          class="w-3"
                        />
                      </div>
                      {#if interest.selected}
                        <ul class="pl-4">
                          {#each interest.children as child}
                            <li
                              class="group flex cursor-pointer items-center gap-[6px] p-2 text-[14px] hover:bg-gray-100"
                              on:click={e => {
                                e.stopPropagation();
                                handleSelectChild(child);
                              }}
                            >
                              <div class="flex flex-1 items-center gap-[6px]">
                                <span>
                                  <img
                                    src="/images/arrowdown.png"
                                    alt="arrowdown"
                                    class="w-3 flex-none {child.selected
                                      ? ''
                                      : 'rotate-[-90deg]'}"
                                  />
                                </span>
                                {child.name}
                              </div>
                              <button
                                class="hidden text-xs font-medium text-blue-600 hover:text-blue-700 group-hover:block"
                                >Select all</button
                              >
                              <input
                                type="checkbox"
                                checked={child.checked}
                                on:change={e => {
                                  e.stopPropagation();
                                  handleParentChange(e, child, child.checked);
                                }}
                              />
                            </li>
                            {#if child.selected}
                              <ul class="pl-5">
                                {#each child.children as subChild}
                                  <li
                                    class="flex cursor-pointer items-center gap-[6px] p-2 hover:bg-gray-100"
                                  >
                                    <span class="flex-1">
                                      {subChild.name}
                                    </span>
                                    <input
                                      type="checkbox"
                                      checked={subChild.checked}
                                      on:click={e => {
                                        e.stopPropagation();
                                        handleSubChildChange(
                                          e,
                                          subChild,
                                          child
                                        );
                                      }}
                                    />
                                  </li>
                                {/each}
                              </ul>
                            {/if}
                          {/each}
                        </ul>
                      {/if}
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
            <button
              type="button"
              class="absolute right-3 top-3 bg-transparent"
              on:click={addInterest}
            >
              {#if newInterest.trim() === ''}
                <img
                  src="/icons/search.svg"
                  alt="search"
                  class="h-5 w-5"
                />
              {:else}
                <img
                  src="/icons/plus.svg"
                  alt="add"
                  class="h-5 w-5"
                />
              {/if}
            </button>
          </div>
        </div>
        <div class="col-span-2 flex flex-wrap gap-2">
          <!-- ----------------------------------------------------------- -->

          {#each $uniqArrayData as interest}
            <button
              type="button"
              class={`flex items-center justify-between gap-2 rounded-md border border-gray-300 px-3 py-[4.5px] text-[14px] hover:bg-blue-bglight ${interest.selected ? 'border-[#E4EFFF] bg-[#F4F9FF]' : ''}`}
              class:bg-white={!interest.selected}
              class:text-blue-primary={interest.selected}
              class:text-gray-600={!interest.selected}
              on:click={() => {
                interest.selected = !interest.selected;
                uniqArrayData.update(data => [...data]);
              }}
            >
              {interest.name}
              {#if interest.selected}
                <img
                  src="/icons/close_blue.svg"
                  alt="Remove"
                  class="h-5 w-5"
                />
              {:else}
                <img
                  src="/icons/plus.svg"
                  alt="Add"
                  class="h-5 w-5"
                />
              {/if}
            </button>
          {/each}
        </div>
        <hr class="col-span-2 h-[1px] bg-gray-200" />
        <div class="col-span-2 mb-2 w-full">
          <div>
            <h3 class="col-span-2 text-[14px] font-bold text-font_dark">
              Sources
            </h3>
            <p class="text-[12px] text-[#6B7280]">
              Target users that recently/regularly interacts with you brand
            </p>
          </div>
          <div class="col-span-2 mt-[16px] flex w-full flex-wrap gap-2">
            {#each Sources_propositon as base_sources}
              {@const selected = audience_infos.sources?.includes(base_sources)}
              <button
                on:click={() => {
                  if (selected) {
                    audience_infos.sources = audience_infos.sources.filter(
                      item => item != base_sources
                    );
                  } else {
                    audience_infos.sources = [
                      ...audience_infos.sources,
                      base_sources,
                    ];
                  }
                }}
                class:bg-white={!selected}
                class:text-blue-primary={selected}
                class:text-gray-600={!selected}
                type="button"
                class={`flex items-center justify-between gap-2 rounded-md border border-gray-300 px-3 py-[4.5px] text-[14px] hover:bg-blue-bglight ${selected ? 'border-[#E4EFFF] bg-[#F4F9FF]' : ''}`}
              >
                {base_sources}
                {#if selected}
                  <img
                    src="/icons/close_blue.svg"
                    alt="plus"
                    class="h-5 w-5"
                  />
                {:else}
                  <img
                    src="/icons/plus.svg"
                    alt="plus"
                    class="h-5 w-5"
                  />
                {/if}
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-between gap-4">
    <button
      on:click={() => {
        dispatch('prevStep');
      }}
      type="button"
      class="flex h-[40px] w-full max-w-[50%] items-center justify-center gap-2 rounded-md border border-[#D1D5DB] bg-white px-5 py-2.5 text-sm font-medium text-[#4B5563] hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 sm:max-w-[100px]"
    >
      Previous
    </button>
    <button
      disabled={isButtonDisabled}
      class:opacity-50={isButtonDisabled}
      on:click={NextStep}
      type="button"
      class="flex h-[40px] w-full max-w-[50%] items-center justify-center gap-2 rounded-md bg-[#0D64E8] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:max-w-[100px]"
    >
      Next
    </button>
  </div>
</div>
