from sqlalchemy import Column, Float, ForeignKey, Integer, String
from backend.database import Base


class PayoutRequest(Base):
    __tablename__ = "payout_requests"

    id = Column(Integer, primary_key=True, index=True)

    vendor_id = Column(
        Integer,
        ForeignKey("vendors.id"),
        nullable=False,
    )

    amount = Column(
        Float,
        nullable=False,
    )

    status = Column(
        String(30),
        nullable=False,
        default="pending",
    )

    payment_reference = Column(
        String(255),
        nullable=True,
    )

    rejection_reason = Column(
        String(500),
        nullable=True,
    )