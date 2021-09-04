import Scoreboard from "../components/Scoreboard";

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

const taskDone = [
  {
    time:"21:34",
    who:"LR",
    team:1,
    taskID:9,
    score:4,
  },
  {
    time:"21:35",
    who:"WJ",
    team:2,
    taskID:8,
    score:4,
  },
  {
    time:"21:34",
    who:"LR",
    team:1,
    taskID:8,
    score:3,
  },
  {
    time:"21:34",
    who:"LR",
    team:1,
    taskID:3,
    score:4,
  },
  {
    time:"21:34",
    who:"UD",
    team:3,
    taskID:3,
    score:3,
  },
  {
    time:"21:34",
    who:"WJ",
    team:2,
    taskID:9,
    score:3,
  },
  {
    time:"21:34",
    who:"YC",
    team:4,
    taskID:3,
    score:2,
  },
]

export default function Score(props) {
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
    <div class={props.opened ? "m-4 w-1/2": "m-4"}>
      <h2>計分榜</h2>
      <div class="space-y-4">
        {iterTeam}
      </div>
    </div>
  );
}