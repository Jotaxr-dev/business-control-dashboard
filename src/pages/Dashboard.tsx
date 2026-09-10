import { MetricCard } from "../components/MetricCard";

interface Metric {
  title: string;
  value: string;
  description: string;
}

const metrics: Metric[] = [
  {
    title: "Clientes",
    value: "1.248",
    description: "+12% em relação ao mês passado",
  },
  {
    title: "Produtos",
    value: "356",
    description: "24 produtos adicionados este mês",
  },
  {
    title: "Vendas",
    value: "R$ 24.580",
    description: "+18% em relação ao mês passado",
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
            />
          ))}
        </div>
      </div>
    </>
  );
}
