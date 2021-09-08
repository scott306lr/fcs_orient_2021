import { useEffect, useState } from "react";
import Chatbox from "./Chatbox";


export default function Announce(props) {
  const [curMessage, setCurMessage] = useState();
  const [block, setBlock] = useState(false);

  useEffect(() => {
    if (curMessage?.role === "SYSTEM"){
      setBlock(true);
      
      const assetID = setTimeout(() => {
        setBlock(false);
      }, 60000);
      return clearTimeout(assetID);
    }
  }, [curMessage]);

  useEffect(() => {
    props.msg?.role === "SYSTEM" || !block && setCurMessage(props.msg);  
  }, [props.msg]);
  
  return (
    <div>
      <Chatbox message={arriveMessage}/>
    </div>
  );
}