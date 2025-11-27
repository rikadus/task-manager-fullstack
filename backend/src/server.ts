import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Interface da Tarefa
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

// Banco de dados em memória (temporário)
let tasks: Task[] = [];

// Rotas

// GET - Listar todas as tarefas
app.get("/api/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

// GET - Buscar tarefa por ID
app.get("/api/tasks/:id", (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Tarefa não encontrada" });
  }
  res.json(task);
});

// POST - Criar nova tarefa
app.post("/api/tasks", (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Título é obrigatório" });
  }

  const newTask: Task = {
    id: Date.now().toString(),
    title,
    description: description || "",
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT - Atualizar tarefa
app.put("/api/tasks/:id", (req: Request, res: Response) => {
  const { title, description, completed } = req.body;
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarefa não encontrada" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title ?? tasks[taskIndex].title,
    description: description ?? tasks[taskIndex].description,
    completed: completed ?? tasks[taskIndex].completed,
  };

  res.json(tasks[taskIndex]);
});

// DELETE - Excluir tarefa
app.delete("/api/tasks/:id", (req: Request, res: Response) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarefa não encontrada" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// Rota raiz
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API Task Manager - Backend funcionando!" });
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
