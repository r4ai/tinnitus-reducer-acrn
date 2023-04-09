<script lang="ts" context="module">
  export const BORDER = 20;
</script>

<script lang="ts">
  import { Canvas, Layer, type Render } from "svelte-canvas";
  import Point from "./Point.svelte";
  import Bar from "./Bar.svelte";
  import { writable } from "svelte/store";
  import Line from "./Line.svelte";

  const width = 460;
  const height = 320;
  const divisions = 6;

  const color = "#fff";
  let positions = [
    writable({
      x: BORDER + (width / divisions) * 0,
      y: BORDER + (height / divisions) * 0,
      radius: 10,
    }),
    writable({
      x: BORDER + (width / divisions) * 1,
      y: BORDER + (height / divisions) * 1,
      radius: 10,
    }),
    writable({
      x: BORDER + (width / divisions) * 2,
      y: BORDER + (height / divisions) * 2,
      radius: 10,
    }),
    writable({
      x: BORDER + (width / divisions) * 3,
      y: BORDER + (height / divisions) * 3,
      radius: 10,
    }),
    writable({
      x: BORDER + (width / divisions) * 4,
      y: BORDER + (height / divisions) * 4,
      radius: 10,
    }),
    writable({
      x: BORDER + (width / divisions) * 5,
      y: BORDER + (height / divisions) * 5,
      radius: 10,
    }),
  ];
</script>

<div class="m-2 mx-auto">
  <Canvas {width} {height} layerEvents={true}>
    {#each positions as pos, i}
      <Bar
        canvasWidth={width - BORDER}
        canvasHeight={height - BORDER}
        width={10}
        gap={width / divisions}
        index={i}
        pointPos={pos}
      />
    {/each}
  </Canvas>
</div>

<style>
</style>
