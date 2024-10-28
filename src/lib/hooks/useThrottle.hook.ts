import { useCallback, useRef } from "react";

/**
 * useThrottle - A hook that throttles a function call.
 *
 * @param callback - The function to be throttled.
 * @param delay - The throttle delay in milliseconds.
 * @returns - The throttled function.
 */
function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = new Date().getTime();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  ) as T;
}

export default useThrottle;
