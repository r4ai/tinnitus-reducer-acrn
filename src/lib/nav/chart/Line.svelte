<script lang="ts">
  import { Layer, type Render, type CanvasLayerEvent } from "svelte-canvas";
  import type { PointPos } from "./Bar.svelte";
  import type { Writable } from "svelte/store";

  export let fromPos: Writable<PointPos>;
  export let toPos: Writable<PointPos>;
  export let color: string = "#ffffff88";
  export let width: number = 2;

  let render: Render;
  $: render = ({ context }) => {
    context.beginPath();
    context.moveTo($fromPos.x, $fromPos.y);
    context.lineTo($toPos.x, $toPos.y);
    context.lineWidth = width;
    context.strokeStyle = color;
    context.stroke();
  };
</script>

<Layer {render} />

<style>
</style>
