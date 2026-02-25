import { useEffect, useRef, useState } from "react";

type ToastType = "error" | "success" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

const styles = {
  error: "bg-red-500",
  success: "bg-green-500",
  warning: "bg-yellow-500 text-brown",
  info: "bg-blue-500",
};

export default function Toast({
  message,
  type = "error",
  isOpen,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setProgressKey((prev) => prev + 1);

    timerRef.current = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen, duration]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 inset-x-0 flex justify-center z-50 px-4 sm:top-6">
      <div
        className={`relative overflow-hidden w-full max-w-sm sm:max-w-md px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg text-white text-sm sm:text-base animate-slide-in ${styles[type]}`}
      >
        {message}

        {/* Barra de progreso */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/30">
          <div
            key={progressKey}
            className="h-full bg-white animate-toast-progress"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
