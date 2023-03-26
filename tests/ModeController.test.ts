import { fireEvent, render } from "@testing-library/svelte";
import { get } from "svelte/store";
import ModeController from "../src/lib/ModeController.svelte";
import { mode } from "../src/lib/stores";

describe("ModeSwitcher component", () => {
  beforeEach(() => {
    mode.set("TONE");
  });

  afterEach(() => {
    mode.set("TONE");
  });

  it("changes the mode to 'ACRN' when 'ACRN' button is clicked", async () => {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore */
    const { getByText } = render(ModeController);

    // Check the initial mode
    expect(get(mode)).toBe("TONE");

    // Click the ACRN button to change the mode
    const acrnButton = getByText("ACRN");
    await fireEvent.click(acrnButton);
    expect(get(mode)).toBe("ACRN");
  });

  it("changes the mode to 'TONE' when 'Tone' button is clicked", async () => {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore */
    const { getByText } = render(ModeController);

    // Check the initial mode
    expect(get(mode)).toBe("TONE");

    // Click the ACRN button first to change the mode
    const acrnButton = getByText("ACRN");
    await fireEvent.click(acrnButton);
    expect(get(mode)).toBe("ACRN");

    // Click the TONE button to change the mode back to TONE
    const toneButton = getByText("Tone");
    await fireEvent.click(toneButton);
    expect(get(mode)).toBe("TONE");
  });
});
