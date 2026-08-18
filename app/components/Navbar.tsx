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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Products", href: "/products" },
    { name: "Vendors", href: "/vendors" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-5 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
        
        {/* Logo */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black font-bold">
              V
            </div>

            <span className="text-xl font-bold tracking-tight text-white">
              Vendora
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.span
                whileHover={{ y: -2 }}
                className="relative text-sm text-white/70 transition hover:text-white"
              >
                {item.name}

                <motion.span
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="absolute -bottom-1 left-0 h-px bg-white"
                />
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <NavIcon href="/search" label="Search">
            <Search size={19} />
          </NavIcon>

          <NavIcon href="/wishlist" label="Wishlist">
            <Heart size={19} />
          </NavIcon>

          <NavIcon href="/cart" label="Cart">
            <ShoppingCart size={19} />

            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black"
            >
              0
            </motion.span>
          </NavIcon>

          <NavIcon href="/profile" label="Profile">
            <User size={19} />
          </NavIcon>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-black/90 p-5 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item.name}
              </Link>
            ))}

            <div className="my-2 h-px bg-white/10" />

            <Link
              href="/search"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-white/80 hover:bg-white/10"
            >
              <Search size={18} />
              Search
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-white/80 hover:bg-white/10"
            >
              <Heart size={18} />
              Wishlist
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-white/80 hover:bg-white/10"
            >
              <ShoppingCart size={18} />
              Cart
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-white/80 hover:bg-white/10"
            >
              <User size={18} />
              Profile
            </Link>
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
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        title={label}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        {children}
      </motion.div>
    </Link>
  );
}