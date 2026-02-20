# 🚀 Bizecore - Enterprise Intelligence Ecosystem

![Laravel](https://img.shields.io/badge/Laravel-12.0-FF2D20?style=for-the-badge&logo=laravel)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Inertia.js](https://img.shields.io/badge/Inertia.js-v2.0-9553E9?style=for-the-badge&logo=inertia)

**Bizecore** is a premium enterprise management platform designed for high-performance teams. Built with a modern, separated architecture, it provides a stunning landing page and a high-intelligence dashboard for organizational transparency and strategic mission management.

---

## ✨ Key Intelligence Features

| Feature | Description |
| :--- | :--- |
| **Separated Architecture** | Dual-bundle system with dedicated entry points for Landing (`landing.jsx`) and Dashboard (`dashboard.jsx`). |
| **Intelligence Dashboard** | Real-time visualization of company KPIs, division health, and project metrics. |
| **Mission Hub (Kanban)** | Strategic mission allocation with a premium interface. |
| **Dynamic Configuration** | Centralized identity management via `config/bizecore.php` for zero-hardcoding. |
| **Robust Validation** | Professional-grade form handling with specialized components (`FormField`, `LoadingOverlay`) and real-time error mapping. |
| **Glassmorphism UI** | A state-of-the-art interface featuring Framer Motion animations and sleek premium aesthetics. |

---

## 🛠️ Technology Stack

- **Backend Architecture**: Laravel 12 (Modern PHP 8.2 Ecosystem)
- **Frontend Core**: React 19 & Inertia.js (Multi-Entry SPA Architecture)
- **Styling & Motion**: Tailwind CSS 4 + Framer Motion
- **Tooling**: Vite with separate build bundles for optimized delivery.
- **Security**: Laravel Sanctum, Custom SecurityHeaders, and RBAC System.

---

## 🚀 Deployment & Installation

### 1. Requirements
- PHP >= 8.2
- Composer
- Node.js (v20+) & NPM
- MySQL 8.0+

### 2. Quick Setup
```bash
# Clone the repository
git clone https://github.com/growjoy/bizecore.git
cd Bizecore

# Initialize PHP dependencies
composer install

# Initialize JavaScript environment
npm install

# Configure Environment
cp .env.example .env
php artisan key:generate
```

### 3. Database Activation
Update your `.env` with your database credentials, then run:
```bash
php artisan migrate --seed
```

### 4. Running the Ecosystem
```bash
# Start development environment
npm run dev
```
*Note: `npm run dev` handles both Vite and Laravel server concurrently.*

---

## 🏗️ Technical Architecture Details

### Multiple Entry Points
Bizecore uses a specialized Vite configuration to separate public and private assets:
- **Landing Page**: Served via `resources/js/landing.jsx` and `landing.blade.php`.
- **Admin Dashboard**: Served via `resources/js/dashboard.jsx` and `dashboard.blade.php`.
- **Root View Switching**: Managed dynamically in `HandleInertiaRequests.php` based on request paths.

### Component System
- `FormField`: Unified input handling with built-in validation error display.
- `LoadingOverlay`: Global processing state for high-stakes actions.
- `MainLayout` & `DashboardLayout`: Context-specific wrappers for different app areas.

---

## 🔐 Digital Access Credentials

| Authority Level | Email | Initial Key |
| :--- | :--- | :--- |
| **Superadmin (Lathif)** | `lathif@bizecore.com` | `password` |
| **Admin (Rasya)** | `rasya@bizecore.com` | `password` |
| **Worker (Izha)** | `izha@bizecore.com` | `password` |

---

*Engineered for High-Performance Teams & Strategic Growth.*
*© 2024 Bizecore - Intelligence in Action.*
# bizecore-lite
