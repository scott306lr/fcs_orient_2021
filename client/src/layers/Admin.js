import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Admin() {
  const {socket, user} = useContext(AuthContext);
  const [endTime, setEndTime] = useState();
  const newAnnounce = useRef();
  
  const startGame = () => {
    socket.emit("start game");
  };

  const endGame = () => {
    socket.emit("end game");
  };

  const freezeBoard = () => {
    socket.emit("freeze board");
  };

  const unfreezeBoard = () => {
    socket.emit("unfreeze board");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newAnnounce.current.value === "") return;
    
    const currentTime = new Date();
    const payload = {
      time: currentTime,
      name: "SYSTEM",
      role: "ANNOUNCEMENT",
      team: null,
      content: newAnnounce.current.value,
    };
    console.log(payload);
    
    try {
      await axios.post("/message", payload);
    } catch (err) {
      console.log(err);
      return
    }

    socket.emit("send announcement", {payload});
    newAnnounce.current.value = "";
  };

  return (
    <div>
      <button onClick = {freezeBoard}> Freeze Board </button>
      <button onClick = {unfreezeBoard}> Unfreeze Board </button>
      <button onClick = {startGame}> Start Game </button>
      <button onClick = {endGame}> End Game </button>
      <div id = "setInputTime">
        Set End Time
        <input id = "endTime" type = "time" min="15:00" max="18:00" required></input>
      </div>
      <div id = "sendAnnounce">
        <textarea
          className="announceText"
          placeholder="Key in announce text"
          ref={newAnnounce}
        ></textarea>
        <button className="submitAnnounce" onClick={handleSubmit}>
          Send
        </button>
      </div>
      admin
    </div>
  );
}