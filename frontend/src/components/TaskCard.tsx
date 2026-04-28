import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onToggleStatus: (task: Task) => Promise<void>;
  onDelete: (task: Task) => Promise<void>;
  isBusy: boolean;
}

export function TaskCard({ task, onToggleStatus, onDelete, isBusy }: TaskCardProps) {
  return (
    <article className="flex h-full flex-col justify-between border border-ink bg-paper p-5 transition hover:-translate-y-1 hover:bg-mist">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-quiet">
              {task.status === "Completed" ? "Closed loop" : "In motion"}
            </p>
            <h3 className="mt-3 font-display text-3xl uppercase leading-none tracking-tight">{task.title}</h3>
          </div>
          <span
            className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${
              task.status === "Completed" ? "border-ink bg-ink text-paper" : "border-ink bg-paper text-ink"
            }`}
          >
            {task.status}
          </span>
        </div>

        <p className="mt-5 min-h-24 text-base leading-relaxed text-quiet">
          {task.description || "No description provided. The title itself is the brief."}
        </p>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-quiet">
          Updated {new Date(task.updatedAt).toLocaleDateString()}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="secondary-button"
            disabled={isBusy}
            onClick={() => void onToggleStatus(task)}
            type="button"
          >
            {task.status === "Pending" ? "Mark complete" : "Move to pending"}
          </button>
          <button className="secondary-button" disabled={isBusy} onClick={() => void onDelete(task)} type="button">
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

