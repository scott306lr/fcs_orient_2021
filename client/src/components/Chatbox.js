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
    <motion.li 
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white ring ring-blue-200 py-2 px-4 rounded"
    >
      
      <motion.div className="space-x-4">
        <motion.div className="text-sm text-gray-400">{props.message?.role}</motion.div>
        <motion.div className="inline-block">{props.message?.name}</motion.div>
        <motion.div className="mx-2
                    break-all
                    text-left
                    inline-block
                    py-1 px-2
                    rounded-md
                    bg-cusgreen-200
                    focus:shadow-lg"
        >{props.message?.content}</motion.div>
      </motion.div>
    </motion.li>
  );
}