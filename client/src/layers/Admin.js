import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Admin() {
  const {socket} = useContext(AuthContext);
  //const [endTime, setEndTime] = useState();
  const newAnnounce = useRef();
  
  const startGame = () => {
    socket.emit("start game");
  };

  const stopGame = () => {
    socket.emit("stop game");
  };

  const freezeBoard = () => {
    socket.emit("freeze board");
  };

  const unfreezeBoard = () => {
    socket.emit("unfreeze board");
  };

  // const addNewTask = async () => {
  //   try {
  //     res = await axios.get("/team");
  //     teamList = res.data.map((team) => team.teamId);

  //     for (var i=0; i<teamList.size(); i+=1){
        
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return
  //   }
  // }

  const initGame = async () => {
    try {
      const res = await axios.post("/backend/teamTask/initTask");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      return
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newAnnounce.current.value === "") return;
    
    const currentTime = new Date();
    const payload = {
      time: currentTime,
      name: "SYSTEM",
      role: "SYSTEM",
      teamId: 987,
      content: newAnnounce.current.value,
    };
    //console.log(payload);
    
    try {
      await axios.post("/backend/message", payload);
    } catch (err) {
      console.log(err);
      return
    }

    socket.emit("send announcement", {payload});
    newAnnounce.current.value = "";
  };

  return (
    <div className="z-0">
      <h1 className="text-xl">Admin Interface</h1>
      <div className="flex justify-between">
        <button className="btn" onClick = {freezeBoard}> Freeze Board </button>
        <button className="btn" onClick = {unfreezeBoard}> Unfreeze Board </button>
        <button className="btn" onClick = {startGame}> Start Game </button>
        <button className="btn" onClick = {stopGame}> Stop Game </button>
      </div>
      <button className="btn" onClick = {initGame}> Init Game </button>
      <div id = "setInputTime">
        Set End Time
        <input id = "endTime" type = "time" min="15:00" max="18:00" required></input>
      </div>
      <div className="relative w-full flex p-2 mt-4 items-center bottom-0 bg-green-200" id = "sendAnnounce">
        <textarea
          className="announceText"
          placeholder="Key in announce text"
          ref={newAnnounce}
          className="h-auto resize-none flex-grow ml-4 rounded-md"
        ></textarea>
        <button className="submitAnnounce" onClick={handleSubmit} className="h-auto btn mr-4">
          Send
        </button>
      </div>
    </div>
  );
}