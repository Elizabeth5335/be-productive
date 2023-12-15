import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

export default function Column(props) {
  return (
    <div className="column-container">
      <div className="title">{props.column.title}</div>
      <Droppable droppableId={props.column.id}>
        {(provided) => {
          return (
            <div
              className="task-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.tasks.map((task, index) => {
                return <Task key={task.id} task={task} index={index} columnId={props.column.id} deleteToDo={props.deleteToDo} />;
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
