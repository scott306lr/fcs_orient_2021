import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Chatbox from "./Chatbox";


export default function Announce() {
  const {socket} = useContext(AuthContext);
  const [arriveMessage, setArriveMessage] = useState({name: "WELCOME", content: "Welcome to FCS Orienting!"});
  const [curMessage, setCurMessage] = useState();
  const [show, setShow] = useState(false);
  useEffect(() => {
    socket.on("recieve announce", (payload) => {
      setArriveMessage(payload);
    })
  }, [socket])
  useEffect(() => {
    if (!show || curMessage?.role !== "SYSTEM" || arriveMessage?.role === "SYSTEM"){
      setCurMessage(arriveMessage); 
    }
  }, [show, curMessage, arriveMessage]);

  useEffect(() => {
    const showCount = (curMessage?.role === "SYSTEM") ? 60000 : 5000;

    setShow(true);
    const assetID = setTimeout(() => {
      setShow(false);
    }, showCount);
    
    return () => clearTimeout(assetID);
  }, [curMessage]);
  
  return (
    <div className={`h-8 w-full place-items-center ${show ? "visible" : "invisible"}`}>
      <Chatbox message={curMessage} mode={"ANNOUNCE"}/>
    </div>
  );
}