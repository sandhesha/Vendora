"use client";

import {
  Check,
  Loader2,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  approveVendor,
  getVendor,
  getVendors,
  rejectVendor,
  type Vendor,
} from "@/lib/api/vendors";

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [search, setSearch] = useState("");
  const [selectedVendor, setSelectedVendor] =
    useState<Vendor | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] =
    useState<number | null>(null);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  /*
   * LOAD VENDORS
   */
  useEffect(() => {
    let mounted = true;

    async function loadVendors() {
      try {
        setLoading(true);
        setError("");

        const data = await getVendors();

        if (mounted) {
          setVendors(data);
        }
      } catch (err) {
        console.error(
          "Failed to load vendors:",
          err,
        );

        if (mounted) {
          setError(
            "Failed to load vendors from the backend.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadVendors();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * SEARCH
   */
  const filteredVendors = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return vendors;
    }

    return vendors.filter((vendor) => {
      const storeName = String(
        vendor.store_name ?? "",
      ).toLowerCase();

      const phone = String(
        vendor.phone ?? "",
      ).toLowerCase();

      const email = String(
        vendor.email ?? "",
      ).toLowerCase();

      const status = String(
        vendor.approval_status ?? "",
      ).toLowerCase();

      const vendorId = String(
        vendor.id ?? "",
      ).toLowerCase();

      const userId = String(
        vendor.user_id ?? "",
      ).toLowerCase();

      const description = String(
        vendor.store_description ?? "",
      ).toLowerCase();

      return (
        storeName.includes(query) ||
        phone.includes(query) ||
        email.includes(query) ||
        status.includes(query) ||
        vendorId.includes(query) ||
        userId.includes(query) ||
        description.includes(query)
      );
    });
  }, [vendors, search]);

  /*
   * STATS
   */
  const totalVendors = vendors.length;

  const approvedVendors = vendors.filter(
    (vendor) =>
      vendor.approval_status?.toLowerCase() ===
      "approved",
  ).length;

  const pendingVendors = vendors.filter(
    (vendor) =>
      vendor.approval_status?.toLowerCase() ===
      "pending",
  ).length;

  const rejectedVendors = vendors.filter(
    (vendor) =>
      vendor.approval_status?.toLowerCase() ===
      "rejected",
  ).length;

  /*
   * STATUS LABEL
   */
  function getStatusLabel(status: string) {
    const normalized =
      status?.toLowerCase() ?? "";

    if (normalized === "approved") {
      return "Active";
    }

    if (normalized === "pending") {
      return "Pending";
    }

    if (normalized === "rejected") {
      return "Rejected";
    }

    return status || "Unknown";
  }

  /*
   * STATUS VARIANT
   */
  function getStatusVariant(
    status: string,
  ) {
    const normalized =
      status?.toLowerCase() ?? "";

    if (normalized === "approved") {
      return "default" as const;
    }

    if (normalized === "pending") {
      return "secondary" as const;
    }

    if (normalized === "rejected") {
      return "destructive" as const;
    }

    return "outline" as const;
  }

  /*
   * VIEW DETAILS
   */
  async function handleViewDetails(
    vendor: Vendor,
  ) {
    try {
      setDetailsLoading(true);
      setSelectedVendor(vendor);

      const data = await getVendor(vendor.id);

      setSelectedVendor(data);
    } catch (err) {
      console.error(
        "Failed to load vendor details:",
        err,
      );

      setSelectedVendor(vendor);
    } finally {
      setDetailsLoading(false);
    }
  }

  /*
   * APPROVE
   */
  async function handleApprove(
    vendorId: number,
  ) {
    try {
      setActionLoading(vendorId);
      setError("");

      const updatedVendor =
        await approveVendor(vendorId);

      setVendors((current) =>
        current.map((vendor) =>
          vendor.id === vendorId
            ? {
                ...vendor,
                ...updatedVendor,
              }
            : vendor,
        ),
      );

      if (
        selectedVendor &&
        selectedVendor.id === vendorId
      ) {
        setSelectedVendor((current) =>
          current
            ? {
                ...current,
                ...updatedVendor,
              }
            : current,
        );
      }
    } catch (err) {
      console.error(
        "Failed to approve vendor:",
        err,
      );

      setError(
        "Failed to approve vendor.",
      );
    } finally {
      setActionLoading(null);
    }
  }

  /*
   * REJECT
   */
  async function handleReject(
    vendorId: number,
  ) {
    try {
      setActionLoading(vendorId);
      setError("");

      const updatedVendor =
        await rejectVendor(vendorId);

      setVendors((current) =>
        current.map((vendor) =>
          vendor.id === vendorId
            ? {
                ...vendor,
                ...updatedVendor,
              }
            : vendor,
        ),
      );

      if (
        selectedVendor &&
        selectedVendor.id === vendorId
      ) {
        setSelectedVendor((current) =>
          current
            ? {
                ...current,
                ...updatedVendor,
              }
            : current,
        );
      }
    } catch (err) {
      console.error(
        "Failed to reject vendor:",
        err,
      );

      setError(
        "Failed to reject vendor.",
      );
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <main className="p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Vendors
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage marketplace vendors and their
            accounts.
          </p>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="ml-4"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* STATS */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Vendors
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {totalVendors}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Vendors
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {approvedVendors}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approval
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {pendingVendors}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Rejected
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {rejectedVendors}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* VENDOR TABLE */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>
              Vendor Management
            </CardTitle>

            {/* SEARCH */}
            <div className="relative w-full sm:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="search"
                placeholder="Search vendors..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="h-10 pl-9 pr-9"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* SEARCH RESULT COUNT */}
          {!loading && search.trim() && (
            <p className="mt-3 text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredVendors.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {vendors.length}
              </span>{" "}
              vendors
            </p>
          )}
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex min-h-48 items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading vendors...
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Vendor
                    </TableHead>

                    <TableHead>
                      Phone
                    </TableHead>

                    <TableHead>
                      Products
                    </TableHead>

                    <TableHead>
                      Sales
                    </TableHead>

                    <TableHead>
                      Status
                    </TableHead>

                    <TableHead className="text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredVendors.map(
                    (vendor) => {
                      const status =
                        vendor.approval_status?.toLowerCase() ??
                        "";

                      const isPending =
                        status === "pending";

                      const isApproved =
                        status === "approved";

                      const isRejected =
                        status === "rejected";

                      const isLoading =
                        actionLoading ===
                        vendor.id;

                      return (
                        <TableRow
                          key={vendor.id}
                        >
                          {/* VENDOR */}
                          <TableCell>
                            <div className="font-medium">
                              {vendor.store_name}
                            </div>

                            <div className="max-w-xs truncate text-xs text-muted-foreground">
                              {vendor.store_description ??
                                "No description"}
                            </div>
                          </TableCell>

                          {/* PHONE */}
                          <TableCell>
                            {vendor.phone || "—"}
                          </TableCell>

                          {/* PRODUCTS */}
                          <TableCell>
                            {vendor.products ?? 0}
                          </TableCell>

                          {/* SALES */}
                          <TableCell>
                            ₹
                            {(
                              vendor.sales ?? 0
                            ).toLocaleString(
                              "en-IN",
                            )}
                          </TableCell>

                          {/* STATUS */}
                          <TableCell>
                            <Badge
                              variant={getStatusVariant(
                                vendor.approval_status,
                              )}
                            >
                              {getStatusLabel(
                                vendor.approval_status,
                              )}
                            </Badge>
                          </TableCell>

                          {/* ACTIONS */}
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <span className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg hover:bg-muted">
                                  <MoreHorizontal className="h-4 w-4" />
                                </span>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleViewDetails(
                                      vendor,
                                    )
                                  }
                                >
                                  View Details
                                </DropdownMenuItem>

                                {isPending && (
                                  <>
                                    <DropdownMenuItem
                                      disabled={
                                        isLoading
                                      }
                                      onClick={() =>
                                        handleApprove(
                                          vendor.id,
                                        )
                                      }
                                    >
                                      {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      ) : (
                                        <Check className="mr-2 h-4 w-4" />
                                      )}

                                      Approve Vendor
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                      disabled={
                                        isLoading
                                      }
                                      onClick={() =>
                                        handleReject(
                                          vendor.id,
                                        )
                                      }
                                    >
                                      <X className="mr-2 h-4 w-4" />
                                      Reject Vendor
                                    </DropdownMenuItem>
                                  </>
                                )}

                                {isApproved && (
                                  <DropdownMenuItem disabled>
                                    Vendor Approved
                                  </DropdownMenuItem>
                                )}

                                {isRejected && (
                                  <DropdownMenuItem disabled>
                                    Vendor Rejected
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    },
                  )}

                  {filteredVendors.length ===
                    0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-24 text-center text-muted-foreground"
                      >
                        {search.trim()
                          ? `No vendors found for "${search}"`
                          : "No vendors available."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* DETAILS DIALOG */}
      <Dialog
        open={!!selectedVendor}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedVendor(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Vendor Details
            </DialogTitle>

            <DialogDescription>
              Vendor account information from
              Vendora backend.
            </DialogDescription>
          </DialogHeader>

          {detailsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            selectedVendor && (
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Store Name
                  </p>

                  <p className="font-medium">
                    {selectedVendor.store_name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Description
                  </p>

                  <p>
                    {selectedVendor.store_description ??
                      "No description"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Phone
                  </p>

                  <p>
                    {selectedVendor.phone || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Email
                  </p>

                  <p>
                    {selectedVendor.email || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    User ID
                  </p>

                  <p>
                    {selectedVendor.user_id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Vendor ID
                  </p>

                  <p>
                    {selectedVendor.id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Status
                  </p>

                  <Badge
                    variant={getStatusVariant(
                      selectedVendor.approval_status,
                    )}
                  >
                    {getStatusLabel(
                      selectedVendor.approval_status,
                    )}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Products
                    </p>

                    <p className="font-semibold">
                      {selectedVendor.products ??
                        0}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Sales
                    </p>

                    <p className="font-semibold">
                      ₹
                      {(
                        selectedVendor.sales ?? 0
                      ).toLocaleString(
                        "en-IN",
                      )}
                    </p>
                  </div>
                </div>

                {selectedVendor.approval_status?.toLowerCase() ===
                  "pending" && (
                  <div className="flex gap-3 pt-2">
                    <Button
                      className="flex-1"
                      disabled={
                        actionLoading ===
                        selectedVendor.id
                      }
                      onClick={() =>
                        handleApprove(
                          selectedVendor.id,
                        )
                      }
                    >
                      {actionLoading ===
                      selectedVendor.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="mr-2 h-4 w-4" />
                      )}

                      Approve
                    </Button>

                    <Button
                      variant="destructive"
                      className="flex-1"
                      disabled={
                        actionLoading ===
                        selectedVendor.id
                      }
                      onClick={() =>
                        handleReject(
                          selectedVendor.id,
                        )
                      }
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}