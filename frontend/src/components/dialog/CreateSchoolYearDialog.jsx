import React, { useState } from "react";
import { createSchoolYear } from "../../api/principalApi";
import ConfirmDialog from "./ConfirmDialog";
import ErrorAlert from "../alerts/ErrorAlert";

const CreateSchoolYearDialog = ({ isOpen, onClose, fetchSchoolYear }) => {
  const [yearStart, setYearStart] = useState();
  const [yearEnd, setYearEnd] = useState();
  const [deadlines, setDeadlines] = useState([
    { quarter_number: 1, deadline: null },
    { quarter_number: 2, deadline: null },
    { quarter_number: 3, deadline: null },
    { quarter_number: 4, deadline: null },
  ]);
  const [loading, setLoading] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [showError, setShowError] = useState(false);

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

  const beforeOpenConfirmDialog = () => {
    if (!yearStart || !yearEnd || deadlines.some((q) => !q.deadline)) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);

      return;
    }
    setShowError(false);
    setOpenConfirmDialog(true);
  };

  const handleChange = (quarterNumber, value) => {
    setDeadlines((prev) =>
      prev.map((q) =>
        q.quarter_number === quarterNumber ? { ...q, deadline: value } : q,
      ),
    );
  };

  const handleCloseAllModal = () => {
    onClose();
    setOpenConfirmDialog(false);
  };

  const handleSubmit = async (yearStart, yearEnd, deadlines) => {
    try {
      console.log("deadlines crate:", deadlines);
      setLoading(true);
      const response = await createSchoolYear(yearStart, yearEnd, deadlines);
      if (response.status === 201) {
        fetchSchoolYear();
      }
    } catch (e) {
      setShowError(true);
      console.log("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="toast toast-top toast-end z-1000">
        <ErrorAlert show={showError} message={"Please complete all fields"} />
      </div>
      <dialog className="modal flex flex-col justify-center" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create School Year</h3>

          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row justify-between items-center">
              <div>Start Date:</div>
              <input
                className="input input-bordered w-1/2"
                type="date"
                value={yearStart}
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
                <div>Quarter ${q.quarter_number} Deadline</div>
                <input
                  min={yearStart}
                  max={yearEnd}
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
                beforeOpenConfirmDialog();
              }}
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Confirm"
              )}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                setShowError(false);
                onClose();
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>close</button>
        </form>
      </dialog>
      <ConfirmDialog
        headerText={"Create and Set Active School Year"}
        confirmButton={() => handleSubmit(yearStart, yearEnd, deadlines)}
        closeAll={handleCloseAllModal}
        onClose={() => setOpenConfirmDialog(false)}
        isOpen={openConfirmDialog}
      >
        This will set the created school year{" "}
        <span className="font-bold"></span> as the active one and will replace
        the current active school year. Are you sure you want to change?
      </ConfirmDialog>
    </>
  );
};

export default CreateSchoolYearDialog;
