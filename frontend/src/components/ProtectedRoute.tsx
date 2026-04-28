import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return (
      <div className="editorial-shell flex min-h-screen items-center justify-center px-6">
        <div className="border-2 border-ink bg-paper px-8 py-6 text-center animate-rise">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-quiet">Restoring session</p>
          <p className="mt-3 font-display text-3xl tracking-tight text-ink">Stand by.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

