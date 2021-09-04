export default function ScoreBoard(props) {
  return (
    <div class="flex">
      <div class="flex-1 text-center align-middle uppercase font-bold">{props.team}</div>
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
    <div class="flex-1 text-center align-middle">{props.text}</div>
  );
}