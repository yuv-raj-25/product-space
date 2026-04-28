import { useEffect, useMemo, useState } from "react";

import { TaskComposer } from "../components/TaskComposer";
import { TaskCard } from "../components/TaskCard";
import { TaskStats } from "../components/TaskStats";
import { ApiClientError } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { taskService } from "../services/taskService";
import { Task } from "../types/task";

export function DashboardPage() {
  const { user, token, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const taskList = await taskService.list(token);
        setTasks(taskList);
      } catch (error) {
        if (error instanceof ApiClientError) {
          setErrorMessage(error.errors[0] || error.message);
        } else {
          setErrorMessage("Unable to load tasks.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadTasks();
  }, [token]);

  const pendingTasks = useMemo(() => tasks.filter((task) => task.status === "Pending"), [tasks]);
  const completedTasks = useMemo(() => tasks.filter((task) => task.status === "Completed"), [tasks]);

  const handleCreateTask = async ({ title, description }: { title: string; description: string }) => {
    if (!token) {
      return;
    }

    const createdTask = await taskService.create(token, title, description);
    setTasks((currentTasks) => [createdTask, ...currentTasks]);
  };

  const handleToggleStatus = async (task: Task) => {
    if (!token) {
      return;
    }

    setActiveTaskId(task.id);

    try {
      const nextStatus = task.status === "Pending" ? "Completed" : "Pending";
      const updatedTask = await taskService.updateStatus(token, task.id, nextStatus);
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) => (currentTask.id === task.id ? updatedTask : currentTask)),
      );
    } finally {
      setActiveTaskId(null);
    }
  };

  const handleDeleteTask = async (task: Task) => {
    if (!token) {
      return;
    }

    setActiveTaskId(task.id);

    try {
      await taskService.delete(token, task.id);
      setTasks((currentTasks) => currentTasks.filter((currentTask) => currentTask.id !== task.id));
    } finally {
      setActiveTaskId(null);
    }
  };

  return (
    <main className="editorial-shell min-h-screen bg-paper text-ink">
      <section className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
        <header className="border-b border-ink pb-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl animate-reveal">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-quiet">Product Space / Dashboard</p>
              <h1 className="mt-6 font-display text-6xl uppercase leading-none tracking-tighter sm:text-7xl lg:text-[7.5rem]">
                Task
                <br />
                Control
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-quiet sm:text-xl">
                A private command surface for {user?.name}. Write the next task, close what is done, and keep every
                record scoped to your account.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-2 border-ink bg-paper p-5 sm:flex-row sm:items-center sm:justify-between lg:min-w-[320px]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-quiet">Authenticated as</p>
                <p className="mt-2 font-display text-3xl uppercase leading-none tracking-tight">{user?.name}</p>
                <p className="mt-2 break-all font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">{user?.email}</p>
              </div>
              <button className="secondary-button" onClick={logout} type="button">
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="mt-8">
          <TaskStats tasks={tasks} />
        </div>

        <section className="mt-8 grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
          <div className="space-y-6">
            <TaskComposer onCreate={handleCreateTask} />
            {errorMessage ? (
              <div className="border border-ink bg-mist px-4 py-3 text-sm text-ink">{errorMessage}</div>
            ) : null}
          </div>

          <div className="grid gap-8">
            <section>
              <div className="mb-5 flex items-end justify-between border-b border-ink pb-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-quiet">Pending tasks</p>
                  <h2 className="mt-2 font-display text-4xl uppercase leading-none tracking-tight">Open loops</h2>
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-quiet">{pendingTasks.length}</span>
              </div>

              {isLoading ? (
                <div className="border border-ink px-5 py-6 text-base text-quiet">Loading your tasks...</div>
              ) : pendingTasks.length === 0 ? (
                <div className="border border-ink px-5 py-6 text-base leading-relaxed text-quiet">
                  No pending tasks. Capture the next objective in the composer.
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {pendingTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={handleDeleteTask}
                      onToggleStatus={handleToggleStatus}
                      isBusy={activeTaskId === task.id}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="mb-5 flex items-end justify-between border-b border-ink pb-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-quiet">Completed tasks</p>
                  <h2 className="mt-2 font-display text-4xl uppercase leading-none tracking-tight">Closed loops</h2>
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-quiet">{completedTasks.length}</span>
              </div>

              {completedTasks.length === 0 ? (
                <div className="border border-ink px-5 py-6 text-base leading-relaxed text-quiet">
                  Nothing completed yet. Push one task across the line.
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {completedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={handleDeleteTask}
                      onToggleStatus={handleToggleStatus}
                      isBusy={activeTaskId === task.id}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}
