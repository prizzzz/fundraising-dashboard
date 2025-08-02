document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fundraising-dashboard.onrender.com/api/leaderboard")
    .then((res) => res.json())
    .then((users) => {
      const tbody = document.getElementById("leaderboardBody");

      if (users.length === 0) {
        tbody.innerHTML = `
                <tr>
                  <td colspan="4" style="text-align: center; padding: 20px; color: #6b7280;">
                    No data available yet
                  </td>
                </tr>`;
        return;
      }

      users.sort((a, b) => b.totalDonations - a.totalDonations);
      tbody.innerHTML = "";

      users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td class="rank rank-${index + 1}">#${index + 1}</td>
              <td>
                <div style="display: flex; align-items: center;">
                  <div class="avatar">${user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}</div> 
                  <span>${user.name}</span>
                </div>
              </td>
              <td>₹${user.totalDonations.toLocaleString()}</td>
              <td>
                  <div class="referral-badge">
                      <i class="fas fa-user-plus"></i>${user.referrals}
                  </div>
              </td>`;
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.error("Failed to load leaderboard", err);
      document.getElementById("leaderboardBody").innerHTML = `
            <tr>
              <td colspan="4" style="text-align:center; padding: 20px; color: #dc2626;">
                <i class="fas fa-exclamation-circle"></i> Error in loading data.
              </td>
            </tr>
          `;
    });
});
