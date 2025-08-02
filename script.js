document.addEventListener("DOMContentLoaded", function () {
  // tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.add("hidden"));
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.remove("hidden");
    });
  });

  //Password
  const toggleButtons = document.querySelectorAll(".toggle-password");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.previousElementSibling;
      const isPassword = input.getAttribute("type") === "password";

      input.setAttribute("type", isPassword ? "text" : "password");
      this.innerHTML = isPassword
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    });
  });
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = "/frontend/dashboard/dashboard.html";
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = "/frontend/dashboard/dashboard.html";
});
