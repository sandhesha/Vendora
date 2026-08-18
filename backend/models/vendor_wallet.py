from sqlalchemy import Column, Float, ForeignKey, Integer

from backend.database import Base


class VendorWallet(Base):
    __tablename__ = "vendor_wallets"

    id = Column(Integer, primary_key=True, index=True)

    vendor_id = Column(
        Integer,
        ForeignKey("vendors.id"),
        nullable=False,
        unique=True,
    )

    available_balance = Column(
        Float,
        nullable=False,
        default=0,
    )

    pending_balance = Column(
        Float,
        nullable=False,
        default=0,
    )