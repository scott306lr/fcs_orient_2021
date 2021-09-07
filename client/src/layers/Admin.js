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

  const deleteAll = async () => {
    try {
      await axios.delete("/");
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
      role: "ANNOUNCEMENT",
      teamId: 987,
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
    <div class="z-0">
      <h1 class="text-xl">Admin Interface</h1>
      <div class="flex justify-between">
        <button class="btn" onClick = {freezeBoard}> Freeze Board </button>
        <button class="btn" onClick = {unfreezeBoard}> Unfreeze Board </button>
        <button class="btn" onClick = {startGame}> Start Game </button>
        <button class="btn" onClick = {endGame}> End Game </button>
        <button class="btn" onClick = {deleteAll}> Del Team Task </button>
      </div>
      <div id = "setInputTime">
        Set End Time
        <input id = "endTime" type = "time" min="15:00" max="18:00" required></input>
      </div>
      <div class="relative w-full flex p-2 mt-4 items-center bottom-0 bg-green-200" id = "sendAnnounce">
        <textarea
          className="announceText"
          placeholder="Key in announce text"
          ref={newAnnounce}
          class="h-auto resize-none flex-grow ml-4 rounded-md"
        ></textarea>
        <button className="submitAnnounce" onClick={handleSubmit} class="h-auto btn mr-4">
          Send
        </button>
      </div>
    </div>
  );
}