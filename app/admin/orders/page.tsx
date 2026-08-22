"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Eye, Search } from "lucide-react";

type Order = {
  id: string;
  customer: string;
  vendor: string;
  amount: string;
  date: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
};

const orders: Order[] = [
  {
    id: "ORD-1001",
    customer: "Rahul",
    vendor: "Tech Store",
    amount: "₹12,499",
    date: "20 Aug 2026",
    status: "Delivered",
  },
  {
    id: "ORD-1002",
    customer: "Ananya",
    vendor: "Fashion Hub",
    amount: "₹4,999",
    date: "20 Aug 2026",
    status: "Processing",
  },
  {
    id: "ORD-1003",
    customer: "Arjun",
    vendor: "Home Store",
    amount: "₹8,299",
    date: "19 Aug 2026",
    status: "Shipped",
  },
  {
    id: "ORD-1004",
    customer: "Priya",
    vendor: "Tech Store",
    amount: "₹22,999",
    date: "19 Aug 2026",
    status: "Delivered",
  },
  {
    id: "ORD-1005",
    customer: "Vivek",
    vendor: "Sports World",
    amount: "₹3,499",
    date: "18 Aug 2026",
    status: "Pending",
  },
];

function getStatusVariant(status: Order["status"]) {
  switch (status) {
    case "Delivered":
      return "default";

    case "Cancelled":
      return "destructive";

    default:
      return "secondary";
  }
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.vendor.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "all" || order.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Orders
          </h1>

          <p className="text-muted-foreground">
            Manage and monitor all marketplace orders.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <Card>
            <CardHeader>
              <CardDescription>Total Orders</CardDescription>
              <CardTitle className="text-2xl">
                1,248
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-2xl">
                42
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Processing</CardDescription>
              <CardTitle className="text-2xl">
                67
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Delivered</CardDescription>
              <CardTitle className="text-2xl">
                1,083
              </CardTitle>
            </CardHeader>
          </Card>

        </div>

        {/* Orders */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>

            <CardDescription>
              View, search and filter marketplace orders.
            </CardDescription>
          </CardHeader>

          <CardContent>

            {/* Filters */}
            <div className="mb-6 flex flex-col gap-3 md:flex-row">

              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder="Search order, customer or vendor..."
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  setSearch(e.target.value)
}
                  className="pl-9"
                />
              </div>

              <Select
  value={status}
  onValueChange={(value) => {
    setStatus(value ?? "all");
  }}
>
                <SelectTrigger className="w-full md:w-[180px]">
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

            {/* Table */}
            <div className="rounded-md border">

              <Table>

                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>

                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-24 text-center"
                      >
                        No orders found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>

                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>

                        <TableCell>
                          {order.customer}
                        </TableCell>

                        <TableCell>
                          {order.vendor}
                        </TableCell>

                        <TableCell>
                          {order.amount}
                        </TableCell>

                        <TableCell>
                          {order.date}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={getStatusVariant(order.status)}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setSelectedOrder(order)
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                        </TableCell>

                      </TableRow>
                    ))
                  )}

                </TableBody>

              </Table>

            </div>

          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog
          open={!!selectedOrder}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedOrder(null);
            }
          }}
        >

          <DialogContent>

            <DialogHeader>
              <DialogTitle>
                Order Details
              </DialogTitle>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-4">

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Order ID
                    </p>

                    <p className="font-medium">
                      {selectedOrder.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Date
                    </p>

                    <p className="font-medium">
                      {selectedOrder.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Customer
                    </p>

                    <p className="font-medium">
                      {selectedOrder.customer}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Vendor
                    </p>

                    <p className="font-medium">
                      {selectedOrder.vendor}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Amount
                    </p>

                    <p className="font-medium">
                      {selectedOrder.amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Status
                    </p>

                    <Badge
                      variant={getStatusVariant(
                        selectedOrder.status
                      )}
                    >
                      {selectedOrder.status}
                    </Badge>
                  </div>

                </div>

              </div>
            )}

          </DialogContent>

        </Dialog>

      </div>
    </main>
  );
}