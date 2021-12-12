
const onlinePlayers = {};

    
const createPlayer = (socket) => {
    onlinePlayers[socket.id] = {
        name: '',
        score: 0,
        ready: false,
    }
    console.log(`Player ${socket.id} connected`);
}

const getOnlinePlayers = () => {
    return onlinePlayers;
}

const setPlayerName = (socket, name) => {
    onlinePlayers[socket.id].name = name;
    console.log(`Player ${socket.id} join lobby with name ${name}`);
}

const setPlayerReady = (socket) => {
    onlinePlayers[socket.id].ready =  !onlinePlayers[socket.id].ready;
    console.log(`Player ${socket.id} is ${onlinePlayers[socket.id].ready ? 'ready' : 'not ready'}`);
}

const removePlayer = (socket) => {
    delete onlinePlayers[socket.id];
    console.log(`Player ${socket.id} disconnected`);
}

const incrementPlayerScore = (playerId) => {
    console.log(playerId);
    console.log(onlinePlayers[playerId]);
    onlinePlayers[playerId].score++;
    console.log(`Player ${playerId} score is ${onlinePlayers[playerId].score}`);
}
    
module.exports = { createPlayer, getOnlinePlayers, setPlayerName, setPlayerReady, removePlayer, incrementPlayerScore };