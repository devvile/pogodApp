import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import App from "./App";
import { routes } from "./shared/routes";
import "./index.css"
const router = createBrowserRouter(routes);

hydrateRoot(
  document.getElementById("root"),
  <App router={router} />
);