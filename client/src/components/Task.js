import { motion, AnimatePresence  } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

export default function Task(props) {
  const {socket, user} = useContext(AuthContext);
  const [task, setTask] = useState([]);
  const answerText = useRef();
  
  useEffect( () => {
    async function fetchData(){
      try{
        const res = await axios.get(`/backend/task/${props.id}`);
        setTask(res.data);
      }catch(err){
        console.log(err);
        return;
      }
    }
    fetchData();
  }, [props])

  const answerCheck = async () => {
    if (answerText.current.value === task.answer) {
      try{
        const res = await axios.post("/backend/teamTask/done/", {teamId: user.teamId, taskId: task._id});
        const newTasks = await axios.post(`/backend/teamTask/unlock/${user.teamId}`, task);
        console.log(res.data)
        socket.emit("answered correct", user.teamId, newTasks.data, res.data);
        answerText.current.value = "";
      }catch(err){
        console.log(err);
        return;
      }
      
      alert ('YES!');
    } else {
      alert ('NO');
    }
  }

  const completeTask = (
    <motion.div>
      <motion.p layout>{task.question}</motion.p>
      <motion.img className="px-4 py-3" src={`../tasks/${task.taskId}.jpg`} alt = "Task_Image"/>
      <motion.br layout />
      <motion.div className="flex py-2">      
        <motion.input className="my-2 ml-4" layout placeholder="請輸入答案" ref={answerText}/>
        <motion.button className="btn" layout onClick={() => answerCheck()}> 上傳 </motion.button>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div>
        <motion.h3 layout onClick={() => props.setTaskFocus((props.taskFocus === props.id) ? "" : props.id)}> {task.taskName} </motion.h3>
        <AnimatePresence>
          { (!props.done && props.taskFocus === props.id) && completeTask }
        </AnimatePresence>
    </motion.div>
  );
}