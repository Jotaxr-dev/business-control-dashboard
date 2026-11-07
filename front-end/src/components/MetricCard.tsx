
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

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
  const isNeutral = variation === 0;

  const variationColor = isPositive
    ? "text-emerald-500"
    : isNegative
      ? "text-destructive"
      : "text-muted-foreground";

  const variationLabel =
    variation !== undefined
      ? `${variation > 0 ? "+" : ""}${variation}%`
      : null;

  return (
    <article className="group rounded-xl border border-border/60 bg-card p-5 text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">
        {title}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <h2 className="min-w-0 break-words text-2xl font-semibold tracking-tight text-card-foreground sm:text-3xl">
          {value}
        </h2>

        {variationLabel !== null && (
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium ${variationColor}`}
            aria-label={`Variação de ${variationLabel}`}
          >
            {isPositive && (
              <TrendingUp aria-hidden="true" className="size-3.5" />
            )}

            {isNegative && (
              <TrendingDown aria-hidden="true" className="size-3.5" />
            )}

            {isNeutral && (
              <Minus aria-hidden="true" className="size-3.5" />
            )}

            {variationLabel}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </article>
  );
}
