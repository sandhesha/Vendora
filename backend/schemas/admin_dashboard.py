from pydantic import BaseModel


class AdminDashboardResponse(BaseModel):
    total_users: int
    total_customers: int
    total_vendors: int
    pending_vendors: int

    total_products: int
    active_products: int

    total_orders: int
    pending_orders: int
    completed_orders: int
    cancelled_orders: int

    total_revenue: float
    total_refunds: float