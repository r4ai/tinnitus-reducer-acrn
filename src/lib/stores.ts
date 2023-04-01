import { writable, type Writable } from "svelte/store";
import type { Unit } from "tone";
import {
  DEFAULT_SEQUENCE_OPTION,
  INITIAL_BPM,
  INITIAL_FREQUENCY,
  INITIAL_PAN,
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

export const frequency = writable([INITIAL_FREQUENCY]); // 0kHz to 15kHz
export const volume = writable([INITIAL_VOLUME]); // 0 ~ 100
export const bpm = writable([INITIAL_BPM]); // According to the paper, the cycle repetition rate was 1.5 Hz. (T = 0.66 s)
export const pan = writable([INITIAL_PAN]); // -1 ~ 1
export const sequenceOption: Writable<SequenceOption> = writable(
  DEFAULT_SEQUENCE_OPTION
);
export const mode: Writable<Mode> = writable("TONE");
export const isPlaying = writable(false);
export const theme: Writable<Theme> = writable("light");

export const clientWidth = writable(0);

/**
 * Subscribe to all stores and update the settings cache when the value changes.
 * - When new stores are added, update the `SettingsScheme` and new stores must be added here to save.
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
  ];
  return unsubscribe;
}
