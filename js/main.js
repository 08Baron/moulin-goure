document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  initLoader();
  initNav();
  loadTimeline();
  loadVlogPreview();
  loadNextVisit();
  loadSettings();
  initFloatingWidgets();
});

async function initFloatingWidgets() {
  let settings = {};
  try {
    const res = await fetch("data/settings.json");
    settings = await res.json();
  } catch (e) {}

  // Widget 1 : prochaine visite, discret en haut à droite
  if (!sessionStorage.getItem("widget-visite-ferme")) {
    try {
      const res = await fetch("data/visites.json");
      const data = await res.json();
      const visites = (data.visites || []).filter(v => new Date(v.date) >= new Date(new Date().toDateString()));
      if (visites.length) {
        const next = visites[0];
        setTimeout(() => showFloatingWidget({
          id: "widget-visite",
          position: "top-right",
          icon: "ti-calendar-event",
          image: settings.widget_visite_image,
          title: next.title,
          text: formatDate(next.date),
          href: "visites.html",
          dismissKey: "widget-visite-ferme"
        }), 1200);
      }
    } catch (e) {}
  }

  // Widget 2 : relance douce après une lecture un peu longue (frise, articles)
  if (document.body.dataset.longread && !sessionStorage.getItem("widget-lecture-ferme")) {
    let shown = false;
    window.addEventListener("scroll", () => {
      if (shown) return;
      const scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (scrolled > 0.5) {
        shown = true;
        showFloatingWidget({
          id: "widget-lecture",
          position: "bottom-right",
          icon: "ti-map-pin",
          image: settings.widget_lecture_image,
          title: settings.widget_lecture_titre || "Fatigué de lire ?",
          text: settings.widget_lecture_texte || "Venez nous rencontrer pour une visite guidée",
          href: "visites.html",
          dismissKey: "widget-lecture-ferme"
        });
      }
    });
  }
}

function showFloatingWidget({ id, position, icon, image, title, text, href, dismissKey }) {
  if (document.getElementById(id)) return;
  const el = document.createElement("div");
  el.id = id;
  el.className = `floating-widget glass ${position}`;
  const media = image
    ? `<img src="${image}" class="floating-img" alt="">`
    : `<i class="ti ${icon}" aria-hidden="true"></i>`;
  el.innerHTML = `
    <button class="floating-close" aria-label="Fermer">✕</button>
    <a href="${href}" class="floating-link">
      ${media}
      <div><strong>${title}</strong><span>${text}</span></div>
    </a>
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("in"));
  el.querySelector(".floating-close").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem(dismissKey, "1");
    el.classList.remove("in");
    setTimeout(() => el.remove(), 300);
  });
}

async function loadSettings() {
  try {
    const res = await fetch("data/settings.json");
    const s = await res.json();

    // Logo
    if (s.logo) {
      const img = document.getElementById("logo-img");
      const icon = document.getElementById("logo-icon");
      if (img && icon) {
        img.src = s.logo;
        img.style.display = "inline-block";
        icon.style.display = "none";
      }
    }

    // Cagnotte
    const fill = document.getElementById("cagnotte-fill");
    const label = document.getElementById("cagnotte-label");
    const link = document.getElementById("cagnotte-link");
    if (fill && label && link) {
      if (s.cagnotte_lien) link.href = s.cagnotte_lien;
      renderCagnotte(s.cagnotte_montant_actuel || 0, s.cagnotte_objectif || 0);

      // Tente une synchronisation live avec la page officielle ; si ça échoue,
      // les montants saisis manuellement dans l'admin restent affichés.
      fetch("/.netlify/functions/cagnotte")
        .then(r => r.json())
        .then(data => {
          if (data.ok) renderCagnotte(data.montant, data.objectif);
        })
        .catch(() => {});
    }

    // Réseaux sociaux
    const map = { facebook: "social-facebook", instagram: "social-instagram", whatsapp: "social-whatsapp" };
    Object.keys(map).forEach(key => {
      const el = document.getElementById(map[key]);
      if (el && s[key]) {
        el.href = s[key];
        el.style.display = "inline-flex";
      }
    });
  } catch (e) {
    // Les réglages ne sont pas bloquants si le fichier est absent
  }
}

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
    const data = await res.json(); const events = data.events;
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
    const data = await res.json(); const posts = data.posts;
    grid.innerHTML = posts.slice(0, 3).map(p => {
      const thumb = (p.images && p.images.length) ? p.images[0].src : 'assets/img/placeholder.jpg';
      return `
      <a href="post.html?id=${posts.indexOf(p)}" class="vlog-card glass hoverable">
        <img src="${thumb}" alt="" onerror="this.style.display='none'">
        <div class="vlog-card-body">
          <h3>${escapeHtml(p.title)}</h3>
          <time>${formatDate(p.date)}</time>
        </div>
      </a>
    `;
    }).join("");
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
    const data = await res.json(); const visites = data.visites;
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

function renderCagnotte(montant, objectif) {
  const fill = document.getElementById("cagnotte-fill");
  const label = document.getElementById("cagnotte-label");
  if (!fill || !label) return;
  const pct = objectif ? Math.min(100, Math.round((montant / objectif) * 100)) : 0;
  fill.style.width = pct + "%";
  label.textContent = `${montant.toLocaleString("fr-FR")} € sur ${objectif.toLocaleString("fr-FR")} € collectés`;
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
