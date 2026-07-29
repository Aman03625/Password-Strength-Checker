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
const commonPasswordText = document.getElementById("commonPassword");
const suggestionText = document.getElementById("passwordSuggestion");
 const scoreText = document.getElementById("score");
 const stars = document.getElementById("stars");
const loading = document.getElementById("loading");
const copyMessage = document.getElementById("copyMessage");

const upperCount = document.getElementById("upperCount");
const lowerCount = document.getElementById("lowerCount");
const numberCount = document.getElementById("numberCount");
const symbolCount = document.getElementById("symbolCount");
const lengthCount = document.getElementById("lengthCount");

const suggestionList = document.getElementById("suggestionList");

const historyList = document.getElementById("historyList");

const breachResult = document.getElementById("breachResult");

const themeToggle = document.getElementById("themeToggle");

const downloadReport = document.getElementById("downloadReport");


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
                copyMessage.style.display = "block";

setTimeout(()=>{
    copyMessage.style.display="none";
},2000);
            })
            .catch(() => {
                console.log("Copy Failed");
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
    upperCount.innerHTML = (value.match(/[A-Z]/g) || []).length;

lowerCount.innerHTML = (value.match(/[a-z]/g) || []).length;

numberCount.innerHTML = (value.match(/[0-9]/g) || []).length;

symbolCount.innerHTML = (value.match(/[^A-Za-z0-9]/g) || []).length;

lengthCount.innerHTML = value.length;
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
        loading.style.display="block";

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

// Password Analysis
entropyText.innerHTML = data.entropy + " bits";
crackTimeText.innerHTML = data.crack_time;

// Security Check
commonPasswordText.innerHTML = data.message;
suggestionText.innerHTML = data.suggestion;

// Password Score (0-100)
scoreText.innerHTML = data.score * 20;
suggestionList.innerHTML="";

if(passwordValue.length<8){

suggestionList.innerHTML+="<li>✔ Increase Length</li>";

}

if(!/[A-Z]/.test(passwordValue)){

suggestionList.innerHTML+="<li>✔ Add Uppercase</li>";

}

if(!/[a-z]/.test(passwordValue)){

suggestionList.innerHTML+="<li>✔ Add Lowercase</li>";

}

if(!/[0-9]/.test(passwordValue)){

suggestionList.innerHTML+="<li>✔ Add Numbers</li>";

}

if(!/[!@#$%^&*(),.?\":{}|<>]/.test(passwordValue)){

suggestionList.innerHTML+="<li>✔ Add Symbols</li>";

}

if(suggestionList.innerHTML==""){

suggestionList.innerHTML="<li>✔ Excellent Password</li>";

}
let starsCount=Math.ceil((data.score*20)/20);

 const starIcons = stars.querySelectorAll("i");

starIcons.forEach((star, index) => {
    if(index < starsCount){
        star.classList.remove("fa-regular");
        star.classList.add("fa-solid");
        star.classList.add("active");
    }else{
        star.classList.remove("fa-solid");
        star.classList.add("fa-regular");
        star.classList.remove("active");
    }
});
if(passwordValue!=""){

let li=document.createElement("li");

li.innerHTML=passwordValue;

historyList.prepend(li);

if(historyList.children.length>5){

historyList.removeChild(historyList.lastChild);

}

}
if(data.message.includes("common")){

breachResult.innerHTML="⚠ Found in Known Breaches";

breachResult.style.color="red";

}
else{

breachResult.innerHTML="🛡 Not Found in Known Breaches";

breachResult.style.color="#00ff99";

}

console.log(data);
loading.style.display="none";
console.log("Backend Score:", data.score);
        

    } catch (error) {

        console.log("Backend Error:", error);

    }

}
themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

themeToggle.innerHTML="☀";

}else{

themeToggle.innerHTML="🌙";

}

});
downloadReport.addEventListener("click",()=>{

const report=`
Password Report

Score : ${scoreText.innerHTML}/100

Entropy : ${entropyText.innerHTML}

Crack Time : ${crackTimeText.innerHTML}

Security : ${commonPasswordText.innerHTML}

Suggestion : ${suggestionText.innerHTML}

Generated : ${new Date().toLocaleString()}
`;

const blob=new Blob([report],{type:"text/plain"});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="Password_Report.txt";

link.click();

});