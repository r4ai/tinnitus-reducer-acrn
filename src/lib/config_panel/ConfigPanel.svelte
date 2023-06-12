<script lang="ts" context="module">
  export type GridArea =
    | "bpm"
    | "volume"
    | "channel"
    | "duration"
    | "loopRepeat"
    | "restLength";
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import { writable, type Writable } from "svelte/store";
  import { match } from "ts-pattern";
  import {
    MAX_BPM,
    MIN_BPM,
    MAX_VOLUME,
    MIN_VOLUME,
    INITIAL_BPM,
    MAX_PAN,
    MIN_PAN,
    MAX_DURATION,
    MIN_DURATION,
    MAX_LOOP_REPEAT,
    MIN_LOOP_REPEAT,
    MAX_REST_LENGTH,
    MIN_REST_LENGTH,
    DEFAULT_DURATION,
  } from "../constants";
  import {
    bpm,
    clientWidth,
    duration,
    loopRepeat,
    pan,
    restLength,
    volume,
    type Duration,
  } from "../stores";
  import Slider from "./Slider.svelte";

  let className = "";
  export { className as class };

  const subdivisions: Duration[] = [
    "256n",
    "128n",
    "64n",
    "32n",
    "16n",
    "8n",
    "4n",
    "2n",
    "1n",
  ];

  const durationIndex = match(subdivisions.findIndex(v => v === $duration[0]))
    .with(-1, () => subdivisions.indexOf(DEFAULT_DURATION)) // When error, use DEFAULT_DURATION
    .otherwise(index => index);
  let durationInput = writable([durationIndex]);

  $: $duration = [subdivisions[$durationInput[0]]];
</script>

<section class={`mt-4 flex flex-col place-content-center gap-4 ${className} `}>
  <div class="prose mx-auto">
    <h2 class="text-center font-serif">Configuration</h2>
  </div>
  <div class={`flex ${$clientWidth > 540 * 2 ? "flex-row" : "flex-col"} gap-4`}>
    <div class="config-panel w-full gap-4">
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
        gridArea="bpm"
        values={bpm}
        maxValue={MAX_BPM}
        minValue={MIN_BPM}
        isVertical={false}
        class="w-80"
        sliderProps={{
          pips: true,
          pipstep: 60,
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
              .otherwise(() => value.toString()),
        }}
      />
    </div>
    <div class="advanced-config-panel w-full place-content-center gap-4">
      <Slider
        gridArea="duration"
        values={durationInput}
        maxValue={subdivisions.findIndex(e => e === MAX_DURATION)}
        minValue={subdivisions.findIndex(e => e === MIN_DURATION)}
        step={1}
        isVertical={$clientWidth > 540}
        sliderProps={{
          pips: true,
          pipstep: 1,
          all: "label",
          formatter: value => subdivisions[value],
        }}
      />
      <Slider
        gridArea="loopRepeat"
        values={loopRepeat}
        maxValue={MAX_LOOP_REPEAT}
        minValue={MIN_LOOP_REPEAT}
        isVertical={false}
        step={1}
        class="w-80"
        sliderProps={{
          pips: true,
          pipstep: 1,
          all: "label",
        }}
      />
      <Slider
        gridArea="restLength"
        values={restLength}
        maxValue={MAX_REST_LENGTH}
        minValue={MIN_REST_LENGTH}
        isVertical={false}
        step={4}
        class="w-80"
        sliderProps={{
          pips: true,
          pipstep: 2,
          all: "label",
        }}
      />
    </div>
  </div>
</section>

<style lang="postcss">
  .config-panel {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      "volume bpm"
      "volume channel";
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

  .advanced-config-panel {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      "duration loopRepeat"
      "duration restLength";
  }

  @media screen and (max-width: 540px) {
    .advanced-config-panel {
      grid-template-columns: auto;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        "duration"
        "loopRepeat"
        "restLength";
    }
  }
</style>
