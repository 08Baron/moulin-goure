document.addEventListener("DOMContentLoaded", loadPost);

async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id") || "0", 10);

  try {
    const res = await fetch("data/vlog.json");
    const data = await res.json(); const posts = data.posts;
    const post = posts[id];
    if (!post) {
      document.getElementById("post-title").textContent = "Article introuvable";
      return;
    }

    document.getElementById("post-date").textContent = formatDateP(post.date);
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-text").textContent = post.excerpt;
    document.title = post.title + " — Moulin Gouré";

    const gallery = document.getElementById("post-gallery");
    const images = post.images || [];
    if (images.length) {
      gallery.style.display = "block";
      const track = document.getElementById("gallery-track");
      const dotsWrap = document.getElementById("gallery-dots");
      track.innerHTML = images.map(im => `<img src="${im.src}" alt="${escapeAttr(post.title)}">`).join("");
      dotsWrap.innerHTML = images.map((_, i) => `<div class="gallery-dot${i === 0 ? ' active' : ''}"></div>`).join("");
      if (images.length === 1) {
        gallery.querySelectorAll(".gallery-arrow, .gallery-dots").forEach(el => el.style.display = "none");
      }

      const dots = dotsWrap.querySelectorAll(".gallery-dot");
      function updateDots() {
        const index = Math.round(track.scrollLeft / track.clientWidth);
        dots.forEach((d, i) => d.classList.toggle("active", i === index));
      }
      track.addEventListener("scroll", () => window.requestAnimationFrame(updateDots));

      gallery.querySelector(".gallery-prev").addEventListener("click", () => {
        track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
      });
      gallery.querySelector(".gallery-next").addEventListener("click", () => {
        track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
      });
    }

    const likeBtn = document.getElementById("post-like");
    const likeCount = document.getElementById("post-like-count");
    const key = "like-" + id;
    const liked = localStorage.getItem(key) === "1";
    likeCount.textContent = liked ? "1" : "0";
    if (liked) likeBtn.classList.add("liked");
    likeBtn.addEventListener("click", () => {
      const isLiked = likeBtn.classList.toggle("liked");
      localStorage.setItem(key, isLiked ? "1" : "0");
      likeCount.textContent = isLiked ? "1" : "0";
    });

    document.getElementById("post-comment").addEventListener("click", () => {
      alert("Les commentaires arrivent bientôt ! En attendant, écris-nous via la page Contact.");
    });
  } catch (e) {
    document.getElementById("post-title").textContent = "Impossible de charger cet article.";
  }
}

function formatDateP(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function escapeAttr(str) {
  return (str || "").replace(/"/g, "&quot;");
}
