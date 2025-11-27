import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Carrega variáveis de ambiente
dotenv.config();

const app = express();

// 1. CONFIGURAÇÃO DO CORS (Permite que o Front fale com o Back)
app.use(cors());

// 2. CONFIGURAÇÃO DO JSON (Permite ler os dados enviados)
app.use(express.json());

// Banco de dados em memória (Array simples)
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

let tasks: Task[] = [];

// --- ROTAS ---

// Rota de Teste (para ver se o servidor está vivo)
app.get("/", (req, res) => {
  res.send("API do Task Manager está rodando! 🚀");
});

// Listar Tarefas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Criar Tarefa
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  const newTask: Task = {
    id: new Date().toISOString(), // Gera ID único baseado no tempo
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Atualizar Tarefa (Editar ou Concluir)
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex < 0) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  // Atualiza apenas os campos enviados
  const task = tasks[taskIndex];
  tasks[taskIndex] = {
    ...task,
    title: title ?? task.title,
    description: description ?? task.description,
    completed: completed ?? task.completed,
  };

  res.json(tasks[taskIndex]);
});

// Deletar Tarefa
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex < 0) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// --- INICIALIZAÇÃO ---
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
