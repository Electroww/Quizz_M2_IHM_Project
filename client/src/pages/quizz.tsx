import { motion } from 'framer-motion'
import React, { ReactElement, useEffect } from 'react'
import Question from '../components/question'
import { socket } from '../service/socket'
import { incrementRound } from '../store/features/questions-slice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import './../styles/quizz.scss'

export default function quizz(): ReactElement {
  const questions = useAppSelector((state) => state.questions.questionsList)
  const round = useAppSelector((state) => state.questions.round)
  const dispatch = useAppDispatch()

  useEffect(() => {
    socket.on('nextQuestion', () => {
      dispatch(incrementRound())
    })
  }, [])

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
