import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ReviewDialog from "./ReviewDialog";
import { reviewLessonPlan } from "../../api/lessonPlanApi";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFDialog = ({ data, onClose }) => {
  const [openReview, setOpenReview] = useState(false);
  const [status, setStatus] = useState(data.status ?? "");
  const [feedBack, setFeedBack] = useState(data.feedback ?? "");
  const [lessonPlanID, setLessonPlanID] = useState(data.plan_id ?? "");

  if (!data) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white w-11/12 max-w-5xl h-[90vh] rounded-lg flex flex-col gap-y-2 p-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b flex justify-between">
            <h2 className="font-semibold">Lesson Plan Preview</h2>
            <button onClick={onClose}>✕</button>
          </div>

          {/* PDF Viewer */}
          <div className="flex flex-row flex-1 items-center">
            <iframe src={`${data.lesson_plan}`} className="w-full h-full" />
          </div>
          <span>
            Status:
            <select
              className="w-30 bg-gray-200 h-7 rounded-md"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </span>

          <textarea
            className="rounded-md bg-gray-100 p-2 resize-none h-20 w-full"
            value={feedBack}
            placeholder="Feedback (Optional)"
            onChange={(e) => setFeedBack(e.target.value)}
          ></textarea>

          <div className="w-full flex items-center justify-evenly">
            <button
              className="md:hidden btn rounded-full btn-neutral w-3/4"
              onClick={() => setOpenReview(true)}
            >
              Review Lesson Plan
            </button>
            <button
              className="hidden w-40 md:block btn btn-success rounded-full text-white"
              onClick={() => reviewLessonPlan(lessonPlanID, status, feedBack)}
            >
              SAVE
            </button>
            <button className="hidden w-40 md:block btn btn-error rounded-full text-white">
              CANCEL
            </button>
          </div>
        </div>
      </div>
      {openReview && <ReviewDialog onClose={() => setOpenReview(false)} />}
    </>
  );
};

export default PDFDialog;
