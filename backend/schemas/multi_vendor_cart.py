from pydantic import BaseModel


class MultiVendorCartItem(BaseModel):
    cart_item_id: int
    product_id: int
    variant_id: int | None
    product_name: str
    sku: str
    quantity: int
    price: float
    subtotal: float


class VendorCartGroup(BaseModel):
    vendor_id: int
    store_name: str
    items: list[MultiVendorCartItem]
    subtotal: float


class MultiVendorCartResponse(BaseModel):
    customer_id: int
    vendors: list[VendorCartGroup]
    grand_total: float