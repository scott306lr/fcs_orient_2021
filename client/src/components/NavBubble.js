import { motion } from "framer-motion"
import { useState } from "react"
import ChatList from "./ChatList";

export default function NavBubble(props) {
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
        className={`fixed flex h-screen w-screen left-0 top-0`}
      >
        <motion.div className="h-full w-full bg-blue-200" variants={sidebar} />
        {isOpen ? <ChatList/> : ""}
        <motion.button
          className="fixed top-8 left-8"
          onTap={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "X" : "O"}
        </motion.button>

      </motion.nav>
    </>
  )
}