import axios from "axios";
import { config } from "../../config";

const gettingStarted = async (data) => {
  const url = config.BASE_URL + "/";
  return await axios.post(url, data, config.configs);
};
const login = async (data) => {
  const url = config.BASE_URL + "/login";
  return await axios.post(url, data);
};

const defaultPage = async () => {
  const url = config.BASE_URL + "/default";
  return await axios.get(url, config.config2);
};

const deleteTask = async (task_id) => {
  const url = config.BASE_URL + "/delete-task";
  return await axios.post(url, { task_id: task_id }, config.config2);
};

const AddTask = async (title) => {
  const url = config.BASE_URL + "/add-task";
  return await axios.post(url, { title: title }, config.config2);
};

const editTask = async (data) => {
  const url = config.BASE_URL + "/edit-task";
  return await axios.put(url, data, config.config2);
};

export { gettingStarted, login, defaultPage, deleteTask, AddTask, editTask };
