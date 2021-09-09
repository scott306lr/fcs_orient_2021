import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

// const doneTask = {
//   time: "01:01",
//   taskid: 3,
//   who: "LR",
//   team: 1,
//   score: 4,
// }

// const newTasks = [
//   {
//     teamId: "3",
//     taskName: "Question 3",
//     taskId: "3",
//     qtype: "orient",
//     done: false 
//   },
//   {
//     teamId: "5",
//     taskName: "Question 5",
//     taskId: "5",
//     qtype: "orient",
//     done: false 
//   },
//   {
//     teamId: "8",
//     taskName: "Question 8",
//     taskId: "8",
//     qtype: "quiz",
//     done: false 
//   },
// ];


export default function Task(props) {
  const {socket, user} = useContext(AuthContext);
  const [taskOpen, setTaskOpen] = useState(false);
  const [task, setTask] = useState([]);
  const answerText = useRef();
  
  useEffect( async () => {
    try{
      const res = await axios.get(`/Task/${props.id}`);
      setTask(res.data);
    }catch(err){
      console.log(err);
      return;
    }
  }, [])

  const answerCheck = async () => {
    if (answerText.current.value === task.answer) {
      try{
        const newTasks = await axios.post(`/teamTask/unlock/${user.teamId}`, task);
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
      <img src = {`../assets/tasks/${task.taskId}.jpg`} alt = "Task Image"/>
      <br />
      <input placeholder="請輸入答案" ref={answerText}/>
      <button onClick = {() => answerCheck()}>上傳</button>
    </div>
  );

  return (
    <div>
        <h3 onClick = {() => setTaskOpen(!taskOpen)}>{task.taskName}</h3>
        {taskOpen ? completeTask: ""}
    </div>
  );
}