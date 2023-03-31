import "@testing-library/jest-dom";
import { get } from "svelte/store";
import {
  isSettingsChanged,
  settingsCache,
  timer,
  updateCache,
} from "../lib/settings.js";

describe("UpdateCache", () => {
  beforeEach(() => {
    timer.set(0);
    settingsCache.set({});
    isSettingsChanged.set(false);
  });
  test("reset timer, update settings cache, set isSettingsChanged=true", () => {
    // Arrange
    expect(get(timer)).toBe(0);
    expect(get(settingsCache)).toEqual({});
    expect(get(isSettingsChanged)).toBe(false);

    // Act
    updateCache({ theme: "light" });

    // Assert
    expect(get(timer)).toBe(0);
    expect(get(settingsCache)).toEqual({ theme: "light" });
    expect(get(isSettingsChanged)).toBe(true);
  });

  test("reset timer, update settings cache, set isSettingsChanged=true", () => {
    // Arrange
    timer.set(4);
    expect(get(timer)).toBe(4);
    expect(get(settingsCache)).toEqual({});
    expect(get(isSettingsChanged)).toBe(false);

    // Act
    updateCache({ theme: "light" });
    updateCache({ theme: "dark" });

    // Assert
    expect(get(timer)).toBe(0);
    expect(get(settingsCache)).toEqual({ theme: "dark" });
    expect(get(isSettingsChanged)).toBe(true);
  });

  test("reset timer, update settings cache, set isSettingsChanged=true", () => {
    // Arrange
    expect(get(timer)).toBe(0);
    expect(get(settingsCache)).toEqual({});
    expect(get(isSettingsChanged)).toBe(false);

    // Act
    updateCache({ theme: "light" });
    updateCache({ theme: "dark" });
    updateCache({ theme: "dark", frequency: 1000, volume: -40 });
    updateCache({ theme: "light", volume: -20 });
    updateCache({ bpm: 120 });
    updateCache({ theme: "dark", frequency: 2000 });
    updateCache({ frequency: 3000 });
    updateCache({ frequency: 3001 });
    updateCache({ frequency: 3002 });
    updateCache({ volume: -10 });
    updateCache({ volume: -11 });
    updateCache({ volume: -9 });
    updateCache({ volume: -13 });
    updateCache({ pan: 1 });

    // Assert
    expect(get(timer)).toBe(0);
    expect(get(settingsCache)).toEqual({
      theme: "dark",
      frequency: 3002,
      volume: -13,
      bpm: 120,
      pan: 1,
    });
    expect(get(isSettingsChanged)).toBe(true);
  });

  test("do not update isSettingsChanged if its previousValue was true", () => {
    // Arrange
    timer.set(1);
    let timerCount = 0;
    let cacheCount = 0;
    let isChangedCount = 0;
    const unsubscribeTimerCount = timer.subscribe(t => {
      if (t === 0) timerCount++;
    });
    const unsubscribeCacheCount = settingsCache.subscribe(() => cacheCount++);
    cacheCount = 0;
    const unsubscribeIsChangedCount = isSettingsChanged.subscribe(isChanged => {
      if (isChanged) isChangedCount++;
    });

    // Assert Arrange
    expect(get(timer)).toBe(1);
    expect(get(settingsCache)).toEqual({});
    expect(get(isSettingsChanged)).toBe(false);
    expect(timerCount).toBe(0);
    expect(cacheCount).toBe(0);
    expect(isChangedCount).toBe(0);

    // Act 1
    updateCache({ theme: "light" });

    // Assert 1
    expect(get(timer)).toBe(0);
    expect(get(settingsCache)).toEqual({ theme: "light" });
    expect(get(isSettingsChanged)).toBe(true);
    expect(timerCount).toBe(1);
    expect(cacheCount).toBe(1);
    expect(isChangedCount).toBe(1);

    // Act 2
    updateCache({ theme: "dark" });

    // Assert 2
    expect(get(timer)).toBe(0);
    expect(get(settingsCache)).toEqual({ theme: "dark" });
    expect(get(isSettingsChanged)).toBe(true);
    expect(timerCount).toBe(1);
    expect(cacheCount).toBe(2);
    expect(isChangedCount).toBe(1);

    // Act 3
    timer.update(t => t + 1);
    updateCache({ theme: "dark", frequency: 1000, volume: -40 });

    // Assert 3
    expect(get(timer)).toBe(0);
    expect(get(settingsCache)).toEqual({
      theme: "dark",
      frequency: 1000,
      volume: -40,
    });
    expect(get(isSettingsChanged)).toBe(true);
    expect(timerCount).toBe(2);
    expect(cacheCount).toBe(3);
    expect(isChangedCount).toBe(1);

    // Cleanup
    unsubscribeTimerCount();
    unsubscribeCacheCount();
    unsubscribeIsChangedCount();
  });
});
