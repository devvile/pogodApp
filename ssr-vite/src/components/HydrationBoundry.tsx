import { useEffect, useState } from "react";
import WelcomeSection from "../pages/home/components/WelcomeSection";
import LazyHydrate from "./LazyHydrate";
import { Loader } from "lucide-react";

export default function HydrationBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        <LazyHydrate fallback={<Loader />}>
          <WelcomeSection />
        </LazyHydrate>
      </div>
    );
  }

  return <>{children}</>;
}
