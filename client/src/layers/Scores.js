import { useContext, useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import { AuthContext } from "../context/AuthContext";

import gmadal from '../img/medal-1.svg';
import smadal from '../img/medal-2.svg';
import bmadal from '../img/medal-3.svg';
import imadal from '../img/medal-4.svg';

const teamsJSON = [
  {teamID: 1, name: "haha1", gold: "3", silver: "7", bronze: "3", iron: "2", score:"41"}, 
  {teamID: 2, name: "haha2", gold: "1", silver: "7", bronze: "3", iron: "2", score:"33"},
  {teamID: 3, name: "haha3", gold: "2", silver: "7", bronze: "3", iron: "4", score:"31"},
  {teamID: 4, name: "haha4", gold: "1", silver: "1", bronze: "1", iron: "1", score:"10"},
  {teamID: 5, name: "haha5", gold: "2", silver: "2", bronze: "3", iron: "4", score:"50"},
  {teamID: 6, name: "haha6", gold: "8", silver: "8", bronze: "8", iron: "8", score:"80"},
]

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
  const [teams, setTeams] = useState(teamsJSON);

  useEffect(() => {
    socket.on("update score", () => {
      //setTeams(axios);
      console.log("updating score!");
    })
  }, [socket]);

  const iterTeam = teams.map((teamJSON) => {
    return (
      <div class="max-w-prose mx-auto bg-white rounded-xl shadow-md hover:shadow-xl">
        {/* <div class="md:flex"> */}
          <div class="p-8">
            <Scoreboard team={teamJSON.teamID} gold={teamJSON.gold} silver={teamJSON.silver} bronze={teamJSON.bronze} iron={teamJSON.iron} score={teamJSON.score}/>
          </div>
        {/* </div> */}
      </div>                
    );
  });
  
  return (
    <div class="p-4 w-full overflow-hidden bg-cusorange-500">
      <h2 class="text-xl overflow-hidden">計分榜</h2>
      <div class="max-w-prose mx-auto p-8">
        <div class="grid grid-cols-6 place-items-center">
          <div class="text-center align-middle uppercase font-bold">team</div>
          <div class="text-center align-middle">
            <img src={gmadal} alt="gold" class="h-8" />
          </div>
          <div class="text-center align-middle">
            <img src={smadal} alt="silver" class="h-8" />
          </div>
          <div class="text-center align-middle">
            <img src={bmadal} alt="bronze" class="h-8" />
          </div>
          <div class="text-center align-middle">
            <img src={imadal} alt="iron" class="h-8" />
          </div>
          <div class="text-center align-middle">score</div>
        </div>
      </div>
      <div id="scoreList" class="space-y-4">
        {iterTeam}
      </div>
    </div>
  );
}