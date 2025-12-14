import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isPlaying: boolean;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children, isPlaying = true }: { children: ReactNode, isPlaying?: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading, isPlaying }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoader must be used within a LoaderProvider");
  return context;
};