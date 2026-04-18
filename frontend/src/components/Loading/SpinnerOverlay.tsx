interface SpinnerOverlayProps {
  isOpen: boolean;
  message?: string;
}

export default function SpinnerOverlay({ isOpen }: SpinnerOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-yellow-300 border-t-yellow-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
