from pydantic import BaseModel, Field


class RefundCreate(BaseModel):
    reason: str | None = None


class RefundStatusUpdate(BaseModel):
    status: str = Field(
        min_length=3,
        max_length=30,
    )


class RefundResponse(BaseModel):
    id: int
    order_id: int
    customer_id: int
    amount: float
    reason: str | None
    status: str
    refund_transaction_id: str | None

    class Config:
        from_attributes = True