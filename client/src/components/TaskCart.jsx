import React from "react";
import { useTasks } from "../context/TasksContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function TaskCart({ task }) {
  const { taskToggle, deleteTask } = useTasks();
  const navigate = useNavigate();
  let done = task.done;

  const handleDone = (Task) => {
    taskToggle(Task);
  };

  useEffect(() => {
    if (done !== task.done) {
      done = task.done;
      navigate("/tasks");
    }
  });

  return (
    <div className={`bg-zinc-800 max-w-md w-full p-10 rounded-md ${task.done ? 'border-2 border-green-800' : 'border-2 border-red-800'}`}>      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 itcem">
          <button>
            <Link to={`/task/${task.id}`}>Edit</Link>
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this task?')) {
                deleteTask(task.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </header>
      <br />
      <p className="text-2xl font-bold text-gray-400 break-words">{task.description}</p>
      <br />
      <p className="text-2xl font-bold">
        Task Status is {task.done.toString()}
      </p>{" "}
      {task.done ? (
        <button
          className="nav-link bg-green-800 px-3 py-1 rounded-sm"
          onClick={() => handleDone(task.id)}
        >
          Undone
        </button>
      ) : (
        <button
          className="nav-link bg-red-800 px-3 py-1 rounded-sm"
          onClick={() => handleDone(task.id)}
        >
          Done
        </button>
      )}
    </div>
  );
}

export default TaskCart;
