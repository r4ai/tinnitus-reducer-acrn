export const INITIAL_VOLUME = 15; // 0 ~ 100

export const INITIAL_FREQUENCY = 8000; // 0kHz to 15kHz
export const MIN_FREQUENCY = 0;
export const MAX_FREQUENCY = 15000;

// According to the paper, the cycle repetition rate was 1.5 Hz. (T = 0.66 s)
export const DEFAULT_BPM = 90 * 2;

export const LOOP_REPEAT = 4;
export const REST_LENGTH = 4;
