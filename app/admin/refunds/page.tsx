"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Clock,
  Eye,
  RotateCcw,
  Search,
  X,
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

type RefundStatus = "Pending" | "Approved" | "Rejected" | "Completed";

type Refund = {
  id: string;
  orderId: string;
  customer: string;
  vendor: string;
  amount: number;
  reason: string;
  date: string;
  status: RefundStatus;
};

const initialRefunds: Refund[] = [
  {
    id: "REF-1001",
    orderId: "ORD-5001",
    customer: "Rahul Kumar",
    vendor: "Tech Store",
    amount: 2499,
    reason: "Product damaged",
    date: "2026-08-18",
    status: "Pending",
  },
  {
    id: "REF-1002",
    orderId: "ORD-5002",
    customer: "Ananya Rao",
    vendor: "Fashion Hub",
    amount: 1599,
    reason: "Wrong product",
    date: "2026-08-17",
    status: "Approved",
  },
  {
    id: "REF-1003",
    orderId: "ORD-5003",
    customer: "Arjun Nair",
    vendor: "Home Essentials",
    amount: 3299,
    reason: "Product not as expected",
    date: "2026-08-16",
    status: "Completed",
  },
  {
    id: "REF-1004",
    orderId: "ORD-5004",
    customer: "Priya Sharma",
    vendor: "ElectroMart",
    amount: 4999,
    reason: "Order cancellation",
    date: "2026-08-15",
    status: "Rejected",
  },
];

function statusVariant(status: RefundStatus) {
  switch (status) {
    case "Approved":
      return "default";
    case "Completed":
      return "default";
    case "Rejected":
      return "destructive";
    default:
      return "secondary";
  }
}

export default function RefundsPage() {
  const [refunds, setRefunds] = useState<Refund[]>(initialRefunds);
  const [search, setSearch] = useState("");

  const filteredRefunds = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return refunds;

    return refunds.filter(
      (refund) =>
        refund.id.toLowerCase().includes(query) ||
        refund.orderId.toLowerCase().includes(query) ||
        refund.customer.toLowerCase().includes(query) ||
        refund.vendor.toLowerCase().includes(query)
    );
  }, [refunds, search]);

  const pendingCount = refunds.filter(
    (refund) => refund.status === "Pending"
  ).length;

  const approvedCount = refunds.filter(
    (refund) => refund.status === "Approved"
  ).length;

  const completedCount = refunds.filter(
    (refund) => refund.status === "Completed"
  ).length;

  const totalAmount = refunds.reduce(
    (total, refund) => total + refund.amount,
    0
  );

  const updateStatus = (
    id: string,
    status: RefundStatus
  ) => {
    setRefunds((current) =>
      current.map((refund) =>
        refund.id === id
          ? { ...refund, status }
          : refund
      )
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Refund Management
        </h1>
        <p className="text-muted-foreground">
          Review, approve and manage customer refund requests.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4" />
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{approvedCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <RotateCcw className="h-4 w-4" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{completedCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Total Refund Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalAmount.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Refund Requests</CardTitle>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search refunds..."
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Refund ID</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredRefunds.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell className="font-medium">
                      {refund.id}
                    </TableCell>

                    <TableCell>{refund.orderId}</TableCell>

                    <TableCell>{refund.customer}</TableCell>

                    <TableCell>{refund.vendor}</TableCell>

                    <TableCell>
                      ₹{refund.amount.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>{refund.reason}</TableCell>

                    <TableCell>{refund.date}</TableCell>

                    <TableCell>
                      <Badge variant={statusVariant(refund.status)}>
                        {refund.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          title="View refund"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {refund.status === "Pending" && (
                          <>
                            <Button
                              size="icon"
                              title="Approve refund"
                              onClick={() =>
                                updateStatus(
                                  refund.id,
                                  "Approved"
                                )
                              }
                            >
                              <Check className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="destructive"
                              size="icon"
                              title="Reject refund"
                              onClick={() =>
                                updateStatus(
                                  refund.id,
                                  "Rejected"
                                )
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}

                        {refund.status === "Approved" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              updateStatus(
                                refund.id,
                                "Completed"
                              )
                            }
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredRefunds.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No refund requests found.
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