import Timer from "./Timer";
import React from "react";

export default function Pomodoro() {

  const [timerState, setTimerState] = React.useState(false);
  const [time, setTime] = React.useState(40);


  function startTimer() {
    setTimerState(prev => !prev);
  }

  return (
    <div className="pomodoro">
      <h1>Pomodoro</h1>
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <button onClick={()=>setTime(40)}>Pomodoro</button>
        <button onClick={()=>setTime(10)}>Short break</button>
        <button onClick={()=>setTime(15)}>Long break</button>
      </div>
      <Timer timerState={timerState} time={time} />
      <button onClick={startTimer}>Start</button>
    </div>
  );
}
