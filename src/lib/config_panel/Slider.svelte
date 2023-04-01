<script lang="ts">
  import RangeSlider, { type RangeSliderProps } from "svelte-range-slider-pips";
  import Input from "./Input.svelte";
  import type { Writable } from "svelte/store";
  import type { GridArea } from "./ConfigPanel.svelte";

  export let maxValue: number;
  export let minValue: number;
  export let step = 1;
  export let values: Writable<number[]>;
  export let gridArea: GridArea;
  export let isVertical: boolean;
  export let suffix = "";
  export let sliderProps: RangeSliderProps = {};
  let className = "";

  export { className as class };
</script>

<div
  class={`card-compact card border shadow-xl dark:border-white/10 ${className} }`}
  style={`grid-area: ${gridArea};`}
>
  <div class={`card-body ${isVertical ? "items-center" : ""} `}>
    <div class="card-title">
      <div>
        <label class="font-mono text-base" for={gridArea}>
          {gridArea
            .replaceAll(/[A-Z]/g, s => " " + s.charAt(0))
            .toUpperCase()}{isVertical ? "" : ":"}
        </label>
      </div>

      {#if !isVertical}
        <Input
          {...{
            maxValue,
            minValue,
            values,
            gridArea,
            suffix,
            isVertical,
            step,
          }}
        />
      {/if}
    </div>
    <RangeSlider
      bind:values={$values}
      max={maxValue}
      min={minValue}
      {step}
      id={`${gridArea}-slider`}
      vertical={isVertical}
      float
      suffix={` ${suffix}`}
      {...sliderProps}
    />
    {#if isVertical}
      <Input
        {...{ maxValue, minValue, values, gridArea, suffix, isVertical, step }}
      />
    {/if}
  </div>
</div>

<style lang="postcss">
</style>
