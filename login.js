document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorDisplay = document.getElementById("loginError");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      errorDisplay.style.color = "green";
      errorDisplay.textContent = "Login successful!";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 500);
    } else {
      errorDisplay.style.color = "red";
      errorDisplay.textContent = "Invalid credentials. Please register first.";
    }
  });
});
