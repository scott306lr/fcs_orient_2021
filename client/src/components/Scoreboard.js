export default function ScoreBoard(props) {
  return (
    <div className="grid grid-cols-6 place-items-center">
      <div className="text-center align-middle uppercase font-bold m-auto"><div>{props.teamEmoji}</div>{props.teamName}</div>
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
    <div className="text-center align-middle">{props.text}</div>
  );
}