import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", sales: 12000 },
  { month: "Fev", sales: 15000 },
  { month: "Mar", sales: 13500 },
  { month: "Abr", sales: 18000 },
  { month: "Mai", sales: 21000 },
  { month: "Jun", sales: 24580 },
];

export function SalesChart() {
  return (
    <>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Vendas</h2>

          <p className="text-sm text-gray-500">
            Evolução das vendas nos últimos meses
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />
              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `R$ ${Number(value).toLocaleString("pt-BR")}`
                }
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="currentColor"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
