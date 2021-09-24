import { motion, AnimatePresence } from "framer-motion"
import ScoreList from "../components/ScoreList";

export default function ScoreBubble(props) {

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
        <motion.div className="fixed top-0 left-0 h-screen w-screen bg-cusorange-500" variants={"sidebar"} />
        <ScoreList/>
      </>
  )}

  return(
      <motion.nav
        initial={false}
        animate={props.isOpen === "score" ? "open" : "closed"}
        className={`flex z-10`}
      >        
        {/* <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
        > */}
          { (props.isOpen === "score") && <ShowScore/> }
        {/* </AnimatePresence> */}
        <motion.button
          className="circle bg-cusorange-500 z-20"
          onTap={() => props.setIsOpen((prev) => ((prev === "score") ? "" : "score"))}
        >
          {props.isOpen === "score" ? "X" : <img className="m-auto" src="https://img.icons8.com/fluency-systems-regular/32/000000/trophy.png" alt="score"/>}
        </motion.button>
      </motion.nav>
  )
}