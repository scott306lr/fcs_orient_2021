import { useContext, useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

import gmadal from '../img/medal-1.svg';
import smadal from '../img/medal-2.svg';
import bmadal from '../img/medal-3.svg';
import imadal from '../img/medal-4.svg';

const teamsJSON = [
  {teamID: 1, name: "haha1", gold: "3", silver: "7", bronze: "3", iron: "2", score:"41"}, 
  {teamID: 2, name: "haha2", gold: "1", silver: "7", bronze: "3", iron: "2", score:"33"},
  {teamID: 3, name: "haha3", gold: "2", silver: "7", bronze: "3", iron: "4", score:"31"},
  {teamID: 4, name: "haha4", gold: "1", silver: "1", bronze: "1", iron: "1", score:"10"},
  {teamID: 5, name: "haha5", gold: "2", silver: "2", bronze: "3", iron: "4", score:"500"},
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

  function compareRank(a, b) {
    if (a.score != b.score)
      return parseInt(a.score) > parseInt(b.score);
    if (a.gold != b.gold)
      return parseInt(a.gold) > parseInt(b.gold);
    if (a.silver != b.silver)
      return parseInt(a.silver) > parseInt(b.silver);
    if (a.bronze != b.bronze)
      return parseInt(a.bronze) > parseInt(b.bronze);
    return parseInt(a.teamID) < parseInt(b.teamID);
  }

  function getTeamById(id) {
    return teamsJSON.find(teamJSON => {
      return teamJSON.teamID == id;
    });
  }

  const {socket, user} = useContext(AuthContext);
  const [teams, setTeams] = useState(teamsJSON);
  /*
  const [ranking, setRanking] = useState([...Array(6).keys()].map(id => id + 1).map(id => {
    try {
      const res = axios.get("/teamTask/" + id);
      setTeams(res.data);
    } catch (err) {
      console.log(err);
    }
  }).sort(compareRank).map(teamJSON => teamJSON.teamID));
  */

  const [ranking, setRanking] = useState(teamsJSON.sort(compareRank).map(teamJSON => teamJSON.teamID));

  useEffect(() => {
    socket.on("update score", (team, doneTask) => {

      // push to record
      
      // if not freezed
      
      const doneTeam = getTeamById(team);

      if (doneTask.score == 4)
        doneTeam.gold += 1;
      else if (doneTask.score == 3)
        doneTeam.silver += 1;
      else if (doneTask.score == 2)
        doneTeam.bronze += 1;
      else
        doneTeam.iron += 1;
      doneTeam.score += doneTask.score;

      var newRank = ranking;
      var rank = teamsJSON.findIndex(rankID => (rankID == team));
      while (rank > 0 && compareRank(getTeamById(newRank[rank]), getTeamById(newRank[rank - 1]))) {
        [newRank[rank], newRank[rank - 1]] = [newRank[rank - 1], newRank[rank]];
        rank -= 1;
      }
      if (newRank != ranking)
        setRanking(newRank);
      console.log("updating score!");
    });

    console.log(10);

    ranking.forEach((id, i) => {
      document.getElementById("score_" + id).style.order = 5 - i; 
      console.log(5 - i);
    });
  }, [socket, ranking]);

  const iterTeam = teams.map((teamJSON) => {
    return (
      <div class="transition-all max-w-prose mx-auto bg-white rounded-xl shadow-md hover:shadow-xl" id = {"score_" + teamJSON.teamID}>
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
      <h2 class="text-2xl overflow-hidden text-center">計分榜</h2>
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
          <div class="text-center align-middle uppercase font-bold">score</div>
        </div>
      </div>
      <div id="scoreList" class="space-y-4">
        {iterTeam}
      </div>
    </div>
  );
}