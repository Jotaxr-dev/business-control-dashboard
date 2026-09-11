import { MetricCard } from "../components/MetricCard";
import { SalesChart } from "../components/SalesChart";
import { RecentActivities } from "../components/RecentActivities";

interface Metric {
  title: string;
  value: string;
  description: string;
  variation: number;
}

const metrics: Metric[] = [
  {
    title: "Clientes",
    value: "1.248",
    description: "+12% em relação ao mês passado",
    variation: 12,
  },
  {
    title: "Produtos",
    value: "356",
    description: "24 produtos adicionados este mês",
    variation: 8,
  },
  {
    title: "Vendas",
    value: "R$ 24.580",
    description: "+18% em relação ao mês passado",
    variation: 18,
  },
];

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
