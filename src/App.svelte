<script lang="ts">
  import * as Tone from "tone";
  import { onDestroy, onMount } from "svelte";
  import Oscillator from "./lib/Oscillator.svelte";
  import VolumeController from "./lib/VolumeController.svelte";
  import {
    bpm,
    frequency,
    mode,
    subscribeStores,
    volume,
    theme,
    pan,
    clientWidth,
  } from "./lib/stores";
  import FrequencyController from "./lib/FrequencyController.svelte";
  import PlayController from "./lib/PlayController.svelte";
  import ModeController from "./lib/ModeController.svelte";
  import Sequence from "./lib/Sequence.svelte";
  import { SyncLoader } from "svelte-loading-spinners";
  import {
    loadSettings,
    loadSettingsFromLocalStorage,
    subscribeLazySaveSettings,
  } from "./lib/settings";
  import type { Unsubscriber } from "svelte/store";
  import Navbar from "./lib/nav/Navbar.svelte";
  import ConfigPanel from "./lib/config_panel/ConfigPanel.svelte";
  import { isTauri } from "./lib/utils";
  import type { SettingsScheme } from "./lib/constants";

  let unsubscribeStores: Unsubscriber[] | undefined = undefined;
  let unsubscribeLazySave: Unsubscriber | undefined = undefined;

  async function setupSettings() {
    if (isTauri()) {
      // * (Tauri App)
      // * Load and initialize settings
      const settings = await loadSettings();
      updateStates(settings);

      // * Subscribe lazy save settings
      unsubscribeStores = subscribeStores();
      unsubscribeLazySave = subscribeLazySaveSettings();
      console.info("Settings subscribed");

      return "settings has loaded!";
    } else {
      // * (Browser)
      // * Load settings from local storage and initialize
      const settings = loadSettingsFromLocalStorage();
      updateStates(settings);
      console.info("Settings initialized from local storage.");

      // * Subscribe lazy save settings
      unsubscribeStores = subscribeStores();
      unsubscribeLazySave = subscribeLazySaveSettings(1, "localStorage");
      console.info("Settings subscribed");

      console.warn("Running on browser. this is experimental feature.");
      return "Running on browser.";
    }
  }

  function updateStates(settings: SettingsScheme) {
    $volume = [settings.volume];
    $frequency = [settings.frequency];
    $bpm = [settings.bpm];
    $pan = [settings.pan];
    $theme = settings.theme;
  }

  // * Setup Tone.js
  onMount(() => {
    Tone.start();
    console.info("Tone.js started");
  });

  // * Cleanup settings
  onDestroy(() => {
    unsubscribeStores?.forEach(unsubscribe => unsubscribe());
    unsubscribeLazySave?.();
  });
</script>

<svelte:window bind:innerWidth={$clientWidth} />

<div data-theme={$theme} class="h-full overflow-hidden">
  <Navbar />
  <main class="grid h-full grid-cols-center overflow-auto px-3 py-5" id="main">
    <div class="col-start-2 my-auto flex flex-col items-center gap-5">
      <h1 class="text-center font-serif text-3xl font-bold">
        Tinnitus Reducer ACRN
      </h1>
      <p class="text-center font-serif text-lg">
        This is a simple app to help you reduce your tinnitus using ACRN
        protocol.
      </p>

      {#await setupSettings()}
        <article class="prose mt-5">
          <p class="prose-h2 text-center font-serif text-xl font-bold">
            Loading settings... <br />
            Please wait a moment.
          </p>
        </article>
        <div class="white">
          <SyncLoader size="60" unit="px" duration="1.2s" color="#99999999" />
        </div>
      {:then value}
        <ModeController />
        <FrequencyController />
        <VolumeController />
        <PlayController />
        {#if $mode === "TONE"}
          <Oscillator />
        {:else if $mode === "ACRN"}
          <Sequence />
        {/if}
        <ConfigPanel class="mb-10" />
      {/await}
    </div>
  </main>
</div>

<style lang="postcss">
  #main {
    padding-top: 3.5rem;
  }
</style>
