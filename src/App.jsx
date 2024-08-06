import "./App.css";
import { Form } from "./components/Form";

function App() {
  return (
    <div className="wrapper pt-5">
      {/* <!-- title  --> */}

      <div className="container">
        <h1 className="text-center">Time Wise</h1>

        {/* <!-- form  --> */}

        <Form />

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
