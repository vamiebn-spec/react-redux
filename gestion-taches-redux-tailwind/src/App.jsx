import { useSelector } from "react-redux";
import { CheckCircle2, Circle, ListTodo, Sparkles, TrendingUp } from "lucide-react";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";

function StatCard({ title, value, icon: Icon, tone, detail }) {
  const tones = {
    violet: "bg-violet-50 text-violet-700",
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </div>
  );
}

export default function App() {
  const tasks = useSelector((state) => state.tasks.items);
  const completed = tasks.filter((task) => task.isDone).length;
  const active = tasks.length - completed;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
              <ListTodo size={21} />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-slate-900">Task<span className="text-violet-600">Flow</span></p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Espace personnel</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700 sm:flex">
            <Sparkles size={14} /> Organisez vos idées
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">TF</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-600">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-600" /> Votre tableau de bord
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Faites avancer vos projets.</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Gardez le cap, une tâche après l'autre. Retrouvez ici tout ce que vous avez à faire.
            </p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-600 to-indigo-600 px-5 py-4 text-white shadow-lg shadow-violet-600/15 md:min-w-52">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-violet-100">Progression globale</p>
                <p className="mt-1 text-2xl font-bold">{progress}%</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <StatCard title="Total des tâches" value={tasks.length} icon={ListTodo} tone="violet" detail="Toutes vos tâches enregistrées" />
          <StatCard title="À faire" value={active} icon={Circle} tone="amber" detail="Les prochaines étapes à réaliser" />
          <StatCard title="Terminées" value={completed} icon={CheckCircle2} tone="emerald" detail="Vos objectifs déjà accomplis" />
        </section>

        <div className="grid items-start gap-5">
          <AddTask />
          <ListTask />
        </div>

        <footer className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200/80 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} TaskFlow. Simplement organisé.</p>
          <p>Conçu avec React, Redux Toolkit et Tailwind CSS.</p>
        </footer>
      </main>
    </div>
  );
}