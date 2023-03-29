import { writable, type Writable } from "svelte/store";
import { INITIAL_BPM, INITIAL_FREQUENCY, INITIAL_VOLUME } from "./constants";
import { updateCache } from "./settings";

export type Mode = "TONE" | "ACRN";
export type Theme = "light" | "dark";

export const frequency = writable([INITIAL_FREQUENCY]); // 0kHz to 15kHz
export const volume = writable([INITIAL_VOLUME]); // 0 ~ 100
export const bpm = writable([INITIAL_BPM]); // According to the paper, the cycle repetition rate was 1.5 Hz. (T = 0.66 s)
export const mode: Writable<Mode> = writable("TONE");
export const isPlaying = writable(false);
export const theme: Writable<Theme> = writable("light");

/**
 * Subscribe to all stores and update the settings cache when the value changes.
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
  ];
  return unsubscribe;
}
