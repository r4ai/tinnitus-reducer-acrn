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
  const seq = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, 0.1, time);
      // subdivisions are given as subarrays
    },
    ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]]
  ).start(0);

  function start() {
    Tone.Transport.start();
    console.log("transport started");
  }

  function stop() {
    Tone.Transport.stop();
    console.log("transport stopped");
  }
</script>

<div data-testid="sequence" />
<button class="btn" on:click={start}>start</button>
<button class="btn" on:click={stop}>stop</button>

<style></style>
