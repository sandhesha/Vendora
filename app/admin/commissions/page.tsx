"use client";

import { useState } from "react";
import {
  DollarSign,
  Percent,
  Store,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const commissionData = [
  {
    vendor: "Tech World",
    orders: 124,
    sales: 185000,
    rate: 10,
    commission: 18500,
  },
  {
    vendor: "Fashion Hub",
    orders: 98,
    sales: 142000,
    rate: 8,
    commission: 11360,
  },
  {
    vendor: "Home Store",
    orders: 76,
    sales: 98000,
    rate: 7,
    commission: 6860,
  },
  {
    vendor: "Sports Zone",
    orders: 61,
    sales: 76000,
    rate: 9,
    commission: 6840,
  },
];

export default function AdminCommissionsPage() {
  const [commissionRate, setCommissionRate] = useState("10");

  const totalSales = commissionData.reduce(
    (sum, item) => sum + item.sales,
    0
  );

  const totalCommission = commissionData.reduce(
    (sum, item) => sum + item.commission,
    0
  );

  const totalOrders = commissionData.reduce(
    (sum, item) => sum + item.orders,
    0
  );

  return (
    <main className="p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Commission Management
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage vendor commissions and marketplace earnings.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalSales.toLocaleString("en-IN")}
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              Vendor sales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Commission Earned
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalCommission.toLocaleString("en-IN")}
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              Marketplace commission
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Orders
            </CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {totalOrders}
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              Vendor orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Default Rate
            </CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {commissionRate}%
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              Platform commission
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Default Commission */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Default Commission Rate</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="w-full max-w-xs">
              <label className="mb-2 block text-sm font-medium">
                Commission percentage
              </label>

              <Input
                type="number"
                min="0"
                max="100"
                value={commissionRate}
                onChange={(e) =>
                  setCommissionRate(e.target.value)
                }
              />
            </div>

            <Button>
              Update Rate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Commissions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Vendor Commissions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {commissionData.map((vendor) => (
                  <TableRow key={vendor.vendor}>
                    <TableCell className="font-medium">
                      {vendor.vendor}
                    </TableCell>

                    <TableCell>
                      {vendor.orders}
                    </TableCell>

                    <TableCell>
                      ₹{vendor.sales.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>
                      {vendor.rate}%
                    </TableCell>

                    <TableCell className="font-medium">
                      ₹{vendor.commission.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        Active
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}