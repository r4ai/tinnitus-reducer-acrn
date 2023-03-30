import "@testing-library/jest-dom";
import type { PolySynth } from "tone";
import * as Tone from "tone";
import { describe, type SpyInstance } from "vitest";
import { createPanner } from "../lib/Oscillator.svelte";
import {
  createSequence,
  createSynth,
  defaultSequenceOption,
  generateAcrnSheet,
  generateFrequencies,
  shuffledFrequencies,
  updatedSequence,
  type PolySynthOption,
} from "../lib/Sequence.svelte";

describe("generateFrequencies", () => {
  test("returns correct frequencies when input is 1000", () => {
    const input = 1000;
    const expected = [728, 881, 1142, 1421];
    const result = generateFrequencies(input);
    expect(result).toEqual(expected);
  });

  test("returns correct frequencies when input is 5000", () => {
    const input = 5000;
    const expected = [3820, 4493, 5502, 7001];
    const result = generateFrequencies(input);
    expect(result).toEqual(expected);
  });

  test("returns correct frequencies when input is 1", () => {
    const input = 1;
    const expected = [-44, -21, 53, 27];
    const result = generateFrequencies(input);
    expect(result).toEqual(expected);
  });

  test("returns correct frequencies when input is 15000", () => {
    const input = 15000;
    const expected = [11550, 13523, 16402, 20951];
    const result = generateFrequencies(input);
    expect(result).toEqual(expected);
  });
});

describe("shuffledFrequencies", () => {
  test("returns shuffled array", () => {
    const input = [1, 2, 3, 4, 5, 6];
    const result = shuffledFrequencies(input);
    expect(result).not.toEqual(input);
  });

  test("returns same array when input has one element", () => {
    const input = [1];
    const result = shuffledFrequencies(input);
    expect(result).toEqual(input);
  });

  test("returns same array when input is empty", () => {
    const input: number[] = [];
    const result = shuffledFrequencies(input);
    expect(result).toEqual(input);
  });
});

describe("generateAcrnSheet", () => {
  test("check array length (weak test)", () => {
    const loopRepeat = 3;
    const restLength = 2;
    const expectedLength = loopRepeat * 4 + restLength;
    const result = generateAcrnSheet(loopRepeat, restLength);
    expect(result).toHaveLength(expectedLength);
  });

  test("loopRepeat=3, restLength=2, (strong test)", () => {
    const loopRepeat = 3;
    const restLength = 2;
    const expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1];
    const result = generateAcrnSheet(loopRepeat, restLength);
    expect(result).toEqual(expected);
  });

  test("loopRepeat=1, restLength=1 (strong test)", () => {
    const loopRepeat = 1;
    const restLength = 1;
    const expected = [0, 0, 0, 0, 1];
    const result = generateAcrnSheet(loopRepeat, restLength);
    expect(result).toEqual(expected);
  });

  test("loopRepeat=0, restLength=0 (strong test)", () => {
    const loopRepeat = 0;
    const restLength = 0;
    const expected: number[] = [];
    const result = generateAcrnSheet(loopRepeat, restLength);
    expect(result).toEqual(expected);
  });
});

describe("createSynth", () => {
  test("デフォルトオプションでSynthを作成できる", () => {
    const synth = createSynth(createPanner());
    expect(synth).toBeDefined();
  });

  test("オプションでSynthを作成できる", () => {
    const options: PolySynthOption = {
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.2,
        decay: 0.3,
        sustain: 0.4,
        release: 0.5,
      },
    };
    const synth = createSynth(createPanner(), options);
    expect(synth.get().oscillator.type).toBe(options.oscillator.type);
    expect(synth.get().envelope.attack).toBe(options.envelope.attack);
    expect(synth.get().envelope.decay).toBe(options.envelope.decay);
    expect(synth.get().envelope.sustain).toBe(options.envelope.sustain);
    expect(synth.get().envelope.release).toBe(options.envelope.release);
  });

  test("デフォルトオプションでPolySynthを作成できる", () => {
    const synth = createSynth(createPanner());
    expect(synth).toBeDefined();
    expect(synth).toBeInstanceOf(Tone.PolySynth);
  });

  test("オプションでPolySynthを作成できる", () => {
    const options: PolySynthOption = {
      oscillator: {
        type: "triangle",
      },
      envelope: {
        attack: 0.2,
        decay: 0.3,
        sustain: 0.4,
        release: 0.5,
      },
    };
    const synth = createSynth(createPanner(), options);
    expect(synth.get().oscillator.type).toBe(options.oscillator.type);
    expect(synth.get().envelope.attack).toBe(options.envelope.attack);
    expect(synth.get().envelope.decay).toBe(options.envelope.decay);
    expect(synth.get().envelope.sustain).toBe(options.envelope.sustain);
    expect(synth.get().envelope.release).toBe(options.envelope.release);
  });

  test("Play sound with the synth", () => {
    const synth = createSynth(createPanner());
    const note = "C4";
    synth.triggerAttackRelease(note, "8n");
  });
});

describe("createSequence", () => {
  let synthMock: PolySynth;
  let attackReleaseMock: SpyInstance;

  beforeEach(() => {
    synthMock = createSynth(createPanner());
    attackReleaseMock = vi.spyOn(synthMock, "triggerAttackRelease");
  });

  afterEach(() => {
    synthMock.dispose();
    vi.clearAllMocks();
  });

  test("should create a sequence with correct number of repeats and rest periods", async () => {
    const frequencies = generateFrequencies(8000);
    const loopRepeat = 2;
    const restLength = 1;
    const duration = "8n";
    const seq = createSequence(synthMock, frequencies, {
      loopRepeat,
      restLength,
      duration,
    });
    expect(seq.events).toEqual(generateAcrnSheet(loopRepeat, restLength));
    expect(seq.loop).toBe(true);
  });

  test("default option", async () => {
    const frequencies = generateFrequencies(8000);
    const { loopRepeat, restLength } = defaultSequenceOption;
    const seq = createSequence(synthMock, frequencies);
    expect(seq.events).toEqual(generateAcrnSheet(loopRepeat, restLength));
    expect(seq.loop).toBe(true);
  });

  // TODO: Add test if the sequence bpm is correct
});

describe("updatedSequence", () => {
  let synth: PolySynth;
  let frequencies: number[];

  beforeEach(() => {
    // Arrange
    synth = createSynth(createPanner());
    frequencies = generateFrequencies(8000);
  });

  afterEach(() => {
    synth.releaseAll();
  });

  test("should return undefined if synth and oldSeq are both undefined", () => {
    // Act
    const result = updatedSequence(undefined, undefined, frequencies);

    // Assert
    expect(result).toBeUndefined();
  });

  test("should return the new sequence if synth is defined and oldSeq is undefined", () => {
    // Act
    const result = updatedSequence(undefined, synth, frequencies);

    // Assert
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Tone.Sequence);
  });

  test("should dispose the old sequence and return the new sequence if synth is defined and oldSeq is defined", () => {
    // Arrange
    const oldSeq = createSequence(synth, frequencies);

    // Act
    const result = updatedSequence(oldSeq, synth, frequencies);

    // Assert
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Tone.Sequence);
    expect(result).not.toBe(oldSeq);
    expect(oldSeq.disposed).toBe(true);
  });

  test("should return the old sequence if synth is undefined", () => {
    // Arrange
    const oldSeq = createSequence(synth, frequencies);

    // Act
    const result = updatedSequence(oldSeq, undefined, frequencies);

    // Assert
    expect(result).toBe(oldSeq);
  });
});
