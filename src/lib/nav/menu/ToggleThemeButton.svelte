<script lang="ts">
  import { theme } from "../../stores.js";
  import { Icon, Moon, Sun } from "svelte-hero-icons";

  function handleSwitchDarkMode() {
    if ($theme === "dark") {
      $theme = "light";
    } else {
      $theme = "dark";
    }
  }
</script>

<button on:click={handleSwitchDarkMode}>
  <Icon
    size="24"
    src={$theme === "dark" ? Sun : Moon}
    class="text-black dark:text-white"
  />
  <span>Enable {$theme === "dark" ? "light" : "dark"} mode</span>
</button>

<style>
</style>
