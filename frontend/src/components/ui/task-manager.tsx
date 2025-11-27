import { useState, useEffect } from "react";
import { taskService } from "../../services/api";
import { Task } from "../../types/Task";

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // NOVO: Estado para saber qual tarefa estamos editando (null = modo criação)
  const [editingId, setEditingId] = useState<string | null>(null);

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

  // Cria ou Atualiza dependendo do modo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingId) {
        // --- MODO EDIÇÃO ---
        await taskService.updateTask(editingId, { title, description });
        setEditingId(null); // Sai do modo edição
      } else {
        // --- MODO CRIAÇÃO ---
        await taskService.createTask({ title, description, completed: false });
      }

      // Limpa o formulário e recarrega
      setTitle("");
      setDescription("");
      loadTasks();
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    }
  };

  // Função chamada ao clicar no botão "Editar" da lista
  const handleEditClick = (task: Task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description || "");
    // Rola a página suavemente para o topo (formulário)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
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
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        await taskService.deleteTask(id);
        loadTasks();
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 bg-blue-100">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
          📋 Gerenciador de Tarefas
        </h1>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="bg-green-300 border border-gray-200 rounded-lg p-6 mb-8 relative"
        >
          {/* Indicador visual de Edição */}
          {editingId && (
            <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-bl-lg border-b border-l border-yellow-200">
              MODO EDIÇÃO
            </div>
          )}

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

          <div className="flex gap-3">
            <button
              type="submit"
              className={`flex-1 text-white font-semibold py-2 px-4 rounded-lg transition ${
                editingId
                  ? "bg-yellow-600 hover:bg-yellow-700" // Cor Amarela para Edição
                  : "bg-indigo-600 hover:bg-indigo-700" // Cor Indigo para Criação
              }`}
            >
              {editingId ? "💾 Salvar Alterações" : "➕ Adicionar Tarefa"}
            </button>

            {/* Botão Cancelar (só aparece se estiver editando) */}
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Lista de Tarefas */}
        <div className="bg-white rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Minhas Tarefas
          </h2>
          {loading ? (
            <p className="text-center text-gray-500 py-8">Carregando...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nenhuma tarefa cadastrada. Adicione uma acima!
            </p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:shadow-md transition ${
                    task.completed
                      ? "bg-gray-50 border-gray-100"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 mb-3 sm:mb-0 w-full">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                      className="mt-1.5 w-5 h-5 cursor-pointer accent-indigo-600"
                    />
                    <div className="break-all">
                      <h3
                        className={`font-semibold text-lg ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p
                          className={`text-sm ${
                            task.completed ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Grupo de Botões de Ação */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="text-yellow-600 hover:text-white border border-yellow-600 hover:bg-yellow-600 px-3 py-1.5 rounded transition text-sm font-medium"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 px-3 py-1.5 rounded transition text-sm font-medium"
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
