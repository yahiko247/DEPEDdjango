import React, { useEffect, useState } from "react";
import ReviewDialog from "./ReviewDialog";
import { reviewLessonPlan } from "../../api/lessonPlanApi";
import ConfirmDialog from "./ConfirmDialog.jsx";
import { CiCircleCheck, CiWarning } from "../../icons/index.js";
import SuccessDialog from "./SuccessDialog.jsx";

const PDFDialog = ({ data, onClose, refreshLessonPlan }) => {
  const [openReview, setOpenReview] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
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
      refreshLessonPlan();
      if (response.status === 200) {
        console.log("true");
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

  const handleCloseAll = () => {
    setConfirmDialog(false);
    onClose();
  };

  useEffect(() => {
    console.log("Data:", data);
  }, []);

  return (
    <>
      <dialog open={data} className="modal ">
        <div className="modal-box flex flex-col w-11/12 max-w-5xl h-[90vh] gap-y-2">
          <div className="p-4 border-b flex justify-between">
            <h2 className="font-semibold">Lesson Plan Preview</h2>
            <button onClick={onClose}>✕</button>
          </div>

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
            disabled={data?.status == "Approved"}
            className="border border-gray-300 rounded-lg bg-gray-100 p-2 resize-none h-20 w-full"
            value={feedBack}
            placeholder="Feedback (Optional)"
            onChange={(e) => setFeedBack(e.target.value)}
          ></textarea>

          <div className="w-full flex flex-row justify-evenly gap-x-2">
            <button
              className="btn btn-outline flex-1 md:flex-none md:w-44"
              onClick={() => {
                setConfirmDialog(true);
                // handleReviewLessonPlan(lessonPlanID, status, feedBack);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-outline flex-1 md:flex-none md:w-44"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>close</button>
        </form>
      </dialog>

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
            disabled={data?.status == "Approved"}
            className="border border-gray-300 rounded-lg bg-gray-100 p-2 resize-none h-20 w-full"
            value={feedBack}
            placeholder="Feedback (Optional)"
            onChange={(e) => setFeedBack(e.target.value)}
          ></textarea>

          <div className="w-full flex items-center justify-evenly">
            <button
              className="w-30  xs:w-40 btn btn-success rounded-full text-white"
              onClick={() => {
                setConfirmDialog(true);
                // handleReviewLessonPlan(lessonPlanID, status, feedBack);
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

      <ConfirmDialog
        isOpen={confirmDialog}
        closeAll={handleCloseAll}
        headerText="Confirm"
        onClose={() => setConfirmDialog(false)}
        confirmButton={() =>
          handleReviewLessonPlan(lessonPlanID, status, feedBack)
        }
      >
        Are you sure you want to update this lesson plan to:{" "}
        <span
          className={`font-bold ${
            status === "Approved"
              ? "text-success"
              : status === "Rejected"
                ? "text-error"
                : "text-warning"
          }`}
        >
          {status}
        </span>
      </ConfirmDialog>

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
