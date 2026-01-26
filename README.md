
# RaziqTech Studios - Enterprise Software Startup (v2)

A production-ready full-stack platform built with Next.js architecture, featuring multi-role authentication (Admin, Employee, Client) and a dedicated dashboard ecosystem.

## New Features (v2)
- **Role-Based Auth**: Distinct portals for Admins, Engineers, and Clients.
- **Client Workspace**: Project tracking, inquiry history, and liaison messaging.
- **Engineer Portal**: Mission tracking and profile management with approval workflows.
- **Admin Workflow**: Approval center for employee manifest updates.
- **Client Signup**: Open registration for new enterprise partners.

## Dashboard Access
- **Admin**: `/admin` (Manage everything)
- **Employee**: `/employee-dashboard` (Manage assigned projects and profile)
- **Client**: `/client-dashboard` (Track project progress and inquiries)

## User Accounts (Test Seed)
- **Admin**: `admin@raziqtech.com` (Pass: password)
- **Employee**: `jane@raziqtech.com` (Pass: password)
- **Client**: `client@enterprise.com` (Pass: password)

## Workflows
### Employee Profile Update
1. Employee logs in to `/employee-dashboard`.
2. Edits bio or skills and clicks "Request Approval".
3. Status changes to "Pending Approval" (badge visible).
4. Admin logs in to `/admin`.
5. Review requests in the "Pending Profile Approvals" section.
6. Authorizing the request pushes changes live to the public Team page.

### Client Onboarding
1. Potential partner visits `/signup`.
2. Initializes an account.
3. Automatically redirected to `/client-dashboard`.
4. Can submit inquiries via `/contact` which are tracked in their personal hub.

## Local Setup
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.
4. Access the app at `http://localhost:3000`.
