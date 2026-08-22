"use client";

import { ArrowDownLeft, ArrowUpRight, Wallet as WalletIcon } from "lucide-react";

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

const transactions = [
  {
    id: "TXN-1001",
    type: "Credit",
    description: "Order settlement #ORD-1001",
    amount: 2250,
    date: "2026-08-15",
    status: "Completed",
  },
  {
    id: "TXN-1002",
    type: "Credit",
    description: "Order settlement #ORD-1002",
    amount: 3780,
    date: "2026-08-16",
    status: "Completed",
  },
  {
    id: "TXN-1003",
    type: "Debit",
    description: "Payout request",
    amount: 3000,
    date: "2026-08-17",
    status: "Processing",
  },
  {
    id: "TXN-1004",
    type: "Credit",
    description: "Order settlement #ORD-1003",
    amount: 2790,
    date: "2026-08-18",
    status: "Completed",
  },
];

export default function VendorWalletPage() {
  const availableBalance = 7820;
  const pendingBalance = 3150;
  const totalEarnings = 10970;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">
          View your available balance, pending balance, and wallet activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <WalletIcon className="h-4 w-4" />
              Available Balance
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              ₹{availableBalance.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground">
              Available for payout
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pending Balance</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              ₹{pendingBalance.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground">
              Awaiting settlement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Earnings</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalEarnings.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground">
              Lifetime vendor earnings
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>

                    <TableCell>{transaction.description}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.type === "Credit" ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                        {transaction.type}
                      </div>
                    </TableCell>

                    <TableCell className="font-medium">
                      ₹{transaction.amount.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>{transaction.date}</TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {transaction.status}
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