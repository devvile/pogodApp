import { RouterProvider } from "react-router";
import HydrationBoundary from "./components/HydrationBoundry";
import type { DataRouter } from "react-router-dom";
import { Provider} from "react-redux";
import type { Store } from "@reduxjs/toolkit";
interface AppProps {
  router: DataRouter;
  store: Store;
}

function App({ router, store }: AppProps) {
  return (
    <HydrationBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HydrationBoundary>
  );
}

export default App;
