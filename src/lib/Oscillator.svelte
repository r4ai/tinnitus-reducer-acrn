<script lang="ts">
  import * as Tone from "tone";
  import RangeSlider from "svelte-range-slider-pips";
  import { mode, isPlaying, frequency } from "./stores";

  // * Create a Oscillator and connect it to the main output (your speakers)
  const osc = new Tone.Oscillator(440, "sine").toDestination();

  // * Apply the frequency to the oscillator
  $: osc.frequency.value = $frequency[0];

  // * When the mode is changed, stop the tone
  $: {
    if ($mode === "TONE" || $mode === "ACRN") {
      stopOsc();
    }
  }

  // * When isPlaying is changed, play or stop the tone
  $: {
    if ($isPlaying) {
      playOsc();
    } else {
      stopOsc();
    }
  }

  function playOsc() {
    if ($mode === "TONE") {
      osc.start();
      $isPlaying = true;
    }
  }

  function stopOsc() {
    if ($mode === "TONE") {
      osc.stop();
      $isPlaying = false;
    }
  }
</script>

<style>
</style>
