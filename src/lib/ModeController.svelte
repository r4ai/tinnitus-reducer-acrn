<script lang="ts">
  import { mode } from "./stores";
</script>

<div class="btn-group">
  <button
    class={`btn ${$mode === "TONE" ? "btn-active" : ""}`}
    on:click={() => ($mode = "TONE")}>Tone</button
  >
  <button
    class={`btn ${$mode === "ACRN" ? "btn-active" : ""}`}
    on:click={() => ($mode = "ACRN")}>ACRN</button
  >
</div>

<style>
</style>
