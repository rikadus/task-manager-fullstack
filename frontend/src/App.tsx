import { useState, useEffect } from "react";
import { taskService } from "./services/api";
import { Task } from "./types/Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Carregar tarefas ao iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await taskService.createTask({ title, description, completed: false });
      setTitle("");
      setDescription("");
      loadTasks();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await taskService.updateTask(task.id, { completed: !task.completed });
      loadTasks();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
          📋 Gerenciador de Tarefas
        </h1>

        {/* Formulário */}
        <form
          onSubmit={handleCreateTask}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Digite o título da tarefa..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Digite a descrição (opcional)..."
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            ➕ Adicionar Tarefa
          </button>
        </form>

        {/* Lista de Tarefas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Minhas Tarefas
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Carregando...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-500">
              Nenhuma tarefa cadastrada
            </p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <div>
                      <h3
                        className={`font-semibold ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-600">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    🗑️ Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
