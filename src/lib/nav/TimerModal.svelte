<script lang="ts">
  import RangeSlider, { type RangeSliderProps } from "svelte-range-slider-pips";
  import { isPlaying, timer, timerIsRunning } from "../stores";
  import { INITIAL_TIMER, MAX_TIMER, MIN_TIMER } from "../constants";

  function startTimer() {
    $timerIsRunning = true;
    const interval = setInterval(() => {
      timer.update(v => [v[0] - 1]);
      if ($timer[0] <= 0) {
        clearInterval(interval);
        $isPlaying = false;
        $timerIsRunning = false;
      }
    }, 1000);
  }

  function stopTimer() {
    timer.set([0]);
  }

  function toggleTimer() {
    if ($timerIsRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  }

  let timerMin = [$timer[0] / 60];
  $: updateTimer(timerMin);
  function updateTimer(min: number[]) {
    timer.set([min[0] * 60]);
  }

  $: console.log("timer is running: ", $timerIsRunning);
  $: console.log("timer: ", $timer[0]);
</script>

<input type="checkbox" id="modal-timer" class="modal-toggle" />
<label for="modal-timer" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <label
      for="modal-timer"
      class="btn-sm btn-circle btn absolute right-2 top-2">✕</label
    >
    <h3 class="text-lg font-bold">Timer</h3>
    <p class="py-4">Set a timer to automatically stop the sound.</p>
    <section class="flex flex-col gap-4">
      <RangeSlider
        bind:values={timerMin}
        max={MAX_TIMER}
        min={MIN_TIMER}
        step={1}
        id="timer-slider"
        float
        suffix={` min`}
        pips={true}
        pipstep={30}
        all="label"
        disabled={$timerIsRunning}
      />
      {#if $timerIsRunning}
        <div class="mx-auto flex gap-3">
          <div>
            <span class="countdown font-mono text-4xl">
              <span style={`--value:${Math.floor($timer[0] / 60)};`} />
            </span>
            min
          </div>
          <div>
            <span class="countdown font-mono text-4xl">
              <span style={`--value:${$timer[0] % 60};`} />
            </span>
            sec
          </div>
        </div>
        <p class="text-center text-sm text-gray-500">
          Timer is running. Click the button to cancel.
        </p>
      {/if}
      <button class="btn-primary btn mx-auto" on:click={toggleTimer}>
        {#if $timerIsRunning}
          Cancel
        {:else}
          Start
        {/if}
      </button>
    </section>
  </label>
</label>

<style>
</style>
