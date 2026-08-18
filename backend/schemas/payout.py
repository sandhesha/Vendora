from pydantic import BaseModel


class PayoutCreate(BaseModel):
    amount: float


class PayoutStatusUpdate(BaseModel):
    status: str
    payment_reference: str | None = None
    rejection_reason: str | None = None


class PayoutResponse(BaseModel):
    id: int
    vendor_id: int
    amount: float
    status: str
    payment_reference: str | None
    rejection_reason: str | None

    class Config:
        from_attributes = True