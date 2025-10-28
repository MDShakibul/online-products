import React from "react";

const ThemeToggle = ({ theme, setTheme }) => {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-7 w-14 items-center rounded-full border px-1
                 bg-slate-900/10 dark:bg-white/10
                 border-slate-300/60 dark:border-slate-700/60
                 transition-colors focus:outline-none"
    >
      {/* Sun (light) */}
      <svg
        className={`absolute left-2 h-4 w-4 text-yellow-400 transition-opacity ${isDark ? "opacity-0" : "opacity-100"}`}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M22 12h-2M4 12H2m15.07-7.07-1.41 1.41M8.34 17.66l-1.41 1.41m0-12.72 1.41 1.41m9.32 9.32 1.41 1.41" />
      </svg>

      {/* Moon (dark) */}
      <svg
        className={`absolute right-2 h-4 w-4 text-slate-200 transition-opacity ${isDark ? "opacity-100" : "opacity-0"}`}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {/* Knob */}
      <span
        className={`absolute h-5 w-5 rounded-full bg-white dark:bg-slate-900 shadow
                    transform transition-transform ${isDark ? "translate-x-7" : "translate-x-0"}`}
      />
    </button>
  );
};

export default ThemeToggle;
