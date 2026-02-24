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
    //   <div className="modal-box w-11/12 max-w-5xl h-[90vh] gap-y-2 flex flex-col">
    //     <div className="p-4 border-b flex justify-between">
    //       <h2 className="font-semibold">Lesson Plan Preview</h2>
    //       <button onClick={onClose}>✕</button>
    //     </div>
    //     <div className="flex flex-1">
    //       <iframe src={`${data.lesson_plan}`} className="w-full h-full" />
    //     </div>
    //     <div className="w-full border border-black flex justify-center md:justify-evenly items-center">
    //       <button
    //         className="flex md:hidden border border-yellow-500 justify-center items-center w-3/4"
    //         onClick={() => setOpenReview(true)}>
    //         Review Lesson Plan
    //       </button>
    //       <button className="btn rounded-full w-40 h-10 btn-outline btn-success">
    //         SAVE
    //       </button>
    //     </div>
    //   </div>

    //   <div className="modal-backdrop" onClick={onClose}></div>
    //   {openReview && <ReviewDialog onClose={() => setOpenReview(false)} />}
    // </dialog>
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

          <div className="w-full border border-yellow-500 hidden md:block">
            {data.status}
          </div>
          <div className="border border-black w-full h-20 hidden md:block">
            Feedback
          </div>

          <div className="w-full border border-green-500 flex  items-center justify-evenly">
            <button
              className="md:hidden btn rounded-full btn-neutral w-3/4"
              onClick={() => setOpenReview(true)}
            >
              Review Lesson Plan
            </button>
            <button className="hidden w-40 md:block btn btn-success rounded-full text-white">
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
