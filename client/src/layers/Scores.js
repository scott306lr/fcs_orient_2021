import Scoreboard from "../components/Scoreboard";

export default function Score(props) {
    const teamList = [
        {
            teamID: "team1",
            gold: 1,
            silver: 1,
            bronze: 1,
            iron: 1,
        },
        {
            teamID: "team2",
            gold: 2,
            silver: 2,
            bronze: 2,
            iron: 2,
        },
        {
            teamID: "team3",
            gold: 3,
            silver: 3,
            bronze: 3,
            iron: 3,
        },
    ];
    const iterTeam = teamList.map((teamJSON) => {
        return (
          <div>
            <Scoreboard team={teamJSON.teamID} gold={teamJSON.gold} silver={teamJSON.silver} bronze={teamJSON.bronze} iron={teamJSON.iron}/>
          </div>
        );
    });
    return (
        <div>
            <h3>計分榜</h3>
            <div id="scoreList">
                {iterTeam}
            </div>
        </div>
    );
}