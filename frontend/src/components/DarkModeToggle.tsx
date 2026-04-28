import { useDarkMode } from "../hooks/useDarkMode";

export function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-paper text-xl shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? "🌞" : "🌓"}
    </button>
  );
}
