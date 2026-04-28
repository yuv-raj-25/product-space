import { useNavigate } from "react-router-dom";

import { AuthForm } from "../components/AuthForm";
import { AuthLayout } from "../components/AuthLayout";
import { useAuth } from "../hooks/useAuth";

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  return (
    <AuthLayout
      eyebrow="Task system / Registration"
      title="Create account"
      description="Set up a personal command surface for your tasks. Every record is user-scoped, secure, and built to keep your work separate from everyone else."
      footerText="Already have credentials?"
      footerActionLabel="Sign in"
      footerHref="/login"
    >
      <AuthForm
        mode="signup"
        onSubmit={async (values) => {
          await signup({
            name: values.name || "",
            email: values.email,
            password: values.password,
          });
          navigate("/dashboard");
        }}
      />
    </AuthLayout>
  );
}

