"use client";

import { IndianRupee, TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const earnings = [
  {
    orderId: "#ORD-1001",
    date: "2026-08-15",
    sales: 2500,
    commission: 250,
    net: 2250,
  },
  {
    orderId: "#ORD-1002",
    date: "2026-08-16",
    sales: 4200,
    commission: 420,
    net: 3780,
  },
  {
    orderId: "#ORD-1003",
    date: "2026-08-17",
    sales: 3100,
    commission: 310,
    net: 2790,
  },
  {
    orderId: "#ORD-1004",
    date: "2026-08-18",
    sales: 5600,
    commission: 560,
    net: 5040,
  },
];

export default function VendorEarningsPage() {
  const totalSales = earnings.reduce((sum, item) => sum + item.sales, 0);
  const totalCommission = earnings.reduce(
    (sum, item) => sum + item.commission,
    0
  );
  const totalNet = earnings.reduce((sum, item) => sum + item.net, 0);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Earnings</h1>
        <p className="text-muted-foreground">
          Track your sales earnings and marketplace commission deductions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              Gross Sales
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
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingDown className="h-4 w-4" />
              Commission Deducted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalCommission.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground">
              Marketplace commission
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <IndianRupee className="h-4 w-4" />
              Net Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalNet.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission Deductions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Gross Sales</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Net Earnings</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {earnings.map((item) => (
                  <TableRow key={item.orderId}>
                    <TableCell className="font-medium">
                      {item.orderId}
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      ₹{item.sales.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      ₹{item.commission.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="font-medium">
                      ₹{item.net.toLocaleString("en-IN")}
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