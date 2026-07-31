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
 const downloadJSON = document.getElementById("downloadJSON");

  const avoidSimilar = document.getElementById("avoidSimilar");
const excludeAmbiguous = document.getElementById("excludeAmbiguous");
const noRepeat = document.getElementById("noRepeat");
 const presetSelect = document.getElementById("presetSelect");
  const chartCanvas = document.getElementById("scoreChart");
  const matrixCanvas=document.getElementById("matrixCanvas");


// =========================
// Show / Hide Password
// =========================

togglePassword.addEventListener("click", () => {

 togglePassword.classList.toggle("rotate");

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
 presetSelect.addEventListener("change", () => {

    switch(presetSelect.value){

        case "easy":

            slider.value = 8;
            lengthValue.innerHTML = 8;

            upperCheck.checked = false;
            lowerCheck.checked = true;
            numberCheck.checked = true;
            symbolCheck.checked = false;

            break;

        case "medium":

            slider.value = 12;
            lengthValue.innerHTML = 12;

            upperCheck.checked = true;
            lowerCheck.checked = true;
            numberCheck.checked = true;
            symbolCheck.checked = false;

            break;

        case "strong":

            slider.value = 16;
            lengthValue.innerHTML = 16;

            upperCheck.checked = true;
            lowerCheck.checked = true;
            numberCheck.checked = true;
            symbolCheck.checked = true;

            break;

        case "ultra":

            slider.value = 20;
            lengthValue.innerHTML = 20;

            upperCheck.checked = true;
            lowerCheck.checked = true;
            numberCheck.checked = true;
            symbolCheck.checked = true;

            avoidSimilar.checked = true;
            excludeAmbiguous.checked = true;
            noRepeat.checked = true;

            break;

    }

});

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
     // Avoid Similar Characters
if (avoidSimilar.checked) {

    chars = chars.replace(/[O0Il1]/g, "");

}

// Exclude Ambiguous Characters
if (excludeAmbiguous.checked) {

    chars = chars.replace(/[{}\[\]()\/\\'"`,;]/g, "");

}
 let pass = "";
let passwordLength = slider ? Number(slider.value) : 12;

if (noRepeat.checked && passwordLength > chars.length) {
    alert("Password length is greater than available unique characters.");
    return;
}

for (let i = 0; i < passwordLength; i++) {

    let randomChar = chars[Math.floor(Math.random() * chars.length)];

    if (noRepeat.checked) {
        while (pass.includes(randomChar)) {
            randomChar = chars[Math.floor(Math.random() * chars.length)];
        }
    }

    pass += randomChar;
}


    

    password.value = pass;

checkPassword();

navigator.clipboard.writeText(pass).then(() => {

    copyMessage.innerHTML = "✔ Password Generated & Copied Successfully";
    copyMessage.style.display = "block";

    setTimeout(() => {
        copyMessage.style.display = "none";
         copyMessage.innerHTML = "Copied ✔";
    }, 2000);

});


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
 updateChart(data.score * 20);
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
saveHistory(passwordValue);
 
if (data.breached) {

    breachResult.innerHTML =
        "⚠ Found in " + data.breach_count.toLocaleString() + " Breaches";

    breachResult.style.color = "red";

} else {

    breachResult.innerHTML =
        "🛡 Not Found in HaveIBeenPwned Database";

    breachResult.style.color = "#00ff99";

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



 
 downloadReport.addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Password Analysis Report", 20, 20);

    // Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text("Password : " + password.value, 20, 40);
    doc.text("Score : " + scoreText.innerHTML + "/100", 20, 55);
    doc.text("Entropy : " + entropyText.innerHTML, 20, 70);
    doc.text("Crack Time : " + crackTimeText.innerHTML, 20, 85);
    doc.text("Security : " + commonPasswordText.innerHTML, 20, 100);
    doc.text("Suggestion : " + suggestionText.innerHTML, 20, 115);

    doc.text("Generated On : " + new Date().toLocaleString(), 20, 135);

    doc.save("Password_Report.pdf");

});
 // =========================
// Download JSON Report
// =========================

downloadJSON.addEventListener("click", () => {

    const report = {

        password: password.value,
        score: scoreText.innerHTML,
        entropy: entropyText.innerHTML,
        crack_time: crackTimeText.innerHTML,
        security: commonPasswordText.innerHTML,
        suggestion: suggestionText.innerHTML,
        generated_on: new Date().toLocaleString()

    };

    const json = JSON.stringify(report, null, 4);

    const blob = new Blob([json], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "Password_Report.json";

    a.click();

    URL.revokeObjectURL(url);

});
 // =========================
// Local Storage History
// =========================

function saveHistory(passwordValue){

    if(passwordValue === "") return;

    let history = JSON.parse(localStorage.getItem("passwordHistory")) || [];

    // Duplicate remove
    history = history.filter(item => item !== passwordValue);

    // New password first
    history.unshift(passwordValue);

    // Keep only last 5
    if(history.length > 5){
        history.pop();
    }

    localStorage.setItem("passwordHistory", JSON.stringify(history));

    loadHistory();
}

function loadHistory(){

    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("passwordHistory")) || [];

    history.forEach(item => {

        let li = document.createElement("li");
        li.textContent = item;

        historyList.appendChild(li);

    });

}
// =========================
// Password Score Chart
// =========================

const scoreChart = new Chart(chartCanvas, {

    type: "doughnut",

    data: {

        labels: ["Score", "Remaining"],

        datasets: [{

            data: [0, 100],

            backgroundColor: [

                "#00ff99",
                "#333"

            ],

            borderWidth: 0

        }]

    },

    options: {

        responsive: true,

        cutout: "70%",

        plugins: {

            legend: {

                display: false

            }

        }

    }

});

function updateChart(score){

    scoreChart.data.datasets[0].data = [

        score,

        100 - score

    ];

    scoreChart.update();

}
const languageSelect = document.getElementById("languageSelect");

const translations = {

en:{
title:"Password Strength Checker",
tagline:"Analyze • Generate • Secure",
strength:"Strength",
analysis:"📊 Password Analysis",
security:"🛡 Security Check",
stats:"📋 Password Statistics",
suggestions:"💡 Suggestions",
rules:"Password Rules",
preset:"Password Preset",
length:"Password Length",
advanced:"Advanced Generator Settings",
generate:"Generate Strong Password",
report:"Download Report",
json:"Download JSON",
scoreHeading:"Password Score",
characterHeading:"Character Options",
graphHeading:"📊 Password Strength Graph",
historyHeading:"🕘 Password History",
passwordLabel:"Enter Password"
},

hi:{
title:"पासवर्ड स्ट्रेंथ चेकर",
tagline:"विश्लेषण • जनरेट • सुरक्षित",
strength:"मजबूती",
analysis:"📊 पासवर्ड विश्लेषण",
security:"🛡 सुरक्षा जाँच",
stats:"📋 पासवर्ड आँकड़े",
suggestions:"💡 सुझाव",
rules:"पासवर्ड नियम",
preset:"पासवर्ड प्रीसेट",
length:"पासवर्ड लंबाई",
advanced:"एडवांस जनरेटर सेटिंग्स",
generate:"मजबूत पासवर्ड बनाएं",
report:"रिपोर्ट डाउनलोड करें",
json:"JSON डाउनलोड करें",
scoreHeading:"पासवर्ड स्कोर",
characterHeading:"अक्षर विकल्प",
graphHeading:"📊 पासवर्ड स्ट्रेंथ ग्राफ",
historyHeading:"🕘 पासवर्ड इतिहास",
passwordLabel:"पासवर्ड दर्ज करें"

}

};

languageSelect.addEventListener("change",()=>{

let lang=translations[languageSelect.value];

document.querySelector("h1").innerHTML=
'<i class="fa-solid fa-shield-halved"></i> '+lang.title;

document.querySelector(".tagline").innerText=lang.tagline;

document.getElementById("strengthHeading").innerText=lang.strength;
document.getElementById("analysisHeading").innerText=lang.analysis;
document.getElementById("securityHeading").innerText=lang.security;
document.getElementById("statsHeading").innerText=lang.stats;
document.getElementById("suggestionHeading").innerText=lang.suggestions;
document.getElementById("rulesHeading").innerText=lang.rules;
document.getElementById("presetHeading").innerText=lang.preset;
document.getElementById("lengthHeading").innerText=lang.length;
document.getElementById("advancedHeading").innerText=lang.advanced;

document.getElementById("generateBtn").innerHTML=
'<i class="fa-solid fa-key"></i> '+lang.generate;

document.getElementById("downloadReport").innerHTML=
'<i class="fa-solid fa-file-pdf"></i> '+lang.report;

document.getElementById("downloadJSON").innerHTML=
'<i class="fa-solid fa-file-code"></i> '+lang.json;
document.getElementById("scoreHeading").innerText=lang.scoreHeading;
document.getElementById("characterHeading").innerText=lang.characterHeading;
document.getElementById("graphHeading").innerText=lang.graphHeading;
document.getElementById("historyHeading").innerText=lang.historyHeading;
password.placeholder = lang.passwordLabel;
document.getElementById("passwordLabel").innerText =
lang.passwordLabel;

});

// ==========================
// Matrix Hacker Rain
// ==========================

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);
    drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height / fontSize;
    }
}

const letters =
"01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";

const fontSize = 16;

let columns;
let drops = [];

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function drawMatrix() {

    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff66";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {

        const text = letters[Math.floor(Math.random() * letters.length)];

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (
            drops[i] * fontSize > canvas.height &&
            Math.random() > 0.975
        ) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 35);