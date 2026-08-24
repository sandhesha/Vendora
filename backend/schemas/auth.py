from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "customer"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        from_attributes = True

class VendorRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    store_name: str
    store_description: str | None = None
    phone: str | None = None


class VendorResponse(BaseModel):
    id: int
    user_id: int
    store_name: str
    store_description: str | None
    phone: str | None
    approval_status: str

    class Config:
        from_attributes = True

class UserProfileUpdate(BaseModel):
    name: str | None = None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str