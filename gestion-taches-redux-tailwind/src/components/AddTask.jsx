import { useState } from "react";
import { useDispatch } from "react-redux";
import { Plus, Sparkles } from "lucide-react";
import { addTask } from "../features/tasks/tasksSlice";

export default function AddTask() {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanDescription = description.trim();
    if (!cleanDescription) return;
    dispatch(addTask(cleanDescription));
    setDescription("");
  };

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
          <Sparkles size={18} />
        </div>
        <div>
          <h2 className="font-semibold text-slate-900">Ajouter une tâche</h2>
          <p className="text-xs text-slate-500">Une petite étape à la fois.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Description de la tâche</span>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Ex. Préparer la présentation du projet..."
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
            maxLength={120}
          />
        </label>
        <button
          type="submit"
          disabled={!description.trim()}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Plus size={18} />
          Ajouter
        </button>
      </form>
    </section>
  );
}