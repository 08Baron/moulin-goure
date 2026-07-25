document.addEventListener("DOMContentLoaded", loadFullTimeline);

async function loadFullTimeline() {
  const track = document.getElementById("full-timeline-track");
  if (!track) return;
  try {
    const res = await fetch("data/timeline.json");
    const data = await res.json(); const events = data.events;

    track.innerHTML = events.map((ev, i) => `
      <div class="timeline-point" data-index="${i}" tabindex="0" role="button" aria-label="${escapeHtmlLocal(ev.title)}">
        <div class="timeline-dot"></div>
        <div class="timeline-year">${escapeHtmlLocal(ev.year)}</div>
      </div>
    `).join("");

    const detail = document.getElementById("event-detail");
    const closeBtn = document.getElementById("event-close");

    function showEvent(ev) {
      document.getElementById("event-year").textContent = ev.year;
      document.getElementById("event-title").textContent = ev.title;
      document.getElementById("event-text").textContent = ev.text;

      const blocksWrap = document.getElementById("event-blocks");
      const blocks = ev.blocks || [];
      blocksWrap.innerHTML = blocks.map(b => {
        if (b.type === "photo" || b.src) {
          return `<figure class="event-photo">
            <img src="${b.src}" alt="${escapeHtmlLocal(b.legende || ev.title)}">
            ${b.legende ? `<figcaption>${escapeHtmlLocal(b.legende)}</figcaption>` : ""}
          </figure>`;
        }
        return `<p class="event-paragraph">${escapeHtmlLocal(b.text || "")}</p>`;
      }).join("");

      detail.hidden = false;
    }

    track.querySelectorAll(".timeline-point").forEach(point => {
      const ev = events[point.dataset.index];
      point.addEventListener("click", () => showEvent(ev));
      point.addEventListener("keypress", (e) => { if (e.key === "Enter") showEvent(ev); });
    });

    closeBtn.addEventListener("click", () => { detail.hidden = true; });

    // Show the first event by default
    if (events.length) showEvent(events[0]);
  } catch (e) {
    track.innerHTML = "<p>Impossible de charger la frise pour le moment.</p>";
  }
}

function escapeHtmlLocal(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
