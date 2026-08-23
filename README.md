# 🛍️ Vendora — Multi-Vendor E-Commerce Platform

<p align="center">
  <strong>A modern, scalable multi-vendor e-commerce platform built with Next.js and FastAPI.</strong>
</p>

<p align="center">
  <a href="https://vendora-frontend-bcqt.onrender.com">
    🚀 Live Frontend
  </a>
  •
  <a href="https://vendora-backend-9bgi.onrender.com">
    ⚡ Live Backend API
  </a>
</p>

---

## 🌐 Live Demo

### Frontend

🔗 **https://vendora-frontend-bcqt.onrender.com**

### Backend API

🔗 **https://vendora-backend-9bgi.onrender.com**

The frontend communicates with the FastAPI backend through REST APIs.

---

# 📌 About Vendora

**Vendora** is a multi-vendor e-commerce platform designed to connect customers, vendors, and administrators in a single marketplace.

The platform supports multiple sellers who can manage their products, inventory, orders, earnings, commissions, payouts, and analytics.

Customers can browse products, search and filter products, manage their cart and wishlist, place orders, track orders, and manage their profiles.

Administrators can manage vendors, customers, products, orders, commissions, refunds, payouts, reports, and platform analytics.

---

# ✨ Key Features

## 👤 Customer

* User registration and login
* Secure authentication
* Browse products
* Product categories
* Product details
* Product search
* Product filtering
* Vendor storefronts
* Shopping cart
* Wishlist
* Checkout
* Order placement
* Order tracking
* Order history
* Product reviews
* Customer profile
* Address management
* Notifications

---

## 🏪 Vendor / Seller

Vendors have their own marketplace management functionality.

### Vendor Dashboard

* Vendor profile
* Store management
* Product management
* Product inventory
* Order management
* Sales analytics
* Earnings dashboard
* Commission tracking
* Wallet
* Payout requests
* Sales reports
* Vendor order history

### Vendor Analytics

The vendor dashboard provides information such as:

* Total sales
* Total orders
* Completed orders
* Cancelled orders
* Pending orders
* Total commission
* Net earnings
* Available earnings
* Pending earnings

---

## 👨‍💼 Super Admin

The administrator has control over the complete marketplace.

### Admin Dashboard

* Platform analytics
* Customer management
* Vendor management
* Product management
* Category management
* Brand management
* Order management
* Commission management
* Refund management
* Payout management
* Reports
* Audit logs

### Admin Analytics

The dashboard can display:

* Total sales
* Total orders
* Total customers
* Total vendors
* Total products
* Completed orders
* Cancelled orders
* Pending orders
* Total commissions
* Total refunds

---

# 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │       Customer       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Vendora Frontend    │
                    │      Next.js         │
                    │   React + TypeScript  │
                    └──────────┬───────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Vendora Backend     │
                    │       FastAPI        │
                    │      Python          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      PostgreSQL      │
                    │       Database       │
                    └──────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React
* Recharts
* shadcn/ui
* REST API integration

## Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* PostgreSQL
* JWT authentication
* Passlib
* Python-JOSE
* Uvicorn

## Database

* PostgreSQL
* SQLAlchemy ORM

## Deployment

* Render
* GitHub

---

# 📂 Project Structure

```text
Vendora/
│
├── app/
│   ├── admin/
│   ├── api/
│   ├── categories/
│   ├── products/
│   ├── vendor/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── profile/
│   └── ...
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models/
│   ├── schemas/
│   ├── routes/
│   └── ...
│
├── components/
│   ├── layout/
│   ├── ui/
│   └── ...
│
├── lib/
│   └── api/
│       └── api-client.ts
│
├── public/
│
├── types/
│
├── .env
├── .env.local
├── .gitignore
├── package.json
├── package-lock.json
├── requirements.txt
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

# 🔐 Authentication

Vendora uses token-based authentication.

After successful login, the frontend stores the authentication token and sends it with API requests.

Example:

```http
Authorization: Bearer <access_token>
```

The frontend API client automatically attaches the token to authenticated requests.

---

# 🔗 API Communication

The frontend uses a centralized API client.

```text
Frontend
   │
   │ GET /products
   ▼
FastAPI Backend
   │
   ▼
Database
```

The production API URL is configured through:

```env
NEXT_PUBLIC_API_URL=https://vendora-backend-9bgi.onrender.com
```

The frontend then makes requests such as:

```text
GET /products
GET /categories
GET /vendors/{vendor_id}/products
GET /vendors/{vendor_id}/orders
GET /vendors/{vendor_id}/analytics
GET /admin/vendors
GET /admin/customers
GET /admin/analytics
```

---

# 🗄️ Database Configuration

The backend uses the `DATABASE_URL` environment variable.

```env
DATABASE_URL=your_postgresql_connection_string
```

The backend reads this variable from the environment:

```python
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not configured")
```

SQLAlchemy is then used to create the database engine and sessions.

---

# ⚙️ Environment Variables

## Frontend

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

For production:

```env
NEXT_PUBLIC_API_URL=https://vendora-backend-9bgi.onrender.com
```

---

## Backend

Example:

```env
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_secret_key
```

Never commit real secrets to GitHub.

Add environment files to `.gitignore`:

```gitignore
.env
.env.local
.venv/
__pycache__/
.next/
node_modules/
```

---

# 💻 Run Vendora Locally

## 1. Clone the repository

```bash
git clone https://github.com/sandhesha/Vendora.git
```

```bash
cd Vendora
```

---

# 🐍 Backend Setup

Create a Python virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your environment:

```env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

Run FastAPI:

```bash
uvicorn backend.main:app --reload
```

Backend will be available at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

# ⚛️ Frontend Setup

Install dependencies:

```bash
npm install
```

Create:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Start Next.js:

```bash
npm run dev
```

Frontend will be available at:

```text
http://localhost:3000
```

---

# 🚀 Render Deployment

Vendora is deployed as two separate Render services.

```text
GitHub Repository
       │
       ├──────────────► Frontend
       │                Next.js
       │                Render
       │
       └──────────────► Backend
                        FastAPI
                        Render
```

---

# 🌐 Frontend Deployment

Frontend:

```text
https://vendora-frontend-bcqt.onrender.com
```

Typical Render configuration:

### Runtime

```text
Node
```

### Build Command

```bash
npm install && npm run build
```

### Start Command

```bash
npm start
```

### Environment Variable

```env
NEXT_PUBLIC_API_URL=https://vendora-backend-9bgi.onrender.com
```

After changing environment variables, redeploy the frontend.

Render supports deploying web applications from connected Git repositories and automatically deploying changes pushed to the configured branch.

---

# ⚡ Backend Deployment

Backend:

```text
https://vendora-backend-9bgi.onrender.com
```

### Runtime

```text
Python
```

### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
uvicorn backend.main:app --host 0.0.0.0 --port $PORT
```

Render web services need to listen on `0.0.0.0` so that they can receive public traffic. Render also provides the `PORT` environment variable for the service.

---

# 🔗 Frontend ↔ Backend

Production communication:

```text
https://vendora-frontend-bcqt.onrender.com
                 │
                 │ HTTPS REST API
                 ▼
https://vendora-backend-9bgi.onrender.com
                 │
                 ▼
              Database
```

The frontend must use:

```env
NEXT_PUBLIC_API_URL=https://vendora-backend-9bgi.onrender.com
```

Do not use:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

in production.

---

# 🔒 CORS Configuration

Because the frontend and backend are deployed on different domains, the FastAPI backend must allow the frontend origin.

Example:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://vendora-frontend-bcqt.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

For local development, you can also allow:

```python
allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://vendora-frontend-bcqt.onrender.com",
]
```

---

# 🧪 Testing the Backend

Open:

```text
https://vendora-backend-9bgi.onrender.com
```

Swagger documentation:

```text
https://vendora-backend-9bgi.onrender.com/docs
```

Test products:

```text
https://vendora-backend-9bgi.onrender.com/products
```

Test categories:

```text
https://vendora-backend-9bgi.onrender.com/categories
```

---

# 📊 Main API Modules

## Authentication

```text
POST /auth/register
POST /auth/login
GET  /auth/me
POST /auth/vendor-register
```

## Products

```text
GET    /products
POST   /products
GET    /products/{id}
PUT    /products/{id}
DELETE /products/{id}
```

## Categories

```text
GET /categories
POST /categories
```

## Vendors

```text
GET /admin/vendors
GET /vendors/{vendor_id}/orders
GET /vendors/{vendor_id}/analytics
GET /vendors/{vendor_id}/earnings
GET /vendors/{vendor_id}/wallet
```

## Orders

```text
GET  /orders
POST /orders
GET  /orders/{id}
```

## Commissions

```text
GET  /admin/commissions
POST /admin/commissions
```

## Payouts

```text
GET   /admin/payouts
POST  /vendors/{vendor_id}/payouts
PATCH /admin/payouts/{payout_id}/status
```

## Analytics

```text
GET /admin/analytics
GET /admin/reports
GET /vendors/{vendor_id}/analytics
GET /vendors/{vendor_id}/sales-report
```

## Customers

```text
GET /admin/customers
```

## Audit Logs

```text
GET /admin/audit-logs
```

---

# 📈 Marketplace Architecture

Vendora separates the responsibilities of each marketplace role.

```text
                    VENDORA
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
   CUSTOMER          VENDOR           ADMIN
       │               │                │
       ▼               ▼                ▼
   Shopping        Store Mgmt       Platform Mgmt
   Cart            Products         Vendors
   Wishlist        Inventory        Customers
   Checkout        Orders           Products
   Orders          Earnings         Orders
   Reviews         Wallet           Commissions
   Profile         Payouts          Refunds
                   Analytics        Analytics
```

---

# 🎨 Frontend UI

Vendora uses a modern responsive interface with:

* Responsive layouts
* Animated UI
* 3D visual elements
* Product cards
* Interactive dashboards
* Modern navigation
* Vendor storefront UI
* Admin dashboard
* Charts and analytics
* Mobile-friendly layouts
* Loading states
* Error handling
* Notification components

---

# 📦 Dependencies

Frontend dependencies are managed using:

```text
package.json
package-lock.json
```

Backend dependencies are stored in:

```text
requirements.txt
```

Generate backend dependencies with:

```bash
pip freeze > requirements.txt
```

---

# 🔄 Git Workflow

The project uses Git for version control.

Main development branch:

```text
dev
```

Push changes:

```bash
git add .
```

```bash
git commit -m "Update Vendora"
```

```bash
git push origin dev
```

If Render is connected to the `dev` branch, pushing new commits can trigger a new deployment automatically.

---

# 🧑‍💻 Development Commands

### Frontend

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Production start

```bash
npm start
```

### Backend

```bash
uvicorn backend.main:app --reload
```

### TypeScript check

```bash
npx tsc --noEmit
```

---

# 🛡️ Security

Vendora follows several security practices:

* JWT-based authentication
* Password hashing
* Environment-based secrets
* Database credentials stored outside source code
* Token-based API authorization
* CORS configuration
* Role-based access control
* Admin authorization
* Vendor authorization

Never commit:

```text
.env
.env.local
database passwords
JWT secrets
API keys
```

---

# 🚀 Future Improvements

Planned improvements include:

* Online payment gateway integration
* Email notifications
* SMS notifications
* WhatsApp notifications
* Advanced vendor verification
* Product recommendations
* AI-powered product search
* Advanced analytics
* Inventory alerts
* Shipping integration
* Coupon and discount system
* Advanced review moderation
* Improved caching
* Production monitoring

---

# 👨‍💻 Developer

**Sandhesha**

Frontend Developer | AI/ML Enthusiast | CSE(AIML) Student

GitHub:

https://github.com/sandhesha

---

# 🔗 Important Links

| Resource             | Link                                           |
| -------------------- | ---------------------------------------------- |
| 🚀 Live Frontend     | https://vendora-frontend-bcqt.onrender.com     |
| ⚡ Backend API        | https://vendora-backend-9bgi.onrender.com      |
| 📚 API Documentation | https://vendora-backend-9bgi.onrender.com/docs |
| 💻 GitHub Repository | https://github.com/sandhesha/Vendora           |

---

# ⭐ Support

If you find Vendora useful, consider giving the repository a ⭐ on GitHub.

---

<p align="center">
  Built with ❤️ using Next.js, FastAPI, PostgreSQL and Render.
</p>
