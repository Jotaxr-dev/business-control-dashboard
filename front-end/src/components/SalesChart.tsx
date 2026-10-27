import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { salesData } from "../data/dashboard";

const currentSales = salesData[salesData.length - 1]?.sales ?? 0;

const formattedCurrentSales = currentSales.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function SalesChart() {
  return (
    <Card className="border-border/60 bg-card text-card-foreground">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-foreground">Vendas</CardTitle>

          <CardDescription className="mt-1 text-muted-foreground">
            Evolução das vendas nos últimos meses
          </CardDescription>
        </div>

        <div className="sm:text-right">
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {formattedCurrentSales}
          </p>

          <p className="mt-1 text-sm font-medium text-emerald-500">
            +18% em relação ao mês passado
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={75}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickFormatter={(value) =>
                  `R$ ${Number(value).toLocaleString("pt-BR")}`
                }
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--popover-foreground)",
                }}
                labelStyle={{
                  color: "var(--popover-foreground)",
                }}
                itemStyle={{
                  color: "var(--popover-foreground)",
                }}
                formatter={(value) => [
                  Number(value).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 0,
                  }),
                  "Vendas",
                ]}
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "var(--primary)",
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
