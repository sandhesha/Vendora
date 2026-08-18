from pydantic import BaseModel, Field


class ProductAttributeCreate(BaseModel):
    product_id: int
    name: str = Field(min_length=1, max_length=100)
    value: str = Field(min_length=1, max_length=255)


class ProductAttributeUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    value: str | None = Field(
        default=None,
        min_length=1,
        max_length=255,
    )


class ProductAttributeResponse(BaseModel):
    id: int
    product_id: int
    name: str
    value: str

    class Config:
        from_attributes = True