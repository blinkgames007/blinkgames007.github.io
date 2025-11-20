const API_URL =
  "https://apiv2.cricket.com.au/web/views/fixtures?CompletedFixturesCount=12&InProgressFixturesCount=12&UpcomingFixturesCount=12";

async function loadMatches() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = [
        ...data.InProgressFixtures,
        ...data.UpcomingFixtures,
        ...data.CompletedFixtures,
    ];

    const container = document.getElementById("matches-container");

    list.forEach(match => {
        const home = match.HomeTeam;
        const away = match.AwayTeam;

        const inningsByTeam = {};
        if (match.Innings) {
            match.Innings.forEach(inn => {
                if (!inn) return;
                const key = inn.BattingTeamId;
                const score = `${inn.RunsScored}-${inn.NumberOfWicketsFallen}`;
                if (!inningsByTeam[key]) inningsByTeam[key] = [];
                inningsByTeam[key].push(score);
            });
        }

        function teamScore(id) {
            return inningsByTeam[id] ? inningsByTeam[id].join(" & ") : "";
        }

        const card = document.createElement("div");
        card.className = "match-card";

        card.innerHTML = `
            <div class="card-header">
                <div class="series-name">${match.Competition?.Name ?? ""}</div>
                <img src="arrow-right.png" class="arrow-icon">
            </div>

            <div class="venue-row">
                <div class="venue-pill">${match.GameType ?? ""}</div>
                <div class="venue-pill">${match.Venue?.Name ?? ""}</div>
            </div>

            <div class="team-row">
                <div class="left-block">
                    <img src="${home?.LogoUrl ?? ""}" class="flag">
                    <div class="team-name">${home?.ShortName ?? ""}</div>
                </div>
                <div class="right-block">
                    <div class="team-score">${teamScore(home?.Id)}</div>
                </div>
            </div>

            <div class="team-row">
                <div class="left-block">
                    <img src="${away?.LogoUrl ?? ""}" class="flag">
                    <div class="team-name">${away?.ShortName ?? ""}</div>
                </div>
                <div class="right-block">
                    <div class="team-score">${teamScore(away?.Id)}</div>
                </div>
            </div>

            <div class="match-result">${match.ResultText ?? ""}</div>
        `;

        container.appendChild(card);
    });
}

loadMatches();