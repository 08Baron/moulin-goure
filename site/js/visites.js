document.addEventListener("DOMContentLoaded", loadVisitesList);

async function loadVisitesList() {
  const list = document.getElementById("visites-list");
  if (!list) return;
  try {
    const res = await fetch("data/visites.json");
    const visites = await res.json();
    if (!visites.length) {
      list.innerHTML = "<p>Aucune date n'est programmée pour le moment. Revenez bientôt !</p>";
      return;
    }
    list.innerHTML = visites.map(v => {
      const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v.adresse || "");
      return `
        <div class="visit-card glass hoverable">
          <div>
            <h3>${escapeHtmlVi(v.title)}</h3>
            <p>${formatDateVi(v.date)} · ${v.places_restantes} places restantes</p>
          </div>
          <div class="visit-actions">
            <a href="contact.html" class="btn btn-primary">Réserver</a>
            <a href="${mapsUrl}" target="_blank" rel="noopener" class="btn-outline">
              <i class="ti ti-map-pin" aria-hidden="true"></i> Itinéraire
            </a>
          </div>
        </div>
      `;
    }).join("");
  } catch (e) {
    list.innerHTML = "<p>Impossible de charger les dates de visite pour le moment.</p>";
  }
}

function formatDateVi(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function escapeHtmlVi(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
