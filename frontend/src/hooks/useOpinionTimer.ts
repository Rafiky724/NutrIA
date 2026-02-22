import { useState, useEffect } from "react";

export const useOpinionTimer = (opinion_ia?: string) => {
    const [showOpinion, setShowOpinion] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!opinion_ia) return;

        setShowOpinion(true);
        setProgress(0);

        const interval = 50; // ms
        const duration = 4000; // total 4 segundos
        const increment = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev + increment >= 100) {
                    clearInterval(timer);
                    setShowOpinion(false);
                    return 100;
                }
                return prev + increment;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [opinion_ia]);

    return { showOpinion, progress };
};