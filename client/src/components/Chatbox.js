export default function Chatroom(props) {
  return (
    <li>
      --{props.message.role}-- {props.message.name}: {props.message.text}
    </li>
  );
}