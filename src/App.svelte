<script lang="ts">
  import * as Tone from "tone";
  import { onDestroy, onMount } from "svelte";
  import Oscillator from "./lib/Oscillator.svelte";
  import VolumeController from "./lib/VolumeController.svelte";
  import { bpm, frequency, mode, subscribeStores, volume } from "./lib/stores";
  import FrequencyController from "./lib/FrequencyController.svelte";
  import PlayController from "./lib/PlayController.svelte";
  import ModeController from "./lib/ModeController.svelte";
  import Sequence from "./lib/Sequence.svelte";
  import { SyncLoader } from "svelte-loading-spinners";
  import { loadSettings, subscribeLazySaveSettings } from "./lib/settings";
  import type { Unsubscriber } from "svelte/store";

  let unsubscribeStores: Unsubscriber[] | undefined = undefined;
  let unsubscribeLazySave: Unsubscriber | undefined = undefined;

  async function setupSettings() {
    // * Load and initialize settings
    const settings = await loadSettings();
    $volume = [settings.volume];
    $frequency = [settings.frequency];
    $bpm = [settings.bpm];

    // * Subscribe lazy save settings
    unsubscribeStores = subscribeStores();
    unsubscribeLazySave = subscribeLazySaveSettings();
    console.info("Settings subscribed");
    return "settings has loaded!";
  }

  // * Setup Tone.js & settings
  onMount(() => {
    // * Start Tone.js
    Tone.start();
    console.info("Tone.js started");
  });

  // * Cleanup settings
  onDestroy(() => {
    unsubscribeStores?.forEach(unsubscribe => unsubscribe());
    unsubscribeLazySave?.();
  });
</script>

<main class="grid h-full grid-cols-center px-3 py-5">
  <div class="col-start-2 my-auto flex flex-col items-center gap-5">
    <h1 class="text-center font-serif text-3xl font-bold">
      Tinnitus Reducer ACRN
    </h1>
    <p class="text-center font-serif text-xl">
      This is a simple app to help you reduce your tinnitus using ACRN protocol.
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
      <PlayController />
      {#if $mode === "TONE"}
        <Oscillator />
      {:else if $mode === "ACRN"}
        <Sequence />
      {/if}
      <VolumeController />
    {/await}
  </div>
</main>

<style>
</style>
