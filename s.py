import serial
import time
import csv
from plyer import notification

# Setup Serial Connection (Update COM port as necessary)
ser = serial.Serial('COM3', 9600, timeout=1)
time.sleep(2)  # wait for the connection to establish

# File to store the data
output_file = 'eeg_data_2.csv'

# Duration and Interval Settings (in seconds)
focus_duration = 20
relax_duration = 30
total_duration = 60 * 10  # example: 10 minutes session

# Function to send notification
def send_notification(message):
    notification.notify(
        title='EEG Training Session',
        message=message,
        app_name='EEG Trainer'
    )

# State Tracking
last_state = None

# Open the file to write data
with open(output_file, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['current_time', 'attention', 'meditation', 'delta', 'theta', 'low_alpha', 'high_alpha', 'low_beta', 'high_beta', 'low_gamma', 'high_gamma', 'state'])

    start_time = time.time()
    current_time = start_time

    while current_time - start_time < total_duration:
        # Determine the current state
        elapsed_time = current_time - start_time
        state = 'relax'
        # if elapsed_time % (focus_duration + relax_duration) < focus_duration:
        #     state = 'focus'
        # else:
        #     state = 'relax'

        # Send notification on state change
        if state != last_state:
            send_notification(f"{state.capitalize()} now...")
            last_state = state

        # Read data from the serial port
        if ser.inWaiting() > 0:
            line = ser.readline().decode('utf-8').strip()
            values = line.split(',')
            if len(values) >= 2:  # Ensure we have enough values
                attention = values[1]  # replace with the correct index for attention
                meditation = values[2]  # replace with the correct index for meditation
                delta = values[3]
                theta = values[4]
                low_alpha = values[5]
                high_alpha = values[6]
                low_beta = values[7]
                high_beta = values[8]
                low_gamma = values[9]
                high_gamma = values[10]

            # Write data to file
                writer.writerow([current_time, attention, meditation, delta, theta, low_alpha, high_alpha, low_beta, high_beta, low_gamma, high_gamma, state])

        time.sleep(1)  # Wait for a second before reading more data
        current_time = time.time()

send_notification("Data collection complete.")
ser.close()
