import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CheckCheck, ClipboardList, ListFilter } from "lucide-react";
import Tache from "./Tache";

const filters = [
  { label: "Toutes", value: "all" },
  { label: "En cours", value: "active" },
  { label: "Terminées", value: "done" },
];

export default function ListTask() {
  const tasks = useSelector((state) => state.tasks.items);
  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((task) => !task.isDone);
    if (filter === "done") return tasks.filter((task) => task.isDone);
    return tasks;
  }, [tasks, filter]);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <ClipboardList size={19} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Ma liste de tâches</h2>
            <p className="text-xs text-slate-500">{tasks.length} tâche{tasks.length > 1 ? "s" : ""} au total</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 p-1">
          <span className="px-2 text-slate-400"><ListFilter size={15} /></span>
          {filters.map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${filter === item.value ? "bg-white text-violet-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <Tache key={task.id} task={task} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
              {filter === "done" ? <CheckCheck size={25} /> : <ClipboardList size={25} />}
            </div>
            <p className="font-semibold text-slate-700">
              {filter === "done" ? "Aucune tâche terminée" : filter === "active" ? "Tout est à jour !" : "Votre liste est vide"}
            </p>
            <p className="mt-1 max-w-xs text-sm text-slate-400">
              {filter === "all" ? "Ajoutez votre première tâche pour commencer à vous organiser." : "Les tâches correspondant à ce filtre apparaîtront ici."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}