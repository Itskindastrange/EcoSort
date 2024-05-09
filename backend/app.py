from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
from tensorflow.keras.models import load_model

# Load the model
model = load_model('/home/abdullah/Documents/EcoSort-v2-final/backend/ecosort.h5')

# Define a dictionary to map class numbers to class names
class_mapping = {
    0: 'battery',
    1: 'biological',
    2: 'brown-glass',
    3: 'cardboard',
    4: 'clothes',
    5: 'green-glass',
    6: 'metal',
    7: 'paper',
    8: 'plastic',
    9: 'shoes',
    10: 'trash',
    11: 'white-glass'
}

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return "No file uploaded"

    file = request.files['file']
    if file.filename == '':
        return "No selected file"

    img = Image.open(io.BytesIO(file.read()))
    if img is None:
        return "Invalid image file"

    # Preprocess the image
    img = img.resize((224, 224))
    img_array = np.asarray(img) / 255.0

    # Make predictions using your model
    prediction = model.predict(np.expand_dims(img_array, axis=0))
    predicted_class = np.argmax(prediction)

    # Get the class name from the dictionary
    class_name = class_mapping.get(predicted_class, 'Unknown Class')

    # Return the prediction result as JSON
    return jsonify({'prediction': class_name})

if __name__ == '__main__':
    app.run(debug=True)
