from sqlalchemy import Column, DateTime, ForeignKey, Integer
from datetime import datetime

from backend.database import Base


class Cart(Base):
    __tablename__ = "carts"

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

    updated_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )


class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    cart_id = Column(
        Integer,
        ForeignKey("carts.id"),
        nullable=False,
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False,
    )

    variant_id = Column(
        Integer,
        ForeignKey("product_variants.id"),
        nullable=True,
    )

    quantity = Column(
        Integer,
        nullable=False,
        default=1,
    )