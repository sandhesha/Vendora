from pydantic import BaseModel


class CategoryCreate(BaseModel):
    name: str
    description: str | None = None
    is_active: bool = True


class CategoryUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    is_active: bool | None = None


class CategoryResponse(BaseModel):
    id: int
    name: str
    description: str | None
    is_active: bool

    class Config:
        from_attributes = True


class SubcategoryCreate(BaseModel):
    category_id: int
    name: str
    description: str | None = None
    is_active: bool = True


class SubcategoryUpdate(BaseModel):
    category_id: int | None = None
    name: str | None = None
    description: str | None = None
    is_active: bool | None = None


class SubcategoryResponse(BaseModel):
    id: int
    category_id: int
    name: str
    description: str | None
    is_active: bool

    class Config:
        from_attributes = True