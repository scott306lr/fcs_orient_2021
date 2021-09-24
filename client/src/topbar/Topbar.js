import { useState } from "react";
import ChatBubble from "../layers/ChatBubble";
import ScoreBubble from "../layers/ScoreBubble";
// import Example from "../test/Example";
export default function Topbar() {
  const [bubbleOpen, setBubbleOpen] = useState(false);

  return (
    <div className="flex space-x-2 sticky top-2 px-2 z-50">
      <ChatBubble isOpen={bubbleOpen} setIsOpen={setBubbleOpen} />
      <ScoreBubble isOpen={bubbleOpen} setIsOpen={setBubbleOpen} />  
    </div>
  );
}