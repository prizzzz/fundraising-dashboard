const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(cors());

//dummy user data
const user = {
  name: "Priyanka Chougule",
  referralCode: "priyanka2025",
  totalDonations: 7000,
  referrals: 12,
  rank: 3,
  target: 10000
};

//funtion to locked and unlocked rewards
function calculateRewards(user) {
  const rewardList = [];

  const rewardCriteria = [
    {
      title: "First Donation",
      description: "Raised your first ₹100",
      icon: "🏆",
      condition: user.totalDonations >= 100
    },
    {
      title: "Rising Star",
      description: "Reached ₹1000 milestone",
      icon: "🌟",
      condition: user.totalDonations >= 1000
    },
    {
      title: "Community Builder",
      description: "Get 10 referrals",
      icon: "👥",
      condition: user.referrals >= 10
    },
    {
      title: "Top Performer",
      description: "Reach ₹10,000 target",
      icon: "🎖️",
      condition: user.totalDonations >= user.target
    }
  ];

  rewardCriteria.forEach(({ title, description, icon, condition }) => {
    rewardList.push({
      title,
      description,
      icon,
      unlocked: condition
    });
  });

  return rewardList;
}

//Dummy leaderboard data
const leaderboardData = [
  { name: "Priyanka Chougule", totalDonations: 7000, referrals: 22 },
  { name: "Sonu Sharma", totalDonations: 9000, referrals: 10 },
  { name: "Riya Mehta", totalDonations: 4000, referrals: 5 },
  { name: "Amit Desai", totalDonations: 10000, referrals: 12 },
  { name: "Sana Khan", totalDonations: 3500, referrals: 3 }
];

//Leaderboard API route
app.get("/api/leaderboard", (req, res) => {
  res.json(leaderboardData);
});

//User and Rewards API route
app.get("/api/user", (req, res) => {
  const rewards = calculateRewards(user);
  res.json({ ...user, rewards });
});

//Default route for API root
app.get("/", (req, res) => {
  res.send("Server is running");
});

//Start the backend server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

