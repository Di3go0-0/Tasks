import React, { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCart from "../components/TaskCart";

function TaskPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2">
      {tasks.length > 0 ? (
        tasks.map((task) => {
          return <TaskCart key={task.id} task={task} />;
        })
      ) : (
        <div className="grid grid-cols-1">
          <div className="flex flex-col items-center gap-2 text-center">  
            <h2 className="font-bold text-2xl">No tasks</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You have completed all your tasks for today. Well done!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskPage;
