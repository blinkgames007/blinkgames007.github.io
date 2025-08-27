const apiUrl = "https://api.npoint.io/15812aaae7d99303c10f";
let companyInfo = {};

async function loadCompanyInfo() {
  try {
    const res = await fetch(apiUrl);
    companyInfo = await res.json();

    document.title = companyInfo.title || companyInfo.name;
    document.querySelectorAll(".company-name").forEach(el => el.textContent = companyInfo.name);

    // Logo
    document.querySelectorAll(".company-logo").forEach(c => {
      c.innerHTML = `<img src="${companyInfo.logo}" alt="logo" class="logo-img">`;
    });

    // Favicon
    if (companyInfo.favicon) {
      const fav = document.createElement("link");
      fav.rel = "icon"; fav.href = companyInfo.favicon; fav.type = "image/png";
      document.head.appendChild(fav);
    }

    loadSection(companyInfo.apis?.games, ".games-container", createGameCard);
  } catch (err) { console.error(err); }
}

document.addEventListener("DOMContentLoaded", loadCompanyInfo);

function createGameCard(game) {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}">
        <h4>${game.title}</h4>
    `;

    card.addEventListener("click", () => {
      openWebOldLogic(() => {
        window.location.href = game.page; // actual game page
      });
    });
    return card;
}

async function loadSection(url, sel, createFn) {
  if (!url) return;
  const res = await fetch(url);
  const data = await res.json();
  const container = document.querySelector(sel);
  container.innerHTML = "";
  data.forEach(item => container.appendChild(createFn(item)));
}
