from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    vendor_id: int
    category_id: int
    subcategory_id: int | None = None
    brand_id: int | None = None

    name: str = Field(min_length=2, max_length=150)
    description: str | None = None

    sku: str = Field(min_length=1, max_length=100)

    price: float = Field(gt=0)
    stock: int = Field(ge=0)

    image_url: str | None = None
    is_active: bool = True


class ProductUpdate(BaseModel):
    category_id: int | None = None
    subcategory_id: int | None = None
    brand_id: int | None = None

    name: str | None = None
    description: str | None = None
    sku: str | None = None

    price: float | None = Field(default=None, gt=0)
    stock: int | None = Field(default=None, ge=0)

    image_url: str | None = None
    is_active: bool | None = None


class ProductResponse(BaseModel):
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

    class Config:
        from_attributes = True