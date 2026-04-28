import { FormEvent, useState } from "react";

import { ApiClientError } from "../lib/api";

interface AuthFormProps {
  mode: "login" | "signup";
  onSubmit: (values: { name?: string; email: string; password: string }) => Promise<void>;
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await onSubmit({
        ...(mode === "signup" ? { name } : {}),
        email,
        password,
      });
    } catch (error) {
      if (error instanceof ApiClientError) {
        setErrorMessage(error.errors[0] || error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {mode === "signup" ? (
        <label className="block">
          <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-quiet">Full name</span>
          <input
            className="form-field"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="A deliberate operator"
            required
          />
        </label>
      ) : null}

      <label className="block">
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-quiet">Email</span>
        <input
          className="form-field"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          required
        />
      </label>

      <label className="block">
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-quiet">Password</span>
        <input
          className="form-field"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimum 8 characters"
          required
        />
      </label>

      {errorMessage ? (
        <div className="border border-ink bg-mist px-4 py-3 text-sm text-ink">{errorMessage}</div>
      ) : null}

      <button className="primary-button w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Processing" : mode === "signup" ? "Create account" : "Sign in"}
      </button>
    </form>
  );
}

