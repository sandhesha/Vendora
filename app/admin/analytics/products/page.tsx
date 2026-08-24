"use client";

import {
  Package,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
} from "lucide-react";

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

const products = [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    unitsSold: 184,
    revenue: 459816,
    stock: 42,
    status: "Top Seller",
  },
  {
    name: "Smart Watch",
    category: "Electronics",
    unitsSold: 126,
    revenue: 503874,
    stock: 18,
    status: "Top Seller",
  },
  {
    name: "Running Shoes",
    category: "Footwear",
    unitsSold: 98,
    revenue: 284102,
    stock: 7,
    status: "Low Stock",
  },
  {
    name: "Travel Backpack",
    category: "Accessories",
    unitsSold: 76,
    revenue: 136724,
    stock: 0,
    status: "Out of Stock",
  },
  {
    name: "Cotton T-Shirt",
    category: "Fashion",
    unitsSold: 65,
    revenue: 77935,
    stock: 34,
    status: "Active",
  },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Top Seller":
      return "default";
    case "Low Stock":
      return "secondary";
    case "Out of Stock":
      return "destructive";
    default:
      return "outline";
  }
};

export default function ProductAnalyticsPage() {
  const totalProducts = 248;
  const activeProducts = 231;
  const outOfStock = 9;
  const lowStock = 18;

  const totalUnitsSold = products.reduce(
    (total, product) => total + product.unitsSold,
    0
  );

  const totalRevenue = products.reduce(
    (total, product) => total + product.revenue,
    0
  );

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Product Analytics</h1>
        <p className="text-muted-foreground">
          Monitor product performance, sales, and inventory levels.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalProducts}</p>
            <p className="text-sm text-muted-foreground">
              Products in marketplace
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              Active Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{activeProducts}</p>
            <p className="text-sm text-muted-foreground">
              Currently available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4" />
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{lowStock}</p>
            <p className="text-sm text-muted-foreground">
              Products need restocking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <ShoppingCart className="h-4 w-4" />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{outOfStock}</p>
            <p className="text-sm text-muted-foreground">
              Currently unavailable
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">
                Units Sold
              </p>
              <p className="text-3xl font-bold">{totalUnitsSold}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Product Revenue
              </p>
              <p className="text-3xl font-bold">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Units Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>

                    <TableCell>{product.category}</TableCell>

                    <TableCell>{product.unitsSold}</TableCell>

                    <TableCell>
                      ₹{product.revenue.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>{product.stock}</TableCell>

                    <TableCell>
                      <Badge variant={getStatusVariant(product.status)}>
                        {product.status}
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