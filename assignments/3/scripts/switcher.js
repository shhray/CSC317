// Author: Shreya Rameshwar
// Major: Computer Science, Third Year
// GitHub: shhray
// Simple theme switcher for my portfolio page

document.addEventListener("DOMContentLoaded", () => {
  const themeButtons = document.querySelectorAll(".theme-button");
  const themeStylesheet = document.getElementById("css-theme");

  function setActiveTheme(themeName) {
    themeStylesheet.href = `styles/${themeName}.css`;

    themeButtons.forEach((btn) => {
      if (btn.dataset.theme === themeName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    localStorage.setItem("preferredTheme", themeName);
  }

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveTheme(btn.dataset.theme);
    });
  });

  const saved = localStorage.getItem("preferredTheme");
  if (saved) {
    setActiveTheme(saved);
  }
});
