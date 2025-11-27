import axios from "axios";
import { Task } from "../types/Task";

// Configuração Inteligente:
// Se estiver no "localhost", usa o seu PC.
// Se estiver na internet, usa o seu NOVO link do Render.
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const api = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:3333" // Garanta que seu backend local esteja rodando aqui
    : "https://task-manager-api-365t.onrender.com", //
});

export const taskService = {
  // Listar todas as tarefas
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get("/tasks");
    return response.data;
  },

  // Buscar tarefa por ID
  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Criar nova tarefa
  createTask: async (task: Omit<Task, "id" | "createdAt">): Promise<Task> => {
    const response = await api.post("/tasks", task);
    return response.data;
  },

  // Atualizar tarefa
  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  // Excluir tarefa
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
