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
  const isPositive = variation !== undefined && variation >= 0;
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>

      <div className="mt-2 flex items-end justify-between gap-4">
        <h2 className="mt-2 text-2xl font-bold text-gray-900">{value}</h2>

        {variation !== undefined && (
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {variation}%
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
