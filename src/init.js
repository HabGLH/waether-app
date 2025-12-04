import { fetchWeather } from "./services/weatherService.js";
import { initThemeToggle } from "./utils/theme.js";
import { Card } from "./components/Card.js";
import { About } from "./pages/About.js";
import { Contact } from "./pages/Contact.js";

export function initApp() {
  // Initialize theme toggle (if navbar provides the elements)
  initThemeToggle();
  const hamburgerBtn = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  // Wire mobile hamburger menu (if present)
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const expanded = !mobileMenu.classList.toggle("hidden");
      hamburgerBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
      hamburgerBtn.setAttribute(
        "aria-label",
        expanded ? "Close menu" : "Open menu"
      );
    });

    mobileMenu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      mobileMenu.classList.add("hidden");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      hamburgerBtn.setAttribute("aria-label", "Open menu");
    });
  }

  const page = document.getElementById("page");
  if (!page) return;

  // Home rendering and logic
  function renderHome() {
    page.innerHTML = `
      <div class="mb-6 flex gap-2">
        <input id="cityInput" type="text" placeholder="Enter city" class="flex-1 p-2 rounded-md border" />
        <button id="searchBtn" class="px-4 py-2 bg-blue-600 text-white rounded-md">Search</button>
      </div>
      <div id="weatherResult" class="flex justify-center"></div>
    `;

    const searchBtn = document.getElementById("searchBtn");
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");

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
        localStorage.setItem("lastCity", data.name);
        cityInput.value = data.name;
      } catch (err) {
        weatherResult.innerHTML = "";
        console.error(err);
        const msg = err.message || "Error fetching weather";
        weatherResult.innerHTML = `<div class="p-4 text-red-600">${msg}</div>`;
      }
    }

    searchBtn.addEventListener("click", () => {
      const city = cityInput.value.trim();
      if (!city) return;
      loadCity(city);
    });

    const lastCity = localStorage.getItem("lastCity") || "Addis Ababa";
    cityInput.value = lastCity;
    loadCity(lastCity);
  }

  function renderAbout() {
    page.innerHTML = About();
  }

  function renderContact() {
    page.innerHTML = Contact();
    // wire contact form simple client-side handler
    const form = document.getElementById("contactForm");
    const result = document.getElementById("contactResult");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName").value;
      const email = document.getElementById("contactEmail").value;
      const message = document.getElementById("contactMessage").value;
      result.innerHTML = `<div class="p-4 text-green-600">Thanks, ${
        name || "friend"
      }! We'll reach out at ${email}</div>`;
      form.reset();
    });
  }

  function route() {
    const hash = (location.hash || "#/").replace(/^#/, "");
    switch (hash) {
      case "/about":
        renderAbout();
        break;
      case "/contact":
        renderContact();
        break;
      default:
        renderHome();
        break;
    }
  }

  window.addEventListener("hashchange", route);
  // initial route
  route();
}
