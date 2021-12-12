import { motion } from 'framer-motion'
import React, { ReactElement, useContext } from 'react'
import Question from '../components/question'
import './../styles/quizz.scss'

export default function quizz(): ReactElement {
  const [currentQuestion, setCurrentQuestion] = React.useState(0)

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
        <div>{/* <Question question={undefined}></Question> */}</div>
      </div>
    </motion.div>
  )
}
