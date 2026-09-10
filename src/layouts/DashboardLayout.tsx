import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <header className="h-16 border-b bg-white">
          <div className="flex h-full items-center px-6">
            <h1 className="text-xl font-semibold">Business Control</h1>
          </div>
        </header>

        <div className="flex">
          <aside className="min-h-[calc(100vh-4rem)] w-64 border-r bg-white p-4">
            <nav>
              <ul className="space-y-2">
                <li>Dashboard</li>
                <li>Produtos</li>
                <li>Clíentes</li>
                <li>Configurações</li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
