import { FormEvent, useState } from "react";

interface TaskComposerProps {
  onCreate: (values: { title: string; description: string }) => Promise<void>;
}

export function TaskComposer({ onCreate }: TaskComposerProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await onCreate({ title, description });
      setTitle("");
      setDescription("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to create task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="border-2 border-ink bg-paper p-5 sm:p-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-quiet">New task</p>
          <h3 className="mt-3 font-display text-3xl uppercase leading-none tracking-tight">Compose the next move</h3>
        </div>

        <label className="block">
          <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-quiet">Title</span>
          <input
            className="form-field"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ship the dashboard"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-quiet">Description</span>
          <textarea
            className="form-field min-h-32 resize-y"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Detail the outcome, scope, and constraints."
          />
        </label>

        {errorMessage ? (
          <div className="border border-ink bg-mist px-4 py-3 text-sm text-ink">{errorMessage}</div>
        ) : null}

        <button className="primary-button w-full sm:w-auto" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Saving" : "Create task"}
        </button>
      </div>
    </form>
  );
}

