import calendar from "../assets/calendar-amico.svg";
import music from "../assets/headphone-amico.svg";
import tasks from "../assets/board-amico.svg";
import clock from "../assets/time-management-cuate.svg";
import "../styles/NavPage.css";
import { Link } from "react-router-dom";

export default function NavPage(props) {
  return (
    <div className="nav">
      <header>
        <Link to="/">
          <h1 className="back-btn">{"<==="} Back</h1>
        </Link>
      </header>

      <div className="instruments">
        <Link to="/pomodoro">
          <card>
            <img className="instrument-img" src={clock} alt="clock image" />
            <h3>Pomodoro</h3>
          </card>
        </Link>
        <Link to="/todo">
          <card>
            <img
              className="instrument-img"
              src={tasks}
              alt="task board image"
            />
            <h3>To do list</h3>
          </card>
        </Link>
        <Link to="/calendar">
          <card>
            <img
              className="instrument-img"
              src={calendar}
              alt="calendar image"
            />
            <h3>Calendar</h3>
          </card>
        </Link>
        <Link to="/music">
          <card>
            <img
              className="instrument-img"
              src={music}
              alt="headphones image"
            />
            <h3>Music for concentration</h3>
          </card>
        </Link>
      </div>
      <footer>
        <a href="https://storyset.com/online">
          Online illustrations by Storyset
        </a>
        <a href="https://storyset.com/music">Music illustrations by Storyset</a>
        <a href="https://storyset.com/work">Work illustrations by Storyset</a>
        <a href="https://storyset.com/work">Work illustrations by Storyset</a>
      </footer>
    </div>
  );
}
