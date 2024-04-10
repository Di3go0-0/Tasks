import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";

function TaskEditFormPage() {
  const { register, handleSubmit } = useForm();
  const { updateTask, getTask, task } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getTask(params.id);
    console.log(task);
  }, []);

  const onSubmit = handleSubmit((data) => {
    data.id = params.id;
    console.log(data);
    updateTask(data);
    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md ">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder={task.title || "Title"}
            {...register("title")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          <textarea
            rows="3"
            placeholder={task.description || "Description"}
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          <div className="flex justify-between">
            <button>Save</button>
            <button onClick={() => navigate("/tasks")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskEditFormPage;
