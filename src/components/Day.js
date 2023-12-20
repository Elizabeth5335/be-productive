import React from "react";

export default function Day(props) {

  const today = new Date();
  const todayFormatted = `${today.getDate()}.${
    today.getMonth() + 1
  }.${today.getFullYear()}`;

  function findTasksForToday() {
    console.log(props.data);
    if (props.data) {
      const tasksWithTodayDeadline = Object.values(props.data).filter(
        (task) => task.deadline === todayFormatted
      );
      return tasksWithTodayDeadline;
    } else {
      return [];
    }
  }

  const [tasks, setTasks] = React.useState();

  React.useEffect(() => {
    setTasks(findTasksForToday());
    console.log(findTasksForToday());
  }, [props.data]);

  return (
    <>
      <h4>{todayFormatted}</h4>
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li className="task-container" key={task.id}>
              <p>{task.content}</p>
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
        "There are no tasks"
      )}
    </>
  );
}
