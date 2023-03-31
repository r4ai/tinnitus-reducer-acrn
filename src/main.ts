import App from "./App.svelte";
import "./styles.css";

const app = new App({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  target: document.getElementById("app")!,
});

export default app;
