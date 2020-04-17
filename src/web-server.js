const express = require('express');
const path = require('path');
const app = express();
const serverPort=3000;

//To recive POST parameters
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./routes/send-mail'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(serverPort);
console.log('Server on port '+serverPort)