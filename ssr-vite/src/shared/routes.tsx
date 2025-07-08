import HomePage from "../pages/Home";
import NotFound from "../pages/NotFound";
import CityPage from "../pages/City";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:city",
    element: <CityPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];