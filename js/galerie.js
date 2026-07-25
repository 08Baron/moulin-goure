let galleryPhotos = [];
let galleryIndex = 0;

document.addEventListener("DOMContentLoaded", loadGallery);

async function loadGallery() {
  const grid = document.getElementById("gallery-grid");
  const empty = document.getElementById("gallery-empty");
  try {
    const res = await fetch("data/galerie.json");
    const data = await res.json();
    galleryPhotos = data.photos || [];

    if (!galleryPhotos.length) {
      empty.style.display = "block";
      return;
    }

    grid.innerHTML = galleryPhotos.map((p, i) => `
      <button class="gallery-item" data-index="${i}" aria-label="${escapeHtmlG(p.legende || 'Photo du moulin')}">
        <img src="${p.src}" alt="${escapeHtmlG(p.legende || '')}" loading="lazy">
      </button>
    `).join("");

    grid.querySelectorAll(".gallery-item").forEach(btn => {
      btn.addEventListener("click", () => openLightbox(parseInt(btn.dataset.index, 10)));
    });
  } catch (e) {
    empty.style.display = "block";
  }
}

function openLightbox(index) {
  galleryIndex = index;
  renderLightbox();
  document.getElementById("lightbox").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").hidden = true;
  document.body.style.overflow = "";
}

function renderLightbox() {
  const photo = galleryPhotos[galleryIndex];
  document.getElementById("lightbox-img").src = photo.src;
  document.getElementById("lightbox-caption").textContent = photo.legende || "";
}

document.addEventListener("click", (e) => {
  if (e.target.id === "lightbox" || e.target.classList.contains("lightbox-close")) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  const lb = document.getElementById("lightbox");
  if (lb.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") navigateLightbox(1);
  if (e.key === "ArrowLeft") navigateLightbox(-1);
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".lightbox-prev").addEventListener("click", () => navigateLightbox(-1));
  document.querySelector(".lightbox-next").addEventListener("click", () => navigateLightbox(1));
});

function navigateLightbox(dir) {
  galleryIndex = (galleryIndex + dir + galleryPhotos.length) % galleryPhotos.length;
  renderLightbox();
}

function escapeHtmlG(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
