import { useContext, useEffect, useRef, useState } from "react";
import Chatbox from "../components/Chatbox";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Chatroom() {
  const {socket, user} = useContext(AuthContext)
  const [messages, setMessages] = useState([]);
  const [arriveMessage, setArriveMessage] = useState("");
  const newMessage = useRef();
  const scrollRef = useRef();
  
  useEffect( () => {
    const fetchData = async() => {
      try {
        const res = await axios.get("/backend/message");
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
      //console.log(messages);
    }
    fetchData();
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
    
    try {
      await axios.post("/backend/message", payload);
    } catch (err) {
      console.log(err);
      return
    }

    socket.emit("send message", {payload});
    setMessages([...messages, payload]);
    newMessage.current.value = "";
  };

  const MessageList = messages.map((msg, i) => {
    return (
      <div key={i} className="overflow-y-auto" ref={scrollRef}>
        <Chatbox message={msg}/>
      </div>
    );
  });

  return (
    <>
      {/* <Announce msg={arriveMessage}/> */}
      <div className = "flex flex-col h-screen bg-cusblue-200 overflow-hidden">
        <h1 className="text-xl bg-cusgreen-200 text-center p-1">聊天室</h1>
        <div className = "relative flex-grow overflow-auto">
          { MessageList }
        </div>
        <div className="relative w-full flex p-2 mt-4 items-center bottom-0 bg-cusgreen-200">
          <textarea
            placeholder="write something..."
            ref={newMessage}
            className="h-auto resize-none flex-grow ml-4 rounded-md"
          ></textarea>
          <button onClick={handleSubmit} className="h-auto btn mr-4">
            Send
          </button>
        </div>
      </div>
    </>
  );
}