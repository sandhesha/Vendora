from pydantic import BaseModel


class PublicVendorResponse(BaseModel):
    id: int
    store_name: str
    store_description: str | None = None
    phone: str | None = None
    approval_status: str

    class Config:
        from_attributes = True
