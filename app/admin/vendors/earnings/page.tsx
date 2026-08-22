"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Wallet,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: "TXN-1008",
    date: "20 Aug 2026",
    description: "Order #ORD-1024",
    type: "Sale",
    amount: 2499,
    status: "Completed",
  },
  {
    id: "TXN-1007",
    date: "20 Aug 2026",
    description: "Commission - #ORD-1024",
    type: "Commission",
    amount: -250,
    status: "Deducted",
  },
  {
    id: "TXN-1006",
    date: "19 Aug 2026",
    description: "Order #ORD-1022",
    type: "Sale",
    amount: 3250,
    status: "Completed",
  },
  {
    id: "TXN-1005",
    date: "19 Aug 2026",
    description: "Commission - #ORD-1022",
    type: "Commission",
    amount: -325,
    status: "Deducted",
  },
  {
    id: "TXN-1004",
    date: "18 Aug 2026",
    description: "Payout to bank account",
    type: "Payout",
    amount: -10000,
    status: "Completed",
  },
];

export default function VendorEarningsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Earnings
        </h1>

        <p className="text-muted-foreground">
          Track your sales, commissions, earnings and payouts.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Gross Sales
            </CardTitle>

            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              ₹1,24,580
            </p>

            <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              +12.5% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Commission
            </CardTitle>

            <ArrowDownRight className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              ₹12,458
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              10% marketplace commission
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Net Earnings
            </CardTitle>

            <Wallet className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              ₹1,12,122
            </p>

            <p className="mt-1 text-xs text-green-600">
              After commission deductions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>

            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              ₹48,250
            </p>

            <button className="mt-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
              Request Payout
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Earnings breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Breakdown</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-5">
              <p className="text-sm text-muted-foreground">
                Product Sales
              </p>

              <p className="mt-2 text-2xl font-bold">
                ₹1,18,000
              </p>
            </div>

            <div className="rounded-lg border p-5">
              <p className="text-sm text-muted-foreground">
                Commission Deducted
              </p>

              <p className="mt-2 text-2xl font-bold">
                ₹12,458
              </p>
            </div>

            <div className="rounded-lg border p-5">
              <p className="text-sm text-muted-foreground">
                Final Earnings
              </p>

              <p className="mt-2 text-2xl font-bold">
                ₹1,05,542
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3 font-medium">Transaction</th>
                  <th className="p-3 font-medium">Date</th>
                  <th className="p-3 font-medium">Description</th>
                  <th className="p-3 font-medium">Type</th>
                  <th className="p-3 font-medium">Amount</th>
                  <th className="p-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b last:border-0"
                  >
                    <td className="p-3 font-medium">
                      {transaction.id}
                    </td>

                    <td className="p-3 text-muted-foreground">
                      {transaction.date}
                    </td>

                    <td className="p-3">
                      {transaction.description}
                    </td>

                    <td className="p-3">
                      <Badge variant="secondary">
                        {transaction.type}
                      </Badge>
                    </td>

                    <td
                      className={`p-3 font-semibold ${
                        transaction.amount < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {transaction.amount < 0 ? "-" : "+"}
                      ₹
                      {Math.abs(
                        transaction.amount
                      ).toLocaleString("en-IN")}
                    </td>

                    <td className="p-3">
                      <Badge
                        variant={
                          transaction.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}