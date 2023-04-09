<script lang="ts">
  import { Canvas, Layer, type Render } from "svelte-canvas";
  import Point from "./Point.svelte";

  let balls = [
    { color: "#f00", x: 320, y: 213 },
    { color: "#0f0", x: 213, y: 400 },
    { color: "#00f", x: 427, y: 400 },
  ];

  const reorder = (color: string) => {
    balls = balls
      .filter(c => c.color !== color)
      .concat(balls.filter(c => c.color === color));
  };

  let render: Render;
  $: render = ({ context, width, height }) => {
    context.arc(width / 2, height / 2, 10, 0, 2 * Math.PI);
    context.fillStyle = "green";
    context.fill();
  };
</script>

<Canvas width={320} height={320} layerEvents={true}>
  <Layer {render} />
  {#each balls as { color, x, y }}
    <Point {color} {x} {y} {reorder} />
  {/each}
</Canvas>

<style>
</style>
