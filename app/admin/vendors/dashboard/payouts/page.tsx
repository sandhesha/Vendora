"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  Clock3,
  IndianRupee,
  Wallet,
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

type Payout = {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "Pending" | "Approved" | "Paid" | "Rejected";
};

const initialPayouts: Payout[] = [
  {
    id: "PAY-001",
    date: "2026-08-18",
    amount: 12500,
    method: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "PAY-002",
    date: "2026-08-15",
    amount: 8500,
    method: "Bank Transfer",
    status: "Approved",
  },
  {
    id: "PAY-003",
    date: "2026-08-20",
    amount: 15000,
    method: "Bank Transfer",
    status: "Pending",
  },
];

export default function VendorPayoutsPage() {
  const [payouts, setPayouts] = useState(initialPayouts);
  const [amount, setAmount] = useState("");

  const availableBalance = 42500;
  const pendingBalance = 15000;

  const totalPaid = useMemo(
    () =>
      payouts
        .filter((payout) => payout.status === "Paid")
        .reduce((sum, payout) => sum + payout.amount, 0),
    [payouts]
  );

  const requestPayout = () => {
    const payoutAmount = Number(amount);

    if (
      !payoutAmount ||
      payoutAmount <= 0 ||
      payoutAmount > availableBalance
    ) {
      return;
    }

    const newPayout: Payout = {
      id: `PAY-${String(payouts.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().slice(0, 10),
      amount: payoutAmount,
      method: "Bank Transfer",
      status: "Pending",
    };

    setPayouts((current) => [newPayout, ...current]);
    setAmount("");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Payout Requests</h1>
        <p className="text-muted-foreground">
          Request withdrawals and track your vendor payouts.
        </p>
      </div>

      {/* Balance cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Wallet className="h-4 w-4" />
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{availableBalance.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">
              Available for withdrawal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock3 className="h-4 w-4" />
              Pending Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{pendingBalance.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">
              Awaiting settlement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <IndianRupee className="h-4 w-4" />
              Total Paid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalPaid.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">
              Completed payouts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Request payout */}
      <Card>
        <CardHeader>
          <CardTitle>Request a Payout</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="w-full md:max-w-sm">
              <label className="mb-2 block text-sm font-medium">
                Amount
              </label>

              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  type="number"
                  min="1"
                  max={availableBalance}
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9"
                />
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                Maximum: ₹{availableBalance.toLocaleString("en-IN")}
              </p>
            </div>

            <Button
              onClick={requestPayout}
              disabled={
                !amount ||
                Number(amount) <= 0 ||
                Number(amount) > availableBalance
              }
            >
              <ArrowDownToLine className="mr-2 h-4 w-4" />
              Request Payout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payout history */}
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payout ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {payouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">
                      {payout.id}
                    </TableCell>

                    <TableCell>{payout.date}</TableCell>

                    <TableCell>
                      ₹{payout.amount.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>{payout.method}</TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          payout.status === "Paid"
                            ? "default"
                            : payout.status === "Rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {payout.status}
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