/* eslint-disable react/prop-types */
import React from "react";

export const Table = ({ taskList, switchTask, handleOnDelete }) => {
  const entryList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");

  return (
    <div className="row mt-5">
      <div className="col">
        <h3 className="text-center">Entry List</h3>
        {/* <!-- Entry List table  --> */}
        <hr />
        <table className="table table-striped table-hover border">
          <tbody id="entryList">
            {entryList.map((item, i) => {
              return (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hr}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleOnDelete(item.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                      onClick={() => switchTask(item.id, "bad")}
                      className="btn btn-success"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col bg-info">
        {/* <!-- Bad List table  --> */}

        <div className="row mt-5">
          <div className="col">
            <h3 className="text-center">Bad List</h3>

            <hr />
            <table className="table table-striped table-hover border">
              <tbody id="badList">
                {badList.map((item, i) => {
                  return (
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>{item.task}</td>
                      <td>{item.hr}</td>
                      <td className="text-end">
                        <button
                          onClick={() => switchTask(item.id, "entry")}
                          className="btn btn-warning"
                        >
                          <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleOnDelete(item.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="alert alert-success">
              You could have saved ={" "}
              <span id="savedHrsElm">
                <span id="savedHrsElm">
                  {badList.reduce((acc, item) => acc + Number(item.hr), 0)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
