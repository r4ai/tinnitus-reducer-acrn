<script lang="ts">
  import * as Tone from "tone";
  import RangeSlider from "svelte-range-slider-pips";

  // * Create a Oscillator and connect it to the main output (your speakers)
  const osc = new Tone.Oscillator(440, "sine").toDestination();

  // * States (for Tone.js)
  let isPlaying = false;
  let frequency = [8000];

  // * States (for UI)
  let sliderWidth;

  // * Effects
  $: osc.frequency.value = frequency[0];

  // * Debug
  $: console.log("Frequency: ", frequency[0]);
  $: console.log("sliderWidth: ", sliderWidth);

  function playTone() {
    osc.start();
  }

  function stopTone() {
    osc.stop();
  }

  function togglePlay() {
    if (osc.state === "started") {
      stopTone();
      isPlaying = false;
    } else {
      playTone();
      isPlaying = true;
    }
  }
</script>

<div class="my-3 w-full max-w-xl font-mono" bind:clientWidth={sliderWidth}>
  <div class="pt-2 text-center">
    <span class="font-serif text-base">frequency:</span>
    <input
      type="number"
      class="input input-xs w-20 font-mono text-base"
      bind:value={frequency[0]}
      min={0}
      max={15000}
    />
  </div>
  <RangeSlider
    min={0}
    max={15000}
    bind:values={frequency}
    float
    pips
    pipstep={sliderWidth >= 512 ? 3000 : 5000}
    first="label"
    last="label"
    rest="label"
  />
</div>
<div class="text-center">
  <button class="btn-primary btn" on:click={togglePlay}>
    {isPlaying ? "Stop" : "Play"}
  </button>
</div>

<style>
</style>
