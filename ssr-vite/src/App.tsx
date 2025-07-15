import { RouterProvider } from "react-router";
import HydrationBoundary from "./components/HydrationBoundry";
import type { DataRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Store } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";
interface AppProps {
  router: DataRouter;
  store: Store;
}

function App({ router, store }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <HydrationBoundary>
          <RouterProvider router={router} />
        </HydrationBoundary>
        <Toaster position={"bottom-center"} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
