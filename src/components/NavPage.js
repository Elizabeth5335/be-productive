import calendar from '../assets/calendar-amico.svg';
import music from '../assets/headphone-amico.svg';
import tasks from '../assets/board-amico.svg';
import clock from '../assets/time-management-cuate.svg';
import '../styles/NavPage.css';


export default function NavPage(props){

    return(
        <div className='nav'>
            <header>
                <h1 className="back-btn" onClick={props.toggleClick}>{'<==='} Back</h1>
            </header>

            <div className="instruments">
            <card>
                <img className="instrument-img" src={clock} alt="clock image"/>
                <h3>Pomodoro</h3>
            </card>
            <card>
                <img className="instrument-img" src={tasks} alt="task board image"/>
                <h3>To do list</h3>
            </card>
            <card>
                <img className="instrument-img" src={calendar} alt="calendar image"/>
                <h3>Calendar</h3>
            </card>
            <card>
                <img className="instrument-img" src={music} alt="headphones image"/>
                <h3>Music for concentration</h3>
            </card>

            </div>
            <footer>
            <a href="https://storyset.com/online">Online illustrations by Storyset</a>
            <a href="https://storyset.com/music">Music illustrations by Storyset</a>
            <a href="https://storyset.com/work">Work illustrations by Storyset</a>
            <a href="https://storyset.com/work">Work illustrations by Storyset</a>
            </footer>
        </div>
    )
}