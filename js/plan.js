document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("mill-cutaway");
  if (!wrap) return;

  function reveal(clientX, clientY) {
    const rect = wrap.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    wrap.style.setProperty("--x", x + "px");
    wrap.style.setProperty("--y", y + "px");
  }

  wrap.addEventListener("mousemove", (e) => reveal(e.clientX, e.clientY));
  wrap.addEventListener("mouseleave", () => {
    wrap.style.setProperty("--x", "-9999px");
    wrap.style.setProperty("--y", "-9999px");
  });
  wrap.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    if (t) reveal(t.clientX, t.clientY);
  }, { passive: true });
});
