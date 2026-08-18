"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Heart,
  Home,
  ShoppingBag,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: ShoppingBag,
  },
  {
    label: "Alerts",
    href: "/notifications",
    icon: Bell,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between">

        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex min-w-[52px] flex-col items-center gap-1"
            >
              {active && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute -top-3 h-[2px] w-5 rounded-full bg-white"
                />
              )}

              <motion.div
                whileTap={{ scale: 0.82 }}
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  active
                    ? "bg-white text-black"
                    : "text-white/30"
                }`}
              >
                <Icon size={16} />
              </motion.div>

              <span
                className={`text-[6px] uppercase tracking-wider ${
                  active
                    ? "text-white"
                    : "text-white/20"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

      </div>
    </nav>
  );
}