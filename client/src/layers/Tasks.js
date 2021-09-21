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
      <div key={i} className="flex flex-col py-2 w-full bg-yellow-100 rounded m-2 text-center ring ring-yellow-200">
        <Task id={task.taskId} done={task.done} taskFocus={taskFocus} setTaskFocus={setTaskFocus}/>
      </div>
    );
  });

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex pb-5">
        <Map />
      </div>
      <div className="flex-none h-3/5 bg-green-500">
        <div className="flex flex-col">
          {itemList}
        </div>
      </div>
    </div>
  );
}