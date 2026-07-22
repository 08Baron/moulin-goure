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

    const img = document.getElementById("post-image");
    if (post.image) {
      img.src = post.image;
      img.alt = post.title;
      img.style.display = "block";
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
