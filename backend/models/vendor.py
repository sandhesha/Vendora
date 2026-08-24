from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from backend.database import Base


class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        unique=True,
    )

    store_name = Column(String(150), nullable=False)

    store_description = Column(Text, nullable=True)

    phone = Column(String(20), nullable=True)

    approval_status = Column(
        String(20),
        nullable=False,
        default="pending",
    )

    user = relationship("User")