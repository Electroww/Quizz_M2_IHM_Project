import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Lobby from './pages/lobby'
import Home from './pages/home'
import Quizz from './pages/quizz'
import './styles/global.scss'
import { Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { socket } from './service/socket'
import { useAppDispatch } from './store/hooks'
import { setPlayers } from './store/features/players-slice'
import { setQuestionsList } from './store/features/questions-slice'
import Results from './pages/results'

export default function App() {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect((): (() => void) => {
    socket.on('updatePlayers', (playersList) => {
      dispatch(setPlayers(playersList))
    })
    socket.on('sendQuestions', (data) => {
      dispatch(setQuestionsList(data))
    })
    return () => socket.disconnect()
  }, [])

  return (
    <AnimatePresence initial={false}>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={Home} />
        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/quizz" component={Quizz} />
        <Route exact path="/results" component={Results} />
      </Switch>
    </AnimatePresence>
  )
}
