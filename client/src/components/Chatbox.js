import { motion } from "framer-motion"

const variants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  }
};

export default function Chatbox(props) {
  return (
    <motion.div 
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div className="flex space-x-4 px-1 py-2 bg-white rounded">
        <motion.div className="inline-block ">{props.message?.name}:</motion.div>
        <motion.div 
          className="
          mx-2
          break-all
          text-left
          inline-block
          py-1 px-2
          rounded-md
          bg-cusgreen-200
          "
        > {props.message?.content} </motion.div>
      </motion.div>
    </motion.div>
  );
}