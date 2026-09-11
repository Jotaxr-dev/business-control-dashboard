import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { salesData } from "../data/dashboard";

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
            <LineChart data={salesData}>
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
