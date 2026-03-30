import React from "react";

const CreateSchoolYearDialog = ({ isOpen, onClose }) => {
  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create School Year</h3>

        <div className="flex flex-row justify-between items-center">
          <div>Start Date:</div>
          <input className="input input-bordered w-1/2" type="date"></input>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div>End Date:</div>
          <input className="input input-bordered w-1/2" type="date"></input>
        </div>

        <div className="flex flex-row justify-evenly">
          <button className="btn btn-outline">Confirm</button>
          <button className="btn btn-outline">Cancel</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default CreateSchoolYearDialog;
