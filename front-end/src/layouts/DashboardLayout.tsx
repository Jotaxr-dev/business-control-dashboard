import { motion } from "motion/react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  PanelLeft,
  Bell,
  Search,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    to: "/",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Produtos",
    to: "/products",
    icon: Package,
  },
  {
    name: "Clientes",
    to: "/customers",
    icon: Users,
  },
  {
    name: "Configurações",
    to: "/settings",
    icon: Settings,
  },
];

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border/60 bg-sidebar md:flex md:flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            <PanelLeft className="size-4" />
          </motion.div>

          <div>
            <p className="text-sm font-semibold tracking-tight">
              Business Control
            </p>

            <p className="text-[11px] text-muted-foreground">
              Gestão empresarial
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Menu
          </p>

          <div className="space-y-1">
            {navigation.map(({ name, to, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className="group relative block"
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.15 }}
                    className={[
                      "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "text-sidebar-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    ].join(" ")}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-navigation"
                        className="absolute inset-0 rounded-xl bg-sidebar-accent"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10 flex size-8 items-center justify-center rounded-lg">
                      <Icon
                        className={[
                          "size-4",
                          isActive
                            ? "text-sidebar-primary"
                            : "text-muted-foreground",
                        ].join(" ")}
                      />
                    </span>

                    <span className="relative z-10">{name}</span>

                    {isActive && (
                      <motion.span
                        layoutId="active-dot"
                        className="relative z-10 ml-auto size-1.5 rounded-full bg-sidebar-primary"
                      />
                    )}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3">
            <p className="text-xs font-medium">Business Control</p>

            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Seu painel de gestão em um só lugar.
            </p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-8">
          <div className="flex w-full items-center justify-between">
            {/* Mobile brand */}
            <div className="flex items-center gap-3 md:hidden">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <PanelLeft className="size-4" />
              </div>

              <span className="text-sm font-semibold">Business Control</span>
            </div>

            {/* Desktop search */}
            <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
              <Search className="size-4" />
              <span>Gestão do negócio</span>
            </div>

            {/* Header actions */}
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Bell className="size-4" />
              </button>

              <div className="ml-1 flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                JX
              </div>
            </div>
          </div>
        </header>

        {/* Mobile navigation */}
        <nav className="flex gap-2 overflow-x-auto border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl md:hidden">
          {navigation.map(({ name, to, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}>
              {({ isActive }) => (
                <motion.div
                  whileTap={{ scale: 0.96 }}
                  className={[
                    "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  ].join(" ")}
                >
                  <Icon className="size-4" />
                  {name}
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Page */}
        <main className="min-h-[calc(100vh-4rem)] p-4 md:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
