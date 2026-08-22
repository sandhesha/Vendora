"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Download,
  FileText,
  Filter,
  IndianRupee,
  Package,
  ShoppingCart,
  Users,
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

type AdminReportStats = {
  total_sales: number;
  total_orders: number;
  completed_orders: number;
  cancelled_orders: number;
  total_customers: number;
  total_vendors: number;
  total_products: number;
  total_commission: number;
  total_refunds: number;
};

type Report = {
  id: string;
  name: string;
  category: string;
  period: string;
  generated: string;
  status: "Ready" | "Processing";
};

const reports: Report[] = [
  {
    id: "RPT-001",
    name: "Sales Report",
    category: "Sales",
    period: "August 2026",
    generated: "2026-08-20",
    status: "Ready",
  },
  {
    id: "RPT-002",
    name: "Order Report",
    category: "Orders",
    period: "August 2026",
    generated: "2026-08-20",
    status: "Ready",
  },
  {
    id: "RPT-003",
    name: "Vendor Performance Report",
    category: "Vendors",
    period: "August 2026",
    generated: "2026-08-19",
    status: "Ready",
  },
  {
    id: "RPT-004",
    name: "Customer Report",
    category: "Customers",
    period: "August 2026",
    generated: "2026-08-19",
    status: "Ready",
  },
  {
    id: "RPT-005",
    name: "Commission Report",
    category: "Finance",
    period: "August 2026",
    generated: "2026-08-18",
    status: "Ready",
  },
];

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("August 2026");

  const [stats, setStats] = useState<AdminReportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");

        const apiBase =
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

        const response = await fetch(`${apiBase}/admin/reports`);

        if (!response.ok) {
          throw new Error("Failed to load admin report statistics");
        }

        const data: AdminReportStats = await response.json();
        setStats(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load report statistics.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const filteredReports = useMemo(() => {
    const query = search.toLowerCase().trim();

    return reports.filter((report) => {
      const matchesSearch =
        !query ||
        report.name.toLowerCase().includes(query) ||
        report.category.toLowerCase().includes(query) ||
        report.id.toLowerCase().includes(query);

      const matchesPeriod =
        period === "All" || report.period === period;

      return matchesSearch && matchesPeriod;
    });
  }, [search, period]);

  return (
    <div className="space-y-6 p-6">
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            Generate and manage marketplace business reports.
          </p>
        </div>

        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Summary */}
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
              {loading
                ? "Loading..."
                : `₹${(stats?.total_sales ?? 0).toLocaleString("en-IN")}`}
            </p>
            <p className="text-xs text-muted-foreground">
              Total paid-order sales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <ShoppingCart className="h-4 w-4" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {loading
                ? "Loading..."
                : (stats?.total_orders ?? 0).toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">
              All marketplace orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {loading
                ? "Loading..."
                : (stats?.total_customers ?? 0).toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">
              Registered customers
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
            <p className="text-2xl font-bold">
              {loading
                ? "Loading..."
                : (stats?.total_products ?? 0).toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">
              Total marketplace products
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Finance Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {loading
                ? "Loading..."
                : `₹${(stats?.total_commission ?? 0).toLocaleString("en-IN")}`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Refunds</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {loading
                ? "Loading..."
                : `₹${(stats?.total_refunds ?? 0).toLocaleString("en-IN")}`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Search
              </label>
              <Input
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Period
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option>All</option>
                <option>August 2026</option>
                <option>July 2026</option>
                <option>June 2026</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearch("");
                  setPeriod("August 2026");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {report.id}
                    </TableCell>
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>{report.generated}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          report.status === "Ready"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={report.status !== "Ready"}
                        onClick={() =>
                          alert(
                            `${report.name} download will be connected to the backend next.`
                          )
                        }
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredReports.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No reports found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Shortcuts */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Sales Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View sales trends, revenue and marketplace performance.
            </p>
            <Button variant="outline" className="mt-4">
              View Analytics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Compare vendor sales, orders and earnings.
            </p>
            <Button variant="outline" className="mt-4">
              View Vendors
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Finance Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Review commissions, refunds and payout information.
            </p>
            <Button variant="outline" className="mt-4">
              View Finance
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}