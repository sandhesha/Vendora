from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from backend.database import Base


class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(Integer, primary_key=True, index=True)

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False,
    )

    image_url = Column(
        String(500),
        nullable=False,
    )

    is_primary = Column(
        Boolean,
        nullable=False,
        default=False,
    )

    sort_order = Column(
        Integer,
        nullable=False,
        default=0,
    )