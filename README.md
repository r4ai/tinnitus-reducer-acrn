
<h1 align="center">Tinnitus Reducer ACRN</h1>

<p align="center">
This is a simple app to help you reduce your tinnitus using <br /> ACRN (= Acoustic Coordinated Reset Neuromodulation) treatment.
</p>
<p align="center">
  <img src=".github/imgs/app_image.png" width=85% />
</p>

## How to install

This app is available as:

- Desktop app:
  - Windows
  - macOS
  - Linux
- Web app: https://r4ai.github.io/tinnitus-reducer-acrn/

For desktop app, you can download the app installer from [Releases](https://github.com/r4ai/tinnitus-reducer-acrn/releases/latest) page.

There are no mobile apps yet, but I am planning to make one.

## Caution

- I am not a doctor. I am not responsible for any worsening of symptoms by using this application.

## References

This app is heavily inspired by following softwares:

- [headphonejames/acrn](https://github.com/headphonejames/acrn)
- [headphonejames/acrn-react](https://github.com/headphonejames/acrn-react)

## About ACRN

### Paper

- [Impact of acoustic coordinated reset neuromodulation on effective connectivity in a neural network of phantom sound | ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1053811913002553)

### Threads

- [Acoustic CR® Neuromodulation: a New Treatment for Tinnitus | TinnitusTalk](https://www.tinnitustalk.com/threads/acoustic-cr%C2%AE-neuromodulation-a-new-treatment-for-tinnitus.219/)
- [Success Using the Acoustic Coordinated Reset Neuromodulation (ACRN) Treatment | TinnitusTalk](https://www.tinnitustalk.com/threads/success-using-the-acoustic-coordinated-reset-neuromodulation-acrn-treatment.21747/)
- [Maybe old but this video is a great reminder of how ACRN works to reduce tinnitus. | Reddit](https://www.reddit.com/r/tinnitus/comments/8u52we/maybe_old_but_this_video_is_a_great_reminder_of)

## Development

I do not have a Linux machine and therefore cannot test the Linux version of the app. If you find any bugs, please open an issue and let me know. Even on other operating systems, if you find any problems, please let me know.

If you have any ideas you would like to see implemented in this app, feel free to open a new issue and let me know. **Any kinds of contributions are welcome!!**

### Commands

```bash
# Install dependencies
$ pnpm i

# Run the dev app
$ pnpm tauri dev

# Build the app
$ pnpm tauri build
```

### Technology stack

- Framework: [Tauri](https://tauri.studio/)
- Frontend:
  - Language: TypeScript
  - Framework: Svelte
  - Audio: [tone.js](https://tonejs.github.io/)
  - UI: TailwindCSS, DaisyUI, svelte-range-slider-pips
  - Icons: Fluent Emoji, Heroicons
- Backend:
  - Language: Rust

### Visualized repository

![Visualized repository](https://r4ai.github.io/tinnitus-reducer-acrn/visualized-repo.svg)

## License

This software is licensed under the MIT License. See [LICENSE](LICENSE) for more information.

The app icon uses Fluent Emoji, which is published by Microsoft under the MIT License. The full license can be found in ThirdPartyNotices.txt.
