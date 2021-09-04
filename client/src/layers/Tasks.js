import { useState, useEffect, useContext } from 'react';
import Task from "../components/Task";
import Map from "../components/Map";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

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
  const [tasksOpen, setTasksOpen] = useState(false);

  useEffect(() => {
    socket.on("update tasks", (newTasks) => {
      console.log("got ut!");
      setTasks((tasks) => [...tasks, ...newTasks]);
      console.log(tasks);
    })
  }, [socket, user, tasks]);

  
  const itemList = tasks.map((task) => {
    return (
      <div class = "task">
        <Task id = {task.taskID}/>
      </div>
    );
  });

  function switchTasksState(status) {
    setTasksOpen(status);
  }

  return (
    <div id = "map8Tasks">
      <Map />
      <button class = "absolute bottom-0" onClick = {() => switchTasksState(true)}>TASKS</button>
      <div id = "taskList">
        {itemList}
      </div>
    </div>
  );
}