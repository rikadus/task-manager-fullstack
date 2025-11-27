# task-manager-fullstack

Full-Stack Task Management System using React + TypeScript (Frontend) e Node.js (Backend) - CRUD

# Technologies Used

# Frontend

- **React 18** - JavaScript library for building interfaces
- **TypeScript** - JavaScript typed superset
- **Vite** - Fast and modern build tool
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP for requests to API

# Backend

- **Node.js** - JavaScript execution environment
- **Express** - Framework web minimalist
- **TypeScript** - Static typing for enhanced security
- **CORS** - Middleware for access control
- **ts-node-dev** - Development with hot-reload

## Features

- **Create** new tasks with a title and description.
- **List all** registered tasks.
- **Update** task completion status
- **Delete** unwanted tasks
- Responsive and modern interface
- Real-time visual feedback
- Complete RESTful API

## Project Structure

task-manager-fullstack/
├── frontend/ # Aplicação React
│ ├── src/
│ │ ├── services/ # Integração com API
│ │ ├── types/ # Definições TypeScript
│ │ ├── App.tsx # Componente principal
│ │ └── index.css # Estilos globais
│ ├── package.json
│ └── vite.config.ts
│
├── backend/ # API Node.js
│ ├── src/
│ │ └── server.ts # Servidor Express
│ ├── package.json
│ └── tsconfig.json
│
├── .gitignore
└── README.md

Installation and Execution

### Prerequisites

- Node.js (version 18 or higher)

- pnpm (or npm/fio)

1. Clone the repository

git clone https://github.com/rikadus/task-manager-fullstack.git
cd task-manager-fullstack

2. Install the Backend dependencies

cd backend
pnpm install

Create the `.env` file in the `backend` folder:

PORT=3000

3. Install the Frontend dependencies.

cd ../frontend
pnpm install

4. Run the project

**Backend (Terminal 1):**

cd backend
pnpm dev

The server will be running at: `http://localhost:3000`

**Frontend (Terminal 2):**

cd frontend
pnpm dev

The application will be available at: `http://localhost:5173`

## Endpoints da API

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/api/tasks`     | Lista todas as tarefas      |
| GET    | `/api/tasks/:id` | Busca uma tarefa específica |
| POST   | `/api/tasks`     | Cria uma nova tarefa        |
| PUT    | `/api/tasks/:id` | Atualiza uma tarefa         |
| DELETE | `/api/tasks/:id` | Exclui uma tarefa           |

### Example Request

**POST /api/tasks**

{
"title": "Estudar TypeScript",
"description": "Aprender sobre tipos avançados",
"completed": false
}

**Response:**

{
"id": "1732677600000",
"title": "Estudar TypeScript",
"description": "Aprender sobre tipos avançados",
"completed": false,
"createdAt": "2025-11-27T03:00:00.000Z"
}

## 👨‍💻 Author

**Ricardo Rodrigo**

- GitHub: [@rikadus](https://github.com/rikadus)
- LinkedIn: https://www.linkedin.com/in/ricardo-rodrigoo/
