from pydantic import BaseModel


class BrandCreate(BaseModel):
    name: str
    description: str | None = None
    logo_url: str | None = None
    is_active: bool = True


class BrandUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    logo_url: str | None = None
    is_active: bool | None = None


class BrandResponse(BaseModel):
    id: int
    name: str
    description: str | None
    logo_url: str | None
    is_active: bool

    class Config:
        from_attributes = True