export default function Chatroom(props) {
  return (
    <div class="">
      <div class="text-sm text-gray-400">{props.message.role}</div>
      <div class="space-x-4">
        <div class="inline-block">{props.message.name}</div>
        <button class="inline-block py-1 px-2 rounded-full bg-green-300 focus:shadow-lg">{props.message.text}</button>
      </div>
    </div>
  );
}