import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Admin() {
  const {user} = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [selId, setSelId] = useState("");
  const [selTask, setSelTask] = useState({});

  useEffect( () => {
    const fetchData = async() => {
      try {
        const res = await axios.get(`/backend/teamTask/${user.teamId}`)
        //setTasks(res.data);
        setTasks(res.data.filter((task) => task.done === false));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [user]);

  useEffect( () => {
    const fetchData = async() => {
      try {
        const res = await axios.get(`/backend/task/${selId}`)
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