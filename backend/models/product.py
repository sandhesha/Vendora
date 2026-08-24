from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String, Text

from backend.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    vendor_id = Column(
        Integer,
        ForeignKey("vendors.id"),
        nullable=False,
    )

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False,
    )

    subcategory_id = Column(
        Integer,
        ForeignKey("subcategories.id"),
        nullable=True,
    )

    brand_id = Column(
        Integer,
        ForeignKey("brands.id"),
        nullable=True,
    )

    name = Column(
        String(150),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=True,
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

    image_url = Column(
        String(500),
        nullable=True,
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
    )