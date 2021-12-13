import React from 'react'
import { motion } from 'framer-motion'
import './../styles/results.scss'
export default function results() {
  return (
    <motion.div
      className="content results"
      key="2"
      animate={{
        x: 0,
      }}
      initial={{
        x: '-100%',
      }}
      exit={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.6 }}
    >
      <div className="background blue-bg"></div>
      blabla
    </motion.div>
  )
}
