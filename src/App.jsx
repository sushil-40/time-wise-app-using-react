import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import { fetchAllTasks, postTask, updateTasks } from "./helpers/axiosHelper";

const hoursPerWeek = 24 * 7;

function App() {
  const [taskList, setTaskList] = useState([]);

  const [resp, setResp] = useState({});
  const shouldFetchRef = useRef(true);
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + Number(item.hr);
  }, 0);
  useEffect(() => {
    // get All data from database
    // preventing from calling getAllTasks() twice (2 - times)
    shouldFetchRef.current && getAllTasks();
    shouldFetchRef.current = false;
  }, []);
  const addTaskList = async (taskObj) => {
    //call api to send data to the database
    const response = await postTask(taskObj);
    console.log(response);
    setResp(response);
  };
  console.log(resp);
  // Switch tasks or items

  const switchTask = async (_id, type) => {
    const response = await updateTasks({ _id, type });
    setResp(response);
    if (response.status === "success") {
      //re-fetch all the data
      getAllTasks();
    }
  };

  console.log(taskList);

  // Creating unique ID

  const randomIdGenerator = (length = 6) => {
    const str =
      "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

    let id = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * str.length); // 0 -to- 61
      // Math.random()*str.length;  // 0 - to - 61.999

      id += str[randomIndex];
    }
    return id;
  };

  // Deleting items from table

  const handleOnDelete = (id) => {
    if (window.confirm("Are you sure, you want to delete this?")) {
      //   console.log(id);

      setTaskList(taskList.filter((item) => item.id !== id));
    }
  };

  //fetch all tasks from Database

  const getAllTasks = async () => {
    //call the axiosHelper to get data from the server

    const data = await fetchAllTasks();
    console.log(data);
    data?.status === "success" && setTaskList(data.tasks);
    // mount that data to our taskList state
  };

  return (
    <div className="wrapper pt-5">
      {/* <!-- title  --> */}

      <div className="container">
        <h1 className="text-center">Time Wise</h1>
        {resp?.message && (
          <div
            className={
              resp?.status === "success"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {resp?.message}
          </div>
        )}

        {/* <!-- form  --> */}
        <Form addTaskList={addTaskList} />
        {/* <!-- tables   --> */}
        <Table
          taskList={taskList}
          switchTask={switchTask}
          handleOnDelete={handleOnDelete}
        />
        <br />
        <div className="alert alert-success">
          The total hours allocated = <span id="ttlHrs">{ttlHr}</span> hrs
        </div>
      </div>
    </div>
  );
}

export default App;
