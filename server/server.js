/**
 * Created by Jérémie on 01/12/2017.
 * Updated by Jérémie Garcia on  07/12/2021
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const players = require('./players/players')
const questions = require('./questions/questions')

//make the server and the socketsio
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//server static file in the public directory
app.use(express.static(path.join(__dirname, '../client/build')));


// Quand un client se connecte, on le note dans la console
io.on('connection', function (socket) {

    /********************
    * PLAYER MANAGEMENT *
    *********************/

    // Add you in the player list and send the new player list to everyone
    players.createPlayer(socket);
    io.sockets.emit('updatePlayers', players.getOnlinePlayers());

    // New player connection to the lobby (name is entered)
    socket.on('newPlayer', (name) => {
        players.setPlayerName(socket, name);
        io.sockets.emit('updatePlayers', players.getOnlinePlayers());
    })

    // Player is ready on the lobby
    socket.on('playerReady', () => {
        players.setPlayerReady(socket);
        io.sockets.emit('updatePlayers', players.getOnlinePlayers());
    })

    // Remvoe disconneted player from the player list
    socket.on('disconnect', function () {
        players.removePlayer(socket);
        io.sockets.emit('updatePlayers', players.getOnlinePlayers());
    })


    /***********************
    * QUESTIONS MANAGEMENT *
    ************************/

    io.sockets.emit('sendQuestions', questions.getQuestions());


    // Player answer to the question
    socket.on('answerQuestion', (answer, questionId) => {
        questions.addPlayerAnswer(socket, questionId, answer);

        io.sockets.emit('newAnswer', socket.id, answer);


        const answerLenght = Object.keys(questions.getPlayersAnswers()).length
        const playersLenght = Object.keys(players.getOnlinePlayers()).length


        //everyone answer to the question, send the new question to everyone
        if (answerLenght === playersLenght) {
            questions.verifyAnswers();
            io.sockets.emit('updatePlayers', players.getOnlinePlayers());
            io.sockets.emit('newRound', questions.getAnswer(questionId));
            questions.clearPlayersAnswers();
        }
    })

});

server.listen(8080);