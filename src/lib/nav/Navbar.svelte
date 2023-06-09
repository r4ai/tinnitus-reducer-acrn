<script lang="ts">
  import { Icon, Bars3BottomLeft } from "svelte-hero-icons";
  import ToggleThemeButton from "./menu/ToggleThemeButton.svelte";
  import CustomTitleBar from "./CustomTitleBar.svelte";
  import { isTauri } from "../utils";
  import GitHubMark from "../icons/GitHubMark.svelte";
  import ExportConfigButton from "./menu/ExportConfigButton.svelte";
  import ImportConfigButton from "./menu/ImportConfigButton.svelte";
  import ResetConfigButton from "./menu/ResetConfigButton.svelte";
  import TimerButton from "./menu/TimerButton.svelte";
</script>

<nav
  class="fixed top-0 z-40 w-full text-white backdrop-blur-lg dark:backdrop-brightness-90"
>
  <div
    data-tauri-drag-region
    class={`title-bar gap-4 ${isTauri() ? "" : "mx-auto h-14 max-w-3xl"} `}
  >
    <div class="menu-button pl-4">
      <div class="dropdown">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <label
          tabindex="0"
          class={`btn-ghost ${isTauri() ? "btn-sm" : "btn-md"} btn-circle btn`}
          for="menu"
        >
          <Icon
            src={Bars3BottomLeft}
            size={isTauri() ? "24" : "30"}
            class="text-black dark:text-white"
          />
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box menu-compact mt-3 w-52 border bg-base-100 p-2 text-black shadow backdrop-blur-md dark:border-gray-600 dark:text-white"
          id="menu"
        >
          <li><ToggleThemeButton /></li>
          {#if isTauri()}
            <li><ExportConfigButton /></li>
            <li><ImportConfigButton /></li>
          {/if}
          <li><ResetConfigButton /></li>
          <li><TimerButton /></li>
        </ul>
      </div>
    </div>
    <div class="title-text flex flex-row items-center gap-2">
      <span
        class={`ml-1 font-serif text-black dark:text-white ${
          isTauri() ? "text-md" : "text-lg"
        } `}>Tinnitus Reducer ACRN</span
      >
      <a
        class="btn-ghost btn-sm btn-circle btn"
        href="https://github.com/r4ai/tinnitus-reducer-acrn"
        target="_blank"
      >
        <GitHubMark class="w-6 text-black dark:text-white" />
      </a>
    </div>
    <div class="spacer" />
    <div class="right-buttons flex flex-row gap-4" />
    <div class="window-buttons">
      <CustomTitleBar />
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
