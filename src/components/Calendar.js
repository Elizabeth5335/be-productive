import React from "react";
import { ref, onValue, update } from "firebase/database";
import Month from "./Month";

import "../styles/Calendar.css"
import Day from "./Day";
import Week from "./Week";
import { Link } from "react-router-dom";
export default function Calendar(props) {
  const user = "admin";

  const tasks = ref(props.database, "users/" + user);

  let tasksData = {};
  const [data, setData] = React.useState(tasksData);

  React.useEffect(() => {
    onValue(tasks, (snapshot) => {
      setData(snapshot.val());
      console.log(snapshot.val());
    });
  }, []);

  //   React.useEffect(() => {
  //     onValue(calendarRef, (snapshot) => {
  //       setDay(snapshot.val().day);
  //       setWeek(snapshot.val().month);
  //       setMonth(snapshot.val().week);
  //     });
  //   }, []);

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function getCurrentWeek() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); 

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() + 1 - currentDay);

    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (7 - currentDay));

    return {
      startOfWeek: formatDate(startOfWeek),
      endOfWeek: formatDate(endOfWeek),
    };
  }

  function deleteTask(){
    console.log("deleted!")
  }
  
  function finishTask(){
    console.log("finished!")
    
  }
  

  const [currentTab, setCurrentTab] = React.useState("1");
  const tabs = [
    {
      id: 1,
      tabTitle: "Today",
      content: <Day deleteTask={deleteTask} finishTask={finishTask} data={data.tasks}/>,
    },
    {
      id: 2,
      tabTitle: "Week",
      content: <Week deleteTask={deleteTask} finishTask={finishTask} data={data.tasks}/>,
    },
    {
      id: 3,
      tabTitle: "Month",
      content: <Month deleteTask={deleteTask} finishTask={finishTask} data={data.tasks}/>
    },
  ];

  function handleTabClick(e) {
    setCurrentTab(e.target.id);
  }

  return (
    <>
    <Link to="/nav">
        <h1 className="back-btn">{"<==="} Back</h1>
      </Link>
      <div>
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
                    <h2>{tab.tabTitle}</h2>
                    <h3>{tab.content}</h3>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
