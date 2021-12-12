/**
 * Created by Jérémie on 01/12/2017.
 * Updated by Jérémie Garcia on  07/12/2021
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const kwiz = require('./kwiz_module/kwiz_module');
const players = require('./players/players')

//make the server and the socketsio
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//server static file in the public directory
app.use(express.static(path.join(__dirname, '../client/build')));


// Quand un client se connecte, on le note dans la console
io.on('connection', function (socket) {

    players.createPlayer(socket);
    io.sockets.emit('updatePlayers', players.getOnlinePlayers());

    //send the questions to the client
    socket.emit("quiz", kwiz.questions());

    socket.on('newPlayer', (name) => {
        players.setPlayerName(socket, name);
        io.sockets.emit('updatePlayers', players.getOnlinePlayers());
    })

    socket.on('playerReady', () => {
        players.setPlayerReady(socket);
        io.sockets.emit('updatePlayers', players.getOnlinePlayers());
    })

    socket.on('disconnect', function () {
       players.removePlayer(socket);
        io.sockets.emit('updatePlayers', players.getOnlinePlayers());
    })
});

server.listen(8080);