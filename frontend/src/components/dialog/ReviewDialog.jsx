import React from "react";

const ReviewDialog = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-5xl h-[50vh] rounded-lg flex flex-col gap-y-2 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between">
          <h2 className="font-semibold">Review Lesson Plan</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="">Pending</div>
        <div className="flex-1 border border-black rounded-md"></div>

        <button
          className="hidden w-40 md:block btn btn-success rounded-full text-white"
          onClick={() => {
            reviewLessonPlan(lessonPlanID, status, feedBack);
            setSuccessfulSaveDialog(true);
          }}
        >
          SAVE
        </button>
        <button
          className="hidden w-40 md:block btn btn-error rounded-full text-white"
          onClick={onClose}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default ReviewDialog;
