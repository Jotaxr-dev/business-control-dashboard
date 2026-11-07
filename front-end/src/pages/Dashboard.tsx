
import { MetricCard } from "../components/MetricCard";
import { SalesChart } from "../components/SalesChart";
import { RecentActivities } from "../components/RecentActivities";
import { metrics } from "../data/dashboard";

export function Dashboard() {
  return (
    <main className="w-full space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Dashboard
        </h1>

        <p className="text-sm text-muted-foreground sm:text-base">
          Visão geral do seu negócio.
        </p>
      </header>

      <section
        aria-label="Indicadores do negócio"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            variation={metric.variation}
          />
        ))}
      </section>

      <section aria-label="Desempenho de vendas">
        <SalesChart />
      </section>

      <section aria-label="Atividades recentes">
        <RecentActivities />
      </section>
    </main>
  );
}
