
# RaziqTech Studios - Enterprise Software Startup

A production-ready full-stack platform built with Next.js architecture, featuring a robust admin portal and client-facing interfaces.

## Tech Stack
- **Frontend**: Next.js (App Router Simulation), Tailwind CSS, Lucide Icons.
- **Backend**: Next.js API Routes (Mocked via MockDB persistent storage).
- **Authentication**: Role-Based Access Control (RBAC) - Admin & Employee.
- **Storage**: Persistent LocalStorage Database (MockDB).

## Features
- **Public Website**: Hero, Services, Portfolio, Team, Contact.
- **Dynamic Routing**: Employee profiles with direct chat integrations.
- **Admin Portal**: 
  - Employee Management (CRUD, Skills, Availability).
  - Portfolio Management (CRUD, Case Studies).
  - CRM / Lead Tracking (Contact forms).
  - Security-First Authentication.
- **Chat Routing**: Real-time floating chat system.

## Local Setup
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.
4. Access the app at `http://localhost:3000`.

## Environment Variables
Create a `.env` file with:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/raziqtech
JWT_SECRET=your_super_secret_key
```

## Admin Access
- **Email**: `admin@raziqtech.com`
- **Password**: `password` (Mock implementation)

## Deployment
This project is Vercel-ready. Simply push to GitHub and connect your Vercel account. Ensure environment variables are set in the Vercel dashboard.
