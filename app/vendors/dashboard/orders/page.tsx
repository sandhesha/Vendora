"use client";

import { useState } from "react";
import { Search, ShoppingBag } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: OrderStatus;
  date: string;
}

const orders: Order[] = [
  {
    id: "#ORD-1001",
    customer: "Rahul Kumar",
    product: "Wireless Headphones",
    amount: 2499,
    status: "Delivered",
    date: "2026-08-15",
  },
  {
    id: "#ORD-1002",
    customer: "Ananya Sharma",
    product: "Smart Watch",
    amount: 3999,
    status: "Shipped",
    date: "2026-08-16",
  },
  {
    id: "#ORD-1003",
    customer: "Arjun Nair",
    product: "Running Shoes",
    amount: 2899,
    status: "Processing",
    date: "2026-08-17",
  },
  {
    id: "#ORD-1004",
    customer: "Priya Menon",
    product: "Travel Backpack",
    amount: 1799,
    status: "Pending",
    date: "2026-08-18",
  },
];

function getStatusVariant(status: OrderStatus) {
  switch (status) {
    case "Delivered":
      return "default";
    case "Shipped":
      return "secondary";
    case "Processing":
      return "outline";
    case "Pending":
      return "destructive";
  }
}

export default function VendorOrdersPage() {
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) => {
    const value = search.toLowerCase();

    return (
      order.id.toLowerCase().includes(value) ||
      order.customer.toLowerCase().includes(value) ||
      order.product.toLowerCase().includes(value) ||
      order.status.toLowerCase().includes(value)
    );
  });

  const totalOrders = orders.length;
  const delivered = orders.filter(
    (order) => order.status === "Delivered"
  ).length;
  const processing = orders.filter(
    (order) => order.status === "Processing"
  ).length;
  const pending = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track orders received for your store.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{delivered}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{processing}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pending}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Vendor Orders
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="pl-9"
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.id}
                      </TableCell>

                      <TableCell>{order.customer}</TableCell>

                      <TableCell>{order.product}</TableCell>

                      <TableCell>
                        ₹{order.amount.toLocaleString("en-IN")}
                      </TableCell>

                      <TableCell>
                        <Badge variant={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>

                      <TableCell>{order.date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}