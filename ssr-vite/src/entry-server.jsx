import { renderToString } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { routes } from "./shared/routes";
import HydrationBoundry from "./components/HydrationBoundry";
export async function render(url) {
  const router = createMemoryRouter(routes, {
    initialEntries: [url],
  });

  const html = renderToString(
    <HydrationBoundry>
      <RouterProvider router={router} />
    </HydrationBoundry>
  );

  return html;
}
