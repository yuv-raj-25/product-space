import { Link } from "react-router-dom";

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  footerText: string;
  footerActionLabel: string;
  footerHref: string;
  children: React.ReactNode;
}

export function AuthLayout({
  eyebrow,
  title,
  description,
  footerText,
  footerActionLabel,
  footerHref,
  children,
}: AuthLayoutProps) {
  return (
    <main className="editorial-shell min-h-screen bg-paper text-ink">
      <section className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-between border-b border-ink px-6 py-8 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-14">
          <div className="animate-reveal">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-quiet">{eyebrow}</p>
            <div className="mt-10 section-rule max-w-28" />
            <h1 className="mt-10 max-w-4xl font-display text-6xl uppercase leading-none tracking-tighter sm:text-7xl lg:text-8xl">
              Own the
              <br />
              work.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-quiet sm:text-xl">{description}</p>
          </div>

          <div className="mt-16 grid gap-6 border-t border-ink pt-8 font-mono text-xs uppercase tracking-[0.2em] text-quiet sm:grid-cols-3">
            <span>Private access</span>
            <span>User scoped tasks</span>
            <span>Secure workflow</span>
          </div>
        </div>

        <div className="panel-grid flex items-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full animate-rise border-2 border-ink bg-paper p-6 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-quiet">{title}</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight sm:text-5xl">
              Enter the workspace
            </h2>
            <div className="mt-8">{children}</div>
            <p className="mt-8 border-t border-line pt-6 text-base text-quiet">
              {footerText}{" "}
              <Link className="border-b border-ink pb-0.5 text-ink transition hover:bg-ink hover:text-paper" to={footerHref}>
                {footerActionLabel}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

