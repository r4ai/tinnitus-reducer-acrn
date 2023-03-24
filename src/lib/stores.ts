import { writable, type Writable } from "svelte/store";

export type Mode = "TONE" | "ACRN";

export const frequency = writable([8000]); // 0kHz to 15kHz
export const mode: Writable<Mode> = writable("TONE");
export const isPlaying = writable(false);
