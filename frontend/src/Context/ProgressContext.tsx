import { createContext, useContext, useEffect, useState } from "react";
import {
  getUserProgress,
  type UserProgressResponse,
} from "../services/userService";

type ProgressContextType = {
  progress: UserProgressResponse | null;
  loading: boolean;
  refreshProgress: () => Promise<void>;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export const ProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [progress, setProgress] = useState<UserProgressResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProgress = async () => {
    try {
      setLoading(true);
      const data = await getUserProgress();
      setProgress(data);
    } catch (error) {
      console.error("Error obteniendo progreso:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  return (
    <ProgressContext.Provider value={{ progress, loading, refreshProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context)
    throw new Error("useProgress debe usarse dentro de ProgressProvider");
  return context;
};
