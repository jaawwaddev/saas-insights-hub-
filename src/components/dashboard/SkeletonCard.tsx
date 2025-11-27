import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
  lines?: number;
  showChart?: boolean;
}

export function SkeletonCard({ className, lines = 2, showChart = false }: SkeletonCardProps) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-6', className)}>
      <div className="space-y-4">
        <div className="h-4 w-24 rounded bg-muted animate-pulse" />
        <div className="h-8 w-32 rounded bg-muted animate-pulse" />
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 rounded bg-muted animate-pulse"
            style={{ width: `${60 + Math.random() * 30}%` }}
          />
        ))}
        {showChart && (
          <div className="mt-6 h-48 rounded-lg bg-muted/50 animate-pulse" />
        )}
      </div>
    </div>
  );
}

export function SkeletonMetricCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-muted animate-pulse" />
          <div className="h-8 w-28 rounded bg-muted animate-pulse" />
          <div className="h-3 w-16 rounded bg-muted animate-pulse" />
        </div>
        <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-6', className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-32 rounded bg-muted animate-pulse" />
          <div className="flex gap-2">
            <div className="h-8 w-16 rounded bg-muted animate-pulse" />
            <div className="h-8 w-16 rounded bg-muted animate-pulse" />
          </div>
        </div>
        <div className="h-72 rounded-lg bg-muted/50 animate-pulse" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 rounded bg-muted animate-pulse" />
          <div className="flex gap-2">
            <div className="h-9 w-32 rounded bg-muted animate-pulse" />
            <div className="h-9 w-24 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-muted animate-pulse" />
              <div className="h-3 w-48 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-6 w-20 rounded-full bg-muted animate-pulse" />
            <div className="h-4 w-16 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
