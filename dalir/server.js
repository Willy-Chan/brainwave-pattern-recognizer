const express = require('express');
const cors = require('cors');
const { SerialPort } = require('serialport');
const WebSocket = require('ws');

const app = express();
app.use(cors());

const httpServer = require('http').createServer(app);
const wss = new WebSocket.Server({ server: httpServer });

const port = 3001;
let serialPort;

const createSerialPort = () => {
    serialPort = new SerialPort({ path: "COM3", baudRate: 9600 });

    serialPort.on('open', () => {
        console.log('Serial Port Opened');
    });

    serialPort.on('data', (data) => {
        console.log('Data:', data.toString());
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        });
    });

    serialPort.on('error', (err) => {
        console.log('Error: ', err.message);
        serialPort.close();
    });

    serialPort.on('close', () => {
        console.log('Serial Port Closed');
    });
};

app.get('/check-eeg', (req, res) => {
    if (serialPort && serialPort.isOpen) {
        res.send('EEG already connected');
    } else {
        createSerialPort();
        res.send('Trying to connect EEG');
    }
});

httpServer.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
