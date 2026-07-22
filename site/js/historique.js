document.addEventListener("DOMContentLoaded", loadFullTimeline);

async function loadFullTimeline() {
  const track = document.getElementById("full-timeline-track");
  if (!track) return;
  try {
    const res = await fetch("data/timeline.json");
    const events = await res.json();

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
