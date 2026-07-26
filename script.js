// =========================
// Elements
// =========================

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const progressBar = document.getElementById("progressBar");
const strengthText = document.getElementById("strengthText");

const lengthRule = document.getElementById("lengthRule");
const upperRule = document.getElementById("upperRule");
const lowerRule = document.getElementById("lowerRule");
const numberRule = document.getElementById("numberRule");
const specialRule = document.getElementById("specialRule");

const generateBtn = document.getElementById("generateBtn");

// =========================
// Show / Hide Password
// =========================

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});

// =========================
// Live Password Checker
// =========================

password.addEventListener("input", checkPassword);

function checkPassword() {

    const value = password.value;

    let score = 0;

    // Length

    if (value.length >= 8) {

        score++;
        lengthRule.innerHTML = "✅ At least 8 Characters";

    } else {

        lengthRule.innerHTML = "❌ At least 8 Characters";

    }

    // Uppercase

    if (/[A-Z]/.test(value)) {

        score++;
        upperRule.innerHTML = "✅ Uppercase Letter";

    } else {

        upperRule.innerHTML = "❌ Uppercase Letter";

    }

    // Lowercase

    if (/[a-z]/.test(value)) {

        score++;
        lowerRule.innerHTML = "✅ Lowercase Letter";

    } else {

        lowerRule.innerHTML = "❌ Lowercase Letter";

    }

    // Number

    if (/[0-9]/.test(value)) {

        score++;
        numberRule.innerHTML = "✅ Number";

    } else {

        numberRule.innerHTML = "❌ Number";

    }

    // Special Character

    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {

        score++;
        specialRule.innerHTML = "✅ Special Character";

    } else {

        specialRule.innerHTML = "❌ Special Character";

    }

    // =========================
    // Strength Meter
    // =========================

    if (score <= 1) {

        progressBar.style.width = "20%";
        progressBar.style.background = "red";

        strengthText.innerHTML = "Weak";
        strengthText.style.color = "red";

    }

    else if (score == 2) {

        progressBar.style.width = "40%";
        progressBar.style.background = "orange";

        strengthText.innerHTML = "Medium";
        strengthText.style.color = "orange";

    }

    else if (score == 3) {

        progressBar.style.width = "60%";
        progressBar.style.background = "#FFD700";

        strengthText.innerHTML = "Good";
        strengthText.style.color = "#FFD700";

    }

    else if (score == 4) {

        progressBar.style.width = "80%";
        progressBar.style.background = "#32CD32";

        strengthText.innerHTML = "Strong";
        strengthText.style.color = "#32CD32";

    }

    else {

        progressBar.style.width = "100%";
        progressBar.style.background = "green";

        strengthText.innerHTML = "Very Strong";
        strengthText.style.color = "green";

    }

}

// =========================
// Generate Strong Password
// =========================

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "@#$%&*!?";

    const allChars = uppercase + lowercase + numbers + symbols;

    let newPassword = "";

    // One character from each category

    newPassword += uppercase[Math.floor(Math.random() * uppercase.length)];
    newPassword += lowercase[Math.floor(Math.random() * lowercase.length)];
    newPassword += numbers[Math.floor(Math.random() * numbers.length)];
    newPassword += symbols[Math.floor(Math.random() * symbols.length)];

    // Remaining characters

    for (let i = 4; i < 12; i++) {

        newPassword += allChars[Math.floor(Math.random() * allChars.length)];

    }

    // Shuffle password

    newPassword = newPassword
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    // Set password

    password.value = newPassword;

    // Update strength automatically

    checkPassword();

}