import { useState, useEffect, useContext } from 'react';
import Task from "../components/Task";
import Map from "../components/Map";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

export default function Tasks(props) {
  const {socket, user} = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect( async () => {
    try {
      const res = await axios.get(`/teamTask/${user.teamId}`)
      setTasks(res.data.reverse());
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    socket.on("update tasks", async (newTasks) => {
      setTasks((prev) => [...prev, ...newTasks]);
    })
  }, [socket]);

  
  const itemList = tasks.map((task) => {
    return (
      <div class = "task">
        <Task id = {task.taskID}/>
      </div>
    );
  });

  return (
    <div id = "map8Tasks">
      <Map />
      <button class = "absolute bottom-0" onClick = {() => console.log(true)}>TASKS</button>
      <div id = "taskList">
        {itemList}
      </div>
    </div>
  );
}