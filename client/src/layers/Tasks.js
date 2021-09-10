import { useState, useEffect, useContext } from 'react';
import Task from "../components/Task";
import Map from "../components/Map";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

export default function Tasks(props) {
  const {socket, user} = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [taskFocus, setTaskFocus] = useState("");

  useEffect( () => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/backend/teamTask/${user.teamId}`)
        setTasks(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    socket.on("update tasks", (doneTask, newTasks) => {
      setTasks((prev) => (prev.map((task) => {
        return (doneTask.taskId === task.taskId) ? {...task, 'done': true} : task
      })));
      setTasks((prev) => [...prev, ...newTasks]);
    })
  }, [socket]);
  
  const itemList = tasks.map((task, i) => {
    return (
      <div key={i}>
        <Task id={task.taskId} done={task.done} taskFocus={taskFocus} setTaskFocus={setTaskFocus}/>
      </div>
    );
  });

  return (
    <div id = "map8Tasks">
      <Map />
      <div>
      {itemList}
      </div>
    </div>
  );
}