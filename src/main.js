// main.js - Entry point
import "./styles.css"; // Tailwind CSS
import App from "./app.js";

const root = document.getElementById("app");
root.innerHTML = App();
