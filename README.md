# 🚀 Enginow - Multi-Tenant Project Management API

A production-ready SaaS backend simulating tools like Jira or Asana. Built with **Node.js, Express, and PostgreSQL**, featuring strict data isolation (multi-tenancy), role-based access control (RBAC), and security best practices.

## 🌟 Key Features
* **🏢 Multi-Tenancy:** Each organization has isolated data. Users from "Org A" cannot access data from "Org B".
* **🔐 Role-Based Access (RBAC):** * **Admins** can manage projects and invite members.
    * **Members** can only view projects and update task statuses.
* **🛡️ Security:** JWT Authentication, Bcrypt hashing, Rate Limiting (DDoS protection), and Input Validation (Joi).
* **📜 Audit Logging:** Tracks critical actions (e.g., "Project Created", "Task Completed") for accountability.
* **⚡ Performance:** Pagination implemented on heavy data endpoints.

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (via `pg` library)
* **Security:** `bcryptjs`, `jsonwebtoken`, `express-rate-limit`, `joi`

## 🚀 API Endpoints

### 1. Authentication
| Method | Endpoint             | Description                         |
| :---   | :--------------------| :---------------------------------- |
| `POST` | `/api/auth/register` | Register a new Organization & Admin |
| `POST` | `/api/auth/login`    | Log in and receive a JWT Token      |

### 2. Organization Management
| Method | Endpoint          | Description                     | Access        |
| :----- | :---------------- | :------------------------------ | :------------ |
| `POST` | `/api/org/invite` | Invite a new member to your Org | 🔒 Admin Only |

### 3. Projects
| Method  | Endpoint           | Description                   | Access        |
| :------ | :----------------- | :---------------------------- | :------------ |
| `POST`  | `/api/projects`    | Create a new project          | 🔒 Admin Only |
| `GET`   | `/api/projects`    | Get all projects for your Org | 🔓 Members    |
| `DELETE`| `/api/projects/:id`| Delete a project              | 🔒 Admin Only |

### 4. Tasks
| Method  | Endpoint                | Description                                           | Access     |
| :---    | :---                    | :---                                                  | :---       |
| `POST`  | `/api/tasks`            | Create a task                                         | 🔓 Members |
| `GET`   | `/api/tasks/:projectId` | Fetch tasks (Supports pagination: `?page=1&limit=10`) | 🔓 Members |
| `PATCH` | `/api/tasks/:id/status` | Update status (Todo/In-Progress/Done)                 | 🔓 Members |

### 5. Activity Logs
| Method | Endpoint    | Description                        | Access        |
| :-- -  | :---        | :-------                           | :---          |
| `GET`  | `/api/logs` | View history of actions in the Org | 🔒Admin Only |

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/saas-backend-engine.git](https://github.com/YOUR_USERNAME/saas-backend-engine.git)
   cd saas-backend-engine

   ## 🗄️ Database Schema
![ER Diagram, Highlevel schema](./erd/erd_diagram1.png)
![Relataional view](./erd/erd_diagram2.png)