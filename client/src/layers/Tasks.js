import { useState, useEffect, useContext } from 'react';
import Task from "../components/Task";
import Map from "../components/Map";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

export default function Tasks(props) {
  const {socket, user} = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [taskFocus, setTaskFocus] = useState("");

  useEffect( async() => {
    try {
      const res = await axios.get(`/teamTask/${user.teamId}`)
      setTasks(res.data);
      console.log(tasks)
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    socket.on("update tasks", (doneTask, newTasks) => {
      console.log(newTasks);
      setTasks((prev) => (prev.map((task) => {
        return (doneTask.taskId === task._id) ? {...task, ['done']: true} : task
      })));
      setTasks((prev) => [...prev, ...newTasks]);
    })
  }, [socket]);
  
  const itemList = tasks.map((task) => {
    console.log(task.taskId)
    return (
      <div class = "task">
        <Task id={task.taskId} taskFocus={taskFocus} setTaskFocus={setTaskFocus}/>
      </div>
    );
  });

  return (
    <div id = "map8Tasks">
      <Map />
      {itemList}
    </div>
  );
}