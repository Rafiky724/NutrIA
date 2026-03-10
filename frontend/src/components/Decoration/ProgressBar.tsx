interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div
      className="h-full bg-yellow rounded-l-sm transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  );
}
