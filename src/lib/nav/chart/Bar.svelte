<script lang="ts" context="module">
  export type PointPos = {
    x: number;
    y: number;
    radius: number;
  };
</script>

<script lang="ts">
  import { Layer, type Render, type CanvasLayerEvent } from "svelte-canvas";
  import Point from "./Point.svelte";
  import type { Writable } from "svelte/store";
  import { BORDER } from "./Chart.svelte";
  import Line from "./Line.svelte";

  export let canvasWidth: number;
  export let canvasHeight: number;
  export let width: number;
  export let gap: number;
  export let index: number;
  export let barColor: string = "#00000011";
  export let pointColor: string = "#ffffff88";

  export let pointPos: Writable<PointPos>;

  const barPos = {
    x: gap * index + BORDER,
    y: 0 + BORDER,
    height: canvasHeight - BORDER,
    width: width,
  };

  let render: Render;
  $: render = ({ context }) => {
    context.globalCompositeOperation = "screen";
    // Draw the bar
    context.beginPath();
    context.moveTo(barPos.x, barPos.y);
    context.lineTo(barPos.x, barPos.height);
    context.lineWidth = barPos.width;

    context.strokeStyle = barColor;
    context.stroke();
  };

  function onClick(event: any) {
    const e = event as CanvasLayerEvent;
    if (e.detail.y > BORDER && e.detail.y < canvasHeight) {
      pointPos.update(p => {
        p.y = e.detail.y;
        return p;
      });
    }
  }
</script>

<Layer {render} on:mousedown={onClick} />
<Point pos={pointPos} color={pointColor} {canvasHeight} />

<style>
</style>
