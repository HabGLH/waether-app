import { fetchWeather } from "./services/weatherService.js";
import { initThemeToggle } from "./utils/theme.js";
import { Card } from "./components/Card.js";

export function initApp() {
  // Initialize theme toggle (if navbar provides the elements)
  initThemeToggle();

  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("cityInput");
  const weatherResult = document.getElementById("weatherResult");
  const hamburgerBtn = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!searchBtn || !cityInput || !weatherResult) return;
  // Wire mobile hamburger menu (if present)
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      // update aria-expanded: true when menu is visible
      const expanded = !mobileMenu.classList.contains("hidden");
      hamburgerBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
      // change accessible label
      hamburgerBtn.setAttribute(
        "aria-label",
        expanded ? "Close menu" : "Open menu"
      );
    });

    // close mobile menu when any link inside it is clicked
    mobileMenu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      mobileMenu.classList.add("hidden");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      hamburgerBtn.setAttribute("aria-label", "Open menu");
    });
  }
  // helper to load and render a city (updates lastCity on success)
  async function loadCity(city) {
    if (!city) return;
    weatherResult.innerHTML = '<div class="p-4">Loading...</div>';
    try {
      const data = await fetchWeather(city);
      weatherResult.innerHTML = Card(
        data.name,
        `${data.weather[0].description}, ${data.main.temp}°C`,
        data
      );
      // persist last successful city
      localStorage.setItem("lastCity", data.name);
      cityInput.value = data.name;
    } catch (err) {
      weatherResult.innerHTML = "";
      console.error(err);
      // show friendly inline error instead of alert when possible
      const msg = err.message || "Error fetching weather";
      weatherResult.innerHTML = `<div class="p-4 text-red-600">${msg}</div>`;
    }
  }

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) return;
    loadCity(city);
  });

  // On init: load lastCity or default to Addis Ababa
  const lastCity = localStorage.getItem("lastCity") || "Addis Ababa";
  cityInput.value = lastCity;
  // load it once on startup
  loadCity(lastCity);
}
