/**
 * Check if the app is running in Tauri.
 * - Reference: https://github.com/tauri-apps/tauri/issues/3655
 */
export function isTauri() {
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  /* @ts-ignore */
  if (window.__TAURI__) {
    return true;
  } else {
    return false;
  }
}
