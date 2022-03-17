import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Admin() {
  const {user} = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [selId, setSelId] = useState("0");
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
    <div className="flex flex-col">
      1. 專輔的答案列表不會隨著解鎖題目更新，請自行刷新頁面。<br/>
      2. 拍照題請專輔拍完照後再把該題答案告訴小隊員。<br/>
      3. 遊戲在16:00和16:40各會休息10分鐘，裝完水上完廁所後可能還無法輸入答案。<br/>
      4. 遊戲預計17:10結束。<br/>
      <select className="py-2" id = "selector" onChange = {() => {
        const options = document.getElementById("selector").options;
        const idx = options.selectedIndex;
        setSelId(options[idx].id);
      }}>
        {tasks.map((task) => <option id = {task.taskId}>{task.taskName}</option>)}
      </select>
      <div>{selTask && `座標： X = ${String.fromCharCode(selTask.locationX + 64)} , Y = ${selTask.locationY}`}</div>
      <div>{selTask && `答案： ${selTask.answer}`}</div>
    </div>
  );
}