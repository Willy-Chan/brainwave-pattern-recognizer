import asyncio
import websockets
import serial
import time
import json

# Setup Serial Connection (Update COM port as necessary)
ser = serial.Serial('COM3', 9600, timeout=1)
time.sleep(2)  # wait for the connection to establish

async def read_and_send(websocket, path):
    while True:
        try:
            line = ser.readline().decode('utf-8').strip()
            if line:
                values = line.split(',')
                values = [int(val) for val in values]
                data = json.dumps(values)
                await websocket.send(data)
                print(data)
            else:
                print("No data received")
            await asyncio.sleep(1)
        except Exception as e:
            print(f"An error occurred: {e}")

start_server = websockets.serve(read_and_send, "localhost", 8080)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
