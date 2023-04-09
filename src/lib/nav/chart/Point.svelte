<script lang="ts">
  import { Layer, type Render, type CanvasLayerEvent } from "svelte-canvas";
  import { spring } from "svelte/motion";
  import type { Writable } from "svelte/store";
  import type { PointPos } from "./Bar.svelte";
  import { BORDER } from "./Chart.svelte";

  export let canvasHeight: number;
  export let color: string;
  export let pos: Writable<PointPos>;

  let render: Render;
  let dragging = false;

  const radius = spring(10, { stiffness: 0.15, damping: 0.2 });

  $: render = ({ context }) => {
    context.globalCompositeOperation = "screen";
    context.fillStyle = color;
    context.lineWidth = 10;
    context.beginPath();
    context.arc($pos.x, $pos.y, $radius, 0, Math.PI * 2);
    context.fill();
  };

  const onHover = () => {
    radius.set(20);
  };

  const onLeave = () => {
    dragging = false;
    radius.set(10);
  };

  const onClick = () => {
    dragging = true;
    radius.set(20);
  };

  const onClickRelease = () => {
    dragging = false;
    radius.set(10);
  };

  const onMove = (event: any) => {
    const e = event as CanvasLayerEvent;
    if (dragging && e.detail.y > BORDER && e.detail.y < canvasHeight - BORDER) {
      $pos.y = e.detail.y;
    }
  };
</script>

<Layer
  {render}
  on:mouseenter={onHover}
  on:mouseleave={onLeave}
  on:mousedown={onClick}
  on:mousemove={onMove}
  on:mouseup={onClickRelease}
  on:touchstart={onClick}
  on:touchmove={onMove}
  on:touchend={onClickRelease}
/>
