/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const Table = ({ taskList, switchTask, handleOnDelete }) => {
  const [toDelete, setToDelete] = useState([]);
  const entryList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");

  const handleOnSelect = (e) => {
    // console.log(e);
    const { checked, value } = e.target;
    console.log(checked, value);
    if (checked) {
      if (value === "all-entry") {
        // get all _ids from entry list
        const _ids = entryList.map((item) => item._id);
        //_ids is also array thats why we are spreading below;
        setToDelete([...toDelete, ..._ids]);
        return;
      }
      setToDelete([...toDelete, value]);
    } else {
      if (value === "all-entry") {
        const _ids = entryList.map((item) => item._id);

        setToDelete(toDelete.filter((_id) => !_ids.includes(_id)));
        return;
      }
      setToDelete(toDelete.filter((_id) => _id != value));
    }
  };
  console.log(toDelete);
  return (
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
                      checked={toDelete.includes(item?._id)}
                    />{" "}
                    {item.task}
                  </td>
                  <td>{item.hr}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleOnDelete(item._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
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
