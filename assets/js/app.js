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

const HOME = { name:"Roma", country:"Italia", flag:"🇮🇹", tz:"Europe/Rome", lat:41.9028, lon:12.4964 };

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

// STATE
let state = {
  query: "",
  results: [],
  cities: loadCities(),
  weather: {}, // key: cityName -> { temp, icon, desc }
  homeWeather: null,
  showDelete: null,
};

function loadCities() {
  try { return JSON.parse(localStorage.getItem("wtp_cities") || "[]"); }
  catch { return []; }
}
function saveCities() {
  localStorage.setItem("wtp_cities", JSON.stringify(state.cities));
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
  const home = getLocalTime(HOME.tz);
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

  return `${label} rispetto a Roma`;
}

function getStatus(tz) {
  const t = getLocalTime(tz);
  const hour = t.getHours() + t.getMinutes() / 60;
  if (hour >= 9 && hour < 13) return { label:"Orario lavorativo", cls:"status-work" };
  if (hour >= 13 && hour < 14) return { label:"Pausa pranzo", cls:"status-work" };
  if (hour >= 14 && hour < 18) return { label:"Orario lavorativo", cls:"status-work" };
  if (hour >= 7 && hour < 9) return { label:"Inizio giornata", cls:"status-early" };
  if (hour >= 18 && hour < 21) return { label:"Sera", cls:"status-evening" };
  return { label:"Fuori orario", cls:"status-night" };
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
async function fetchWeather(city) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code&timezone=${encodeURIComponent(city.tz)}&forecast_days=1`;
    const response = await fetch(url);
    const data = await response.json();
    const temp = Math.round(data.current.temperature_2m);
    const code = data.current.weather_code;
    return { temp, icon: WMO_MAP[code] || "🌡️", desc: WMO_DESC[code] || "N/D" };
  } catch { return null; }
}

async function loadAllWeather() {
  const homeWeather = await fetchWeather(HOME);
  if (homeWeather) { state.homeWeather = homeWeather; render(); }

  for (const city of state.cities) {
    const cityData = findCityByName(city.name) || city;
    const weather = await fetchWeather(cityData);
    if (weather) { state.weather[city.name] = weather; render(); }
  }
}

// SEARCH
function findCityByName(name) {
  return CITIES.find(city => city.name === name);
}

function handleSearch(value) {
  state.query = value;
  if (!value.trim()) { state.results = []; render(); return; }

  const query = value.toLowerCase();
  state.results = CITIES.filter(city =>
    city.name.toLowerCase().includes(query) || city.country.toLowerCase().includes(query)
  ).slice(0, 6);
  render();
}

function addCity(city) {
  if (state.cities.find(c => c.name === city.name)) {
    showToast("Città già aggiunta");
    return;
  }
  state.cities.push(city);
  saveCities();
  state.query = "";
  state.results = [];
  fetchWeather(city).then(w => {
    if (w) { state.weather[city.name] = w; render(); }
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
  app.innerHTML = buildHTML();
  attachEvents();
}

function buildHTML() {
  const homeTime = getLocalTime(HOME.tz);

  return `
  <div class="header">
    <div class="header-top">
      <span class="app-title">World Planner</span>
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
        autocomplete="off"
        autocorrect="off"
      />
      ${state.results.length > 0 ? `
      <div class="search-dropdown" id="search-dropdown">
        ${state.results.map(c => `
          <div class="search-item" data-add="${escHtml(c.name)}">
            <span>
              <span class="search-item-name">${c.flag} ${escHtml(c.name)}</span>
              <span style="color:var(--text-faint);margin-left:4px;font-size:12px">${escHtml(c.country)}</span>
            </span>
            <span class="search-item-tz">${formatTime(getLocalTime(c.tz))}</span>
          </div>
        `).join("")}
      </div>` : ""}
    </div>
  </div>

  <div class="main">
    <!-- HOME CARD -->
    <div class="home-clock-card">
      <div class="home-city-row">
        <span class="home-flag">${HOME.flag}</span>
        <span class="home-city-name">${HOME.name} — La tua posizione</span>
      </div>
      <div class="home-clock-time" id="home-clock">${formatTime(homeTime)}</div>
      <div class="home-date">${formatDate(homeTime)}</div>
      <div class="home-weather-row">
        ${state.homeWeather ? `
          <span class="weather-icon-large">${state.homeWeather.icon}</span>
          <span class="home-temp">${state.homeWeather.temp}°C</span>
          <span class="home-weather-desc">${state.homeWeather.desc}</span>
        ` : `<span class="city-weather-loading">⏳ Caricamento meteo...</span>`}
      </div>
    </div>

    <!-- CITIES -->
    ${state.cities.length === 0 ? `
    <div class="section-label">Le tue città</div>
    <div class="empty-state">
      <div class="empty-icon">🌍</div>
      <div class="empty-title">Nessuna città aggiunta</div>
      <div class="empty-sub">Cerca una città in alto e aggiungila alla tua lista per tenere d'occhio i fusi orari.</div>
    </div>
    ` : `
    <div class="section-label">Le tue città · ${state.cities.length}</div>
    ${state.cities.map(c => buildCityCard(c)).join("")}
    `}
  </div>

  <div class="toast" id="toast"></div>
  `;
}

function buildCityCard(c) {
  const t = getLocalTime(c.tz);
  const pct = getDayPercent(c.tz);
  const color = getTimelineColor(c.tz);
  const diff = getDiff(c.tz);
  const status = getStatus(c.tz);
  const weather = state.weather[c.name];
  const isShowDelete = state.showDelete === c.name;

  return `
  <div class="city-card ${isShowDelete ? 'show-delete':''}" data-city="${escHtml(c.name)}" id="card-${escHtml(c.name).replace(/\s/g,'_')}">
    <button class="delete-btn" data-remove="${escHtml(c.name)}" title="Rimuovi">✕</button>
    <div class="city-card-top">
      <div class="city-card-left">
        <div class="city-card-name-row">
          <span class="city-flag">${c.flag}</span>
          <span class="city-name">${escHtml(c.name)}</span>
        </div>
        <div class="city-country">${escHtml(c.country)} · ${escHtml(diff)}</div>
      </div>
      <div class="city-card-right">
        <div class="city-time">${formatTime(t)}</div>
        <div class="city-diff">${formatDate(t)}</div>
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
          : `<span class="city-weather-loading">…</span>`
        }
      </div>
    </div>
  </div>`;
}

function escHtml(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// EVENTS
function attachEvents() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", e => handleSearch(e.target.value));
    searchInput.addEventListener("focus", () => {
      if (searchInput.value) handleSearch(searchInput.value);
    });
  }

  document.querySelectorAll("[data-add]").forEach(el => {
    el.addEventListener("click", () => {
      const name = el.dataset.add;
      const city = findCityByName(name);
      if (city) addCity(city);
    });
  });

  document.querySelectorAll("[data-remove]").forEach(el => {
    el.addEventListener("click", e => {
      e.stopPropagation();
      removeCity(el.dataset.remove);
    });
  });

  document.querySelectorAll(".city-card").forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.closest("[data-remove]")) return;
      const name = card.dataset.city;
      state.showDelete = state.showDelete === name ? null : name;
      render();
    });
  });

  document.addEventListener("click", e => {
    if (!e.target.closest("#search-wrap")) {
      state.results = [];
      state.query = document.getElementById("search-input")?.value || state.query;
      if (document.getElementById("search-dropdown")) render();
    }
  }, { once: true });
}

// TICK
function tick() {
  const clock = document.getElementById("home-clock");
  if (clock) {
    clock.textContent = formatTime(getLocalTime(HOME.tz));
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

// INIT
render();
loadAllWeather();

state.cities.forEach(async city => {
  const cityData = findCityByName(city.name) || city;
  const weather = await fetchWeather(cityData);
  if (weather) { state.weather[city.name] = weather; render(); }
});

setInterval(tick, 1000);

setInterval(() => loadAllWeather(), 600_000);
