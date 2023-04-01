<script lang="ts">
  import { onMount } from "svelte";
  import {
    Icon,
    Minus,
    XMark,
    ArrowsPointingOut,
    type IconSource,
  } from "svelte-hero-icons";
  import { type } from "@tauri-apps/api/os";
  import { appWindow } from "@tauri-apps/api/window";
  import { isTauri } from "../utils";

  let isWindows = false;

  async function checkIsWindows() {
    if (isTauri()) {
      const osType = await type();
      isWindows = osType === "Windows_NT";
    } else {
      isWindows = false;
    }
  }

  type WindowButtons = {
    src: IconSource;
    label: "Minimize" | "ToggleMaximize" | "Close";
    onClick: () => void;
  };
  const windowButtons: WindowButtons[] = [
    {
      src: Minus,
      label: "Minimize",
      onClick: appWindow.minimize,
    },
    {
      src: ArrowsPointingOut,
      label: "ToggleMaximize",
      onClick: appWindow.toggleMaximize,
    },
    {
      src: XMark,
      label: "Close",
      onClick: appWindow.close,
    },
  ];

  onMount(checkIsWindows);
</script>

{#if isWindows}
  {#each windowButtons as button}
    <button
      class={`py-1 px-3 text-black transition ${
        button.label === "Close" ? "hover:bg-red-500" : "hover:bg-black"
      } ${
        button.label === "Close"
          ? "hover:bg-opacity-100"
          : "hover:bg-opacity-20"
      } dark:text-white ${
        button.label === "Close"
          ? "dark:hover:bg-red-500"
          : "dark:hover:bg-white"
      } ${
        button.label === "Close"
          ? "dark:hover:bg-opacity-100"
          : "dark:hover:bg-opacity-20"
      }`}
      on:click={button.onClick}
      aria-label={button.label}
      tabindex="-1"
    >
      <Icon src={button.src} size="20" mini />
    </button>
  {/each}
{/if}

<style>
</style>
