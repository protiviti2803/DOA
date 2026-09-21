# Delegation of Authority (DOA) Governance Workflow Tool

A full-stack enterprise prototype for managing, inspecting, reviewing, and publishing Delegations of Authority (DOA) with two lines of defense (2LoD) governance.

---

## Project Structure

```text
DOA/
├── frontend/                  # React 19 + Vite Single Page Application
│   ├── src/                   # React components, dashboards, services
│   ├── public/                # Static public assets
│   ├── index.html             # Single-page application root
│   ├── package.json           # Frontend dependencies & scripts
│   ├── vite.config.js         # Vite bundler configuration
│   └── tailwind.config.js     # Styling & theme design tokens
│
├── backend/                   # FastAPI REST API Backend
│   ├── app/                   # API routes, business logic services, models
│   ├── requirements.txt       # Python dependencies
│   ├── doa.db                 # SQLite database
│   └── seed.py                # Database seed script
│
├── development.md             # In-depth architectural & data flow documentation
└── README.md                  # Project overview & startup instructions
```

---

## Quick Start

### 1. Start the Backend Service
```powershell
cd backend
.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```
API Documentation will be accessible at: `http://localhost:8000/docs`

### 2. Start the Frontend Application
```powershell
cd frontend
npm run dev
```
The React frontend will be accessible at: `http://localhost:5173`

---

## Role-Based Logins & Credentials

| Role | Email | Password | Landing Route |
| :--- | :--- | :--- | :--- |
| **Normal User** (Requester) | `user@doa.local` | `User@123` | `http://localhost:5173/login/normaluser` |
| **Governance Team** (Reviewer) | `governance@doa.local` | `Gov@123` | `http://localhost:5173/login/governance` |
| **DOA Administrator** (Executive) | `doaadmin@doa.local` | `DoaAdmin@123` | `http://localhost:5173/login/doa-admin` |
| **System Administrator** (IT/Ops) | `sysadmin@doa.local` | `SysAdmin@123` | `http://localhost:5173/login/system-admin` |

For detailed architectural diagrams and data flow documentation, refer to [development.md](file:///C:/Works/DOA/development.md).
