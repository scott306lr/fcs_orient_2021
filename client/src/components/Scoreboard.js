export default function ScoreBoard(props) {
  return (
    <div class="grid grid-cols-6 place-items-center">
      <div class="text-center align-middle uppercase font-bold">{props.teamName}</div>
      <Scoreitem text={props.gold} />
      <Scoreitem text={props.silver} />
      <Scoreitem text={props.bronze} />
      <Scoreitem text={props.iron} />
      <Scoreitem text={props.score} />
    </div>
  );
}

function Scoreitem(props) {
  return (
    <div class="text-center align-middle">{props.text}</div>
  );
}