from sqlalchemy import Column, Float, ForeignKey, Integer, String, Boolean

from backend.database import Base


class ProductVariant(Base):
    __tablename__ = "product_variants"

    id = Column(Integer, primary_key=True, index=True)

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False,
    )

    name = Column(
        String(150),
        nullable=False,
    )

    sku = Column(
        String(100),
        nullable=False,
        unique=True,
    )

    price = Column(
        Float,
        nullable=False,
    )

    stock = Column(
        Integer,
        nullable=False,
        default=0,
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
    )