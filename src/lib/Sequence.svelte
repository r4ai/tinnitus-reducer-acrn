<script context="module" lang="ts">
  /**
   * Generate frequencies based on the current frequency
   * - e.g. 1000 Hz -> [728, 881, 1142, 1421]
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

  export function shuffledFrequencies(frequencies: number[]): number[] {
    const res = [...frequencies];
    for (let i = res.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
  }

  export type AcrnSequence = (number | number[])[];

  export function generateAcrnSheet(
    loopRepeat = 3,
    restLength = 2
  ): AcrnSequence {
    // just needs to be the correct number of beats. Frequency content is ignored.
    let freqSeq: AcrnSequence = [];

    // can all be empty since tones are generated during loop play
    for (let i = 0; i < loopRepeat; i++) {
      freqSeq.push(
        ...[
          SHEET_RANDOM_FREQUENCY,
          SHEET_RANDOM_FREQUENCY,
          SHEET_RANDOM_FREQUENCY,
          SHEET_RANDOM_FREQUENCY,
        ]
      );
    }
    for (let i = 0; i < restLength; i++) {
      freqSeq.push(SHEET_REST);
    }
    console.log(`ACRN sheet: [${freqSeq}]`);
    return freqSeq;
  }

  export type PolySynthOption = {
    oscillator: {
      type: "sine" | "square" | "triangle" | "sawtooth" | "fatsine";
    };
    envelope: {
      attack: number;
      decay: number;
      sustain: number;
      release: number;
    };
  };

  export const defaultPolySynthOption: PolySynthOption = {
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.1,
      decay: 0.0,
      sustain: 0.07,
      release: 0.08,
    },
  };

  export function createSynth(
    panner: Panner,
    option = defaultPolySynthOption
  ): PolySynth<Synth<SynthOptions>> {
    const synth = new Tone.PolySynth(Tone.Synth, option).connect(panner);
    return synth;
  }

  /**
   * Create a sequence of frequencies and start it.
   * TODO: Refactor the code inside the Tone.Sequence
   *       Maybe it's better to recreate the sequence every time to regenerate the frequencies.
   *       I think this complex code inside the sequence may generate some bugs in firefox.
   *       I'm not sure because of this, but the bpm of the sequence is likely to be strange.
   */
  export function createSequence(
    synth: PolySynth | Synth,
    frequencies: number[],
    { loopRepeat, restLength, duration } = DEFAULT_SEQUENCE_OPTION
  ): Sequence {
    let currentFrequencies = shuffledFrequencies(frequencies);

    const sheet = generateAcrnSheet(loopRepeat, restLength);
    const seq = new Tone.Sequence((time, note) => {
      if (note === SHEET_RANDOM_FREQUENCY) {
        note = currentFrequencies.pop() ?? frequencies[0];
      }
      if (currentFrequencies.length === 0) {
        currentFrequencies = shuffledFrequencies(frequencies);
      }
      synth.triggerAttackRelease(note, duration, time);
    }, sheet);
    seq.loop = true;
    seq.start(0);
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
  export function updatedSequence(
    oldSeq: Sequence | undefined,
    synth: PolySynth | Synth | undefined,
    frequencies: number[],
    option = DEFAULT_SEQUENCE_OPTION
  ): Sequence | undefined {
    if (synth) {
      oldSeq?.dispose();
      const newSeq = createSequence(synth, frequencies, option);
      console.log(`Sequence updated`);
      return newSeq;
    } else {
      return oldSeq;
    }
  }
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import { derived } from "svelte/store";
  import type { Panner, PolySynth, Sequence, Synth, SynthOptions } from "tone";

  import * as Tone from "tone";
  import {
    DEFAULT_SEQUENCE_OPTION,
    SHEET_RANDOM_FREQUENCY,
    SHEET_REST,
  } from "./constants";
  import { createPanner } from "./Oscillator.svelte";
  import { isPlaying, mode, frequency, bpm, pan } from "./stores";

  let synth: PolySynth | undefined = undefined;
  let panner: Panner | undefined = undefined;
  let seq: Sequence | undefined = undefined;

  const frequencies = derived(frequency, $frequency =>
    generateFrequencies($frequency[0])
  );

  onMount(() => {
    panner = createPanner();
    synth = createSynth(panner);
    console.info("Mode changed to ACRN");
    $isPlaying = false;
  });

  onDestroy(() => {
    $isPlaying = false;
    seq?.dispose();
    synth?.releaseAll();
  });

  // * Generate sequence of frequencies
  $: {
    if ($isPlaying) {
      seq = updatedSequence(seq, synth, $frequencies, {
        loopRepeat: 3,
        restLength: 2 * 4,
        duration: "4n",
      });
    }
  }

  // * Update BPM
  $: {
    Tone.Transport.bpm.rampTo($bpm[0], 0.05);
    console.log("BPM changed to", $bpm[0]);
  }

  // * Update pan
  $: {
    if (synth && panner) {
      panner.pan.rampTo($pan[0], 0.05);
      console.log("Pan changed to", $pan[0]);
    }
  }

  // * Start/Stop the sequence
  $: {
    if ($mode === "ACRN") {
      if ($isPlaying) {
        console.log("Start playing ACRN");
        Tone.Transport.start();
      } else {
        console.log("Stop playing ACRN");
        Tone.Transport.stop();
      }
    }
  }
</script>

<div data-testid="sequence">
  <p class="text-center font-serif">frequencies:</p>
  <p class="text-center font-mono">{$frequencies.join(", ")}</p>
</div>

<style></style>
