import serial
import time
import csv
import tkinter as tk
from threading import Thread

# Setup Serial Connection (adjust COM port as necessary)
ser = serial.Serial('COM3', 9600, timeout=1)
time.sleep(2)  # wait for the connection to establish

# Output file
output_file = 'eeg_data_with_tasks.csv'

# Task parameters
task_duration = 30  # 30 seconds of data collection
get_ready_duration = 5  # 5 seconds get ready time

def collect_data(task_name):
    """Function to collect data for a specific task."""
    with open(output_file, 'a', newline='') as file:
        writer = csv.writer(file)

        # Get ready period
        print(f"Get ready for {task_name}")
        time.sleep(get_ready_duration)

        # Data collection
        print(f"Collecting data for task: {task_name}")
        task_start_time = time.time()
        current_time = task_start_time

        while current_time - task_start_time < task_duration:
            if ser.inWaiting() > 0:
                line = ser.readline().decode('utf-8').strip()
                values = line.split(',')
                if len(values) == 11:  # Check if all EEG values are present
                    attention, meditation = values[1:3]
                    eeg_values = values[3:11]
                    writer.writerow([current_time, attention, meditation, *eeg_values, task_name])
            time.sleep(1)
            current_time = time.time()

        print(f"Task {task_name} complete")

def start_task(task_name):
    """Start a new thread for data collection."""
    Thread(target=collect_data, args=(task_name,)).start()

# GUI setup
root = tk.Tk()
root.title("EEG Data Collection")

tasks = ["Bite into a lemon", "Move your right hand", "Move your left hand", "Visualize a sunny beach"]
for task in tasks:
    button = tk.Button(root, text=task, command=lambda t=task: start_task(t))
    button.pack(pady=10)

root.mainloop()
