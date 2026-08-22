from fastapi import Depends, FastAPI, HTTPException
from backend.models import AuditLog
from backend.schemas.audit_log import AuditLogResponse
from fastapi.security import (HTTPAuthorizationCredentials, HTTPBearer,)
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from backend.models.vendor import Vendor
from sqlalchemy.orm import Session
from backend.core.security import (ALGORITHM,SECRET_KEY,create_access_token,hash_password,verify_password,)
from backend.database import Base, SessionLocal, engine
from backend.models.product_attribute import ProductAttribute
from backend.models.refund import Refund
from backend.models import (User,Vendor, Address,Category,Subcategory,Brand,)
from backend.schemas.vendor import PublicVendorResponse
from backend.schemas.category import (CategoryCreate,CategoryUpdate,CategoryResponse,SubcategoryCreate,SubcategoryUpdate,SubcategoryResponse,)
from backend.models import (
    User,
    Vendor,
    Address,
    Category,
    Subcategory,
    Brand,
    Product,
    ProductImage,)
from backend.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,)
from backend.schemas.product_image import (
    ProductImageCreate,
    ProductImageUpdate,
    ProductImageResponse,)
from backend.schemas.brand import (BrandCreate,BrandUpdate,BrandResponse,)
from backend.schemas.address import (AddressCreate,AddressUpdate,AddressResponse,)
from backend.schemas.auth import (
    UserLogin,
    UserRegister,
    UserResponse,
    UserProfileUpdate,
    VendorRegister,
    VendorResponse,
    ChangePasswordRequest,
)
from backend.models import ProductVariant
from backend.schemas.product_variant import (
    ProductVariantCreate,
    ProductVariantUpdate,
    ProductVariantResponse,)
from backend.schemas.product_attribute import (
    ProductAttributeCreate,
    ProductAttributeUpdate,
    ProductAttributeResponse,)
from backend.models import InventoryTransaction
from backend.schemas.inventory import (
    InventoryTransactionCreate,
    InventoryTransactionResponse,)
from backend.schemas.product_detail import ProductDetailResponse
from backend.models import Cart, CartItem
from backend.schemas.cart import (
    CartItemCreate,
    CartItemUpdate,
    CartItemResponse,
    CartResponse,)
from backend.schemas.multi_vendor_cart import (
    MultiVendorCartItem,
    VendorCartGroup,
    MultiVendorCartResponse,)
from backend.models import Wishlist, WishlistItem
from backend.schemas.wishlist import (
    WishlistItemCreate,
    WishlistItemResponse,
    WishlistResponse,)
from backend.schemas.checkout import (
    CheckoutRequest,
    CheckoutItemResponse,
    CheckoutVendorResponse,
    CheckoutResponse,)
from uuid import uuid4
from backend.models import Order, OrderItem
from backend.schemas.order import OrderItemResponse, OrderResponse
from backend.schemas.order_status import (
    OrderStatusUpdate,
    OrderStatusResponse,)
from uuid import uuid4
from backend.models import Payment
from backend.schemas.payment import (
    PaymentCreate,
    PaymentResponse,
    PaymentVerifyRequest,)
from backend.schemas.refund import (
    RefundCreate,
    RefundStatusUpdate,
    RefundResponse,)
from backend.schemas.admin_dashboard import AdminDashboardResponse
from backend.schemas.admin_vendor import AdminVendorResponse
from backend.models import Commission
from backend.schemas.commission import (CommissionCreate,CommissionResponse)
from backend.schemas.vendor_earnings import VendorEarningsResponse
from backend.models import VendorWallet, PayoutRequest

from backend.schemas.wallet import WalletResponse
from backend.schemas.payout import PayoutCreate, PayoutResponse
from backend.schemas.analytics import (
    AdminAnalyticsResponse,
    VendorAnalyticsResponse,)
from backend.schemas.sales_report import SalesReportResponse

app = FastAPI(
    title="Multi-Vendor E-Commerce API",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)


security = HTTPBearer()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {
        "message": "Multi-Vendor E-Commerce API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post("/auth/register", response_model=UserResponse)
def register(
    user_data: UserRegister,
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        role=user_data.role,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    

    return new_user


@app.post("/auth/login")
def login(
    user_data: UserLogin,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    if not verify_password(
        user_data.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "role": user.role,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@app.get("/auth/me", response_model=UserResponse)
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    user = (
        db.query(User)
        .filter(User.id == int(user_id))
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user



@app.post("/auth/change-password")
def change_password(
    password_data: ChangePasswordRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token",
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token",
        )

    user = (
        db.query(User)
        .filter(User.id == int(user_id))
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    # Verify current password
    if not verify_password(
        password_data.current_password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect",
        )

    # Check new password confirmation
    if password_data.new_password != password_data.confirm_password:
        raise HTTPException(
            status_code=400,
            detail="New passwords do not match",
        )

    # Prevent using the same password
    if password_data.current_password == password_data.new_password:
        raise HTTPException(
            status_code=400,
            detail="New password must be different from current password",
        )

    # Validate password length
    if len(password_data.new_password) < 8:
        raise HTTPException(
            status_code=400,
            detail="New password must be at least 8 characters long",
        )

    # Hash and save new password
    user.password_hash = hash_password(
        password_data.new_password
    )

    db.commit()
    db.refresh(user)

    return {
        "message": "Password changed successfully"
    }



@app.get("/users/me", response_model=UserResponse)
def get_my_profile(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    user = (
        db.query(User)
        .filter(User.id == int(user_id))
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user

@app.patch("/users/me", response_model=UserResponse)
def update_my_profile(
    user_data: UserProfileUpdate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    user = (
        db.query(User)
        .filter(User.id == int(user_id))
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    if user_data.name is not None:
        user.name = user_data.name

    db.commit()
    db.refresh(user)

    return user


def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    user = (
        db.query(User)
        .filter(User.id == int(user_id))
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    if user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required",
        )

    return user

@app.get(
    "/vendors",
    response_model=list[AdminVendorResponse],
)
def get_public_vendors(
    db: Session = Depends(get_db),
):
    vendors = (
        db.query(Vendor)
        .filter(Vendor.approval_status == "approved")
        .order_by(Vendor.id.desc())
        .all()
    )

    return vendors


@app.get(
    "/vendors",
    response_model=list[PublicVendorResponse],
)
def get_public_vendors(
    db: Session = Depends(get_db),
):
    return (
        db.query(Vendor)
        .filter(Vendor.approval_status == "approved")
        .order_by(Vendor.id.desc())
        .all()
    )

@app.patch(
    "/admin/vendors/{vendor_id}/approve",
    response_model=AdminVendorResponse,
)
def approve_vendor(
    vendor_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    vendor.approval_status = "approved"

    db.commit()
    db.refresh(vendor)

    return vendor


@app.patch(
    "/admin/vendors/{vendor_id}/reject",
    response_model=AdminVendorResponse,
)
def reject_vendor(
    vendor_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    vendor.approval_status = "rejected"

    db.commit()
    db.refresh(vendor)

    return vendor


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

        user_id = int(user_id)

    except (JWTError, ValueError, TypeError):
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="User account is inactive",
        )

    return user


def get_current_admin(
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required",
        )

    return current_user


def get_current_vendor(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role != "vendor":
        raise HTTPException(
            status_code=403,
            detail="Vendor access required",
        )

    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == current_user.id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor profile not found",
        )

    return vendor


def get_current_customer(
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "customer":
        raise HTTPException(
            status_code=403,
            detail="Customer access required",
        )

    return current_user


def require_roles(*allowed_roles: str):
    def role_dependency(
        current_user: User = Depends(get_current_user),
    ):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to access this resource",
            )

        return current_user

    return role_dependency


@app.get("/vendor/me")
def vendor_me(
    vendor: Vendor = Depends(get_current_vendor),
):
    return {
        "id": vendor.id,
        "user_id": vendor.user_id,
        "store_name": vendor.store_name,
        "store_description": vendor.store_description,
        "phone": vendor.phone,
        "approval_status": vendor.approval_status,
    }



@app.post("/users/me/addresses", response_model=AddressResponse)
def create_address(
    address_data: AddressCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    user = db.query(User).filter(User.id == int(user_id)).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    if address_data.is_default:
        db.query(Address).filter(
            Address.user_id == user.id
        ).update(
            {"is_default": False},
            synchronize_session=False,
        )

    address = Address(
        user_id=user.id,
        full_name=address_data.full_name,
        phone=address_data.phone,
        address_line=address_data.address_line,
        city=address_data.city,
        state=address_data.state,
        postal_code=address_data.postal_code,
        country=address_data.country,
        is_default=address_data.is_default,
    )

    db.add(address)
    db.commit()
    db.refresh(address)

    return address


@app.get("/users/me/addresses", response_model=list[AddressResponse])
def get_my_addresses(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    user = db.query(User).filter(User.id == int(user_id)).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return (
        db.query(Address)
        .filter(Address.user_id == user.id)
        .all()
    )


@app.patch(
    "/users/me/addresses/{address_id}",
    response_model=AddressResponse,
)
def update_address(
    address_id: int,
    address_data: AddressUpdate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    address = (
        db.query(Address)
        .filter(
            Address.id == address_id,
            Address.user_id == int(user_id),
        )
        .first()
    )

    if not address:
        raise HTTPException(
            status_code=404,
            detail="Address not found",
        )

    if address_data.is_default is True:
        db.query(Address).filter(
            Address.user_id == int(user_id)
        ).update(
            {"is_default": False},
            synchronize_session=False,
        )

    update_data = address_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(address, field, value)

    db.commit()
    db.refresh(address)

    return address


@app.delete("/users/me/addresses/{address_id}")
def delete_address(
    address_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    address = (
        db.query(Address)
        .filter(
            Address.id == address_id,
            Address.user_id == int(user_id),
        )
        .first()
    )

    if not address:
        raise HTTPException(
            status_code=404,
            detail="Address not found",
        )

    db.delete(address)
    db.commit()

    return {
        "message": "Address deleted successfully"
    }

@app.post("/categories", response_model=CategoryResponse)
def create_category(
    category_data: CategoryCreate,
    db: Session = Depends(get_db),
):
    existing_category = (
        db.query(Category)
        .filter(Category.name == category_data.name)
        .first()
    )

    if existing_category:
        raise HTTPException(
            status_code=400,
            detail="Category already exists",
        )

    category = Category(
        name=category_data.name,
        description=category_data.description,
        is_active=category_data.is_active,
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


@app.get("/categories", response_model=list[CategoryResponse])
def get_categories(
    db: Session = Depends(get_db),
):
    return db.query(Category).all()


@app.get("/categories/{category_id}", response_model=CategoryResponse)
def get_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    category = (
        db.query(Category)
        .filter(Category.id == category_id)
        .first()
    )

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    return category


@app.patch("/categories/{category_id}", response_model=CategoryResponse)
def update_category(
    category_id: int,
    category_data: CategoryUpdate,
    db: Session = Depends(get_db),
):
    category = (
        db.query(Category)
        .filter(Category.id == category_id)
        .first()
    )

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    if category_data.name is not None:
        existing_category = (
            db.query(Category)
            .filter(
                Category.name == category_data.name,
                Category.id != category_id,
            )
            .first()
        )

        if existing_category:
            raise HTTPException(
                status_code=400,
                detail="Category already exists",
            )

        category.name = category_data.name

    if category_data.description is not None:
        category.description = category_data.description

    if category_data.is_active is not None:
        category.is_active = category_data.is_active

    db.commit()
    db.refresh(category)

    return category


@app.delete("/categories/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    category = (
        db.query(Category)
        .filter(Category.id == category_id)
        .first()
    )

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    db.delete(category)
    db.commit()

    return {
        "message": "Category deleted successfully",
        "category_id": category_id,
    }
@app.post("/subcategories", response_model=SubcategoryResponse)
def create_subcategory(
    subcategory_data: SubcategoryCreate,
    db: Session = Depends(get_db),
):
    category = (
        db.query(Category)
        .filter(Category.id == subcategory_data.category_id)
        .first()
    )

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    existing_subcategory = (
        db.query(Subcategory)
        .filter(
            Subcategory.category_id == subcategory_data.category_id,
            Subcategory.name == subcategory_data.name,
        )
        .first()
    )

    if existing_subcategory:
        raise HTTPException(
            status_code=400,
            detail="Subcategory already exists in this category",
        )

    subcategory = Subcategory(
        category_id=subcategory_data.category_id,
        name=subcategory_data.name,
        description=subcategory_data.description,
        is_active=subcategory_data.is_active,
    )

    db.add(subcategory)
    db.commit()
    db.refresh(subcategory)

    return subcategory


@app.get("/subcategories", response_model=list[SubcategoryResponse])
def get_subcategories(
    db: Session = Depends(get_db),
):
    return db.query(Subcategory).all()


@app.get(
    "/subcategories/{subcategory_id}",
    response_model=SubcategoryResponse,
)
def get_subcategory(
    subcategory_id: int,
    db: Session = Depends(get_db),
):
    subcategory = (
        db.query(Subcategory)
        .filter(Subcategory.id == subcategory_id)
        .first()
    )

    if not subcategory:
        raise HTTPException(
            status_code=404,
            detail="Subcategory not found",
        )

    return subcategory


@app.patch(
    "/subcategories/{subcategory_id}",
    response_model=SubcategoryResponse,
)
def update_subcategory(
    subcategory_id: int,
    subcategory_data: SubcategoryUpdate,
    db: Session = Depends(get_db),
):
    subcategory = (
        db.query(Subcategory)
        .filter(Subcategory.id == subcategory_id)
        .first()
    )

    if not subcategory:
        raise HTTPException(
            status_code=404,
            detail="Subcategory not found",
        )

    if subcategory_data.category_id is not None:
        category = (
            db.query(Category)
            .filter(Category.id == subcategory_data.category_id)
            .first()
        )

        if not category:
            raise HTTPException(
                status_code=404,
                detail="Category not found",
            )

        subcategory.category_id = subcategory_data.category_id

    if subcategory_data.name is not None:
        subcategory.name = subcategory_data.name

    if subcategory_data.description is not None:
        subcategory.description = subcategory_data.description

    if subcategory_data.is_active is not None:
        subcategory.is_active = subcategory_data.is_active

    db.commit()
    db.refresh(subcategory)

    return subcategory


@app.delete("/subcategories/{subcategory_id}")
def delete_subcategory(
    subcategory_id: int,
    db: Session = Depends(get_db),
):
    subcategory = (
        db.query(Subcategory)
        .filter(Subcategory.id == subcategory_id)
        .first()
    )

    if not subcategory:
        raise HTTPException(
            status_code=404,
            detail="Subcategory not found",
        )

    db.delete(subcategory)
    db.commit()

    return {
        "message": "Subcategory deleted successfully",
        "subcategory_id": subcategory_id,
    }
@app.post("/brands", response_model=BrandResponse)
def create_brand(
    brand_data: BrandCreate,
    db: Session = Depends(get_db),
):
    existing_brand = (
        db.query(Brand)
        .filter(Brand.name == brand_data.name)
        .first()
    )

    if existing_brand:
        raise HTTPException(
            status_code=400,
            detail="Brand already exists",
        )

    brand = Brand(
        name=brand_data.name,
        description=brand_data.description,
        logo_url=brand_data.logo_url,
        is_active=brand_data.is_active,
    )

    db.add(brand)
    db.commit()
    db.refresh(brand)

    return brand


@app.get("/brands", response_model=list[BrandResponse])
def get_brands(
    db: Session = Depends(get_db),
):
    return db.query(Brand).all()


@app.get("/brands/{brand_id}", response_model=BrandResponse)
def get_brand(
    brand_id: int,
    db: Session = Depends(get_db),
):
    brand = (
        db.query(Brand)
        .filter(Brand.id == brand_id)
        .first()
    )

    if not brand:
        raise HTTPException(
            status_code=404,
            detail="Brand not found",
        )

    return brand


@app.patch("/brands/{brand_id}", response_model=BrandResponse)
def update_brand(
    brand_id: int,
    brand_data: BrandUpdate,
    db: Session = Depends(get_db),
):
    brand = (
        db.query(Brand)
        .filter(Brand.id == brand_id)
        .first()
    )

    if not brand:
        raise HTTPException(
            status_code=404,
            detail="Brand not found",
        )

    if brand_data.name is not None:
        brand.name = brand_data.name

    if brand_data.description is not None:
        brand.description = brand_data.description

    if brand_data.logo_url is not None:
        brand.logo_url = brand_data.logo_url

    if brand_data.is_active is not None:
        brand.is_active = brand_data.is_active

    db.commit()
    db.refresh(brand)

    return brand


@app.delete("/brands/{brand_id}")
def delete_brand(
    brand_id: int,
    db: Session = Depends(get_db),
):
    brand = (
        db.query(Brand)
        .filter(Brand.id == brand_id)
        .first()
    )

    if not brand:
        raise HTTPException(
            status_code=404,
            detail="Brand not found",
        )

    db.delete(brand)
    db.commit()

    return {
        "message": "Brand deleted successfully",
        "brand_id": brand_id,
    }

@app.post("/products", response_model=ProductResponse)
def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
):
    # Verify vendor
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == product_data.vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    # Verify category
    category = (
        db.query(Category)
        .filter(Category.id == product_data.category_id)
        .first()
    )

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    # Verify subcategory
    if product_data.subcategory_id is not None:
        subcategory = (
            db.query(Subcategory)
            .filter(
                Subcategory.id == product_data.subcategory_id,
                Subcategory.category_id == product_data.category_id,
            )
            .first()
        )

        if not subcategory:
            raise HTTPException(
                status_code=404,
                detail="Subcategory not found for this category",
            )

    # Verify brand
    if product_data.brand_id is not None:
        brand = (
            db.query(Brand)
            .filter(Brand.id == product_data.brand_id)
            .first()
        )

        if not brand:
            raise HTTPException(
                status_code=404,
                detail="Brand not found",
            )

    # Check SKU
    existing_product = (
        db.query(Product)
        .filter(Product.sku == product_data.sku)
        .first()
    )

    if existing_product:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists",
        )

    product = Product(
        vendor_id=product_data.vendor_id,
        category_id=product_data.category_id,
        subcategory_id=product_data.subcategory_id,
        brand_id=product_data.brand_id,
        name=product_data.name,
        description=product_data.description,
        sku=product_data.sku,
        price=product_data.price,
        stock=product_data.stock,
        image_url=product_data.image_url,
        is_active=product_data.is_active,
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


@app.get("/products", response_model=list[ProductResponse])
def get_products(
    db: Session = Depends(get_db),
):
    products = (
        db.query(
            Product,
            Category.name.label("category_name"),
            Brand.name.label("brand_name"),
        )
        .outerjoin(Category, Product.category_id == Category.id)
        .outerjoin(Brand, Product.brand_id == Brand.id)
        .all()
    )

    return [
        ProductResponse(
            id=product.id,
            vendor_id=product.vendor_id,
            category_id=product.category_id,
            subcategory_id=product.subcategory_id,
            brand_id=product.brand_id,
            category_name=category_name,
            brand_name=brand_name,
            name=product.name,
            description=product.description,
            sku=product.sku,
            price=product.price,
            stock=product.stock,
            image_url=product.image_url,
            is_active=product.is_active,
        )
        for product, category_name, brand_name in products
    ]


@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return product


@app.patch("/products/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product_data: ProductUpdate,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    if product_data.category_id is not None:
        category = (
            db.query(Category)
            .filter(Category.id == product_data.category_id)
            .first()
        )

        if not category:
            raise HTTPException(
                status_code=404,
                detail="Category not found",
            )

        product.category_id = product_data.category_id

    if product_data.subcategory_id is not None:
        subcategory = (
            db.query(Subcategory)
            .filter(
                Subcategory.id == product_data.subcategory_id,
                Subcategory.category_id == product.category_id,
            )
            .first()
        )

        if not subcategory:
            raise HTTPException(
                status_code=404,
                detail="Subcategory not found for this category",
            )

        product.subcategory_id = product_data.subcategory_id

    if product_data.brand_id is not None:
        brand = (
            db.query(Brand)
            .filter(Brand.id == product_data.brand_id)
            .first()
        )

        if not brand:
            raise HTTPException(
                status_code=404,
                detail="Brand not found",
            )

        product.brand_id = product_data.brand_id

    if product_data.name is not None:
        product.name = product_data.name

    if product_data.description is not None:
        product.description = product_data.description

    if product_data.sku is not None:
        existing_product = (
            db.query(Product)
            .filter(
                Product.sku == product_data.sku,
                Product.id != product_id,
            )
            .first()
        )

        if existing_product:
            raise HTTPException(
                status_code=400,
                detail="SKU already exists",
            )

        product.sku = product_data.sku

    if product_data.price is not None:
        product.price = product_data.price

    if product_data.stock is not None:
        product.stock = product_data.stock

    if product_data.image_url is not None:
        product.image_url = product_data.image_url

    if product_data.is_active is not None:
        product.is_active = product_data.is_active

    db.commit()
    db.refresh(product)

    return product


@app.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully",
        "product_id": product_id,
    }

@app.post("/auth/vendor-register", response_model=VendorResponse)
def register_vendor(
    vendor_data: VendorRegister,
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(User.email == vendor_data.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    hashed_password = hash_password(vendor_data.password)
    user = User(
        name=vendor_data.name,
        email=vendor_data.email,
        password_hash=hashed_password,
        role="vendor",
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    vendor = Vendor(
        user_id=user.id,
        store_name=vendor_data.store_name,
        store_description=vendor_data.store_description,
        phone=vendor_data.phone,
        approval_status="pending",
    )

    db.add(vendor)
    db.commit()
    db.refresh(vendor)

    return vendor

@app.post(
    "/products/{product_id}/images",
    response_model=ProductImageResponse,
)
def create_product_image(
    product_id: int,
    image_data: ProductImageCreate,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    image = ProductImage(
        product_id=product_id,
        image_url=image_data.image_url,
        is_primary=image_data.is_primary,
        sort_order=image_data.sort_order,
    )

    if image_data.is_primary:
        db.query(ProductImage).filter(
            ProductImage.product_id == product_id
        ).update(
            {"is_primary": False},
            synchronize_session=False,
        )

    db.add(image)
    db.commit()
    db.refresh(image)

    return image


@app.get(
    "/products/{product_id}/images",
    response_model=list[ProductImageResponse],
)
def get_product_images(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return (
        db.query(ProductImage)
        .filter(ProductImage.product_id == product_id)
        .order_by(ProductImage.sort_order)
        .all()
    )


@app.patch(
    "/product-images/{image_id}",
    response_model=ProductImageResponse,
)
def update_product_image(
    image_id: int,
    image_data: ProductImageUpdate,
    db: Session = Depends(get_db),
):
    image = (
        db.query(ProductImage)
        .filter(ProductImage.id == image_id)
        .first()
    )

    if not image:
        raise HTTPException(
            status_code=404,
            detail="Product image not found",
        )

    if image_data.image_url is not None:
        image.image_url = image_data.image_url

    if image_data.sort_order is not None:
        image.sort_order = image_data.sort_order

    if image_data.is_primary is True:
        db.query(ProductImage).filter(
            ProductImage.product_id == image.product_id,
            ProductImage.id != image_id,
        ).update(
            {"is_primary": False},
            synchronize_session=False,
        )

        image.is_primary = True

    elif image_data.is_primary is False:
        image.is_primary = False

    db.commit()
    db.refresh(image)

    return image


@app.delete("/product-images/{image_id}")
def delete_product_image(
    image_id: int,
    db: Session = Depends(get_db),
):
    image = (
        db.query(ProductImage)
        .filter(ProductImage.id == image_id)
        .first()
    )

    if not image:
        raise HTTPException(
            status_code=404,
            detail="Product image not found",
        )

    db.delete(image)
    db.commit()

    return {
        "message": "Product image deleted successfully",
        "image_id": image_id,
    }

@app.post(
    "/products/{product_id}/variants",
    response_model=ProductVariantResponse,
)
def create_product_variant(
    product_id: int,
    variant_data: ProductVariantCreate,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    existing_variant = (
        db.query(ProductVariant)
        .filter(ProductVariant.sku == variant_data.sku)
        .first()
    )

    if existing_variant:
        raise HTTPException(
            status_code=400,
            detail="Variant SKU already exists",
        )

    variant = ProductVariant(
        product_id=product_id,
        name=variant_data.name,
        sku=variant_data.sku,
        price=variant_data.price,
        stock=variant_data.stock,
        is_active=variant_data.is_active,
    )

    db.add(variant)
    db.commit()
    db.refresh(variant)

    return variant


@app.get(
    "/products/{product_id}/variants",
    response_model=list[ProductVariantResponse],
)
def get_product_variants(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return (
        db.query(ProductVariant)
        .filter(ProductVariant.product_id == product_id)
        .all()
    )


@app.get(
    "/product-variants/{variant_id}",
    response_model=ProductVariantResponse,
)
def get_product_variant(
    variant_id: int,
    db: Session = Depends(get_db),
):
    variant = (
        db.query(ProductVariant)
        .filter(ProductVariant.id == variant_id)
        .first()
    )

    if not variant:
        raise HTTPException(
            status_code=404,
            detail="Product variant not found",
        )

    return variant


@app.patch(
    "/product-variants/{variant_id}",
    response_model=ProductVariantResponse,
)
def update_product_variant(
    variant_id: int,
    variant_data: ProductVariantUpdate,
    db: Session = Depends(get_db),
):
    variant = (
        db.query(ProductVariant)
        .filter(ProductVariant.id == variant_id)
        .first()
    )

    if not variant:
        raise HTTPException(
            status_code=404,
            detail="Product variant not found",
        )

    if variant_data.sku is not None:
        existing_variant = (
            db.query(ProductVariant)
            .filter(
                ProductVariant.sku == variant_data.sku,
                ProductVariant.id != variant_id,
            )
            .first()
        )

        if existing_variant:
            raise HTTPException(
                status_code=400,
                detail="Variant SKU already exists",
            )

        variant.sku = variant_data.sku

    if variant_data.name is not None:
        variant.name = variant_data.name

    if variant_data.price is not None:
        variant.price = variant_data.price

    if variant_data.stock is not None:
        variant.stock = variant_data.stock

    if variant_data.is_active is not None:
        variant.is_active = variant_data.is_active

    db.commit()
    db.refresh(variant)

    return variant


@app.delete("/product-variants/{variant_id}")
def delete_product_variant(
    variant_id: int,
    db: Session = Depends(get_db),
):
    variant = (
        db.query(ProductVariant)
        .filter(ProductVariant.id == variant_id)
        .first()
    )

    if not variant:
        raise HTTPException(
            status_code=404,
            detail="Product variant not found",
        )

    db.delete(variant)
    db.commit()

    return {
        "message": "Product variant deleted successfully",
        "variant_id": variant_id,
    }

@app.post(
    "/products/{product_id}/attributes",
    response_model=ProductAttributeResponse,
)
def create_product_attribute(
    product_id: int,
    attribute_data: ProductAttributeCreate,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    attribute = ProductAttribute(
        product_id=product_id,
        name=attribute_data.name,
        value=attribute_data.value,
    )

    db.add(attribute)
    db.commit()
    db.refresh(attribute)

    return attribute


@app.get(
    "/products/{product_id}/attributes",
    response_model=list[ProductAttributeResponse],
)
def get_product_attributes(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return (
        db.query(ProductAttribute)
        .filter(ProductAttribute.product_id == product_id)
        .all()
    )


@app.get(
    "/product-attributes/{attribute_id}",
    response_model=ProductAttributeResponse,
)
def get_product_attribute(
    attribute_id: int,
    db: Session = Depends(get_db),
):
    attribute = (
        db.query(ProductAttribute)
        .filter(ProductAttribute.id == attribute_id)
        .first()
    )

    if not attribute:
        raise HTTPException(
            status_code=404,
            detail="Product attribute not found",
        )

    return attribute


@app.patch(
    "/product-attributes/{attribute_id}",
    response_model=ProductAttributeResponse,
)
def update_product_attribute(
    attribute_id: int,
    attribute_data: ProductAttributeUpdate,
    db: Session = Depends(get_db),
):
    attribute = (
        db.query(ProductAttribute)
        .filter(ProductAttribute.id == attribute_id)
        .first()
    )

    if not attribute:
        raise HTTPException(
            status_code=404,
            detail="Product attribute not found",
        )

    if attribute_data.name is not None:
        attribute.name = attribute_data.name

    if attribute_data.value is not None:
        attribute.value = attribute_data.value

    db.commit()
    db.refresh(attribute)

    return attribute


@app.delete("/product-attributes/{attribute_id}")
def delete_product_attribute(
    attribute_id: int,
    db: Session = Depends(get_db),
):
    attribute = (
        db.query(ProductAttribute)
        .filter(ProductAttribute.id == attribute_id)
        .first()
    )

    if not attribute:
        raise HTTPException(
            status_code=404,
            detail="Product attribute not found",
        )

    db.delete(attribute)
    db.commit()

    return {
        "message": "Product attribute deleted successfully",
        "attribute_id": attribute_id,
    }


@app.get("/skus/{sku}")
def get_by_sku(
    sku: str,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.sku == sku)
        .first()
    )

    if product:
        return {
            "type": "product",
            "id": product.id,
            "product_id": product.id,
            "sku": product.sku,
            "name": product.name,
            "price": product.price,
            "stock": product.stock,
            "is_active": product.is_active,
        }

    variant = (
        db.query(ProductVariant)
        .filter(ProductVariant.sku == sku)
        .first()
    )

    if variant:
        return {
            "type": "variant",
            "id": variant.id,
            "product_id": variant.product_id,
            "sku": variant.sku,
            "name": variant.name,
            "price": variant.price,
            "stock": variant.stock,
            "is_active": variant.is_active,
        }

    raise HTTPException(
        status_code=404,
        detail="SKU not found",
    )

@app.patch("/products/{product_id}/sku")
def update_product_sku(
    product_id: int,
    sku: str,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    existing_product = (
        db.query(Product)
        .filter(
            Product.sku == sku,
            Product.id != product_id,
        )
        .first()
    )

    existing_variant = (
        db.query(ProductVariant)
        .filter(ProductVariant.sku == sku)
        .first()
    )

    if existing_product or existing_variant:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists",
        )

    product.sku = sku

    db.commit()
    db.refresh(product)

    return {
        "message": "Product SKU updated successfully",
        "product_id": product.id,
        "sku": product.sku,
    }


@app.patch("/product-variants/{variant_id}/sku")
def update_variant_sku(
    variant_id: int,
    sku: str,
    db: Session = Depends(get_db),
):
    variant = (
        db.query(ProductVariant)
        .filter(ProductVariant.id == variant_id)
        .first()
    )

    if not variant:
        raise HTTPException(
            status_code=404,
            detail="Product variant not found",
        )

    existing_product = (
        db.query(Product)
        .filter(Product.sku == sku)
        .first()
    )

    existing_variant = (
        db.query(ProductVariant)
        .filter(
            ProductVariant.sku == sku,
            ProductVariant.id != variant_id,
        )
        .first()
    )

    if existing_product or existing_variant:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists",
        )

    variant.sku = sku

    db.commit()
    db.refresh(variant)

    return {
        "message": "Variant SKU updated successfully",
        "variant_id": variant.id,
        "sku": variant.sku,
    }

@app.patch("/products/{product_id}/stock")
def update_product_stock(
    product_id: int,
    quantity: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    new_stock = product.stock + quantity

    if new_stock < 0:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock",
        )

    product.stock = new_stock

    db.commit()
    db.refresh(product)

    return {
        "message": "Product stock updated successfully",
        "product_id": product.id,
        "sku": product.sku,
        "quantity_changed": quantity,
        "stock": product.stock,
    }


@app.patch("/product-variants/{variant_id}/stock")
def update_variant_stock(
    variant_id: int,
    quantity: int,
    db: Session = Depends(get_db),
):
    variant = (
        db.query(ProductVariant)
        .filter(ProductVariant.id == variant_id)
        .first()
    )

    if not variant:
        raise HTTPException(
            status_code=404,
            detail="Product variant not found",
        )

    new_stock = variant.stock + quantity

    if new_stock < 0:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock",
        )

    variant.stock = new_stock

    db.commit()
    db.refresh(variant)

    return {
        "message": "Variant stock updated successfully",
        "variant_id": variant.id,
        "sku": variant.sku,
        "quantity_changed": quantity,
        "stock": variant.stock,
    }


@app.get("/products/{product_id}/stock")
def get_product_stock(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return {
        "product_id": product.id,
        "sku": product.sku,
        "stock": product.stock,
    }


@app.get("/product-variants/{variant_id}/stock")
def get_variant_stock(
    variant_id: int,
    db: Session = Depends(get_db),
):
    variant = (
        db.query(ProductVariant)
        .filter(ProductVariant.id == variant_id)
        .first()
    )

    if not variant:
        raise HTTPException(
            status_code=404,
            detail="Product variant not found",
        )

    return {
        "variant_id": variant.id,
        "sku": variant.sku,
        "stock": variant.stock,
    }


@app.post(
    "/inventory/transactions",
    response_model=InventoryTransactionResponse,
)
def create_inventory_transaction(
    transaction_data: InventoryTransactionCreate,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == transaction_data.product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    # Variant validation
    if transaction_data.variant_id is not None:
        variant = (
            db.query(ProductVariant)
            .filter(
                ProductVariant.id == transaction_data.variant_id,
                ProductVariant.product_id == transaction_data.product_id,
            )
            .first()
        )

        if not variant:
            raise HTTPException(
                status_code=404,
                detail="Product variant not found for this product",
            )

        new_stock = variant.stock + transaction_data.quantity

        if new_stock < 0:
            raise HTTPException(
                status_code=400,
                detail="Insufficient variant stock",
            )

        variant.stock = new_stock

    else:
        new_stock = product.stock + transaction_data.quantity

        if new_stock < 0:
            raise HTTPException(
                status_code=400,
                detail="Insufficient product stock",
            )

        product.stock = new_stock

    transaction = InventoryTransaction(
        product_id=transaction_data.product_id,
        variant_id=transaction_data.variant_id,
        quantity=transaction_data.quantity,
        transaction_type=transaction_data.transaction_type,
        reason=transaction_data.reason,
    )

    db.add(transaction)
    db.commit()
    db.refresh(transaction)

    return transaction

@app.get(
    "/products/{product_id}/inventory",
    response_model=list[InventoryTransactionResponse],
)
def get_product_inventory(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return (
        db.query(InventoryTransaction)
        .filter(
            InventoryTransaction.product_id == product_id
        )
        .order_by(
            InventoryTransaction.created_at.desc()
        )
        .all()
    )

@app.get(
    "/product-variants/{variant_id}/inventory",
    response_model=list[InventoryTransactionResponse],
)
def get_variant_inventory(
    variant_id: int,
    db: Session = Depends(get_db),
):
    variant = (
        db.query(ProductVariant)
        .filter(ProductVariant.id == variant_id)
        .first()
    )

    if not variant:
        raise HTTPException(
            status_code=404,
            detail="Product variant not found",
        )

    return (
        db.query(InventoryTransaction)
        .filter(
            InventoryTransaction.variant_id == variant_id
        )
        .order_by(
            InventoryTransaction.created_at.desc()
        )
        .all()
    )

@app.get("/inventory/low-stock")
def get_low_stock_products(
    threshold: int = 5,
    db: Session = Depends(get_db),
):
    if threshold < 0:
        raise HTTPException(
            status_code=400,
            detail="Threshold cannot be negative",
        )

    products = (
        db.query(Product)
        .filter(
            Product.is_active == True,
            Product.stock <= threshold,
        )
        .all()
    )

    variants = (
        db.query(ProductVariant)
        .filter(
            ProductVariant.is_active == True,
            ProductVariant.stock <= threshold,
        )
        .all()
    )

    results = []

    for product in products:
        results.append(
            {
                "type": "product",
                "id": product.id,
                "product_id": product.id,
                "sku": product.sku,
                "name": product.name,
                "stock": product.stock,
                "threshold": threshold,
            }
        )

    for variant in variants:
        results.append(
            {
                "type": "variant",
                "id": variant.id,
                "product_id": variant.product_id,
                "sku": variant.sku,
                "name": variant.name,
                "stock": variant.stock,
                "threshold": threshold,
            }
        )

    return results

@app.get(
    "/products/list",
    response_model=list[ProductResponse],
)
def list_products(
    skip: int = 0,
    limit: int = 20,
    category_id: int | None = None,
    subcategory_id: int | None = None,
    brand_id: int | None = None,
    vendor_id: int | None = None,
    db: Session = Depends(get_db),
):
    if skip < 0:
        raise HTTPException(
            status_code=400,
            detail="Skip cannot be negative",
        )

    if limit < 1 or limit > 100:
        raise HTTPException(
            status_code=400,
            detail="Limit must be between 1 and 100",
        )

    query = db.query(Product).filter(
        Product.is_active == True
    )

    if category_id is not None:
        query = query.filter(
            Product.category_id == category_id
        )

    if subcategory_id is not None:
        query = query.filter(
            Product.subcategory_id == subcategory_id
        )

    if brand_id is not None:
        query = query.filter(
            Product.brand_id == brand_id
        )

    if vendor_id is not None:
        query = query.filter(
            Product.vendor_id == vendor_id
        )

    return (
        query
        .order_by(Product.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


@app.get("/products/{product_id}/low-stock")
def check_product_low_stock(
    product_id: int,
    threshold: int = 5,
    db: Session = Depends(get_db),
):
    if threshold < 0:
        raise HTTPException(
            status_code=400,
            detail="Threshold cannot be negative",
        )

    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return {
        "product_id": product.id,
        "sku": product.sku,
        "name": product.name,
        "stock": product.stock,
        "threshold": threshold,
        "low_stock": product.stock <= threshold,
    }

@app.get(
    "/vendors/{vendor_id}/products",
    response_model=list[ProductResponse],
)
def get_vendor_products(
    vendor_id: int,
    db: Session = Depends(get_db),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    return (
        db.query(Product)
        .filter(Product.vendor_id == vendor_id)
        .all()
    )

@app.get(
    "/vendors/{vendor_id}/products/{product_id}",
    response_model=ProductResponse,
)
def get_vendor_product(
    vendor_id: int,
    product_id: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(
            Product.id == product_id,
            Product.vendor_id == vendor_id,
        )
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found for this vendor",
        )

    return product

@app.get("/vendors/{vendor_id}/products/count")
def get_vendor_product_count(
    vendor_id: int,
    db: Session = Depends(get_db),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    count = (
        db.query(Product)
        .filter(Product.vendor_id == vendor_id)
        .count()
    )

    return {
        "vendor_id": vendor_id,
        "product_count": count,
    }

@app.get(
    "/vendors/{vendor_id}/products/active",
    response_model=list[ProductResponse],
)
def get_vendor_active_products(
    vendor_id: int,
    db: Session = Depends(get_db),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    return (
        db.query(Product)
        .filter(
            Product.vendor_id == vendor_id,
            Product.is_active == True,
        )
        .all()
    )

@app.get(
    "/products/search",
    response_model=list[ProductResponse],
)
def search_products(
    q: str | None = None,
    category_id: int | None = None,
    subcategory_id: int | None = None,
    brand_id: int | None = None,
    vendor_id: int | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    is_active: bool = True,
    sort_by: str = "newest",
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    if min_price is not None and min_price < 0:
        raise HTTPException(
            status_code=400,
            detail="Minimum price cannot be negative",
        )

    if max_price is not None and max_price < 0:
        raise HTTPException(
            status_code=400,
            detail="Maximum price cannot be negative",
        )

    if (
        min_price is not None
        and max_price is not None
        and min_price > max_price
    ):
        raise HTTPException(
            status_code=400,
            detail="Minimum price cannot exceed maximum price",
        )

    if skip < 0:
        raise HTTPException(
            status_code=400,
            detail="Skip cannot be negative",
        )

    if limit < 1 or limit > 100:
        raise HTTPException(
            status_code=400,
            detail="Limit must be between 1 and 100",
        )

    query = db.query(Product)

    if q:
        search_term = f"%{q}%"

        query = query.filter(
            (Product.name.ilike(search_term))
            | (Product.description.ilike(search_term))
            | (Product.sku.ilike(search_term))
        )

    if category_id is not None:
        query = query.filter(
            Product.category_id == category_id
        )

    if subcategory_id is not None:
        query = query.filter(
            Product.subcategory_id == subcategory_id
        )

    if brand_id is not None:
        query = query.filter(
            Product.brand_id == brand_id
        )

    if vendor_id is not None:
        query = query.filter(
            Product.vendor_id == vendor_id
        )

    if min_price is not None:
        query = query.filter(
            Product.price >= min_price
        )

    if max_price is not None:
        query = query.filter(
            Product.price <= max_price
        )

    query = query.filter(
        Product.is_active == is_active
    )

    if sort_by == "price_asc":
        query = query.order_by(Product.price.asc())

    elif sort_by == "price_desc":
        query = query.order_by(Product.price.desc())

    elif sort_by == "name":
        query = query.order_by(Product.name.asc())

    elif sort_by == "stock":
        query = query.order_by(Product.stock.desc())

    elif sort_by == "newest":
        query = query.order_by(Product.id.desc())

    else:
        raise HTTPException(
            status_code=400,
            detail=(
                "Invalid sort_by. Use: "
                "newest, price_asc, price_desc, "
                "name, stock"
            ),
        )

    return query.offset(skip).limit(limit).all()


@app.get(
    "/products/{product_id}/details",
    response_model=ProductDetailResponse,
)
def get_product_details(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    images = (
        db.query(ProductImage)
        .filter(ProductImage.product_id == product_id)
        .all()
    )

    variants = (
        db.query(ProductVariant)
        .filter(ProductVariant.product_id == product_id)
        .all()
    )

    attributes = (
        db.query(ProductAttribute)
        .filter(ProductAttribute.product_id == product_id)
        .all()
    )

    return {
        "id": product.id,
        "vendor_id": product.vendor_id,
        "category_id": product.category_id,
        "subcategory_id": product.subcategory_id,
        "brand_id": product.brand_id,
        "name": product.name,
        "description": product.description,
        "sku": product.sku,
        "price": product.price,
        "stock": product.stock,
        "image_url": product.image_url,
        "is_active": product.is_active,
        "images": images,
        "variants": variants,
        "attributes": attributes,
    }

@app.get(
    "/customers/{customer_id}/cart",
    response_model=CartResponse,
)
def get_customer_cart(
    customer_id: int,
    db: Session = Depends(get_db),
):
    customer = (
        db.query(User)
        .filter(User.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found",
        )

    cart = (
        db.query(Cart)
        .filter(Cart.customer_id == customer_id)
        .first()
    )

    if not cart:
        cart = Cart(customer_id=customer_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)

    items = (
        db.query(CartItem)
        .filter(CartItem.cart_id == cart.id)
        .all()
    )

    return {
        "id": cart.id,
        "customer_id": cart.customer_id,
        "items": items,
    }

@app.post(
    "/customers/{customer_id}/cart/items",
    response_model=CartItemResponse,
)
def add_cart_item(
    customer_id: int,
    item_data: CartItemCreate,
    db: Session = Depends(get_db),
):
    customer = (
        db.query(User)
        .filter(User.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found",
        )

    product = (
        db.query(Product)
        .filter(
            Product.id == item_data.product_id,
            Product.is_active == True,
        )
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found or inactive",
        )

    # Check variant
    if item_data.variant_id is not None:
        variant = (
            db.query(ProductVariant)
            .filter(
                ProductVariant.id == item_data.variant_id,
                ProductVariant.product_id == item_data.product_id,
                ProductVariant.is_active == True,
            )
            .first()
        )

        if not variant:
            raise HTTPException(
                status_code=404,
                detail="Product variant not found or inactive",
            )

        available_stock = variant.stock
    else:
        available_stock = product.stock

    if item_data.quantity > available_stock:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock",
        )

    cart = (
        db.query(Cart)
        .filter(Cart.customer_id == customer_id)
        .first()
    )

    if not cart:
        cart = Cart(customer_id=customer_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)

    existing_item = (
        db.query(CartItem)
        .filter(
            CartItem.cart_id == cart.id,
            CartItem.product_id == item_data.product_id,
            CartItem.variant_id == item_data.variant_id,
        )
        .first()
    )

    if existing_item:
        new_quantity = (
            existing_item.quantity + item_data.quantity
        )

        if new_quantity > available_stock:
            raise HTTPException(
                status_code=400,
                detail="Insufficient stock",
            )

        existing_item.quantity = new_quantity
        db.commit()
        db.refresh(existing_item)

        return existing_item

    cart_item = CartItem(
        cart_id=cart.id,
        product_id=item_data.product_id,
        variant_id=item_data.variant_id,
        quantity=item_data.quantity,
    )

    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)

    return cart_item


@app.patch(
    "/cart/items/{item_id}",
    response_model=CartItemResponse,
)
def update_cart_item(
    item_id: int,
    item_data: CartItemUpdate,
    db: Session = Depends(get_db),
):
    cart_item = (
        db.query(CartItem)
        .filter(CartItem.id == item_id)
        .first()
    )

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found",
        )

    product = (
        db.query(Product)
        .filter(Product.id == cart_item.product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    if cart_item.variant_id is not None:
        variant = (
            db.query(ProductVariant)
            .filter(
                ProductVariant.id == cart_item.variant_id
            )
            .first()
        )

        if not variant:
            raise HTTPException(
                status_code=404,
                detail="Product variant not found",
            )

        available_stock = variant.stock
    else:
        available_stock = product.stock

    if item_data.quantity > available_stock:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock",
        )

    cart_item.quantity = item_data.quantity

    db.commit()
    db.refresh(cart_item)

    return cart_item


@app.delete("/cart/items/{item_id}")
def delete_cart_item(
    item_id: int,
    db: Session = Depends(get_db),
):
    cart_item = (
        db.query(CartItem)
        .filter(CartItem.id == item_id)
        .first()
    )

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found",
        )

    db.delete(cart_item)
    db.commit()

    return {
        "message": "Cart item removed successfully",
        "item_id": item_id,
    }

@app.get(
    "/customers/{customer_id}/cart/vendors",
    response_model=MultiVendorCartResponse,
)
def get_multi_vendor_cart(
    customer_id: int,
    db: Session = Depends(get_db),
):
    customer = (
        db.query(User)
        .filter(User.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found",
        )

    cart = (
        db.query(Cart)
        .filter(Cart.customer_id == customer_id)
        .first()
    )

    if not cart:
        return {
            "customer_id": customer_id,
            "vendors": [],
            "grand_total": 0,
        }

    cart_items = (
        db.query(CartItem)
        .filter(CartItem.cart_id == cart.id)
        .all()
    )

    vendor_groups = {}
    grand_total = 0

    for item in cart_items:
        product = (
            db.query(Product)
            .filter(Product.id == item.product_id)
            .first()
        )

        if not product:
            continue

        vendor = (
            db.query(Vendor)
            .filter(Vendor.id == product.vendor_id)
            .first()
        )

        if not vendor:
            continue

        # Use variant price if your variant has a price field.
        price = product.price

        if item.variant_id is not None:
            variant = (
                db.query(ProductVariant)
                .filter(ProductVariant.id == item.variant_id)
                .first()
            )

            if variant and variant.price is not None:
                price = variant.price

        subtotal = price * item.quantity

        if vendor.id not in vendor_groups:
            vendor_groups[vendor.id] = {
                "vendor_id": vendor.id,
                "store_name": vendor.store_name,
                "items": [],
                "subtotal": 0,
            }

        vendor_groups[vendor.id]["items"].append(
            {
                "cart_item_id": item.id,
                "product_id": product.id,
                "variant_id": item.variant_id,
                "product_name": product.name,
                "sku": product.sku,
                "quantity": item.quantity,
                "price": price,
                "subtotal": subtotal,
            }
        )

        vendor_groups[vendor.id]["subtotal"] += subtotal
        grand_total += subtotal

    return {
        "customer_id": customer_id,
        "vendors": list(vendor_groups.values()),
        "grand_total": grand_total,
    }

@app.get(
    "/customers/{customer_id}/wishlist",
    response_model=WishlistResponse,
)
def get_wishlist(
    customer_id: int,
    db: Session = Depends(get_db),
):
    customer = (
        db.query(User)
        .filter(User.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found",
        )

    wishlist = (
        db.query(Wishlist)
        .filter(Wishlist.customer_id == customer_id)
        .first()
    )

    if not wishlist:
        wishlist = Wishlist(
            customer_id=customer_id
        )

        db.add(wishlist)
        db.commit()
        db.refresh(wishlist)

    items = (
        db.query(WishlistItem)
        .filter(
            WishlistItem.wishlist_id == wishlist.id
        )
        .all()
    )

    return {
        "id": wishlist.id,
        "customer_id": wishlist.customer_id,
        "items": items,
    }


@app.post(
    "/customers/{customer_id}/wishlist/items",
    response_model=WishlistItemResponse,
)
def add_to_wishlist(
    customer_id: int,
    item_data: WishlistItemCreate,
    db: Session = Depends(get_db),
):
    customer = (
        db.query(User)
        .filter(User.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found",
        )

    product = (
        db.query(Product)
        .filter(
            Product.id == item_data.product_id,
            Product.is_active == True,
        )
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found or inactive",
        )

    wishlist = (
        db.query(Wishlist)
        .filter(Wishlist.customer_id == customer_id)
        .first()
    )

    if not wishlist:
        wishlist = Wishlist(
            customer_id=customer_id
        )

        db.add(wishlist)
        db.commit()
        db.refresh(wishlist)

    existing_item = (
        db.query(WishlistItem)
        .filter(
            WishlistItem.wishlist_id == wishlist.id,
            WishlistItem.product_id == item_data.product_id,
        )
        .first()
    )

    if existing_item:
        raise HTTPException(
            status_code=400,
            detail="Product already exists in wishlist",
        )

    wishlist_item = WishlistItem(
        wishlist_id=wishlist.id,
        product_id=item_data.product_id,
    )

    db.add(wishlist_item)
    db.commit()
    db.refresh(wishlist_item)

    return wishlist_item


@app.delete("/wishlist/items/{item_id}")
def remove_from_wishlist(
    item_id: int,
    db: Session = Depends(get_db),
):
    wishlist_item = (
        db.query(WishlistItem)
        .filter(WishlistItem.id == item_id)
        .first()
    )

    if not wishlist_item:
        raise HTTPException(
            status_code=404,
            detail="Wishlist item not found",
        )

    db.delete(wishlist_item)
    db.commit()

    return {
        "message": "Product removed from wishlist",
        "item_id": item_id,
    }

@app.post(
    "/customers/{customer_id}/checkout",
    response_model=CheckoutResponse,
)
def checkout(
    customer_id: int,
    checkout_data: CheckoutRequest,
    db: Session = Depends(get_db),
):
    # Verify customer
    customer = (
        db.query(User)
        .filter(User.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found",
        )

    # Verify address belongs to customer
    address = (
        db.query(Address)
        .filter(
            Address.id == checkout_data.address_id,
            Address.user_id == customer_id,
        )
        .first()
    )

    if not address:
        raise HTTPException(
            status_code=404,
            detail="Address not found for this customer",
        )

    # Get cart
    cart = (
        db.query(Cart)
        .filter(Cart.customer_id == customer_id)
        .first()
    )

    if not cart:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty",
        )

    cart_items = (
        db.query(CartItem)
        .filter(CartItem.cart_id == cart.id)
        .all()
    )

    if not cart_items:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty",
        )

    vendor_groups = {}
    subtotal = 0

    for item in cart_items:

        product = (
            db.query(Product)
            .filter(
                Product.id == item.product_id,
                Product.is_active == True,
            )
            .first()
        )

        if not product:
            raise HTTPException(
                status_code=400,
                detail=f"Product {item.product_id} is unavailable",
            )

        # Determine price and stock
        price = product.price
        available_stock = product.stock

        if item.variant_id is not None:

            variant = (
                db.query(ProductVariant)
                .filter(
                    ProductVariant.id == item.variant_id,
                    ProductVariant.product_id == product.id,
                    ProductVariant.is_active == True,
                )
                .first()
            )

            if not variant:
                raise HTTPException(
                    status_code=400,
                    detail="Product variant is unavailable",
                )

            price = variant.price
            available_stock = variant.stock

        # Stock validation
        if item.quantity > available_stock:
            raise HTTPException(
                status_code=400,
                detail=(
                    f"Insufficient stock for "
                    f"{product.name}"
                ),
            )

        vendor = (
            db.query(Vendor)
            .filter(Vendor.id == product.vendor_id)
            .first()
        )

        if not vendor:
            raise HTTPException(
                status_code=400,
                detail="Vendor not found",
            )

        item_subtotal = price * item.quantity

        if vendor.id not in vendor_groups:
            vendor_groups[vendor.id] = {
                "vendor_id": vendor.id,
                "store_name": vendor.store_name,
                "items": [],
                "subtotal": 0,
            }

        vendor_groups[vendor.id]["items"].append(
            {
                "product_id": product.id,
                "variant_id": item.variant_id,
                "product_name": product.name,
                "vendor_id": vendor.id,
                "quantity": item.quantity,
                "price": price,
                "subtotal": item_subtotal,
            }
        )

        vendor_groups[vendor.id]["subtotal"] += item_subtotal
        subtotal += item_subtotal

    # Simple shipping calculation
    shipping_fee = 0 if subtotal >= 1000 else 50

    total = subtotal + shipping_fee

    return {
        "customer_id": customer_id,
        "address_id": address.id,
        "payment_method": checkout_data.payment_method,
        "vendors": list(vendor_groups.values()),
        "subtotal": subtotal,
        "shipping_fee": shipping_fee,
        "total": total,
    }

@app.post(
    "/customers/{customer_id}/orders",
    response_model=list[OrderResponse],
)
def create_orders(
    customer_id: int,
    checkout_data: CheckoutRequest,
    db: Session = Depends(get_db),
):
    customer = (
        db.query(User)
        .filter(User.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found",
        )

    address = (
        db.query(Address)
        .filter(
            Address.id == checkout_data.address_id,
            Address.user_id == customer_id,
        )
        .first()
    )

    if not address:
        raise HTTPException(
            status_code=404,
            detail="Address not found for this customer",
        )

    cart = (
        db.query(Cart)
        .filter(Cart.customer_id == customer_id)
        .first()
    )

    if not cart:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty",
        )

    cart_items = (
        db.query(CartItem)
        .filter(CartItem.cart_id == cart.id)
        .all()
    )

    if not cart_items:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty",
        )

    vendor_groups = {}

    for item in cart_items:
        product = (
            db.query(Product)
            .filter(
                Product.id == item.product_id,
                Product.is_active == True,
            )
            .first()
        )

        if not product:
            raise HTTPException(
                status_code=400,
                detail=f"Product {item.product_id} is unavailable",
            )

        price = product.price
        stock = product.stock
        sku = product.sku

        if item.variant_id is not None:
            variant = (
                db.query(ProductVariant)
                .filter(
                    ProductVariant.id == item.variant_id,
                    ProductVariant.product_id == product.id,
                    ProductVariant.is_active == True,
                )
                .first()
            )

            if not variant:
                raise HTTPException(
                    status_code=400,
                    detail="Product variant is unavailable",
                )

            price = variant.price
            stock = variant.stock
            sku = variant.sku

        if item.quantity > stock:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for {product.name}",
            )

        vendor = (
            db.query(Vendor)
            .filter(Vendor.id == product.vendor_id)
            .first()
        )

        if not vendor:
            raise HTTPException(
                status_code=400,
                detail="Vendor not found",
            )

        item_subtotal = price * item.quantity

        if vendor.id not in vendor_groups:
            vendor_groups[vendor.id] = {
                "vendor_id": vendor.id,
                "items": [],
                "subtotal": 0,
            }

        vendor_groups[vendor.id]["items"].append(
            {
                "product": product,
                "item": item,
                "price": price,
                "sku": sku,
                "subtotal": item_subtotal,
            }
        )

        vendor_groups[vendor.id]["subtotal"] += item_subtotal

    total_subtotal = sum(
        group["subtotal"]
        for group in vendor_groups.values()
    )

    shipping_fee = 0 if total_subtotal >= 1000 else 50

    created_orders = []

    try:
        for vendor_id, group in vendor_groups.items():

            vendor_subtotal = group["subtotal"]

            # Allocate shipping to the first vendor order.
            vendor_shipping = 0

            if len(created_orders) == 0:
                vendor_shipping = shipping_fee

            vendor_total = (
                vendor_subtotal + vendor_shipping
            )

            order = Order(
                customer_id=customer_id,
                vendor_id=vendor_id,
                address_id=address.id,
                order_number=(
                    f"ORD-{uuid4().hex[:12].upper()}"
                ),
                subtotal=vendor_subtotal,
                shipping_fee=vendor_shipping,
                total=vendor_total,
                payment_method=checkout_data.payment_method,
                payment_status="pending",
                order_status="pending",
            )

            db.add(order)
            db.flush()

            for entry in group["items"]:
                product = entry["product"]
                cart_item = entry["item"]
                price = entry["price"]
                sku = entry["sku"]
                item_subtotal = entry["subtotal"]

                order_item = OrderItem(
                    order_id=order.id,
                    product_id=product.id,
                    variant_id=cart_item.variant_id,
                    product_name=product.name,
                    sku=sku,
                    quantity=cart_item.quantity,
                    price=price,
                    subtotal=item_subtotal,
                )

                db.add(order_item)

                if cart_item.variant_id is not None:
                    variant = (
                        db.query(ProductVariant)
                        .filter(
                            ProductVariant.id
                            == cart_item.variant_id
                        )
                        .first()
                    )

                    variant.stock -= cart_item.quantity

                else:
                    product.stock -= cart_item.quantity

            created_orders.append(order)

        # Remove cart items after successful order creation.
        for item in cart_items:
            db.delete(item)

        db.commit()

        for order in created_orders:
            db.refresh(order)

        return created_orders

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Failed to create orders",
        )

@app.patch(
    "/orders/{order_id}/status",
    response_model=OrderStatusResponse,
)
def update_order_status(
    order_id: int,
    status_data: OrderStatusUpdate,
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    allowed_statuses = {
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
        "refunded",
    }

    new_status = status_data.order_status.lower()

    if new_status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail=(
                "Invalid order status. Allowed: "
                + ", ".join(sorted(allowed_statuses))
            ),
        )

    order.order_status = new_status

    db.commit()
    db.refresh(order)

    return {
        "order_id": order.id,
        "order_number": order.order_number,
        "order_status": order.order_status,
        "payment_status": order.payment_status,
    }


@app.get(
    "/customers/{customer_id}/orders",
    response_model=list[OrderResponse],
)
def get_customer_orders(
    customer_id: int,
    db: Session = Depends(get_db),
):
    customer = (
        db.query(User)
        .filter(User.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found",
        )

    orders = (
        db.query(Order)
        .filter(Order.customer_id == customer_id)
        .order_by(Order.created_at.desc())
        .all()
    )

    result = []

    for order in orders:
        items = (
            db.query(OrderItem)
            .filter(OrderItem.order_id == order.id)
            .all()
        )

        result.append({
            "id": order.id,
            "customer_id": order.customer_id,
            "vendor_id": order.vendor_id,
            "address_id": order.address_id,
            "order_number": order.order_number,
            "subtotal": order.subtotal,
            "shipping_fee": order.shipping_fee,
            "total": order.total,
            "payment_method": order.payment_method,
            "payment_status": order.payment_status,
            "order_status": order.order_status,
            "items": items,
        })

    return result


@app.get(
    "/customers/{customer_id}/orders/{order_id}/tracking",
)
def track_customer_order(
    customer_id: int,
    order_id: int,
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.customer_id == customer_id,
        )
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    return {
        "order_id": order.id,
        "order_number": order.order_number,
        "vendor_id": order.vendor_id,
        "order_status": order.order_status,
        "payment_status": order.payment_status,
        "created_at": order.created_at,
        "updated_at": order.updated_at,
    }

@app.post(
    "/payments",
    response_model=PaymentResponse,
)
def create_payment(
    payment_data: PaymentCreate,
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .filter(Order.id == payment_data.order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    if order.payment_status == "paid":
        raise HTTPException(
            status_code=400,
            detail="Order is already paid",
        )

    existing_payment = (
        db.query(Payment)
        .filter(
            Payment.order_id == payment_data.order_id,
            Payment.status == "pending",
        )
        .first()
    )

    if existing_payment:
        return existing_payment

    payment = Payment(
        order_id=order.id,
        transaction_id=f"TXN-{uuid4().hex[:16].upper()}",
        gateway=payment_data.gateway,
        amount=order.total,
        currency="INR",
        status="pending",
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return payment


@app.patch(
    "/payments/{payment_id}/verify",
    response_model=PaymentResponse,
)
def verify_payment(
    payment_id: int,
    verify_data: PaymentVerifyRequest,
    db: Session = Depends(get_db),
):
    payment = (
        db.query(Payment)
        .filter(Payment.id == payment_id)
        .first()
    )

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    if payment.transaction_id != verify_data.transaction_id:
        raise HTTPException(
            status_code=400,
            detail="Invalid transaction ID",
        )

    if verify_data.status not in {
        "success",
        "failed",
    }:
        raise HTTPException(
            status_code=400,
            detail="Payment status must be success or failed",
        )

    order = (
        db.query(Order)
        .filter(Order.id == payment.order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    if verify_data.status == "success":
        payment.status = "success"
        order.payment_status = "paid"
        order.order_status = "confirmed"
    else:
        payment.status = "failed"
        order.payment_status = "failed"

    db.commit()
    db.refresh(payment)

    return payment


@app.post("/payments/webhook")
def payment_webhook(
    payment_data: PaymentVerifyRequest,
    db: Session = Depends(get_db),
):
    payment = (
        db.query(Payment)
        .filter(
            Payment.transaction_id
            == payment_data.transaction_id
        )
        .first()
    )

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment transaction not found",
        )

    order = (
        db.query(Order)
        .filter(Order.id == payment.order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    if payment_data.status == "success":
        payment.status = "success"
        order.payment_status = "paid"
        order.order_status = "confirmed"

    elif payment_data.status == "failed":
        payment.status = "failed"
        order.payment_status = "failed"

    else:
        raise HTTPException(
            status_code=400,
            detail="Invalid payment status",
        )

    db.commit()

    return {
        "message": "Payment webhook processed successfully",
        "payment_id": payment.id,
        "order_id": order.id,
        "payment_status": payment.status,
    }

@app.patch(
    "/customers/{customer_id}/orders/{order_id}/cancel",
)
def cancel_order(
    customer_id: int,
    order_id: int,
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.customer_id == customer_id,
        )
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    if order.order_status not in {
        "pending",
        "confirmed",
        "processing",
    }:
        raise HTTPException(
            status_code=400,
            detail="Order cannot be cancelled at this stage",
        )

    order_items = (
        db.query(OrderItem)
        .filter(OrderItem.order_id == order.id)
        .all()
    )

    # Restore stock
    for item in order_items:
        if item.variant_id is not None:
            variant = (
                db.query(ProductVariant)
                .filter(
                    ProductVariant.id == item.variant_id
                )
                .first()
            )

            if variant:
                variant.stock += item.quantity
        else:
            product = (
                db.query(Product)
                .filter(Product.id == item.product_id)
                .first()
            )

            if product:
                product.stock += item.quantity

    order.order_status = "cancelled"

    # If already paid, create refund request
    if order.payment_status == "paid":
        refund = Refund(
            order_id=order.id,
            customer_id=customer_id,
            amount=order.total,
            reason="Order cancelled",
            status="requested",
        )

        db.add(refund)

    db.commit()

    return {
        "message": "Order cancelled successfully",
        "order_id": order.id,
        "order_status": order.order_status,
        "payment_status": order.payment_status,
    }

@app.post(
    "/customers/{customer_id}/orders/{order_id}/return",
    response_model=RefundResponse,
)
def request_return(
    customer_id: int,
    order_id: int,
    refund_data: RefundCreate,
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.customer_id == customer_id,
        )
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    if order.order_status != "delivered":
        raise HTTPException(
            status_code=400,
            detail="Only delivered orders can be returned",
        )

    if order.payment_status != "paid":
        raise HTTPException(
            status_code=400,
            detail="Only paid orders can be returned",
        )

    existing_refund = (
        db.query(Refund)
        .filter(
            Refund.order_id == order.id,
            Refund.status.in_(
                [
                    "requested",
                    "approved",
                    "processing",
                ]
            ),
        )
        .first()
    )

    if existing_refund:
        raise HTTPException(
            status_code=400,
            detail="Return request already exists",
        )

    refund = Refund(
        order_id=order.id,
        customer_id=customer_id,
        amount=order.total,
        reason=refund_data.reason,
        status="requested",
    )

    order.order_status = "returned"

    db.add(refund)
    db.commit()
    db.refresh(refund)

    return refund


@app.patch(
    "/refunds/{refund_id}/status",
    response_model=RefundResponse,
)
def update_refund_status(
    refund_id: int,
    status_data: RefundStatusUpdate,
    db: Session = Depends(get_db),
):
    refund = (
        db.query(Refund)
        .filter(Refund.id == refund_id)
        .first()
    )

    if not refund:
        raise HTTPException(
            status_code=404,
            detail="Refund request not found",
        )

    allowed_statuses = {
        "requested",
        "approved",
        "rejected",
        "processing",
        "refunded",
    }

    new_status = status_data.status.lower()

    if new_status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail=(
                "Invalid refund status. Allowed: "
                + ", ".join(sorted(allowed_statuses))
            ),
        )

    order = (
        db.query(Order)
        .filter(Order.id == refund.order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    refund.status = new_status

    if new_status == "refunded":
        refund.refund_transaction_id = (
            f"REF-{uuid4().hex[:16].upper()}"
        )

        order.payment_status = "refunded"
        order.order_status = "refunded"

    db.commit()
    db.refresh(refund)

    return refund


@app.get(
    "/admin/dashboard",
    response_model=AdminDashboardResponse,
)
def get_admin_dashboard(
    db: Session = Depends(get_db),
):
    total_users = db.query(User).count()

    total_customers = (
        db.query(User)
        .filter(User.role == "customer")
        .count()
    )

    total_vendors = db.query(Vendor).count()

    pending_vendors = (
        db.query(Vendor)
        .filter(Vendor.approval_status == "pending")
        .count()
    )

    total_products = db.query(Product).count()

    active_products = (
        db.query(Product)
        .filter(Product.is_active == True)
        .count()
    )

    total_orders = db.query(Order).count()

    pending_orders = (
        db.query(Order)
        .filter(
            Order.order_status.in_(
                ["pending", "confirmed", "processing", "shipped"]
            )
        )
        .count()
    )

    completed_orders = (
        db.query(Order)
        .filter(Order.order_status == "delivered")
        .count()
    )

    cancelled_orders = (
        db.query(Order)
        .filter(Order.order_status == "cancelled")
        .count()
    )

    paid_orders = (
        db.query(Order)
        .filter(Order.payment_status == "paid")
        .all()
    )

    total_revenue = sum(
        float(order.total or 0)
        for order in paid_orders
    )

    completed_refunds = (
        db.query(Refund)
        .filter(Refund.status == "completed")
        .all()
    )

    total_refunds = sum(
        float(refund.amount or 0)
        for refund in completed_refunds
    )

    return AdminDashboardResponse(
        total_users=total_users,
        total_customers=total_customers,
        total_vendors=total_vendors,
        pending_vendors=pending_vendors,
        total_products=total_products,
        active_products=active_products,
        total_orders=total_orders,
        pending_orders=pending_orders,
        completed_orders=completed_orders,
        cancelled_orders=cancelled_orders,
        total_revenue=total_revenue,
        total_refunds=total_refunds,
    )


@app.get(
    "/admin/vendors",
    response_model=list[AdminVendorResponse],
)
def get_admin_vendors(
    status: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Vendor)

    if status is not None:
        query = query.filter(
            Vendor.approval_status == status
        )

    return query.order_by(Vendor.id.desc()).all()


@app.get(
    "/admin/vendors/{vendor_id}",
    response_model=AdminVendorResponse,
)
def get_admin_vendor(
    vendor_id: int,
    db: Session = Depends(get_db),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    return vendor


@app.post(
    "/admin/commissions",
    response_model=CommissionResponse,
)
def create_commission(
    commission_data: CommissionCreate,
    db: Session = Depends(get_db),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == commission_data.vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    commission_amount = (
        commission_data.order_amount
        * commission_data.commission_rate
        / 100
    )

    vendor_amount = (
        commission_data.order_amount
        - commission_amount
    )

    commission = Commission(
        vendor_id=commission_data.vendor_id,
        order_id=commission_data.order_id,
        order_amount=commission_data.order_amount,
        commission_rate=commission_data.commission_rate,
        commission_amount=commission_amount,
        vendor_amount=vendor_amount,
        status="pending",
    )

    db.add(commission)
    db.commit()
    db.refresh(commission)

    return commission


@app.get(
    "/admin/commissions",
    response_model=list[CommissionResponse],
)
def get_commissions(
    vendor_id: int | None = None,
    status: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Commission)

    if vendor_id is not None:
        query = query.filter(
            Commission.vendor_id == vendor_id
        )

    if status is not None:
        query = query.filter(
            Commission.status == status
        )

    return query.order_by(
        Commission.id.desc()
    ).all()


@app.get(
    "/vendors/{vendor_id}/earnings",
    response_model=VendorEarningsResponse,
)
def get_vendor_earnings(
    vendor_id: int,
    db: Session = Depends(get_db),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    commissions = (
        db.query(Commission)
        .filter(Commission.vendor_id == vendor_id)
        .all()
    )

    total_sales = sum(
        float(c.order_amount or 0)
        for c in commissions
    )

    total_commission = sum(
        float(c.commission_amount or 0)
        for c in commissions
    )

    net_earnings = sum(
        float(c.vendor_amount or 0)
        for c in commissions
    )

    pending_earnings = sum(
        float(c.vendor_amount or 0)
        for c in commissions
        if c.status == "pending"
    )

    available_earnings = sum(
        float(c.vendor_amount or 0)
        for c in commissions
        if c.status == "available"
    )

    return VendorEarningsResponse(
        vendor_id=vendor_id,
        total_sales=total_sales,
        total_commission=total_commission,
        net_earnings=net_earnings,
        pending_earnings=pending_earnings,
        available_earnings=available_earnings,
    )


@app.get(
    "/vendors/{vendor_id}/wallet",
    response_model=WalletResponse,
)
def get_vendor_wallet(
    vendor_id: int,
    db: Session = Depends(get_db),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    wallet = (
        db.query(VendorWallet)
        .filter(VendorWallet.vendor_id == vendor_id)
        .first()
    )

    if not wallet:
        wallet = VendorWallet(
            vendor_id=vendor_id,
            available_balance=0,
            pending_balance=0,
        )

        db.add(wallet)
        db.commit()
        db.refresh(wallet)

    return wallet

@app.post(
    "/vendors/{vendor_id}/payouts",
    response_model=PayoutResponse,
)
def create_payout_request(
    vendor_id: int,
    payout_data: PayoutCreate,
    db: Session = Depends(get_db),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    wallet = (
        db.query(VendorWallet)
        .filter(VendorWallet.vendor_id == vendor_id)
        .first()
    )

    if not wallet:
        wallet = VendorWallet(
            vendor_id=vendor_id,
            available_balance=0,
            pending_balance=0,
        )
        db.add(wallet)
        db.commit()
        db.refresh(wallet)

    if payout_data.amount > wallet.available_balance:
        raise HTTPException(
            status_code=400,
            detail="Insufficient available balance",
        )

    PayoutRequest = PayoutRequest(
        vendor_id=vendor_id,
        amount=payout_data.amount,
        status="requested",
    )

    wallet.available_balance -= payout_data.amount

    db.add(PayoutRequest)
    db.commit()
    db.refresh(PayoutRequest)

    return PayoutRequest\


@app.get(
    "/admin/payouts",
    response_model=list[PayoutResponse],
)
def get_payout_requests(
    status: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(PayoutRequest)

    if status is not None:
        query = query.filter(
            PayoutRequest.status == status
        )

    return query.order_by(
        PayoutRequest.id.desc()
    ).all()


@app.patch(
    "/admin/payouts/{payout_id}/status",
    response_model=PayoutResponse,
)
def update_payout_status(
    payout_id: int,
    status: str,
    db: Session = Depends(get_db),
):
    PayoutRequest = (
        db.query(PayoutRequest)
        .filter(PayoutRequest.id == payout_id)
        .first()
    )

    if not PayoutRequest:
        raise HTTPException(
            status_code=404,
            detail="PayoutRequest not found",
        )

    PayoutRequest.status = status

    db.commit()
    db.refresh(PayoutRequest)

    return PayoutRequest


@app.get(
    "/admin/analytics",
    response_model=AdminAnalyticsResponse,
)
def get_admin_analytics(
    db: Session = Depends(get_db),
):
    orders = db.query(Order).all()

    paid_orders = [
        order
        for order in orders
        if order.payment_status == "paid"
    ]

    total_sales = sum(
        float(order.total or 0)
        for order in paid_orders
    )

    completed_orders = sum(
        1
        for order in orders
        if order.order_status == "delivered"
    )

    cancelled_orders = sum(
        1
        for order in orders
        if order.order_status == "cancelled"
    )

    pending_orders = sum(
        1
        for order in orders
        if order.order_status in [
            "pending",
            "confirmed",
            "processing",
            "shipped",
        ]
    )

    commissions = db.query(Commission).all()

    total_commission = sum(
        float(c.commission_amount or 0)
        for c in commissions
    )

    refunds = (
        db.query(Refund)
        .filter(Refund.status == "completed")
        .all()
    )

    total_refunds = sum(
        float(r.amount or 0)
        for r in refunds
    )

    return AdminAnalyticsResponse(
        total_sales=total_sales,
        total_orders=len(orders),
        total_customers=(
            db.query(User)
            .filter(User.role == "customer")
            .count()
        ),
        total_vendors=db.query(Vendor).count(),
        total_products=db.query(Product).count(),

        completed_orders=completed_orders,
        cancelled_orders=cancelled_orders,
        pending_orders=pending_orders,

        total_commission=total_commission,
        total_refunds=total_refunds,
    )


@app.get(
    "/vendors/{vendor_id}/analytics",
    response_model=VendorAnalyticsResponse,
)
def get_vendor_analytics(
    vendor_id: int,
    db: Session = Depends(get_db),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    commissions = (
        db.query(Commission)
        .filter(Commission.vendor_id == vendor_id)
        .all()
    )

    total_sales = sum(
        float(c.order_amount or 0)
        for c in commissions
    )

    total_commission = sum(
        float(c.commission_amount or 0)
        for c in commissions
    )

    net_earnings = sum(
        float(c.vendor_amount or 0)
        for c in commissions
    )

    order_ids = [
        c.order_id
        for c in commissions
        if c.order_id is not None
    ]

    orders = []

    if order_ids:
        orders = (
            db.query(Order)
            .filter(Order.id.in_(order_ids))
            .all()
        )

    completed_orders = sum(
        1
        for order in orders
        if order.order_status == "delivered"
    )

    cancelled_orders = sum(
        1
        for order in orders
        if order.order_status == "cancelled"
    )

    pending_orders = sum(
        1
        for order in orders
        if order.order_status in [
            "pending",
            "confirmed",
            "processing",
            "shipped",
        ]
    )

    return VendorAnalyticsResponse(
        vendor_id=vendor_id,
        total_sales=total_sales,
        total_orders=len(orders),
        completed_orders=completed_orders,
        cancelled_orders=cancelled_orders,
        pending_orders=pending_orders,
        total_commission=total_commission,
        net_earnings=net_earnings,
    )


@app.get(
    "/vendors/{vendor_id}/sales-report",
    response_model=SalesReportResponse,
)
def get_vendor_sales_report(
    vendor_id: int,
    db: Session = Depends(get_db),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    commissions = (
        db.query(Commission)
        .filter(Commission.vendor_id == vendor_id)
        .all()
    )

    total_sales = sum(
        float(c.order_amount or 0)
        for c in commissions
    )

    total_commission = sum(
        float(c.commission_amount or 0)
        for c in commissions
    )

    net_earnings = sum(
        float(c.vendor_amount or 0)
        for c in commissions
    )

    return SalesReportResponse(
        total_sales=total_sales,
        total_orders=len(commissions),
        total_commission=total_commission,
        net_earnings=net_earnings,
    )

@app.get(
    "/admin/refunds",
    response_model=list[RefundResponse],
)
def get_admin_refunds(
    db: Session = Depends(get_db),
):
    refunds = (
        db.query(Refund)
        .order_by(Refund.id.desc())
        .all()
    )

    return refunds


@app.get(
    "/vendors/{vendor_id}/orders",
    response_model=list[OrderResponse],
)
def get_vendor_orders(
    vendor_id: int,
    db: Session = Depends(get_db),
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == vendor_id)
        .first()
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found",
        )

    orders = (
        db.query(Order)
        .join(OrderItem, OrderItem.order_id == Order.id)
        .join(Product, Product.id == OrderItem.product_id)
        .filter(Product.vendor_id == vendor_id)
        .distinct()
        .order_by(Order.id.desc())
        .all()
    )

    return orders





@app.get(
    "/admin/reports",
)
def get_admin_reports(
    db: Session = Depends(get_db),
):
    orders = db.query(Order).all()

    paid_orders = [
        order for order in orders
        if order.payment_status == "paid"
    ]

    total_sales = sum(
        float(order.total or 0)
        for order in paid_orders
    )

    total_orders = len(orders)

    completed_orders = sum(
        1 for order in orders
        if order.order_status == "delivered"
    )

    cancelled_orders = sum(
        1 for order in orders
        if order.order_status == "cancelled"
    )

    customers = (
        db.query(User)
        .filter(User.role == "customer")
        .count()
    )

    vendors = db.query(Vendor).count()
    products = db.query(Product).count()

    commissions = db.query(Commission).all()

    total_commission = sum(
        float(c.commission_amount or 0)
        for c in commissions
    )

    refunds = (
        db.query(Refund)
        .filter(Refund.status == "completed")
        .all()
    )

    total_refunds = sum(
        float(refund.amount or 0)
        for refund in refunds
    )

    return {
        "total_sales": total_sales,
        "total_orders": total_orders,
        "completed_orders": completed_orders,
        "cancelled_orders": cancelled_orders,
        "total_customers": customers,
        "total_vendors": vendors,
        "total_products": products,
        "total_commission": total_commission,
        "total_refunds": total_refunds,
    }
@app.get("/admin/customers", response_model=list[UserResponse])
def get_admin_customers(
    db: Session = Depends(get_db),
):
    customers = (
        db.query(User)
        .filter(User.role == "customer")
        .order_by(User.id.desc())
        .all()
    )

    return customers

@app.get(
    "/admin/audit-logs",
    response_model=list[AuditLogResponse],
)
def get_audit_logs(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    logs = (
        db.query(AuditLog)
        .order_by(AuditLog.created_at.desc())
        .all()
    )

    return logs

def create_audit_log(
    db: Session,
    user_id: int | None,
    action: str,
    entity_type: str | None = None,
    entity_id: int | None = None,
    details: str | None = None,
):
    audit_log = AuditLog(
        user_id=user_id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        details=details,
    )

    db.add(audit_log)
    db.commit()

    return audit_log

