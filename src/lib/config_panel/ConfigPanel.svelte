<script lang="ts">
  import {
    MAX_BPM,
    MIN_BPM,
    MAX_VOLUME,
    MIN_VOLUME,
    INITIAL_BPM,
  } from "../constants.js";
  import { bpm, volume } from "../stores.js";
  import Slider from "./Slider.svelte";
</script>

<div class="config-panel w-full gap-4">
  <Slider
    gridArea="bpm"
    values={bpm}
    maxValue={MAX_BPM}
    minValue={MIN_BPM}
    isVertical={false}
    class="w-80"
    sliderProps={{
      pips: true,
      pipstep: (INITIAL_BPM - MIN_BPM) / 1,
      all: "label",
    }}
  />
  <Slider
    gridArea="volume"
    values={volume}
    maxValue={MAX_VOLUME}
    minValue={MIN_VOLUME}
    isVertical={true}
    suffix="dB"
    sliderProps={{
      pips: true,
      pipstep: 20,
      all: "label",
    }}
  />
</div>

<style lang="postcss">
  .config-panel {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      "bpm volume"
      "channel volume";
    @apply place-content-center;
  }
</style>
