/**
 * Created by Jérémie on 01/12/2017.
 * Updated by Jérémie Garcia on  07/12/2021
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const kwiz = require('./kwiz_module/kwiz_module');

//make the server and the socketsio
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//server static file in the public directory
app.use(express.static(path.join(__dirname, '../client/build')));


// Quand un client se connecte, on le note dans la console
io.on('connection', function (socket) {
    console.log(socket.id);

    //send the questions to the client
    socket.emit("quiz", kwiz.questions());

});

server.listen(8080);