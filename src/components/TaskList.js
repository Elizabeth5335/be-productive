import React from "react";
import { ref, onValue, update } from "firebase/database";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { Link } from "react-router-dom";


export default function TaskList(props) {
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

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      update(ref(props.database, "users/" + user + "/columns"), {
        [newColumn.id]: newColumn,
      });

      setData((prev) => {
        return {
          ...prev,
          columns: { ...prev.columns, [newColumn.id]: newColumn },
        };
      });

      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds =
      finish && finish.taskIds ? Array.from(finish.taskIds) : [];

    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    update(ref(props.database, "users/" + user + "/columns"), {
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });

    setData((prev) => {
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
    });
  }

  const [input, setInput] = React.useState("");
  const [deadline, setDeadline] = React.useState(
    new Date().toLocaleDateString()
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function createTodo(e) {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid Task");
      return;
    }

    const newTaskId = "task-" + (Object.values(data.tasks).length + 1);

    const newTaskIds = Array.from(data.columns["column-1"].taskIds);
    newTaskIds.splice(0, 0, newTaskId);
    const newColumn = {
      ...data.columns["column-1"],
      taskIds: newTaskIds,
    };

    const newTask = {
      content: input,
      id: newTaskId,
      deadline: formatDate(deadline),
    };

    setData((prev) => {
      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [newTaskId]: newTask,
        },
        columns: { ...prev.columns, [newColumn.id]: newColumn },
      };
    });

    update(ref(props.database, "users/" + user + "/tasks"), {
      [newTaskId]: newTask,
    });
    update(ref(props.database, "users/" + user + "/columns"), {
      [newColumn.id]: newColumn,
    });
    setInput("");
    setDeadline(new Date().toLocaleDateString());
  }

  function deleteTodo(columnId, taskId) {
    const newTaskIds = Object.values(data.columns[columnId].taskIds);

    const updatedTasksIds = newTaskIds.filter((todo) => {
      return todo !== taskId;
    });

    const newColumn = {
      ...data.columns[columnId],
      taskIds: updatedTasksIds,
    };

    console.log("newColumn");
    console.log(newColumn);

    setData((prev) => ({
      ...prev,
      tasks: { ...prev.tasks, [taskId]: null },
      columns: { ...prev.columns, [columnId]: newColumn },
    }));

    update(ref(props.database, "users/" + user + "/tasks"), {
      [taskId]: null,
    });
    update(ref(props.database, "users/" + user + "/columns"), {
      [newColumn.id]: newColumn,
    });
  }

  return (
    <>
      <Link to="/nav">
        <h1 className="back-btn">{"<==="} Back</h1>
      </Link>
      <form onSubmit={createTodo} className="form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
          type="text"
          placeholder="Task"
        />
        <input
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="deadline"
          type="date"
          placeholder="Deadline"
        />
        <button className="button">Submit</button>
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="tasks-container">
          {data && data.columns ? (
            data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks =
                column && column.taskIds
                  ? column.taskIds.map((taskId) => data.tasks[taskId])
                  : null;
              return (
                column && (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks ? tasks : []}
                    deleteToDo={deleteTodo}
                  />
                )
              );
            })
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </DragDropContext>
    </>
  );
}
