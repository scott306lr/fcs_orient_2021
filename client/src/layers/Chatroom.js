import { useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";


export default function Chatroom() {
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    
    socket.current.emit("hi");
    socket.current.on("welcome", (msg) => {
      console.log(msg);
    })
  }, []);



  return (
    <div>
      Chatroom
    </div>
  );
}