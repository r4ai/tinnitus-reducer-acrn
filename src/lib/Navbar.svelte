<script lang="ts">
  import {
    Icon,
    Bars3,
    Minus,
    XMark,
    ArrowsPointingOut,
  } from "svelte-hero-icons";
  import GithubBrand from "svelte-awesome-icons/GithubBrand.svelte";
  import { theme } from "./stores.js";
  import { appWindow } from "@tauri-apps/api/window";

  const windowButtons = [
    {
      src: Minus,
      label: "Minimize",
      onClick: appWindow.minimize,
    },
    {
      src: ArrowsPointingOut,
      label: "Maximize",
      onClick: appWindow.maximize,
    },
    {
      src: XMark,
      label: "Close",
      onClick: appWindow.close,
    },
  ];
</script>

<nav
  class="fixed top-0 z-40 w-full text-white backdrop-blur-lg dark:backdrop-brightness-90"
>
  <div data-tauri-drag-region class="title-bar gap-4">
    <div class="menu-button pl-4">
      <button class="btn-ghost btn-sm btn-circle btn">
        <Icon src={Bars3} size="24" class="text-black dark:text-white" />
      </button>
    </div>
    <div class="title-text flex flex-row items-center gap-2">
      <span class="text-md ml-1 font-serif text-black dark:text-white"
        >Tinnitus Reducer ACRN</span
      >
      <a
        class="btn-ghost btn-sm btn-circle btn"
        href="https://github.com/r4ai/tinnitus-reducer-acrn"
        target="_blank"
      >
        <GithubBrand class="text-black dark:text-white" />
      </a>
    </div>
    <div class="spacer" />
    <div class="right-buttons flex flex-row gap-4" />
    <div class="window-buttons">
      {#each windowButtons as button}
        <button
          class="px-2 py-1 text-black hover:bg-black hover:bg-opacity-10 dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10"
          on:click={button.onClick}
          aria-label={button.label}
        >
          <Icon src={button.src} size="20" mini />
        </button>
      {/each}
    </div>
  </div>
</nav>

<style lang="postcss">
  .title-bar {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      "menu title spacer window"
      "menu title spacer right";
    align-items: center;
  }
  .menu-button {
    grid-area: menu;
  }
  .title-text {
    grid-area: title;
  }
  .spacer {
    grid-area: spacer;
  }
  .right-buttons {
    grid-area: right;
  }
  .window-buttons {
    grid-area: window;
  }
</style>
