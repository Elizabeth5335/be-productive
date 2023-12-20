import React from "react";

export default function Week(props) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay() + 7);

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function findTasksForCurrentWeek() {
    if (props.data) {
      const tasksWithCurrentWeekDeadline = Object.values(props.data).filter(
        (task) => {
          return (
            task.deadline >= formatDate(startOfWeek) &&
            task.deadline <= formatDate(endOfWeek)
          );
        }
      );
      return tasksWithCurrentWeekDeadline;
    } else {
      return [];
    }
  }

  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    setTasks(findTasksForCurrentWeek());
  }, [props.data]);

  return (
    <>
      <h4>{`${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`}</h4>
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
        "There are no tasks for the current week"
      )}
    </>
  );
}
