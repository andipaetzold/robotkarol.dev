import { lazy, Suspense } from "react";
import { Props } from "./types";

const Component = lazy(() => import("./component"));

export function View3D(props: Props) {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
}
