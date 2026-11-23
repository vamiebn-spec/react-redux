import { useState } from "react";
import { useDispatch } from "react-redux";
import { Check, CheckCircle2, Pencil, Save, Trash2, X } from "lucide-react";
import { deleteTask, editTask, toggleTask } from "../features/tasks/tasksSlice";

export default function Tache({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);

  const saveEdit = () => {
    const description = value.trim();
    if (!description) return;
    dispatch(editTask({ id: task.id, description }));
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setValue(task.description);
    setIsEditing(false);
  };

  return (
    <article className={`group flex items-start gap-3 rounded-xl border p-4 transition ${task.isDone ? "border-slate-100 bg-slate-50/80" : "border-slate-200 bg-white hover:border-violet-200 hover:shadow-sm"}`}>
      <button
        type="button"
        onClick={() => dispatch(toggleTask(task.id))}
        aria-label={task.isDone ? "Marquer comme non terminée" : "Marquer comme terminée"}
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${task.isDone ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white text-transparent hover:border-violet-500"}`}
      >
        <Check size={14} strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        {isEditing ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              autoFocus
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") saveEdit();
                if (event.key === "Escape") cancelEdit();
              }}
              maxLength={120}
              className="h-9 min-w-0 flex-1 rounded-lg border border-violet-300 bg-white px-3 text-sm outline-none focus:ring-4 focus:ring-violet-100"
            />
            <div className="flex gap-2">
              <button onClick={saveEdit} className="inline-flex h-9 items-center gap-1 rounded-lg bg-violet-600 px-3 text-xs font-semibold text-white hover:bg-violet-700">
                <Save size={14} /> Enregistrer
              </button>
              <button onClick={cancelEdit} className="inline-flex h-9 items-center gap-1 rounded-lg bg-slate-100 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-200">
                <X size={14} /> Annuler
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <p className={`break-words text-sm font-medium leading-6 ${task.isDone ? "text-slate-400 line-through" : "text-slate-700"}`}>
              {task.description}
            </p>
            {task.isDone && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                <CheckCircle2 size={11} /> Terminée
              </span>
            )}
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex shrink-0 items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label="Modifier la tâche"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={() => dispatch(deleteTask(task.id))}
            aria-label="Supprimer la tâche"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </article>
  );
}