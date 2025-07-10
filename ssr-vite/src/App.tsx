import { RouterProvider } from "react-router";
import HydrationBoundary from "./components/HydrationBoundry";
import type { DataRouter } from "react-router-dom";
import { Provider} from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Store } from "@reduxjs/toolkit";
interface AppProps {
  router: DataRouter;
  store: Store;
}

function App({ router, store }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <HydrationBoundary>
      <QueryClientProvider client = {queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      </QueryClientProvider>
    </HydrationBoundary>
  );
}

export default App;
