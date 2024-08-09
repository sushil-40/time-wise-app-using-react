import { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
// import { Form } from "./components/Form";

function App() {
  const [taskList, setTaskList] = useState([]);
  const addTaskList = (taskObj) => {
    const obj = {
      ...taskObj,
      id: randomIdGenerator(),
      type: "entry",
    };
    setTaskList([...taskList, obj]);
    console.log(taskObj);
  };

  // Switch tasks or items

  const switchTask = (id, type) => {
    //   console.log(id, type);

    setTaskList(
      taskList.map((item) => {
        console.log(item);

        if (item.id === id) {
          item.type = type;
        }
        return item;
      })
    );
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

  return (
    <div className="wrapper pt-5">
      {/* <!-- title  --> */}

      <div className="container">
        <h1 className="text-center">Time Wise</h1>

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
          The total hours allocated ={" "}
          <span id="ttlHrs">
            {taskList.reduce((acc, item) => {
              return acc + Number(item.hr);
            }, 0)}
          </span>{" "}
          hrs
        </div>
      </div>
    </div>
  );
}

export default App;
