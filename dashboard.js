document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fundraising-dashboard.onrender.com/api/user")
    .then(response => response.json())
    .then(data => {
      //username
      const firstName = data.name?.split(" ")[0] || "User";

      //Welcome message
      document.getElementById("username").textContent = firstName;
      document.querySelector("h1").textContent = `Welcome back, ${data.name}!`;

      //Calculate remaining amount and percentage
      const remaining = data.target - data.totalDonations;
      const percentage = Math.round((data.totalDonations / data.target) * 100);

      //Stats
      document.getElementById("totalRaised").textContent = `₹${data.totalDonations}`;
      document.getElementById("completePercent").textContent = `${percentage}% of your target`;
      document.getElementById("referrals").textContent = data.referrals;
      document.getElementById("rank").textContent = `#${data.rank}`;
      document.getElementById("target").textContent = `₹${data.target}`;
      document.querySelector("#target").nextElementSibling.textContent = `₹${remaining} remaining`;

      // Progress bar
      document.getElementById("progressFill").style.width = `${percentage}%`;
      document.getElementById("progressPercent").textContent = `${percentage}%`;

      //Referral code
      document.getElementById("referralCode").textContent = data.referralCode;

      //Rewards
      const rewardsContainer = document.getElementById("rewardsContainer");
      rewardsContainer.innerHTML = "";
      data.rewards.forEach(reward => {
        const rewardDiv = document.createElement("div");
        rewardDiv.className = `reward ${reward.unlocked ? "unlocked" : "locked"}`;

        rewardDiv.innerHTML = `
          <span class="reward-icon">${reward.icon}</span>
          <div class="reward-text">
            <strong>${reward.title}</strong>
            <p>${reward.description}</p>
          </div>
          <span class="badge ${reward.unlocked ? "unlocked" : "locked"}">
            ${reward.unlocked ? "Unlocked" : "Locked"}
          </span>
        `;
        rewardsContainer.appendChild(rewardDiv);
      });
    })
    .catch(err => {
      console.error("Error in fetching data:", err);
      const fallbackNotice = document.createElement("div");
      fallbackNotice.className = "error-banner";
      fallbackNotice.textContent = "⚠️ Live data unavailable. Showing default data.";
      document.querySelector(".main-content").prepend(fallbackNotice);
    });
});

//Copy referral code
function copyReferralCode() {
  const code = document.getElementById("referralCode").textContent;
  navigator.clipboard.writeText(code);

  const btn = document.querySelector(".copy-btn");
  btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
  }, 2000);
}

//Dropdown menu
document.getElementById("userBtn").addEventListener("click", () => {
  document.getElementById("userDropdown").classList.toggle("show");
});

window.addEventListener("click", function(e) {
  if (!e.target.closest('.user-dropdown')) {
    document.getElementById("userDropdown").classList.remove("show");
  }
});

//Logout
function logout() {
  window.location.href = "/index.html";
}
