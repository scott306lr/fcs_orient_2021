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
    content: "Hello!"
  },
  {
    time: "21:03",
    name: "BB",
    role: "Member",
    team: 5,
    content: "Hi!"
  },
  {
    time: "21:03",
    name: "CC",
    role: "Member",
    team: 3,
    content: "wwwwwww"
  },
];

export default function Chatroom() {
  const {socket, user} = useContext(AuthContext)
  const [messages, setMessages] = useState(msgJSON);
  const newMessage = useRef();
  const scrollRef = useRef();
  //const socket = useRef();
  
  useEffect( async () => {
    try {
      const res = await axios.get("/message");
      setMessages(res.data.reverse());
    } catch (err) {
      console.log(err);
    }
  }, [])

  useEffect(() => {
    socket.on("recieve message", (newMessage) => {
      setMessages( (prev) => [...prev, newMessage]);
    })
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.current.value === "") return;
    
    const currentTime = new Date();
    const payload = {
      time: currentTime,
      name: user.name,
      role: user.role,
      team: user.team,
      content: newMessage.current.value,
    };
    console.log(payload);
    
    try {
      await axios.post("/message", payload);
    } catch (err) {
      console.log(err);
      return
    }

    socket.emit("send message", {payload});
    setMessages([...messages, payload]);
    newMessage.current.value = "";
  };

  const MessageList = messages.map((msg) => {
    return (
      <div class="overflow-y-auto block" ref={scrollRef}>
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
          ref={newMessage}
          class="h-auto resize-none flex-grow ml-4 rounded-md"
        ></textarea>
        <button className="chatSubmitButton" onClick={handleSubmit} class="h-auto btn mr-4">
          Send
        </button>
      </div>
    </div>
  );
}