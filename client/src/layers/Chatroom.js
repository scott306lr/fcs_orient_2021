import { useContext, useEffect, useRef, useState } from "react";
//import { io, Socket } from "socket.io-client";
import Chatbox from "../components/Chatbox";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

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

export default function Chatroom() {
  const {socket, user} = useContext(AuthContext)
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(msgJSON);
  //const socket = useRef();
  

  useEffect(() => {
    socket.on("recieve message", (payload) => {
      setMessages( (messages) => [...messages, payload]);
    })
  }, [socket, messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    
    const currentTime = new Date();
    const payload = {
      time: currentTime,
      name: user.name,
      role: user.role,
      team: user.team,
      text: newMessage,
    };
    console.log(payload);
    socket.emit("send message", {payload});

    // try {
    //   const res = await axios.post("/messages", payload);
    //   setMessages(messages => [...messages, payload]);
    //   setNewMessage("");
    // } catch (err) {
    //   console.log(err);
    // }
    setMessages(messages => [...messages, payload]);
    setNewMessage("");
  };

  const MessageList = messages.map((msg) => {
    return (
      <div class="overflow-y-auto block">
        <Chatbox message={msg}/>
      </div>
    );
  });

  return (
    <div class = "h-screen overflow-hidden bg-blue-400">
      { MessageList }
      <div class="absolute w-full flex mt-4 items-center inset-x-0 bottom-0 bg-green-200 block">
        <textarea
          className="chatMessageInput"
          placeholder="write something..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          class="h-auto resize-none flex-grow ml-4 rounded-md"
        ></textarea>
        <button className="chatSubmitButton" onClick={handleSubmit} class="h-auto btn mr-4">
          Send
        </button>
      </div>
    </div>
  );
}