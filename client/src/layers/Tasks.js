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

  const unlockTask = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        locationX: 0,
        locationY: 0,
      }

      const doneTask = {
        time: "01:01",
        taskid: 3,
        who: "LR",
        team: 1,
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
    return (
      <div class = "task">
        <Task id = {task.taskID}/>
      </div>
    );
  });

  return (
    <div id = "map8Tasks">
      <Map />
      <button class = "absolute bottom-0" onClick={unlockTask}>ADD TASKS</button>
      <div id = "taskList">
        {itemList}
      </div>
    </div>
  );
}