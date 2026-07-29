from flask import Flask, render_template, request, jsonify
import math

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

    if any(c in "@#$%&*!?" for c in password):
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
    # Common Password Detection
    # ==========================

    common_passwords = [
        "123",
        "1234",
        "12345",
        "123456",
        "1234567",
        "12345678",
        "123456789",
        "password",
        "password123",
        "qwerty",
        "qwerty123",
        "admin",
        "admin123",
        "welcome",
        "letmein",
        "abc123",
        "login",
        "dragon",
        "football",
        "iloveyou",
        "monkey"
    ]

    password_lower = password.lower()
    is_common = False

    for p in common_passwords:

        # Exact Match
        if password_lower == p:
            is_common = True
            break

        # Common password + up to 3 extra characters
        if password_lower.startswith(p) and len(password_lower) <= len(p) + 3:
            is_common = True
            break

    if is_common:

        message = "⚠️ This password is commonly used and easy to guess."

        suggestion = (
            "Choose a stronger password using uppercase, lowercase, "
            "numbers and special symbols."
        )

    else:

        message = "✅ This password is not found in common password lists."

        suggestion = "Great! Your password appears unique."

    # ==========================
    # Password Statistics
    # ==========================

    upper_count = sum(1 for c in password if c.isupper())
    lower_count = sum(1 for c in password if c.islower())
    number_count = sum(1 for c in password if c.isdigit())
    symbol_count = sum(1 for c in password if c in "@#$%&*!?")
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