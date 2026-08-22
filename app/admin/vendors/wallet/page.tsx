"use client";

import {
  ArrowDownToLine,
  CheckCircle,
  Clock,
  CreditCard,
  Wallet as WalletIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const payouts = [
  {
    id: "PAY-1004",
    date: "18 Aug 2026",
    amount: 10000,
    method: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "PAY-1003",
    date: "10 Aug 2026",
    amount: 15000,
    method: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "PAY-1002",
    date: "02 Aug 2026",
    amount: 8000,
    method: "Bank Transfer",
    status: "Processing",
  },
  {
    id: "PAY-1001",
    date: "25 Jul 2026",
    amount: 12000,
    method: "Bank Transfer",
    status: "Completed",
  },
];

export default function VendorWalletPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Wallet
        </h1>

        <p className="text-muted-foreground">
          Manage your balance and payout requests.
        </p>
      </div>

      {/* Balance cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>

            <WalletIcon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              ₹48,250
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Available for withdrawal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Balance
            </CardTitle>

            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              ₹16,840
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Will be available after order completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Withdrawn
            </CardTitle>

            <ArrowDownToLine className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              ₹45,000
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Lifetime payouts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payout request */}
      <Card>
        <CardHeader>
          <CardTitle>Request Payout</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Amount
                </label>

                <div className="mt-2 flex items-center rounded-md border px-3">
                  <span className="text-muted-foreground">
                    ₹
                  </span>

                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full bg-transparent px-2 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Payout Method
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-md border p-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm font-medium">
                      Bank Account
                    </p>

                    <p className="text-xs text-muted-foreground">
                      **** **** **** 4821
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Request Payout
              </button>
            </div>

            <div className="rounded-lg border bg-muted/30 p-5">
              <h3 className="font-semibold">
                Payout Information
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Available
                  </span>
                  <span className="font-medium">
                    ₹48,250
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Minimum payout
                  </span>
                  <span className="font-medium">
                    ₹500
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Processing time
                  </span>
                  <span className="font-medium">
                    2–5 business days
                  </span>
                </div>

                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground">
                    Make sure your bank account information is
                    correct before requesting a payout.
                  </p>
                </div>
              </div>
            </div>
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
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3 font-medium">
                    Payout ID
                  </th>
                  <th className="p-3 font-medium">
                    Date
                  </th>
                  <th className="p-3 font-medium">
                    Amount
                  </th>
                  <th className="p-3 font-medium">
                    Method
                  </th>
                  <th className="p-3 font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {payouts.map((payout) => (
                  <tr
                    key={payout.id}
                    className="border-b last:border-0"
                  >
                    <td className="p-3 font-medium">
                      {payout.id}
                    </td>

                    <td className="p-3 text-muted-foreground">
                      {payout.date}
                    </td>

                    <td className="p-3 font-semibold">
                      ₹{payout.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="p-3">
                      {payout.method}
                    </td>

                    <td className="p-3">
                      <Badge
                        variant={
                          payout.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {payout.status === "Completed" && (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        )}

                        {payout.status}
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