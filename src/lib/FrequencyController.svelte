<script lang="ts">
  import RangeSlider from "svelte-range-slider-pips";
  import { frequency } from "./stores";

  // * States
  let sliderWidth;
</script>

<div class="my-3 w-full max-w-xl font-mono" bind:clientWidth={sliderWidth}>
  <div class="pt-2 text-center">
    <span class="font-serif text-base">frequency:</span>
    <input
      type="number"
      class="input input-xs w-20 font-mono text-base"
      bind:value={$frequency[0]}
      min={0}
      max={15000}
    />
  </div>
  <RangeSlider
    min={0}
    max={15000}
    bind:values={$frequency}
    float
    pips
    pipstep={sliderWidth >= 512 ? 3000 : 5000}
    first="label"
    last="label"
    rest="label"
  />
</div>

<style>
</style>
