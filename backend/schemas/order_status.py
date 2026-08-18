from pydantic import BaseModel, Field


class OrderStatusUpdate(BaseModel):
    order_status: str = Field(
        min_length=3,
        max_length=30,
    )


class OrderStatusResponse(BaseModel):
    order_id: int
    order_number: str
    order_status: str
    payment_status: str