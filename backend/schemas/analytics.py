from pydantic import BaseModel


class AdminAnalyticsResponse(BaseModel):
    total_sales: float
    total_orders: int
    total_customers: int
    total_vendors: int
    total_products: int

    completed_orders: int
    cancelled_orders: int
    pending_orders: int

    total_commission: float
    total_refunds: float


class VendorAnalyticsResponse(BaseModel):
    vendor_id: int

    total_sales: float
    total_orders: int
    completed_orders: int
    cancelled_orders: int
    pending_orders: int

    total_commission: float
    net_earnings: float