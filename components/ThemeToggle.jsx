
import React, { useState } from "react";

const ThemeToggle = ({ theme, setTheme, className = "" }) => {
  const isDark = theme === "dark";
  const [burst, setBurst] = useState(false);

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    setBurst(true);
    setTimeout(() => setBurst(false), 450);
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={toggle}
      title={isDark ? "Switch to Light" : "Switch to Dark"}
      className={[
        "btn btn-circle btn-ghost relative h-10 w-10 overflow-hidden group",
        "transition-colors duration-300",
        isDark ? "hover:bg-gray-800/30" : "hover:bg-[#425A8B]",
        className,
      ].join(" ")}
    >
      
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 rounded-full",
          "bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.25),transparent,transparent)]",
          "opacity-0 transition-opacity duration-500",
          isDark ? "opacity-40 animate-[spin_8s_linear_infinite]" : "opacity-0",
        ].join(" ")}
      />

      {burst && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full
                     bg-white/20 dark:bg-white/25 animate-[ping_0.45s_ease-out_forwards]"
          style={{ boxShadow: isDark ? "0 0 20px 6px rgba(255,255,255,0.1)" : "none" }}
        />
      )}


      <span
         className={[
    "absolute inset-0 grid place-items-center rounded-full",
    "transition-all duration-300",

    "border-2 border-white/20 group-hover:border-transparent",
    isDark ? "opacity-0 scale-75 rotate-90" : "opacity-100 scale-100 rotate-0",
  ].join(" ")}
      >
        <svg
          className={[
            "h-5 w-5  transition-colors duration-300 group-text-white text-yellow-500",
            "text-white", 
            "group-hover:text-yellow-500",
          ].join(" ")}
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
        >
          <circle cx="12" cy="12" r="4" />
          <rect x="11" y="1" width="2" height="3" rx="1" />
          <rect x="11" y="20" width="2" height="3" rx="1" />
          <rect x="20" y="11" width="3" height="2" rx="1" />
          <rect x="1" y="11" width="3" height="2" rx="1" />
          <rect x="16.24" y="3.76" width="2" height="3" rx="1" transform="rotate(45 17.24 5.26)" />
          <rect x="6.76" y="18.24" width="2" height="3" rx="1" transform="rotate(45 7.76 19.74)" />
          <rect x="18.24" y="16.24" width="3" height="2" rx="1" transform="rotate(45 19.74 17.24)" />
          <rect x="3.76" y="6.76" width="3" height="2" rx="1" transform="rotate(45 5.26 7.76)" />
        </svg>
      </span>


      <span
        className={[
          "absolute inset-0 grid place-items-center",
          "transition-all duration-300",
          isDark
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-75 -rotate-90",
        ].join(" ")}
      >
        <svg
          className={[
            "h-5 w-5 drop-shadow transition-colors duration-300",
            "text-slate-200",
            "group-hover:text-white",
          ].join(" ")}
          viewBox="0 0 24 24"
          fill="currentColor" 
          stroke="none"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
};

export default ThemeToggle;
