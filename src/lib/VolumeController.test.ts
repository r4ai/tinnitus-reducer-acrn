import "@testing-library/jest-dom";
import { getByRole, render } from "@testing-library/svelte";
import * as Tone from "tone";
import { INITIAL_VOLUME } from "./constants";
import VolumeController, {
  setDestinationVolume,
} from "./VolumeController.svelte";

describe("setDestinationVolume", () => {
  test("volume < 0", () => {
    const destination = Tone.getDestination();
    const initialVolume = destination.volume.value;
    const result = setDestinationVolume(destination, -1);
    expect(result).toBe(null);
    setTimeout(() => {
      expect(destination.volume.value).toBe(initialVolume);
    }, 100);
  });

  test("volume > 100", () => {
    const destination = Tone.getDestination();
    const initialVolume = destination.volume.value;
    const result = setDestinationVolume(destination, 101);
    expect(result).toBe(null);
    setTimeout(() => {
      expect(destination.volume.value).toBe(initialVolume);
    }, 100);
  });

  test("volume = 0", () => {
    const destination = Tone.getDestination();
    const result = setDestinationVolume(destination, 0);
    expect(result).toBe(-Infinity);
    setTimeout(() => {
      expect(destination.volume.value).toBe(-Infinity);
    }, 100);
  });

  test("volume = 50", () => {
    const destination = Tone.getDestination();
    const result = setDestinationVolume(destination, 50);
    const expected = Tone.gainToDb(50 / 100) - 0.05;
    expect(result).toBe(expected);
    setTimeout(() => {
      expect(destination.volume.value).toBe(expected);
    }, 100);
  });

  test("volume = 100", () => {
    const destination = Tone.getDestination();
    const result = setDestinationVolume(destination, 100);
    const expected = Tone.gainToDb(100 / 100) - 0.05;
    expect(result).toBe(expected);
    setTimeout(() => {
      expect(destination.volume.value).toBe(expected);
    }, 100);
  });
});

describe("VolumeController.svelte", async () => {
  test("Check volumeSlider", async () => {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore */
    const { container } = render(VolumeController);

    // * Render slider
    const slider = getByRole(container, "slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuenow", `${INITIAL_VOLUME}`);

    // * Check min and max value
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
  });
});
