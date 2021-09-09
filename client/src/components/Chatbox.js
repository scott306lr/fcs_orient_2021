export default function Chatbox(props) {
  return (
    <div> 
      <div class="text-sm text-gray-400">{props.message?.role}</div>
      <div class="space-x-4">
        <div class="inline-block">{props.message?.name}</div>
        <div class="mx-2
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