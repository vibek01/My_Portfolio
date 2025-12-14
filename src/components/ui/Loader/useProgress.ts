import { useState, useEffect } from "react";
import { useLoader } from "./LoaderContext";

export const useProgress = () => {
  const [progress, setProgress] = useState(0);
  const { isPlaying } = useLoader();

  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const jump = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + jump, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return progress;
};