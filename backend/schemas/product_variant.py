from pydantic import BaseModel, Field


class ProductVariantCreate(BaseModel):
    product_id: int
    name: str = Field(min_length=1, max_length=150)

    sku: str = Field(min_length=1, max_length=100)

    price: float = Field(gt=0)

    stock: int = Field(ge=0)

    is_active: bool = True


class ProductVariantUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=1,
        max_length=150,
    )

    sku: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    price: float | None = Field(
        default=None,
        gt=0,
    )

    stock: int | None = Field(
        default=None,
        ge=0,
    )

    is_active: bool | None = None


class ProductVariantResponse(BaseModel):
    id: int
    product_id: int
    name: str
    sku: str
    price: float
    stock: int
    is_active: bool

    class Config:
        from_attributes = True