import { writable, type Writable } from "svelte/store";
import { INITIAL_VOLUME } from "./constants";

export type Mode = "TONE" | "ACRN";

export const frequency = writable([8000]); // 0kHz to 15kHz
export const volume = writable([INITIAL_VOLUME]); // 0 ~ 100
export const bpm = writable(90 * 4); // According to the paper, the cycle repetition rate was 1.5 Hz. (T = 0.66 s)
export const mode: Writable<Mode> = writable("TONE");
export const isPlaying = writable(false);
