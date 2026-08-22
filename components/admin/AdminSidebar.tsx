"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronRight,
  CircleDollarSign,
  LayoutDashboard,
  Package,
  RotateCcw,
  Settings,
  ShoppingCart,
  Store,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AdminSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const navigation = [
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
];

const managementNavigation = [
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Refunds",
    href: "/admin/refunds",
    icon: RotateCcw,
  },
  {
    title: "Commissions",
    href: "/admin/commissions",
    icon: CircleDollarSign,
  },
];

const financeNavigation = [
  {
    title: "Wallet & Payouts",
    href: "/admin/payouts",
    icon: Wallet,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
];

export default function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const renderNavigation = (
    items: typeof navigation
  ) => {
    return items.map((item) => {
      const Icon = item.icon;

      const isActive =
        item.href === "/admin"
          ? pathname === "/admin"
          : pathname.startsWith(item.href);

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileOpen(false)}
          className="block"
        >
          <Button
            variant={isActive ? "secondary" : "ghost"}
            className={`w-full justify-start gap-3 ${
              isActive ? "font-semibold" : ""
            }`}
          >
            <Icon className="h-4 w-4" />

            <span>{item.title}</span>

            {isActive && (
              <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </Button>
        </Link>
      );
    });
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-200 md:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-5">
          <Link
            href="/admin"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Store className="h-4 w-4" />
            </div>

            <div>
              <p className="font-bold">Vendora</p>
              <p className="text-xs text-muted-foreground">
                Admin Panel
              </p>
            </div>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto p-4">
          <div className="space-y-1">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Overview
            </p>

            {renderNavigation(navigation)}
          </div>

          <div className="space-y-1">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Management
            </p>

            {renderNavigation(managementNavigation)}
          </div>

          <div className="space-y-1">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Finance
            </p>

            {renderNavigation(financeNavigation)}
          </div>
        </nav>

        <Separator />

        {/* Settings */}
        <div className="p-4">
          <Link
            href="/profile"
            onClick={() => setMobileOpen(false)}
          >
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}