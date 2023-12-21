import serial
import time
from tensorflow.keras.models import load_model
import numpy as np

# Load the trained model
model = load_model('eeg_focus_model.h5')

# Setup Serial Connection (Update COM port as necessary)
ser = serial.Serial('COM3', 9600, timeout=1)
time.sleep(2)  # wait for the connection to establish

def preprocess_input(attention, meditation):
    # Preprocess the input in the same way as you did for training
    # Here, just a simple normalization example is given
    # Replace this with your actual preprocessing logic
    attention_norm = (attention - 50) / 50
    meditation_norm = (meditation - 50) / 50
    return np.array([[attention_norm, meditation_norm]])

while True:
    if ser.inWaiting() > 0:
        line = ser.readline().decode('utf-8').strip()
        values = line.split(',')
        if len(values) >= 2:  # Ensure we have enough values
            attention = int(values[1])
            meditation = int(values[2])
            print(values)

            # Preprocess the input data
            input_data = preprocess_input(attention, meditation)

            # Make a prediction
            prediction = model.predict(input_data)

            # Check if the predicted state is 'focus'
            if prediction[0][0] > 0.5:  # You might need to adjust this threshold
                print("Hello World - Focus detected")

    time.sleep(1)  # Wait for a second before reading more data

ser.close()
