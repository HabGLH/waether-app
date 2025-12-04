(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=e(t);fetch(t.href,n)}})();function g(){return`
    <nav class="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 p-4 flex items-center justify-between">
      <div class="flex items-center">
        <button id="hamburger" class="md:hidden mr-4" aria-controls="mobileMenu" aria-expanded="false" aria-label="Open menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <h1 class="text-xl font-bold">My Website</h1>
      </div>
      <ul class="hidden md:flex space-x-8">
        <li><a href="#/" class="hover:underline">Home</a></li>
        <li><a href="#/about" class="hover:underline">About</a></li>
        <li><a href="#/contact" class="hover:underline">Contact</a></li>
      </ul>
      <button id="themeToggle" class="ml-4" aria-label="Toggle theme">
        <img id="themeIcon" src="/waether-app/icons/sun.svg" alt="Toggle Dark Mode" class="w-6 h-6">
      </button>
    </nav>

    <!-- Mobile menu (hidden on md and up). Toggled by the hamburger button -->
    <div id="mobileMenu" class="md:hidden hidden bg-white dark:bg-gray-800 px-4 pb-4">
      <ul class="flex flex-col space-y-2">
        <li><a href="#/" class="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Home</a></li>
        <li><a href="#/about" class="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">About</a></li>
        <li><a href="#/contact" class="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Contact</a></li>
      </ul>
    </div>
  `}async function b(a){const e=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(a)}&appid=506f0ca5e2c8571d13c6175994611079&units=metric`,i=await fetch(e),t=await i.json();if(!i.ok){const n=new Error(t.message||"Failed to fetch weather");throw n.code=t.cod,n}return t}function f(a="themeToggle",s="themeIcon"){const e=document.getElementById(a),i=document.getElementById(s);function t(){if(!i)return;const o="/waether-app/";i.src=document.documentElement.classList.contains("dark")?`${o}icons/moon.svg`:`${o}icons/sun.svg`}const n=localStorage.getItem("theme");if(n==="dark")document.documentElement.classList.add("dark");else if(n==="light")document.documentElement.classList.remove("dark");else try{window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}catch{document.documentElement.classList.remove("dark")}t(),e&&e.addEventListener("click",()=>{document.documentElement.classList.toggle("dark"),localStorage.setItem("theme",document.documentElement.classList.contains("dark")?"dark":"light"),t()})}function y(a="",s="",e=null){const i=a?"":"hidden",t=e&&e.main?`${e.main.temp}°C`:s,n=e&&e.weather?e.weather[0].description:s,o=e&&e.main?`${e.main.humidity}%`:"",r=e&&e.wind?`${e.wind.speed} m/s`:"",l=e&&e.weather&&e.weather[0]&&e.weather[0].icon?`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`:"/waether-app/icons/sun.svg";return`
    <div id="weatherCard" class="${i} bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-center fade-in transition-colors duration-500">
      <h2 id="cityName" class="text-2xl font-bold mb-2">${a||""}</h2>
      <img id="weatherIcon" src="${l}" alt="Weather Icon" class="mx-auto w-24 h-24 mb-2">
      <p id="description" class="capitalize mb-2">${n||""}</p>
      <p id="temperature" class="text-3xl font-bold mb-2">${t||""}</p>
      <p id="humidity" class="mb-1">${o}</p>
      <p id="wind" class="mb-1">${r}</p>
    </div>
  `}function w(){return`
    <section class="prose dark:prose-invert mx-auto">
      <h2>About</h2>
      <p>This is a small weather app built with Vanilla JS and Vite. It shows current weather for a city using OpenWeatherMap.</p>
      <p>The app demonstrates simple client-side routing, a dark mode toggle, and fetching data from an API.</p>
    </section>
  `}function v(){return`
    <section class="mx-auto max-w-md">
      <h2 class="text-2xl font-bold mb-4">Contact</h2>
      <form id="contactForm" class="space-y-4">
        <div>
          <label class="block mb-1">Name</label>
          <input type="text" id="contactName" class="w-full p-2 border rounded" />
        </div>
        <div>
          <label class="block mb-1">Email</label>
          <input type="email" id="contactEmail" class="w-full p-2 border rounded" />
        </div>
        <div>
          <label class="block mb-1">Message</label>
          <textarea id="contactMessage" rows="4" class="w-full p-2 border rounded"></textarea>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </form>
      <div id="contactResult" class="mt-4"></div>
    </section>
  `}function x(){f();const a=document.getElementById("hamburger"),s=document.getElementById("mobileMenu");a&&s&&(a.addEventListener("click",()=>{const r=!s.classList.toggle("hidden");a.setAttribute("aria-expanded",r?"true":"false"),a.setAttribute("aria-label",r?"Close menu":"Open menu")}),s.addEventListener("click",r=>{r.target.closest("a")&&(s.classList.add("hidden"),a.setAttribute("aria-expanded","false"),a.setAttribute("aria-label","Open menu"))}));const e=document.getElementById("page");if(!e)return;function i(){e.innerHTML=`
      <div class="mb-6 flex gap-2">
        <input id="cityInput" type="text" placeholder="Enter city" class="flex-1 p-2 rounded-md border" />
        <button id="searchBtn" class="px-4 py-2 bg-blue-600 text-white rounded-md">Search</button>
      </div>
      <div id="weatherResult" class="flex justify-center"></div>
    `;const r=document.getElementById("searchBtn"),d=document.getElementById("cityInput"),l=document.getElementById("weatherResult");async function m(u){if(u){l.innerHTML='<div class="p-4">Loading...</div>';try{const c=await b(u);l.innerHTML=y(c.name,`${c.weather[0].description}, ${c.main.temp}°C`,c),localStorage.setItem("lastCity",c.name),d.value=c.name}catch(c){l.innerHTML="",console.error(c);const p=c.message||"Error fetching weather";l.innerHTML=`<div class="p-4 text-red-600">${p}</div>`}}}r.addEventListener("click",()=>{const u=d.value.trim();u&&m(u)});const h=localStorage.getItem("lastCity")||"Addis Ababa";d.value=h,m(h)}function t(){e.innerHTML=w()}function n(){e.innerHTML=v();const r=document.getElementById("contactForm"),d=document.getElementById("contactResult");r&&r.addEventListener("submit",l=>{l.preventDefault();const m=document.getElementById("contactName").value,h=document.getElementById("contactEmail").value;document.getElementById("contactMessage").value,d.innerHTML=`<div class="p-4 text-green-600">Thanks, ${m||"friend"}! We'll reach out at ${h}</div>`,r.reset()})}function o(){switch((location.hash||"#/").replace(/^#/,"")){case"/about":t();break;case"/contact":n();break;default:i();break}}window.addEventListener("hashchange",o),o()}function k(){const a=`
    ${g()}

    <main id="page" class="p-4 max-w-3xl mx-auto"></main>
  `;return setTimeout(()=>{x()},0),a}const E=document.getElementById("app");E.innerHTML=k();
