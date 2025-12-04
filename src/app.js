import { Navbar } from "./components/Navbar.js";
import { initApp } from "./init.js";

export default function App() {
  const appHTML = `
    ${Navbar()}

    <main id="page" class="p-4 max-w-3xl mx-auto"></main>
  `;

  // Wait for DOM to mount before wiring behavior
  setTimeout(() => {
    initApp();
  }, 0);

  return appHTML;
}
