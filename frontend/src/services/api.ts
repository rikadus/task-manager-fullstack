import axios from "axios";
import { Task } from "../types/Task";

const api = axios.create({
  baseURL: "https://task-manager-api-nkke.onrender.com",
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
