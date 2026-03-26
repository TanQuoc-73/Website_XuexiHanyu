interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ value, max = 100, label, className = "" }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-zinc-600">{label}</span>
          <span className="font-medium text-zinc-900">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2.5 w-full rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-red-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
