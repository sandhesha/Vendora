🛍️ Vendora — Multi-Vendor E-Commerce Platform

<p align="center">
  <strong>A modern full-stack multi-vendor e-commerce platform built with Next.js, FastAPI, SQLAlchemy and PostgreSQL.</strong>
</p><p align="center">
  <a href="https://vendora-frontend-bcqt.onrender.com">
    <img src="https://img.shields.io/badge/Live%20Frontend-Visit%20Vendora-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Frontend">
  </a>
  <a href="https://vendora-backend-9bgi.onrender.com">
    <img src="https://img.shields.io/badge/Live%20Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="Live Backend">
  </a>
  <a href="https://github.com/sandhesha/Vendora">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository">
  </a>
</p>---

🚀 Live Demo

Service| URL| Status
🌐 Frontend| https://vendora-frontend-bcqt.onrender.com| 🟢 Live
⚙️ Backend API| https://vendora-backend-9bgi.onrender.com| 🟢 Live
💻 GitHub| https://github.com/sandhesha/Vendora| 📦 Repository

🔗 Quick Links

- "🌐 Open Vendora" (https://vendora-frontend-bcqt.onrender.com)
- "⚙️ Open Backend API" (https://vendora-backend-9bgi.onrender.com)
- "📦 View GitHub Repository" (https://github.com/sandhesha/Vendora)

---

📖 About Vendora

Vendora is a full-stack multi-vendor e-commerce platform designed to connect customers with multiple independent vendors through a single marketplace.

The platform provides separate experiences and functionality for:

- 👤 Customers
- 🏪 Vendors / Sellers
- 👑 Super Administrators

The application includes product discovery, categories, search, shopping cart, checkout, orders, vendor storefronts, vendor analytics, commissions, wallets, payouts, refunds, notifications and administrative management.

---

✨ Features

👤 Customer Features

- User registration and login
- Customer profile
- Product browsing
- Product categories
- Product search
- Product filtering
- Product details
- Vendor storefronts
- Shopping cart
- Wishlist
- Checkout
- Order placement
- Order tracking
- Order history
- Product reviews
- Notifications
- Address management

---

🏪 Vendor Features

Vendors can manage their marketplace business through their vendor dashboard.

- Vendor registration
- Vendor authentication
- Vendor profile
- Vendor storefront
- Product management
- Inventory management
- Order management
- Sales analytics
- Earnings tracking
- Commission tracking
- Vendor wallet
- Payout requests
- Sales reports
- Vendor order history
- Business statistics

---

👑 Admin Features

The admin dashboard provides centralized marketplace management.

- Admin authentication
- Customer management
- Vendor management
- Product management
- Category management
- Order monitoring
- Commission management
- Refund management
- Payout management
- Analytics dashboard
- Sales reports
- Audit logs
- Marketplace statistics

---

🧩 Technology Stack

Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Recharts

Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn
- Python-JOSE
- Passlib
- python-dotenv

Database

- PostgreSQL
- SQLAlchemy ORM
- psycopg2

Deployment

- Render
- GitHub

---

🏗️ Project Architecture

Vendora/
│
├── app/
│   ├── admin/
│   ├── api/
│   ├── categories/
│   ├── products/
│   ├── vendor/
│   ├── notifications/
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
├── types/
│
├── public/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models/
│   ├── schemas/
│   ├── routes/
│   └── ...
│
├── requirements.txt
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── README.md

---

🔄 Application Architecture

                    ┌─────────────────────┐
                    │      Customer       │
                    │                     │
                    │ Browse / Cart /     │
                    │ Checkout / Orders   │
                    └──────────┬──────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────┐
│              Vendora Frontend                   │
│                                                 │
│               Next.js + React                   │
│             TypeScript + Tailwind               │
└───────────────────────┬─────────────────────────┘
                        │
                        │ REST API
                        ▼
┌─────────────────────────────────────────────────┐
│              Vendora Backend                    │
│                                                 │
│                  FastAPI                        │
│              SQLAlchemy ORM                     │
│                                                 │
│ Auth │ Products │ Orders │ Vendors │ Admin      │
└───────────────────────┬─────────────────────────┘
                        │
                        │ SQLAlchemy
                        ▼
              ┌───────────────────┐
              │    PostgreSQL     │
              │     Database      │
              └───────────────────┘

        ┌─────────────────────────────┐
        │          Vendors             │
        │ Products / Orders / Earnings │
        └─────────────────────────────┘

        ┌─────────────────────────────┐
        │           Admin              │
        │ Users / Vendors / Analytics  │
        └─────────────────────────────┘

---

🔐 Authentication

Vendora uses token-based authentication.

The frontend stores the authentication token and sends it to the backend using:

Authorization: Bearer <access_token>

The API client automatically retrieves the stored token and attaches it to authenticated API requests.

---

🌐 API Communication

The frontend communicates with the FastAPI backend through the deployed API URL.

Production API:

https://vendora-backend-9bgi.onrender.com

Example:

GET /products
GET /categories
GET /admin/vendors
GET /admin/customers
GET /admin/analytics
GET /vendors/{vendor_id}/orders
GET /vendors/{vendor_id}/analytics
GET /vendors/{vendor_id}/earnings
GET /vendors/{vendor_id}/wallet

The frontend API base URL is configured through:

NEXT_PUBLIC_API_URL=https://vendora-backend-9bgi.onrender.com

For local development:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

---

🗄️ Database Configuration

The backend uses PostgreSQL in production.

The database connection is configured through the environment variable:

DATABASE_URL=your_postgresql_connection_string

The backend reads this variable using "python-dotenv" and SQLAlchemy.

Example:

DATABASE_URL = os.getenv("DATABASE_URL")

The actual database credentials should never be committed to GitHub.

---

⚙️ Backend Environment Variables

Configure these variables in the Render backend service:

DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_secret_key

Add any other environment variables required by your backend configuration.

---

🌐 Frontend Environment Variables

Configure the following variable in the Render frontend service:

NEXT_PUBLIC_API_URL=https://vendora-backend-9bgi.onrender.com

After changing frontend environment variables, redeploy the frontend so the new value is included in the production build.

---

💻 Local Development

1. Clone the repository

git clone https://github.com/sandhesha/Vendora.git
cd Vendora

---

🎨 Run Frontend

Install dependencies:

npm install

Create:

.env.local

Add:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

Start the frontend:

npm run dev

Frontend:

http://localhost:3000

---

⚙️ Run Backend

Create a Python virtual environment:

python -m venv .venv

Activate it:

.\.venv\Scripts\Activate.ps1

Install backend dependencies:

pip install -r requirements.txt

Configure your environment variables:

DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key

Start FastAPI:

uvicorn backend.main:app --reload

Backend:

http://127.0.0.1:8000

FastAPI documentation:

http://127.0.0.1:8000/docs

---

🚀 Deployment

Vendora is deployed using Render.

Frontend

https://vendora-frontend-bcqt.onrender.com

The frontend runs the Next.js application.

Typical build configuration:

Build Command:
npm install && npm run build

Start Command:
npm start

---

Backend

https://vendora-backend-9bgi.onrender.com

The backend runs FastAPI with Uvicorn.

Typical start command:

uvicorn backend.main:app --host 0.0.0.0 --port $PORT

The backend requires the PostgreSQL "DATABASE_URL" to be configured in Render environment variables.

---

🔗 Frontend ↔ Backend

The production architecture is:

User
 │
 ▼
https://vendora-frontend-bcqt.onrender.com
 │
 │ HTTPS REST API
 ▼
https://vendora-backend-9bgi.onrender.com
 │
 ▼
PostgreSQL

The frontend must use:

NEXT_PUBLIC_API_URL=https://vendora-backend-9bgi.onrender.com

The backend must allow requests from:

https://vendora-frontend-bcqt.onrender.com

through its CORS configuration.

---

📡 Important API Endpoints

Authentication

POST /auth/register
POST /auth/login
POST /auth/vendor-register
GET  /auth/me

Products

GET    /products
POST   /products
GET    /products/{id}
PUT    /products/{id}
DELETE /products/{id}

Categories

GET    /categories
POST   /categories
PUT    /categories/{id}
DELETE /categories/{id}

Vendors

GET /admin/vendors
GET /vendors/{vendor_id}/orders
GET /vendors/{vendor_id}/analytics
GET /vendors/{vendor_id}/earnings
GET /vendors/{vendor_id}/wallet

Orders

GET  /orders
POST /orders

Commissions

GET  /admin/commissions
POST /admin/commissions

Payouts

GET   /admin/payouts
POST  /vendors/{vendor_id}/payouts
PATCH /admin/payouts/{payout_id}/status

Analytics

GET /admin/analytics
GET /admin/reports
GET /vendors/{vendor_id}/analytics
GET /vendors/{vendor_id}/sales-report

Refunds

GET /admin/refunds

Audit Logs

GET /admin/audit-logs

---

🛡️ Security

Sensitive environment variables should not be committed to the repository.

Do not upload:

.env
.env.local

or database credentials, secret keys, access tokens or API keys.

Use Render Environment Variables for production secrets.

GitHub recommends using repository security features such as secret scanning and push protection to help prevent credentials from being committed.

---

🌿 Git Branches

The project currently uses the development branch:

dev

Repository:

https://github.com/sandhesha/Vendora

Development branch:

https://github.com/sandhesha/Vendora/tree/dev

---

📦 Dependencies

Frontend dependencies are managed using:

package.json
package-lock.json

Backend dependencies are managed using:

requirements.txt

The backend requirements file can be regenerated with:

pip freeze > requirements.txt

---

🧪 Testing the Backend

After starting the backend, open:

http://127.0.0.1:8000/docs

For production:

https://vendora-backend-9bgi.onrender.com/docs

You can use the FastAPI Swagger interface to test API endpoints.

---

📊 Main Modules

Module| Description
Authentication| Customer, vendor and admin authentication
Marketplace| Product browsing and discovery
Products| Product CRUD and product details
Categories| Product categorization
Vendors| Vendor storefront and management
Cart| Shopping cart functionality
Checkout| Order checkout workflow
Orders| Order creation and tracking
Reviews| Product review functionality
Notifications| Customer/vendor notifications
Commissions| Marketplace commission calculation
Wallet| Vendor balance management
Payouts| Vendor payout requests
Refunds| Refund management
Analytics| Admin and vendor analytics
Audit Logs| Administrative activity tracking

---

🎯 Project Goals

Vendora is designed to provide a scalable marketplace architecture where:

- Multiple vendors can sell products.
- Customers can purchase from different vendors.
- Administrators can manage the marketplace.
- Vendors can track sales and earnings.
- The platform can calculate commissions.
- Vendors can request payouts.
- Customers can track their orders.
- Administrators can monitor marketplace performance.

---

🔮 Future Improvements

Potential future improvements include:

- Online payment gateway integration
- Email notifications
- SMS / WhatsApp notifications
- Advanced product recommendations
- AI-powered product search
- AI shopping assistant
- Advanced vendor analytics
- Real-time order tracking
- Image optimization
- Product reviews and ratings improvements
- Advanced inventory alerts
- Automated vendor settlements
- Docker-based deployment
- CI/CD pipeline
- Automated testing

---

👨‍💻 Developer

Sandhesha

CSE (AIML) Student | Frontend Developer | AI/ML Enthusiast

GitHub:

https://github.com/sandhesha

---

⭐ Support

If you find Vendora useful, consider giving the repository a ⭐ on GitHub.

---

📄 License

This project is currently maintained as a personal/academic development project.

---

<p align="center">
  <strong>🛍️ Vendora — One Marketplace. Multiple Vendors. Endless Possibilities.</strong>
</p>
