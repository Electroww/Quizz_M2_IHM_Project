const data = require('../questions/questions.json');
const players = require('../players/players.js');
let playersAnswers = {}

const getQuestions = () => {
    return data.questions.map(question => {
        return question.question
    })
}

const getQuestion = (questionIndex) => {
    return data.questions[questionIndex].question
}

const verifyAnswers = () => {
    Object.keys(playersAnswers).forEach(playerId => {
        if (playersAnswers[playerId].answer === data.questions[playersAnswers[playerId].question].answer) {
            players.incrementPlayerScore(playerId)
        }
    })
}

const addPlayerAnswer = (socket, questionIndex, answerIndex) => {
    playersAnswers[socket.id] = {
        question: questionIndex,
        answer: answerIndex,
    }
}

const getPlayersAnswers = () => {
    return playersAnswers
}

const clearPlayersAnswers = () => {
     playersAnswers = {}
}


module.exports = { 
    getQuestions,
    addPlayerAnswer,
    verifyAnswers,
    getPlayersAnswers,
    clearPlayersAnswers,
    getQuestion
}