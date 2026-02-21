import React from "react";

const ReviewDialog = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}>
      <div className="bg-white w-1/2 max-w-5xl h-[50vh] rounded-lg flex flex-col gap-y-2 p-2">
        {/* Header */}
        <div className="p-4 border-b flex justify-between">
          <h2 className="font-semibold">Review Lesson Plan</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="">Pending</div>
        <div className="flex-1 border border-black rounded-md"></div>

        <span className="flex justify-evenly">
          <button>Save</button>
          <button>Cancel</button>
        </span>
      </div>
    </div>
  );
};

export default ReviewDialog;
