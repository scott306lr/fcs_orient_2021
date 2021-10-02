import { useState, useEffect, useContext } from 'react';
import Task from "../components/Task";
import Map from "../components/Map";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

export default function Tasks(props) {
  const {socket, user} = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskFocus, setTaskFocus] = useState("");

  useEffect( () => {
    const fetchData = async() => {
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
    tasks.map(task => console.log(task.qtype));
  }, [socket]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="pb-5">
        <Map />
      </div>
      <div className={`fixed bottom-0 flex flex-col p-4 w-full overflow-y-hidden rounded bg-gray-400 ${isExpanded ? "h-full" : "h-1/3"}`}>
        <button className="px-4 w-full mb-2 bg-gray-300 rounded" onClick={() => setIsExpanded((prev) => !prev)}> {`${isExpanded ? "收起" : "展開"}`} </button>
        <div className="flex flex-col w-full h-full overflow-y-scroll pl-4 rounded bg-gray-300">
          {tasks.filter(task => !task.done).map((item, i) => (
            <div key={i} className={`flex flex-col py-2 w-full rounded my-2 text-center ring-1 ring-gray-600 ${item.qtype === "A" ? "bg-areaA-400" : ""}${item.qtype === "C" ? "bg-areaC-400" : ""}${item.qtype === "E" ? "bg-areaE-400" : ""}${item.qtype === "N" ? "bg-areaN-400" : ""}${item.qtype === "S" ? "bg-areaS-400" : ""}${item.qtype === "W" ? "bg-areaW-400" : ""}`}>
              <Item task={item} taskFocus={taskFocus} setTaskFocus={setTaskFocus}/>
            </div>
          ))}

          {tasks.filter(task => task.done).map((item, i) => (
            <div key={i} className={`flex flex-col py-2 w-full bg-gray-500 rounded my-2 text-center ring-1 ring-gray-900 ${item.qtype === "A" ? "bg-areaA-800" : ""}${item.qtype === "C" ? "bg-areaC-800" : ""}${item.qtype === "E" ? "bg-areaE-800" : ""}${item.qtype === "N" ? "bg-areaN-800" : ""}${item.qtype === "S" ? "bg-areaS-800" : ""}${item.qtype === "W" ? "bg-areaW-800" : ""}`}>
              <Item task={item} taskFocus={taskFocus} setTaskFocus={setTaskFocus}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Item(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div layout onClick={toggleOpen}>
      <Task id={props.task.taskId} done={props.task.done} taskFocus={props.taskFocus} setTaskFocus={props.setTaskFocus}/>
    </div>
  );
}