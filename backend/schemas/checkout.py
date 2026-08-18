from pydantic import BaseModel, Field


class CheckoutRequest(BaseModel):
    address_id: int
    payment_method: str = Field(
        default="cod",
        min_length=2,
        max_length=30,
    )


class CheckoutItemResponse(BaseModel):
    product_id: int
    variant_id: int | None
    product_name: str
    vendor_id: int
    quantity: int
    price: float
    subtotal: float


class CheckoutVendorResponse(BaseModel):
    vendor_id: int
    store_name: str
    items: list[CheckoutItemResponse]
    subtotal: float


class CheckoutResponse(BaseModel):
    customer_id: int
    address_id: int
    payment_method: str
    vendors: list[CheckoutVendorResponse]
    subtotal: float
    shipping_fee: float
    total: float