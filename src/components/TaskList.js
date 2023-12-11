import React from "react";
import { ref, onValue } from "firebase/database";
import Column from "./Column";

// import _ from "lodash";
import { DragDropContext } from "react-beautiful-dnd";

// const initialData = {
//   tasks: {
//     "task-1": { id: "task-1", content: "Take out the garbage" },
//     "task-2": { id: "task-2", content: "Watch my favorite show" },
//     "task-3": { id: "task-3", content: "Charge my phone" },
//     "task-4": { id: "task-4", content: "Cook dinner" },
//   },
//   columns: {
//     "column-1": {
//       id: "column-1",
//       title: "To do",
//       taskIds: ["task-1", "task-2", "task-3", "task-4"],
//     },
//     "column-2": {
//       id: "column-2",
//       title: "In Process",
//       taskIds: [],
//     },
//     "column-3": {
//       id: "column-3",
//       title: "Done",
//       taskIds: [],
//     },
//   },
//   columnOrder: ["column-1", "column-2", "column-3"],
// };

export default function TaskList(props) {
  const columnOrder = ["column-1", "column-2", "column-3"];
  const user = "admin";

  const tasks = ref(props.database, "users/" + user);

  let tasksData = {};
  const [data, setData] = React.useState(tasksData);

  React.useEffect(() => {
    onValue(tasks, (snapshot) => {
    //   tasksData = snapshot.val();
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

    // if(!!start || !!finish){
    //     return;
    // }
    
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

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

    const finishTaskIds = finish && finish.taskIds ? Array.from(finish.taskIds) : [];
    
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    console.log(data);

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

    console.log(data);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
  <div className="tasks-container">
    {data && data.columns ? (
      columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column && column.taskIds ? column.taskIds.map((taskId) => data.tasks[taskId]) : null;
        return column && <Column key={column.id} column={column} tasks={tasks ? tasks : []} />;
      })
    ) : (
      <p>Loading data...</p>
    )}
  </div>
</DragDropContext>
  );
}
