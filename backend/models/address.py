from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from backend.database import Base


class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    full_name = Column(String(100), nullable=False)

    phone = Column(String(20), nullable=False)

    address_line = Column(String(255), nullable=False)

    city = Column(String(100), nullable=False)

    state = Column(String(100), nullable=False)

    postal_code = Column(String(20), nullable=False)

    country = Column(
        String(100),
        nullable=False,
        default="India",
    )

    is_default = Column(
        Boolean,
        nullable=False,
        default=False,
    )