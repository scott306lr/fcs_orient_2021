import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion"
import Chatbox from "../components/Chatbox";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function ChatList() {
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

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const input_vars = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    }
  }

  const MessageList = messages.map((msg, i) => {
    return (
      <motion.li key={i} ref={scrollRef} > 
        <Chatbox message={msg}/>
      </motion.li>
    );
  });


  return (
    <>
      <motion.ul className="fixed flex flex-col top-20 left-20" variants={variants}>
        {MessageList}
      </motion.ul>
      
      
      <motion.div className="fixed flex w-full bottom-5" variants={input_vars}>
      {/* { messages.length } */}
        <motion.textarea
          placeholder="write something..."
          ref={newMessage}
          className="h-auto resize-none flex-grow ml-4 rounded-md"
        ></motion.textarea>
        <motion.button onClick={handleSubmit} className="h-auto btn mr-4">
          Send
        </motion.button>
      </motion.div>
    </>
  );
}