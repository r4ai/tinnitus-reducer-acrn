<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { GridArea } from "./ConfigPanel.svelte";

  export let maxValue: number;
  export let minValue: number;
  export let values: Writable<number[]>;
  export let gridArea: GridArea;
  export let suffix = "";
  export let isVertical: boolean;
  export let step = 1;
</script>

<div
  id="number-input"
  style={`--data-suffix: "${suffix}";`}
  class="flex w-24 justify-center"
>
  <input
    type="number"
    id={gridArea}
    class={`input input-xs left-0 font-mono text-base ${
      isVertical ? "w-24" : "w-20"
    } `}
    bind:value={$values[0]}
    min={minValue}
    max={maxValue}
    {step}
  />
</div>

<style lang="postcss">
  #number-input {
    @apply relative inline-block;
  }

  #number-input::after {
    @apply absolute bottom-0 left-11 font-mono text-sm;
    content: var(--data-suffix);
  }
</style>
