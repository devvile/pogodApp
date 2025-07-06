import { useEffect, useState } from "react";

export default function HydrationBoundary({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {

    setHydrated(true);
  }, []);

  if (!hydrated) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      </div>
    );
  }

  return <>{children}</>;
}
