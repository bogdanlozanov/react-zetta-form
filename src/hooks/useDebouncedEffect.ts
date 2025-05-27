import { useEffect, useRef } from "react";

/**
 * Custom hook to debounce any side-effect callback.
 */
export const useDebouncedEffect = (
  effect: () => void,
  deps: unknown[],
  delay: number
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, deps);
};
