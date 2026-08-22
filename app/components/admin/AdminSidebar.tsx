"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Store,
  Users,
  Package,
  BarChart3,
  Percent,
  RotateCcw,
  Wallet,
  FileText,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Vendors",
    href: "/admin/vendors",
    icon: Store,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Commissions",
    href: "/admin/commissions",
    icon: Percent,
  },
  {
    title: "Refunds",
    href: "/admin/refunds",
    icon: RotateCcw,
  },
  {
    title: "Payouts",
    href: "/admin/payouts",
    icon: Wallet,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  setMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const navigation = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link
          href="/admin"
          className="text-xl font-bold"
          onClick={() => setMobileOpen?.(false)}
        >
          Vendora
          <span className="ml-1 text-muted-foreground">
            Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen?.(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          ← Back to Store
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-background md:block">
        {navigation}
      </aside>

      <div className={mobileOpen ? "md:hidden" : "hidden"}>
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen?.(false)}
        />

        <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-background">
          {navigation}
        </aside>
      </div>
    </>
  );
}