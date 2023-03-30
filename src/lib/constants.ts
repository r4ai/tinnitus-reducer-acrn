/* Used for internal purposes */
export const INITIAL_THEME = "dark";

export const SHEET_RANDOM_FREQUENCY = 0;
export const SHEET_REST = 1;

export const SAVE_DELAY_TIME = 2; // 3 seconds

/* Used for default values */
export const INITIAL_VOLUME = -60; // -80 ~ 0 [dB]
export const MIN_VOLUME = -80;
export const MAX_VOLUME = 0;

export const INITIAL_FREQUENCY = 8000; // 0 to 15 [kHz]
export const MIN_FREQUENCY = 0;
export const MAX_FREQUENCY = 15000;

export const INITIAL_BPM = 90 * 4; // According to the paper, the cycle repetition rate was 1.5 Hz. (T = 0.66 s)
export const MAX_BPM = 90 * 6;
export const MIN_BPM = 60;

export const INITIAL_PAN = 0; // means center
export const MAX_PAN = 1; // means right
export const MIN_PAN = -1; // means left

export const LOOP_REPEAT = 4;
export const REST_LENGTH = 4;

/* settings */
export const LOCAL_STORAGE_SETTINGS_KEY = "settings";
export type SettingsScheme = {
  theme: "dark" | "light";
  frequency: number;
  bpm: number;
  volume: number;
  pan: number;
};
export const SETTINGS_FILE_NAME = "user-settings";
export const DEFAULT_SETTINGS: SettingsScheme = {
  theme: INITIAL_THEME,
  frequency: INITIAL_FREQUENCY,
  bpm: INITIAL_BPM,
  volume: INITIAL_VOLUME,
  pan: INITIAL_PAN,
};
