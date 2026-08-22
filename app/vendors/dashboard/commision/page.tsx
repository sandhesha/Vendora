"use client";

import { Percent, TrendingDown, Wallet, Receipt } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const commissions = [
  {
    orderId: "ORD-1048",
    date: "20 Aug 2026",
    saleAmount: 2499,
    commissionRate: 10,
    commission: 249.9,
    netAmount: 2249.1,
    status: "Deducted",
  },
  {
    orderId: "ORD-1045",
    date: "19 Aug 2026",
    saleAmount: 3999,
    commissionRate: 10,
    commission: 399.9,
    netAmount: 3599.1,
    status: "Deducted",
  },
  {
    orderId: "ORD-1041",
    date: "18 Aug 2026",
    saleAmount: 1799,
    commissionRate: 10,
    commission: 179.9,
    netAmount: 1619.1,
    status: "Deducted",
  },
  {
    orderId: "ORD-1038",
    date: "17 Aug 2026",
    saleAmount: 5499,
    commissionRate: 10,
    commission: 549.9,
    netAmount: 4949.1,
    status: "Deducted",
  },
  {
    orderId: "ORD-1034",
    date: "16 Aug 2026",
    saleAmount: 2299,
    commissionRate: 10,
    commission: 229.9,
    netAmount: 2069.1,
    status: "Deducted",
  },
];

export default function VendorCommissionsPage() {
  const totalSales = commissions.reduce(
    (sum, item) => sum + item.saleAmount,
    0
  );

  const totalCommission = commissions.reduce(
    (sum, item) => sum + item.commission,
    0
  );

  const netEarnings = commissions.reduce(
    (sum, item) => sum + item.netAmount,
    0
  );

  const commissionRate = 10;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Commission Deductions</h1>
        <p className="text-muted-foreground">
          Track marketplace commissions deducted from your sales.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingDown className="h-4 w-4" />
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalSales.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground">
              Gross sales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Percent className="h-4 w-4" />
              Commission Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{commissionRate}%</p>
            <p className="text-sm text-muted-foreground">
              Marketplace commission
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Receipt className="h-4 w-4" />
              Commission Deducted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalCommission.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground">
              Total deductions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Wallet className="h-4 w-4" />
              Net Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{netEarnings.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground">
              After commission
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission Breakdown</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Sale Amount</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Net Earnings</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {commissions.map((item) => (
                  <TableRow key={item.orderId}>
                    <TableCell className="font-medium">
                      {item.orderId}
                    </TableCell>

                    <TableCell>{item.date}</TableCell>

                    <TableCell>
                      ₹{item.saleAmount.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>{item.commissionRate}%</TableCell>

                    <TableCell>
                      ₹{item.commission.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>
                      ₹{item.netAmount.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        {item.status}
                      </Badge>
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