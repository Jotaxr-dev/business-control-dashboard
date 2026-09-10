interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
}

export function MetricCard({ title, value, description }: MetricCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900">{value}</h2>

      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
