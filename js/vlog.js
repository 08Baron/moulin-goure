document.addEventListener("DOMContentLoaded", () => {
  loadVlogList();
  initTextSize();
});

function initTextSize() {
  document.querySelectorAll(".tbtn[data-size]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("vlog-full-list").style.fontSize = btn.dataset.size;
    });
  });
}

async function loadVlogList() {
  const list = document.getElementById("vlog-full-list");
  if (!list) return;
  try {
    const res = await fetch("data/vlog.json");
    const data = await res.json(); const posts = data.posts;

    list.innerHTML = posts.map((p, i) => `
      <article class="vlog-post glass" data-index="${i}">
        <a href="post.html?id=${i}"><h3>${escapeHtmlV(p.title)}</h3></a>
        <time>${formatDateV(p.date)}</time>
        <p class="vlog-excerpt" id="vex-${i}">${escapeHtmlV(p.excerpt)}</p>
        <span class="read-more" data-target="vex-${i}">Lire la suite</span>
        <div class="post-actions">
          <button class="post-action" data-like="${i}"><i class="ti ti-heart" aria-hidden="true"></i> <span class="like-count">0</span></button>
          <button class="post-action" data-comment="${i}"><i class="ti ti-message-circle" aria-hidden="true"></i> Commenter</button>
        </div>
      </article>
    `).join("");

    list.querySelectorAll(".read-more").forEach(el => {
      el.addEventListener("click", () => {
        document.getElementById(el.dataset.target).classList.toggle("open");
      });
    });

    list.querySelectorAll("[data-like]").forEach(btn => {
      const key = "like-" + btn.dataset.like;
      const countEl = btn.querySelector(".like-count");
      const liked = localStorage.getItem(key) === "1";
      countEl.textContent = liked ? "1" : "0";
      if (liked) btn.classList.add("liked");
      btn.addEventListener("click", () => {
        const isLiked = btn.classList.toggle("liked");
        localStorage.setItem(key, isLiked ? "1" : "0");
        countEl.textContent = isLiked ? "1" : "0";
      });
    });

    list.querySelectorAll("[data-comment]").forEach(btn => {
      btn.addEventListener("click", () => {
        alert("Les commentaires arrivent bientôt ! En attendant, écris-nous via la page Contact.");
      });
    });
  } catch (e) {
    list.innerHTML = "<p>Impossible de charger le vlog pour le moment.</p>";
  }
}

function formatDateV(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function escapeHtmlV(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
