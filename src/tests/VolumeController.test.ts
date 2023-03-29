import "@testing-library/jest-dom";
import { getByRole, render, waitFor } from "@testing-library/svelte";
import * as Tone from "tone";
import VolumeController, {
  setDestinationVolume,
} from "../lib/VolumeController.svelte";
import { INITIAL_VOLUME, MAX_VOLUME, MIN_VOLUME } from "../lib/constants";

describe("setDestinationVolume", () => {
  const MIN_INFTY_VOLUME = -140;
  test("volume < -80", async () => {
    const destination = Tone.getDestination();
    const initialVolume = destination.volume.value;
    const result = setDestinationVolume(destination, -81);
    expect(result).toBe(null);
    await waitFor(() => {
      expect(destination.volume.value).toBe(initialVolume);
    });
  });

  test("volume > 0", async () => {
    const destination = Tone.getDestination();
    const initialVolume = destination.volume.value;
    const result = setDestinationVolume(destination, 1);
    expect(result).toBe(null);
    await waitFor(() => {
      expect(destination.volume.value).toBe(initialVolume);
    });
  });

  test("volume = 0", async () => {
    const destination = Tone.getDestination();
    const result = setDestinationVolume(destination, 0);
    expect(result).toBe(0);
    await waitFor(() => {
      expect(destination.volume.value).toBe(0);
    });
  });

  test("volume = -50", async () => {
    const destination = Tone.getDestination();
    const result = setDestinationVolume(destination, -50);
    expect(result).toBe(-50);
    await waitFor(() => {
      expect(destination.volume.value).toBe(-50);
    });
  });

  test("volume = -80", async () => {
    const destination = Tone.getDestination();
    const result = setDestinationVolume(destination, -80);
    expect(result).toBe(-Infinity);
    await waitFor(() => {
      expect(destination.volume.value).toBe(MIN_INFTY_VOLUME);
    });
  });

  test("volume = NaN", async () => {
    const destination = Tone.getDestination();
    const result = setDestinationVolume(destination, NaN);
    expect(result).toBe(-Infinity);
    await waitFor(() => {
      expect(destination.volume.value).toBe(MIN_INFTY_VOLUME);
    });
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
