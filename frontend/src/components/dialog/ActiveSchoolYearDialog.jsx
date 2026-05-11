import React, { useEffect, useState } from "react";
import {
  getQuarterDeadlines,
  getSchoolYears,
  updateQuarterDeadline,
} from "../../api/principalApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DialogSkeleton from "../skeleton/DialogSkeleton";
import CreateSchoolYearDialog from "./CreateSchoolYearDialog";
import SuccessAlert from "../alerts/SuccessAlert";
import ErrorAlert from "../alerts/ErrorAlert";
import ConfirmDialog from "./ConfirmDialog";
import { useSchoolYear } from "../../context/SchoolYearProvider";

const ActiveSchoolYearDialog = ({ onClose, isOpen }) => {
  const {
    yearStart,
    yearEnd,
    schoolYear,
    deadlines,
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
    fetchSchoolYear,
    handleDeadlineChange,
    handleDeadlineSave,
  } = useSchoolYear();

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createSYOpen, setCreateSYOpen] = useState(false);

  const handleConfirmButton = () => {
    const hasEmptyDeadline = deadlines.some((d) => !d.deadline);

    if (hasEmptyDeadline) {
      setErrorMessage("Please complete all the fields");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    setShowConfirm(true);
  };

  const confirmButtonSave = () => {
    handleDeadlineSave();

    handleCloseAll();
  };

  const handleCloseAll = () => {
    setShowConfirm(false);
    onClose();
  };

  return (
    <>
      {successMessage && (
        <div className="toast toast-top toast-end z-1000">
          <SuccessAlert message={successMessage} />
        </div>
      )}

      {errorMessage && (
        <div className="toast toast-top toast-end z-1000">
          <ErrorAlert message={errorMessage} />
        </div>
      )}

      <dialog className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Set Active School Year</h3>
          <div className="flex border-b"></div>

          <div className="flex w-full flex-col gap-y-5 flex-1  ">
            <div className="flex flex-row items-center gap-x-2 pt-3">
              <div className="font-bold">Active School Year: {schoolYear}</div>

              <button
                className="text-xs btn btn-outline"
                onClick={() => setCreateSYOpen(true)}
              >
                Create School Year
              </button>
            </div>

            {deadlines.map((deadline) => (
              <div
                key={deadline.quarter_id}
                className="flex flex-row items-center gap-x-2 w-full"
              >
                <div>Quarter {deadline.quarter_number}:</div>
                <input
                  //set minimum for deadline and maximum also
                  min={yearStart}
                  max={yearEnd}
                  type="date"
                  value={deadline.deadline}
                  onChange={(e) =>
                    handleDeadlineChange(deadline.quarter_id, e.target.value)
                  }
                  className="input input-bordered w-1/2"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-evenly pt-5">
            <button
              className="btn btn-outline"
              onClick={() => {
                handleConfirmButton();
                // handleDeadlineSave();
                // handleClose();
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
      {/* <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
        onClick={onClose}
      >
        <div
          className="bg-white w-3/4 md:w-1/2 xl:w-1/4  max-w-5xl h-3/4 md:h-1/2 rounded-lg flex flex-col p-2 gap-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          
          <div className="flex border-b justify-between">
            <h2 className="font-semibold">Set Active School Year</h2>
            <div className="btn btn-soft " onClick={handleClose}>
              ✕
            </div>
          </div>

          <div className="relative h-full">
            <div
              className={`absolute inset-0 transition-opacity duration-500  ${
                loading ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <DialogSkeleton />
            </div>

            <div
              className={`absolute inset-0 transition-opacity duration-500 delay-100 flex flex-col justify-between  
              ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <div className="flex w-full flex-col gap-y-5 flex-1  ">
                <div className="flex flex-row items-center gap-x-2">
                  <div className="font-bold">
                    Active School Year: {selectedYear?.school_year}
                  </div>

                  <button
                    className="text-xs btn btn-outline"
                    onClick={() => setCreateSYOpen(true)}
                  >
                    Create School Year
                  </button>
                </div>

                {deadlines.map((deadline) => (
                  <div
                    key={deadline.quarter_id}
                    className="flex flex-row items-center gap-x-2 w-full"
                  >
                    <div>Quarter {deadline.quarter_number}:</div>
                    <input
                      //set minimum for deadline and maximum also
                      type="date"
                      value={deadline.deadline}
                      onChange={(e) =>
                        handleDeadlineChange(
                          deadline.quarter_id,
                          e.target.value,
                        )
                      }
                      className="input input-bordered w-1/2"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-row justify-evenly w-full">
                
            
                <button
                  className="w-30  xs:w-40 btn btn-success rounded-full text-white"
                  onClick={() => {
                    handleDeadlineSave();
                  }}
                >
                  UPDATE
                </button>
                <button
                  className="w-30  xs:w-40 btn btn-error rounded-full text-white"
                  onClick={handleClose}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <CreateSchoolYearDialog
        isOpen={createSYOpen}
        onClose={() => setCreateSYOpen(false)}
        fetchSchoolYear={fetchSchoolYear}
      />

      <ConfirmDialog
        isOpen={showConfirm}
        closeAll={handleCloseAll}
        onClose={() => {
          setShowConfirm(false);
        }}
        headerText={"Confirm Changes"}
        confirmButton={confirmButtonSave}
        loading={loading}
      >
        <div className="flex flex-col gap-y-4">
          Are you sure you want to confirm these changes?
          {deadlines.map((deadline) => (
            <div
              key={deadline.quarter_id}
              className="flex flex-row items-center gap-x-2 w-full font-bold"
            >
              <div>Quarter {deadline.quarter_number} Deadline:</div>
              <div>{deadline.deadline}</div>
            </div>
          ))}
        </div>
      </ConfirmDialog>
    </>
  );
};

{
  /* <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="select select-bordered"
            >
              <option value=""> Select School Year</option>
              {schoolYears.map((year) => (
                <option key={year.year_id} value={year.year_id}>
                  {year.school_year}
                </option>
              ))}
            </select> */
}

export default ActiveSchoolYearDialog;
