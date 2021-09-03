import Tasks from "./Tasks";
import Scores from "./Scores";
import Map from "../components/Map";

export default function Member() {
  return (
    <div>
      <Map />
      <Tasks />
      <Scores />
    </div>
  );
}