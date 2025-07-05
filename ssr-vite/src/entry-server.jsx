import { renderToString } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { routes } from "./shared/routes";

export async function render(url) {
  const router = createMemoryRouter(routes, {
    initialEntries: [url],
  });
  
  const html = renderToString(<RouterProvider router={router} />);
  
  return html;
}