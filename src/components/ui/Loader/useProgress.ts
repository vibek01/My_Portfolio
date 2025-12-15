import { useState, useEffect } from "react";
import { useLoader } from "./LoaderContext";

// =========================================================
// ⚡ SPEED CONTROL ⚡
// Change this number to set how long the loader takes (in ms)
// 2000 = 2 seconds, 3000 = 3 seconds, etc.
const LOADING_DURATION_MS = 2000; 
// =========================================================

export const useProgress = () => {
  const [progress, setProgress] = useState(0);
  const { isPlaying } = useLoader();

  useEffect(() => {
    // Reset if not playing
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    // Calculate the interval delay needed to reach 100% in the target duration.
    // We have 100 steps (0 to 100).
    // Interval = Total Duration / 100 steps.
    const stepDuration = LOADING_DURATION_MS / 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Stop if we reached 100
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment by 1 for smooth, continuous counting
        return prev + 1;
      });
    }, stepDuration);

    // Cleanup interval on unmount or if isPlaying changes
    return () => clearInterval(interval);
  }, [isPlaying]);

  return progress;
};