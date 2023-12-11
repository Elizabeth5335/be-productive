import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            className="task-container"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {props.task.content}
          </div>
        );
      }}
    </Draggable>
  );
}
