<script lang="ts">
  import {
    getDefaultSettingsPath,
    loadSettings,
    updateStores,
  } from "@/lib/settings";
  import { isTauri } from "@/lib/utils";
  import { Icon, DocumentArrowDown } from "svelte-hero-icons";
  import { showToast } from "../Toast.svelte";

  async function importConfig() {
    if (isTauri()) {
      const { open } = await import("@tauri-apps/api/dialog");

      const filePath = await open({
        title: "Import Configuration",
        multiple: false,
        defaultPath: await getDefaultSettingsPath(),
        filters: [
          {
            name: "JSON",
            extensions: ["json"],
          },
        ],
      });

      if (filePath && typeof filePath === "string" && filePath.length > 0) {
        const loadedSettings = await loadSettings(filePath);
        updateStores(loadedSettings);
      } else {
        throw new Error("Invalid file path.");
      }

      return filePath;
    }
  }

  async function handleClick() {
    try {
      const filePath = await importConfig();
      showToast("success", `Config imported from ${filePath}`, 12000);
    } catch (error) {
      console.error(error);
      showToast("error", `${error}`, 12000);
    }
  }
</script>

{#if isTauri()}
  <button on:click={handleClick}>
    <Icon
      size="24"
      src={DocumentArrowDown}
      class="text-black dark:text-white"
    />
    <span>Import Config</span>
  </button>
{/if}

<style>
</style>
