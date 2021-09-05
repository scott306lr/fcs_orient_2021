import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Chatbox from "../components/Chatbox";


export default function Announce(props) {
  const {socket, user} = useContext(AuthContext);

  const [curMessage, setCurMessage] = useState();
  const [arriveMessage, setArriveMessage] = useState();
  const [block, setBlock] = useState(false);

  useEffect(() => {
    if (curMessage?.role === "ANNOUNCE"){
      setBlock(true);
      
      const assetID = setTimeout(() => {
        setBlock(false);
      }, 60000);
      return clearTimeout(assetID);
    }
  }, [curMessage]);

  useEffect(() => {
    arriveMessage?.role === "ANNOUNCE" || !block && setCurMessage(arriveMessage);  
  }, [arriveMessage]);

  useEffect(() => {
    socket.on("recieve message", (payload) => {
      console.log("payload");
      setArriveMessage(payload);
    })
  }, [socket]);
  
  return (
    <div>
      {/* <Chatbox message={arriveMessage}/> */}
    </div>
  );
}