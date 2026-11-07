
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

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

const currentSales = salesData[salesData.length - 1]?.sales ?? 0;
const previousSales =
  salesData.length > 1
    ? salesData[salesData.length - 2].sales
    : null;

const variation =
  previousSales !== null && previousSales !== 0
    ? ((currentSales - previousSales) / Math.abs(previousSales)) * 100
    : null;

const formattedVariation =
  variation === null
    ? null
    : `${variation > 0 ? "+" : ""}${variation.toLocaleString("pt-BR", {
        maximumFractionDigits: 1,
      })}%`;

export function SalesChart() {
  const isPositive = variation !== null && variation > 0;
  const isNegative = variation !== null && variation < 0;

  return (
    <Card className="border-border/60 bg-card text-card-foreground shadow-sm">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-foreground">Vendas</CardTitle>
          <CardDescription className="mt-1 text-muted-foreground">
            Evolução das vendas nos últimos meses
          </CardDescription>
        </div>

        <div className="sm:text-right">
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {currencyFormatter.format(currentSales)}
          </p>

          {formattedVariation !== null && (
            <p
              className={`mt-1 text-sm font-medium ${
                isPositive
                  ? "text-emerald-500"
                  : isNegative
                    ? "text-destructive"
                    : "text-muted-foreground"
              }`}
            >
              {formattedVariation} em relação ao mês anterior
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-72 w-full sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesData}
              margin={{ top: 12, right: 12, left: 4, bottom: 4 }}
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
                minTickGap={12}
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: 12,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={72}
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: 12,
                }}
                tickFormatter={(value: number) =>
                  compactCurrencyFormatter.format(value)
                }
              />

              <Tooltip
                cursor={{
                  stroke: "var(--border)",
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--popover-foreground)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
                }}
                labelStyle={{
                  color: "var(--popover-foreground)",
                  marginBottom: 4,
                }}
                itemStyle={{
                  color: "var(--popover-foreground)",
                }}
                formatter={(value) => [
                  currencyFormatter.format(Number(value)),
                  "Vendas",
                ]}
              />

              <Line
                type="monotone"
                dataKey="sales"
                name="Vendas"
                stroke="var(--primary)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "var(--primary)",
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
                isAnimationActive
                animationDuration={700}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
