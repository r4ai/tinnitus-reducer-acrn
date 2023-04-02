<script lang="ts">
  import {
    getDefaultSettingsPath,
    saveSettings,
    settingsCache,
  } from "@/lib/settings";
  import { isTauri } from "@/lib/utils";
  import { Icon, DocumentArrowUp } from "svelte-hero-icons";
  import { showToast } from "../Toast.svelte";

  async function exportConfig() {
    if (isTauri()) {
      const { save } = await import("@tauri-apps/api/dialog");

      const filePath = await save({
        title: "Export Configuration",
        defaultPath: await getDefaultSettingsPath(),
        filters: [
          {
            name: "JSON",
            extensions: ["json"],
          },
        ],
      });

      if (filePath && filePath.length > 0) {
        saveSettings($settingsCache, filePath);
      } else {
        showToast("error", "Invalid file path.", 12000);
        return;
      }

      showToast("success", `Config exported to ${filePath}`, 12000);
    }
  }
</script>

{#if isTauri()}
  <button on:click={exportConfig}>
    <Icon size="24" src={DocumentArrowUp} class="text-black dark:text-white" />
    <span>Export Config</span>
  </button>
{/if}

<style>
</style>
