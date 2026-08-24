"use client";

import {
  DollarSign,
  ShoppingCart,
  Store,
  Users,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const stats = [
  {
    title: "Total Sales",
    value: "₹1,24,500",
    change: "+12.5%",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    icon: ShoppingCart,
  },
  {
    title: "Vendors",
    value: "156",
    change: "+5.4%",
    icon: Store,
  },
  {
    title: "Customers",
    value: "8,642",
    change: "+14.8%",
    icon: Users,
  },
];

const salesData = [
  { month: "Jan", sales: 18500 },
  { month: "Feb", sales: 22400 },
  { month: "Mar", sales: 19800 },
  { month: "Apr", sales: 27600 },
  { month: "May", sales: 31200 },
  { month: "Jun", sales: 36500 },
  { month: "Jul", sales: 42100 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
};

export default function AdminDashboard() {
  return (
    <main className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your marketplace performance.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>

                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="secondary">
                    {stat.change}
                  </Badge>

                  <span className="text-xs text-muted-foreground">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="h-[300px] w-full"
            >
              <AreaChart
                data={salesData}
                margin={{
                  left: 12,
                  right: 12,
                  top: 10,
                  bottom: 10,
                }}
              >
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />

                <Area
                  dataKey="sales"
                  type="monotone"
                  fill="var(--color-sales)"
                  fillOpacity={0.2}
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Marketplace Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Marketplace Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Commission
              </span>

              <span className="font-semibold">
                ₹18,750
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Pending Refunds
              </span>

              <span className="font-semibold">
                ₹4,250
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Pending Payouts
              </span>

              <span className="font-semibold">
                ₹12,600
              </span>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-sm font-medium">
                Net Revenue
              </span>

              <span className="text-lg font-bold">
                ₹1,05,750
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {[
              "New vendor registered",
              "Order #ORD-1024 completed",
              "Payout request received",
              "Refund request created",
            ].map((activity) => (
              <div
                key={activity}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <span className="text-sm">
                  {activity}
                </span>

                <span className="text-xs text-muted-foreground">
                  Today
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}