import React, { useState } from "react";
import { createSchoolYear } from "../../api/principalApi";

const CreateSchoolYearDialog = ({ isOpen, onClose }) => {
  const [yearStart, setYearStart] = useState();
  const [yearEnd, setYearEnd] = useState();
  const [deadlines, setDeadlines] = useState([
    { quarter_number: 1, deadline: null },
    { quarter_number: 2, deadline: null },
    { quarter_number: 3, deadline: null },
    { quarter_number: 4, deadline: null },
  ]);
  const [loading, setLoading] = useState(false);

  //for testing if its SHS or not
  const [isSeniorHigh, setIsSeniorHigh] = useState(false);

  const quarters = [
    {
      quarter_number: 1,
      senior: "Prelim",
    },
    {
      quarter_number: 2,
      senior: "Midterm",
    },
    {
      quarter_number: 3,
      senior: "Semi-Final",
    },
    {
      quarter_number: 4,
      senior: "Final",
    },
  ];

  const handleChange = (quarterNumber, value) => {
    setDeadlines((prev) =>
      prev.map((q) =>
        q.quarter_number === quarterNumber ? { ...q, deadline: value } : q,
      ),
    );
  };

  const handleSubmit = async (yearStart, yearEnd, deadlines) => {
    try {
      console.log("deadlines crate:", deadlines);
      setLoading(true);
      //const response = await createSchoolYear(yearStart, yearEnd, deadlines);
      if (response.status === 201) {
        //success dialog
        console.log("I created this shiet");
      }
    } catch (e) {
      ///show error dialog
      console.log("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create School Year</h3>

        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row justify-between items-center">
            <div>Start Date:</div>
            <input
              className="input input-bordered w-1/2"
              type="date"
              onChange={(e) => {
                setYearStart(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-row justify-between items-center">
            <div>End Date:</div>
            <input
              className="input input-bordered w-1/2"
              type="date"
              onChange={(e) => {
                setYearEnd(e.target.value);
              }}
            ></input>
          </div>

          {deadlines.map((q) => (
            <div
              key={q.quarter_number}
              className="flex flex-row justify-between items-center"
            >
              <div>
                {isSeniorHigh
                  ? `${q.senior} Deadline`
                  : `Quarter ${q.quarter_number} Deadline`}
              </div>
              <input
                key={q.quarter_number}
                className="input input-bordered w-1/2"
                type="date"
                onChange={(e) => {
                  handleChange(q.quarter_number, e.target.value);
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-evenly p-2">
          <button
            className="btn btn-outline"
            onClick={() => {
              handleSubmit(yearStart, yearEnd, deadlines);
            }}
          >
            Confirm
          </button>
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default CreateSchoolYearDialog;
