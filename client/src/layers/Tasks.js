import { useState, useEffect, useContext } from 'react';
import Task from "../components/Task";
import { AuthContext } from '../context/AuthContext';
import axios from "axios"

const taskJSON = [
  {
    taskID: 1,
    name: "Question 1",
    type: 1,
    done: false 
  },
  {
    taskID: 2,
    name: "Question 2",
    type: 1,
    done: false 
  },
  {
    taskID: 3,
    name: "Question 3",
    type: 1,
    done: false 
  }
];

export default function Tasks(props) {
  const {socket, user} = useContext(AuthContext);
  const [tasks, setTasks] = useState(taskJSON);
  const [opened, setOpen] = useState(-1);

  useEffect(() => {
    socket.on("update tasks", (newTasks) => {
      console.log("got ut!");
      setTasks((tasks) => [...tasks, ...newTasks]);
      console.log(tasks);
    })
  }, [socket, user, tasks]);

  
  const itemList = tasks.map((task) => {
    return (
      <div class = "task" onClick={() => setOpen(task.taskID)}>
        <Task id = {task.taskID} open = {opened === task.taskID}/>
      </div>
    );
  });

  return (
    <div id = "taskList">
        {itemList}
    </div>
  );
}