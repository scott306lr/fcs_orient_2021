import { useContext, useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import { AuthContext } from "../context/AuthContext";
import FlipMove from 'react-flip-move';
import axios from "axios";

import gmadal from '../img/medal-1.svg';
import smadal from '../img/medal-2.svg';
import bmadal from '../img/medal-3.svg';
import imadal from '../img/medal-4.svg';


export default function Score(props) {
  const {socket, user, gamestatus} = useContext(AuthContext);
  const [tasksDone, setTasksDone] = useState([""]);
  const [teams, setTeams] = useState([""]);
  const [teamScore, setTeamScore] = useState([""]);

  const initTeamScore = (teams) => {
    var team_score = {};
    teams.forEach( (team) => team_score[team._id] = {_id: team._id, teamName: team.teamName, gold: 0, silver: 0, bronze: 0, iron: 0, score: 0 });
    return team_score;
  }

  useEffect(() => {
    const fetchData = async() => {
      try {
        const team_res = await axios.get("/backend/team");
        //setTeamScore(initTeamScore(team_res.data));
        setTeams(team_res.data);

        const dtask_res = await axios.get("/backend/doneTask");
        setTasksDone(dtask_res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setTeamScore(loadScore(tasksDone));
    console.log("notice me")
    console.log(loadScore(tasksDone))
    console.log(loadScore(tasksDone).sort(compareRank));
  }, [tasksDone]);

  // useEffect(() => {
  //   setTSList(Object.values(teamScore));
  // }, [teamScore]);

  useEffect(() => {
    socket.on("update record", (doneTask) => {
      setTasksDone((prev) => [...prev, doneTask]);
      //addScore(doneTask.teamId, doneTask)
    })
  }, [socket]);

  const loadScore = (tasksDone) => {
    var team_score = initTeamScore(teams);
    tasksDone.map( (doneTask) => {
      addScore(team_score, doneTask);
    });
    //console.log(Object.values(team_score));
    //return JSON.parse(team_score)
    console.log("!")
    console.log(team_score)
    const scoreAll = Object.keys(team_score).map((key) => team_score[key]).sort(compareRank);
    const scores = Object.keys(team_score).map((key) => team_score[key].score).sort((a, b) => b - a);
    console.log(scores);
    return scoreAll;
  }

  const addScore = (team_score, doneTask) => {
    switch (doneTask.score){
      case 4 :
        team_score[doneTask.teamId].gold += 1;
        break;
      case 3 :
        team_score[doneTask.teamId].silver += 1;
        break;
      case 2 :
        team_score[doneTask.teamId].bronze += 1;
        break;
      case 1 :
        team_score[doneTask.teamId].iron += 1;
        break;
    }
    team_score[doneTask.teamId].score += doneTask.score;
    // document.getElementById("score_" + teamId).style.zIndex = 
    //   toUpdate.score * 50 * 50 * 50 * 50 +
    //   toUpdate.gold * 50 * 50 * 50 +
    //   toUpdate.silver * 50 * 50 +
    //   toUpdate.bronze * 50 +
    //   toUpdate.iron;
  };

  const compareRank = (a, b) => {

    const scoreA = a.score;
    const scoreB = b.score;
    // if (!scoreA || !scoreB) return 0;

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

  const iterList = teamScore.map((ts, i) => {
    return (
      <div className="max-w-prose mx-auto rounded-xl shadow-md hover:shadow-xl p-8" key = {"score_" + ts._id} style = {{background: i == 0 ? "#ffe552": i == 1 ? "#cdcdcd": i == 2 ? "#d28c47": "white"}}>
        <Scoreboard teamId={ts._id} teamName={ts.teamName} gold={ts.gold} silver={ts.silver} bronze={ts.bronze} iron={ts.iron} score={ts.score}/>
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
      <button onClick = {() => {console.log(tasksDone);
        console.log(tasksDone.length)}}>Test log</button>
    </div>
  );
}