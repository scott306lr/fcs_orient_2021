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

        alert (`回答正確! 獲得${res.data.score}分`);
      }catch(err){
        console.log(err);
        return;
      }
    } else {
      alert ('回答錯誤!');
    }
  }

  const completeTask = (
    <div>
      <p>{task.question}</p>
      <img className="px-4 py-3" src={`../tasks/${task.taskId}.jpg`} alt = "Task_Image"/>
      <br/>
      <div className="flex w-full py-2">      
        <input className="my-2 ml-4" placeholder="請輸入答案" ref={answerText}/>
        <button className="btn" onClick={() => answerCheck()}> 上傳 </button>
      </div>
    </div>
  );

  return (
    <div>
        <h3 layout onClick={() => props.setTaskFocus((props.taskFocus === props.id) ? "" : props.id)}> {task.taskName} </h3>
        { (!props.done && props.taskFocus === props.id) && completeTask }
    </div>
  );
}