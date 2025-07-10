import { renderToString } from "react-dom/server";
import { createMemoryRouter } from "react-router";
import { routes } from "./shared/routes";
import { createStore } from "./store";
import App from "./App"; 

export async function render(url) {
  const store = createStore();
  const router = createMemoryRouter(routes, {
    initialEntries: [url],
  });


  const html = renderToString(
    <App router={router} store={store} />
  );

  const preloadedState = store.getState();
  return { html, preloadedState };
}