"use client";

import { Download, IndianRupee, ShoppingBag, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const salesData = [
  { date: "2026-08-15", orders: 18, sales: 12400, commission: 1240, earnings: 11160 },
  { date: "2026-08-16", orders: 24, sales: 16800, commission: 1680, earnings: 15120 },
  { date: "2026-08-17", orders: 21, sales: 14500, commission: 1450, earnings: 13050 },
  { date: "2026-08-18", orders: 29, sales: 21300, commission: 2130, earnings: 19170 },
  { date: "2026-08-19", orders: 26, sales: 18700, commission: 1870, earnings: 16830 },
  { date: "2026-08-20", orders: 31, sales: 23500, commission: 2350, earnings: 21150 },
];

export default function VendorReportsPage() {
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalCommission = salesData.reduce(
    (sum, item) => sum + item.commission,
    0
  );
  const totalEarnings = salesData.reduce(
    (sum, item) => sum + item.earnings,
    0
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Sales Reports</h1>
          <p className="text-muted-foreground">
            Analyze your sales, commissions, and earnings.
          </p>
        </div>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <ShoppingBag className="h-4 w-4" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <IndianRupee className="h-4 w-4" />
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalSales.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalCommission.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              Net Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalEarnings.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Sales Report</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Net Earnings</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {salesData.map((item) => (
                  <TableRow key={item.date}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.orders}</TableCell>
                    <TableCell>
                      ₹{item.sales.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      ₹{item.commission.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="font-medium">
                      ₹{item.earnings.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}