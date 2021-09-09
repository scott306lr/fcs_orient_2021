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
      LEAD
    </div>
  );
}