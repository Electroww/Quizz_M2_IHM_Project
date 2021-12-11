import { motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import './../styles/quizz.scss'

export default function quizz(): ReactElement {
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
        <h2>QUIZZ</h2>
      </div>
    </motion.div>
  )
}
