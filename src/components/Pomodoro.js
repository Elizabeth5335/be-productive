import { Link } from "react-router-dom";
import Timer from "./Timer";
import React from "react";
import { ref, onValue, update } from "firebase/database";

import "../styles/Pomodoro.css";

const defaultState = {
  pomodoro: 40,
  shortBreak: 10,
  longBreak: 15,
};
export default function Pomodoro(props) {
  const user = "admin";

  const timerRef = ref(props.database, "users/" + user + "/pomodoro");

  const [pomodoro, setPomodoro] = React.useState(40);
  const [shortBreak, setShortBreak] = React.useState(10);
  const [longBreak, setLongBreak] = React.useState(50);

  React.useEffect(() => {
    onValue(timerRef, (snapshot) => {
      setPomodoro(snapshot.val().pomodoro);
      setShortBreak(snapshot.val().shortBreak);
      setLongBreak(snapshot.val().longBreak);
    });
  }, []);

  const [timerState, setTimerState] = React.useState(false);

  function startTimer() {
    setTimerState((prev) => !prev);
  }

  const [currentTab, setCurrentTab] = React.useState("1");
  const tabs = [
    {
      id: 1,
      tabTitle: "Pomodoro",
      time: pomodoro,
      content: "Time to focus",
    },
    {
      id: 2,
      tabTitle: "Short break",
      time: shortBreak,
      content: "Time to break",
    },
    {
      id: 3,
      tabTitle: "Long break",
      time: longBreak,
      content: "Time to break",
    },
  ];

  const [counter, setCounter] = React.useState(0);

  function switchTab() {
    switch (currentTab) {
      case "1":
        counter < 3 ? setCurrentTab("2") : setCurrentTab("3");
        counter === 3 ? setCounter(0) : setCounter((prev) => prev + 1);
        break;
      case "2":
        setCurrentTab("1");
        break;
      case "3":
        setCurrentTab("1");
        break;
    }
    console.log(currentTab);
    setTimerState(false);
  }

  function handleTabClick(e) {
    setCurrentTab(e.target.id);
    setTimerState(false);
  }

  return (
    <>
      <Link to="/nav">
        <h1 className="back-btn">{"<==="} Back</h1>
      </Link>
      <h1>Pomodoro</h1>

      {pomodoro >= 0 && longBreak && shortBreak && (
        <div className="pomodoro">
          <div className="container">
            <div className="tabs">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  id={tab.id}
                  disabled={currentTab === `${tab.id}`}
                  onClick={handleTabClick}
                >
                  {tab.tabTitle}
                </button>
              ))}
            </div>
            <div className="content">
              {tabs.map((tab, i) => (
                <div key={tab.id} >
                  {currentTab === `${tab.id}` && (
                    <div className="tab-content">
                      <Timer
                        timerState={timerState}
                        time={tab.time}
                        switchTab={switchTab}
                      />
                      <button className="pomodoro-btn" onClick={startTimer}>
                        {!timerState ? "Start" : "Pause"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="settings">
            <h2>Settings</h2>
            <form className="pomodoro-form">
              <label htmlFor="pomodoro">Pomodoro:</label>
              <input
                id="pomodoro"
                value={pomodoro}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    update(timerRef, {
                      pomodoro: e.target.value,
                    });
                    setPomodoro(e.target.value);
                  }
                }}
                className="pomodoro"
                type="number"
                placeholder="Pomodoro"
                aria-label="Pomodoro"
              />
              <label htmlFor="shortBreak">Short break:</label>
              <input
                id="shortBreak"
                value={shortBreak}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    update(timerRef, {
                      shortBreak: e.target.value,
                    });
                    setShortBreak(e.target.value);
                  }
                }}
                className="short"
                type="number"
                placeholder="Short break"
              />
              <label htmlFor="longBreak">Long break:</label>
              <input
                id="longBreak"
                value={longBreak}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    update(timerRef, {
                      longBreak: e.target.value,
                    });
                    setLongBreak(e.target.value);
                  }
                }}
                className="long"
                type="number"
                placeholder="Long break"
              />
              <button type="submit" className="pomodoro-button">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
