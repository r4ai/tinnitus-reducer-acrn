<script context="module" lang="ts">
  /**
   *  Set the volume [dB] of the main output (your speakers) to the given value.
   *  - If the value is -80, the volume will be set to the minimum.
   *  - If the value is 0, the volume will be set to the maximum. return `volume in decibel`.
   *  - If value < -80 || 0 < value, the volume will not be changed. return `null`.
   *  - If value is NaN, the volume will be set to `-Infinity`. return `-Infinity`.
   *  @param volume - The volume to set. 0 ~ 100
   *  @returns `volume in decibel` if the volume was set, `null` if not set because of invalid volume
   */
  export function setDestinationVolume(
    destination: Destination,
    volume: number
  ): number | null {
    if (isNaN(volume)) {
      console.error(
        `Invalid volume: ${volume}. Volume must be a number. Temporary set the volume to ${-Infinity}.`
      );
      destination.volume?.rampTo(-Infinity, 0.05);
      return -Infinity;
    }
    if (-80 <= volume && volume <= 0) {
      if (volume === -80) volume = -Infinity;
      destination.volume?.rampTo(volume, 0.05);
      console.log("volume was set to " + volume);
      return volume;
    } else {
      console.error(
        `Invalid volume: ${volume}. Volume must be between 0 and 100.`
      );
      return null;
    }
  }
</script>

<script lang="ts">
  import * as Tone from "tone";
  import { volume } from "./stores";
  import type { Destination } from "tone/build/esm/core/context/Destination";

  // * Effects
  $: setDestinationVolume(Tone.getDestination(), $volume[0]);
</script>

<style></style>
