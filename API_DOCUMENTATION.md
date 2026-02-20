# API Documentation - Bizecore

This document provides a comprehensive overview of the available API endpoints for the Bizecore application. The API is structured around standard RESTful principles and is primarily consumed by an Inertia.js frontend.

## Table of Contents
1. [Authentication & Public Access](#authentication--public-access)
2. [Dashboard](#dashboard)
3. [Employee Management (Interns)](#employee-management-interns)
4. [User Management (Staff)](#user-management-staff)
5. [Division Management](#division-management)
6. [Project Management](#project-management)
7. [Task Management](#task-management)
8. [Bug Reports](#bug-reports)
9. [User Profile](#user-profile)
10. [Onboarding](#onboarding)

---

## Authentication & Public Access

Publicly accessible endpoints for visitors and user authentication.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | **Home Page**. Displays company statistics, latest projects, and team overview. | No |
| **GET** | `/login` | **Login Page**. Shows the login form. | No |
| **POST** | `/login` | **Authenticate User**. Accepts `email` and `password`. Returns session cookie on success. | No |
| **POST** | `/logout` | **Logout**. Terminates the current user session. | Yes |
| **GET** | `/register` | **Register Page**. Shows the registration form (if enabled). | No |
| **POST** | `/register` | **Register User**. Creates a new user account. | No |
| **GET** | `/forgot-password` | **Forgot Password Page**. Request a password reset link. | No |
| **POST** | `/forgot-password` | **Send Reset Link**. Sends a password reset email to the user. | No |
| **GET** | `/employees` | **Public Employee Directory**. Lists all team members (interns & staff). | No |
| **GET** | `/projects` | **Public Project Portfolio**. Lists all public projects. | No |

---

## Dashboard

The central hub for logged-in users.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/dashboard` | **Dashboard Overview**. Returns key metrics (total employees, projects, tasks, etc.), recent activity, and division distribution charts. | Yes |

---

## Employee Management (Interns)

Endpoints for managing intern records.
*Note: Full-time staff are managed under [User Management](#user-management-staff).*

**Base URL:** `/dashboard/employees`

| Method | Endpoint | Description | Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | **List Interns**. Returns a paginated list of interns with search and filter options. | `search` (optional), `division_id` (optional) |
| **POST** | `/` | **Create Intern**. Adds a new intern record. | `name`, `email`, `division_id`, `start_date`, `end_date`, `status` |
| **PUT** | `/{employee}` | **Update Intern**. Modifies an existing intern's details. | same as create |
| **DELETE** | `/{employee}` | **Delete Intern**. Permanently removes an intern record. | - |

---

## User Management (Staff)

Endpoints for managing system users, including Administrators, Project Managers, and Field Workers.
*Access restricted to Admins and Super Admins.*

**Base URL:** `/dashboard/users`

| Method | Endpoint | Description | Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | **List Users**. Returns a paginated list of staff members. | `search` (optional), `role` (optional) |
| **POST** | `/` | **Create User**. Creates a new staff account. | `name`, `email`, `password`, `role` (admin/manager/worker), `division_id` |
| **PUT** | `/{user}` | **Update User**. Updates staff details and roles. | `name`, `email`, `role`, `division_id`, `password` (optional) |
| **DELETE** | `/{user}` | **Delete User**. Removes a user account. | - |

---

## Division Management

Endpoints for managing organizational divisions/departments.

**Base URL:** `/dashboard/divisions`

| Method | Endpoint | Description | Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | **List Divisions**. Returns all divisions with member counts. | - |
| **POST** | `/` | **Create Division**. Adds a new division. | `name`, `description` |
| **PUT** | `/{division}` | **Update Division**. Modifies division details. | `name`, `description` |
| **DELETE** | `/{division}` | **Delete Division**. Removes a division (may require reassigning members). | - |
| **GET** | `/{division}/tasks` | **Division Tasks**. Helper to view tasks specific to a division. | - |

---

## Project Management

Endpoints for managing client projects.

**Base URL:** `/dashboard/projects`

| Method | Endpoint | Description | Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | **List Projects**. Returns projects with filters. | `status`, `search` |
| **POST** | `/` | **Create Project**. Initiates a new project. | `name`, `client`, `deadline`, `status`, `pic_id` (Person in Charge), `description` |
| **GET** | `/export` | **Export Projects**. Downloads project data (e.g., CSV/Excel). | - |
| **PUT** | `/{project}` | **Update Project**. Modifies project details. | same as create |
| **DELETE** | `/{project}` | **Delete Project**. Removes a project record. | - |

---

## Task Management

Endpoints for managing tasks assigned to users or interns.

**Base URL:** `/dashboard/tasks`

| Method | Endpoint | Description | Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | **List Tasks**. Returns tasks viewable by the user. | `status`, `priority` |
| **POST** | `/` | **Create Task**. Assigns a new task. | `title`, `description`, `assigned_to` (user_id), `project_id`, `priority`, `due_date` |
| **PUT** | `/{task}` | **Update Task**. Modifies task details or status. | `status` (pending/in_progress/completed), etc. |
| **DELETE** | `/{task}` | **Delete Task**. Removes a task. | - |

---

## Bug Reports

Endpoints for submitting and tracking system issues.
*Only Admins/Super Admins can view/manage reports.*

**Base URL:** `/dashboard/bug-reports`

| Method | Endpoint | Description | Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | **List Reports**. View all submitted bugs. | `status`, `priority` |
| **POST** | `/` | **Submit Report**. Create a new bug report. | `title`, `description`, `priority`, `steps_to_reproduce` |
| **PATCH** | `/{bugReport}` | **Update Status**. Change the status of a bug report. | `status` (open/in_progress/resolved) |
| **DELETE** | `/{bugReport}` | **Delete Report**. Remove a bug report. | - |

---

## User Profile

Endpoints for users to manage their own settings.

**Base URL:** `/dashboard/profile`

| Method | Endpoint | Description | Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | **Edit Profile**. Show profile edit form. | - |
| **PUT** | `/` | **Update Profile**. Save changes to profile info. | `name`, `email`, `password` (current & new) |
| **DELETE** | `/` | **Delete Account**. Permanently delete own account. | `password` (for confirmation) |

---

## Onboarding

Endpoints related to user onboarding processes.

**Base URL:** `/dashboard/onboarding`

| Method | Endpoint | Description | Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | **View Onboarding**. Show onboarding steps/status. | - |
| **POST** | `/` | **Update Onboarding**. Mark steps as complete. | `step_id`, `completed` (boolean) |

---

*Generated for Bizecore Application on 2026-02-20*
