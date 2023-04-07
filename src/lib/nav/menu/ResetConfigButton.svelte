<script lang="ts">
  import { DEFAULT_SETTINGS } from "@/lib/constants";
  import { updateStores } from "@/lib/settings";
  import { Icon, ArrowPath } from "svelte-hero-icons";
  import { showToast } from "../Toast.svelte";
  import { theme } from "@/lib/stores";

  function resetConfig() {
    updateStores({ ...DEFAULT_SETTINGS, theme: $theme });
  }

  function handleClick() {
    try {
      resetConfig();
      showToast("success", "Config reset to default.", 12000);
    } catch (e) {
      showToast("error", "Failed to reset config.", 12000);
    }
  }
</script>

<button on:click={handleClick}>
  <Icon size="24" src={ArrowPath} class="text-black dark:text-white" />
  <span>Reset Config</span>
</button>

<style>
</style>
