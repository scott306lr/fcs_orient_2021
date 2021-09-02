export default function ScoreBoard(props) {
    return (
        <div>
            <li>{props.team} {props.gold} {props.silver} {props.bronze} {props.iron} {props.score}</li>
        </div>
    );
}