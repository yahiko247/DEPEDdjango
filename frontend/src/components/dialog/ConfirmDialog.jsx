import React from "react";
import { FaReact } from "../../icons/index.js";
const ConfirmDialog = ({ onClose, headerText, message, logo }) => {
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
          <h2 className="font-semibold">{headerText ?? "Header"}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex w-full  justify-center items-center">
          {logo ?? <FaReact className="size-30" />}
        </div>

        <div className="flex w-full justify-center">
          {message ?? "Dialog Message"}
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
