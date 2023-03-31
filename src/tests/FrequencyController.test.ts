import "@testing-library/jest-dom";
import { fireEvent, getByRole, render } from "@testing-library/svelte";
import { get } from "svelte/store";
import FrequencyController from "../lib/FrequencyController.svelte";
import {
  INITIAL_FREQUENCY,
  MAX_FREQUENCY,
  MIN_FREQUENCY,
} from "../lib/constants.js";
import { frequency } from "../lib/stores.js";

describe("FrequencyController", () => {
  test("min and max should be 0 and 15000", async () => {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore */
    const { container } = render(FrequencyController);

    // * Render Slider
    const slider = getByRole(container, "slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuenow", `${INITIAL_FREQUENCY}`);

    // Assert
    expect(slider).toHaveAttribute("aria-valuemin", `${MIN_FREQUENCY}`);
    expect(slider).toHaveAttribute("aria-valuemax", `${MAX_FREQUENCY}`);
  });

  test("number input should have min and max values of 0 and 15000", async () => {
    // Arrange
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore */
    render(FrequencyController);

    // Assert
    const numberInput = document.querySelector("input[type='number']");
    expect(numberInput).toHaveAttribute("min", "0");
    expect(numberInput).toHaveAttribute("max", "15000");
  });

  test("change frequency", async () => {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore */
    const { container } = render(FrequencyController);

    const input = getByRole(container, "spinbutton");
    expect(input).toBeInTheDocument();
    expect(get(frequency)[0]).toBe(INITIAL_FREQUENCY);

    await fireEvent.input(input, { target: { value: "10000" } });
    expect(get(frequency)[0]).toBe(10000);

    await fireEvent.input(input, { target: { value: "0" } });
    expect(get(frequency)[0]).toBe(0);

    await fireEvent.input(input, { target: { value: "15000" } });
    expect(get(frequency)[0]).toBe(15000);
  });
});
