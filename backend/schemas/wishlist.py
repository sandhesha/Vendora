from pydantic import BaseModel


class WishlistItemCreate(BaseModel):
    product_id: int


class WishlistItemResponse(BaseModel):
    id: int
    wishlist_id: int
    product_id: int

    class Config:
        from_attributes = True


class WishlistResponse(BaseModel):
    id: int
    customer_id: int
    items: list[WishlistItemResponse] = []

    class Config:
        from_attributes = True