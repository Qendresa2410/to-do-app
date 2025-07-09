import React from "react";
import { useNavigate } from "react-router-dom";

function TaskItem({ task, onToggle, onDelete }) {
  const navigate = useNavigate();
  const isApi = task.source === "api";

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span
        onClick={() => {
          if (isApi) navigate(`/api-todo/${task.id}`);
        }}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: isApi ? "pointer" : "default",
          marginRight: "10px",
        }}
      >
        {task.title}
      </span>
      <span className="label">
        {isApi ? "API" : task.category}
      </span>
      {task.source === "local" && (
        <button onClick={() => onDelete(task.id)} style={{ marginLeft: "10px" }}>
          Obriši
        </button>
      )}
    </div>
  );
}

export default TaskItem;
