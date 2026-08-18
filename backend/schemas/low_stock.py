from pydantic import BaseModel, Field


class LowStockSettings(BaseModel):
    threshold: int = Field(ge=0)


class LowStockItem(BaseModel):
    type: str
    id: int
    product_id: int
    sku: str
    name: str
    stock: int
    threshold: int