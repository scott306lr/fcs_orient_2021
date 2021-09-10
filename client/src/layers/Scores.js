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
  const [tasksDone, setTasksDone] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamScore, setTeamScore] = useState({});

  useEffect(() => {
    const fetchData = async() => {
      try {
        const initScore = {gold: 0, silver: 0, bronze: 0, iron: 0, score: 0 };
        const team_res = await axios.get("/team");
        const dtask_res = await axios.get("/doneTask");
        team_res.data.map( (team) => (setTeamScore((prev) => ({...prev, [team._id]: initScore}))) );

        setTeams(team_res.data);
        setTasksDone(dtask_res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    loadScore(tasksDone);
  }, [tasksDone]);

  useEffect(() => {
    socket.on("update record", (doneTask) => {
      console.log(doneTask)
      setTasksDone((prev) => [...prev, doneTask]);
      //addScore(doneTask.teamId, doneTask)
    })
  }, [socket]);

  const loadScore = (tasksDone) => {
    // call doneTasks
    tasksDone.map( (doneTask) => {
      addScore(doneTask);
    });
  }

  const addScore = (doneTask) => {
    var toUpdate = teamScore[doneTask.teamId];
    //console.log(toUpdate)
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
    setTeamScore((prev) => ({...prev, [doneTask.teamId]: toUpdate}) );

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
    if (!scoreA || !scoreB) return 0;

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

  const iterList = teams.sort(compareRank).map((team, i) => {
    return (
      <div className="max-w-prose mx-auto rounded-xl shadow-md hover:shadow-xl p-8" key = {"score_" + team._id} style = {{background: i == 0 ? "#ffe552": i == 1 ? "#cdcdcd": i == 2 ? "#d28c47": "white"}}>
        <Scoreboard teamId={team._id} teamName={team.teamName} gold={teamScore[team._id].gold} silver={teamScore[team._id].silver} bronze={teamScore[team._id].bronze} iron={teamScore[team._id].iron} score={teamScore[team._id].score}/>
      </div>                
    );
  })
  
  return (
    <div className="w-full overflow-hidden bg-cusorange-500">
      <h2 className="m-4 text-2xl overflow-hidden text-center">計分榜 {gamestatus.board_freeze ? "*Frozen*" : ""}</h2>
      <div className="max-w-prose mx-auto p-8">
        <div className="grid grid-cols-6 place-items-center">
          <div className="text-center align-middle uppercase font-bold">team</div>
          <div className="text-center align-middle">
            <img src={gmadal} alt="gold" className="h-8" />
          </div>
          <div className="text-center align-middle">
            <img src={smadal} alt="silver" className="h-8" />
          </div>
          <div className="text-center align-middle">
            <img src={bmadal} alt="bronze" className="h-8" />
          </div>
          <div className="text-center align-middle">
            <img src={imadal} alt="iron" className="h-8" />
          </div>
          <div className="text-center align-middle uppercase font-bold">score</div>
        </div>
      </div>
      <FlipMove id="scoreList" className="space-y-4" enterAnimation='accordionVertical'
        leaveAnimation='accordionVertical'>
        {iterList}
      </FlipMove>
      <button onClick = {() => {addScore(doneTask.teamId, doneTask)}}>Update</button>
    </div>
  );
}