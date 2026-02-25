// components/UI/Toast/Toast.tsx
import { useEffect, useState } from "react";

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
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) return;

    setProgress(100);

    const animation = setTimeout(() => {
      setProgress(0);
    }, 10); // pequeño delay para activar transición

    const timer = setTimeout(onClose, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(animation);
    };
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 inset-x-0 flex justify-center z-50 px-4 sm:top-6">
      <div
        className={`relative overflow-hidden w-full max-w-sm sm:max-w-md px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg text-white ft-medium text-sm sm:text-base animate-slide-in ${styles[type]}`}
      >
        {message}

        {/* Línea de carga */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/30">
          <div
            className="h-full bg-white transition-all linear"
            style={{
              width: `${progress}%`,
              transitionDuration: `${duration}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
