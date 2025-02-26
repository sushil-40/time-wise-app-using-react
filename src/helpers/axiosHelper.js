import axios from "axios";
const apiEP = import.meta.env.PROD
  ? "/api/v1/tasks"
  : "http://localhost:8000/api/v1/tasks";

const apiProcessor = async ({ method, data }) => {
  console.log(import.meta.env.PROD);
  try {
    const response = await axios({
      method: method,
      url: apiEP,
      data,
    });
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postTask = async (data) => {
  const obj = {
    method: "post",
    data,
  };
  return apiProcessor(obj);
};

export const fetchAllTasks = async () => {
  const obj = {
    method: "get",
  };
  return apiProcessor(obj);
};
export const updateTasks = async (data) => {
  const obj = {
    method: "patch",
    data,
  };
  return apiProcessor(obj);
};
export const deleteTasks = async (data) => {
  const obj = {
    method: "delete",
    data,
  };
  return apiProcessor(obj);
};
