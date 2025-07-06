// App.tsx
import { RouterProvider } from "react-router";
import HydrationBoundary from "./components/HydrationBoundry";
import type { DataRouter } from "react-router-dom";
interface AppProps {
  router: DataRouter
}

function App({ router }: AppProps) {
  return (
    <HydrationBoundary>
      <RouterProvider router={router} />
    </HydrationBoundary>
  );
}

export default App;