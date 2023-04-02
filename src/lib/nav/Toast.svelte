<script lang="ts" context="module">
  import { onMount } from "svelte";
  import {
    Icon,
    InformationCircle,
    ExclamationTriangle,
    XCircle,
    XMark,
    CheckCircle,
  } from "svelte-hero-icons";
  import { writable } from "svelte/store";

  export type Type = "error" | "success" | "info" | "warning";
  export function showToast(type: Type, msg: string, duration: number) {
    visible.set(true);
    message.set(msg);
    toastType.set(type);
    setTimeout(() => {
      visible.set(false);
    }, duration);
  }

  const visible = writable(false);
  const message = writable("");
  const toastType = writable<Type>("info");
</script>

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { match } from "ts-pattern";

  let Toast: HTMLDivElement | undefined = undefined;
  let y = 20;
  let bgColor = "bg-base-100";

  onMount(() => {
    y = parseInt(Toast?.style?.height || `${y}`);
  });

  $: match($toastType)
    .with("error", () => {
      bgColor = "bg-error";
    })
    .with("success", () => {
      bgColor = "bg-success";
    })
    .with("info", () => {
      bgColor = "bg-info";
    })
    .with("warning", () => {
      bgColor = "bg-warning";
    })
    .exhaustive();

  function handleCloseBtnClick() {
    visible.set(false);
  }
</script>

{#if $visible}
  <div
    bind:this={Toast}
    in:fly={{ y, duration: 400 }}
    out:fade
    class="fixed bottom-0 z-10 w-full"
  >
    <div
      class={`min-h-16 relative mx-auto flex w-full max-w-md items-center rounded-2xl shadow-lg ${bgColor} `}
    >
      <div class="flex w-full flex-row items-center gap-2 overflow-hidden p-4">
        <Icon
          src={match($toastType)
            .with("error", () => XCircle)
            .with("success", () => CheckCircle)
            .with("info", () => InformationCircle)
            .with("warning", () => ExclamationTriangle)
            .exhaustive()}
          class="h-6 w-6 flex-none text-black"
        />
        <span class="text-md overflow-auto font-mono text-black"
          >{$message}</span
        >
      </div>

      <div class="absolute top-0 right-0 mr-2 mt-2">
        <button
          class="btn-ghost btn-xs btn-circle btn"
          on:click={handleCloseBtnClick}
        >
          <Icon src={XMark} class="h-6 w-6 text-black" mini />
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
</style>
