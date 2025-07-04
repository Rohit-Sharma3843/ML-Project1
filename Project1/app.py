from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)

# Load all models
models = {
    "Decision Tree": pickle.load(open("DecisionTree.model", "rb")),
    "Extra Trees": pickle.load(open("ExtraTrees.model", "rb")),
    "KNN": pickle.load(open("KNN.model", "rb")),
    "Linear Regression": pickle.load(open("LinearRegression.model", "rb")),
    "MLP Regressor": pickle.load(open("MLP.model", "rb")),
    "SVR": pickle.load(open("SVR.model", "rb")),
    "Gradient Boosting": pickle.load(open("GradientBoosting.model", "rb")),
    "Random Forest": pickle.load(open("RandomForest.model", "rb")),
}

# Encoding dictionaries for categorical variables
encodings = {
    "gender": {"Male": 1, "Female": 0, "Rather not say": 0.5, "Transgender": 0.3},
    "helmet": {"Yes": 1, "No": 0},
    "seatbelt": {"Yes": 1, "No": 0},
    "road": {"Dry": 0, "Wet": 1, "Snow": 2, "Gravel": 3},
    "weather": {"Clear": 0, "Cloudy": 1, "Foggy": 2, "Rainy": 3, "Dust Storm": 4},
    "alcohol": {"Positive": 1, "Negative": 0, "Not available": 0.5},
    "vehicle": {"Car": 0, "Bus": 1, "Bike": 2, "Scooter": 3, "Truck": 4, "Auto": 5},
    "insurance": {"Valid": 1, "Expired": 0},
    "license": {"Valid": 1, "Expired/No license": 0},
    "mobile": {"Yes": 1, "No": 0},
    "influence": {"Yes": 1, "No": 0},
}

@app.route("/", methods=["GET", "POST"])
def predict():
    prediction = None
    if request.method == "POST":
        try:
            # Extract form data
            data = request.form
            model_name = data["model"]
            gender = encodings["gender"][data["gender"]]
            age = float(request.form.get("age", 0))
            helmet = encodings["helmet"][data["helmet"]]
            seatbelt = encodings["seatbelt"][data["seatbelt"]]
            road = encodings["road"][data["road"]]
            weather = encodings["weather"][data["weather"]]
            alcohol = encodings["alcohol"][data["alcohol"]]
            vehicle = encodings["vehicle"][data["vehicle"]]
            violations = float(request.form.get("violation", 0))
            insurance = encodings["insurance"][data["insurance"]]
            license = encodings["license"][data["license"]]
            mobile = encodings["mobile"][data["mobile"]]
            influence = encodings["influence"][data["influence"]]
            accidents = float(request.form.get("accident", 0))
            speed = float(request.form.get("speed", 0))

            # Final feature vector
            features = np.array([[gender, age, helmet, seatbelt, road, weather,
                                  alcohol, vehicle, violations, insurance, license,
                                  mobile, influence, accidents, speed]])

            # Make prediction
            model = models.get(model_name)
            prediction = model.predict(features)[0]
            prediction = round(prediction, 2)

        except Exception as e:
            prediction = f"Error: {str(e)}"

    return render_template("index.html", prediction=prediction)

if __name__ == "__main__":
    app.run(debug=True)
