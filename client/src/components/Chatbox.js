import { motion } from "framer-motion"

function  LeftForm(props){
  return(
    <motion.div className="flex space-x-2 px-1 py-2 float-left">
      <motion.div className="rounded">{props.message?.name}</motion.div>
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
  )
}

function RightForm(props){
  return(
    <motion.div className="flex space-x-2 px-1 py-2 float-right">
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

      <motion.div className="rounded">{props.message?.name}</motion.div>
    </motion.div>
  )
}

export default function Chatbox(props) {
  return (
    <motion.div 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >

      {(props?.me && props?.me === props.message?.name) ? <RightForm message={props.message} />: <LeftForm message={props.message} />}
      
    </motion.div>
  );
}