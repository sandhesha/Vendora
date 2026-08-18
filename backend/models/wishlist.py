from sqlalchemy import Column, DateTime, ForeignKey, Integer
from datetime import datetime

from backend.database import Base


class Wishlist(Base):
    __tablename__ = "wishlists"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    customer_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        unique=True,
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )


class WishlistItem(Base):
    __tablename__ = "wishlist_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    wishlist_id = Column(
        Integer,
        ForeignKey("wishlists.id"),
        nullable=False,
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False,
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )
