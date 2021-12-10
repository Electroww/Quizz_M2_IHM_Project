import React, { useState, useEffect } from 'react'
import openSocket from 'socket.io-client'

import 'bootstrap/dist/css/bootstrap.css'
import { Question } from './types/question'
import Home from './pages/home'
import './styles/global.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const ENDPOINT = 'http://localhost:8080'
const socket = openSocket(ENDPOINT, { transports: ['websocket'] })

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    socket.on('quiz', (data) => {
      setQuestions(data.quiz)
    })
  }, [])

  return (
    <BrowserRouter>
      <div className="background"></div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
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
