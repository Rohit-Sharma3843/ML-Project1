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

# Load vectorizer and models
vectorizer = joblib.load("vectorizer.model")
models = [
    joblib.load("fake_news_svc.model"),
    joblib.load("fake_news_rfc.model"),
    joblib.load("fake_news_lr.model"),
    joblib.load("fake_news_knn.model"),
    joblib.load("fake_news_dtc.model"),
]

# Preprocessing function (matches your notebook)
def preprocess(text):
    text = re.sub('[^a-zA-Z]', ' ', text)
    text = text.lower().split()
    text = [port_stem.stem(word) for word in text if word not in stopwords.words('english')]
    return ' '.join(text)

# Serve HTML
@app.route("/")
def index():
    return send_from_directory(".", "index.htm")

# Serve CSS
@app.route("/index.css")
def css():
    return send_from_directory(".", "index.css")

# Prediction API
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    article = data.get("article", "")
    if not article.strip():
        return jsonify({"prediction": "No input provided."})

    processed = preprocess(article)
    X = vectorizer.transform([processed])
    predictions = [model.predict(X)[0] for model in models]
    avg_prediction = round(np.mean(predictions))
    label = "Real" if avg_prediction == 1 else "Fake"
    return jsonify({"prediction": label})

if __name__ == "__main__":
    app.run(debug=True)
