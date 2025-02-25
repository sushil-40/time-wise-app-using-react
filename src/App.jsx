import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import {
  fetchAllTasks,
  postTask,
  updateTasks,
  deleteTasks,
} from "./helpers/axiosHelper";

const hoursPerWeek = 24 * 7;

function App() {
  const [taskList, setTaskList] = useState([]);

  const [resp, setResp] = useState({});
  const shouldFetchRef = useRef(true);
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + Number(item.hr);
  }, 0);
  const [toDelete, setToDelete] = useState([]);
  const entryList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");

  useEffect(() => {
    // get All data from database
    // preventing from calling getAllTasks() twice (2 - times)
    shouldFetchRef.current && getAllTasks();
    shouldFetchRef.current = false;
  }, []);
  const addTaskList = async (taskObj) => {
    if (ttlHr + +taskObj.hr > hoursPerWeek) {
      return alert("Sorry Boss not enough time fit this task from last week.");
    }
    //call api to send data to the database
    const response = await postTask(taskObj);

    setResp(response);
    if (response.status === "success") {
      //re-fetch all the data
      getAllTasks();
    }
  };

  // Switch tasks or items

  const switchTask = async (_id, type) => {
    const response = await updateTasks({ _id, type });
    setResp(response);
    if (response.status === "success") {
      //re-fetch all the data
      getAllTasks();
    }
  };

  // Deleting items from table

  const handleOnDelete = async (idsToDelete) => {
    if (window.confirm("Are you sure, you want to delete this?")) {
      //to do Delete

      const response = await deleteTasks(idsToDelete);
      console.log(response);
      setResp(response);
      if (response.status === "success") {
        //re-fetch all the data
        getAllTasks();

        //empty the toDelete[]
        setToDelete([]);
      }
    }
  };

  //fetch all tasks from Database

  const getAllTasks = async () => {
    //call the axiosHelper to get data from the server

    const data = await fetchAllTasks();

    data?.status === "success" && setTaskList(data.tasks);
    // mount that data to our taskList state
  };
  const handleOnSelect = (e) => {
    // console.log(e);
    const { checked, value } = e.target;
    console.log(checked, value);
    let tempArg = [];
    if (value === "all-entry") {
      tempArg = entryList;
    }
    if (value === "all-bad") {
      tempArg = badList;
    }

    if (checked) {
      if (value === "all-entry" || value === "all-bad") {
        // get all _ids from entry list
        const _ids = tempArg.map((item) => item._id);

        // to remove duplicate value we use following method in js
        const uniqueIds = [...new Set([...toDelete, ..._ids])];
        //_ids is also array thats why we are spreading below;
        setToDelete(uniqueIds);
        return;
      }
      setToDelete([...toDelete, value]);
    } else {
      if (value === "all-entry" || value === "all-bad") {
        const _ids = tempArg.map((item) => item._id);

        setToDelete(toDelete.filter((_id) => !_ids.includes(_id)));
        return;
      }
      setToDelete(toDelete.filter((_id) => _id != value));
    }
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
          toDelete={toDelete}
          handleOnSelect={handleOnSelect}
          entryList={entryList}
          badList={badList}
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
