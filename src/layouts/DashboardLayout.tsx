import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  PanelLeft,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", to: "/", icon: LayoutDashboard, end: true },
  { name: "Produtos", to: "/products", icon: Package },
  { name: "Clientes", to: "/customers", icon: Users },
  { name: "Configurações", to: "/settings", icon: Settings },
];

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-16 items-center gap-3 border-b px-6">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PanelLeft className="size-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Business Control
          </span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Menu
          </p>

          {navigation.map(({ name, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                ].join(" ")
              }
            >
              <Icon className="size-4 shrink-0" />
              {name}
            </NavLink>
          ))}
        </nav>

        <div className="border-t p-4">
          <p className="text-xs text-muted-foreground">
            Painel de gestão empresarial
          </p>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3 md:hidden">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PanelLeft className="size-5" />
            </div>
            <span className="font-semibold">Business Control</span>
          </div>

          <div className="hidden text-sm text-muted-foreground md:block">
            Gestão do negócio
          </div>
        </header>

        <nav className="flex gap-2 overflow-x-auto border-b bg-background px-4 py-3 md:hidden">
          {navigation.map(({ name, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                ].join(" ")
              }
            >
              <Icon className="size-4" />
              {name}
            </NavLink>
          ))}
        </nav>

        <main className="p-4 md:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
