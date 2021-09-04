import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

const task = {
  id: 5,
  name: "Task",
  info: "This is a question.",
  answer: "This is the answer."
};

const doneTask = {
  time: "01:01",
  taskid: 3,
  who: "LR",
  team: 1,
  score: 4,
}

const newTasks = [
  {
    taskID: 6,
    name: "Question 6",
    type: 1,
    done: false 
  },
  {
    taskID: 7,
    name: "Question 7",
    type: 1,
    done: false 
  },
  {
    taskID: 8,
    name: "Question 8",
    type: 1,
    done: false 
  }
];


export default function Task(props) {
  const {socket, user} = useContext(AuthContext);
  const [taskOpen, setTaskOpen] = useState(false);
  const answerText = useRef();
  

  const answerCheck = async () => {
    if (answerText.current.value === task.answer) {
      // const currentTime = new Date();
      // const doneTask = {
      //   time: currentTime,
      //   taskid: props.id,
      //   who: user.name,
      //   team: user.team,
      //   score: props.score,
      // };
      // const newTasks = getNewTasks();

      // const scoreRenew = async () => {
      //   try{
      //     await axios.post("/answer", doneTask);
      //   }catch(err){
      //     console.log(err);
      //     return;
      //   }
      //   socket.emit("answered correct", user.team, doneTask, newTasks);
      // }

      // scoreRenew();
      socket.emit("answered correct", user.team, doneTask, newTasks);
      answerText.current.value = "";
      alert('YES!');
    } else {
      alert ('NO');
    }
  }

  const completeTask = (
    <div>
      <p>{task.info}</p>
      <img src = {`../assets/tasks/${task.id}.jpg`} alt = "Task Image"/>
      <br />
      <input placeholder="請輸入答案" ref={answerText}/>
      <button onClick = {() => answerCheck()}>上傳</button>
    </div>
  );

  return (
    <div>
        <h3 onClick = {() => setTaskOpen(!taskOpen)}>{task.name}</h3>
        {taskOpen ? completeTask: ""}
    </div>
  );
}