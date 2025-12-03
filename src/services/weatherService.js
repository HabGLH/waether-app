// Lightweight weather fetching service
export async function fetchWeather(city) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
  if (!apiKey) {
    throw new Error('Missing OpenWeatherMap API key. Set VITE_OPENWEATHER_KEY in an .env file');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.message || 'Failed to fetch weather');
    err.code = data.cod;
    throw err;
  }

  return data;
}
