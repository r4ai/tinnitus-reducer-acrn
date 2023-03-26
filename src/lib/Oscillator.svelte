<script context="module" lang="ts">
  /**
   * Play Oscillator
   * @param osc Oscillator
   * @param mode TONE or ACRN
   * @returns true if the oscillator was started, null if not started
   */
  export function playOsc(
    osc: Tone.Oscillator | undefined,
    mode: Mode
  ): boolean | null {
    if (osc && mode === "TONE") {
      osc.start();
      console.log("oscillator started");
      return true;
    } else {
      return null;
    }
  }

  /**
   * Stop Oscillator
   * @param osc Oscillator
   * @param mode TONE or ACRN
   * @returns false if the oscillator was stopped, null if not stopped
   */
  export function stopOsc(
    osc: Tone.Oscillator | undefined,
    mode: Mode
  ): boolean | null {
    if (osc && mode === "TONE") {
      osc.stop();
      console.log("oscillator stopped");
      return false;
    } else {
      return null;
    }
  }

  /**
   * Set the frequency of the oscillator
   * @param osc Oscillator
   * @param frequency Frequency
   * @returns true if the frequency was set, false if not set because of invalid frequency
   */
  export function setFrequency(
    osc: Tone.Oscillator | undefined,
    frequency: number
  ): boolean {
    if (osc && 0 <= frequency && frequency <= 15000) {
      if (frequency === 0) {
        frequency = 1;
      }
      osc.frequency.rampTo(frequency, 0.05);
      console.log("oscillator frequency was set to " + frequency);
      return true;
    } else {
      console.warn("Invalid frequency. Frequency must be between 0 and 15000.");
      return false;
    }
  }

  /**
   * Create a Oscillator and connect it to the main output (your speakers)
   * @param osc Oscillator
   * @param type Type
   * @returns Oscillator
   */
  export function createOscillator(): Tone.Oscillator {
    return new Tone.Oscillator(INITIAL_FREQUENCY, "sine").toDestination();
  }
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { INITIAL_FREQUENCY } from "./constants";
  import { mode, isPlaying, frequency, type Mode } from "./stores";
  import * as Tone from "tone";

  // * Create a Oscillator and connect it to the main output (your speakers)
  export let osc: Tone.Oscillator | undefined = undefined;

  onMount(() => {
    osc = createOscillator();
  });

  onDestroy(() => {
    $isPlaying = stopOsc(osc, $mode) ?? false;
    osc?.dispose();
  });

  // * Apply the frequency to the oscillator
  $: {
    setFrequency(osc, $frequency[0]);
  }

  // * When the mode is changed, stop the tone
  $: {
    if ($mode === "ACRN") {
      $isPlaying = stopOsc(osc, "TONE") ?? $isPlaying;
    }
  }

  // * When isPlaying is changed, play or stop the tone
  $: {
    if ($isPlaying) {
      playOsc(osc, $mode);
    } else {
      stopOsc(osc, $mode);
    }
  }
</script>

<div data-testid="oscillator" class="prose max-w-md font-serif">
  <ol class="prose-ol">
    <li>Start the tone by pressing the "PLAY" button.</li>
    <li>
      Adjust the frequency slider until it matches your tinnitus tone. You can
      also type in the frequency if you know it already.
    </li>
    <li>Switch from "Tone" to "ACRN" mode</li>
  </ol>
</div>

<style>
</style>
