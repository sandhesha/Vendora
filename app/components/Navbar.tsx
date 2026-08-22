
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Products", href: "/products" },
  { name: "Vendors", href: "/vendors" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-5 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl">

        {/* Logo */}
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black shadow-[0_0_25px_rgba(255,255,255,0.12)]">
              V
            </div>

            <span className="text-xl font-semibold tracking-tight text-white">
              Vendora
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.span
                whileHover={{ y: -1 }}
                className="relative block text-sm text-white/60 transition-colors hover:text-white"
              >
                {item.name}

                <motion.span
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-1 left-0 h-px bg-white"
                />
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-1 md:flex">
          <NavIcon href="/search" label="Search">
            <Search size={18} strokeWidth={1.8} />
          </NavIcon>

          <NavIcon href="/wishlist" label="Wishlist">
            <Heart size={18} strokeWidth={1.8} />
          </NavIcon>

          <NavIcon href="/cart" label="Cart">
            <ShoppingCart size={18} strokeWidth={1.8} />

            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-black">
              0
            </span>
          </NavIcon>

          <NavIcon href="/profile" label="Profile">
            <User size={18} strokeWidth={1.8} />
          </NavIcon>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-black/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {item.name}
              </Link>
            ))}

            <div className="my-2 h-px bg-white/10" />

            <MobileLink
              href="/search"
              icon={<Search size={18} />}
              label="Search"
              onClick={() => setMobileOpen(false)}
            />

            <MobileLink
              href="/wishlist"
              icon={<Heart size={18} />}
              label="Wishlist"
              onClick={() => setMobileOpen(false)}
            />

            <MobileLink
              href="/cart"
              icon={<ShoppingCart size={18} />}
              label="Cart"
              onClick={() => setMobileOpen(false)}
            />

            <MobileLink
              href="/profile"
              icon={<User size={18} />}
              label="Profile"
              onClick={() => setMobileOpen(false)}
            />
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function NavIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} aria-label={label}>
      <motion.div
        whileHover={{ scale: 1.08, y: -1 }}
        whileTap={{ scale: 0.92 }}
        title={label}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        {children}
      </motion.div>
    </Link>
  );
}

function MobileLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
    >
      {icon}
      {label}
    </Link>
  );
}
