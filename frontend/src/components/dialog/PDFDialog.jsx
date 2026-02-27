import React, { useState } from "react";
import ReviewDialog from "./ReviewDialog";
import { reviewLessonPlan } from "../../api/lessonPlanApi";
import ConfirmDialog from "./ConfirmDialog";
import { CiCircleCheck, CiWarning } from "../../icons/index.js";

const PDFDialog = ({ data, onClose }) => {
  const [openReview, setOpenReview] = useState(false);
  const [successfulSaveDialog, setSuccessfulSaveDialog] = useState(false);
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
            className="border border-gray-300 rounded-lg bg-gray-100 p-2 resize-none h-20 w-full"
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
      </div>
      {successfulSaveDialog && (
        <ConfirmDialog
          headerText={"Success!"}
          message={"Successfully Reviewed Lesson Plan!"}
          onClose={() => setSuccessfulSaveDialog(false)}
          logo={<CiCircleCheck className="size-30" />}
        />
      )}
      {openReview && (
        <ReviewDialog
          lessonPlanID={lessonPlanID}
          status={status}
          feedBack={feedBack}
          onClose={() => setOpenReview(false)}
        />
      )}
    </>
  );
};

export default PDFDialog;
