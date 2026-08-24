"use client";

import { Search, Eye, Package } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type Order = {
  id: string;
  customer: string;
  date: string;
  items: number;
  amount: number;
  status: OrderStatus;
};

const orders: Order[] = [
  {
    id: "#ORD-1024",
    customer: "Rahul Kumar",
    date: "20 Aug 2026",
    items: 2,
    amount: 2499,
    status: "Delivered",
  },
  {
    id: "#ORD-1023",
    customer: "Anjali Nair",
    date: "20 Aug 2026",
    items: 1,
    amount: 1899,
    status: "Processing",
  },
  {
    id: "#ORD-1022",
    customer: "Arjun Menon",
    date: "19 Aug 2026",
    items: 3,
    amount: 3250,
    status: "Shipped",
  },
  {
    id: "#ORD-1021",
    customer: "Sneha Rao",
    date: "19 Aug 2026",
    items: 1,
    amount: 899,
    status: "Delivered",
  },
  {
    id: "#ORD-1020",
    customer: "Vivek Sharma",
    date: "18 Aug 2026",
    items: 2,
    amount: 4299,
    status: "Pending",
  },
  {
    id: "#ORD-1019",
    customer: "Priya Das",
    date: "18 Aug 2026",
    items: 1,
    amount: 1299,
    status: "Cancelled",
  },
];

function getStatusVariant(status: OrderStatus) {
  switch (status) {
    case "Delivered":
      return "default";
    case "Cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

export default function VendorOrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "all" || order.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Orders
        </h1>

        <p className="text-muted-foreground">
          Manage and track orders placed for your products.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Total Orders
            </p>
            <p className="mt-1 text-2xl font-bold">348</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Pending
            </p>
            <p className="mt-1 text-2xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Processing
            </p>
            <p className="mt-1 text-2xl font-bold">18</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Shipped
            </p>
            <p className="mt-1 text-2xl font-bold">24</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Delivered
            </p>
            <p className="mt-1 text-2xl font-bold">294</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>All Orders</CardTitle>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select
  value={status}
  onValueChange={(value) => {
    if (value !== null) {
      setStatus(value);
    }
  }}
>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    All Status
                  </SelectItem>
                  <SelectItem value="Pending">
                    Pending
                  </SelectItem>
                  <SelectItem value="Processing">
                    Processing
                  </SelectItem>
                  <SelectItem value="Shipped">
                    Shipped
                  </SelectItem>
                  <SelectItem value="Delivered">
                    Delivered
                  </SelectItem>
                  <SelectItem value="Cancelled">
                    Cancelled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3 font-medium">Order</th>
                  <th className="p-3 font-medium">Customer</th>
                  <th className="p-3 font-medium">Date</th>
                  <th className="p-3 font-medium">Items</th>
                  <th className="p-3 font-medium">Amount</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-0"
                  >
                    <td className="p-3 font-medium">
                      {order.id}
                    </td>

                    <td className="p-3">
                      {order.customer}
                    </td>

                    <td className="p-3 text-muted-foreground">
                      {order.date}
                    </td>

                    <td className="p-3">
                      {order.items}
                    </td>

                    <td className="p-3 font-medium">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="p-3">
                      <Badge
                        variant={getStatusVariant(order.status)}
                      >
                        {order.status}
                      </Badge>
                    </td>

                    <td className="p-3 text-right">
                      <button
                        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted"
                        onClick={() =>
                          alert(`Order ${order.id}`)
                        }
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="mb-3 h-10 w-10 text-muted-foreground" />

                <p className="font-medium">
                  No orders found
                </p>

                <p className="text-sm text-muted-foreground">
                  Try changing your search or status filter.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}