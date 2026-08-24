from pydantic import BaseModel


class ProductDetailResponse(BaseModel):
    id: int
    vendor_id: int
    category_id: int
    subcategory_id: int | None
    brand_id: int | None

    name: str
    description: str | None
    sku: str
    price: float
    stock: int
    image_url: str | None
    is_active: bool

    images: list
    variants: list
    attributes: list

    class Config:
        from_attributes = True