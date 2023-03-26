import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { get } from "svelte/store";
import PlayController from "../lib/PlayController.svelte";
import { isPlaying } from "../lib/stores";

describe("PlayController.svelte", async () => {
  test("check does playButton work", async () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore */
    render(PlayController);

    const button = screen.getByText("Play");
    expect(button).toBeInTheDocument();
    expect(get(isPlaying)).toBe(false);

    await fireEvent.click(button);
    expect(button).toHaveTextContent("Stop");
    expect(get(isPlaying)).toBe(true);

    await fireEvent.click(button);
    expect(button).toHaveTextContent("Play");
    expect(get(isPlaying)).toBe(false);
  });
});
