import type { Duration, SequenceOption, SettingsScheme } from "./stores";

// * Internal
export const INITIAL_THEME = "dark";

export const SHEET_RANDOM_FREQUENCY = 0;
export const SHEET_REST = 1;

export const SAVE_DELAY_TIME = 2; // 3 seconds

// * Config
export const INITIAL_VOLUME = -60; // -80 ~ 0 [dB]
export const MIN_VOLUME = -80;
export const MAX_VOLUME = 0;

export const INITIAL_FREQUENCY = 8000; // 0 to 15 [kHz]
export const MIN_FREQUENCY = 0;
export const MAX_FREQUENCY = 15000;

export const INITIAL_BPM = 90 * 2; // According to the paper, the cycle repetition rate was 1.5 Hz. (T = 0.66 s)
export const MAX_BPM = 90 * 6;
export const MIN_BPM = 60;

export const INITIAL_PAN = 0; // means center
export const MAX_PAN = 1; // means right
export const MIN_PAN = -1; // means left

/**
 * The number of times the sequence will repeat.
 */
export const DEFAULT_LOOP_REPEAT = 3;
export const MIN_LOOP_REPEAT = 1;
export const MAX_LOOP_REPEAT = 10;

/**
 * The number of rests in the sequence.
 */
export const DEFAULT_REST_LENGTH = 2 * 4;
export const MIN_REST_LENGTH = 0;
export const MAX_REST_LENGTH = 16 * 4;

/**
 * The duration of the note in the sequence.
 */
export const DEFAULT_DURATION: Duration = "8n"; // 4n = 1/4
export const MIN_DURATION: Duration = "128n"; // 16n = 1/16
export const MAX_DURATION: Duration = "1n"; // 1n = 1/1

export const DEFAULT_SEQUENCE_OPTION: SequenceOption = {
  loopRepeat: DEFAULT_LOOP_REPEAT,
  restLength: DEFAULT_REST_LENGTH,
  duration: DEFAULT_DURATION,
};

// * Timer
export const INITIAL_TIMER = 60; // Time to stop the sound [min]
export const MIN_TIMER = 0; // Time to stop the sound [min]
export const MAX_TIMER = 180; // Time to stop the sound [min]

// * Settings
export const LOCAL_STORAGE_SETTINGS_KEY = "settings";
export const SETTINGS_FILE_NAME = "user-settings";
export const DEFAULT_SETTINGS: SettingsScheme = {
  theme: INITIAL_THEME,
  frequency: INITIAL_FREQUENCY,
  bpm: INITIAL_BPM,
  volume: INITIAL_VOLUME,
  pan: INITIAL_PAN,
  loopRepeat: DEFAULT_LOOP_REPEAT,
  restLength: DEFAULT_REST_LENGTH,
  duration: DEFAULT_DURATION,
};
