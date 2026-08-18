from pydantic import BaseModel


class SalesReportResponse(BaseModel):
    total_sales: float
    total_orders: int
    total_commission: float
    net_earnings: float