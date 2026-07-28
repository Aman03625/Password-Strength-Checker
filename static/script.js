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
const copyPassword=document.getElementById("copyPassword");

const slider=document.getElementById("lengthSlider");

const lengthValue=document.getElementById("lengthValue");

const upperCheck=document.getElementById("upperCheck");

const lowerCheck=document.getElementById("lowerCheck");

const numberCheck=document.getElementById("numberCheck");

const symbolCheck=document.getElementById("symbolCheck");
const entropyText = document.getElementById("entropy");
const crackTimeText = document.getElementById("crackTime");


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
if (slider) {
    slider.addEventListener("input", () => {
        lengthValue.innerHTML = slider.value;
    });
    lengthValue.innerHTML = slider.value;
}
if (copyPassword) {

    copyPassword.addEventListener("click", () => {

        if (password.value === "") {

            alert("Generate Password First");
            return;

        }

        navigator.clipboard.writeText(password.value)
            .then(() => {
                alert("Password Copied Successfully!");
            })
            .catch(() => {
                alert("Failed to Copy Password");
            });

    });

}





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
    analyzePassword(value);

}

// =========================
// Generate Strong Password
// =========================

generateBtn.addEventListener("click", generatePassword);

function generatePassword(){

    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let number = "0123456789";
    let symbol = "@#$%&*!?";

    let chars = "";

    if(upperCheck.checked)
        chars += upper;

    if(lowerCheck.checked)
        chars += lower;

    if(numberCheck.checked)
        chars += number;

    if(symbolCheck.checked)
        chars += symbol;

    if(chars == ""){

        alert("Select at least one option");

        return;

    }

    let pass = "";
    let passwordLength = slider ? slider.value : 12;

for (let i = 0; i < passwordLength; i++) {

    pass += chars[Math.floor(Math.random() * chars.length)];

}


    

    password.value = pass;

    checkPassword();

}
async function analyzePassword(passwordValue) {

    try {

        const response = await fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: passwordValue
            })
        });

        const data = await response.json();

        entropyText.innerHTML = data.entropy + " bits";
        crackTimeText.innerHTML = data.crack_time;

        console.log(data);
        console.log("Backend Score:", data.score);

    } catch (error) {

        console.log("Backend Error:", error);

    }

}