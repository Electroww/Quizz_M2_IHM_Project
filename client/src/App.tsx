import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Lobby from './pages/lobby'
import Home from './pages/home'
import Quizz from './pages/quizz'
import './styles/global.scss'
import { Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { socket } from './service/socket'

export default function App() {
  const location = useLocation()
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    socket.on('quiz', (data) => {
      setQuestions(data.quiz)
      console.log(data)
    })
  }, [])

  return (
    <AnimatePresence initial={false}>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={Home} />
        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/quizz" component={Quizz} />
      </Switch>
    </AnimatePresence>
  )
}
