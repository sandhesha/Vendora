from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String

from backend.database import Base


class InventoryTransaction(Base):
    __tablename__ = "inventory_transactions"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
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
    )

    transaction_type = Column(
        String(50),
        nullable=False,
    )

    reason = Column(
        String(255),
        nullable=True,
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )