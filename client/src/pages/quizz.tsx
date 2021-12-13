import { motion } from 'framer-motion'
import React, { ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Question from '../components/question'
import { socket } from '../service/socket'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import './../styles/quizz.scss'

export default function quizz(): ReactElement {
  const questions = useAppSelector((state) => state.questions.questionsList)
  const history = useHistory()
  const [round, setRound] = useState(0)

  socket.on('newRound', () => {
    if (round < questions.length - 1) {
      setRound(round + 1)
    } else {
      setRound(0)
      history.push('/results')
    }
  })

  return (
    <motion.div
      className="content quizz"
      key="3"
      animate={{
        y: 0,
      }}
      initial={{
        y: '100%',
      }}
      transition={{ ease: 'easeInOut', duration: 0.6 }}
    >
      <div className="background white-bg"></div>
      <div>
        <h2 className="title-quizz">QUIZZ</h2>
        <div>
          <Question question={questions[round]} round={round} />
        </div>
      </div>
    </motion.div>
  )
}
