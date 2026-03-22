import React, { useState } from "react";
import ReviewDialog from "./ReviewDialog";
import { reviewLessonPlan } from "../../api/lessonPlanApi";
import ConfirmDialog from "./ConfirmDialog.jsx";
import { CiCircleCheck, CiWarning } from "../../icons/index.js";
import SuccessDialog from "./SuccessDialog.jsx";

const PDFDialog = ({ data, onClose }) => {
  const [openReview, setOpenReview] = useState(false);
  const [successfulSaveDialog, setSuccessfulSaveDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(data.status ?? "");
  const [feedBack, setFeedBack] = useState(data.feedback ?? "");
  const [lessonPlanID, setLessonPlanID] = useState(data.plan_id ?? "");
  const [successDialog, setSuccessDialog] = useState(false);

  if (!data) return null;

  const handleReviewLessonPlan = async (lessonPlanID, status, feedBack) => {
    try {
      setLoading(true);
      const response = await reviewLessonPlan(lessonPlanID, status, feedBack);
      if (response.status === 200) {
        setSuccessDialog(true);
      } else {
        console.log("rawr");
        // setSuccessDialog(true);
      }
    } catch (e) {
      console.log("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

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
              className="w-30  xs:w-40 btn btn-success rounded-full text-white"
              onClick={() => {
                handleReviewLessonPlan(lessonPlanID, status, feedBack);
              }}
            >
              SAVE
            </button>
            <button
              className="w-30 xs:w-40 btn btn-error rounded-full text-white"
              onClick={onClose}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>

      <SuccessDialog
        isOpen={successDialog}
        onClose={() => setSuccessDialog(false)}
      />
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
