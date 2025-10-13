// ================= GLOBAL INIT =================
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", async () => {
  const info = await fetchCompanyInfo();

  // ================= BRAND =================
  document.title = info.title || info.name;
  document.querySelectorAll(".company-name").forEach(el => el.textContent = info.name);
  document.querySelectorAll(".company-owner").forEach(el => el.textContent = info.company);
  document.querySelectorAll(".company-logo").forEach(c => {
    c.innerHTML = `<img src="${info.logo}" alt="${info.name}" class="logo-img">`;
  });

  // Favicon
  if (info.favicon) {
    const fav = document.createElement("link");
    fav.rel = "icon"; fav.href = info.favicon; fav.type = "image/png";
    document.head.appendChild(fav);
  }

  // ================= SOCIALS =================
  const socials = info.socials || {};
  const socialContainer = document.querySelector(".footer-socials");
  socialContainer.innerHTML = "";
  const iconCDN = {
    facebook: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
    twitter: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    linkedin: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
    instagram: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
  };
  Object.entries(socials).forEach(([platform, url]) => {
    const link = document.createElement("a");
    link.href = url; link.target = "_blank"; link.rel = "noopener";
    link.innerHTML = `<img src="${iconCDN[platform] || iconCDN.facebook}" alt="${platform}" class="social-icon">`;
    socialContainer.appendChild(link);
  });

  // ================= GAMES =================
  const games = await fetchGames(info.apis?.games);
  const container = document.querySelector(".games-container");
  container.innerHTML = "";
  games.forEach(game => container.appendChild(createGameCard(game)));

  // ================= RECENTLY PLAYED =================
  displayRecentlyPlayed();

  // ================= SEARCH =================
  const searchInput = document.getElementById("gameSearch");
  searchInput?.addEventListener("input", () => filterGames(searchInput.value));
});

// ================= GAME CARD =================
function createGameCard(game) {
  const card = document.createElement("div");
  card.className = "game-card";
  card.innerHTML = `
    <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
    <h4>${game.title}</h4>
  `;
  // card.addEventListener("click", () => window.location.href = game.page);
  //testing
  card.addEventListener("click", () => {
    saveRecentlyPlayed(game);
    window.location.href = game.page;
  });

  return card;
}

// ================= SEARCH FILTER =================
function filterGames(query) {
  query = query.trim().toLowerCase();
  document.querySelectorAll(".game-card").forEach(card => {
    const title = card.querySelector("h4").textContent.toLowerCase();
    // Show cards that include the search query anywhere in the title
    card.style.display = (query === "" || title.includes(query)) ? "block" : "none";
  });
}

// ================= TOGGLE SEARCH (Mobile) =================
function toggleSearch() {
  document.querySelector(".search-bar").classList.toggle("active");
}

// ================= Testing New Update =================
function saveRecentlyPlayed(game) {
  let played = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
  
  // Remove duplicates
  played = played.filter(g => g.title !== game.title);
  
  // Add new one at the top
  played.unshift(game);
  
  // Limit to last 5 games
  played = played.slice(0, 5);
  
  localStorage.setItem("recentlyPlayed", JSON.stringify(played));

  // Refresh section instantly
  displayRecentlyPlayed();
}

function displayRecentlyPlayed() {
  const container = document.querySelector(".recently-played");
  const played = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
  
  container.innerHTML = played.length
    ? played.map(g => `
        <div class="game-card small">
          <img src="${g.thumbnail}" alt="${g.title}">
          <h5>${g.title}</h5>
        </div>
      `).join("")
    : "<p>No games played yet.</p>";
}

