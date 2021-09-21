import { motion, AnimatePresence } from "framer-motion";
import ChatList from "../components/ChatList";

export default function ChatBubble(props) {

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

  const ShowChat = () => {
    return(
      <>
        <motion.div className="fixed top-0 left-0 h-screen w-screen bg-blue-200" variants={sidebar} />
        <ChatList/>
      </>
  )}

  return(
      <motion.nav
        initial={false}
        animate={props.isOpen === "chat" ? "open" : "closed"}
        className={`flex z-9999`}
      >
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
        >
          { props.isOpen === "chat" && <ShowChat/> }
        </AnimatePresence>
        <motion.button
          className="circle bg-blue-200 z-20"
          onTap={() => props.setIsOpen((prev) => ((prev === "chat") ? "" : "chat"))}
        >
          {props.isOpen === "chat" ? "X" : <img className="m-auto" src="https://img.icons8.com/material-outlined/32/000000/speech-bubble-with-dots.png" alt="msg"/>}
        </motion.button>
      </motion.nav>
  )
}