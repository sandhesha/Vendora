from sqlalchemy import Column, Float, ForeignKey, Integer, String

from backend.database import Base


class Commission(Base):
    __tablename__ = "commissions"

    id = Column(Integer, primary_key=True, index=True)

    vendor_id = Column(
        Integer,
        ForeignKey("vendors.id"),
        nullable=False,
    )

    order_id = Column(
        Integer,
        ForeignKey("orders.id"),
        nullable=True,
    )

    order_amount = Column(
        Float,
        nullable=False,
    )

    commission_rate = Column(
        Float,
        nullable=False,
    )

    commission_amount = Column(
        Float,
        nullable=False,
    )

    vendor_amount = Column(
        Float,
        nullable=False,
    )

    status = Column(
        String(20),
        nullable=False,
        default="pending",
    )