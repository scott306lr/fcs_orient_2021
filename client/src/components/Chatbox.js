export default function Chatroom(props) {
  return (
    <div>
      --{props.message.role}-- {props.message.name}: {props.message.text}
    </div>
  );
}