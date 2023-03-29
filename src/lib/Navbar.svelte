<script lang="ts">
  import { Icon, Bars3, Moon, Sun } from "svelte-hero-icons";
  import GithubBrand from "svelte-awesome-icons/GithubBrand.svelte";
  import { theme } from "./stores.js";

  function handleSwitchDarkMode() {
    if ($theme === "dark") {
      $theme = "light";
    } else {
      $theme = "dark";
    }
  }
</script>

<nav
  class="sticky top-0 w-full py-2 px-4 text-white backdrop-blur-lg dark:backdrop-brightness-90"
>
  <div data-tauri-drag-region class="title-bar gap-4">
    <div class="menu-button">
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
    <div class="right-buttons flex flex-row gap-4">
      <!-- <label class="swap-rotate swap btn-ghost btn-sm btn-circle btn">
        <input
          type="checkbox"
          checked={$theme === "dark"}
          on:click={handleSwitchDarkMode}
        />
        <Icon
          src={Moon}
          size="20"
          class="swap-off m-auto text-black dark:text-white"
        />
        <Icon
          src={Sun}
          size="24"
          class="swap-on m-auto text-black dark:text-white"
        />
      </label> -->
    </div>
  </div>
</nav>

<style>
  .title-bar {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    grid-template-rows: auto;
    grid-template-areas: "menu title spacer right";
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
</style>
