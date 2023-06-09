import { writable, type Writable } from "svelte/store";
import type { Unit } from "tone";
import {
  DEFAULT_DURATION,
  DEFAULT_LOOP_REPEAT,
  DEFAULT_REST_LENGTH,
  INITIAL_BPM,
  INITIAL_FREQUENCY,
  INITIAL_PAN,
  INITIAL_TIMER,
  INITIAL_VOLUME,
} from "./constants";
import { updateCache } from "./settings";

export type Mode = "TONE" | "ACRN";
export type Theme = "light" | "dark";
export type SequenceOption = {
  loopRepeat: number;
  restLength: number;
  duration: Unit.Time;
};
export type Duration =
  | "1n"
  | "2n"
  | "4n"
  | "8n"
  | "16n"
  | "32n"
  | "64n"
  | "128n"
  | "256n";
export type SettingsScheme = {
  theme: "dark" | "light";
  frequency: number;
  bpm: number;
  volume: number;
  pan: number;
  loopRepeat: number;
  restLength: number;
  duration: Duration;
};

// * Config
export const frequency = writable([INITIAL_FREQUENCY]); // 0kHz to 15kHz
export const volume = writable([INITIAL_VOLUME]); // 0 ~ 100
export const bpm = writable([INITIAL_BPM]); // According to the paper, the cycle repetition rate was 1.5 Hz. (T = 0.66 s)
export const pan = writable([INITIAL_PAN]); // -1 ~ 1
export const loopRepeat = writable([DEFAULT_LOOP_REPEAT]);
export const restLength = writable([DEFAULT_REST_LENGTH]);
export const duration: Writable<Duration[]> = writable([DEFAULT_DURATION]);
export const mode: Writable<Mode> = writable("TONE");

// * Timer
export const timer = writable([INITIAL_TIMER * 60]); // Time to stop the sound [sec]
export const timerIsRunning = writable(false);

// * Internal
export const isPlaying = writable(false);
export const theme: Writable<Theme> = writable("light");
export const clientWidth = writable(0);

/**
 * Subscribe to all stores and update the settings cache when the value changes.
 * - When new stores are added, update the `SettingsScheme` and new stores must be added here to save.
 * - Also, need to update the `updateStore` function in `src/lib/settings.ts`.
 */
export function subscribeStores() {
  const unsubscribe = [
    frequency.subscribe(value => {
      updateCache({ frequency: value[0] });
    }),
    volume.subscribe(value => {
      updateCache({ volume: value[0] });
    }),
    bpm.subscribe(value => {
      updateCache({ bpm: value[0] });
    }),
    theme.subscribe(value => {
      updateCache({ theme: value });
    }),
    pan.subscribe(value => {
      updateCache({ pan: value[0] });
    }),
    loopRepeat.subscribe(value => {
      updateCache({ loopRepeat: value[0] });
    }),
    restLength.subscribe(value => {
      updateCache({ restLength: value[0] });
    }),
    duration.subscribe(value => {
      updateCache({ duration: value[0] });
    }),
  ];
  return unsubscribe;
}
