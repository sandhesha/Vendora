from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from backend.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False, unique=True)

    description = Column(String(255), nullable=True)

    is_active = Column(Boolean, nullable=False, default=True)


class Subcategory(Base):
    __tablename__ = "subcategories"

    id = Column(Integer, primary_key=True, index=True)

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False,
    )

    name = Column(String(100), nullable=False)

    description = Column(String(255), nullable=True)

    is_active = Column(Boolean, nullable=False, default=True)