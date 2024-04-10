import axios from "./axios";

export const getTasksRequest = () => {
  return axios.get("/task");
};
export const getTaskRequest = (id) => {
  return axios.get(`/task/${id}`);
};
export const createTaskRequest = (task) => {
  return axios.post("/task", task);
};
export const updateTaskRequest = (task) => {
  return axios.patch(`/task/${task.id}`, task);
};
export const deleteTaskRequest = (id) => {
  return axios.delete(`/task/${id}`);
};
export const taskToggleRequest = (id) => {
  return axios.patch(`/taskToggle/${id}`, id);
};