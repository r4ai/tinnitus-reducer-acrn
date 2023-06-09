import {
  DEFAULT_SETTINGS,
  LOCAL_STORAGE_SETTINGS_KEY,
  SAVE_DELAY_TIME,
  SETTINGS_FILE_NAME,
} from "@/lib/constants";
import { appConfigDir, basename, dirname, join } from "@tauri-apps/api/path";
import { get, writable, type Writable } from "svelte/store";
import { getAll } from "tauri-settings";
import { STATUS } from "tauri-settings/dist/fs/ensure-settings-file";
import { saveSettings as saveAll } from "tauri-settings/dist/fs/load-save";
import { match } from "ts-pattern";
import {
  bpm,
  duration,
  frequency,
  loopRepeat,
  pan,
  restLength,
  theme,
  volume,
  type SettingsScheme,
} from "./stores";
import { isTauri } from "./utils";

export const timer = writable(0); // 0 ~ SAVE_DELAY_TIME
export const settingsCache: Writable<Partial<SettingsScheme>> = writable({});
export const isSettingsChanged = writable(false);

export async function getDefaultSettingsPath() {
  return await join(await appConfigDir(), `${SETTINGS_FILE_NAME}.json`);
}

// TODO: Add test
export async function loadSettings(path = ""): Promise<SettingsScheme> {
  console.info("Start loading settings...");
  // * Get settings
  const {
    status,
    path: filePath,
    settings: oldSettings,
  } = path === ""
    ? await getAll<SettingsScheme>({
        fileName: SETTINGS_FILE_NAME,
      })
    : await getAll<SettingsScheme>({
        fileName: `${await basename(path)}.json`,
        dir: await dirname(path),
      });
  const newSettings: SettingsScheme = match(status)
    .with(STATUS.FILE_CREATED, () => ({ ...DEFAULT_SETTINGS }))
    .with(STATUS.FILE_EXISTS, () => ({
      ...DEFAULT_SETTINGS,
      ...oldSettings,
    }))
    .exhaustive();

  // * Apply settings
  await saveAll<SettingsScheme>(newSettings, filePath, {
    fileName: SETTINGS_FILE_NAME,
  });

  console.info("Settings loaded", newSettings);
  return newSettings;
}

// TODO: Add test
export async function saveSettings(
  newSettings: Partial<SettingsScheme>,
  path = ""
) {
  const { settings: oldSettings, path: filePath } =
    await getAll<SettingsScheme>({
      fileName: SETTINGS_FILE_NAME,
    });
  const settings = { ...oldSettings, ...newSettings };
  if (path === "") {
    await saveAll<SettingsScheme>(settings, filePath, {
      fileName: SETTINGS_FILE_NAME,
    });
  } else {
    await saveAll<SettingsScheme>(settings, path, {
      fileName: SETTINGS_FILE_NAME,
    });
  }
  console.info(`Settings saved to ${filePath}`, settings);
  return settings;
}

/**
 * Load settings from localStorage.
 * - settings will be loaded from JSON string with key `LOCAL_STORAGE_SETTINGS_KEY`.
 * - if there is no data in localStorage, save default settings to localStorage and return it.
 * - this is used for browser version. not used in Tauri.
 * - data in localStorage and file will not be synced.
 */
export function loadSettingsFromLocalStorage(): SettingsScheme {
  const settingsRaw = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
  if (settingsRaw) {
    const settings = { ...DEFAULT_SETTINGS, ...JSON.parse(settingsRaw) };
    console.info("Settings loaded from localStorage", settings);
    return settings;
  } else {
    localStorage.setItem(
      LOCAL_STORAGE_SETTINGS_KEY,
      JSON.stringify(DEFAULT_SETTINGS)
    );
    console.info("Settings loaded from localStorage", DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Save settings to localStorage.
 * - settings will be saved as JSON string with key `LOCAL_STORAGE_SETTINGS_KEY`.
 * - this is used for browser version. not used in Tauri.
 * - data in localStorage and file will not be synced.
 */
export function saveSettingsToLocalStorage(
  newSettings: Partial<SettingsScheme>
) {
  const oldSettings = loadSettingsFromLocalStorage();
  const settings = { ...oldSettings, ...newSettings };
  localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settings));
  console.info(`Settings saved to localStorage`, settings);
  return settings;
}

export async function updateCache(newSettings: Partial<SettingsScheme>) {
  timer.set(0);
  settingsCache.update(oldSettings => ({ ...oldSettings, ...newSettings }));
  if (!get(isSettingsChanged)) {
    isSettingsChanged.set(true);
  }
}

export type SaveSettingsTarget = "file" | "localStorage";

// TODO: Add test
/**
 * Subscribe to `isSettingsChanged` store.
 * - If `isSettingsChanged` is true, start timer.
 *   - If timer is over `saveDelayTime`, save cached settings to file or localStorage and reset timer.
 *   - else, do nothing.
 * - else, do nothing.
 * @argument saveDelayTime - Delay time to save settings [s]. Default is `SAVE_DELAY_TIME - 1`.
 * @argument target - Save target. Default is "file".
 * @returns Unsubscribe function.
 */
export function subscribeLazySaveSettings(
  saveDelayTime = SAVE_DELAY_TIME,
  target: SaveSettingsTarget = "file"
) {
  if (!isTauri()) target = "localStorage";
  const unsubscribe = isSettingsChanged.subscribe(isChanged => {
    if (isChanged) {
      timer.set(0);
      const timeId = setInterval(async () => {
        timer.update(t => t + 1);
        if (get(timer) >= saveDelayTime * 2) {
          clearInterval(timeId);
          if (target === "localStorage") {
            saveSettingsToLocalStorage(get(settingsCache));
          } else {
            await saveSettings(get(settingsCache));
          }
          timer.set(0);
          settingsCache.set({});
          isSettingsChanged.set(false);
        }
      }, 500);
    }
  });
  return unsubscribe;
}

/**
 * Update stores with settings.
 * - For developer: Need to be changed if new settings are added.
 */
export function updateStores(settings: SettingsScheme) {
  volume.set([settings.volume]);
  frequency.set([settings.frequency]);
  bpm.set([settings.bpm]);
  pan.set([settings.pan]);
  theme.set(settings.theme);
  loopRepeat.set([settings.loopRepeat]);
  restLength.set([settings.restLength]);
  duration.set([settings.duration]);
}
