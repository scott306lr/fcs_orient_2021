import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import ScoreList from "../components/ScoreList";

export default function ScoreBubble(props) {
  const [isOpen, setIsOpen] = useState(false);

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: "circle(25px at 40px 40px)",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const ShowScore = () => {
    return(
      <>
        <motion.div className="fixed h-screen w-screen bg-blue-200" variants={sidebar} />
        <ScoreList/>
      </>
  )}

  return(
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className={`fixed flex left-0 top-0 z-10`}
      >        
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
        >
          { isOpen && <ShowScore/> }
        </AnimatePresence>
        <motion.button
          className="circle ml-14 bg-green-200 z-10"
          onTap={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "X" : "O"}
        </motion.button>
      </motion.nav>
  )
}