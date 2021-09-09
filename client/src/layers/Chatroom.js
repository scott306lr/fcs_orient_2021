import { useContext, useEffect, useRef, useState } from "react";
//import { io, Socket } from "socket.io-client";
import Chatbox from "../components/Chatbox";
import Announce from "../components/Announce";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const arriveMsgJSON = {
  time: "21:02",
  name: "AA",
  role: "Admin",
  team: 1,
  content: "Hello!"
};

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
  const [arriveMessage, setArriveMessage] = useState();
  const newMessage = useRef();
  const scrollRef = useRef();
  
  useEffect( async () => {
    try {
      const res = await axios.get("/message");
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
    //console.log(messages);
  }, []);

  useEffect(() => {
    setMessages( (prev) => [...prev, arriveMessage]);
  }, [arriveMessage]);

  useEffect(() => {
    socket.on("recieve message", (payload) => {
      setArriveMessage(payload);
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
      teamId: user.teamId,
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
      <div class="overflow-y-auto" ref={scrollRef}>
        <Chatbox message={msg}/>
      </div>
    );
  });

  return (
    <>
      <Announce msg={arriveMessage}/>
      <div class = "flex flex-col h-screen bg-cusblue-200 overflow-hidden">
        <h1 class="text-xl bg-cusgreen-200 text-center p-1">聊天室</h1>
        <div class = "relative flex-grow overflow-auto">
          { MessageList }
        </div>
        <div class="relative w-full flex p-2 mt-4 items-center bottom-0 bg-cusgreen-200">
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
    </>
  );
}