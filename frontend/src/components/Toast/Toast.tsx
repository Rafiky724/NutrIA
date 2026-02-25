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
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    setProgressKey((prev) => prev + 1);

    const timer = setTimeout(onClose, duration);

    return () => clearTimeout(timer);
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
            key={progressKey}
            className="h-full bg-white"
            style={{
              width: "100%",
              animation: `toast-progress ${duration}ms linear forwards`,
            }}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes toast-progress {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
    </div>
  );
}
