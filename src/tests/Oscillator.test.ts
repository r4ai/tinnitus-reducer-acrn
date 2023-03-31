import "@testing-library/jest-dom";
import {
  createOscillator,
  createPanner,
  playOsc,
  setFrequency,
  stopOsc,
} from "../lib/Oscillator.svelte";
import { INITIAL_FREQUENCY } from "../lib/constants";

describe("playOsc", () => {
  test("mode=TONEのとき、oscillatorがスタートされること", () => {
    const mockOsc = createOscillator(createPanner());
    const result = playOsc(mockOsc, "TONE");
    expect(result).toBeTruthy();
    expect(mockOsc.state).toBe("started");
    mockOsc.dispose();
  });

  test("mode=ACRNのとき、oscillatorがスタートされないこと", () => {
    const mockOsc = createOscillator(createPanner());
    const result = playOsc(mockOsc, "ACRN");
    expect(result).toBeNull();
    expect(mockOsc.state).toBe("stopped");
    mockOsc.dispose();
  });

  test("undefinedを渡したとき、oscillatorがスタートされないこと", () => {
    const result = playOsc(undefined, "TONE");
    expect(result).toBeNull();
  });
});

describe("stopOsc", () => {
  test("mode=TONEのとき、oscillatorがストップされること", () => {
    const mockOsc = createOscillator(createPanner());
    playOsc(mockOsc, "TONE");
    expect(mockOsc.state).toBe("started");

    const result = stopOsc(mockOsc, "TONE");
    expect(result).toBeFalsy();
    expect(mockOsc.state).toBe("stopped");
    mockOsc.dispose();
  });

  test("mode=ACRNのとき、oscillatorがストップされないこと", () => {
    const mockOsc = createOscillator(createPanner());
    playOsc(mockOsc, "TONE");
    expect(mockOsc.state).toBe("started");

    const result = stopOsc(mockOsc, "ACRN");
    expect(result).toBeNull();
    expect(mockOsc.state).toBe("started");
    mockOsc.dispose();
  });

  test("undefinedを渡したとき、oscillatorがストップされないこと", () => {
    const result = stopOsc(undefined, "TONE");
    expect(result).toBeNull();
  });
});

describe("setFrequency", () => {
  test("0以上15000以下のfrequencyを渡したとき、frequencyが設定されること", () => {
    const mockOsc = createOscillator(createPanner());
    const result = setFrequency(mockOsc, 440);
    setTimeout(() => {
      expect(mockOsc.frequency.value).toBe(440);
    }, 100);
    expect(result).toBeTruthy();
    mockOsc.dispose();
  });

  test("0を渡したとき、frequency=1に設定されること", () => {
    const mockOsc = createOscillator(createPanner());
    const result = setFrequency(mockOsc, 0);
    setTimeout(() => {
      expect(mockOsc.frequency.value).toBe(1);
    }, 100);
    expect(result).toBeTruthy();
    mockOsc.dispose();
  });

  test("0未満のfrequencyを渡したとき、frequencyが設定されないこと", () => {
    const mockOsc = createOscillator(createPanner());
    const result = setFrequency(mockOsc, -1);
    setTimeout(() => {
      expect(mockOsc.frequency.value).toBe(INITIAL_FREQUENCY);
    }, 100);
    expect(result).toBeFalsy();
    mockOsc.dispose();
  });

  test("15000を超えるfrequencyを渡したとき、frequencyが設定されないこと", () => {
    const mockOsc = createOscillator(createPanner());
    const result = setFrequency(mockOsc, 15001);
    setTimeout(() => {
      expect(mockOsc.frequency.value).toBe(INITIAL_FREQUENCY);
    }, 100);
    expect(result).toBeFalsy();
    mockOsc.dispose();
  });

  test("undefinedを渡したとき、frequencyが設定されないこと", () => {
    const result = setFrequency(undefined, 440);
    expect(result).toBeFalsy();
  });
});
