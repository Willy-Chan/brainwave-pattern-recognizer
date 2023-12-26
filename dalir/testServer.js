const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/check-eeg',
    method: 'GET'
};

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d);
    });
});

req.on('error', error => {
    console.error(error);
});

req.end();
