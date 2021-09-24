import { motion } from "framer-motion"

function SystemForm(props){
  return(
    <motion.div className="flex space-x-2 px-1 py-2 justify-center">
      <motion.div 
        className="
        w-5/6
        flex-grow
        mx-2
        break-all
        text-center
        inline-block
        py-1 px-2
        rounded-md
        bg-red-600
        text-white
        "
      > {`${props.message?.name}: ${props.message?.content}`} </motion.div>
    </motion.div>
  )
}

function WelcomeForm(props){
  return(
    <motion.div className="flex space-x-2 px-1 py-2 justify-center">
      <motion.div 
        className="
        w-5/6
        flex-grow
        mx-2
        break-all
        text-center
        inline-block
        py-1 px-2
        rounded-md
        bg-blue-400
        text-white
        "
      > {`${props.message?.name !== 'WELCOME' ? `${props.message?.name}: ` : "" } ${props.message?.content}`} </motion.div>
    </motion.div>
  )
}

function LeftForm(props){
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

function ShowForm(props){
  switch (props?.mode) {
    case 'ANNOUNCE':
      if (props?.message.name === 'SYSTEM')
        return <SystemForm message={props.message}/>
      else 
        return <WelcomeForm message={props.message}/>
    case 'CHAT':
      if (props?.message.name === 'SYSTEM')
        return <SystemForm message={props.message}/>
      else
        if (props?.me === props?.message.name)
          return <RightForm message={props.message}/>
        else
          return <LeftForm message={props.message}/>
    default:
      return ""
  }

}

export default function Chatbox(props) {
  return (
    <motion.div 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {props?.message && <ShowForm message={props.message} me={props.me} mode={props.mode}/>}
    </motion.div>
  );
}