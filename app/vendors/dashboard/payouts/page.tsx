"use client";

import { useState } from "react";
import { CheckCircle, Clock, IndianRupee } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type PayoutStatus = "Completed" | "Processing" | "Pending";

interface Payout {
  id: string;
  amount: number;
  date: string;
  status: PayoutStatus;
  reference: string;
}

const payoutHistory: Payout[] = [
  {
    id: "PAY-1001",
    amount: 5000,
    date: "2026-08-10",
    status: "Completed",
    reference: "BANK-78231",
  },
  {
    id: "PAY-1002",
    amount: 3000,
    date: "2026-08-17",
    status: "Processing",
    reference: "BANK-79342",
  },
];

function getStatusVariant(status: PayoutStatus) {
  switch (status) {
    case "Completed":
      return "default";
    case "Processing":
      return "secondary";
    case "Pending":
      return "outline";
  }
}

export default function VendorPayoutsPage() {
  const [amount, setAmount] = useState("");

  const availableBalance = 7820;
  const pendingBalance = 3150;

  const handleRequestPayout = () => {
    const requestedAmount = Number(amount);

    if (!requestedAmount || requestedAmount <= 0) {
      alert("Enter a valid payout amount.");
      return;
    }

    if (requestedAmount > availableBalance) {
      alert("Requested amount exceeds your available balance.");
      return;
    }

    alert(`Payout request of ₹${requestedAmount.toLocaleString("en-IN")} submitted.`);
    setAmount("");
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Payouts</h1>
        <p className="text-muted-foreground">
          Request payouts and track your payout history.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <IndianRupee className="h-4 w-4" />
              Available for Payout
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              ₹{availableBalance.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground">
              Amount currently available to withdraw
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              Pending Balance
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              ₹{pendingBalance.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground">
              Amount awaiting settlement
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Payout</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="max-w-md space-y-2">
            <label htmlFor="payout-amount" className="text-sm font-medium">
              Payout Amount
            </label>

            <Input
              id="payout-amount"
              type="number"
              min="1"
              max={availableBalance}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />

            <p className="text-sm text-muted-foreground">
              Maximum available: ₹
              {availableBalance.toLocaleString("en-IN")}
            </p>
          </div>

          <Button onClick={handleRequestPayout}>
            Request Payout
          </Button>
        </CardContent>
      </Card>

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
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {payoutHistory.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">
                      {payout.id}
                    </TableCell>

                    <TableCell>
                      ₹{payout.amount.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>{payout.date}</TableCell>

                    <TableCell>{payout.reference}</TableCell>

                    <TableCell>
                      <Badge variant={getStatusVariant(payout.status)}>
                        {payout.status === "Completed" && (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        )}
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