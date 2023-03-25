<script context="module" lang="ts">
  /**
   * Generate frequencies based on the current frequency
   * - e.g. 1000 Hz -> [773, 903, 1090, 1395]
   * @param currentFrequency
   * @returns Frequencies based on the current frequency
   */
  export function generateFrequencies(currentFrequency: number): number[] {
    const res = [
      Math.floor(currentFrequency * 0.773 - 44.5),
      Math.floor(currentFrequency * 0.903 - 21.5),
      Math.floor(currentFrequency * 1.09 + 52),
      Math.floor(currentFrequency * 1.395 + 26.5),
    ];
    return res;
  }

  export function shuffleFrequencies(frequencies: number[]): number[] {
    const res = [...frequencies];
    for (let i = res.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
  }

  export function createSynth(): PolySynth {
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 0.5,
        release: 0.5,
      },
    }).toDestination();
    return synth;
  }

  /**
   * Create a sequence of frequencies
   */
  export function createSequence(
    synth: PolySynth | Synth,
    frequencies: number[]
  ): Sequence {
    const seq = new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, 0.1, time);
      // subdivisions are given as subarrays
    }, frequencies).start(0);
    return seq;
  }

  /**
   * Update the sequence
   * - If the synth is defined:
   *   - If the old sequence is defined, dispose of it.
   *   - Create a new sequence and return it.
   * - If the synth is undefined, return the old sequence (maybe undefined).
   * @param oldSeq Old sequence
   * @param synth Synth to be used to create the new sequence
   * @param frequencies Frequencies to be used to create the new sequence
   * @returns If successful, returns the `new sequence`, otherwise returns the `old sequence`
   */
  export function updateSequence(
    oldSeq: Sequence | undefined,
    synth: PolySynth | Synth | undefined,
    frequencies: number[]
  ): Sequence | undefined {
    if (synth) {
      oldSeq?.dispose();
      const newSeq = createSequence(synth, frequencies);
      return newSeq;
    } else {
      return oldSeq;
    }
  }
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import { derived } from "svelte/store";
  import type { PolySynth, Sequence, Synth } from "tone";

  import * as Tone from "tone";
  import { isPlaying, mode, frequency } from "./stores";

  let synth: PolySynth | undefined = undefined;
  let seq: Sequence | undefined = undefined;

  const frequencies = derived(frequency, $frequency =>
    generateFrequencies($frequency[0])
  );

  onMount(() => {
    synth = createSynth();
  });

  onDestroy(() => {
    synth?.dispose();
    seq?.dispose();
  });

  // * Generate sequence of frequencies
  $: seq = updateSequence(seq, synth, $frequencies);

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
