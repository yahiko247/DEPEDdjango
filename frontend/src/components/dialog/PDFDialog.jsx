import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ReviewDialog from "./ReviewDialog";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFDialog = ({ data, onClose }) => {
  const [openReview, setOpenReview] = useState(false);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (!data) return null;

  return (
    // <dialog className="modal modal-open">
    //   <div className="modal-box  border border-black ">
    //     <iframe src={`${data.lesson_plan}`} className="w-full h-full" />
    //   </div>
    //   <div className="modal-backdrop" onClick={onClose}></div>
    // </dialog>

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-5xl h-[90vh] rounded-lg flex flex-col gap-y-2">
        {/* Header */}
        <div className="p-4 border-b flex justify-between">
          <h2 className="font-semibold">Lesson Plan Preview</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="w-full border border-yellow-500">{data.status}</div>

        {/* PDF Viewer */}
        <div className="flex flex-row flex-1">
          <iframe src={`${data.lesson_plan}`} className="w-full h-full" />
        </div>
        <div className="border border-black w-full h-20">Feedback</div>

        <button
          className="border border-green-500 rounded-full"
          onClick={() => setOpenReview(true)}>
          Review Lesson Plan
        </button>

        <div>{data.teacherName}</div>
      </div>

      {openReview && <ReviewDialog onClose={() => setOpenReview(false)} />}
    </div>
  );
};

export default PDFDialog;
