import { useEffect } from "react";

export function useKeyPress(actions: { [key: string]: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      actions[e.key]?.();
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [actions]);
}
