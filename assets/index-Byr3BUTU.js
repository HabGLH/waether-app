(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=e(t);fetch(t.href,n)}})();function d(){return`
    <nav class="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 p-4 flex items-center justify-between">
      <div class="flex items-center">
        <button id="hamburger" class="md:hidden mr-4" aria-controls="mobileMenu" aria-expanded="false" aria-label="Open menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <h1 class="text-xl font-bold">My Website</h1>
      </div>
      <ul class="hidden md:flex space-x-8">
        <li><a href="#" class="hover:underline">Home</a></li>
        <li><a href="#" class="hover:underline">About</a></li>
        <li><a href="#" class="hover:underline">Contact</a></li>
      </ul>
      <button id="themeToggle" class="ml-4" aria-label="Toggle theme">
        <img id="themeIcon" src="/src/assets/icons/sun.svg" alt="Toggle Dark Mode" class="w-6 h-6">
      </button>
    </nav>

    <!-- Mobile menu (hidden on md and up). Toggled by the hamburger button -->
    <div id="mobileMenu" class="md:hidden hidden bg-white dark:bg-gray-800 px-4 pb-4">
      <ul class="flex flex-col space-y-2">
        <li><a href="#" class="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Home</a></li>
        <li><a href="#" class="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">About</a></li>
        <li><a href="#" class="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Contact</a></li>
      </ul>
    </div>
  `}async function m(i){const e=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(i)}&appid=506f0ca5e2c8571d13c6175994611079&units=metric`,s=await fetch(e),t=await s.json();if(!s.ok){const n=new Error(t.message||"Failed to fetch weather");throw n.code=t.cod,n}return t}function u(i="themeToggle",r="themeIcon"){const e=document.getElementById(i),s=document.getElementById(r);function t(){s&&(s.src=document.documentElement.classList.contains("dark")?"/src/assets/icons/moon.svg":"/src/assets/icons/sun.svg")}const n=localStorage.getItem("theme");if(n==="dark")document.documentElement.classList.add("dark");else if(n==="light")document.documentElement.classList.remove("dark");else try{window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}catch{document.documentElement.classList.remove("dark")}t(),e&&e.addEventListener("click",()=>{document.documentElement.classList.toggle("dark"),localStorage.setItem("theme",document.documentElement.classList.contains("dark")?"dark":"light"),t()})}function h(i="",r="",e=null){const s=i?"":"hidden",t=e&&e.main?`${e.main.temp}°C`:r,n=e&&e.weather?e.weather[0].description:r,c=e&&e.main?`${e.main.humidity}%`:"",o=e&&e.wind?`${e.wind.speed} m/s`:"",a=e&&e.weather&&e.weather[0]&&e.weather[0].icon?`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`:"/src/assets/icons/sun.svg";return`
    <div id="weatherCard" class="${s} bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-center fade-in transition-colors duration-500">
      <h2 id="cityName" class="text-2xl font-bold mb-2">${i||""}</h2>
      <img id="weatherIcon" src="${a}" alt="Weather Icon" class="mx-auto w-24 h-24 mb-2">
      <p id="description" class="capitalize mb-2">${n||""}</p>
      <p id="temperature" class="text-3xl font-bold mb-2">${t||""}</p>
      <p id="humidity" class="mb-1">${c}</p>
      <p id="wind" class="mb-1">${o}</p>
    </div>
  `}function g(){u();const i=document.getElementById("searchBtn"),r=document.getElementById("cityInput"),e=document.getElementById("weatherResult"),s=document.getElementById("hamburger"),t=document.getElementById("mobileMenu");if(!i||!r||!e)return;s&&t&&(s.addEventListener("click",()=>{t.classList.toggle("hidden");const o=!t.classList.contains("hidden");s.setAttribute("aria-expanded",o?"true":"false"),s.setAttribute("aria-label",o?"Close menu":"Open menu")}),t.addEventListener("click",o=>{o.target.closest("a")&&(t.classList.add("hidden"),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-label","Open menu"))}));async function n(o){if(o){e.innerHTML='<div class="p-4">Loading...</div>';try{const a=await m(o);e.innerHTML=h(a.name,`${a.weather[0].description}, ${a.main.temp}°C`,a),localStorage.setItem("lastCity",a.name),r.value=a.name}catch(a){e.innerHTML="",console.error(a);const l=a.message||"Error fetching weather";e.innerHTML=`<div class="p-4 text-red-600">${l}</div>`}}}i.addEventListener("click",()=>{const o=r.value.trim();o&&n(o)});const c=localStorage.getItem("lastCity")||"Addis Ababa";r.value=c,n(c)}function p(){const i=`
    ${d()}

    <main class="p-4 max-w-3xl mx-auto">
      <div class="mb-6 flex gap-2">
        <input id="cityInput" type="text" placeholder="Enter city" class="flex-1 p-2 rounded-md border" />
        <button id="searchBtn" class="px-4 py-2 bg-blue-600 text-white rounded-md">Search</button>
      </div>

      <div id="weatherResult" class="flex justify-center"></div>
    </main>
  `;return setTimeout(()=>{g()},0),i}const f=document.getElementById("app");f.innerHTML=p();
