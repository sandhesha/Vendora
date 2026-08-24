from pydantic import BaseModel


class AdminVendorResponse(BaseModel):
    id: int
    user_id: int
    store_name: str
    store_description: str | None = None
    phone: str | None = None
    approval_status: str
    email: str | None = None
    products: int = 0
    sales: float = 0.0

    class Config:
        from_attributes = True