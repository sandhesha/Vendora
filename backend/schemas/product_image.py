from pydantic import BaseModel, Field


class ProductImageCreate(BaseModel):
    product_id: int
    image_url: str = Field(min_length=1, max_length=500)
    is_primary: bool = False
    sort_order: int = Field(default=0, ge=0)


class ProductImageUpdate(BaseModel):
    image_url: str | None = Field(
        default=None,
        min_length=1,
        max_length=500,
    )
    is_primary: bool | None = None
    sort_order: int | None = Field(
        default=None,
        ge=0,
    )


class ProductImageResponse(BaseModel):
    id: int
    product_id: int
    image_url: str
    is_primary: bool
    sort_order: int

    class Config:
        from_attributes = True