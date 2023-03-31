<script lang="ts">
  import { match } from "ts-pattern";
  import {
    MAX_BPM,
    MIN_BPM,
    MAX_VOLUME,
    MIN_VOLUME,
    INITIAL_BPM,
    MAX_PAN,
    MIN_PAN,
  } from "../constants";
  import { bpm, clientWidth, pan, volume } from "../stores";
  import Slider from "./Slider.svelte";

  let className = "";
  export { className as class };
</script>

<div class={`config-panel w-full gap-4 ${className} `}>
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
    isVertical={$clientWidth > 540}
    suffix="dB"
    sliderProps={{
      pips: true,
      pipstep: 20,
      all: "label",
    }}
  />
  <Slider
    gridArea="channel"
    values={pan}
    maxValue={MAX_PAN}
    minValue={MIN_PAN}
    isVertical={false}
    step={0.01}
    sliderProps={{
      pips: true,
      pipstep: 100,
      all: "label",
      formatter: value =>
        match(value)
          .with(0, () => "Center")
          .with(-1, () => "Left")
          .with(1, () => "Right")
          .otherwise(() => value),
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

  @media screen and (max-width: 540px) {
    .config-panel {
      grid-template-columns: auto;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        "volume"
        "bpm"
        "channel";
    }
  }
</style>
