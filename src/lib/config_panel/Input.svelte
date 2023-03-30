<script lang="ts">
  import type { Writable } from "svelte/store";

  export let maxValue: number;
  export let minValue: number;
  export let values: Writable<number[]>;
  export let gridArea: "bpm" | "volume" | "channel";
  export let suffix = "";
  export let isVertical: boolean;
</script>

<div
  id="number-input"
  style={`--data-suffix: "${suffix}";`}
  class="flex w-24 justify-center"
>
  <div
    style="min-width: fit-content"
    class={` ${isVertical ? "mx-auto hover:w-24" : "mr-auto w-20"} `}
    id="number-input-div"
  >
    <input
      type="number"
      id={gridArea}
      class={`input input-xs left-0 min-w-full font-mono text-base ${
        isVertical ? "focus:w-24" : ""
      } `}
      bind:value={$values[0]}
      min={minValue}
      max={maxValue}
    />
  </div>
</div>

<style lang="postcss">
  #number-input-div {
    @apply relative z-10 inline-block;
  }

  #number-input-div::after {
    @apply absolute bottom-0 left-11 font-mono text-sm;
    content: var(--data-suffix);
  }
</style>
