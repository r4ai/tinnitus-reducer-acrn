<script lang="ts">
  import Chart from "./chart/Chart.svelte";
</script>

<input type="checkbox" id="modal-timer" class="modal-toggle" />
<label for="modal-timer" class="modal modal-open cursor-pointer">
  <label class="modal-box relative" for="">
    <label
      for="modal-timer"
      class="btn-sm btn-circle btn absolute right-2 top-2">✕</label
    >
    <h3 class="text-lg font-bold">Timer</h3>
    <p class="py-4">Change volume and BPM over time.</p>

    <label class="label" for="to-change-value">
      <span class="label-text">Select what you want to change.</span>
    </label>
    <select class="select-bordered select select-sm" id="to-change-value">
      <option>Volume</option>
      <option>BPM</option>
      <option>duration</option>
      <option>restLength</option>
    </select>
    <Chart />
  </label>
</label>

<style>
</style>
