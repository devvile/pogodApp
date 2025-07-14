import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import App from "./App";
import { createStore } from "./store";
import { routes } from "./routes/routes";
import "./index.css";

let preloadedState = undefined;
if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
  preloadedState = window.__PRELOADED_STATE__;
  // Clean up to prevent memory leaks
  delete window.__PRELOADED_STATE__;
}

const router = createBrowserRouter(routes);
const store = createStore(preloadedState);

hydrateRoot(
  document.getElementById("root"),
  <App router={router} store={store}/>
);