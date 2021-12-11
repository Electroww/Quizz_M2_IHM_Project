import React, { ReactElement, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './../styles/lobby.scss'
import Users from './../components/users'
import { useHistory } from 'react-router'

export default function lobby(): ReactElement {
  const [clicked, setClicked] = useState(false)
  const history = useHistory()

  const handleClick = () => {
    setClicked(!clicked)
    history.push('/quizz')
  }

  //temp
  const userList = [
    {
      name: 'John',
      id: '1',
    },
    {
      name: 'Jane',
      id: '2',
    },
    {
      name: 'Jack',
      id: '3',
    },
  ]

  const readyIconAnimation = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
  }

  return (
    <motion.div
      className="content lobby"
      key="2"
      animate={{
        x: 0,
      }}
      initial={{
        x: '100%',
      }}
      exit={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.6 }}
    >
      <div className="lobby-bg background"></div>
      <div>
        <h2 className="white">LOBBY</h2>
        <div className="lobby-content">
          <div className="lobby-title">Online users</div>
          <Users users={userList} />
        </div>
        <div className="ready-content">
          <div className="ready-title">
            {userList.length > 1 ? (
              <>
                <i className="eva eva-alert-circle-outline"></i>
                <span>Waiting for another player to start a game</span>
              </>
            ) : (
              ''
            )}
          </div>
          <div onClick={handleClick} className="ready-button">
            <AnimatePresence exitBeforeEnter>
              {clicked ? (
                <motion.i
                  className="eva eva-checkmark-circle-2-outline confirm-ready"
                  initial="initial"
                  animate="in"
                  exit="initial"
                  variants={readyIconAnimation}
                ></motion.i>
              ) : (
                ''
              )}
            </AnimatePresence>
            Ready
          </div>
        </div>
      </div>
    </motion.div>
  )
}
