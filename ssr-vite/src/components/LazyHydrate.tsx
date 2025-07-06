import { Suspense, lazy, useEffect, useState } from 'react';

interface LazyHydrateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LazyComponent = lazy(() => 
  Promise.resolve({ 
    default: ({ children }: { children: React.ReactNode }) => <>{children}</> 
  })
);

export default function LazyHydrate({ children, fallback }: LazyHydrateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      <LazyComponent>{children}</LazyComponent>
    </Suspense>
  );
}
