import HomePage from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
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
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];