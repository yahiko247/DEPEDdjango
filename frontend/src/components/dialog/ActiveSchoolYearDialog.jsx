import React, { useState } from "react";

const TextComponent = ({ text }) => {
  return <div className="text-xs md:text-base">{text}</div>;
};

const ActiveSchoolYearDialog = ({ onClose }) => {
  const [schoolYear, setActiveSchoolYear] = useState();
  const [deadline, setDeadline] = useState();
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
      onClick={onClose}
    >
      <div
        className="bg-white w-3/4 md:w-1/2 xl:w-1/4  max-w-5xl h-3/4 md:h-1/2 rounded-lg flex flex-col gap-y-5 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex border-b justify-between">
          <h2 className="font-semibold">Set Active School Year</h2>
          <div className="btn btn-soft " onClick={onClose}>
            ✕
          </div>
        </div>

        <div className="flex w-full flex-col">
          <TextComponent text={"Active School Year"} />
          <option>2025-2026</option>
          <TextComponent text={"1st Quarter Deadline"} />
          <TextComponent text={"2nd Quarter Deadline"} />
          <TextComponent text={"3rd Quarter Deadline"} />
          <TextComponent text={"4th Quarter Deadline"} />
        </div>
      </div>
    </div>
  );
};

export default ActiveSchoolYearDialog;
