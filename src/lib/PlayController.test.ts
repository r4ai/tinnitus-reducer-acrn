import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { get } from "svelte/store";
import PlayController from "./PlayController.svelte";
import { isPlaying } from "./stores";

describe("PlayController.svelte", async () => {
  test("check does playButton work", async () => {
    render(PlayController);

    const button = screen.getByText("Play");
    expect(button).toBeInTheDocument();
    expect(get(isPlaying)).toBe(false);

    await fireEvent.click(button);
    expect(button).toHaveTextContent("Stop");
    expect(get(isPlaying)).toBe(true);
  });
});
