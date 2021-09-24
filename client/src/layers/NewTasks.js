import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
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
  }, [socket]);

  return (
    <motion.div className="flex flex-col h-full w-full">
      <motion.div className="pb-5">
        <Map />
      </motion.div>
      <motion.div className={`fixed bottom-0 flex flex-col p-4 w-full overflow-y-hidden rounded bg-gray-400 ${isExpanded ? "h-2/5" : "h-full"}`}>
        <motion.button className="px-4 w-full mb-2 bg-gray-300 rounded" onClick={() => setIsExpanded((prev) => !prev)} > ^ </motion.button>
        <motion.div className="flex flex-col w-full h-full overflow-y-scroll pl-4 rounded bg-gray-300">
          <AnimateSharedLayout>
              {tasks.filter(task => !task.done).map((item, i) => (
                <motion.div layout key={i} className="flex flex-col py-2 w-full bg-yellow-100 rounded my-2 text-center ring-1 ring-yellow-400">
                <Item task={item} taskFocus={taskFocus} setTaskFocus={setTaskFocus}/>
                </motion.div>
              ))}

              {tasks.filter(task => task.done).map((item, i) => (
                <motion.div layout key={i} className="flex flex-col py-2 w-full bg-yellow-400 rounded my-2 text-center ring-1 ring-yellow-500">
                <Item task={item} taskFocus={taskFocus} setTaskFocus={setTaskFocus}/>
                </motion.div>
              ))}
            
          </AnimateSharedLayout>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Item(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <motion.div layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
      <AnimatePresence>
        <Task id={props.task.taskId} done={props.task.done} taskFocus={props.taskFocus} setTaskFocus={props.setTaskFocus}/>
      </AnimatePresence>
    </motion.div>
  );
}