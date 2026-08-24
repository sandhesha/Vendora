"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

const salesData = [
  { month: "Jan", sales: 42000 },
  { month: "Feb", sales: 48000 },
  { month: "Mar", sales: 53000 },
  { month: "Apr", sales: 61000 },
  { month: "May", sales: 58000 },
  { month: "Jun", sales: 72000 },
];

const orderData = [
  { month: "Jan", orders: 320 },
  { month: "Feb", orders: 380 },
  { month: "Mar", orders: 420 },
  { month: "Apr", orders: 510 },
  { month: "May", orders: 470 },
  { month: "Jun", orders: 620 },
];

const salesChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
};

const orderChartConfig = {
  orders: {
    label: "Orders",
    color: "var(--chart-2)",
  },
};

const stats = [
  {
    title: "Total Revenue",
    value: "₹3,34,000",
    change: "+12.5%",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "2,720",
    change: "+8.4%",
    icon: ShoppingCart,
  },
  {
    title: "Average Order Value",
    value: "₹1,228",
    change: "+4.2%",
    icon: TrendingUp,
  },
  {
    title: "Active Customers",
    value: "8,642",
    change: "+14.8%",
    icon: Users,
  },
];

export default function AdminAnalyticsPage() {
  return (
    <main className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Sales Analytics
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor marketplace sales and order performance.
        </p>
      </div>

      {/* Stats */}
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

                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>

          <CardContent>
            <ChartContainer
              config={salesChartConfig}
              className="h-[300px] w-full"
            >
              <LineChart data={salesData}>
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />

                <Line
                  dataKey="sales"
                  type="monotone"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Orders</CardTitle>
          </CardHeader>

          <CardContent>
            <ChartContainer
              config={orderChartConfig}
              className="h-[300px] w-full"
            >
              <BarChart data={orderData}>
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />

                <Bar
                  dataKey="orders"
                  fill="var(--color-orders)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">
                Best Month
              </p>

              <p className="mt-1 text-lg font-semibold">
                June
              </p>

              <p className="text-sm text-muted-foreground">
                ₹72,000 sales
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Highest Orders
              </p>

              <p className="mt-1 text-lg font-semibold">
                June
              </p>

              <p className="text-sm text-muted-foreground">
                620 orders
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Growth
              </p>

              <p className="mt-1 text-lg font-semibold">
                +12.5%
              </p>

              <p className="text-sm text-muted-foreground">
                Compared with previous month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}