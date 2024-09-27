<script lang="ts">
  import "../../app.scss";
  import { onMount } from "svelte";
  import SideMenu from "$lib/components/SideMenu.svelte";
  import Header from "$lib/components/Header.svelte";
  import MobileMenu from "$lib/components/MobileMenu.svelte";
  import { invalidate } from "$app/navigation";
  import { INVALIDATION_IDENTIFIER } from "$lib/services/ColocioService";

  export let data;

  let { _supaBrowser } = data; //browser supabase client
  $: ({ _supaBrowser } = data);

  async function doLogout() {
    console.log("<Main:Layout> Logging user out...");
    await _supaBrowser.auth.signOut();
    await invalidate(INVALIDATION_IDENTIFIER);
  }

  onMount(() => {
    console.log("!! Main layout loaded and auth listener attached !!");
    //TODO: adjust auth state listener
    const {
      data: { subscription },
    } = _supaBrowser.auth.onAuthStateChange((event, session) => {
      if (session) {
        if (session.expires_at !== session.expires_at) {
          invalidate(INVALIDATION_IDENTIFIER);
        }
      }

      if (event === "TOKEN_REFRESHED") {
        //TODO: Handle token refreshed changes
        console.log("SUPA:AUTH >> User token refreshed.");
      } else if (event === "SIGNED_OUT") {
        invalidate(INVALIDATION_IDENTIFIER);
      }

      console.log("AUTH EVENT: ", event);
      // AUTH EVENT:  INITIAL_SESSION
      // AUTH EVENT:  SIGNED_IN
      // AUTH EVENT:  SIGNED_OUT
    });

    return () => subscription.unsubscribe();
  });
</script>

<div class="h-full font-sans">
  <SideMenu />

  <div class="xl:pl-[280px] lg:pl-[240px] h-full">
    <Header on:logout_requested={() => doLogout()} />
    <slot />
    <MobileMenu />
  </div>
</div>
