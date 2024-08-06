import { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";

function App() {
  const [taskList, setTaskList] = useState([]);
  const addTaskList = (taskObj) => {
    const obj = {
      ...taskObj,
      id: randomIdGenerator(),
      type: "entry",
    };

    setTaskList({ ...taskList, obj });
  };

  console.log(taskList);

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
  return (
    <div className="wrapper pt-5">
      {/* <!-- title  --> */}

      <div className="container">
        <h1 className="text-center">Time Wise</h1>

        {/* <!-- form  --> */}

        <Form addTaskList={addTaskList} />

        {/* <!-- tables   --> */}
        <div className="row mt-5">
          <div className="col">
            <h3 className="text-center">Entry List</h3>
            {/* <!-- Entry List table  --> */}
            <hr />
            <table className="table table-striped table-hover border">
              <tbody id="entryList"></tbody>
            </table>
          </div>

          <div className="col bg-info">
            {/* <!-- Bad List table  --> */}

            <div className="row mt-5">
              <div className="col">
                <h3 className="text-center">Bad List</h3>

                <hr />
                <table className="table table-striped table-hover border">
                  <tbody id="badList"></tbody>
                </table>

                <div className="alert alert-success">
                  You could have saved = <span id="savedHrsElm">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className="alert alert-success">
          The total hours allocated = <span id="ttlHrs">0</span> hrs
        </div>
      </div>
    </div>
  );
}

export default App;
