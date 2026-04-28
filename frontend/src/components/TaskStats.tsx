import { Task } from "../types/task";

export function TaskStats({ tasks }: { tasks: Task[] }) {
  const completedCount = tasks.filter((task) => task.status === "Completed").length;
  const pendingCount = tasks.length - completedCount;

  return (
    <section className="dark-lines relative overflow-hidden border-2 border-ink bg-ink px-6 py-6 text-paper">
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-paper/70">Total</p>
          <p className="mt-2 font-display text-5xl leading-none tracking-tight">{tasks.length}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-paper/70">Pending</p>
          <p className="mt-2 font-display text-5xl leading-none tracking-tight">{pendingCount}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-paper/70">Completed</p>
          <p className="mt-2 font-display text-5xl leading-none tracking-tight">{completedCount}</p>
        </div>
      </div>
    </section>
  );
}

