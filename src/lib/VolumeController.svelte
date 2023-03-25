<script context="module" lang="ts">
  /**
   *  Set the volume of the main output (your speakers) to the given value.
   *  - If the value is 0, the volume will be muted. return `-Infinity`.
   *  - If the value is 100, the volume will be set to the maximum. return `volume in decibel`.
   *  - If value < 0 || 100 < value, the volume will not be changed. return `null`.
   *  @param volume - The volume to set. 0 ~ 100
   *  @returns `volume in decibel` if the volume was set, `null` if not set because of invalid volume
   */
  export function setDestinationVolume(
    destination: Destination,
    volume: number
  ): number | null {
    if (0 <= volume && volume <= 100) {
      const volume_db = gainToDb(volume);
      destination.volume?.rampTo(volume_db, 0.05);
      console.log("volume was set to " + volume);
      return volume_db;
    } else {
      console.error("Invalid volume. Volume must be between 0 and 100.");
      return null;
    }
  }

  /**
   * Convert gain to decibel
   * @param gain Gain - 0 ~ 100
   * @returns Decibel
   */
  export function gainToDb(gain: number): number {
    if (gain === 0) {
      return -Infinity;
    } else {
      return Tone.gainToDb(gain / 100) - 0.05;
    }
  }
</script>

<script lang="ts">
  import * as Tone from "tone";
  import RangeSlider from "svelte-range-slider-pips";
  import { volume } from "./stores";
  import type { Destination } from "tone/build/esm/core/context/Destination";

  // * Effects
  $: setDestinationVolume(Tone.getDestination(), $volume[0]);
</script>

<div class="my-3 w-full max-w-xs font-mono">
  <div class="pt-2 text-center">
    <span class="font-serif text-base">volume</span>
  </div>
  <RangeSlider min={0} max={100} bind:values={$volume} float />
</div>

<style></style>
