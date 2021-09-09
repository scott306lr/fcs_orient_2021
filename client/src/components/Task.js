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
        const res = await axios.get(`/Task/${props.id}`);
        setTask(res.data);
      }catch(err){
        console.log(err);
        return;
      }
    }
    fetchData();
  }, [])

  const answerCheck = async () => {
    if (answerText.current.value === task.answer) {
      try{
        const res = await axios.post("/teamTask/done/", {teamId: user.teamId, taskId: task._id});
        const newTasks = await axios.post(`/teamTask/unlock/${user.teamId}`, task);
        
        const doneTask = {}
        socket.emit("answered correct", user.teamId, task, newTasks.data);
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
    <div>
      <p>{task.question}</p>
      <img src={`../assets/tasks/${task.taskId}.jpg`} alt = "Task Image"/>
      <br />
      <input placeholder="請輸入答案" ref={answerText}/>
      <button onClick={() => answerCheck()}> 上傳 </button>
      {props.done ? "done!" : "not yet."}
    </div>
  );

  return (
    <div>
        <h3 onClick={() => props.setTaskFocus(props.id)}> {task.taskName} </h3>
        { (!props.done && props.taskFocus === props.id) ? completeTask : "" }
    </div>
  );
}