// Theme utilities: initialize theme toggle and persist preference
export function initThemeToggle(
  toggleId = "themeToggle",
  iconId = "themeIcon"
) {
  const themeToggleBtn = document.getElementById(toggleId);
  const themeIcon = document.getElementById(iconId);

  function updateThemeIcon() {
    if (!themeIcon) return;
    const base = import.meta.env.BASE_URL || "/";
    themeIcon.src = document.documentElement.classList.contains("dark")
      ? `${base}icons/moon.svg`
      : `${base}icons/sun.svg`;
  }

  // Determine initial theme:
  // 1. If user has saved preference in localStorage, use it.
  // 2. Otherwise, fall back to system preference (prefers-color-scheme).
  // 3. Default to light if neither is set.
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.documentElement.classList.add("dark");
  } else if (saved === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    // no saved preference -> use system preference
    try {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } catch (e) {
      // if anything goes wrong, ensure light by default
      document.documentElement.classList.remove("dark");
    }
  }

  updateThemeIcon();

  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
    updateThemeIcon();
  });
}
