from pydantic import BaseModel


class VendorEarningsResponse(BaseModel):
    vendor_id: int
    total_sales: float
    total_commission: float
    net_earnings: float
    pending_earnings: float
    available_earnings: float