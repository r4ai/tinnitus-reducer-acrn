<script context="module" lang="ts">
  export function generateFrequencies(currentFrequency: number) {
    const res = [
      Math.floor(currentFrequency * 0.773 - 44.5),
      Math.floor(currentFrequency * 0.903 - 21.5),
      Math.floor(currentFrequency * 1.09 + 52),
      Math.floor(currentFrequency * 1.395 + 26.5),
    ];
    return res;
  }
</script>

<script lang="ts">
  import * as Tone from "tone";
  import { isPlaying } from "./stores";

  const synth = new Tone.Synth().toDestination();

  function start() {
    synth.triggerAttackRelease("E4", "4n");
    console.log("transport started");
  }
</script>

<div data-testid="sequence" />
<button class="btn" on:click={start}>start</button>
<button class="btn" on:click={() => Tone.Transport.stop()}>stop</button>

<style></style>
