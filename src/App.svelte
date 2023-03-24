<script lang="ts">
  import * as Tone from "tone";
  import { onMount } from "svelte";
  import Oscillator from "./lib/Oscillator.svelte";
  import VolumeController from "./lib/VolumeController.svelte";
  import { mode } from "./lib/stores";
  import FrequencyController from "./lib/FrequencyController.svelte";
  import PlayController from "./lib/PlayController.svelte";

  // * Setup Tone.js
  onMount(() => {
    Tone.start();
  });
</script>

<main class="grid h-full grid-cols-center px-3">
  <div class="col-start-2 my-auto flex flex-col items-center gap-5">
    <h1 class="text-center font-serif text-3xl font-bold">
      Tinnitus Reducer ACRN
    </h1>
    <p class="text-center font-serif text-xl">
      This is a simple app to help you reduce your tinnitus using ACRN protocol.
    </p>

    <div class="btn-group">
      <button
        class={`btn ${$mode === "TONE" ? "btn-active" : ""}`}
        on:click={() => ($mode = "TONE")}>Tone</button
      >
      <button
        class={`btn ${$mode === "ACRN" ? "btn-active" : ""}`}
        on:click={() => ($mode = "ACRN")}>ACRN</button
      >
    </div>

    <Oscillator />
    <FrequencyController />
    <PlayController />
    {#if $mode === "TONE"}
      <div />
    {:else if $mode === "ACRN"}
      <div />
    {/if}
    <VolumeController />
  </div>
</main>

<style>
</style>
