import { renderToString } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { routes } from "./shared/routes";
import "./index.css"
export async function render(url) {
  // Create memory router for SSR (no DOM access needed)
  const router = createMemoryRouter(routes, {
    initialEntries: [url],
  });
  
  // Render the app with the router
  const html = renderToString(<RouterProvider router={router} />);
  
  return html;
}