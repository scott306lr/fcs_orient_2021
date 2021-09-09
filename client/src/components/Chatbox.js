export default function Chatbox(props) {
  return (
    <div> 
      <div className="text-sm text-gray-400">{props.message?.role}</div>
      <div className="space-x-4">
        <div className="inline-block">{props.message?.name}</div>
        <div className="mx-2
                    break-all
                    text-left
                    inline-block
                    py-1 px-2
                    rounded-md
                    bg-cusgreen-200
                    focus:shadow-lg"
        >{props.message?.content}</div>
      </div>
    </div>
  );
}