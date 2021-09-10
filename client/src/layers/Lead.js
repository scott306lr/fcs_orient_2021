import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Admin() {
  const {socket, user} = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [selId, setSelId] = useState("");
  const [selTask, setSelTask] = useState({});

  useEffect( () => {
    const fetchData = async() => {
      try {
        const res = await axios.get(`/teamTask/${user.teamId}`)
        setTasks(res.data.map((task) => {
          if (task.done === false)
            return task;
          else return null;
        }));
        console.log(tasks);
        setSelId(tasks[0].taskId);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();

  }, []);

  useEffect( () => {
    const fetchData = async() => {
      try {
        const res = await axios.get(`/task/${selId}`)
        setSelTask(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [selId]);


  return (
    <div className="z-0">
      <select id = "selector" onChange = {() => {
        const options = document.getElementById("selector").options;
        console.log(options);
        const idx = options.selectedIndex;
        setSelId(options[idx].id);
      }}>
        {tasks.map((task) => <option id = {task.taskId}>{task.taskName}</option>)}
      </select>
      <div>本題答案：{selTask.answer}</div>
    </div>
  );
}