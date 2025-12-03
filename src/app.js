import { Navbar } from "./components/Navbar.js";
import { initApp } from "./init.js";

export default function App() {
  const appHTML = `
    ${Navbar()}

    <main class="p-4 max-w-3xl mx-auto">
      <div class="mb-6 flex gap-2">
        <input id="cityInput" type="text" placeholder="Enter city" class="flex-1 p-2 rounded-md border" />
        <button id="searchBtn" class="px-4 py-2 bg-blue-600 text-white rounded-md">Search</button>
      </div>

      <div id="weatherResult" class="flex justify-center"></div>
    </main>
  `;

  // Wait for DOM to mount before adding event listeners
  setTimeout(() => {
    initApp();
  }, 0);

  return appHTML;
}

// app behavior moved to `src/init.js`
