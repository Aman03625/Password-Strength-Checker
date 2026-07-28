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
    # Send Response
    # ==========================

    return jsonify({
        "score": score,
        "entropy": entropy,
        "crack_time": crack_time
    })


if __name__ == "__main__":
    app.run(debug=True)