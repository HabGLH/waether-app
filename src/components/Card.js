export function Card(title = "", content = "", data = null) {
  // Show the card only when a title is provided
  const visibility = title ? "" : "hidden";

  // Try to extract details if full data is provided
  const temp = data && data.main ? `${data.main.temp}°C` : content;
  const description =
    data && data.weather ? data.weather[0].description : content;
  const humidity = data && data.main ? `${data.main.humidity}%` : "";
  const wind = data && data.wind ? `${data.wind.speed} m/s` : "";
  // If API data includes an icon code, use OpenWeather's icon set (no local assets required)
  const iconUrl =
    data && data.weather && data.weather[0] && data.weather[0].icon
      ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      : "/src/assets/icons/sun.svg";

  return `
    <div id="weatherCard" class="${visibility} bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-center fade-in transition-colors duration-500">
      <h2 id="cityName" class="text-2xl font-bold mb-2">${title || ""}</h2>
      <img id="weatherIcon" src="${iconUrl}" alt="Weather Icon" class="mx-auto w-24 h-24 mb-2">
      <p id="description" class="capitalize mb-2">${description || ""}</p>
      <p id="temperature" class="text-3xl font-bold mb-2">${temp || ""}</p>
      <p id="humidity" class="mb-1">${humidity}</p>
      <p id="wind" class="mb-1">${wind}</p>
    </div>
  `;
}
