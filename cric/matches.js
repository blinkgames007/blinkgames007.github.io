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

            const card = document.createElement("div");
            card.className = "match-card";

            card.innerHTML = `
                <!-- TOP BAR -->
                <div class="card-top">
                    <div class="series-name">${match.Competition?.Name ?? ""}</div>
                    <img src="arrow-right.png" class="arrow-icon" />
                </div>

                <!-- VENUE ROW -->
                <div class="venue-wrapper">
                    <div class="venue-pill">${match.GameType ?? ""}</div>
                    <div class="venue-pill">${match.Venue?.Name ?? ""}</div>
                </div>

                <!-- TEAM 1 -->
                <div class="team-row">
                    <div class="team-left">
                        <img class="flag" src="${home?.LogoUrl ?? ""}">
                        <span class="team-name">${home?.ShortName ?? ""}</span>
                    </div>
                    <div class="team-right">
                        <span class="team-score">${teamScore(home?.Id)}</span>
                    </div>
                </div>

                <!-- TEAM 2 -->
                <div class="team-row">
                    <div class="team-left">
                        <img class="flag" src="${away?.LogoUrl ?? ""}">
                        <span class="team-name">${away?.ShortName ?? ""}</span>
                    </div>
                    <div class="team-right">
                        <span class="team-score">${teamScore(away?.Id)}</span>
                    </div>
                </div>

                <!-- RESULT -->
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
