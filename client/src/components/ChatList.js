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
      <motion.li 
        className="py-2 px-1 rounded" 
        key={i} 
        ref={scrollRef} 
        variants={variants}
      > 
        <Chatbox message={msg}/>
      </motion.li>
    );
  });


  return (
    
    <motion.div className="fixed flex flex-col h-screen w-full left-0 top-0">
      <motion.div className="bg-yellow-500 p-4 flex flex-col h-full w-full place-items-center overflow-y-auto overflow-x-hidden">
        <motion.div className="bg-blue-500 flex flex-col w-full place-items-center overflow-y-auto overflow-x-hidden">
          <motion.ul className="bg-red-300 flex flex-col mx-4" >
            {MessageList}
          </motion.ul>
        </motion.div>
      </motion.div>

      <motion.div className="flex w-full bottom-5" variants={input_vars}>
        <motion.textarea
          placeholder="write something..."
          ref={newMessage}
          className="h-auto resize-none flex-grow ml-4 my-2 rounded-md"
        ></motion.textarea>
        <motion.button onClick={handleSubmit} className="h-auto btn mr-4">
          Send
        </motion.button>
      </motion.div>
      
    </motion.div> 
  );
}