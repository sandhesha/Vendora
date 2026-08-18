from pydantic import BaseModel


class WalletResponse(BaseModel):
    id: int
    vendor_id: int
    available_balance: float
    pending_balance: float
    total_earnings: float

    class Config:
        from_attributes = True