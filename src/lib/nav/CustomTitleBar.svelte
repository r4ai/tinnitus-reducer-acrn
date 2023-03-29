<script lang="ts">
  import { onMount, type SvelteComponent } from "svelte";
  import { Icon, Minus, XMark, ArrowsPointingOut } from "svelte-hero-icons";
  import { type } from "@tauri-apps/api/os";
  import { appWindow } from "@tauri-apps/api/window";

  let isWindows = false;

  async function checkIsWindows() {
    const osType = await type();
    isWindows = osType === "Windows_NT";
  }

  type WindowButtons = {
    src: SvelteComponent;
    label: "Minimize" | "Maximize" | "Close";
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
      label: "Maximize",
      onClick: appWindow.maximize,
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
