import HomePage from "@/pages/home/Home";
import NotFound from "@/pages/NotFound";
import CityPage from "@/pages/city/City";
import ErrorPage from "@/pages/ErrorPage";
export const routes = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/:city",
        element: <CityPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
