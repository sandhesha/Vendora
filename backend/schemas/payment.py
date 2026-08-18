from pydantic import BaseModel


class PaymentCreate(BaseModel):
    order_id: int
    gateway: str = "mock"


class PaymentResponse(BaseModel):
    id: int
    order_id: int
    transaction_id: str | None
    gateway: str
    amount: float
    currency: str
    status: str

    class Config:
        from_attributes = True


class PaymentVerifyRequest(BaseModel):
    transaction_id: str
    status: str