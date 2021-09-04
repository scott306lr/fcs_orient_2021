export default function ScoreBoard(props) {
  return (
    <div class="flex">
      <div class="flex-1 text-center align-middle uppercase font-bold">{props.team}</div>
      <div class="flex-1 text-center align-middle">{props.gold}</div>
      <div class="flex-1 text-center align-middle">{props.silver}</div>
      <div class="flex-1 text-center align-middle">{props.bronze}</div>
      <div class="flex-1 text-center align-middle">{props.iron}</div>
      <div class="flex-1 text-center align-middle">{props.score}</div>
    </div>
  );
}