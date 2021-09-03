import Scoreboard from "../components/Scoreboard";

export default function Score(props) {
    const teamList = [
        {
            teamID: "一小",
            gold: 1,
            silver: 1,
            bronze: 1,
            iron: 1,
            score: 10,
        },
        {
            teamID: "team2",
            gold: 2,
            silver: 2,
            bronze: 2,
            iron: 2,
            score: 10,
        },
        {
            teamID: "team3",
            gold: 3,
            silver: 3,
            bronze: 3,
            iron: 3,
            score: 10,
        },
    ];
    const iterTeam = teamList.map((teamJSON) => {
        return (
            <div class="max-w-prose mx-auto bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden">
                {/* <div class="md:flex"> */}
                    <div class="p-8">
                        <Scoreboard team={teamJSON.teamID} gold={teamJSON.gold} silver={teamJSON.silver} bronze={teamJSON.bronze} iron={teamJSON.iron} score={teamJSON.score}/>
                    </div>
                {/* </div> */}
            </div>                
        );
    });
    return (
        <div class="m-4">
            <h2>計分榜</h2>
            <div id="scoreList" class="space-y-4">
                {iterTeam}
            </div>
        </div>
    );
}