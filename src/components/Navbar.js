export function Navbar() {
  const base = import.meta.env.BASE_URL || "/";
  const sun = `${base}icons/sun.svg`;
  // build navbar HTML using mobile-first approach by tailwindcss
  // navbar have in large screen the title on the left, 3 links(Home, About, Contact) in the center and a dark mode toggle to riht
  // in small screen the title on the center, a hamburger menu on the left and the dark mode toggle on the right
  // dark mode toggle is a button with an icon that changes based on the current theme (sun for light mode, moon for dark mode)
  // in light mode the background is white and the text ligh-blak gray, in dark mode the background is dark-gray and the text is light-gray
  return `
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
        <img id="themeIcon" src="${sun}" alt="Toggle Dark Mode" class="w-6 h-6">
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
  `;
}
