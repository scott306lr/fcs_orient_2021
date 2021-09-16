import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import ScoreList from "./ScoreList";

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

  return(
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className={`fixed flex left-0 top-0 z-10`}
      >
        {isOpen && <motion.div className="fixed h-screen w-screen bg-green-200" variants={sidebar} />}
        
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
        >
          {isOpen && <ScoreList/>}
        </AnimatePresence>
        <motion.button
          className="circle ml-14 bg-green-200 z-10"
          onTap={() => setIsOpen((prev) => !prev)}
        >
        {isOpen ? "X" : "O"}
        </motion.button>

      </motion.nav>
      
    </>
  )
}