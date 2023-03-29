<script lang="ts">
  import { theme } from "./stores.js";
  import { Icon, Moon, Sun } from "svelte-hero-icons";

  function handleSwitchDarkMode() {
    if ($theme === "dark") {
      $theme = "light";
    } else {
      $theme = "dark";
    }
  }
</script>

<label class="swap-rotate swap btn-ghost btn-sm btn-circle btn">
  <input
    type="checkbox"
    checked={$theme === "dark"}
    on:click={handleSwitchDarkMode}
    aria-label="Switch color theme"
  />
  <Icon
    src={Moon}
    size="20"
    class="swap-off m-auto text-black dark:text-white"
  />
  <Icon src={Sun} size="24" class="swap-on m-auto text-black dark:text-white" />
</label>

<style>
</style>
