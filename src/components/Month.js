// import React, { useState } from "react";

// export default function Month() {


//   const [date, setDate] = useState(new Date());
//   const currentYear = date.getFullYear();
//   const currentMonth = date.getMonth();
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//   const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
//   const daysOfWeek = ["Mon", "Tu", "Wed", "Th", "Fr", "Sat", "Sun"];

//   let firstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

//   const calendarDays = [];
//   for (let i = 0; i < daysInMonth + firstDay; i++) {
//     const day = i - firstDay + 1;
//     calendarDays.push(
//       <div key={i} className="calendar-day">
//         {i >= firstDay ? (
//           <div>
//             <p>{day}</p>
//             <p>Some task</p>
//           </div>
//         ) : (
//           ""
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="calendar">
//       <h2>{getCurrentMonthName()}</h2>
//       <div className="days-of-week">
//         {daysOfWeek.map((day, index) => (
//           <div key={index}>{day}</div>
//         ))}
//       </div>
//       <div className="calendar-grid">
//         {calendarDays.map((day, index) => (
//           <div key={index}>{day}</div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React from "react";

export default function Month(props) {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function findTasksForCurrentMonth() {
    if (props.data) {
      const tasksWithCurrentMonthDeadline = Object.values(props.data).filter((task) => {
        const taskDeadline = task.deadline;
        console.log("month");
        console.log(task.deadline);
        return taskDeadline >= formatDate(startOfMonth) && taskDeadline <= formatDate(endOfMonth);
      });
      return tasksWithCurrentMonthDeadline;
    } else {
      return [];
    }
  }

  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    setTasks(findTasksForCurrentMonth());
  }, [props.data]);

  return (
    <>
      <h4>{`${startOfMonth.toLocaleDateString("default", {
        month: "long",
        year: "numeric",
      })}`}</h4>
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li className="task-container" key={task.id}>
              <p>{task.content}</p>
              <p>{task.deadline}</p>
              <button onClick={props.deleteTask} className="delete-btn">
                X
              </button>
              <button onClick={props.finishTask} className="done-btn">
                V
              </button>
            </li>
          ))}
        </ul>
      ) : (
        "There are no tasks for the current month"
      )}
    </>
  );
}
