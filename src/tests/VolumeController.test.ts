import "@testing-library/jest-dom";
import { getByRole, render } from "@testing-library/svelte";
import * as Tone from "tone";
import { INITIAL_VOLUME, MAX_VOLUME, MIN_VOLUME } from "../lib/constants";
import VolumeController, {
  setDestinationVolume,
} from "../lib/VolumeController.svelte";

describe("setDestinationVolume", () => {
  test("volume < -80", () => {
    const destination = Tone.getDestination();
    const initialVolume = destination.volume.value;
    const result = setDestinationVolume(destination, -81);
    expect(result).toBe(null);
    setTimeout(() => {
      expect(destination.volume.value).toBe(initialVolume);
    }, 100);
  });

  test("volume > 0", () => {
    const destination = Tone.getDestination();
    const initialVolume = destination.volume.value;
    const result = setDestinationVolume(destination, 1);
    expect(result).toBe(null);
    setTimeout(() => {
      expect(destination.volume.value).toBe(initialVolume);
    }, 100);
  });

  test("volume = 0", () => {
    const destination = Tone.getDestination();
    const result = setDestinationVolume(destination, 0);
    expect(result).toBe(0);
    setTimeout(() => {
      expect(destination.volume.value).toBe(0);
    }, 100);
  });

  test("volume = -50", () => {
    const destination = Tone.getDestination();
    const result = setDestinationVolume(destination, -50);
    expect(result).toBe(-50);
    setTimeout(() => {
      expect(destination.volume.value).toBe(-50);
    }, 100);
  });

  test("volume = -80", () => {
    const destination = Tone.getDestination();
    const result = setDestinationVolume(destination, -80);
    expect(result).toBe(-Infinity);
    setTimeout(() => {
      expect(destination.volume.value).toBe(-Infinity);
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
    expect(slider).toHaveAttribute("aria-valuemin", `${MIN_VOLUME}`);
    expect(slider).toHaveAttribute("aria-valuemax", `${MAX_VOLUME}`);
  });
});
