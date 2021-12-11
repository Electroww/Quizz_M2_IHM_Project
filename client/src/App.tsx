import React, { useState, useEffect } from 'react'
import openSocket from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.css'
import Lobby from './pages/lobby'
import Home from './pages/home'
import Quizz from './pages/quizz'
import './styles/global.scss'
import { Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

const ENDPOINT = 'http://localhost:8080'
const socket = openSocket(ENDPOINT, { transports: ['websocket'] })

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([])
  const location = useLocation()
  useEffect(() => {
    socket.on('quiz', (data) => {
      setQuestions(data.quiz)
      console.log(data)
    })
  }, [])

  return (
    <>
      <AnimatePresence initial={false}>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Home} />
          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/quizz" component={Quizz} />
        </Switch>
      </AnimatePresence>
    </>
  )

  // return (
  //   <div className="App">
  //     <Container>
  //       <Row>
  //         <Col className="header">
  //           <h1 className="display-1 fw-bold">Kwizzz</h1>
  //           <p className="display-5"> Interactive and Multi-User Quizz.</p>
  //         </Col>
  //       </Row>
  //     </Container>

  //     <QuestionsComponent socket={socket} questions={questions}></QuestionsComponent>

  //     <Container>
  //       <Row>
  //         <footer id="site-footer">
  //           <p>Copyright &copy;KWIZZZ 2021</p>
  //         </footer>
  //       </Row>
  //     </Container>
  //   </div>
  // )
}
