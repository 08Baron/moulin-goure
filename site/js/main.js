document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  initLoader();
  initNav();
  loadTimeline();
  loadVlogPreview();
  loadNextVisit();
});

// Hide the mill loader once the page is ready
function initLoader() {
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 300);
  });
}

// Mobile nav toggle
function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

// Mini timeline on the homepage — reads data/timeline.json
async function loadTimeline() {
  const track = document.getElementById("mini-timeline-track");
  if (!track) return;
  try {
    const res = await fetch("data/timeline.json");
    const events = await res.json();
    track.innerHTML = events.map(ev => `
      <div class="timeline-point" title="${escapeHtml(ev.title)}">
        <div class="timeline-dot"></div>
        <div class="timeline-year">${escapeHtml(ev.year)}</div>
      </div>
    `).join("");
  } catch (e) {
    track.innerHTML = "<p>Impossible de charger la frise pour le moment.</p>";
  }
}

// Vlog preview cards — reads data/vlog.json
async function loadVlogPreview() {
  const grid = document.getElementById("vlog-preview-grid");
  if (!grid) return;
  try {
    const res = await fetch("data/vlog.json");
    const posts = await res.json();
    grid.innerHTML = posts.slice(0, 3).map(p => `
      <a href="post.html?id=${posts.indexOf(p)}" class="vlog-card glass hoverable">
        <img src="${p.image || 'assets/img/placeholder.jpg'}" alt="" onerror="this.style.display='none'">
        <div class="vlog-card-body">
          <h3>${escapeHtml(p.title)}</h3>
          <time>${formatDate(p.date)}</time>
        </div>
      </a>
    `).join("");
  } catch (e) {
    grid.innerHTML = "<p>Impossible de charger le vlog pour le moment.</p>";
  }
}

// Next visit banner — reads data/visites.json
async function loadNextVisit() {
  const el = document.getElementById("next-visit");
  if (!el) return;
  try {
    const res = await fetch("data/visites.json");
    const visites = await res.json();
    if (!visites.length) { el.innerHTML = ""; return; }
    const v = visites[0];
    const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v.adresse || "");
    el.innerHTML = `
      <div class="visit-card glass hoverable">
        <div>
          <h3>${escapeHtml(v.title)}</h3>
          <p>${formatDate(v.date)} · ${v.places_restantes} places restantes</p>
        </div>
        <div class="visit-actions">
          <a href="visites.html" class="btn btn-primary">Réserver</a>
          <a href="${mapsUrl}" target="_blank" rel="noopener" class="btn-outline">
            <i class="ti ti-map-pin" aria-hidden="true"></i> Itinéraire
          </a>
        </div>
      </div>
    `;
  } catch (e) {
    el.innerHTML = "";
  }
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
