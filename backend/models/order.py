from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text
from datetime import datetime

from backend.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    vendor_id = Column(
        Integer,
        ForeignKey("vendors.id"),
        nullable=False,
    )

    address_id = Column(
        Integer,
        ForeignKey("addresses.id"),
        nullable=False,
    )

    order_number = Column(
        String(50),
        nullable=False,
        unique=True,
    )

    subtotal = Column(
        Float,
        nullable=False,
    )

    shipping_fee = Column(
        Float,
        nullable=False,
        default=0,
    )

    total = Column(
        Float,
        nullable=False,
    )

    payment_method = Column(
        String(30),
        nullable=False,
    )

    payment_status = Column(
        String(30),
        nullable=False,
        default="pending",
    )

    order_status = Column(
        String(30),
        nullable=False,
        default="pending",
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


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)

    order_id = Column(
        Integer,
        ForeignKey("orders.id"),
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

    product_name = Column(
        String(150),
        nullable=False,
    )

    sku = Column(
        String(100),
        nullable=False,
    )

    quantity = Column(
        Integer,
        nullable=False,
    )

    price = Column(
        Float,
        nullable=False,
    )

    subtotal = Column(
        Float,
        nullable=False,
    )