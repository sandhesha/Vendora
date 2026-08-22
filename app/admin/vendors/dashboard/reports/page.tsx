"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Download,
  IndianRupee,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SalesRow = {
  date: string;
  orders: number;
  products: number;
  sales: number;
  commission: number;
  earnings: number;
};

const salesData: SalesRow[] = [
  {
    date: "2026-08-20",
    orders: 18,
    products: 27,
    sales: 18450,
    commission: 1845,
    earnings: 16605,
  },
  {
    date: "2026-08-19",
    orders: 15,
    products: 23,
    sales: 15200,
    commission: 1520,
    earnings: 13680,
  },
  {
    date: "2026-08-18",
    orders: 21,
    products: 32,
    sales: 21800,
    commission: 2180,
    earnings: 19620,
  },
  {
    date: "2026-08-17",
    orders: 12,
    products: 19,
    sales: 12600,
    commission: 1260,
    earnings: 11340,
  },
  {
    date: "2026-08-16",
    orders: 17,
    products: 25,
    sales: 17150,
    commission: 1715,
    earnings: 15435,
  },
];

export default function VendorSalesReportsPage() {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) return salesData;

    return salesData.filter((row) =>
      row.date.includes(search.trim())
    );
  }, [search]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, row) => ({
        orders: acc.orders + row.orders,
        products: acc.products + row.products,
        sales: acc.sales + row.sales,
        commission: acc.commission + row.commission,
        earnings: acc.earnings + row.earnings,
      }),
      {
        orders: 0,
        products: 0,
        sales: 0,
        commission: 0,
        earnings: 0,
      }
    );
  }, [filteredData]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales Reports</h1>
          <p className="text-muted-foreground">
            Track your sales, orders, commissions and earnings.
          </p>
        </div>

        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Date filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Search Date
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="YYYY-MM-DD"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSearch("")}
              >
                Clear Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <IndianRupee className="h-4 w-4" />
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totals.sales.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">
              Gross sales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <ShoppingCart className="h-4 w-4" />
              Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totals.orders}</p>
            <p className="text-xs text-muted-foreground">
              Total orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4" />
              Products Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totals.products}</p>
            <p className="text-xs text-muted-foreground">
              Items sold
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
              ₹{totals.earnings.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">
              After commission
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Commission summary */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total commission deducted
              </p>
              <p className="text-2xl font-bold">
                ₹{totals.commission.toLocaleString("en-IN")}
              </p>
            </div>

            <Badge variant="secondary">
              Marketplace commission
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sales table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Sales</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Products Sold</TableHead>
                  <TableHead>Gross Sales</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Net Earnings</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell className="font-medium">
                      {row.date}
                    </TableCell>

                    <TableCell>{row.orders}</TableCell>

                    <TableCell>{row.products}</TableCell>

                    <TableCell>
                      ₹{row.sales.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>
                      ₹{row.commission.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell className="font-semibold">
                      ₹{row.earnings.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">
                    Total
                  </TableCell>
                  <TableCell className="font-bold">
                    {totals.orders}
                  </TableCell>
                  <TableCell className="font-bold">
                    {totals.products}
                  </TableCell>
                  <TableCell className="font-bold">
                    ₹{totals.sales.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="font-bold">
                    ₹{totals.commission.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="font-bold">
                    ₹{totals.earnings.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>

                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No sales found for this date.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}