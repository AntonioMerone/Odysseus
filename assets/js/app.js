


// DATA
const CITIES = [
  { name:"Tokyo", country:"Giappone", flag:"🇯🇵", tz:"Asia/Tokyo", lat:35.6762, lon:139.6503 },
  { name:"New York", country:"USA", flag:"🇺🇸", tz:"America/New_York", lat:40.7128, lon:-74.0060 },
  { name:"Londra", country:"UK", flag:"🇬🇧", tz:"Europe/London", lat:51.5074, lon:-0.1278 },
  { name:"Parigi", country:"Francia", flag:"🇫🇷", tz:"Europe/Paris", lat:48.8566, lon:2.3522 },
  { name:"Dubai", country:"UAE", flag:"🇦🇪", tz:"Asia/Dubai", lat:25.2048, lon:55.2708 },
  { name:"Singapore", country:"Singapore", flag:"🇸🇬", tz:"Asia/Singapore", lat:1.3521, lon:103.8198 },
  { name:"Sydney", country:"Australia", flag:"🇦🇺", tz:"Australia/Sydney", lat:-33.8688, lon:151.2093 },
  { name:"Los Angeles", country:"USA", flag:"🇺🇸", tz:"America/Los_Angeles", lat:34.0522, lon:-118.2437 },
  { name:"Mumbai", country:"India", flag:"🇮🇳", tz:"Asia/Kolkata", lat:19.0760, lon:72.8777 },
  { name:"São Paulo", country:"Brasile", flag:"🇧🇷", tz:"America/Sao_Paulo", lat:-23.5505, lon:-46.6333 },
  { name:"Berlino", country:"Germania", flag:"🇩🇪", tz:"Europe/Berlin", lat:52.5200, lon:13.4050 },
  { name:"Toronto", country:"Canada", flag:"🇨🇦", tz:"America/Toronto", lat:43.6532, lon:-79.3832 },
  { name:"Seoul", country:"Corea del Sud", flag:"🇰🇷", tz:"Asia/Seoul", lat:37.5665, lon:126.9780 },
  { name:"Mosca", country:"Russia", flag:"🇷🇺", tz:"Europe/Moscow", lat:55.7558, lon:37.6173 },
  { name:"Cairo", country:"Egitto", flag:"🇪🇬", tz:"Africa/Cairo", lat:30.0444, lon:31.2357 },
  { name:"Lagos", country:"Nigeria", flag:"🇳🇬", tz:"Africa/Lagos", lat:6.5244, lon:3.3792 },
  { name:"Buenos Aires", country:"Argentina", flag:"🇦🇷", tz:"America/Argentina/Buenos_Aires", lat:-34.6037, lon:-58.3816 },
  { name:"Bangkok", country:"Tailandia", flag:"🇹🇭", tz:"Asia/Bangkok", lat:13.7563, lon:100.5018 },
  { name:"Città del Messico", country:"Messico", flag:"🇲🇽", tz:"America/Mexico_City", lat:19.4326, lon:-99.1332 },
  { name:"Amsterdam", country:"Olanda", flag:"🇳🇱", tz:"Europe/Amsterdam", lat:52.3676, lon:4.9041 },
  { name:"Stoccolma", country:"Svezia", flag:"🇸🇪", tz:"Europe/Stockholm", lat:59.3293, lon:18.0686 },
  { name:"Nairobi", country:"Kenya", flag:"🇰🇪", tz:"Africa/Nairobi", lat:-1.2921, lon:36.8219 },
  { name:"Chicago", country:"USA", flag:"🇺🇸", tz:"America/Chicago", lat:41.8781, lon:-87.6298 },
  { name:"Hong Kong", country:"Hong Kong", flag:"🇭🇰", tz:"Asia/Hong_Kong", lat:22.3193, lon:114.1694 },
  { name:"Zurigo", country:"Svizzera", flag:"🇨🇭", tz:"Europe/Zurich", lat:47.3769, lon:8.5417 },
  { name:"Madrid", country:"Spagna", flag:"🇪🇸", tz:"Europe/Madrid", lat:40.4168, lon:-3.7038 },
  { name:"Milano", country:"Italia", flag:"🇮🇹", tz:"Europe/Rome", lat:45.4654, lon:9.1859 },
  { name:"Shanghai", country:"Cina", flag:"🇨🇳", tz:"Asia/Shanghai", lat:31.2304, lon:121.4737 },
  { name:"Istanbul", country:"Turchia", flag:"🇹🇷", tz:"Europe/Istanbul", lat:41.0082, lon:28.9784 },
  { name:"Varsavia", country:"Polonia", flag:"🇵🇱", tz:"Europe/Warsaw", lat:52.2297, lon:21.0122 },
];

const DEFAULT_HOME = { name:"Roma", country:"Italia", flag:"🇮🇹", tz:"Europe/Rome", lat:41.9028, lon:12.4964 };

const WMO_MAP = {
  0:"☀️",1:"🌤️",2:"⛅",3:"☁️",
  45:"🌫️",48:"🌫️",
  51:"🌦️",53:"🌧️",55:"🌧️",
  61:"🌧️",63:"🌧️",65:"🌧️",
  71:"🌨️",73:"🌨️",75:"❄️",
  77:"🌨️",
  80:"🌦️",81:"🌧️",82:"⛈️",
  85:"🌨️",86:"❄️",
  95:"⛈️",96:"⛈️",99:"⛈️",
};
const WMO_DESC = {
  0:"Sereno",1:"Prevalentemente sereno",2:"Parzialmente nuvoloso",3:"Coperto",
  45:"Nebbia",48:"Nebbia gelata",
  51:"Pioggia leggera",53:"Pioggerella",55:"Pioggia intensa",
  61:"Pioggia",63:"Pioggia moderata",65:"Pioggia forte",
  71:"Neve leggera",73:"Neve",75:"Neve intensa",77:"Neve granulare",
  80:"Rovesci",81:"Rovesci moderati",82:"Rovesci forti",
  85:"Nevicate",86:"Nevicate forti",
  95:"Temporale",96:"Temporale con grandine",99:"Temporale forte",
};

const DEBUG_WEATHER = (() => {
  try { return localStorage.getItem("odysseus_debug_weather") === "true"; }
  catch { return false; }
})();

const WEATHER_CACHE_KEY = "odysseus_weather_cache";
const WEATHER_CACHE_MAX_AGE = 30 * 60 * 1000;

// STATE
let state = {
  homeCity: loadHomeCity(),
  homeSearchOpen: false,
  homeQuery: "",
  homeResults: [],
  homeSearchLoading: false,
  homeSearchError: "",
  query: "",
  results: [],
  searchLoading: false,
  searchError: "",
  cities: loadCities(),
  weather: {}, // key: cityName -> { temp, icon, desc }
  weatherUnavailable: {},
  homeWeather: null,
  homeWeatherUnavailable: false,
  showDelete: null,
};

let weatherCache = loadWeatherCache();
hydrateWeatherStateFromCache();

function loadCities() {
  try {
    const cities = JSON.parse(localStorage.getItem("wtp_cities") || "[]")
      .map(normalizeStoredCity)
      .filter(Boolean);
    localStorage.setItem("wtp_cities", JSON.stringify(cities));
    return cities;
  }
  catch { return []; }
}
function saveCities() {
  localStorage.setItem("wtp_cities", JSON.stringify(state.cities));
}
function loadHomeCity() {
  try {
    const savedCity = JSON.parse(localStorage.getItem("odysseus_home_city") || "null");
    const homeCity = normalizeStoredCity(savedCity) || DEFAULT_HOME;
    localStorage.setItem("odysseus_home_city", JSON.stringify(homeCity));
    return homeCity;
  }
  catch { return DEFAULT_HOME; }
}
function saveHomeCity() {
  localStorage.setItem("odysseus_home_city", JSON.stringify(state.homeCity));
}

function normalizeStoredCity(city) {
  if (!city || typeof city !== "object" || !city.name) return null;

  const lat = toFiniteNumber(city.lat ?? city.latitude);
  const lon = toFiniteNumber(city.lon ?? city.longitude);

  return {
    ...city,
    flag: city.flag || countryCodeToFlag(city.country_code),
    tz: city.tz || city.timezone || "UTC",
    ...(lat !== null ? { lat, latitude: lat } : {}),
    ...(lon !== null ? { lon, longitude: lon } : {}),
  };
}

function toFiniteNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function loadWeatherCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY) || "{}");
    return cached && typeof cached === "object" && !Array.isArray(cached) ? cached : {};
  } catch {
    return {};
  }
}

function saveWeatherCache() {
  try {
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weatherCache));
  } catch {}
}

function getWeatherCacheKey(city) {
  const lat = toFiniteNumber(city.lat ?? city.latitude);
  const lon = toFiniteNumber(city.lon ?? city.longitude);

  if (lat !== null && lon !== null) {
    return `coords:${lat.toFixed(4)},${lon.toFixed(4)}`;
  }

  return `city:${String(city.name || "").toLowerCase()}|${String(city.country || "").toLowerCase()}`;
}

function getCachedWeather(city) {
  const cached = weatherCache[getWeatherCacheKey(city)];
  if (!cached) return null;

  const temp = Number(cached.temp);
  const code = Number(cached.code);
  const timestamp = Number(cached.timestamp);

  if (!Number.isFinite(temp) || !Number.isFinite(code) || !Number.isFinite(timestamp)) {
    return null;
  }

  return {
    temp,
    code,
    desc: cached.desc || WMO_DESC[code] || "N/D",
    icon: cached.icon || WMO_MAP[code] || "🌡️",
    timestamp,
  };
}

function cacheWeather(city, weather) {
  const cachedWeather = {
    temp: weather.temp,
    code: weather.code,
    desc: weather.desc,
    icon: weather.icon,
    timestamp: Date.now(),
  };

  weatherCache[getWeatherCacheKey(city)] = cachedWeather;
  saveWeatherCache();
  return cachedWeather;
}

function isWeatherCacheFresh(weather) {
  return Boolean(weather && Date.now() - weather.timestamp < WEATHER_CACHE_MAX_AGE);
}

function hydrateWeatherStateFromCache() {
  const homeWeather = getCachedWeather(state.homeCity);
  if (homeWeather) {
    state.homeWeather = homeWeather;
    weatherDebug("Cached home weather", {
      city: state.homeCity.name,
      fresh: isWeatherCacheFresh(homeWeather),
    });
  }

  state.cities.forEach(city => {
    const weather = getCachedWeather(city);
    if (!weather) return;

    state.weather[city.name] = weather;
    weatherDebug("Cached city weather", {
      city: city.name,
      fresh: isWeatherCacheFresh(weather),
    });
  });
}

// TIME HELPERS
function getLocalTime(tz) {
  return new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
}
function formatTime(date) {
  return date.toLocaleTimeString("it-IT", { hour:"2-digit", minute:"2-digit", hour12:false });
}
function formatDate(date) {
  return date.toLocaleDateString("it-IT", { weekday:"short", day:"numeric", month:"short" });
}
function getDiff(tz) {
  const homeCity = state.homeCity;
  const home = getLocalTime(homeCity.tz);
  const there = getLocalTime(tz);
  const diffHours = (there - home) / 3600000;
  const rounded = Math.round(diffHours * 2) / 2;
  if (rounded === 0) return "stessa ora";

  const sign = rounded > 0 ? "+" : "";
  const abs = Math.abs(rounded);
  const hours = Math.floor(abs);
  const minutes = (abs % 1) === 0.5 ? "30" : null;
  let label = `${sign}${hours}`;

  if (minutes) label += `h${minutes}`;
  else label += "h";

  return `${label} rispetto a ${homeCity.name}`;
}

function getStatus(tz) {
  const t = getLocalTime(tz);
  const hour = t.getHours() + t.getMinutes() / 60;

  if (hour >= 5 && hour < 7) {
    return { label:"Mattina presto", cls:"status-early" };
  }

  if (hour >= 7 && hour < 9) {
    return { label:"Inizio giornata", cls:"status-early" };
  }

  if ((hour >= 9 && hour < 13) || (hour >= 14 && hour < 18)) {
    return { label:"Orario lavorativo", cls:"status-work" };
  }

  if (hour >= 13 && hour < 14) {
    return { label:"Pausa pranzo", cls:"status-break" };
  }

  if (hour >= 18 && hour < 21) {
    return { label:"Sera", cls:"status-evening" };
  }

  return { label:"Notte", cls:"status-night" };
}

function getDayPercent(tz) {
  const t = getLocalTime(tz);
  return ((t.getHours() * 60 + t.getMinutes()) / 1440) * 100;
}

function getTimelineColor(tz) {
  const t = getLocalTime(tz);
  const hour = t.getHours();
  if (hour >= 6 && hour < 9) return "#f6ad55";
  if (hour >= 9 && hour < 18) return "#4fd1c5";
  if (hour >= 18 && hour < 21) return "#f6e05e";
  return "#2d3561";
}

// WEATHER HELPERS
function weatherDebug(label, value) {
  if (DEBUG_WEATHER) console.log(`[Weather] ${label}`, value);
}

async function fetchWeather(city) {
  try {
    const lat = toFiniteNumber(city.lat ?? city.latitude);
    const lon = toFiniteNumber(city.lon ?? city.longitude);

    weatherDebug("City input", {
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      latitude: city.latitude,
      longitude: city.longitude,
      tz: city.tz,
      timezone: city.timezone,
    });

    if (lat === null || lon === null) {
      weatherDebug("Invalid coordinates", { name: city.name, lat, lon });
      return null;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto&forecast_days=1`;
    weatherDebug("Request URL", url);

    const response = await fetch(url);
    weatherDebug("Response status", response.status);

    const data = await response.json();
    weatherDebug("Response JSON", data);

    if (!response.ok) {
      weatherDebug("Request failed", { status: response.status, data });
      return null;
    }

    const current = data.current || data.current_weather;
    if (!current) {
      weatherDebug(`Missing current weather data for ${city.name}`, data);
      return null;
    }

    const temperature = current?.temperature_2m ?? current?.temperature;
    const weatherCode = current?.weather_code ?? current?.weathercode;
    const temp = Number(temperature);
    const code = Number(weatherCode);

    if (!Number.isFinite(temp) || !Number.isFinite(code)) {
      weatherDebug("Invalid current weather values", { temperature, weatherCode });
      return null;
    }

    return {
      temp: Math.round(temp),
      code,
      icon: WMO_MAP[code] || "🌡️",
      desc: WMO_DESC[code] || "N/D",
    };
  } catch (error) {
    weatherDebug("Fetch error", error);
    return null;
  }
}

async function loadAllWeather() {
  const cachedHomeWeather = state.homeWeather || getCachedWeather(state.homeCity);
  state.homeWeather = cachedHomeWeather;
  state.homeWeatherUnavailable = false;
  render();

  const homeWeather = await fetchWeather(state.homeCity);
  if (homeWeather) {
    state.homeWeather = cacheWeather(state.homeCity, homeWeather);
    state.homeWeatherUnavailable = false;
  } else if (!cachedHomeWeather) {
    state.homeWeather = null;
    state.homeWeatherUnavailable = true;
  }
  weatherDebug("Home state", {
    city: state.homeCity.name,
    weather: state.homeWeather,
    unavailable: state.homeWeatherUnavailable,
  });
  render();

  for (const city of state.cities) {
    const cachedWeather = state.weather[city.name] || getCachedWeather(city);
    if (cachedWeather) state.weather[city.name] = cachedWeather;
    delete state.weatherUnavailable[city.name];
    render();

    const cityData = hasCoordinates(city) ? city : findCityByName(city.name) || city;
    const weather = await fetchWeather(cityData);
    if (weather) {
      state.weather[city.name] = cacheWeather(city, weather);
      delete state.weatherUnavailable[city.name];
    } else if (!cachedWeather) {
      delete state.weather[city.name];
      state.weatherUnavailable[city.name] = true;
    }
    weatherDebug("City state", {
      city: city.name,
      weather: state.weather[city.name],
      unavailable: state.weatherUnavailable[city.name] || false,
    });
    render();
  }
}

// SEARCH
let searchTimer;
let homeSearchTimer;
let isOutsideClickBound = false;
let isEscapeKeyBound = false;
let isMainSearchDismissed = false;

const MAIN_SEARCH_CONFIG = {
  queryKey: "query",
  resultsKey: "results",
  loadingKey: "searchLoading",
  errorKey: "searchError",
  inputId: "search-input",
  render: renderSearchResults,
};

const HOME_SEARCH_CONFIG = {
  queryKey: "homeQuery",
  resultsKey: "homeResults",
  loadingKey: "homeSearchLoading",
  errorKey: "homeSearchError",
  inputId: "home-search-input",
  render: renderHomeSearchResults,
};

function findCityByName(name) {
  return CITIES.find(city => city.name === name);
}

function hasCoordinates(city) {
  const lat = toFiniteNumber(city.lat ?? city.latitude);
  const lon = toFiniteNumber(city.lon ?? city.longitude);
  return lat !== null && lon !== null;
}

function countryCodeToFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2) return "🌍";
  return countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function foldText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[øØ]/g, "o")
    .replace(/[æÆ]/g, "ae")
    .replace(/[åÅ]/g, "a");
}

function normalizeGeocodingCity(city, query) {
  const lat = city.latitude;
  const lon = city.longitude;
  const queryText = foldText(query);
  const nameText = foldText(city.name);
  const admin2Text = foldText(city.admin2);
  const name = city.admin2 && !nameText.includes(queryText) && admin2Text.includes(queryText)
    ? city.admin2
    : city.name;

  return {
    name,
    country: city.country || city.country_code || "N/D",
    country_code: city.country_code || "",
    flag: countryCodeToFlag(city.country_code),
    tz: city.timezone || "UTC",
    lat,
    lon,
    latitude: lat,
    longitude: lon,
    admin1: city.admin1 || "",
  };
}

function getCityLabel(city) {
  return [city.admin1, city.country].filter(Boolean).join(", ");
}

function getCityKey(city) {
  return [city.name, city.country_code || city.country, city.admin1 || "", city.tz].join("|");
}

function mergeSearchResults(localResults, apiResults) {
  const seen = new Set();

  return [...localResults, ...apiResults].filter(city => {
    const key = getCityKey(city);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 10);
}

async function fetchGeocodingResults(query) {
  if (!navigator.onLine) throw new Error("Offline");

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=it&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Geocoding request failed");

  const data = await response.json();
  return (data.results || []).map(city => normalizeGeocodingCity(city, query));
}

function handleSearch(value) {
  searchTimer = runCitySearch(value, MAIN_SEARCH_CONFIG, searchTimer);
}

function findLocalCityMatches(normalizedQuery) {
  return CITIES.filter(city =>
    city.name.toLowerCase().includes(normalizedQuery) || city.country.toLowerCase().includes(normalizedQuery)
  ).slice(0, 6);
}

function handleHomeSearch(value) {
  homeSearchTimer = runCitySearch(value, HOME_SEARCH_CONFIG, homeSearchTimer);
}

function runCitySearch(value, config, timer) {
  clearTimeout(timer);
  if (config === MAIN_SEARCH_CONFIG) isMainSearchDismissed = false;

  const query = value.trim();
  state[config.queryKey] = value;
  state[config.resultsKey] = query
    ? findLocalCityMatches(query.toLowerCase())
    : [];
  state[config.loadingKey] = query.length >= 3;
  state[config.errorKey] = "";
  config.render();

  if (query.length < 3) return null;

  return setTimeout(() => updateCitySearchResults(query, config), 180);
}

async function updateCitySearchResults(value, config) {
  const searchInput = document.getElementById(config.inputId);
  const currentValue = (searchInput?.value ?? value).trim();

  state[config.queryKey] = currentValue;
  if (currentValue.length < 3) return;

  try {
    const localResults = findLocalCityMatches(currentValue.toLowerCase());
    const apiResults = await fetchGeocodingResults(currentValue);

    if (config === MAIN_SEARCH_CONFIG && isMainSearchDismissed) return;
    if (state[config.queryKey].trim() !== currentValue) return;

    state[config.resultsKey] = mergeSearchResults(localResults, apiResults);
    state[config.errorKey] = "";
  } catch {
    if (state[config.queryKey].trim() !== currentValue) return;
    state[config.errorKey] = navigator.onLine
      ? "Errore durante la ricerca"
      : "Ricerca non disponibile offline";
  } finally {
    if (
      state[config.queryKey].trim() === currentValue &&
      !(config === MAIN_SEARCH_CONFIG && isMainSearchDismissed)
    ) {
      state[config.loadingKey] = false;
      config.render();
    }
  }
}

function resetCitySearch(config) {
  state[config.queryKey] = "";
  state[config.resultsKey] = [];
  state[config.loadingKey] = false;
  state[config.errorKey] = "";
}

function setHomeCity(city) {
  clearTimeout(homeSearchTimer);
  homeSearchTimer = null;
  state.homeCity = city;
  state.homeSearchOpen = false;
  resetCitySearch(HOME_SEARCH_CONFIG);
  const cachedWeather = getCachedWeather(city);
  state.homeWeather = cachedWeather;
  state.homeWeatherUnavailable = false;
  saveHomeCity();
  render();

  fetchWeather(city).then(weather => {
    if (weather) {
      state.homeWeather = cacheWeather(city, weather);
      state.homeWeatherUnavailable = false;
    } else if (!cachedWeather) {
      state.homeWeatherUnavailable = true;
    }
    weatherDebug("Home state after change", {
      city: city.name,
      weather: state.homeWeather,
      unavailable: state.homeWeatherUnavailable,
    });
    render();
  });
}

function addCity(city) {
  if (state.cities.find(c => c.name === city.name)) {
    showToast("Città già aggiunta");
    return;
  }
  clearTimeout(searchTimer);
  searchTimer = null;
  state.cities.push(city);
  saveCities();
  resetCitySearch(MAIN_SEARCH_CONFIG);
  const cachedWeather = getCachedWeather(city);
  if (cachedWeather) {
    state.weather[city.name] = cachedWeather;
    delete state.weatherUnavailable[city.name];
  }

  fetchWeather(city).then(w => {
    if (w) {
      state.weather[city.name] = cacheWeather(city, w);
      delete state.weatherUnavailable[city.name];
    } else if (!cachedWeather) {
      state.weatherUnavailable[city.name] = true;
    }
    weatherDebug("City state after add", {
      city: city.name,
      weather: state.weather[city.name],
      unavailable: state.weatherUnavailable[city.name] || false,
    });
    render();
  });
  showToast(`${city.flag} ${city.name} aggiunta`);
  render();
}

function removeCity(name) {
  state.cities = state.cities.filter(c => c.name !== name);
  delete state.weather[name];
  state.showDelete = null;
  saveCities();
  render();
}

function moveCity(name, direction) {
  const index = state.cities.findIndex(city => city.name === name);
  const targetIndex = index + direction;

  if (index < 0 || targetIndex < 0 || targetIndex >= state.cities.length) return;

  const [city] = state.cities.splice(index, 1);
  state.cities.splice(targetIndex, 0, city);
  state.showDelete = null;
  saveCities();
  render();
}

function moveCityUp(name) {
  moveCity(name, -1);
}

function moveCityDown(name) {
  moveCity(name, 1);
}

// TOAST
let toastTimer;
function showToast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2500);
}

// RENDERING
function render() {
  const app = document.getElementById("app");
  const activeInput = document.activeElement;
  const activeInputId = activeInput?.matches?.("#search-input, #home-search-input")
    ? activeInput.id
    : null;
  const cursorPosition = activeInputId ? activeInput.selectionStart : null;

  app.innerHTML = buildHTML();
  attachEvents();

  if (activeInputId) {
    const nextInput = document.getElementById(activeInputId);
    nextInput?.focus({ preventScroll: true });
    if (cursorPosition !== null) nextInput?.setSelectionRange(cursorPosition, cursorPosition);
  }
}

function buildHTML() {
  return `
  ${buildHeader()}
  ${buildMainContent()}
  ${buildToast()}
  `;
}

function buildHeader() {
  const homeCity = state.homeCity;
  const homeTime = getLocalTime(homeCity.tz);

  return `
  <div class="header">
    <div class="header-top">
      <div class="app-brand">
        <img class="app-logo" src="./assets/brand/odysseus-emblem.png" alt="" width="24" height="24">
        <span class="app-title">Odysseus</span>
      </div>
      <span class="local-time-mini">${formatTime(homeTime)}</span>
    </div>
    <div class="search-wrap" id="search-wrap">
      <span class="search-icon">🔍</span>
      <input
        class="search-input"
        type="text"
        placeholder="Cerca una città..."
        value="${escHtml(state.query)}"
        id="search-input"
        aria-label="Cerca una città"
        autocomplete="off"
        autocorrect="off"
      />
      ${buildSearchDropdown()}
    </div>
  </div>`;
}

function buildMainContent() {
  return `
  <div class="main">
    <!-- HOME CARD -->
    ${buildHomeCard()}

    <!-- CITIES -->
    ${buildCitiesSection()}
  </div>`;
}

function buildHomeCard() {
  const homeCity = state.homeCity;
  const homeTime = getLocalTime(homeCity.tz);

  return `
    <div class="home-clock-card">
      <div class="home-city-row">
        <span class="home-flag">${homeCity.flag}</span>
        <span class="home-city-name">${homeCity.name} — La tua posizione</span>
        <button class="home-change-btn" id="home-change-btn" aria-label="Cambia città di casa">Cambia</button>
      </div>
      <div class="home-clock-time" id="home-clock">${formatTime(homeTime)}</div>
      <div class="home-date">${formatDate(homeTime)}</div>
      ${buildHomeSearch()}
      <div class="home-weather-row">
        ${state.homeWeather ? `
          <span class="weather-icon-large">${state.homeWeather.icon}</span>
          <span class="home-temp">${state.homeWeather.temp}°C</span>
          <span class="home-weather-desc">${state.homeWeather.desc}</span>
        ` : state.homeWeatherUnavailable
          ? `<span class="city-weather-loading">Meteo non disponibile</span>`
          : `<span class="city-weather-loading">⏳ Caricamento meteo...</span>`}
      </div>
    </div>`;
}

function buildHomeSearch() {
  if (!state.homeSearchOpen) return "";

  return `
      <div class="home-search-wrap" id="home-search-wrap">
        <input
          class="search-input home-search-input"
          type="text"
          placeholder="Cerca la tua città..."
          value="${escHtml(state.homeQuery)}"
          id="home-search-input"
          aria-label="Cerca la città di casa"
          autocomplete="off"
          autocorrect="off"
        />
        ${buildHomeSearchDropdown()}
      </div>
      `;
}

function buildCitiesSection() {
  if (state.cities.length === 0) return buildEmptyState();

  return `
    <div class="section-label">Le tue città · ${state.cities.length}</div>
    ${state.cities.map((c, index) => buildCityCard(c, index)).join("")}
    `;
}

function buildEmptyState() {
  return `
    <div class="section-label">Le tue città</div>
    <div class="empty-state">
      <div class="empty-icon">🌍</div>
      <div class="empty-title">Nessuna città aggiunta</div>
      <div class="empty-sub">Cerca una città in alto e aggiungila alla tua lista per tenere d'occhio i fusi orari.</div>
    </div>
    `;
}

function buildToast() {
  return `<div class="toast" id="toast"></div>`;
}

function buildSearchDropdown() {
  if (isMainSearchDismissed) return "";

  return buildCitySearchDropdown({
    id: "search-dropdown",
    className: "search-dropdown",
    query: state.query,
    results: state.results,
    loading: state.searchLoading,
    error: state.searchError,
    itemAttributes: (city, index) => `data-add="${escHtml(city.name)}" data-add-index="${index}"`,
  });
}

function buildHomeSearchDropdown() {
  return buildCitySearchDropdown({
    id: "home-search-dropdown",
    className: "search-dropdown home-search-dropdown",
    query: state.homeQuery,
    results: state.homeResults,
    loading: state.homeSearchLoading,
    error: state.homeSearchError,
    itemAttributes: (city, index) => `data-set-home-index="${index}"`,
  });
}

function buildCitySearchDropdown({ id, className, query, results, loading, error, itemAttributes }) {
  const showEmptyState = query.trim().length >= 3 && !loading && !error && results.length === 0;

  if (results.length === 0 && !loading && !error && !showEmptyState) return "";

  return `
      <div class="${className}" id="${id}">
        ${results.map((city, index) => `
          <div class="search-item" ${itemAttributes(city, index)}>
            <span>
              <span class="search-item-name">${city.flag} ${escHtml(city.name)}</span>
              <span style="color:var(--text-faint);margin-left:4px;font-size:12px">${escHtml(getCityLabel(city))}</span>
            </span>
            <span class="search-item-tz">${formatTime(getLocalTime(city.tz))}</span>
          </div>
        `).join("")}
        ${loading ? `
          <div class="search-item search-message">
            <span class="city-weather-loading">Caricamento...</span>
          </div>
        ` : ""}
        ${error ? `
          <div class="search-item search-message">
            <span class="city-weather-loading">${escHtml(error)}</span>
          </div>
        ` : ""}
        ${showEmptyState ? `
          <div class="search-item search-message">
            <span class="city-weather-loading">Nessun risultato</span>
          </div>
        ` : ""}
      </div>`;
}

function renderSearchResults() {
  const searchWrap = document.getElementById("search-wrap");
  const searchInput = document.getElementById("search-input");
  const keepFocus = document.activeElement === searchInput;

  if (!searchWrap) return;

  document.getElementById("search-dropdown")?.remove();

  if (
    state.results.length > 0 ||
    state.searchLoading ||
    state.searchError ||
    (state.query.trim().length >= 3 && state.results.length === 0)
  ) {
    searchWrap.insertAdjacentHTML("beforeend", buildSearchDropdown());
  }

  attachSearchResultEvents();

  if (keepFocus) {
    searchInput.focus({ preventScroll: true });
  }
}

function renderHomeSearchResults() {
  const homeWrap = document.getElementById("home-search-wrap");
  const homeInput = document.getElementById("home-search-input");
  const keepFocus = document.activeElement === homeInput;

  if (!homeWrap) return;

  document.getElementById("home-search-dropdown")?.remove();

  if (
    state.homeResults.length > 0 ||
    state.homeSearchLoading ||
    state.homeSearchError ||
    (state.homeQuery.trim().length >= 3 && state.homeResults.length === 0)
  ) {
    homeWrap.insertAdjacentHTML("beforeend", buildHomeSearchDropdown());
  }

  attachHomeSearchResultEvents();

  if (keepFocus) {
    homeInput.focus({ preventScroll: true });
  }
}

function buildCityCard(c, index) {
  const t = getLocalTime(c.tz);
  const pct = getDayPercent(c.tz);
  const color = getTimelineColor(c.tz);
  const diff = getDiff(c.tz);
  const status = getStatus(c.tz);
  const weather = state.weather[c.name];
  const weatherUnavailable = state.weatherUnavailable[c.name];
  const showActions = state.showDelete === c.name;
  const isFirst = index === 0;
  const isLast = index === state.cities.length - 1;

  return `
  <div class="city-card ${showActions ? "show-actions" : ""}" data-city="${escHtml(c.name)}" id="card-${escHtml(c.name).replace(/\s/g,'_')}">
    <div class="city-card-top">
      <div class="city-card-left">
        <div class="city-card-name-row">
          <span class="city-flag">${c.flag}</span>
          <span class="city-name">${escHtml(c.name)}</span>
        </div>
        <div class="city-country">${escHtml(c.country)} · ${escHtml(diff)}</div>
      </div>
      <div class="city-card-right">
        <div class="city-time-wrap">
          <div class="city-time">${formatTime(t)}</div>
          <div class="city-diff">${formatDate(t)}</div>
        </div>
      </div>
    </div>
    <div class="timeline-bar">
      <div class="timeline-fill" style="width:${pct}%;background:${color}"></div>
      <div class="timeline-dot" style="left:${pct}%;background:${color}"></div>
    </div>
    <div class="city-bottom">
      <div class="status-badge ${status.cls}">
        <div class="status-dot"></div>
        ${escHtml(status.label)}
      </div>
      <div class="city-weather-mini">
        ${weather
          ? `<span class="city-weather-icon">${weather.icon}</span><span class="city-weather-temp">${weather.temp}°C</span>`
          : weatherUnavailable
            ? `<span class="city-weather-loading">Meteo non disponibile</span>`
          : `<span class="city-weather-loading">Caricamento...</span>`
        }
      </div>
    </div>
    <div class="city-actions">
      ${!isFirst ? `
      <button class="city-action-btn" data-move-up="${escHtml(c.name)}" title="Sposta su" aria-label="Sposta ${escHtml(c.name)} su">
        <span aria-hidden="true">↑</span> Sposta su
      </button>` : ""}
      ${!isLast ? `
      <button class="city-action-btn" data-move-down="${escHtml(c.name)}" title="Sposta giù" aria-label="Sposta ${escHtml(c.name)} giù">
        <span aria-hidden="true">↓</span> Sposta giù
      </button>` : ""}
      <button class="city-action-btn city-action-remove" data-remove="${escHtml(c.name)}" title="Rimuovi" aria-label="Rimuovi ${escHtml(c.name)}">
        <span aria-hidden="true">✕</span> Rimuovi
      </button>
    </div>
  </div>`;
}

function escHtml(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}

// EVENTS
function attachEvents() {
  const homeChangeButton = document.getElementById("home-change-btn");
  if (homeChangeButton) {
    homeChangeButton.addEventListener("click", () => {
      clearTimeout(homeSearchTimer);
      homeSearchTimer = null;
      state.homeSearchOpen = !state.homeSearchOpen;
      resetCitySearch(HOME_SEARCH_CONFIG);
      render();
    });
  }

  const homeSearchInput = document.getElementById("home-search-input");
  if (homeSearchInput) {
    homeSearchInput.addEventListener("input", e => handleHomeSearch(e.target.value));
    homeSearchInput.addEventListener("focus", () => {
      if (homeSearchInput.value) handleHomeSearch(homeSearchInput.value);
    });
    homeSearchInput.focus({ preventScroll: true });
  }

  attachHomeSearchResultEvents();

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", e => handleSearch(e.target.value));
    searchInput.addEventListener("focus", () => {
      if (searchInput.value) handleSearch(searchInput.value);
    });
  }

  attachSearchResultEvents();

  document.querySelectorAll("[data-remove]").forEach(el => {
    el.addEventListener("click", e => {
      e.stopPropagation();
      removeCity(el.dataset.remove);
    });
  });

  document.querySelectorAll("[data-move-up]").forEach(el => {
    el.addEventListener("click", e => {
      e.stopPropagation();
      moveCityUp(el.dataset.moveUp);
    });
  });

  document.querySelectorAll("[data-move-down]").forEach(el => {
    el.addEventListener("click", e => {
      e.stopPropagation();
      moveCityDown(el.dataset.moveDown);
    });
  });

  document.querySelectorAll(".city-card").forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.closest("[data-remove], [data-move-up], [data-move-down]")) return;
      const name = card.dataset.city;
      state.showDelete = state.showDelete === name ? null : name;
      render();
    });
  });

  attachOutsideSearchListener();
  attachEscapeKeyListener();
}

function attachSearchResultEvents() {
  document.querySelectorAll("[data-add]").forEach(el => {
    el.addEventListener("click", () => {
      const index = Number(el.dataset.addIndex);
      const city = state.results[index] || findCityByName(el.dataset.add);
      if (city) addCity(city);
    });
  });
}

function attachHomeSearchResultEvents() {
  document.querySelectorAll("[data-set-home-index]").forEach(el => {
    el.addEventListener("click", () => {
      const city = state.homeResults[Number(el.dataset.setHomeIndex)];
      if (city) setHomeCity(city);
    });
  });
}

function attachOutsideSearchListener() {
  if (isOutsideClickBound) return;

  document.addEventListener("click", e => {
    if (e.target.closest("#search-wrap")) return;

    state.results = [];
    state.query = document.getElementById("search-input")?.value || state.query;
    renderSearchResults();
  });

  isOutsideClickBound = true;
}

function attachEscapeKeyListener() {
  if (isEscapeKeyBound) return;

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    let handled = false;
    const activeElement = document.activeElement;
    const homeSearchWrap = document.getElementById("home-search-wrap");
    const openCityCard = document.querySelector(".city-card.show-actions");

    if (document.getElementById("search-dropdown")) {
      clearTimeout(searchTimer);
      searchTimer = null;
      isMainSearchDismissed = true;
      state.results = [];
      state.searchLoading = false;
      state.searchError = "";
      document.getElementById("search-dropdown")?.remove();
      handled = true;
    }

    if (state.homeSearchOpen) {
      clearTimeout(homeSearchTimer);
      homeSearchTimer = null;
      state.homeSearchOpen = false;
      resetCitySearch(HOME_SEARCH_CONFIG);
      homeSearchWrap?.remove();
      if (homeSearchWrap?.contains(activeElement)) {
        document.getElementById("home-change-btn")?.focus({ preventScroll: true });
      }
      handled = true;
    }

    if (openCityCard) {
      const focusWasInActions = openCityCard.querySelector(".city-actions")?.contains(activeElement);
      state.showDelete = null;
      openCityCard.classList.remove("show-actions");
      if (focusWasInActions) {
        openCityCard.setAttribute("tabindex", "-1");
        openCityCard.focus({ preventScroll: true });
      }
      handled = true;
    }

    if (handled) event.preventDefault();
  });

  isEscapeKeyBound = true;
}

// TICK
function tick() {
  const clock = document.getElementById("home-clock");
  if (clock) {
    clock.textContent = formatTime(getLocalTime(state.homeCity.tz));
  }

  state.cities.forEach(city => {
    const t = getLocalTime(city.tz);
    const key = city.name.replace(/\s/g,'_');
    const card = document.getElementById(`card-${key}`);
    if (!card) return;

    const timeEl = card.querySelector(".city-time");
    if (timeEl) timeEl.textContent = formatTime(t);

    const pct = getDayPercent(city.tz);
    const color = getTimelineColor(city.tz);
    const fill = card.querySelector(".timeline-fill");
    const dot = card.querySelector(".timeline-dot");
    if (fill) fill.style.width = pct + "%";
    if (dot) { dot.style.left = pct + "%"; dot.style.background = color; }
  });
}

// PWA
function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js", { updateViaCache: "none" })
      .then(registration => registration.update().catch(() => {}))
      .catch(error => console.warn("Service worker registration failed:", error));
  });
}

// INIT
registerServiceWorker();
render();
loadAllWeather();

setInterval(tick, 1000);

setInterval(() => loadAllWeather(), 600_000);
