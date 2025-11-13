// ============================
// 🔧 GAME PAGE CONFIGURATION
// ============================

const GAME_DATA = {
  title: "Level Devil",
  developer: "Blink Games",
  rating: "⭐ 4.2",
  ageRating: "Rated for 3+",
  plays: "100K+ Plays",
  bannerImage: "sl/img_leveldevil.jpg",
  icon: "favicon.ico",
  playLink: "page.html",
  description:
    "Level Devil is not your average platformer — it’s a rage-filled challenge that tests your patience and timing at every step!",

  features: [
    "🔥 Fast-paced gameplay with unpredictable twists.",
    "💀 Instant respawns to keep you in the action.",
    "🎮 Play directly in your browser — no downloads required.",
    "🏆 Compete with friends for the fastest completion."
  ],

  screenshots: [
    "sl/img_leveldevil.jpg",
    "sl/snap1.png",
    "sl/snap2.jpg",
    "sl/snap3.jpg",
    "sl/snap4.jpg",
    "sl/snap5.png"
  ],

  relatedGames: [
    { name: "Spike Dash", image: "sl/game1.jpg", link: "game1.html" },
    { name: "Pixel Runner", image: "sl/game2.jpg", link: "game2.html" },
    { name: "Block Escape", image: "sl/game3.jpg", link: "game3.html" }
  ]
};

// ============================
// 🧩 DYNAMIC PAGE SETUP
// ============================
document.addEventListener("DOMContentLoaded", () => {
  // Game header
  document.querySelector(".game-text h1").textContent = GAME_DATA.title;
  document.querySelector(".developer").textContent = GAME_DATA.developer;
  document.querySelector(
    ".stats"
  ).innerHTML = `<div>${GAME_DATA.rating}</div><div>${GAME_DATA.ageRating}</div><div>${GAME_DATA.plays}</div>`;

  // Banner & Icon
  document.querySelector(".banner-full img").src = GAME_DATA.bannerImage;
  document.querySelector(".game-icon img").src = GAME_DATA.icon;

  // Play buttons
  document.querySelector(".play-btn").href = GAME_DATA.playLink;
  document.querySelector(".floating-play").href = GAME_DATA.playLink;

  // Description
  document.querySelector(".description p").textContent = GAME_DATA.description;

  // Features list
  const featureList = document.querySelector(".features");
  featureList.innerHTML = "";
  GAME_DATA.features.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    featureList.appendChild(li);
  });

  // Screenshots
  const screenshotContainer = document.querySelector(".screenshots");
  screenshotContainer.innerHTML = "";
  GAME_DATA.screenshots.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Screenshot";
    img.loading = "lazy";
    screenshotContainer.appendChild(img);
  });

  // Related games
  const relatedContainer = document.querySelector(".related-games .game-grid");
  relatedContainer.innerHTML = "";
  GAME_DATA.relatedGames.forEach(game => {
    const a = document.createElement("a");
    a.href = game.link;
    a.innerHTML = `
      <img src="${game.image}" alt="${game.name}" loading="lazy">
      <span>${game.name}</span>
    `;
    relatedContainer.appendChild(a);
  });
});
