// ================= LOGINPAGE.JS (IMPROVED) =================

const form = document.getElementById("loginForm");
const popup = document.getElementById("popup");
const popupText = popup ? popup.querySelector("p") : null;
const passwordInput = document.getElementById("password");
const togglePasswordSpan = document.querySelector(".toggle-password");

// 🔗 Replace with your deployed Apps Script Web App URL
const LOGIN_API_URL = "https://script.google.com/macros/s/AKfycbwpQxKtsgnlmV5vY8K9o4j7xjhXTylRMnwZu0zjQit-eSjYU3GeUkjq7WDCB63AzM8/exec";

// Toggle password visibility
function togglePassword() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordSpan.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePasswordSpan.textContent = "Show";
    }
}

// Close popup
function closePopup() {
    if (popup) popup.style.display = "none";
}

if (popup) {
    const closeBtn = popup.querySelector("button");
    if (closeBtn) closeBtn.addEventListener("click", closePopup);
}

// Submit login form
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        if (popup && popupText) {
            popupText.textContent = "Please enter username and password";
            popup.style.display = "flex";
        }
        return;
    }

    // Send login request
    fetch(LOGIN_API_URL, {
        method: "POST",
        body: JSON.stringify({
            type: "login",
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Login successful → go to logbook
            window.location.href = "logbook.html";
        } else {
            // Login failed → show popup
            if (popup && popupText) {
                popupText.textContent = "Incorrect username or password";
                popup.style.display = "flex";
            }
            // Clear password field for security
            passwordInput.value = "";
        }
    })
    .catch(err => {
        console.error(err);
        if (popup && popupText) {
            popupText.textContent = "Login failed. Check network or Apps Script deployment.";
            popup.style.display = "flex";
        }
    });
});