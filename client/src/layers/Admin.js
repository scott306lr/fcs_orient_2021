import { useContext, useRef } from "react";
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
    if (window.confirm("freeze board?")){
      socket.emit("freeze board");
    }
  };

  const unfreezeBoard = () => {
    if (window.confirm("unfreeze board?")){
      socket.emit("unfreeze board");
    }
  };
  
  const freezeUpdate = () => {
    socket.emit("update freezetime");
  }

  const initGame = async () => {
    if (window.confirm("initialize game?")){
      try {
        const res = await axios.post("/backend/teamTask/initTask");
        console.log(res.data);
      } catch (err) {
        console.log(err);
        return
      }
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
      teamId: 999,
      content: newAnnounce.current.value,
    };
    try {
      await axios.post("/backend/message", payload);
      socket.emit("send announcement", {payload});
      newAnnounce.current.value = "";
    } catch (err) {
      console.log(err);
      return
    }
  };

  return (
    <div className="bg-red-200">
      <h1 className="text-xl">Admin Interface</h1>
      <div className="flex-wrap justify-between">
        <button className="btn" onClick = {freezeBoard}> Freeze Board </button>
        <button className="btn" onClick = {freezeUpdate}> Freeze Update </button>
        <button className="btn" onClick = {unfreezeBoard}> Unfreeze Board </button>
        <button className="btn" onClick = {startGame}> Start Game </button>
        <button className="btn" onClick = {stopGame}> Stop Game </button>
        <button className="btn" onClick = {initGame}> Init Game </button>
      </div>
      
      {/* <div id = "setInputTime">
        Set End Time
        <input id = "endTime" type = "time" min="15:00" max="18:00" required/>
      </div> */}
      <div className="w-full flex p-2 mt-4 items-center bottom-0 bg-red-300" id = "sendAnnounce">
        <textarea
          placeholder="Announce message..."
          className="h-auto resize-none flex-grow ml-4 rounded-md"
          ref={newAnnounce}
        />
        <button onClick={handleSubmit} className="h-auto btn mr-4">
          Send
        </button>
      </div>
    </div>
  );
}