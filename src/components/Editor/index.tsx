import { lazy, Suspense } from "react";

const Component = lazy(() => import("./component"));

export function Editor() {
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}
