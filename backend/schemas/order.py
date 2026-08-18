from pydantic import BaseModel


class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    product_id: int
    variant_id: int | None
    product_name: str
    sku: str
    quantity: int
    price: float
    subtotal: float

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: int
    customer_id: int
    vendor_id: int
    address_id: int
    order_number: str

    subtotal: float
    shipping_fee: float
    total: float

    payment_method: str
    payment_status: str
    order_status: str

    items: list[OrderItemResponse] = []

    class Config:
        from_attributes = True
