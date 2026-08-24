from datetime import datetime

from pydantic import BaseModel, Field


class InventoryTransactionCreate(BaseModel):
    product_id: int
    variant_id: int | None = None

    quantity: int = Field(
        description="Positive for stock addition, negative for stock reduction"
    )

    transaction_type: str = Field(
        min_length=1,
        max_length=50,
    )

    reason: str | None = Field(
        default=None,
        max_length=255,
    )


class InventoryTransactionResponse(BaseModel):
    id: int
    product_id: int
    variant_id: int | None
    quantity: int
    transaction_type: str
    reason: str | None
    created_at: datetime

    class Config:
        from_attributes = True