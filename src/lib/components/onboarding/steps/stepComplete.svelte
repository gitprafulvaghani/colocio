<script lang="ts">
  import { goto } from '$app/navigation';
  import Loader from '$lib/components/Loader.svelte';
  import {
    accounts,
    audience,
    onboardingComplete,
  } from '$lib/stores/onboarding';
  import {
    company_infos,
    currency,
    detailed_offering,
    elevator_pitch,
    objects_added_business,
    toastStore,
  } from '$lib/stores/stores';
  import { redirect } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  const data = {
    entity: {
      name: $company_infos.name,
      elevatorPitch: $elevator_pitch,
      detailedOffering: $detailed_offering,
      currency: $currency.id,
    },
    audience: $audience,
    assets: $accounts,
    offerings: $objects_added_business,
  };

  function cancel() {
    goto('/');
  }

  onMount(async () => {
    const createProfile = await fetch('/api/onboarding/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (createProfile.status == 200) {
      $onboardingComplete = true;
      toastStore.update(toasts => [
        ...toasts,
        {
          id: Math.random(),
          type: 'success',
          message: 'Profile has been succesfully created!',
          duration: 100000,
        },
      ]);
    } else {
      toastStore.update(toasts => [
        ...toasts,
        {
          id: Math.random(),
          type: 'danger',
          message: 'Something went wrong, please try again',
          duration: 100000,
        },
      ]);
    }
    // redirect(303, '/');
    goto('/');
  });
</script>

<h1 class="m-auto mb-4 text-center text-xl font-semibold">Complete</h1>
<br />
<p class="texct-center m-auto text-sm font-medium text-gray-900">
  We are busy creating your profile
</p>
<br />
<Loader />
<br />
