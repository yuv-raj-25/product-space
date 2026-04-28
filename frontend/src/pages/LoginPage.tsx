import { useNavigate } from "react-router-dom";

import { AuthForm } from "../components/AuthForm";
import { AuthLayout } from "../components/AuthLayout";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <AuthLayout
      eyebrow="Task system / Access"
      title="Sign in"
      description="A stripped-back control room for personal execution. Authenticate, isolate your workload, and track each move with discipline."
      footerText="Need a private workspace?"
      footerActionLabel="Create an account"
      footerHref="/signup"
    >
      <AuthForm
        mode="login"
        onSubmit={async (values) => {
          await login({
            email: values.email,
            password: values.password,
          });
          navigate("/dashboard");
        }}
      />
    </AuthLayout>
  );
}

