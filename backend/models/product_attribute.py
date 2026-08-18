from sqlalchemy import Column, ForeignKey, Integer, String

from backend.database import Base


class ProductAttribute(Base):
    __tablename__ = "product_attributes"

    id = Column(Integer, primary_key=True, index=True)

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False,
    )

    name = Column(
        String(100),
        nullable=False,
    )

    value = Column(
        String(255),
        nullable=False,
    )