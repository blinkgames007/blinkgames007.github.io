const API_URL =
  "https://apiv2.cricket.com.au/web/views/fixtures?CompletedFixturesCount=12&InProgressFixturesCount=12&UpcomingFixturesCount=12";

async function loadMatches() {
    try {
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

            /* Build innings logic */
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

            function teamScore(teamId) {
                if (!inningsByTeam[teamId]) return "";
                return inningsByTeam[teamId].join(" & ");
            }

            /* Create card */
            const card = document.createElement("div");
            card.className = "match-card";

            card.innerHTML = `
                <div class="card-header">
                    <div class="series-name">${match.Competition?.Name ?? ""}</div>
                    <img class="arrow-icon" src="arrow-right.png">
                </div>

                <div class="venue-row">
                    <span class="venue-type">${match.GameType ?? ""}</span>
                    <span class="venue">${match.Venue?.Name ?? ""}</span>
                </div>

                <div class="team-row">
                    <div class="team-left">
                        <img class="flag" src="${home?.LogoUrl ?? ""}">
                        <span class="team-name">${home?.ShortName ?? ""}</span>
                    </div>
                    <div class="team-score">${teamScore(home?.Id)}</div>
                </div>

                <div class="team-row">
                    <div class="team-left">
                        <img class="flag" src="${away?.LogoUrl ?? ""}">
                        <span class="team-name">${away?.ShortName ?? ""}</span>
                    </div>
                    <div class="team-score">${teamScore(away?.Id)}</div>
                </div>

                <div class="match-result">${match.ResultText ?? ""}</div>
            `;

            card.addEventListener("click", () => {
                window.location.href = "match-details.html?id=" + match.Id;
            });

            container.appendChild(card);
        });

    } catch (err) {
        console.error("Loading error:", err);
    }
}

loadMatches();
