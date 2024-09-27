<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import {
    AudienceStore,
    GoalsStore,
    audience_edit_model,
    automatedAudience,
  } from '$lib/stores/stores';
  import { onMount } from 'svelte';
  import { get, writable } from 'svelte/store';
  import {
    GetBehaviorsData,
    GetInterestsData,
    getLocation,
    searchInterests,
  } from '$lib/services/NewFacebook/NewFacebookService';
  import { getPlaceAutocomplete } from '../services/NewFacebook/google_service';
  import { isEmpty } from '$lib/services/promotionservice';
  import { useClickOutside } from '$lib/services/useClickOutside';

  const dispatch = createEventDispatcher();

  export let percent_optimization = 0;
  export let ShareAudience;
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
  let interest = '';
  let Sources = '';
  let location = '';
  let GoalsplatformDetails: any = {};
  $: ageCompleted = !!audience_infos.age;
  $: genderCompleted = !!audience_infos.gender;
  $: locationCompleted = audience_infos.locations.length > 0;
  $: interestsCompleted = audience_infos.interests.length > 0;
  $: sourcesCompleted = audience_infos.sources.length > 0;

  $: completedFields = [
    ageCompleted,
    genderCompleted,
    locationCompleted,
    interestsCompleted,
    sourcesCompleted,
  ].filter(Boolean).length;
  $: percentOptimization = (completedFields / 5) * 100;

  export let audience_infos = {
    age: '',
    gender: '',
    locations: [],
    interests: [],
    sources: [],
  };
  const locationData = writable([]);
  const interestData = writable([]);

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

    locationData.update(locations => {
      return locations.map(location => ({
        ...location,
        selected: audience_infos.locations.includes(location.name),
      }));
    });

    interestData.update(interests => {
      return interests.map(interest => ({
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
      unsubscribe(); // Clean up the subscription when the component is destroyed
    };
  }
  $: isButtonDisabled =
    !audience_infos.age ||
    !audience_infos.gender ||
    audience_infos.locations.length === 0 ||
    audience_infos.interests.length === 0 ||
    audience_infos.sources.length === 0;
  function NextStep() {
    const Details = {
      platform: GoalsplatformDetails.platform,
      Goals: GoalsplatformDetails.Goal,
      Audience: audience_infos,
    };

    AudienceStore.set(audience_infos);

    dispatch('nextStep');
  }

  async function getInterest() {
    try {
      const data = await searchInterests();
      interestData.set(data.data);
    } catch (error) {
      console.error('Failed to fetch interest data:', error);
      interestData.set([]);
    }
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
  async function getLocationData() {
    const data = await getLocation();
    locationData.set(data);
  }
  function handleSelectInterest(interest) {
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
  let predictions: any[] = [];

  async function fetchPredictions(value: string) {

    try {
      const data = await getPlaceAutocomplete(value);
      predictions = data.predictions;
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  }
  const handleSelectChild = child => {
    child.selected = !child.selected;
    interestDataMain.update(items => [...items]);
  };
  function filterInterests(query) {
    return $interestDataMain.filter(interest =>
      interest.name.toLowerCase().includes(query.toLowerCase())
    );
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
    GetPlatGold();
    GetInterest_Behaviors();
    AutoFillformData();
  });

  const hanldeSubmitAudince = () => {
    const selected_Locations = $selectedLocations
      .filter(location => location.selected)
      .map(location => location.name);

    const selectedInterest = $uniqArrayData
      .filter(interest => interest.selected)
      .map(interest => interest.name);

    const audienceData = {
      age: ShareAudience.age,
      interests: selectedInterest,
      location: selected_Locations,
      gender: ShareAudience.gender,
      sources: ShareAudience.sources,
    };

    dispatch('Details', { audienceData });

    automatedAudience.set(audienceData);

    audience_edit_model.set(false);
  };
  function AutoFillformData() {
    if ($AudienceStore && !isEmpty($AudienceStore)) {
      (audience_infos.age = $AudienceStore.age),
        (audience_infos.gender = $AudienceStore.gender),
        (audience_infos.locations = $AudienceStore.locations),
        (audience_infos.interests = $AudienceStore.interests),
        (audience_infos.sources = $AudienceStore.sources);
    }
  }
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

  function removeDuplicates(array, key) {
    const seen = new Set();
    return array
      .filter(item => {
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
</script>

<div
  class="relative z-50"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
    class="fixed inset-0 transition-opacity backdrop-blur-sm"
    style="background:rgba(0, 0, 0, 0.12)"
  />

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full justify-center p-3 text-center items-center">
      <div
        class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left drop-shadow transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 flex flex-col justify-between"
      >
        <button
          on:click={() => audience_edit_model.set(false)}
          class="absolute right-[13px] top-[17px]"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.57613 4.37575C3.81044 4.14143 4.19034 4.14143 4.42465 4.37575L7.60039 7.55148L10.7761 4.37575C11.0104 4.14143 11.3903 4.14143 11.6247 4.37575C11.859 4.61006 11.859 4.98996 11.6247 5.22428L8.44892 8.40001L11.6247 11.5757C11.859 11.8101 11.859 12.19 11.6247 12.4243C11.3903 12.6586 11.0104 12.6586 10.7761 12.4243L7.60039 9.24854L4.42465 12.4243C4.19034 12.6586 3.81044 12.6586 3.57613 12.4243C3.34181 12.19 3.34181 11.8101 3.57613 11.5757L6.75186 8.40001L3.57613 5.22428C3.34181 4.98996 3.34181 4.61006 3.57613 4.37575Z"
              fill="#1B1D1F"
            />
          </svg></button
        >
        <div>
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
                <div class="text-blue-primary text-xs">
                  <span class="font-bold"
                    >{percentOptimization.toFixed(0)}%</span
                  >
                  of text optimized
                </div>
              </div>
            </h1>

            <hr class="bg-gray-200 h-[1px]" />

            <div
              class="flex gap-8 bg-blue-bglight text-blue-primary text-sm p-[12px] rounded-md relative"
            >
              <div
                class="flex-1 flex items-end sm:flex-nowrap flex-wrap sm:gap-[32px] gap-[18px]"
              >
                <div class="flex items-start">
                  <div>
                    <svg
                      class="w-4 h-4 mt-0.5"
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
                      A demographic of age 21-35, female with a location of New
                      York, USA and London, UK. Interest and Behaviours include
                      online shopping, music festivals, night life, food and
                      drink pairing, social events, outdoors, at home dining.
                    </div>
                  </div>
                </div>
                <button
                  on:click={setDefaultAge}
                  class="bg-[#0D64E8] text-white rounded-md sm:max-w-[66px] w-full h-[32px] text-[14px]"
                  >Apply</button
                >
              </div>
            </div>
            <div>
              <h3 class="text-font_dark font-bold mb-4 text-[14px]">
                Description
              </h3>
              <div class="sm:grid flex sm:flex-none flex-col grid-cols-2 gap-4">
                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="age"
                    class="font-medium text-gray-600 text-[14px]">Age</label
                  >
                  <select
                    bind:value={ShareAudience.age}
                    id="age"
                    class="bg-white border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 h-[40px]"
                  >
                    <option value="12-18">12 - 18</option>
                    <option value="18-24">18 - 24</option>
                    <option value="21 - 35">24 - 30</option>
                    <option value="30-40">30 - 40</option>
                    <option value="40-50">40 - 50</option>
                  </select>
                </div>
                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="age"
                    class="font-medium text-gray-600 text-[14px]">Gender</label
                  >
                  <select
                    bind:value={ShareAudience.gender}
                    id="age"
                    class="bg-white border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 h-[40px]"
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
                    class="font-medium text-gray-600 text-[14px]"
                    >Location</label
                  >

                  <div class="relative">
                    <input
                      type="text"
                      id="headline_2"
                      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[40px]"
                      bind:value={newLocation}
                      on:keyup={e => {
                        addLocation(event);
                      }}
                    />
                    <ul
                      class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg h-[160px] overflow-auto"
                      hidden={newLocation.trim() === ''}
                    >
                      {#each predictions as prediction}
                        <!--<li
                    class="p-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-2"
                    on:click={() => handle_select_Location(prediction)}><img src="/images/map.png" class='w-4 opacity-80' />{prediction.description}</li>-->
                        <li
                          class="p-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-2"
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
                    </ul>
                    <button
                      type="button"
                      class="bg-transparent absolute right-3 top-3"
                      on:click={addLocation}
                    >
                      {#if location == ''}
                        <img
                          src="/icons/search.svg"
                          alt="plus"
                          class="w-5 h-5"
                        />
                      {:else}
                        <img
                          src="/icons/plus.svg"
                          alt="plus"
                          class="w-5 h-5"
                        />
                      {/if}
                    </button>
                  </div>
                </div>
                <div class="flex flex-wrap col-span-2 gap-2 mt-2">
                  {#each $selectedLocations as location}
                    <button
                      type="button"
                      class={`px-3 py-[4.5px] hover:bg-blue-bglight border rounded-md border-gray-300 gap-2 flex items-center justify-between text-[14px] ${location.selected ? 'bg-[#F4F9FF] border-[#E4EFFF]' : ''}`}
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
                          class="w-5 h-5"
                        />
                      {:else}
                        <img
                          src="/icons/plus.svg"
                          alt="Add"
                          class="w-5 h-5"
                        />
                      {/if}
                    </button>
                  {/each}
                </div>
                <hr class="bg-gray-200 h-[1px] col-span-2" />

                <h3 class="text-font_dark font-bold col-span-2 text-[14px]">
                  Interests and behaviours
                </h3>

                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="age"
                    class="font-medium text-gray-600 text-[14px]"
                    >Add interests/behaviours</label
                  >
                  <p class="text-gray-500 text-xs text-[12px]">
                    e.g. shops online, music festivals
                  </p>
                  <div class="relative">
                    <input
                      type="text"
                      id="interest"
                      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[40px]"
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
                          class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg max-h-[200px] overflow-auto"
                        >
                          {#each $interestDataMain as interest}
                            <li
                              class="p-2 border-b cursor-pointer text-[14px]"
                              on:click={e => {
                                e.stopPropagation();
                                handleSelectInterest(interest);
                              }}
                            >
                              <div class="flex items-center gap-[6px]">
                                <div class="flex-1 flex items-center gap-[6px]">
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
                                      class="p-2 hover:bg-gray-100 group cursor-pointer flex items-center gap-[6px] text-[14px]"
                                      on:click={e => {
                                        e.stopPropagation();
                                        handleSelectChild(child);
                                      }}
                                    >
                                      <div
                                        class="flex flex-1 gap-[6px] items-center"
                                      >
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
                                        class="group-hover:block hidden text-blue-600 font-medium text-xs hover:text-blue-700"
                                        >Select all</button
                                      >
                                      <input
                                        type="checkbox"
                                        checked={child.checked}
                                        on:change={e => {
                                          e.stopPropagation();
                                          handleParentChange(
                                            e,
                                            child,
                                            child.checked
                                          );
                                        }}
                                      />
                                    </li>
                                    {#if child.selected}
                                      <ul class="pl-5">
                                        {#each child.children as subChild}
                                          <li
                                            class="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-[6px]"
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
                      class="bg-transparent absolute right-3 top-3"
                      on:click={addInterest}
                    >
                      {#if newInterest.trim() === ''}
                        <img
                          src="/icons/search.svg"
                          alt="search"
                          class="w-5 h-5"
                        />
                      {:else}
                        <img
                          src="/icons/plus.svg"
                          alt="add"
                          class="w-5 h-5"
                        />
                      {/if}
                    </button>
                  </div>
                </div>
                <div class="flex flex-wrap col-span-2 gap-2">
                  <!-- ----------------------------------------------------------- -->

                  {#each $uniqArrayData as interest}
                    <button
                      type="button"
                      class={`px-3 py-[4.5px] hover:bg-blue-bglight border rounded-md border-gray-300 gap-2 flex items-center justify-between text-[14px] ${interest.selected ? 'bg-[#F4F9FF] border-[#E4EFFF]' : ''}`}
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
                          class="w-5 h-5"
                        />
                      {:else}
                        <img
                          src="/icons/plus.svg"
                          alt="Add"
                          class="w-5 h-5"
                        />
                      {/if}
                    </button>
                  {/each}
                </div>
                <hr class="bg-gray-200 h-[1px] col-span-2" />
                <div class="w-full col-span-2 mb-2">
                  <div>
                    <h3 class="text-font_dark font-bold col-span-2 text-[14px]">
                      Sources
                    </h3>
                    <p class="text-[#6B7280] text-[12px]">
                      Target users that recently/regularly interacts with you
                      brand
                    </p>
                  </div>
                  <div class="flex flex-wrap col-span-2 gap-2 w-full mt-[16px]">
                    {#each Sources_propositon as base_sources}
                      {@const selected =
                        ShareAudience.sources?.includes(base_sources)}
                      <button
                        on:click={() => {
                          if (selected) {
                            ShareAudience.sources =
                              ShareAudience.sources.filter(
                                item => item != base_sources
                              );
                          } else {
                            ShareAudience.sources = [
                              ...ShareAudience.sources,
                              base_sources,
                            ];
                          }
                        }}
                        class:bg-white={!selected}
                        class:text-blue-primary={selected}
                        class:text-gray-600={!selected}
                        type="button"
                        class={`px-3 py-[4.5px] hover:bg-blue-bglight border rounded-md border-gray-300 gap-2 flex items-center justify-between text-[14px] ${selected ? 'bg-[#F4F9FF] border-[#E4EFFF]' : ''}`}
                      >
                        {base_sources}
                        {#if selected}
                          <img
                            src="/icons/close_blue.svg"
                            alt="plus"
                            class="w-5 h-5"
                          />
                        {:else}
                          <img
                            src="/icons/plus.svg"
                            alt="plus"
                            class="w-5 h-5"
                          />
                        {/if}
                      </button>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-2 justify-end">
            <button
              on:click={() => audience_edit_model.set(false)}
              class="border-[#D1D5DB] border-[1px] rounded-[6px] text-[#4B5563] text-[14px] h-[40px] px-[13px]"
              >Cancel</button
            >
            <button
              on:click={hanldeSubmitAudince}
              class="bg-[#0D64E8] rounded-[6px] text-white text-[14px] h-[40px] px-[13px] flex gap-2 items-center"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.6612 3.125C13.7625 3.125 13.8597 3.16524 13.9313 3.23687L16.7631 6.06869C16.8348 6.14032 16.875 6.23746 16.875 6.33876V16.4931C16.875 16.704 16.704 16.875 16.4931 16.875H3.50694C3.296 16.875 3.125 16.704 3.125 16.4931V3.50694C3.125 3.296 3.296 3.125 3.50694 3.125H13.6612Z"
                  stroke="#F9FAFB"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.18056 11.1458C6.18056 10.9349 6.35156 10.7639 6.5625 10.7639H13.4375C13.6484 10.7639 13.8194 10.9349 13.8194 11.1458V16.4931C13.8194 16.704 13.6484 16.875 13.4375 16.875H6.5625C6.35156 16.875 6.18056 16.704 6.18056 16.4931V11.1458Z"
                  stroke="#F9FAFB"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.94444 3.50694C6.94444 3.296 7.11545 3.125 7.32639 3.125H12.6736C12.8846 3.125 13.0556 3.296 13.0556 3.50694V6.5625C13.0556 6.77344 12.8846 6.94444 12.6736 6.94444H7.32639C7.11545 6.94444 6.94444 6.77344 6.94444 6.5625V3.50694Z"
                  stroke="#F9FAFB"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg> Save</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
