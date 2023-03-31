<script lang="ts">
  import { isPlaying } from "./stores";

  function togglePlay() {
    isPlaying.update(value => !value);
  }
</script>

<div class="text-center">
  <button class="btn-primary btn" on:click={togglePlay}>
    {$isPlaying ? "Stop" : "Play"}
  </button>
</div>

<style>
</style>
