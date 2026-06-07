(function () {
  const storageKey = "kevin-site-theme";
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function preferredTheme() {
    return localStorage.getItem(storageKey) || (systemDark.matches ? "dark" : "light");
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (toggle) {
      toggle.textContent = theme === "dark" ? "Light" : "Dark";
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      );
    }
  }

  applyTheme(preferredTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem(storageKey, nextTheme);
      applyTheme(nextTheme);
    });
  }

  systemDark.addEventListener("change", function () {
    if (!localStorage.getItem(storageKey)) {
      applyTheme(systemDark.matches ? "dark" : "light");
    }
  });
})();
