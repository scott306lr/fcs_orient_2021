import { useContext, useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import { AuthContext } from "../context/AuthContext";

const teamsJSON = [
  {teamID: 1, name: "haha1"}, 
  {teamID: 2, name: "haha2"},
  {teamID: 3, name: "haha3"},
  {teamID: 4, name: "haha4"},
  {teamID: 5, name: "haha5"},
  {teamID: 6, name: "haha6"},
]

const teamListJSON = [
  {
    team: 1,
    gold: 1,
    silver: 1,
    bronze: 1,
    iron: 1,
    score: 10,
  },
  {
    team: 2,
    gold: 1,
    silver: 1,
    bronze: 1,
    iron: 1,
    score: 10,
  },
  {
    team: 3,
    gold: 2,
    silver: 2,
    bronze: 2,
    iron: 2,
    score: 10,
  },
  {
    team: 4,
    gold: 3,
    silver: 3,
    bronze: 3,
    iron: 3,
    score: 10,
  },
];

const tasksDoneJSON = [
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

  const {socket, user} = useContext(AuthContext);
  const [tasksDone, setTasksDone] = useState(tasksDoneJSON);
  const [teamList, setTeamList] = useState(teamListJSON);

  useEffect(() => {
    socket.on("update tasks", (newTasks) => {
      setTasksDone([...tasksDone, ...newTasks]);
      setTeamList([]);
    })
  }, [socket, teamList]);

  const iterTeam = teamList.map((teamJSON) => {
    return (
      <div class="max-w-prose mx-auto bg-white rounded-xl shadow-md hover:shadow-xl">
        {/* <div class="md:flex"> */}
          <div class="p-8">
            <Scoreboard team={teamJSON.team} gold={teamJSON.gold} silver={teamJSON.silver} bronze={teamJSON.bronze} iron={teamJSON.iron} score={teamJSON.score}/>
          </div>
        {/* </div> */}
      </div>                
    );
  });
  
  return (
    <div class="p-4 w-full overflow-hidden">
      <h2>計分榜</h2>
      <div id="scoreList" class="space-y-4">
        {iterTeam}
      </div>
    </div>
  );
}