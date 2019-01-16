/*const https = require('https');
const fs = require('fs');
const options = {
    key: fs.readFileSync('self_signed_cert/key.pem'),
    certificate: fs.readFileSync('self_signed_cert/certificate.pem'),
    // ca: [fs.readFileSync('new_cert/gd_bundle-g2-g1.crt')]
};

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Now using https..');
});


const httpsServer = https.createServer(options, app);

httpsServer.listen(8443);
*/
const express = require('express');
const https = require("https"),
    fs = require("fs"),
    helmet = require("helmet");

const options = {
    key: fs.readFileSync('self_signed_cert/key.pem'),
    cert: fs.readFileSync('self_signed_cert/certificate.pem'),
    // ca: [fs.readFileSync('new_cert/gd_bundle-g2-g1.crt')]
};

const app = express();

app.use(helmet()); // Add Helmet as a middleware

app.use((req, res) => {
    res.writeHead(200);
    res.end("hello world\n");
});

app.listen(8000);

https.createServer(options, app).listen(8080);