import { activities } from "../data/dashboard";

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
