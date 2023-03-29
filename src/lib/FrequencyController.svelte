<script lang="ts">
  import RangeSlider from "svelte-range-slider-pips";
  import { MAX_FREQUENCY, MIN_FREQUENCY } from "./constants.js";
  import { frequency } from "./stores.js";

  // * States
  let sliderWidth;
</script>

<div class="z-0 my-3 w-full max-w-xl font-mono" bind:clientWidth={sliderWidth}>
  <div class="pt-2 text-center">
    <span class="font-serif text-base">frequency:</span>
    <input
      type="number"
      class="input input-xs w-20 font-mono text-base"
      bind:value={$frequency[0]}
      min={MIN_FREQUENCY}
      max={MAX_FREQUENCY}
    />
  </div>
  <div id="slider">
    <RangeSlider
      min={MIN_FREQUENCY}
      max={MAX_FREQUENCY}
      bind:values={$frequency}
      float
      pips
      pipstep={sliderWidth >= 512 ? 3000 : 5000}
      first="label"
      last="label"
      rest="label"
    />
  </div>
</div>

<style>
</style>
