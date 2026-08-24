"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CircleDollarSign,
  Clock,
  CreditCard,
  Package,
  ShoppingCart,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const salesData = [
  { month: "Mar", sales: 42000 },
  { month: "Apr", sales: 58000 },
  { month: "May", sales: 52000 },
  { month: "Jun", sales: 71000 },
  { month: "Jul", sales: 68000 },
  { month: "Aug", sales: 84000 },
];

const recentOrders = [
  {
    id: "#ORD-1024",
    customer: "Rahul Kumar",
    date: "Aug 20, 2026",
    amount: "₹4,999",
    status: "Completed",
  },
  {
    id: "#ORD-1023",
    customer: "Ananya Sharma",
    date: "Aug 20, 2026",
    amount: "₹2,499",
    status: "Processing",
  },
  {
    id: "#ORD-1022",
    customer: "Arjun Nair",
    date: "Aug 19, 2026",
    amount: "₹7,299",
    status: "Shipped",
  },
  {
    id: "#ORD-1021",
    customer: "Priya Menon",
    date: "Aug 19, 2026",
    amount: "₹1,899",
    status: "Completed",
  },
  {
    id: "#ORD-1020",
    customer: "Vivek Rao",
    date: "Aug 18, 2026",
    amount: "₹3,599",
    status: "Pending",
  },
];

function formatSales(value: number) {
  return `₹${(value / 1000).toFixed(0)}k`;
}

export default function VendorDashboardPage() {
  const maxSales = Math.max(...salesData.map((item) => item.sales));

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Vendor Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor your sales, earnings, orders and wallet.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              Sales Report
            </Button>
            <Button>
              Request Payout
            </Button>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Sales
              </CardTitle>
              <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">₹84,000</div>

              <p className="mt-1 flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">128</div>

              <p className="mt-1 flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <Banknote className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">₹72,450</div>

              <p className="mt-1 text-xs text-muted-foreground">
                After commission deductions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Commission
              </CardTitle>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">₹11,550</div>

              <p className="mt-1 flex items-center text-xs text-red-600">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                13.75% of sales
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sales + Wallet */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sales Overview</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Monthly sales performance
                  </p>
                </div>

                <Badge variant="secondary">Last 6 months</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex h-72 items-end gap-4">
                {salesData.map((item) => {
                  const height = (item.sales / maxSales) * 100;

                  return (
                    <div
                      key={item.month}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <span className="text-xs font-medium">
                        {formatSales(item.sales)}
                      </span>

                      <div className="flex h-52 w-full items-end">
                        <div
                          className="w-full rounded-t-md bg-primary transition-all hover:opacity-80"
                          style={{ height: `${height}%` }}
                        />
                      </div>

                      <span className="text-xs text-muted-foreground">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your current balance
              </p>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-primary" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Available Balance
                    </p>
                    <p className="text-2xl font-bold">₹42,750</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Pending Balance
                    </p>
                    <p className="text-xl font-semibold">₹18,500</p>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Request Payout
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Latest orders from your store
                </p>
              </div>

              <Button variant="outline" size="sm">
                View All Orders
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.id}
                      </TableCell>

                      <TableCell>{order.customer}</TableCell>

                      <TableCell>{order.date}</TableCell>

                      <TableCell className="font-medium">
                        {order.amount}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-muted p-3">
                <Package className="h-6 w-6" />
              </div>

              <div>
                <p className="font-semibold">Manage Orders</p>
                <p className="text-sm text-muted-foreground">
                  View and process orders
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-muted p-3">
                <Wallet className="h-6 w-6" />
              </div>

              <div>
                <p className="font-semibold">Wallet & Payouts</p>
                <p className="text-sm text-muted-foreground">
                  Manage your earnings
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-muted p-3">
                <CircleDollarSign className="h-6 w-6" />
              </div>

              <div>
                <p className="font-semibold">Sales Reports</p>
                <p className="text-sm text-muted-foreground">
                  Analyze your performance
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}