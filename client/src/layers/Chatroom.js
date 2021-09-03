import { useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Chatbox from "../components/Chatbox";


export default function Chatroom() {
  const [messages, setMessages] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    
    socket.current.emit("hi");
    socket.current.on("got message", (payload) => {
      setMessages(messages => [...messages, payload]);
      console.log(payload);
    })
  }, []);

  const msgJSON = [
    {
      time: "21:02",
      name: "AA",
      role: "Admin",
      team: 1,
      text: "Hello!"
    },
    {
      time: "21:03",
      name: "BB",
      role: "Member",
      team: 5,
      text: "Hi!"
    },
    {
      time: "21:03",
      name: "CC",
      role: "Member",
      team: 3,
      text: "wwwwwww"
    },
  ];

  const MessageList = msgJSON.map((msg) => {
    return (
      <li>
        <Chatbox message={msg}/>
      </li>
    );
  });

  return (
    <ul> { MessageList } </ul>
  );
}