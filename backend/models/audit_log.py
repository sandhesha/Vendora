from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from backend.database import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        nullable=True,
        index=True,
    )

    action = Column(
        String(100),
        nullable=False,
    )

    entity_type = Column(
        String(100),
        nullable=True,
    )

    entity_id = Column(
        Integer,
        nullable=True,
    )

    details = Column(
        Text,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )