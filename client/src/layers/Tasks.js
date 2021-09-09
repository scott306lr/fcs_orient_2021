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
      console.log(tasks)
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    socket.on("update tasks", (newTasks) => {
      console.log(newTasks);
      setTasks((prev) => [...prev, ...newTasks]);
    })
  }, [socket]);

  const unlockTask = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        locationX: 0,
        locationY: 0,
      }

      const doneTask = {
        time: "01:01",
        teamId: 1,
        taskId: 3,
        score: 4,
      }

      const res = await axios.post(`/teamTask/unlock/${user.teamId}`, payload);
      socket.emit("answered correct", (user.teamId, doneTask, res.data));
      setTasks((prev) => [...prev, ...res.data]);

    } catch (err) {
      console.log(err);
    }
  }
  
  const itemList = tasks.map((task) => {
    console.log(task.taskId)
    return (
      <div class = "task">
        <Task id = {task.taskId}/>
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