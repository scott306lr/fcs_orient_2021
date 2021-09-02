import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";


export default function Chatroom() {
  const socket = useRef(io("ws://localhost:8900"))

  useEffect(() => {
    socket.current.emit("connection")
  }, [])
  return (
    <div>
      Chatroom
    </div>
  );
}