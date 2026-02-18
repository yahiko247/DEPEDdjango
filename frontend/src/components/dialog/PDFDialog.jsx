import React, { useState } from "react";
import ReviewDialog from "./ReviewDialog";

const PDFDialog = ({ data, onClose }) => {
  const [openReview, setOpenReview] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-5xl h-[90vh] rounded-lg flex flex-col gap-y-2">
        {/* Header */}
        <div className="p-4 border-b flex justify-between">
          <h2 className="font-semibold">Lesson Plan Preview</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* PDF Viewer */}
        <div className="flex flex-row flex-1">
          <iframe src={data.lessonPlan} className="w-full h-full" />
        </div>

        <button
          className="border border-green-500 rounded-full"
          onClick={() => setOpenReview(true)}
        >
          Review Lesson Plan
        </button>

        <div>{data.teacherName}</div>
      </div>

      {openReview && <ReviewDialog onClose={() => setOpenReview(false)} />}
    </div>
  );
};

export default PDFDialog;
