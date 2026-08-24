from pydantic import BaseModel, Field


class CommissionCreate(BaseModel):
    vendor_id: int
    order_id: int | None = None
    order_amount: float = Field(gt=0)
    commission_rate: float = Field(ge=0, le=100)


class CommissionResponse(BaseModel):
    id: int
    vendor_id: int
    order_id: int | None

    order_amount: float
    commission_rate: float
    commission_amount: float
    vendor_amount: float
    status: str

    class Config:
        from_attributes = True