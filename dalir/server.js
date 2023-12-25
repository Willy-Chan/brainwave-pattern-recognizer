const { express}  = require('express');
const { cors } = require('cors');
const { SerialPort } = require('serialport');

const app = express();
app.use(cors()); // This will enable CORS for all routes

const port = 3001;

app.get('/check-eeg', (req, res) => {
    const serialPort = new SerialPort({ path: "COM3", baudRate: 9600 });

    serialPort.on('open', () => {
        console.log('Serial Port Opened');
    });

    serialPort.on('data', (data) => {
        console.log('Data:', data.toString());
    });

    serialPort.on('error', (err) => {
        console.log('Error: ', err.message);
        res.status(500).send('Error connecting to EEG');
        serialPort.close();
    });

    // Keep the connection open, or decide when to close it
    res.send('EEG Connection Opened. Check server console for data.');
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});