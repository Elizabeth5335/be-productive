import { Link } from "react-router-dom";
import Timer from "./Timer";
import React from "react";
import { ref, onValue, update } from "firebase/database";

import "../styles/Pomodoro.css";

export default function Pomodoro(props) {
  const user = "admin";

  const timerRef = ref(props.database, "users/" + user + "/pomodoro");

  const [timerData, setTimerData] = React.useState({
    pomodoro: 40,
    shortBreak: 10,
    longBreak: 15
  });

  React.useEffect(() => {
    onValue(timerRef, (snapshot) => {
      setTimerData(snapshot.val());
      console.log(timerData);
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
      time: timerData.pomodoro,
      content: "Time to focus",
    },
    {
      id: 2,
      tabTitle: "Short break",
      time: timerData.shortBreak,
      content: "Time to break",
    },
    {
      id: 3,
      tabTitle: "Long break",
      time: timerData.longBreak,
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

      {timerData &&
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
              <>
                {currentTab === `${tab.id}` && (
                  <div key={tab.id} className="tab-content">
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
              </>
            ))}
          </div>
        </div>
        <div className="settings">
          <h2>Settings</h2>
          <form className="pomodoro-form">
            <label htmlFor="pomodoro">Pomodoro:</label>
            <input
              id="pomodoro"
              value={timerData.pomodoro}
              onChange={(e) => {
                update(timerRef, {
                  ["pomodoro"]: e.target.value,
                });
                setTimerData((prevData) => ({
                  ...prevData,
                  pomodoro: e.target.value,
                }));
              }}
              className="pomodoro"
              type="number"
              placeholder="Pomodoro"
              aria-label="Pomodoro"
            />
            <label htmlFor="shortBreak">Short break:</label>
            <input
              id="shortBreak"
              value={timerData.shortBreak}
              onChange={(e) => {
                update(timerRef, {
                  ["shortBreak"]: e.target.value,
                });
                setTimerData((prevData) => ({
                  ...prevData,
                  shortBreak: e.target.value,
                }));
              }}
              className="short"
              type="number"
              placeholder="Short break"
            />
            <label htmlFor="longBreak">Long break:</label>
            <input
              id="longBreak"
              value={timerData.longBreak}
              onChange={(e) => {
                update(timerRef, {
                  ["longBreak"]: e.target.value,
                });
                setTimerData((prevData) => ({
                  ...prevData,
                  longBreak: e.target.value,
                }));
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
      </div>}
    </>
  );
}
