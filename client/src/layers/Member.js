import Tasks from "./Tasks";
import Scores from "./Scores";

export default function Member() {
  return (
    <div>
      <h1>FCS ORIENTING 2021</h1>
      <div id = "topBar">
        <button>Chatroom</button>
        <button>Scoreboard</button>
      </div>
      <Tasks />
      <Scores />
    </div>
  );
}