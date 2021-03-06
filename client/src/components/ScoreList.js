import { useContext, useEffect, useState, useCallback } from "react";
import Scoreboard from "./Scoreboard";

import { AuthContext } from "../context/AuthContext";
import FlipMove from 'react-flip-move';
import axios from "axios";

import gmadal from '../assets/img/medal-1.svg';
import smadal from '../assets/img/medal-2.svg';
import bmadal from '../assets/img/medal-3.svg';
import imadal from '../assets/img/medal-4.svg';


export default function Score(props) {
  const {socket, user, gamestatus} = useContext(AuthContext);
  const [ufcount, setUfCount] = useState(0);
  const [tasksDone, setTasksDone] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamScore, setTeamScore] = useState([]);
  const [ownScore, setOwnScore] = useState(0);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const team_res = await axios.get("/backend/team");
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
    socket.on("update record", (doneTask) => {
      setTasksDone((prev) => [...prev, doneTask]);
    })

    socket.on("ufCount update", (cnt) => {
      setUfCount(cnt);
    })
  }, [socket]);

  const loadOwnScore = useCallback( (tasksDone) => {
    var team_score = 0;

    tasksDone.forEach( (doneTask) => {
      if (doneTask.teamId === user.teamId)
        team_score += doneTask.score;
    });

    return team_score;
  }, [user.teamId])

  const loadScore = useCallback( (tasksDone) => {
    var team_score = initTeamScore(teams);
    var over_cnt = 0;

    tasksDone.forEach( (doneTask) => {
      if (!gamestatus.board_freeze || doneTask.updatedAt <= gamestatus.freeze_time)
        addScore(team_score, doneTask);
      else if (over_cnt < ufcount) {
        addScore(team_score, doneTask);
        over_cnt += 1;
      }
    });

    return Object.values(team_score).sort(compareRank);
  }, [gamestatus, ufcount, teams])

  useEffect(() => {
    setTeamScore(loadScore(tasksDone));
    setOwnScore(loadOwnScore(tasksDone));
  }, [tasksDone, loadScore, loadOwnScore]);

  const initTeamScore = (teams) => {
    var team_score = {};
    teams.forEach( (team) => team_score[team._id] = {_id: team._id, teamName: team.teamName, teamEmoji: team.teamEmoji, gold: 0, silver: 0, bronze: 0, iron: 0, score: 0 });
    return team_score;
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
      default:
        break;
    }
    team_score[doneTask.teamId].score += doneTask.score;
  };
  
  const compareRank = (a, b) => {
    if (a.score !== b.score)
      return b.score - a.score;
    if (a.gold !== b.gold)
      return b.gold - a.gold;
    if (a.silver !== b.silver)
      return b.silver - a.silver;
    if (a.bronze !== b.bronze)
      return b.bronze - a.bronze;
    if (a.iron !== b.iron)
      return b.iron - a.iron;
    return 0;
  }

  const iterList = teamScore.map((ts, i) => {
    return (
      <div className={`max-w-prose h-24 m-auto rounded-xl shadow-md hover:shadow-xl p-4 ${ts._id === user.teamId && "ring-4 ring-red-700"}`} key = {"score_" + ts._id} style = {{background: i === 0 ? "#ffe552" : "white"}}>
        <Scoreboard teamEmoji={ts.teamEmoji} teamId={ts._id} teamName={ts.teamName} gold={ts.gold} silver={ts.silver} bronze={ts.bronze} iron={ts.iron} score={ts.score}/>
      </div>                
    );
  })
  
  return (
    <div className="fixed left-0 top-0 flex flex-col h-screen w-full overflow-hidden bg-cusorange-500">
      <h2 className="m-4 text-2xl text-center">????????? {gamestatus.board_freeze ? "*Frozen*" : ""}</h2>

      <div className="w-full mx-auto p-8">
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
      <div className="flex flex-col w-full h-full p-5">
        <FlipMove id="scoreList" className="space-y-4" enterAnimation='accordionVertical'
          leaveAnimation='accordionVertical'>
          {iterList}
        </FlipMove>
      </div>

      <h3 className="m-4 text-2xl text-center">???????????????{ownScore}</h3>
    </div>
  );
}