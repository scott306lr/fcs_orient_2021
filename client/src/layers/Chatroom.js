import { useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Chatbox from "../components/Chatbox";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";


export default function Chatroom() {
  const {user} = useContext(AuthContext)
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef();

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

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("got message", (payload) => {
      setMessages(messages => [...messages, payload]);
    })
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTime = new Date();
    const payload = {
      time: currentTime,
      name: user.name,
      role: user.role,
      team: user.team,
      text: newMessage,
    };
    console.log(payload);
    socket.current.emit("send message", {payload});

    try {
      const res = await axios.post("/messages", payload);
      setMessages(messages => [...messages, payload]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const MessageList = msgJSON.map((msg) => {
    return (
      <li>
        <Chatbox message={msg}/>
      </li>
    );
  });

  return (
    <div>
      <ul> { MessageList } </ul>
      <textarea
        className="chatMessageInput"
        placeholder="write something..."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      ></textarea>
      <button className="chatSubmitButton" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
}