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


const onlinePlayers = {};


const addPlayer = (socket) => {
    //add the player to the online players
    onlinePlayers[socket.id] = {
        name: '',
        score: 0,
        ready: false,
    };
    io.sockets.emit('updatePlayers', onlinePlayers);
    console.log(`Player ${socket.id} connected`);
}



// Quand un client se connecte, on le note dans la console
io.on('connection', function (socket) {
    addPlayer(socket);
    
    //send the questions to the client
    socket.emit("quiz", kwiz.questions());

    socket.on('newPlayer', (name) => {
        onlinePlayers[socket.id].name = name;
        io.sockets.emit('updatePlayers', onlinePlayers);
    })

    socket.on('playerReady', () => {
        const ready = onlinePlayers[socket.id].ready
        onlinePlayers[socket.id].ready = !ready;
        io.sockets.emit('updatePlayers', onlinePlayers);
        console.log(`Player ${socket.id} is ${onlinePlayers[socket.id].ready ? 'ready' : 'not ready'}`); 
    })

    socket.on('disconnect', function () {
        delete onlinePlayers[socket.id];
        io.sockets.emit('updatePlayers', onlinePlayers);
        console.log(`Player ${socket.id} disconnected`);
    })
});




server.listen(8080);