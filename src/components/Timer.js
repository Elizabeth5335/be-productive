import React, { useEffect, useState, useRef } from "react";

export default function Timer(props) {
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  React.useEffect(() => {
    setMinutes(props.time);
  }, [props.time]);

  const deadline = new Date(new Date().getTime() + props.time * 60000);

  const startTimer = () => {
    intervalRef.current = setInterval(() => getTime(deadline), 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!props.timerState) {
      pauseTimer();
    } else {
      startTimer();
    }

    return () => clearInterval(intervalRef.current);
  }, [props.timerState]);

  React.useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      props.switchTab();
    }
  }, [minutes, seconds]);

  const getTime = () => {
    const time = deadline.getTime() - Date.now();
    setMinutes(Math.floor(time / 1000 / 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  return (
    <div className="timer">
      <div
        className="timer"
        style={{ display: "flex", justifyContent: "center" }}
        role="timer"
      >
        <div id="minute">{minutes < 10 ? "0" + minutes : minutes}</div>:
        <div id="second">{seconds < 10 ? "0" + seconds : seconds}</div>
      </div>
    </div>
  );
}
