import { motion } from 'framer-motion'
import React, { ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Question from '../components/question'
import { socket } from '../service/socket'
import { useAppSelector } from '../store/hooks'
import './../styles/quizz.scss'

export default function quizz(): ReactElement {
  const questions = useAppSelector((state) => state.questions.questionsList)
  const history = useHistory()
  const [round, setRound] = useState(0)
  const [countdown, setSeconds] = useState(0)

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setSeconds(countdown - 1), 1000)
    }
  }, [countdown])

  socket.on('newRound', () => {
    // wait 5 seconds to start the next round
    setSeconds(5)
    setTimeout(() => {
      if (round < questions.length - 1) {
        setRound(round + 1)
      } else {
        setRound(0)
        history.push('/results')
      }
    }, 5000)
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
          <Question countdown={countdown} question={questions[round]} round={round} />
        </div>
      </div>
    </motion.div>
  )
}
