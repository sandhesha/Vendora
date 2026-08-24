from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    vendor_id: int
    category_id: int
    subcategory_id: int | None = None
    brand_id: int | None = None

    name: str = Field(
        min_length=1,
        max_length=150,
    )

    description: str | None = None

    sku: str = Field(
        min_length=1,
        max_length=100,
    )

    price: float = Field(
        ge=0,
    )

    stock: int = Field(
        default=0,
        ge=0,
    )

    image_url: str | None = Field(
        default=None,
        max_length=500,
    )

    is_active: bool = True


class ProductUpdate(BaseModel):
    vendor_id: int | None = None
    category_id: int | None = None
    subcategory_id: int | None = None
    brand_id: int | None = None

    name: str | None = Field(
        default=None,
        min_length=1,
        max_length=150,
    )

    description: str | None = None

    sku: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    price: float | None = Field(
        default=None,
        ge=0,
    )

    stock: int | None = Field(
        default=None,
        ge=0,
    )

    image_url: str | None = Field(
        default=None,
        max_length=500,
    )

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