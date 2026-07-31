from flask import Flask, render_template, request, jsonify
import math
import hashlib
import requests

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json()
    password = data["password"]

    score = 0

    # ==========================
    # Password Score
    # ==========================

    if len(password) >= 8:
        score += 1

    if any(c.isupper() for c in password):
        score += 1

    if any(c.islower() for c in password):
        score += 1

    if any(c.isdigit() for c in password):
        score += 1

    if any(c in "@#$%&*!?" for c in password):
        score += 1

    # ==========================
    # Entropy Calculation
    # ==========================

    charset = 0

    if any(c.islower() for c in password):
        charset += 26

    if any(c.isupper() for c in password):
        charset += 26

    if any(c.isdigit() for c in password):
        charset += 10

    symbols = "!@#$%^&*(),.?\":{}|<>"

    if any(c in symbols for c in password):
     charset += 32
    charset += 8

    if charset == 0:
        entropy = 0
    else:
        entropy = round(len(password) * math.log2(charset), 2)

    # ==========================
    # Crack Time Estimation
    # ==========================

    guesses_per_second = 1_000_000_000

    if entropy == 0:
        crack_time = "Instantly"
    else:
        seconds = (2 ** entropy) / guesses_per_second

        if seconds < 60:
            crack_time = f"{int(seconds)} Seconds"
        elif seconds < 3600:
            crack_time = f"{int(seconds / 60)} Minutes"
        elif seconds < 86400:
            crack_time = f"{int(seconds / 3600)} Hours"
        elif seconds < 31536000:
            crack_time = f"{int(seconds / 86400)} Days"
        elif seconds < 3153600000:
            crack_time = f"{int(seconds / 31536000)} Years"
        else:
            crack_time = "Millions of Years"

    # ==========================
    # Have I Been Pwned Check
    # ==========================

    sha1password = hashlib.sha1(password.encode("utf-8")).hexdigest().upper()

    prefix = sha1password[:5]
    suffix = sha1password[5:]

    found = False
    breach_count = 0

    try:
        url = f"https://api.pwnedpasswords.com/range/{prefix}"
        response = requests.get(
    url,
    headers={
        "User-Agent": "PasswordStrengthChecker/1.0"
    },
    timeout=5
)

        if response.status_code == 200:

            hashes = response.text.splitlines()

            for line in hashes:

                hash_suffix, count = line.split(":")

                if hash_suffix == suffix:
                    found = True
                    breach_count = int(count)
                    break

    except Exception:
        found = False
        breach_count = 0

    if found:
        message = (
            f"⚠ This password has appeared in {breach_count:,} data breaches."
        )

        suggestion = (
            "Never use this password. Generate a new unique password immediately."
        )

    else:
        message = (
            "✅ Good News! This password was not found in HaveIBeenPwned."
        )

        suggestion = (
            "Your password has not appeared in known public breaches."
        )

    # ==========================
    # Password Statistics
    # ==========================

    upper_count = sum(1 for c in password if c.isupper())
    lower_count = sum(1 for c in password if c.islower())
    number_count = sum(1 for c in password if c.isdigit())
    symbol_count = sum(1 for c in password if c in symbols)
    length = len(password)

    # ==========================
    # Password Score (/100)
    # ==========================

    score100 = score * 20

    # ==========================
    # Send Response
    # ==========================

    return jsonify({
        "score": score,
        "score100": score100,
        "entropy": entropy,
        "crack_time": crack_time,
        "message": message,
        "suggestion": suggestion,
        "breached": found,
        "breach_count": breach_count,

        "stats": {
            "uppercase": upper_count,
            "lowercase": lower_count,
            "numbers": number_count,
            "symbols": symbol_count,
            "length": length
        }
    })


if __name__ == "__main__":
    app.run(debug=True)