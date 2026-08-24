from pydantic import BaseModel, Field


class CartItemCreate(BaseModel):
    product_id: int
    variant_id: int | None = None
    quantity: int = Field(ge=1)


class CartItemUpdate(BaseModel):
    quantity: int = Field(ge=1)


class CartItemResponse(BaseModel):
    id: int
    cart_id: int
    product_id: int
    variant_id: int | None
    quantity: int

    class Config:
        from_attributes = True


class CartResponse(BaseModel):
    id: int
    customer_id: int
    items: list[CartItemResponse] = []

    class Config:
        from_attributes = True