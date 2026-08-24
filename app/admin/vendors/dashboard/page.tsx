"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  Wallet,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Sales",
    value: "₹1,24,500",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "248",
    change: "+8.2%",
    positive: true,
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "86",
    change: "+4",
    positive: true,
    icon: Package,
  },
  {
    title: "Available Balance",
    value: "₹42,850",
    change: "+₹8,450",
    positive: true,
    icon: Wallet,
  },
];

const recentOrders = [
  {
    id: "#ORD-1001",
    customer: "Rahul Kumar",
    amount: "₹2,499",
    status: "Completed",
  },
  {
    id: "#ORD-1002",
    customer: "Anjali Nair",
    amount: "₹1,899",
    status: "Processing",
  },
  {
    id: "#ORD-1003",
    customer: "Arjun Das",
    amount: "₹3,299",
    status: "Shipped",
  },
  {
    id: "#ORD-1004",
    customer: "Sneha Rao",
    amount: "₹999",
    status: "Pending",
  },
];

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Vendor Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of your sales, orders, earnings and wallet.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>

                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>

                <div className="mt-2 flex items-center gap-1 text-xs">
                  {stat.positive ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}

                  <span
                    className={
                      stat.positive
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>

                  <span className="text-muted-foreground">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sales Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <DollarSign className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="font-medium">Sales Analytics</p>
              <p className="text-sm text-muted-foreground">
                Chart will be connected to the backend sales data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earnings + Wallet */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Earnings</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Gross Earnings
              </span>
              <span className="font-semibold">₹1,24,500</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Commission Deducted
              </span>
              <span className="font-semibold text-red-600">
                -₹12,450
              </span>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Net Earnings</span>
                <span className="text-xl font-bold">
                  ₹1,12,050
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wallet</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Available Balance
              </span>
              <span className="font-semibold text-green-600">
                ₹42,850
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Pending Balance
              </span>
              <span className="font-semibold">
                ₹18,200
              </span>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  Total Balance
                </span>
                <span className="text-xl font-bold">
                  ₹61,050
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">
                    Order
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-0"
                  >
                    <td className="px-4 py-3 font-medium">
                      {order.id}
                    </td>

                    <td className="px-4 py-3">
                      {order.customer}
                    </td>

                    <td className="px-4 py-3">
                      {order.amount}
                    </td>

                    <td className="px-4 py-3">
                      <Badge variant="outline">
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}