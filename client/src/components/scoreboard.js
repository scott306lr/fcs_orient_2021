function Score(props) {
    const score = props.gold * 4 + props.silver * 3 + props.bronze * 2 + props.iron;
    return <li>{props.team} {props.gold} {props.silver} {props.bronze} {props.iron} {score} </li>;
}

export default function ScoreBoard() {
    return (
        <div>
            <Score team="team1" gold="1" silver="2" bronze="1" iron="0" />
            <Score team="team2" gold="3" silver="1" bronze="3" iron="2" />
            <Score team="team3" gold="5" silver="0" bronze="0" iron="2" />
        </div>
    );
}