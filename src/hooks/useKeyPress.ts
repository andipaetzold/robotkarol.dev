import { RefObject, useEffect } from "react";

export function useKeyPress(
  ref: RefObject<HTMLElement | null>,
  actions: { [key: string]: () => void }
) {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const handler = (e: KeyboardEvent) => {
      actions[e.key]?.();
    };

    const current = ref.current;
    current.addEventListener("keydown", handler);

    return () => {
      current?.removeEventListener("keydown", handler);
    };
  }, [ref, actions]);
}
