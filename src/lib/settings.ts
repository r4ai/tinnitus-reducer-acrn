import { get, writable, type Writable } from "svelte/store";
import { getAll } from "tauri-settings";
import { STATUS } from "tauri-settings/dist/fs/ensure-settings-file";
import { saveSettings as saveAll } from "tauri-settings/dist/fs/load-save";
import { match } from "ts-pattern";
import {
  DEFAULT_SETTINGS,
  SETTINGS_FILE_NAME,
  type SettingsScheme,
} from "./constants";

const timer = writable(0);
const settingsCache: Writable<Partial<SettingsScheme>> = writable({});
const isSettingsChanged = writable(false);

export async function loadSettings(): Promise<SettingsScheme> {
  console.info("Start loading settings...");
  // * Get settings
  const {
    status,
    path: filePath,
    settings: oldSettings,
  } = await getAll<SettingsScheme>({
    fileName: SETTINGS_FILE_NAME,
  });
  const newSettings: SettingsScheme = match(status)
    .with(STATUS.FILE_CREATED, () => ({ ...DEFAULT_SETTINGS }))
    .with(STATUS.FILE_EXISTS, () => ({
      ...DEFAULT_SETTINGS,
      ...oldSettings,
    }))
    .exhaustive();

  // * Apply settings
  await saveAll<SettingsScheme>(oldSettings, filePath, {
    fileName: SETTINGS_FILE_NAME,
  });

  console.info("Settings loaded", oldSettings);
  return newSettings;
}

export async function saveSettings(newSettings: Partial<SettingsScheme>) {
  const { settings: oldSettings, path: filePath } =
    await getAll<SettingsScheme>({
      fileName: SETTINGS_FILE_NAME,
    });
  const settings = { ...oldSettings, ...newSettings };
  await saveAll<SettingsScheme>(settings, filePath, {
    fileName: SETTINGS_FILE_NAME,
  });
  console.info(`Settings saved to ${filePath}`, settings);
  return settings;
}

export async function updateCache(newSettings: Partial<SettingsScheme>) {
  timer.set(0);
  settingsCache.update(oldSettings => ({ ...oldSettings, ...newSettings }));
  if (!get(isSettingsChanged)) {
    isSettingsChanged.set(true);
  }
}

export function subscribeLazySaveSettings() {
  const unsubscribe = isSettingsChanged.subscribe(isChanged => {
    if (isChanged) {
      timer.set(0);
      const timeId = setInterval(async () => {
        timer.update(t => t + 1);
        if (get(timer) >= 2) {
          clearInterval(timeId);
          await saveSettings(get(settingsCache));
          isSettingsChanged.set(false);
        }
      }, 1000);
    }
  });
  return unsubscribe;
}
