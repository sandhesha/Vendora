from pydantic import BaseModel


class AdminVendorResponse(BaseModel):
    id: int
    user_id: int
    store_name: str
    store_description: str | None
    phone: str | None
    approval_status: str

    class Config:
        from_attributes = True