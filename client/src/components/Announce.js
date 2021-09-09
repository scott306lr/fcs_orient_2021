import { useEffect, useState } from "react";
import Chatbox from "./Chatbox";


export default function Announce(props) {
  const [curMessage, setCurMessage] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show || curMessage?.role !== "SYSTEM" || props.msg?.role === "SYSTEM"){
      setCurMessage(props.msg); 
    }
  }, [props.msg]);

  useEffect(() => {
    const showCount = (curMessage?.role === "SYSTEM") ? 60000 : 5000;

    setShow(true);
    const assetID = setTimeout(() => {
      setShow(false);
    }, showCount);
    
    return () => clearTimeout(assetID);
  }, [curMessage]);
  
  const vis = (show) ? "visible" : "invisible";
  
  return (
    <div class={vis}>
      <Chatbox message={curMessage}/>
    </div>
  );
}