import HomePage from "../pages/home/Home";
import NotFound from "../pages/NotFound";
import CityPage from "../pages/city/City";

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