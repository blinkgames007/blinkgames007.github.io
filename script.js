document.getElementById('year').textContent = new Date().getFullYear();

function toggleSearch() {
  document.querySelector(".search-bar").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("gameSearch");
  const filterGames = () => {
    const q = (searchInput?.value || "").trim().toLowerCase();
    document.querySelectorAll(".game-card").forEach(card => {
      const title = card.querySelector("h4").textContent.toLowerCase();
      // ✅ Instead of display: none, just hide visibility so grid stays intact
      card.classList.toggle("hidden", !(q === "" || title.startsWith(q)));
    });
  };
  if (searchInput) searchInput.addEventListener("input", filterGames);
});
