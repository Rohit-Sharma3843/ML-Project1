from flask import Flask, request, jsonify, send_from_directory
import joblib
import numpy as np
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

# Download stopwords if not already present
nltk.download('stopwords')

app = Flask(__name__)

# Initialize stemmer
port_stem = PorterStemmer()

# Load vectorizer and all 6 models
vectorizer = joblib.load("vectorizer.model")
models = [
    joblib.load("fake_news_svc.model"),
    joblib.load("fake_news_rfc.model"),
    joblib.load("fake_news_lr.model"),
    joblib.load("fake_news_knn.model"),
    joblib.load("fake_news_dtc.model"),
]

# Preprocessing function (must match training)
def preprocess(text):
    text = re.sub('[^a-zA-Z]', ' ', text)
    text = text.lower().split()
    text = [port_stem.stem(word) for word in text if word not in stopwords.words('english')]
    return ' '.join(text)

# Serve the main HTML file
@app.route("/")
def index():
    return send_from_directory(".", "index.htm")

# Serve the CSS file
@app.route("/index.css")
def css():
    return send_from_directory(".", "index.css")

# Serve static image and other assets
@app.route("/static/<path:path>")
def send_static(path):
    return send_from_directory("static", path)

# Prediction API
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    article = data.get("article", "")
    if not article.strip():
        return jsonify({"prediction": "No input provided."})

    processed = preprocess(article)
    print("Processed input:", processed)

    X = vectorizer.transform([processed])
    preds = [model.predict(X)[0] for model in models]
    print("Model predictions:", preds)

    avg_pred = round(np.mean(preds))
    label = "Real" if avg_pred == 1 else "Fake"
    return jsonify({"prediction": label})

if __name__ == "__main__":
    app.run(debug=True)
