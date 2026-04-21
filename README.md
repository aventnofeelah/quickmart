# 🛒 QuickMart | Full-Stack E-commerce Platform

**QuickMart** is a modern e-commerce platform developed as a final project for Web Development. The project is a complete Full-Stack application using Django REST Framework for the backend and Angular for the frontend.

---

## 👥 Project Team
*   **Rakhat** — Frontend Developer
*   **Orazbay** — Backend Developer
*   **Vadim** — Full-stack / UI Design

---

## 🚀 Key Features
- **User Roles**: Specialized systems for both Buyers and Sellers.
- **Product Catalog**: Browse products with category filtering and sorting by price/name.
- **Seller Dashboard**: Enable sellers to publish and manage their product listings.
- **Shopping Cart**: Fully functional persistent cart system.
- **Map Integration**: Interactive maps for shop locations using Leaflet.
- **Security**: Secure authentication powered by JWT tokens.
- **Responsive Design**: Fully optimized for mobile and desktop viewing.

---

## 🛠 Technology Stack
### Backend
- **Django 6.0+**
- **Django REST Framework**
- **SimpleJWT** (Authentication)
- **SQLite** (Database)

### Frontend
- **Angular 17+** (Standalone components)
- **TypeScript**
- **Leaflet** (Maps API)
- **FontAwesome** (Icons)

---

## 🏁 Getting Started

### 1. Prerequisites
Ensure you have **Python 3.x** and **Node.js** (with npm) installed on your system.

### 2. Backend Setup
```bash
cd configdrf
pip install -r requirements.txt
python manage.py migrate
python seed_data.py  # Populate the database with initial data
python manage.py runserver
```
*The backend will be available at: `http://127.0.0.1:8000`*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
*The website will be available at: `http://localhost:4200`*

---

## 🔐 Admin Credentials (Default)
- **Email**: `admin@admin.com`
- **Password**: `adminpassword`
*(You can modify these or create a new one via `python create_admin.py`)*

---

## 📖 API Documentation
Once the backend is running, the interactive API documentation is available at:
`http://127.0.0.1:8000/swagger/`