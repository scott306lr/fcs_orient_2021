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
        const res = await axios.get(`/teamTask/${user.teamId}`)
        setTasks(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("update tasks", (doneTask, newTasks) => {
      setTasks((prev) => (prev.map((task) => {
        return (doneTask._id === task.taskId) ? {...task, ['done']: true} : task
      })));
      setTasks((prev) => [...prev, ...newTasks]);
    })
  }, [socket]);
  
  const itemList = tasks.map((task) => {
    return (
      <div className="task">
        <Task id={task.taskId} done={task.done} taskFocus={taskFocus} setTaskFocus={setTaskFocus}/>
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