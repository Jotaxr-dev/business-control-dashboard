import { MetricCard } from "../components/MetricCard";
import { SalesChart } from "../components/SalesChart";
import { RecentActivities } from "../components/RecentActivities";
import { metrics } from "../data/dashboard";

export function Dashboard() {
  return (
    <>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          <p className="mt-2 text-gray-600">Visão geral do seu negócio.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              description={metric.description}
              variation={metric.variation}
            />
          ))}
        </div>

        <div className="mt-6">
          <SalesChart />
        </div>

        <div className="mt-6">
          <RecentActivities />
        </div>
      </div>
    </>
  );
}
