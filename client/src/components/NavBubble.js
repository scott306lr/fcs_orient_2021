import { motion } from "framer-motion"
import { useRef, useState } from "react"
import Backdrop from "./Backdrop"
import ChatList from "./ChatList";

export default function NavBubble(props) {
  const constraintsRef = useRef(null);
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
        delay: 0.5,
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
        className={`fixed left-0 top-0 flex z-${isOpen ? 0 : 10}`}
      >
        <motion.div onClick={(e) => e.stopPropagation()} className="fixed h-screen w-full bg-blue-200" variants={sidebar} />
        <ChatList/>
        <motion.button
          className="relative top-8 left-8"
          onTap={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "X" : "O"}
        </motion.button>

        

        {/* <div className="fixed w-300 p-4 bg-red-700" /> */}
      </motion.nav>
    </>
  )
}