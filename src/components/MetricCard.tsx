import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  variation?: number;
}

export function MetricCard({
  title,
  value,
  description,
  variation,
}: MetricCardProps) {
  const isPositive = variation !== undefined && variation > 0;
  const isNegative = variation !== undefined && variation < 0;

  const variationColor = isPositive
    ? "text-emerald-600"
    : isNegative
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>

      <div className="mt-3 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {value}
        </h2>

        {variation !== undefined && (
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium ${variationColor}`}
          >
            {isPositive ? (
              <TrendingUp aria-hidden="true" className="size-3.5" />
            ) : isNegative ? (
              <TrendingDown aria-hidden="true" className="size-3.5" />
            ) : null}
            {isPositive ? "+" : ""}
            {variation}%
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
