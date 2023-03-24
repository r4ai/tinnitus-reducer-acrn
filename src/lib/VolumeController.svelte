<script lang="ts">
  import * as Tone from "tone";
  import RangeSlider from "svelte-range-slider-pips";
  // * States (for Tone.js)
  let volume = [15]; // 0 ~ 100

  // * Effects
  $: setDestinationVolume(volume[0]);

  /**
   *  Set the volume of the main output (your speakers) to the given value.
   *  - If the value is 0, the volume will be muted.
   *  - If the value is 100, the volume will be set to the maximum.
   *  @param volume - The volume to set. 0 ~ 100
   */
  function setDestinationVolume(volume) {
    const volume_db = Tone.gainToDb(volume / 100);
    Tone.getDestination().volume.rampTo(volume_db - 0.05, 0.05);
  }
</script>

<div class="my-3 w-full max-w-xs font-mono">
  <div class="pt-2 text-center">
    <span class="font-serif text-base">volume</span>
  </div>
  <RangeSlider min={0} max={100} bind:values={volume} float />
</div>

<style></style>
