import { useContext, useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import { AuthContext } from "../context/AuthContext";
import FlipMove from 'react-flip-move';
import axios from "axios";

import gmadal from '../img/medal-1.svg';
import smadal from '../img/medal-2.svg';
import bmadal from '../img/medal-3.svg';
import imadal from '../img/medal-4.svg';

// const teamsJSON = [
//   {teamID: 1, name: "haha1", gold: "3", silver: "7", bronze: "3", iron: "2", score:"41"}, 
//   {teamID: 2, name: "haha2", gold: "1", silver: "7", bronze: "3", iron: "2", score:"33"},
//   {teamID: 3, name: "haha3", gold: "2", silver: "7", bronze: "3", iron: "4", score:"31"},
//   {teamID: 4, name: "haha4", gold: "1", silver: "1", bronze: "1", iron: "1", score:"10"},
//   {teamID: 5, name: "haha5", gold: "2", silver: "2", bronze: "3", iron: "4", score:"500"},
//   {teamID: 6, name: "haha6", gold: "8", silver: "8", bronze: "8", iron: "8", score:"80"},
// ]
const teamsJSON = [
  {_id: "1", teamName: "haha1"},
  {_id: "2", teamName: "haha2"},
  {_id: "3", teamName: "haha3"},
  {_id: "4", teamName: "haha4"},
  {_id: "5", teamName: "haha5"},
  {_id: "6", teamName: "haha6"},
]

const teamScoreJSON = {
  "1": {gold: 0, silver: 0, bronze: 0, iron: 0, score:0}, 
  "2": {gold: 0, silver: 0, bronze: 0, iron: 0, score:0},
  "3": {gold: 0, silver: 0, bronze: 0, iron: 0, score:0},
  "4": {gold: 0, silver: 0, bronze: 0, iron: 0, score:0},
  "5": {gold: 0, silver: 0, bronze: 0, iron: 0, score:0},
  "6": {gold: 0, silver: 0, bronze: 0, iron: 0, score:0},
} // LR: we can get teams list by api to show html, then call this JSON by using teamID in list.

const tasksDoneJSON = [
  {
    time:"21:34",
    teamId:"1",
    taskId:"9",
    score:4,
  },
  {
    time:"21:35",
    teamId:"2",
    taskId:"8",
    score:4,
  },
  {
    time:"21:34",
    teamId:"1",
    taskId:"8",
    score:3,
  },
  {
    time:"21:34",
    teamId:"1",
    taskId:"3",
    score:4,
  },
  {
    time:"21:34",
    teamId:"3",
    taskId:"3",
    score:3,
  },
  {
    time:"21:34",
    teamId:"2",
    taskId:"9",
    score:3,
  },
  {
    time:"21:34",
    teamId:"4",
    taskId:"3",
    score:2,
  },
]

const doneTask = {
  time:"21:34",
  teamId:"6",
  taskId:"9",
  score:4,
};


export default function Score(props) {
  const {socket, user, gamestatus} = useContext(AuthContext);
  const [teams, setTeams] = useState(teamsJSON);
  const [teamScore, setTeamScore] = useState(teamScoreJSON);

  function loadScore() {
    // call doneTasks
    tasksDoneJSON.forEach(doneTask => {
      addScore(doneTask.teamId, doneTask);
    });
  }

  useEffect( async() => {
    // try {
    //   const res = await axios.get("/team");
    //   setTeams(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
    setTeams(teamsJSON);
    loadScore();

  }, []);

  // useEffect(() => {
    
  // }, [socket]);

  const addScore = (teamId, doneTask) => {
    var toUpdate = teamScore[teamId];
    switch (doneTask.score){
      case 4 :
        toUpdate.gold += 1;
        break;
      case 3 :
        toUpdate.silver += 1;
        break;
      case 2 :
        toUpdate.bronze += 1;
        break;
      case 1 :
        toUpdate.iron += 1;
        break;
    }
    toUpdate.score += doneTask.score;
    setTeamScore((prev) => ({...prev, [teamId]: toUpdate}) );

    // console.log("score_" + teamId);
    
    // document.getElementById("score_" + teamId).style.zIndex = 
    //   toUpdate.score * 50 * 50 * 50 * 50 +
    //   toUpdate.gold * 50 * 50 * 50 +
    //   toUpdate.silver * 50 * 50 +
    //   toUpdate.bronze * 50 +
    //   toUpdate.iron;
  };


  const compareRank = (a, b) => {
    const scoreA = teamScore[a._id];
    const scoreB = teamScore[b._id];
    if (scoreA.score != scoreB.score)
      return scoreB.score - scoreA.score;
    if (scoreA.gold != scoreB.gold)
      return scoreB.gold - scoreA.gold;
    if (scoreA.silver != scoreB.silver)
      return scoreB.silver - scoreA.silver;
    if (scoreA.bronze != scoreB.bronze)
      return scoreB.bronze - scoreA.bronze;
    if (scoreA.iron != scoreB.iron)
      return scoreB.iron - scoreA.iron;
    return a._id - b._id;
  }

  // const getTeamById = (id) => {
  //   return teamsJSON.find(teamJSON => {
  //     return teamJSON.teamID == id;
  //   });
  // }

  
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

  // const [ranking, setRanking] = useState(teamsJSON.sort(compareRank).map(teamJSON => teamJSON.teamID));

  // useEffect(() => {
  //   socket.on("update score", (teamId, doneTask) => {

  //     // push to record
      
  //     // if not freezed
      
  //     addScore(teamId, doneTask);

  //     var newRank = ranking;
  //     var rank = teamsJSON.findIndex(rankID => (rankID == team));
  //     while (rank > 0 && compareRank(getTeamById(newRank[rank]), getTeamById(newRank[rank - 1]))) {
  //       [newRank[rank], newRank[rank - 1]] = [newRank[rank - 1], newRank[rank]];
  //       rank -= 1;
  //     }
  //     if (newRank != ranking)
  //       setRanking(newRank);
  //     console.log("updating score!");
  //   });

  //   console.log(10);

  //   ranking.forEach((id, i) => {
  //     document.getElementById("score_" + id).style.order = 5 - i; 
  //     console.log(5 - i);
  //   });
  // }, [socket, ranking]);
  const iterList = teams.sort(compareRank).map((team, i) => {
    return (
      <div class="max-w-prose mx-auto rounded-xl shadow-md hover:shadow-xl p-8" key = {"score_" + team._id} style = {{background: i == 0 ? "#ffd700": i == 1 ? "#c0c0c0": i == 2 ? "#cd7f32": "white"}}>
        <Scoreboard teamId={team._id} teamName={team.teamName} gold={teamScore[team._id].gold} silver={teamScore[team._id].silver} bronze={teamScore[team._id].bronze} iron={teamScore[team._id].iron} score={teamScore[team._id].score}/>
      </div>                
    );
  })
  
  return (
    <div class="p-4 w-full overflow-hidden bg-cusorange-500">
      <h2 class="text-2xl overflow-hidden text-center">計分榜 {gamestatus.board_freeze ? "*Frozen*" : ""}</h2>
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
      <FlipMove id="scoreList" class="space-y-4" enterAnimation='accordionVertical'
        leaveAnimation='accordionVertical'>
        {iterList}
      </FlipMove>
      <button onClick = {() => {addScore(doneTask.teamId, doneTask)}}>Update</button>
    </div>
  );
}