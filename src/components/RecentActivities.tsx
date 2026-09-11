interface Activity {
  id: number;
  description: string;
  date: string;
  type: "sale" | "customer" | "product";
}

const activities: Activity[] = [
  {
    id: 1,
    description: "Nova venda realizada",
    date: "Hoje, 10:32",
    type: "sale",
  },
  {
    id: 2,
    description: "Novo cliente cadastrado",
    date: "Hoje, 09:15",
    type: "customer",
  },
  {
    id: 3,
    description: "Produto adicionado ao estoque",
    date: "Ontem, 16:40",
    type: "product",
  },
  {
    id: 4,
    description: "Nova venda realizada",
    date: "Ontem, 14:22",
    type: "sale",
  },
];

export function RecentActivities() {
  return (
    <>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-500">
            Ativdades recentes
          </h2>

          <p className="text-sm text-gray-500">
            Últimas movimentações do sistema
          </p>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {activity.description}
                </p>

                <p className="mt-1 text-xs text-gray-500">{activity.date}</p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
