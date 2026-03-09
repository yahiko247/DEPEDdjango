import React from "react";

const ActiveSchoolYearDialog = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
      onClick={onClose}
    >
      <div
        className="bg-white w-1/4 max-w-5xl h-60 rounded-lg flex flex-col gap-y-5 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex border-b justify-between">
          <h2 className="font-semibold">Set Active School Year</h2>
          <div className="btn btn-soft " onClick={onClose}>
            ✕
          </div>
        </div>

        <div className="flex w-full">
          Set Active School Year and Quarter Deadline
        </div>
      </div>
    </div>
  );
};

export default ActiveSchoolYearDialog;
