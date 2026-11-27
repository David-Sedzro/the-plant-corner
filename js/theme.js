(() => {
  const root = document.documentElement;
  const storageKey = "amas-plant-corner-theme";
  const systemColorScheme = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (error) {
    console.error("Unable to read the saved color theme.", error);
  }

  if (savedTheme === "light" || savedTheme === "dark") {
    root.dataset.theme = savedTheme;
  }

  root.classList.add("js");

  const getCurrentTheme = () =>
    root.dataset.theme ||
    (systemColorScheme && systemColorScheme.matches ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector("[data-theme-toggle]");

    if (!themeToggle) {
      return;
    }

    const updateToggle = () => {
      themeToggle.setAttribute(
        "aria-pressed",
        String(getCurrentTheme() === "dark"),
      );
    };

    themeToggle.addEventListener("click", () => {
      const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      updateToggle();

      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        console.error("Unable to save the selected color theme.", error);
      }
    });

    if (systemColorScheme) {
      const updateForSystemPreference = () => {
        if (!root.hasAttribute("data-theme")) {
          updateToggle();
        }
      };

      if (systemColorScheme.addEventListener) {
        systemColorScheme.addEventListener("change", updateForSystemPreference);
      } else if (systemColorScheme.addListener) {
        systemColorScheme.addListener(updateForSystemPreference);
      }
    }

    updateToggle();
  });
})();
