/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const Table = ({
  switchTask,
  handleOnDelete,
  toDelete,
  handleOnSelect,
  entryList,
  badList,
}) => {
  return (
    <>
      <div className="row mt-5">
        <div className="col">
          <h3 className="text-center">Entry List</h3>
          {/* <!-- Entry List table  --> */}
          <hr />
          <input
            className="form-check-input"
            type="checkbox"
            value="all-entry"
            id="all-entry"
            onChange={handleOnSelect}
          />{" "}
          <label htmlFor="all-entry">Select All</label>
          <table className="table table-striped table-hover border">
            <tbody id="entryList">
              {entryList.map((item, i) => {
                return (
                  <tr key={item?._id}>
                    <td>{i + 1}</td>
                    <td>
                      {" "}
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={item?._id}
                        onChange={handleOnSelect}
                        checked={
                          item.length > 0 ? toDelete.includes(item?._id) : ""
                        }
                      />{" "}
                      {item.task}
                    </td>
                    <td>{item.hr}</td>
                    <td className="text-end">
                      <button
                        onClick={() => switchTask(item._id, "bad")}
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
              <input
                className="form-check-input"
                type="checkbox"
                value="all-bad"
                id="all-bad"
                onChange={handleOnSelect}
              />{" "}
              <label htmlFor="all-bad">Select All</label>
              <table className="table table-striped table-hover border">
                <tbody id="badList">
                  {badList.map((item, i) => {
                    return (
                      <tr key={item?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={item?._id}
                            onChange={handleOnSelect}
                            checked={toDelete.includes(item?._id)}
                          />{" "}
                          {item.task}
                        </td>
                        <td>{item.hr}</td>
                        <td className="text-end">
                          <button
                            onClick={() => switchTask(item._id, "entry")}
                            className="btn btn-warning"
                          >
                            <i className="fa-solid fa-arrow-left"></i>
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
      {toDelete.length > 0 && (
        <div className="row my-5 d-grid">
          <button
            onClick={() => handleOnDelete(toDelete)}
            className="btn btn-danger"
          >
            Delete {toDelete.length} task(s)
          </button>
        </div>
      )}
    </>
  );
};
